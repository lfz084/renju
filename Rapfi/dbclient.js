window.DBClient = (() => {
    "use strict";
    
    const DEBUG_DBClient = false;

    function log(param, type = "log") {
        const  print = console[type] || console.log;
        DEBUG_DBClient && window.DEBUG && (window.vConsole || window.parent.vConsole) && print(`[dbclient.js] ${ param}`);
    }
    
    //----------------------------------------------------------

    let url = "./Rapfi/dbclient_worker.js",
        enable = false,
        errCount = 0,
        wk,
        isBusy;

    const CMD = {
        loading: function(param) {
            
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
        }
    };
    
    function createWorker() {
        if (errCount > 5) return;
        wk = new Worker(url);
        wk.isBusy = false;
        wk.onmessage = function(e) {
            if (typeof e.data == "object") {
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
            return new Promise((resolve) => {
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
                    resolve(undefined);
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

    async function removeWorker() {
        const oldWorker = wk;
        wk = null;
        await oldWorker.promiseMessage({ cmd: "close"});
        oldWorker.terminate();
    }

    function onError(err) {
        errCount++;
        alert(`WorKer Error: ${err.message || err}`);
        log(`WorKer Error: wk = ${wk.constructor.name}, \nerr = ${err}, \nerr.message = ${err.message}`, "error");
        wk && removeWorker();
        enable = false;
    }

    function otherMessage(message) {
        log(message, "warn");
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
        openDatabass: async function(file, callback) {
            if (isBusy) return;
            isBusy = true;
            wk && await removeWorker(); // 等待释放内存
            enable = false;
            wk = createWorker();
            CMD.loading = callback;
            const ratio = await wk.promiseMessage({ cmd: "openDatabass", parameter: file });
            enable = ratio > 0;
            isBusy = false;
            return ratio;
        },
        closeDatabass: async function() {
            wk && (await removeWorker());
            enable = false;
        },
        cancal: async function() {
            wk && (await removeWorker());
            enable = false;
        },
        getBranchNodes: async function(param) {
            if (enable) {
                return await wk.promiseMessage({ cmd: "getBranchNodes", parameter: param });
            }
            return {comment: undefined, records: [], position: param.position};
        }
    }
})()
