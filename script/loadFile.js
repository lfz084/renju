(function(global, factory) {
    (global = global || self, factory(global));
}(this, (function(exports) {
    'use strict';
    const DEBUG_LOADFILE = false;
    
    function log(param, type = "log") {
        const print = console[type] || console.log;
        DEBUG_LOADFILE && window.DEBUG && (true || window.vConsole || window.parent.vConsole) && print(`[loadFile.js]  ${ param}`);
    }

    //------------------------ loadFont ------------------

    Promise.queue = function(thenables) { // 顺序执行 thenable
        return new Promise((resolve, reject) => {
            function nextPromise() {
                if (thenables.length) {
                    let t = thenables[0];
                    thenables.splice(0, 1);
                    Promise.resolve(t)
                        .then(nextPromise)
                        .catch(e=>reject(e && e.stack || e))
                }
                else {
                    return resolve();
                }
            }
            nextPromise();
        })
    }
    
    function formatURL(url) {
    	return url.split("?")[0].split("#")[0] + "?v=" + parseInt(new Date().getTime()/1000);
    }
    
    function getFileName(url) {
    	return url.split("/").pop().split("?")[0].split("#")[0];
    }

    function createScript(code) { // 用code 创建脚本
        return new Promise((resolve, reject) => {
        	try{
            let oHead = document.getElementsByTagName('HEAD').item(0);
            let oScript = document.createElement("script");
            oHead.appendChild(oScript);
            oScript.type = "text/javascript";
            oScript.text = code;
            setTimeout(resolve, 100);
        	}catch(e){reject(`创建脚本出错: ${e && e.stack || e}`)}
        })
    }

    function loadCss(url) { //加载css
        url = formatURL(url);
        const filename = getFileName(url);
        log(`loadFile: loadCss("${url}")`)
    	return new Promise((resolve, reject) => {
    		try{
            const head = document.getElementsByTagName('head')[0];
            const link = document.createElement('link');
            link.type = 'text/css';
            link.rel = 'stylesheet';
            link.addEventListener("load", () => setTimeout(resolve, 1), true);
            link.addEventListener("error", () => reject(`加载css出错: ${filename}`), true);
            link.href = url;
            head.appendChild(link);
        	}catch(e){reject(`加载${filename}出错: ${e && e.stack || e}`)}
        })
    }
    
    function loadFile(url, responseType = "text") { //加载文件
        url = formatURL(url);
        const filename = getFileName(url);
        log(`loadFile: loadFile("${url}", "${responseType}")`)
    	return new Promise((resolve, reject) => {
    		try{
            const oReq = new XMLHttpRequest();
            oReq.responseType = responseType;
            oReq.addEventListener("load", () => setTimeout(resolve, 1, oReq.response), true);
            oReq.addEventListener("error", () => reject(`加载文件出错: ${filename}`), true);
            oReq.open("GET", url);
            oReq.send();
        	}catch(e){reject(`加载${filename}出错: ${e && e.stack || e}`)}
        })
    }

    function loadFont(url) { //加载字体文件
        return loadFile(url, "arraybuffer");
    }

    function loadTxT(url) {
        return loadFile(url, "text");
    }
    
    function loadJSON(url) {
        return loadFile(url, "json");
    }

    function loadScript(url) { //加载脚本
        url = formatURL(url);
        const filename = getFileName(url);
        log(`loadFile: loadScript("${url}")`)
    	return new Promise((resolve, reject) => {
    		try{
            const oHead = document.getElementsByTagName('HEAD').item(0);
                const oScript = document.createElement("script");
                oHead.appendChild(oScript);
                oScript.type = "text/javascript";
                oScript.as = "script";
                oScript.addEventListener("load", () => {
                    setTimeout(() => {
                        const ver = filename.split(/[\-\_\.]/)[0];
                        self["upData"] && upData.checkScriptVersion(ver);
                        resolve();
                    }, 1);
                }, true)
                oScript.addEventListener("error", (event) => {
                	reject(event.message || `加载Script出错: ${filename}`)
                }, true)
                oScript.src = url;
        	}catch(e){reject(`加载${filename}出错: ${e && e.stack || e}`)}
        })
    }

    function createThenable(loadFun, fileName, callback) { // 返回thenable
        return {
            then: function(onFulfill, onReject) {
                onFulfill(
                    Promise.resolve()
                    .then(() => {
                        return new Promise((resolve, reject) => {
                            function _timeout() {
                                reject(`Error: 连接网络超时\n文件"${fileName}"下载失败`);
                            }
                            setTimeout(_timeout, 300 * 1000);
                            loadFun(fileName)
                                .then(resolve)
                                .catch(e=>reject(e && e.stack || e))
                        })
                    })
                    .then(() => {
                        return callback && new Promise((resolve, reject) => {
                            setTimeout(() => {
                                try {
                                    let p;
                                    if (typeof callback == "function") p = callback();
                                    if (typeof p == "object" &&
                                        typeof p.then == "function" &&
                                        typeof p.catch == "function") {
                                        p.then(resolve).catch(e=>reject(e && e.stack || e)) // p == Promise
                                    }
                                    else {
                                        resolve();
                                    }
                                }
                                catch (e) {
                                    reject(e && e.stack || e)
                                }
                            }, 0)
                        });
                    })
                )
            },
        };
    }

    function createThenables(loadFun, config) {
        let ts = [];
        for (let i = 0; i < config.length; i++) {
            ts.push(createThenable(loadFun, config[i][0], config[i][1]));
        }
        return ts;
    }

    function loadAll(loadFun, config, ayc = false) {
        log(`\n---------- loadFile: loadAll --------\nfunction: ${loadFun.name}All\nasync: ${ayc}\n\t${config.map(u => `url = "${u}"`).join("\n\t")}\n------------------\n`, "info")
        const thenables = createThenables(loadFun, config);
        if (ayc) {
            let ps = [];
            for (let i = 0; i < thenables.length; i++) {
                ps.push(Promise.resolve(thenables[i]));
            }
            return Promise.all(ps);
        }
        else {
            return Promise.queue(thenables);
        }
    }

    function loadCssAll(config, ayc = false) {
        return loadAll(loadCss, config, ayc);
    }

    function loadFontAll(config, ayc = false) {
        return loadAll(loadFont, config, ayc);
    }

    function loadFileAll(config, ayc = false) {
        return loadAll(loadFile, config, ayc);
    }

    function loadScriptAll(config, ayc = false) {
        return loadAll(loadScript, config, ayc);
    }

    async function loadSources(sources) {
        try {
            const fun = {
                cssAll: loadCssAll,
                fileAll: loadFileAll,
                fontAll: loadFontAll,
                scriptAll: loadScriptAll
            }
            window.loadAnimation && (loadAnimation.open(), loadAnimation.lock(true));
            let source;
            while (source = sources.shift()) {
                window.loadAnimation && (loadAnimation.text(source.progress), log(`progress: ${source.progress}`));
                await fun[source.type](source.sources, source.isAsync);
            }
            window.loadAnimation && (loadAnimation.lock(false), loadAnimation.close());
        } catch (e) {
            return Promise.reject(e && e.stack || e)
        }
    }

    exports.createScript = createScript;
    exports.loadCss = loadCss;
    exports.loadTxT = loadTxT;
    exports.loadJSON = loadJSON;
    exports.loadFile = loadFile;
    exports.loadFont = loadFont;
    exports.loadScript = loadScript;
    exports.loadAll = loadAll;
    exports.loadCssAll = loadCssAll;
    exports.loadFontAll = loadFontAll;
    exports.loadFileAll = loadFileAll;
    exports.loadScriptAll = loadScriptAll;
    exports.loadSources = loadSources;
})))
