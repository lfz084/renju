window.SCRIPT_VERSIONS = [];
//self.SCRIPT_VERSIONS["renju"] = "2024.23206";
window.loadApp = (() => { // 按顺序加载应用
try{
    "use strict";
    window.DEBUG = true;
    const DEBUG_LOADAPP = true;

    //--------------------- log -----------------------

    function log(param, type = "log") {
        const print = console[type] || console.log;
    	if (DEBUG_LOADAPP && window.DEBUG && (window.vConsole || window.parent.vConsole)) {
            const MSG = `${param}`;
            print(`[loadApp.js]  ${MSG}`);
            "mlog" in window && typeof mlog == "function" && mlog(MSG);
        }
    }

    function testConsole() {
        console.clear("clear")
        console.info("info")
        console.error("error")
        console.warn("warn")
        console.assert("assert")
        console.count("count")
        console.group("group")
        console.group("group1")
        console.groupEnd("groupEnd")
        console.groupCollapsed("groupCollapsed")
        console.groupCollapsed("groupCollapsed1")
        console.groupEnd("groupEnd")
        console.table("table")
        console.time("time")
        console.timeEnd("timeEnd")
        console.trace("trace")
    }

    function logTestBrowser() {
        let Msg = "";
        Msg += `__________ logTestBrowser ___________\n\n `;
        Msg += `fullscreenEnabled: ${document.fullscreenEnabled}\n`;
        Msg += `localStorage: ${"localStorage" in window}\n`;
        Msg += `caches: ${"caches" in window}\n`;
        Msg += `Worker: ${"Worker" in window}\n`;
        Msg += `serviceWorker: ${"serviceWorker" in navigator}\n`;
        Msg += `SharedArrayBuffer: ${"SharedArrayBuffer" in window}\n`;
        Msg += `indexedDB: ${"indexedDB" in window}\n`;
        Msg += `msSaveOrOpenBlob in navigator: ${"msSaveOrOpenBlob" in navigator}\n`;
        Msg += `download in HTMLAnchorElement.prototype: ${"download"  in HTMLAnchorElement.prototype}\n`;
        Msg += `_____________________\n\n `;
        Msg += `\nuserAgent: ${window.navigator.userAgent}\n`
        Msg += `_____________________\n\n `;
        return Msg;
    }

    //-----------------------------------------------

    window.d = document;
    window.dw = d.documentElement.clientWidth;
    window.dh = d.documentElement.clientHeight;
    window.vConsole = null; // 调试工具
    window.cBoard = null; //棋盘对象
    
    const isTopWindow = window === window.parent;
	const fullscreenEnabled = true && document.fullscreenEnabled && isTopWindow && !localStorage.getItem("fullscreenCancel");
	const openVconsoleSwitch = {
    		FAST_SMALL: 1,
    		DELAY_LARGE: 2,
    		LAST_LARGE: 3
    	}
    const vconsoleSwitch = false && openVconsoleSwitch.FAST_SMALL || localStorage.getItem("debug");
    
	window.alert = function(name) { //更改默认标题
        const IFRAME = document.createElement('IFRAME');
        IFRAME.style.display = 'none';
        IFRAME.setAttribute('src', 'data:text/plain,');
        document.documentElement.appendChild(IFRAME);
        window.frames[0].window.alert(name);
        IFRAME.parentNode.removeChild(IFRAME);
    }
    
    window.fullscreenCancel = function(){localStorage.setItem("fullscreenCancel", "true")}
    
    window.openVconsole = async function (debugSwitch) {
    	if (isTopWindow && (debugSwitch || vconsoleSwitch)) {
    		!("VConsole" in window) && (await loadScript("debug/vconsole.min.js"));
    		debugSwitch && localStorage.setItem("debug", debugSwitch);
    		if (vConsole == null) {
    			vConsole = new VConsole();
    			console.log(`open vConsole time: ${new Date().getTime()}`);
    		}
    		else console.log("skip open vConsole");
    		"fullscreenUI" in window && (fullscreenUI.contentWindow.console = fullscreenUI.contentWindow.parent.console);
    		return vConsole;
    	}
    }
    
    window.closeVconsole = function () {
    	if (vConsole) {
			vConsole.destroy();
			localStorage.removeItem("debug");
		}
		vConsole = null;
    }
    
    window.wakeLock = {
    	wakeLock: null,
    	lock: async function() {
    		if ("wakeLock" in navigator && !this.wakeLock) {
    			return navigator.wakeLock.request("screen")
    				.then(wakeLock => {
    					this.wakeLock = wakeLock;
    					(window.warn || fullscreenUI.contentWindow.warn)("🔒锁定屏幕唤醒", 1800)
    				})
    				.catch(() => (window.warn || fullscreenUI.contentWindow.warn)("❌屏幕唤醒失败",1500))
    				.then(()=>{})
    		}
    	},
    	unlock: async function() {
    		if ("wakeLock" in navigator && this.wakeLock) {
    			return this.wakeLock.release()
    				.then(() => {
    					this.wakeLock = null;
    					(window.warn || fullscreenUI.contentWindow.warn)("🔑解除屏幕唤醒",1500)
    				})
    		}
    	}
    };

    window.addEventListener("error", function(event) {
    	log(event.message || event, "error");
    })
    
    function onerror(err) {
    	const ASK = `❌加载过程出现了错误...\n${err && err.stack || err}\n\n`;
    	const PS = `是否重置数据\n\n`;
    	if (false && (window.vConsole || window.parent.vConsole || window["fullscreenUI"] && fullscreenUI.contentWindow.vConsole)) {
    		console.error(ASK);
    		setTimeout(() => {
    			"caches" in self && caches.open("log").then(cache => cache.match("log")).then(response => response.text()).then(console.log)
    		}, 6000)
    	}
    	else {
    		const numTryReload = 2;
    		let reloadCount = localStorage.getItem("reloadCount") * 1 || 0;
    		localStorage.setItem("reloadCount", ++reloadCount);
    		reloadCount > numTryReload && localStorage.removeItem("reloadCount");
    		if (reloadCount > numTryReload && confirm(ASK + PS)) {
    			window.location.href = "upData.html";
    		}
    		else {
    			window.mlog && mlog("准备刷新页面...");
    			window.loadAnimation && loadAnimation.text("准备刷新页面...");
    			window.reloadApp && window.reloadApp() || window.top.location.reload();
    		}
    	}
    }

    const BUT = document.createElement("div");
    BUT.setAttribute("id", "mlog");
    BUT.style.zIndex = "999999";
    document.body.appendChild(BUT);

    function removeMlog() {
        BUT && BUT.parentNode && BUT.parentNode.removeChild(BUT);
        BUT && BUT.remove();
        window.mlog = undefined;
    }
    
    window.mlog = (function() {
        let timer;
        let timer2;
        return function(message, type = "log") {
        	timer && clearTimeout(timer);
            timer2 && clearTimeout(timer2);
            if (!BUT.parentNode) return;
            BUT.innerHTML = message;
            BUT.removeAttribute("class");
            
            console[type || "log"](message);
            timer = setTimeout(() => {
            	BUT.innerHTML = `<div>下载离线资源中......</div>`;
            	BUT.setAttribute("class", "refresh")
            }, 1 * 1000)
            
            timer2 = setTimeout(() => {
            	BUT.innerHTML = `<div>你的网络好像不太稳定<br>请点击下面任一链接切换站点<br><br><a href="${window.location.href}" target="_top">点击刷新</a><br><br><a href="https://renjutool.asia/" target="_top">站点1</a><br><br><a href="https://renju.pages.dev/" target="_top">站点2</a><br><br><a href="https://lfz084.github.io/renju/" target="_top">站点3</a><br><br><a href="./offlineUpdate.html" target="_top">从本地安装</a><br><br></div>`;
            	BUT.setAttribute("class", "refresh")
            }, 10 * 1000)
        }
    })()

    window.reloadApp = async function(codeURL) {
    	const timestamp = ("navigator" in self && navigator.serviceWorker && navigator.serviceWorker.controller) ? "" : ("?v=" + new Date().getTime());
    	const url = window.location.href.split("?")[0].split("#")[0] + `${timestamp}${codeURL ? "#" + codeURL : ""}`
        window.top.location.href = url;
        return new Promise(resolve => setTimeout(resolve, 30 * 1000));
    }

    window.codeURL = (window.location.href.split("#")[1] || "").split("?")[0] || "";

	document.body.onload = async function load() {
    try {
    	window.console = window.parent.console;
    	
    	vconsoleSwitch == openVconsoleSwitch.FAST_SMALL && isTopWindow && (await openVconsole());
    	vconsoleSwitch == openVconsoleSwitch.DELAY_LARGE && !fullscreenEnabled && (await window.parent.openVconsole());
		
		!fullscreenEnabled && console.info(logTestBrowser());
    	
    	window.SOURCE_FILES = window.SOURCE_FILES || (await loadJSON("Version/SOURCE_FILES.json")).files;
        window.UPDATA_INFO = await loadJSON("Version/UPDATA_INFO.json");
		
		if (localStorage.getItem("IsPrivate") === null) {
		    loadScript("script/detectIncognito.min.js")
		        .then(() => {
		            detectIncognito()
		                .then(function(result) {
		                    localStorage.setItem("IsPrivate", !!result.isPrivate);
		                    if (result.isPrivate) alert(`检测到你在用无痕模式访问网站。\n关闭浏览器后"离线缓存"和"网站设置"等数据会丢失。`)
		                })
		                .catch(() => {localStorage.setItem("IsPrivate", false)})
		                .then(() => {
		                    if ("document" in self) {
		                        for (const st of document.scripts) {
		                            /detectIncognito\.min\.js/.test(st.src) && st.remove()
		                        }
		                    }
		                })
		        })
		}
		
		const sources = window.appSources;
		const uiSources = fullscreenEnabled && 
			[{
				progress: "0%",
				type: "cssAll",
				isAsync: true,
				sources: [[SOURCE_FILES["loaders"]],
				[SOURCE_FILES["fullscreen"]]]
			},{
			 	progress: "2%",
				type: "scriptAll",
				isAsync: false,
				sources:[[SOURCE_FILES["Button"]],
				[SOURCE_FILES["ImgButton"]],
				[SOURCE_FILES["IndexedDB"]],
				[SOURCE_FILES["settingData"]],
				[SOURCE_FILES["fullscreenUI"]]]
			}] || 
			[{
				progress: "3%",
				type: "cssAll",
				isAsync: true,
				sources: [[SOURCE_FILES["loaders"]],
				[SOURCE_FILES["main"]]]
			},{
				progress: "25%",
				type: "scriptAll",
				isAsync: false,
				sources:[[SOURCE_FILES["emoji"]],
				[SOURCE_FILES["IndexedDB"]],
				[SOURCE_FILES["settingData"]],
				[SOURCE_FILES["utils"]],
                [SOURCE_FILES["bindevent"]],
                [SOURCE_FILES["Button"]],
                [SOURCE_FILES["ImgButton"]],
                [SOURCE_FILES["msgbox"]],
                [SOURCE_FILES["mainUI"]]]
			}];
			
        mlog(`url: ${window.location.href}`)
        mlog(`body onload`)
        
        await loadScriptAll([
        	[SOURCE_FILES["loadAnimation"]],
        	[SOURCE_FILES["upData"]],
        	[SOURCE_FILES["serviceWorker"]],
        	[SOURCE_FILES["Viewport"]]
    	], false)
    	
        if (false && window.location.href.indexOf("http://") > -1) {
        	mlog("removeServiceWorker ......");
        	await serviceWorker.removeServiceWorker();
        }
    	else if(isTopWindow) {
        	mlog("registerServiceWorker ......");
        	await serviceWorker.registerServiceWorker();
    	}
    	
    	if (navigator.serviceWorker && navigator.serviceWorker.controller) {
        	mlog("upData.refreshVersionInfos ......");
        	await upData.refreshVersionInfos();
        	if (isTopWindow) {
        	    fetch("zip/jszip.min.js")
        	    fetch("offlineUpdate.html")
        	}
    	}
        
        mlog(`loading ${fullscreenEnabled ? "fullscreenUI" : "mainUI"}......`);
        await loadSources(uiSources);
        
        !isTopWindow && window.parent.fullscreenUI && window.parent.fullscreenUI.viewport.resize();
    	!isTopWindow && setTimeout(() => vconsoleSwitch == openVconsoleSwitch.FAST_SMALL && window.parent.fullscreenUI && window.parent.fullscreenUI.viewport.userScalable(), 1500);
        
        if ("fullscreenUI" in self) {
        	mlog(`fullscreenUI.src = ${window.location.href}`, "warn")
        	fullscreenUI.src = window.location.href;
        	vconsoleSwitch == openVconsoleSwitch.FAST_SMALL && fullscreenUI.viewport.userScalable();
        	removeMlog();
        	return;
        }
        
        await loadSources(sources);
        loadAnimation.lock(false);
        loadAnimation.close();
        
        window.jsPDF = window.jspdf && window.jspdf.jsPDF;
         
        const str = upData.logUpDataCompleted();
    	if (str) { //更新已经完成，弹窗提示
    		upData.saveAppVersion(upData.currentVersion);
        	warn("摆棋小工具更新完成")
        }
        
        const logCaches = !fullscreenEnabled && (window.vConsole || window.parent.vConsole) && (await upData.logCaches(Object.keys(SOURCE_FILES).map(key => SOURCE_FILES[key])));
        logCaches && console.info(upData.logVersions());
        logCaches && console.info(logCaches);
        
    	vconsoleSwitch == openVconsoleSwitch.LAST_LARGE && !fullscreenEnabled && (await window.parent.openVconsole());
    	serviceWorker.postMessage({cmd: "postDelayMessages"});
    	
    	(window.vConsole || window.parent.vConsole) && (vconsoleSwitch == openVconsoleSwitch.FAST_SMALL || isTopWindow) && !fullscreenEnabled && mainUI.viewport.userScalable()
        //window["mainUI"] && upData.searchUpdate();
        
        removeMlog();
        localStorage.removeItem("reloadCount");
    }catch(err) { 
        async function ping(url) {
            return new Promise(resolve => {
                const time = new Date().getTime();
                setTimeout(() => resolve(-1), 15 * 1000);
                fetch(url.split("?=")[0].split("#")[0] + "?cache=onlyNet")
                    .then(response => response.ok ? resolve(new Date().getTime() - time) : resolve(-1))
            })
        }
        ping("index.html").then(time => {
    		if (time < 0) confirm("❌网站的链接断开了，是否刷新页面？") && onerror(err);
    		else onerror(err);
    	})
    }
    }
}catch(err) { location.href = "upData.html" }
})()
