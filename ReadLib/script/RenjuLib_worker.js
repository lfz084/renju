"use strict";
if ("importScripts" in self) {
    self.importScripts(
        "../../script/IntervalPost.js",
        "../../script/TextCoder.js",
        "./JFile.js",
        "./JPoint.js",
        "./LibraryFile.js",
        "./MoveList.js",
        "./MoveNode.js",
        "./Stack.js"
    );

    if ("WebAssembly" in self && typeof WebAssembly.instantiate == "function") {
        self.importScripts("./RenLibDoc_wasm.js");
    }
    else {
        self.importScripts("./RenLibDoc.js");
    }
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


let renLibDoc = new RenLibDoc();

function getArrBuf(file) {
    return new Promise(function(resolve, reject) {
        let fr = new FileReader();
        fr.onload = function() {
            resolve(fr.result)
        };
        fr.onerror = function() {
            reject(fr.error)
        };
        fr.readAsArrayBuffer(file)
    });
}

function openLib(file) {
    getArrBuf(file)
        .then(function(buf) {
            return renLibDoc.addLibrary(buf);
        })
        .then(function() {
            try {
                getAutoMove();
                return Promise.resolve();
            }
            catch (err) {
                return Promise.rejecte(err.message);
            }
        })
        .then(function() {})
        .catch(function(err) {
            post("onerror", err.stack || err);
        })
        .then(function() {
            post("resolve");
        })
}

function getAutoMove() {
    let path = renLibDoc.getAutoMove();
    if (path.length) {
        post("autoMove", path);
    }
    else {
        let position = [];
        for (let i = 0; i < 15; i++) {
            position[i] = [];
            for (let j = 0; j < 15; j++) {
                position[i][j] = 0;
            }
        }
        showBranchs({ path: [], position: position })
    }
    post("resolve");
}

function showBranchs(param) {
    let rt = renLibDoc.getBranchNodes(param.path);
    rt.position = param.position;
    post("showBranchs", rt);
    post("resolve", rt);
}

function setCenterPos(point) {
    renLibDoc.setCenterPos(point);
    post("resolve");
}

function setBufferScale(scl) { // WebAssembly only
    typeof renLibDoc.setBufferScale == "function" &&
        renLibDoc.setBufferScale(scl);
    post("resolve");
}

function setPostStart(start = 0) { // test Lib File
    typeof renLibDoc.setPostStart == "function" &&
        renLibDoc.setPostStart(start);
    post("resolve");
}

function lib2sgf() {
    renLibDoc.lib2sgf()
    .then(bufObj => {
        post("resolve", bufObj, [bufObj.buf])
    })
    .catch(err => {
        post("onerror", err);
    })
}

let bf = [];
const CMD = {
    openLib: openLib,
    getAutoMove: getAutoMove,
    showBranchs: showBranchs,
    setCenterPos: setCenterPos,
    setBufferScale: setBufferScale,
    setPostStart: setPostStart,
    lib2sgf: lib2sgf,
}
onmessage = function(e) {
    if (e.data) {
        let cmd = e.data.cmd,
            param = e.data.parameter;
        typeof CMD[cmd] == "function" && CMD[cmd](param);
    }
}
