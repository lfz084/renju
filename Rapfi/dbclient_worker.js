"use strict";
if ("importScripts" in self) {
    self.importScripts(
        "../script/maxBuffer.js",
        "../lz4/mylz4.js",
        "./dbTypes.js",
        "./databass.js",
        "./hash.js",
        "./simpleHashTable.js"
    );
}
else
    throw new Error("self.importScripts is undefined")

/*
cmd = [alert | log | warn | info | error | addBranch | addBranchArray | createTree | addTree | loading ...]
*/
function post(cmd, param, transfer) {
    if (typeof cmd == "object" && cmd.constructor.name == "Error")
        postMessage(cmd) //部分浏览器 不支持复制 Error
    else
        postMessage({ "cmd": cmd, "parameter": param }, transfer)
}

async function getArrBuf(file, start = 0, byteLength = file.size) {
    return await file.slice(start, start + byteLength).arrayBuffer();
}

var recordDB = {
    map: new Map(),
    fileBuffer: new ArrayBuffer(0),
    avlBuffer: new ArrayBuffer(0),
    get clear() {
        return function() {
            const fileBuffer = this.fileBuffer;
            const avlBuffer = this.avlBuffer;
            if (fileBuffer.uint8) fileBuffer.uint8 = undefined;
            if (fileBuffer.uint16) fileBuffer.uint16 = undefined;
            if (fileBuffer.uint32) fileBuffer.uint32 = undefined;
            if (avlBuffer.uint8) avlBuffer.uint8 = undefined;
            if (avlBuffer.uint16) avlBuffer.uint16 = undefined;
            if (avlBuffer.uint32) avlBuffer.uint32 = undefined;
        }
    },
    
    get(key) {
        const uint8 = this.fileBuffer.uint8;
        const keyStart = this.map.get(key);
        if (keyStart > -1) {
            return getRecordMessage(uint8, keyStart);
        }
    }
};

function forEveryEmpty(position, sideToMove, callback, maxDepth = 1, depth = 0) {
    const records = [];
    depth++;
    for (let idx = 0; idx < 225; idx++) {
        if (0 == position[idx]) {
        	const record = callback(idx, sideToMove);
        	if (record) {
            	records.push(record);
            }
            else if(depth < maxDepth) {
            	position[idx] = sideToMove + 1;
            	if (0 < forEveryEmpty(position, sideToMove ^ 1, callback, maxDepth, depth).length) {
            		records.push({idx: idx, buffer: [255,0,0,0,0]});
            	}
            	position[idx] = 0;
            }
        }
    }
    return records;
}

function getBranchNodes({rule, boardWidth, boardHeight, sideToMove, position, maxDepth }) {
    let comment = new Uint8Array();
    let records = [];
    const sKey = constructDBKey(rule, boardWidth, boardHeight, sideToMove, position);
    const recordBuffer = recordDB.get(sKey);
    if (recordBuffer) {
        const record = new DBRecord(recordBuffer);
        comment = record.text;
        //alert(comment)
    }
    
    records = forEveryEmpty(position, sideToMove, function(idx, sideToMove) {
        const nPosition = position.slice(0);
        nPosition[idx] = sideToMove + 1;
        /*
        const sKeys = constructAllDBKey(rule, boardWidth, boardHeight, sideToMove ^ 1, nPosition);
        let recordBuffer;
        for (let i = 0; i < 8; i++) {
            if (recordBuffer = recordDB.get(sKeys[i])) break;
        }
        */
        const sKey = constructDBKey(rule, boardWidth, boardHeight, sideToMove ^ 1, nPosition);
        const recordBuffer = recordDB.get(sKey);
        if (recordBuffer) {
            const record = {idx: idx, buffer: recordBuffer};
            return record;
        }
        return null;
    }, maxDepth)
    return {
        comment: comment,
        records: records
    }
}

function outLoading(param) {
    const cmd = "loading";
    const parameter = param;
    post(cmd, parameter);
}

const CMD = {
    openDatabass: async function(file) {
        const cmd = "resolve";
        const parameter = await openDatabass(file, outLoading);
        post(cmd, parameter);
    },
    getBranchNodes: function(param) {
        const cmd = "resolve";
        const parameter = getBranchNodes(param);
        parameter.position = param.position;
        post(cmd, parameter);
    },
    close: function() {
        const cmd = "resolve";
        const parameter = undefined;
        post(cmd, parameter);
    }
}

onmessage = function(e) {
    if (e.data) {
        let cmd = e.data.cmd,
            param = e.data.parameter;
        typeof CMD[cmd] == "function" && CMD[cmd](param);
    }
}
