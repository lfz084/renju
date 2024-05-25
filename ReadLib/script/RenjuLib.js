window.RenjuLib = (() => {
    "use strict";
    
    const DEBUG_RENLIB = false;

    function log(param, type = "log") {
        const  print = console[type] || console.log;
        DEBUG_RENLIB && window.DEBUG && (window.vConsole || window.parent.vConsole) && print(`[RenjuLib.js] ${ param}`);
    }

    let url = "./ReadLib/script/RenjuLib_worker.js",
        enable = false,
        errCount = 0,
        wk,
        timer,
        sTime,
        newGame,
        cBoard,
        getShowNum,
        callback,
        isLoading = false,
        colour = false,
        buffer_scale = 5,
        post_number_start = 999999999,
        centerPos = { x: 8, y: 8 };

    const MODE_RENLIB = 7;

    const CMD = {
        loading: function(data) {
            loading(data);
        },
        onerror: function(err) {
            onError(err);
        },
        alert: function(msg) {
            alert(msg);
        },
        log: function(msg) {
        	log(msg, "log");
        },
        warn: function(msg) {
            log(msg, "warn");
        },
        info: function(msg) {
            log(msg, "info");
        },
        error: function(msg) {
            log(msg, "error");
        },
        showBranchs: function(data) {
            showBranchs(data);
        },
        autoMove: function(data) {
        	//msg({"title": JSON.stringify(boardTextArray,null,2),type:"input"})
            autoMove(data);
        },
        /*
        pushBoardText: function(data) {
        	boardTextArray.push(data);
        	log(data)
        }
        */
    };
    let boardTextArray = [];

    function setBufferScale(scl = 5) {
        buffer_scale = scl;
        warn(`设置${scl}倍内存,1M的lib文件会占用${scl}M内存`);
    }

    function setPostStart(start = 0) {
        post_number_start = start;
        alert(`post_number_start = ${post_number_start}`);
    }

    function setCenterPos(point = { x: 8, y: 8 }) {
        centerPos = point;
        enable && warn(`中心点: (${centerPos.x}, ${centerPos.y})`);
    }

    function createWorker() {
        if (errCount > 5) return;
        wk = new Worker(url);
        wk.isBusy = false;
        wk.onmessage = function(e) {
            if (typeof e.data == "object") {
                sTime = new Date().getTime();
                typeof CMD[e.data.cmd] == "function" ? CMD[e.data.cmd](e.data.parameter) :
                    e.data.constructor.name == "Error" ? onError(e.data) :
                    otherMessage(e.data);
            }
            else {
                otherMessage(e.data);
            }
        };
        wk.onerror = function(e) {
            onError(e);
        };
        wk.promiseMessage = (function(param) {
            let wk = this;
            return new Promise((resolve, reject) => {
                function r(e) {
                    if (typeof e.data == "object" && e.data.cmd == "resolve") {
                        wk.removeEventListener("message", r);
                        wk.removeEventListener("error", err);
                        wk.isBusy = false;
                        resolve(e.data.parameter);
                    }
                }

                function err(e) {
                    wk.removeEventListener("message", r);
                    wk.removeEventListener("error", err);
                    wk.isBusy = false;
                    reject(e);
                }
                wk.isBusy = true;
                wk.addEventListener("message", r);
                wk.addEventListener("error", err);
                wk.postMessage(param);
            })
        }).bind(wk);
        //log(`createWorker, wk = ${wk}, \nurl = "${url}"`, "info");
        return wk;
    }

    function removeWorker() {
        wk.terminate();
        wk = null;
    }

    function load(file) {
        wk && removeWorker();
        enable = false;
        wk = createWorker();
        timer = setInterval(catchErr, 1000);
        sTime = new Date().getTime();
        return wk.promiseMessage({ cmd: "setBufferScale", parameter: buffer_scale })
            .then(() => wk.promiseMessage({ cmd: "setPostStart", parameter: post_number_start }))
            .then(() => wk.promiseMessage({ cmd: "openLib", parameter: file }))
            .then(() => {
                enable = true;
                finish();
            })
    }

    function setLoading(message) {
        loadAnimation.open();
        loadAnimation.text(message);
    }

    function loading(data) {
        let current = data.current,
            end = data.end,
            count = data.count,
            message = `${~~(current / end * 100)}%`;
        if (typeof count == "number") message += `  /  ${count}`;
        setLoading(message);
        sTime = new Date().getTime();
    }

    function finish() {
        loadAnimation.close();
        clearInterval(timer);
        timer = null;
        isLoading = false;
    }

    function onError(err) {
        errCount++;
        alert(`WorKer Error: ${err.message || err}`);
        log(`WorKer Error: wk = ${wk.constructor.name}, \nerr = ${err}, \nerr.message = ${err.message}`, "error");
        finish();
        wk && removeWorker();
        enable = false;
    }

    function catchErr() {
        new Date().getTime() - sTime > 30 * 1000 ? onError(new Error("打开文件出错了: 解码过程出现错误")) : undefined;
    }

    function waitFinish() {
        return new Promise((resolve, reject) => {
            isLoading = true;
            let timer = setInterval(() => {
                if (!isLoading) {
                    resolve();
                    clearInterval(timer);
                }
            }, 1000);
        })
    }

    function otherMessage(message) {
        log(message, "warn");
    }

    function showBranchs(data) {
        if (!cBoard) return;
        let nodes = data.nodes,
            innerHTML = data.innerHTML,
            nextMove = { idx: -1, level: -2 },
            level = ["l", "L", "c", "c5", "c4", "c3", "c2", "c1", "w", "W", "a", "a5", "a4", "a3", "a2", "a1"];
        if (!isEqual(data.position, cBoard.getArray2D())) return;
        log(data.nodes, "info");
        cBoard.cleLb("all");
        for (let i = 0; i < nodes.length; i++) {
            if (cBoard.nextColor() === 2 || !isFoul(nodes[i].idx, data.position)) {
                cBoard.wLb(nodes[i].idx, nodes[i].txt, colour ? nodes[i].color : "black");
                if (nextMove.level < level.indexOf(nodes[i].txt)) {
                    nextMove.level = level.indexOf(nodes[i].txt);
                    nextMove.idx = nodes[i].idx;
                }
            }
        }
        if (cBoard.MSindex + 1 === cBoard.MS.length && nextMove.idx > -1) cBoard.MS.push(nextMove.idx);
        outputComment(innerHTML);
        "function" == typeof callback && callback()
    }
    
    let outputComment = function(innerHTML) {
    	let exWindow = window.exWindow;
    	exWindow.innerHTML(innerHTML);
    	if (innerHTML) exWindow.open();
    }

    function autoMove(path) {
        if (!cBoard) return;
        for (let i = 0; i < path.length; i++) {
            cBoard.wNb(path[i], "auto", getShowNum(), undefined, undefined, 100);
        }
    }

    function isEqual(arr1, arr2) {
        for (let i = 0; i < arr1.length; i++) {
            for (let j = 0; j < arr1[i].length; j++) {
                if (arr1[i][j] != arr2[i][j])
                    return false;
            }
        }
        return true;
    }


    return {
        reset: function(param) {
            newGame = param.newGame;
            cBoard = param.cBoard;
            getShowNum = param.getShowNum;
            outputComment = param.outputComment || outputComment;
        },
        isEmpty: function() {
            return !enable;
        },
        openLib: function(file) {
            load(file);
            return waitFinish()
                .then(() => enable)
        },
        closeLib: function() {
            wk && removeWorker();
            enable = false;
        },
        cancal: function() {
        	if (!isLoading) return;
            finish();
            wk && removeWorker();
            enable = false;
        },
        timerShowBranchs: null,
        showBranchs: async function(param) {
            if (enable) {
            	if (wk.isBusy) {
                    if (this.timerShowBranchs) {
                        clearTimeout(this.timerShowBranchs);
                        this.timerShowBranchs = null;
                    }
                    this.timerShowBranchs = setTimeout(() => {
                        this.showBranchs(param);
                    }, 1000);
                }
                else {
                    return wk.promiseMessage({ 
                    	cmd: "setCenterPos", 
                    	parameter: centerPos 
                    })
                    .then(() => {
                    	callback = param.callback;
                    	param.callback = undefined;
                    	return wk.promiseMessage({ cmd: "showBranchs", parameter: param })
                    })
                }
            }
        },
        colour: function() {
            colour = !colour;
        },
        getAutoMove: function() {
            if (enable) {
                cBoard.toStart();
                cBoard.toPrevious();
                wk.promiseMessage({ cmd: "getAutoMove", parameter: undefined });
            }
        },
        lib2sgf: function() {
            return wk.promiseMessage({ cmd: "lib2sgf" })
        },
        setCenterPos: setCenterPos,
        setBufferScale: setBufferScale,
        setPostStart: setPostStart,
    }
})()
