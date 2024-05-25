"use strict";

/*
// Returns the opposite of a color (Black <-> White, Wall <-> Empty)
constexpr Color operator~(Color p)
{
    return Color(p ^ 1);
}
*/

let wasmExports;

//----------------------- AVL ----------------------------
/*
function resetAVL() {
    const avlBuffer = recordDB.avlBuffer.uint32;
    const dataBuffer = recordDB.fileBuffer.uint8;
    AVL.init(avlBuffer, dataBuffer);
    AVL.compare = function(lPtr, rPtr) {
        const lUint8 = getKeyBuffer(dataBuffer, lPtr);
        const rUint8 = getKeyBuffer(dataBuffer, rPtr);
        const cmp = databaseKeyCompare(lUint8, rUint8);
        return cmp;
    };
    AVL.get = function(key) {
        let node = AVL.root;
        let cmp = 0;
        while (node) {
            const rPtr = AVL.nodeValue(node);
            const rUint8 = getKeyBuffer(dataBuffer, rPtr);
            cmp = databaseKeyCompare(key, rUint8);
            if (cmp === 0) {
                return AVL.nodeValue(node);
            }
            else if (cmp < 0) node = AVL.nodeLeft(node);
            else node = AVL.nodeRight(node);
        }
        return -1;
    }
    recordDB.map = AVL;
}

function loadTest_AVL(ignoreCorrupted, outputProgress = () => {}) {
    let progress = 0;
    const uint8 = recordDB.fileBuffer.uint8;

    progress = forEveryRecord(function(key, recordStart) {
        return recordDB.map.set(recordStart);
    }, outputProgress);

    post("alert", `numRecords: ${getNumRecords(uint8)} \nsize: ${recordDB.map.size}, \nheight: ${recordDB.map.height}`)

    progress = forEveryRecord(function(key, recordStart) {
        const rt = recordDB.map.get(key);
        if (rt > -1) return rt;
        else throw new Error(`recordDB.map.get(key) = ${rt}\nkey: = [${key}]`);
    }, outputProgress);

    return progress;
}
*/
//-------------------- HashTable -------------------------

function resetHashTable() {
    recordDB.map = {
        get init() { return wasmExports.init; },
        get get() {
            return function(key) {
                const inPtr = wasmExports.input();
                const uint8_input = new Uint8Array(wasmExports.memory.buffer, inPtr, 1024);
                key.map((v, i) => uint8_input[i] = v);
                const rt = wasmExports.get(inPtr) >>> 0;
                return rt == 0xFFFFFFFF ? -1 : rt;
            }
        },
        get set() { return wasmExports.set; },
        get getMaxLength() { return wasmExports.getMaxLength; },
        get nodeBytes() { return wasmExports.nodeBytes(); },
        get tableSize() { return wasmExports.tableSize(); },
        get size() { return wasmExports.size(); },
    };
}
/*
function loadTest_HashTable(ignoreCorrupted, outputProgress = () => {}) {
    let progress = 0;
    const uint8 = recordDB.fileBuffer.uint8;

    progress = forEveryRecord(function(key, recordStart) {
        return recordDB.map.set(key, recordStart);
    }, outputProgress);

    post("alert", `numRecords: ${getNumRecords(uint8)} \nsize: ${recordDB.map.size}, \nMaxLength: ${recordDB.map.getMaxLength()>>>0}`)

    progress = forEveryRecord(function(key, recordStart) {
        const rt = recordDB.map.get(key);
        if (rt > -1) return rt;
        else throw new Error(`recordDB.map.get(key) = ${rt}\nkey: = [${key}]`);
    }, outputProgress);

    return progress;
}

//--------------------------------------------------------

function forEveryRecord(callbackRecord, outputProgress) {
    const uint8 = recordDB.fileBuffer.uint8;
    let u8Index = 0;
    const u8IndexEnd = uint8.length;
    const numRecords = uint8[u8Index++] | uint8[u8Index++] << 8 | uint8[u8Index++] << 16 | uint8[u8Index++] << 24;

    let recordIdx;
    for (recordIdx = 0; recordIdx < numRecords; recordIdx++) {
        if (0 == (recordIdx & 0x7FFF)) {
            outputProgress(recordIdx / numRecords);
        }

        const recordStart = u8Index;

        // Read record key
        if (u8Index + 2 > u8IndexEnd) break;
        const numKeyBytes = uint8[u8Index++] | uint8[u8Index++] << 8;
        if (numKeyBytes == 0) continue;

        if (u8Index + numKeyBytes > u8IndexEnd) break;
        u8Index += numKeyBytes;

        // Read record message
        if (u8Index + 2 > u8IndexEnd) break;
        const numRecordBytes = uint8[u8Index++] | uint8[u8Index++] << 8;
        if (u8Index + numRecordBytes > u8IndexEnd) break;
        u8Index += numRecordBytes;

        const key = getKeyBuffer(uint8, recordStart);
        const rt = callbackRecord(key, recordStart);
        if (rt < 1) break;
    }

    return recordIdx / numRecords;
}
*/
function load(ignoreCorrupted, outputProgress = () => {}) {
    const uint8 = recordDB.fileBuffer.uint8;
    let u8Index = 0;
    const u8IndexEnd = uint8.length;
    const numRecords = (uint8[u8Index++] | uint8[u8Index++] << 8 | uint8[u8Index++] << 16 | uint8[u8Index++] << 24) >>> 0;
    
    let recordIdx;
    next_record: for (recordIdx = 0; recordIdx < numRecords; recordIdx++) {
        if (0 == (recordIdx & 0x3FFFF)) {
            outputProgress(recordIdx / numRecords);
        }

        const recordStart = u8Index;

        // Read record key
        if (u8Index + 2 > u8IndexEnd) break;
        const numKeyBytes = uint8[u8Index++] | uint8[u8Index++] << 8;
        if (numKeyBytes == 0) break;

        //----------- debug start -----------------------
        //----------- 测试 record 是否按 key 排除好------
        
        //if (recordIdx < 25) {
            //const key = getKeyBuffer(uint8, recordStart);
            //const hs = hash(0, key, 0, key.length);
            //const key2 = new Uint8Array(wasmExports.memory.buffer, recordDB.fileBuffer.begin + recordStart, key.length);
            //const hs1 = wasmExports.hash(0, recordDB.fileBuffer.begin + recordStart, 0, key.length) >>> 0;
            //post("alert", `0x${(wasmExports.memory.buffer.byteLength).toString(16)}\n0x${(recordDB.fileBuffer.begin + recordStart).toString(16)}\n0x${(recordDB.fileBuffer.begin + recordStart + key.length).toString(16)}`)
            //post("alert", `key: [${key}]\nkey2: ${recordDB.fileBuffer.begin + recordStart},${key.length}\n[${key2}]\n${hs}\n${hs1}`)
        //}
        
        //----------- debug end -------------------------

        if (u8Index + numKeyBytes > u8IndexEnd) break;
        u8Index += numKeyBytes;

        // Read record message
        if (u8Index + 2 > u8IndexEnd) break;
        const numRecordBytes = uint8[u8Index++] | uint8[u8Index++] << 8;
        if (u8Index + numRecordBytes > u8IndexEnd) break;
        u8Index += numRecordBytes;
        
        const key = recordDB.fileBuffer.begin + recordStart; //getKeyBuffer(uint8, recordStart);
        const rt = recordDB.map.set(key, recordStart) | 0;
        if (rt <= 0) break;
    }
    return recordIdx / numRecords;
}
/*
*/
function getRecordBuffer(uint8, ptr) {
    const numKeyBytes = uint8[ptr] | uint8[ptr + 1] << 8;
    const recordStart = ptr + 2 + numKeyBytes;
    const numRecordBytes = uint8[recordStart] | uint8[recordStart + 1] << 8;
    return uint8.slice(ptr, ptr + 4 + numKeyBytes + numRecordBytes);
}

function getKeyBuffer(uint8, ptr) {
    const numKeyBytes = uint8[ptr] | uint8[ptr + 1] << 8;
    return uint8.slice(ptr, ptr + 2 + numKeyBytes);
}

function getValueBuffer(uint8, ptr) {
    const numKeyBytes = uint8[ptr] | uint8[ptr + 1] << 8;
    const recordStart = ptr + 2 + numKeyBytes;
    const numRecordBytes = uint8[recordStart] | uint8[recordStart + 1] << 8;
    return uint8.slice(recordStart, recordStart + 2 + numRecordBytes);
}

function getRecordMessage(uint8, ptr) {
    const numKeyBytes = uint8[ptr] | uint8[ptr + 1] << 8;
    const recordStart = ptr + 2 + numKeyBytes;
    const numRecordBytes = uint8[recordStart] | uint8[recordStart + 1] << 8;
    return uint8.slice(recordStart + 2, recordStart + 2 + numRecordBytes);
}

function isLZ4(uint8) {
    return 0x184D2204 == (uint8[0] | uint8[1] << 8 | uint8[2] << 16 | uint8[3] << 24);
}

// 读取db记录数，方便分配内存
function getNumRecords(uint8) {
    if (isLZ4(uint8)) {
        uint8 = lz4.decompress(uint8, Math.min(uint8.length, 1 << 16));
    }
    return uint8[0] | uint8[1] << 8 | uint8[2] << 16 | uint8[3] << 24;
}

async function openDatabass(file, callback) {
    try {
        recordDB.clear();
        const importObject = {
            env: {
                _Z11outputParamjjjjj: function(p1, p2, p3, p4, p5) {
                    //post("alert", `${p1}, ${p2}, ${p3}, ${p4}, ${p5} `)
                },
                _Z11lz4Callbackj: function(idx) {
                    callback(idx >>> 0);
                },
                _Z7onErrorPc: function(ptr) {
                    const u8 = new Uint8Array(wasmExports.memory.buffer, ptr, 1024);
                    const textBuf = [];
                    for(let i = 0; i < 1024; i++) {
                        const v = u8[i];
                        if(v) textBuf.push(v);
                        else break;
                    }
                    throw new Error(new TextDecoder().decode(new Uint8Array(textBuf)));
                },
                _Z9outputKeyPcj: function(ptr, len) {
                    //post("alert", `ptr: ${ptr},${len}\nwasm: ${new Uint8Array(wasmExports.memory.buffer, ptr, len)}`);
                },
                _Z14outputProgressd: function(v) {
                    callback(v);
                }
            }
        };
        wasmExports = await loadWASM("../Rapfi/databass.wasm", importObject);
        const hashTableBytes = wasmExports.tableBytes();

        callback("打开文件......");
        let uint8 = new Uint8Array(await getArrBuf(file));
        const _islz4 = isLZ4(uint8);
        const avlBytes = (getNumRecords(uint8) + 1) * wasmExports.nodeBytes();
        const fileBytes = _islz4 ? uint8.length * 8 : Math.max(uint8.length, avlBytes);
        callback(`申请内存......`);

        const buffers = await getMaxBuffes(1, hashTableBytes, Math.max(uint8.length, avlBytes), fileBytes);
        if (!buffers) return 0;
        
        const end = Math.min(uint8.length, buffers[1].uint8.length);
        for(let i = 0; i < end; i++) buffers[1].uint8[i] = uint8[i];

        callback(`${fileBytes <= buffers[2].uint8.length ? "完全" : "部分"}解压文件......`);
        if (_islz4) wasmExports.decompressFrame(buffers[1].begin, buffers[1].uint8.length, buffers[2].begin, buffers[2].uint8.length);
        else buffers[2].uint8.map((v, i) => buffers[2].uint8[i] = uint8[i]);
        
        buffers[1].uint32.fill(0);
        
        wasmExports.init(buffers[0].begin, hashTableBytes >>> 2, buffers[1].begin, buffers[1].uint32.length, buffers[2].begin, buffers[2].uint8.length);

        recordDB.avlBuffer = buffers[1];
        recordDB.fileBuffer = buffers[2];

        resetHashTable();
        
        return wasmExports.load();

    } catch (e) { post("onerror", e.stack || e) }
}

/*
function testType() {
    post("alert", `
    maxUint32: ${wasmExports.maxUint32().toString(16)}\n
    minusOneUint32: ${wasmExports.minusOneUint32().toString(16)}\n
    maxLongLong: ${wasmExports.maxLongLong().toString(16)}\n
    testChar: ${wasmExports.testChar(0xFFF).toString(16)}\n
    testUChar: ${wasmExports.testUChar(0xFFF).toString(16)}\n
    testInt: ${wasmExports.testInt(0xFFFFFFFF).toString(16)}\n
    testUint: ${wasmExports.testUint(0xFFFFFFFF).toString(16)}\n
    testLong: ${wasmExports.testLong(0xFFFFFFFF).toString(16)}\n
    testUlong: ${wasmExports.testUlong(0xFFFFFFFF).toString(16)}\n
    testFloat: ${wasmExports.testFloat(0xFFFFFF).toString(16)}\n
    testDouble: ${wasmExports.testDouble(0xFFFFFFFF).toString(16)}\n
    `)
}

function compareArray(arrL, arrR) {
    for (let i = 0; i < arrL.length; i++) {
        if (arrL[i] != arrR[i]) return `arrL[${i}] != arrR[${i}]\n${arrL[i]} != ${arrR[i]}`;
    }
    return true;
}
*/
