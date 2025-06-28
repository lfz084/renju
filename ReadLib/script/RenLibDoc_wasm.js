(function(global, factory) {
    (global = global || self, factory(global));
}(this, (function(exports) {
    'use strict';
    //console.log(exports);

    const NullPoint = new JPoint(0, 0);
    const Center = new JPoint(8, 8);

    const MajorProgramVersion = 3;
    const MinorProgramVersion = 6;

    const BugFixProgramVersion = 0;

    const Year = 2006;
    const Month = 7;
    const Day = 16;

    const Version = (Year * 100 + Month) * 100 + Day;

    let strEmpty = "";

    const XY_6_6 = 6 + 5 * 16;
    const XY_7_6 = 7 + 5 * 16;
    const XY_8_6 = 8 + 5 * 16;
    const XY_9_6 = 9 + 5 * 16;
    const XY_10_6 = 10 + 5 * 16;

    const XY_6_7 = 6 + 6 * 16;
    const XY_7_7 = 7 + 6 * 16;
    const XY_8_7 = 8 + 6 * 16;
    const XY_9_7 = 9 + 6 * 16;
    const XY_10_7 = 10 + 6 * 16;

    const XY_6_8 = 6 + 7 * 16;
    const XY_7_8 = 7 + 7 * 16;
    const XY_8_8 = 8 + 7 * 16;
    const XY_9_8 = 9 + 7 * 16;
    const XY_10_8 = 10 + 7 * 16;

    const XY_6_9 = 6 + 8 * 16;
    const XY_7_9 = 7 + 8 * 16;
    const XY_8_9 = 8 + 8 * 16;
    const XY_9_9 = 9 + 8 * 16;
    const XY_10_9 = 10 + 8 * 16;

    const XY_6_10 = 6 + 9 * 16;
    const XY_7_10 = 7 + 9 * 16;
    const XY_8_10 = 8 + 9 * 16;
    const XY_9_10 = 9 + 9 * 16;
    const XY_10_10 = 10 + 9 * 16;

    let intervalPost = new IntervalPost();

    function PointToPos(point) {
        if (isValidPoint(point)) {
            return 16 * (point.y - 1) + point.x;
        }
        else {
            return 0;
        }
    }

    function isValidPoint(point) {
        return point.x >= 1 && point.x <= 15 && point.y >= 1 && point.y <= 15;
    }

    function LessThan(Left, Right) {
        return PointToPos(Left) < PointToPos(Right);
    }

    //-------------------------------------------

    let centerPos = { x: 8, y: 8 };

    function Point2Idx(point) {
        return point.x - 1 + (point.y - 1) * 15;
    }

    function Idx2Point(idx) {
        let x = idx % 15,
            y = ~~(idx / 15);
        return { x: x + 1, y: y + 1 }
    }

    function getIdx(pMove) {
        return pMove.mPos.x - 1 + (pMove.mPos.y - 1) * 15;
    }

    function rotate90(point) {
        let x = centerPos.x - point.x,
            y = centerPos.y - point.y;
        return { x: centerPos.x + y, y: centerPos.y - x }
    }

    function rotate180(point) {
        let x = centerPos.x - point.x,
            y = centerPos.y - point.y;
        return { x: centerPos.x + x, y: centerPos.y + y }
    }

    function rotate270(point) {
        let x = centerPos.x - point.x,
            y = centerPos.y - point.y;
        return { x: centerPos.x - y, y: centerPos.y + x }
    }

    function reflectX(point) {
        return { x: point.x, y: centerPos.y * 2 - point.y }
    }

    function normalizeCoord(point, nMatch) {
        switch (nMatch) {
            case 0:
            case 4:
                break;
            case 1:
            case 5:
                point = rotate270(point);
                break;
            case 2:
            case 6:
                point = rotate180(point);
                break;
            case 3:
            case 7:
                point = rotate90(point);
                break;
        }
        if (nMatch > 3) point = reflectX(point);
        return point;
    }

    function transposeCoord(point, nMatch) {
        if (nMatch > 3) point = reflectX(point);
        switch (nMatch) {
            case 0:
            case 4:
                break;
            case 1:
            case 5:
                point = rotate90(point);
                break;
            case 2:
            case 6:
                point = rotate180(point);
                break;
            case 3:
            case 7:
                point = rotate270(point);
                break;
        }
        return point;
    }
    
    //------------------ Smart Game Format ---------------------
    
    let sgfUint8 = new Uint8Array(0),
        sgfUint8Len = 0;
    
    function createSGFBuffer(byteLen) {
        return new Promise((resolve, reject) => {
            try {
                resolve(new ArrayBuffer(byteLen));
            }
            catch (err) {
                reject(`手机空闲内存太小了,请关闭后台应用释放内存`);
            }
        })
    }

    function outputSGFCache(pBuffer, byteLen) {
        let uint8 = new Uint8Array(memory.buffer, pBuffer, byteLen);
        for (let i = 0; i < byteLen; i++) {
            sgfUint8[sgfUint8Len++] = uint8[i];
        }
    }
    
    // ---------------  change buffer  -------------------
    
    function getbuffer() {
        return memory.buffer;
    }
    
    function setBuffer(buffer) {
        
    }
    
    //------------------ WebAssembly ---------------------

    const POINT_SIZE = 2;
    const NODE_SIZE = 12;
    const BOARDTEXT_MAX_SIZE = 4;//16;
    const COMMENT_MAX_SIZE = 2048;

    function getUINT(pBuffer) {
        return new Uint32Array(memory.buffer, pBuffer, 1)[0];
    }

    function getINT(pBuffer) {
        return new Int32Array(memory.buffer, pBuffer, 1)[0];
    }

    function getBoardText(pBuffer) {
        let buf = new Uint8Array(memory.buffer, pBuffer, BOARDTEXT_MAX_SIZE),
            strNew = [];
        for (let i = 0; i < BOARDTEXT_MAX_SIZE; i++) {
            if (buf[i] === 0) break;
            strNew.push(buf[i]);
        }
        strNew = TextCoder.decode(new Uint8Array(strNew), "GBK");
        strNew = strNew.length > 4 ? strNew.slice(0, 4) : strNew;
        return strNew.split(" ").join("");
    }

    function getComment(pBuffer) {
        let buf = new Uint8Array(memory.buffer, pBuffer, COMMENT_MAX_SIZE),
            strNew = [];
        for (let i = 0; i < COMMENT_MAX_SIZE; i++) {
            if (buf[i] === 0) break;
            strNew.push(buf[i]);
        }
        return TextCoder.decode(new Uint8Array(strNew), "GBK");
    }

    function getPoint(pBuffer) {
        let buf = new Uint8Array(memory.buffer, pBuffer, POINT_SIZE);
        return { x: buf[0], y: buf[1] };
    }

    function putPoint(pBuffer, point) {
        let buf = new Uint8Array(memory.buffer, pBuffer, POINT_SIZE);
        buf[0] = point.x;
        buf[1] = point.y;
    }

    function getNode(pBuffer, defaultTxT) {
        let buf = new Uint8Array(memory.buffer, pBuffer, NODE_SIZE),
            idx = Point2Idx(getPoint(pBuffer)),
            txt = getBoardText(getUINT(pBuffer + 4)) || defaultTxT;
        return new Node(idx, txt);
    }

    function getNodes(pBuffer = out_buffer, defaultTxT) {
        let len = new Uint32Array(memory.buffer, pBuffer, 1)[0],
            nodes = [];
        for (let i = 0; i < len; i++) {
            nodes.push(getNode(pBuffer + 4 + i * NODE_SIZE, defaultTxT));
        }
        return nodes;
    }

    function Path2Points(path) {
        let points = [];
        for (let i = 0; i < path.length; i++) {
            points.push(Idx2Point(path[i]));
        }
        return points;
    }

    function getPath(path = []) {
        try {
            let len = getUINT(out_buffer);
            path.length = len;
            for (let i = 0; i < len; i++) {
                path[i] = Point2Idx(getPoint(out_buffer + 4 + i * POINT_SIZE));
            }
            return path;
        }
        catch (err) {
            post(`error`, `${err}`);
        }
    }

    function putPath(path) {
        try {
            let points = Path2Points(path);
            for (let i = 0; i < path.length; i++) {
                putPoint(in_buffer + i * POINT_SIZE, points[i]);
            }
        }
        catch (err) {
            post(`error`, `${err}`);
        }
    }

    function grow(pages = 100) {
        try {
            memory.grow(pages)
            /*let size = 1024 * 64 * pages,
                len = size / 4,
                buf = new Uint32Array(memory.buffer, memory.buffer.byteLength - size, len);
            for (let i = 0; i < len; i++) {
                buf[i] = 0;
            }
            post(`warn`, `memory.grow(${pages}), buffer size = ${memory.buffer.byteLength/1024/1024}M`);
            */
            return pages;
        }
        catch (err) {
            post(`error`, `申请 ${parseInt(pages/16)+1}M 内存失败，请确保你的手机有足够的空闲内存`);
            return 0;
        }
    }

    function resetBuffer(libSize, scl) {
        let data_buf = wasm_exports._Z13getDataBufferv(),
            data_buf_size = parseInt(libSize * scl) + 1,
            bufSize = data_buf + data_buf_size,
            pages = parseInt((bufSize - memory.buffer.byteLength) / 1024 / 64) + 1;
        return grow(pages);
    }

    function maxMemory(bufSize, scl) {
        return new Promise((resolve, reject) => {
            function max(bufSize, scl) {
                let pages = resetBuffer(bufSize,scl);
                scl -= 0.1;
                if(pages) resolve(pages);
                else if(scl>0)setTimeout(()=>max(bufSize, scl),0);
                else reject(`浏览器申请内存失败,请关闭后台应用、刷新网页，再试一下\n手机请用Edeg浏览器，获得更大内存`);
            }
            const FOUR_GB = 4095*1024*1024;
            if (FOUR_GB < bufSize * scl) scl = parseInt(FOUR_GB / bufSize);
            max(bufSize, scl);
        });
    }
    
    

    let jFile,
        buffer_scale = 3,
        wasm_exports,
        memory,
        out_buffer,
        in_buffer,
        log_buffer,
        data_buffer,
        startTime,
        importObject = {
            env: {
                memcpy: function(param1, param2, param3) {
                    post("log", `memcpy: start=${param1}, value=${param2}, length=${param3}`);
                    let buf = new Uint8Array(memory.buffer, 0, memory.buffer.byteLength);
                    for (let i = 0; i < param3; i++) {
                        buf[param1 + i] = buf[param2 + i];
                    }
                    return param1;
                },
                memset: function(param1, param2, param3) {
                    post("log", `memset: start=${param1}, value=${param2}, length=${param3}`);
                    let buf = new Uint8Array(memory.buffer, param1, param3);
                    for (let i = 0; i < param3; i++) {
                        buf[i] = param2;
                    }
                    return param1;
                },
                _Z9getBufferPhj: function(pBuffer, size) {
                    post("loading", { current: jFile.m_current, end: jFile.m_end * 1.1 });
                    let buf = new Uint8Array(memory.buffer, pBuffer, size),
                        rt = jFile.read(buf, size);
                    post("log", `pBuffer = ${pBuffer}, size = ${size}, rt = ${rt}`);
                    return rt;
                },
                _Z7loadingjj: function(current, end) {
                    post("loading", { current: current, end: end });
                },
                _Z11memoryBoundv: () => {
                    post("alert", `当前浏览器内存只能打开 ${parseInt((jFile.m_current / jFile.m_end)*10000)/100}% 棋谱\n手机请用Edeg浏览器，获得更大内存`);
                },
                _Z14outputSGFCachePcj: outputSGFCache,
                _Z4growj: () => 0,
            }
        };

    function loadWASM(url) {
        //从远程加载一个WASM的模块，并将该模块中的内容转换成二进制数据
        startTime = new Date().getTime();
        post("log", `fetch , wasm = ${url}`);
        return fetch(url)
            .then(response => {
                post("log", `response = ${response}`);
                return response.arrayBuffer()
            })
            .then(bytes => {
                post("log", `WebAssembly.instantiate >> ${bytes}`);
                //通过浏览器提供的标准WebAssembly接口来编译和初始化一个Wasm模块
                return WebAssembly.instantiate(bytes, importObject);
            })
            .then(results => {
                wasm_exports = results.instance.exports;
                memory = wasm_exports.memory;
                //输出下载，编译及实例化模块花费的时间
                post("log", `TIME = ${new Date().getTime() - startTime}`);
                //取出从Wasm模块中导出的函数
                //post("log", Object.keys(wasm_exports).join("\n"));
                out_buffer = wasm_exports._Z12getOutBufferv();
                in_buffer = wasm_exports._Z11getInBufferv();
                log_buffer = wasm_exports._Z12getLogBufferv();
                data_buffer = wasm_exports._Z13getDataBufferv();
            });
    }

    //------------------ Doc ------------------------- 

    class Node {
        constructor(idx, txt = "", color = "black") {
            this.idx = idx;
            this.txt = txt;
            this.color = color;
        }
    }

    class RenLibDoc {
        constructor() {
            this.m_MoveList = new MoveList();
            this.m_file = new JFile();
            this.nodeCount = 0;
        }
    }

    RenLibDoc.prototype.setCenterPos = function(point) {
        centerPos.x = point.x;
        centerPos.y = point.y;
        post("warn", `棋谱大小改为: ${centerPos.x*2-1} × ${centerPos.y*2-1} \n中心点已改为: x = ${centerPos.x}, y = ${centerPos.y}`)
    }

    RenLibDoc.prototype.setBufferScale = function(scl) {
        buffer_scale = scl;
        post("warn", `已设置${scl}倍内存，打开1M的lib文件会占用${scl}M内存`);
    }

    RenLibDoc.prototype.addLibrary = function(buf) {
        return loadWASM("./RenLib.wasm")
            .then(() => {
                wasm_exports._Z4initv(buf.byteLength);
            })
            .then(() => {
                return maxMemory(buf.byteLength, buffer_scale);
            })
            .then((pages) => {
                post(`warn`, `申请 ${parseInt(pages/16)+1}M 内存 OK`);
                wasm_exports._Z12setMemoryEndj(memory.buffer.byteLength - wasm_exports._Z13getDataBufferv());
                if (this.m_file.open(buf)) {
                    return Promise.resolve();
                }
                else {
                    return Promise.reject("libFile Open Error");
                }
            })
            .then(() => {  // 把 m_file 暴露给 wasm_exports
                typeof jFile === "object" && jFile.constructor.name === "JFile" && jFile.close();
                jFile = this.m_file;
            })
            .then(function() {
                if (wasm_exports._Z12checkVersionv())
                    return Promise.resolve();
                else
                    return Promise.reject(`不是五子棋棋谱`);
            })
            .then(function() {
                let number = wasm_exports._Z15loadAllMoveNodev(),
                    dataSize = 1804 + 908 + 16 + 16 + number * 16; // Stack + MoveList + LibraryFile + RootMoveNode + libNode;
                if (memory.buffer.byteLength < data_buffer + dataSize)
                    return Promise.reject(`默认内存不足 请先设置 ${parseInt(dataSize/buf.byteLength*100+1)/100} 倍以上内存`);
                if (number)
                    return Promise.resolve();
                else
                    return Promise.reject(`loadAllMoveNode Error`);
            })
            .then(function() {
                if (wasm_exports._Z15createRenjuTreev())
                    return Promise.resolve();
                else
                    return Promise.reject(`createRenjuTree Error`);
            })
            .then(() => {
                return Promise.resolve(this.m_file.close());
            })
            .catch((err) => {
                this.m_file.close();
                return Promise.reject(err.message || err);
            })
    }


    //-----------------------------------------------------------
    RenLibDoc.prototype.getBranchNodes = function(path) {
    
        function normalizeNodes(nodes, nMatch) {
            let idx,
                txt,
                rt = [];
            for (let i = 0; i < nodes.length; i++) {
                idx = Point2Idx(normalizeCoord(Idx2Point(nodes[i].idx), nMatch))
                txt = nodes[i].txt;
                rt[i] = new Node(idx, txt, nMatch > 0 ? "green" : "black");
            }
            return rt;
        }

        function transposePath(path, nMatch) {
            let rt = [];
            for (let i = 0; i < path.length; i++) {
                rt[i] = Point2Idx(transposeCoord(Idx2Point(path[i]), nMatch))
            }
            return rt;
        }

        function pushNodes(nodes1, nodes2) {
            function indexOf(nodes, node) {
                for (let i = 0; i < nodes.length; i++) {
                    if (nodes[i].idx == node.idx) return i;
                }
                return -1;
            }
            for (let i = nodes2.length - 1; i >= 0; i--) {
                let idx = indexOf(nodes1, nodes2[i]);
                if (idx > -1) {
                    !nodes1[idx].txt && (nodes1[idx].txt = nodes2[i].txt);
                    nodes2.splice(i, 1);
                }
            }
            return nodes1.concat(nodes2);
        }

        function getInnerHTMLInfo(pBuffer) {
            let innerHTML = getComment(getUINT(pBuffer)),
                depth = getINT(pBuffer + 4);
            innerHTML && (innerHTML = `<br><br>${innerHTML.split("\n").join("<br>")}<br><br>`);
            return { innerHTML: innerHTML, depth: depth };
        }


        let done = false,
            //pMove = this.m_MoveList.getRoot().getDown(),
            innerHTMLInfo = { innerHTML: "", depth: -2 },
            nodes = [],
            PH,
            NS,
            normalizeNS;
        //post("log", `棋谱中心点为, x = ${centerPos.x}, y = ${centerPos.y}`)
        for (let i = 0; i < 8; i++) {
            PH = transposePath(path, i);
            putPath(PH);
            //post("log",`${new Uint8Array(memory.buffer, in_buffer, path.length*POINT_SIZE)}`);
            wasm_exports._Z14getBranchNodesP6CPointi(in_buffer, path.length);
            NS = getNodes(out_buffer, path.length & 1 ? "○" : "●");
            //post("log",NS)
            normalizeNS = normalizeNodes(NS, i);
            //post("log",normalizeNS)
            nodes = pushNodes(nodes, normalizeNS);
            wasm_exports._Z19searchInnerHTMLInfoP6CPointj(in_buffer, path.length);
            let info = getInnerHTMLInfo(out_buffer);
            if (info.depth > innerHTMLInfo.depth) innerHTMLInfo = info;
        }
        return { nodes: nodes, innerHTML: innerHTMLInfo.innerHTML };
    }


    RenLibDoc.prototype.getAutoMove = function() {
        let len = wasm_exports._Z11getAutoMovev(),
            path = [];
        for (let i = 0; i < len; i++) {
            path.push(Point2Idx(getPoint(out_buffer + i * 2)));
        }
        return path;
    }
    
    RenLibDoc.prototype.lib2sgf = function() {
        let isFormat = false;
        return  createSGFBuffer(wasm_exports._Z16getSGFByteLengthb(isFormat))
        .then(function(buf) {
            sgfUint8 = new Uint8Array(buf);
            sgfUint8Len = 0;
            wasm_exports._Z7lib2sgfb(isFormat);
        })
        .then(function() {
            return {buf: sgfUint8.buffer, byteLen: sgfUint8Len}
        })
    }

    exports.RenLibDoc = RenLibDoc;
})))
