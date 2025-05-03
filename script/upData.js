window.upData = window.parent.upData || (function() {
    'use strict';
	const DEBUG_UPDATA = false;
    
    function log(param, type = "log") {
    	const print =  self["mlog"] && ((p) => {self["mlog"](p, type)}) || console.log;
    	DEBUG_UPDATA && window.DEBUG && (window.vConsole || window.parent.vConsole) && print(`[upData.js]:  ${ param}`);
    }
    
    const keyRenjuVersion = "RENJU_APP_VERSION";
    const scriptVersion = "v2025.00";
	let currentVersion = localStorage.getItem(keyRenjuVersion) || scriptVersion;
	
    let updateVersion;
    let checkVersion = isCheckVersion();
    
    //-------------------------- localCache -----------------------------------
    
    window.localCache = function() {
    	return {
    		setItem: async function(key, value) {
    			return new Promise(resolve => {
    				try {
    					key = key.toString();
    					value = value.toString();
    					caches.open("localCache").then(cache => cache.put(new Request(key), new Response(value))).then(() => resolve(value)).catch(() => resolve());
    				} catch (e) { resolve() }
    			});
    		},
    		getItem: async function(key) {
    			return new Promise(resolve => {
    				try {
    					key = key.toString();
    					caches.open("localCache").then(cache => cache.match(new Request(key))).then(response => response.text()).then(value => resolve(value)).catch(() => resolve());
    				} catch (e) { resolve() }
    			});
    		},
    		removeItem: async function(key) {
    			return new Promise(resolve => {
    				try {
    					key = key.toString();
    					caches.open("localCache").then(cache => cache.delete(new Request(key))).then(() => resolve(true)).catch(() => resolve(false));
    				} catch (e) { resolve(false) }
    			});
    		}
    	}
    }()
    
    //-------------------------------------------------------------------------------------
    
    async function wait(time) {
        return new Promise(resolve => {
            setTimeout(resolve, time);
        })
    }
    
    async function isFinally(promise) {
    	let isF = true,
    		t = {};
    	await Promise.race([promise, t])
    		.then(v => v === t && (isF = false))
    	return isF;
    }
    
    async function removeFinallyPromise(promiseArray) {
    	for (let j = promiseArray.length - 1; j >= 0; j--) {
    		if (await isFinally(promiseArray[j])) {
    			promiseArray.splice(j, 1);
    		}
    	}
    }
    
    function absoluteURL(url) {
    	return new Request(url).url;
    }
    
    async function ping(url) {
    	return new Promise(resolve => {
    		const time = new Date().getTime();
    		setTimeout(() => resolve(-1), 15 * 1000);
    		fetch(url.split("?=")[0].split("#")[0] + "?cache=onlyNet")
    			.then(response => response.ok ? resolve(new Date().getTime() - time) : resolve(-1))
    	})
    }
    
    async function checkLink(callback = ()=>{}) {
    	callback("正在测试网络链接......");
    	return ping("index.html").then(time => {
    		if (time >= 0) {
    			callback("网络链接正常");
    			return true;
    		}
    		else {
    			callback("❌网络链接异常");
    			return false;
    		}
    	});
    }

    //------------------------- log -----------------------------------------------------
    
    function strLen(str, len, char = " ", align = "left") {
        if (align == "left") {
            return (str + new Array(len).join(char)).slice(0, len)
        }
        else {
            return (new Array(len).join(char) + str).slice(-len)
        }
    }

    async function logCache(cacheName, urls = []) {
        if ("caches" in window) {
            let cacheInfo = {};
            let num = 0;
            const cache = await caches.open(cacheName);
            const keys = cache ? await cache.keys() : [];
            urls = urls.map(url => decodeURIComponent(absoluteURL(url)));
    		if (keys.length < urls.length) {
            	console.error(`upData.js: caches.open(${cacheName}).cache.keys().length == ${keys.length}`)
            }
            cacheInfo[` [${cacheName}]`] = `${keys.length} / ${urls.length} 个文件 ______`;
            keys.forEach(request => {
            	const url = decodeURIComponent(request.url);
            	const index = urls.indexOf(url.replace(/\?v\=[0-9a-z\.\-]*/i, ""));
            	index + 1 && urls.splice(index, 1);
            	cacheInfo[`000${++num}`.slice(-3)] = `${index + 1?"===":"+++"}\t${url.split("/").pop()}`;
            });
            urls.map(url => cacheInfo[`000${++num}`.slice(-3)] = `---${url}`);
            return cacheInfo;
        }
        return `"caches" in window === false`;
    }

    async function logCaches(urls) {
        if ("caches" in window) {
            let cachesInfo = {};
            let cacheInfo = {};
            const cachesNames = await caches.keys();
            if (cachesNames.length == 0) {
            	typeof self.warn == "function" && warn(`️⚠ ️缓存异常 不能离线运行 刷新一下吧!`);
            	console.error(`upData.js: caches.keys().length == 0`)
            }
            cachesInfo[`离线缓存 ${cachesNames.length} 个`] = cacheInfo;
            for (let index in cachesNames) {
            	const cacheName = cachesNames[index];
            	cacheInfo[cacheName] = await logCache(cacheName, (/currentCache|updataCache/i).test(cacheName) ? urls : undefined);
            }
            return cachesInfo;
        }
        return `"caches" in window === false`;
    }

    function logVersions() {
        let Msg = "";
        Msg += `currentCache 缓存版本号: ${currentVersion}\n`;
        Msg += `updateCache 缓存版本号: ${updateVersion}\n`;
        return Msg;
    }
    
    function logVersionInfo(version = currentVersion, UPDATA_INFO = window.UPDATA_INFO) {
    	function lineWrap(str) {
    		return str.split(/\\n|<br>/).join("\n")
    	}
    
    	let infoArr = UPDATA_INFO[version],
    		Msg = "";
    	if (infoArr) {
    		Msg += `\n _____________________ `;
    		Msg += `\n 版本： ${version}\n`;
    		for (let i = 0; i < infoArr.length; i++)
    			Msg += `\n${strLen(i+1, 2)}. ${lineWrap(infoArr[i])}`
    		Msg += `\n _____________________ `;
    	}
    	return Msg;
    }
    
    function logUpDataCompleted() {
    	if ("localStorage" in window) {
    		if (checkVersion && localStorage.getItem(keyRenjuVersion) != currentVersion) {
    			let Msg = "";
    			Msg += `摆棋小工具 更新完毕`
    			Msg += logVersionInfo();
    			return Msg;
    		}
    	}
    	return "";
    }
    
    //------------------------- Version control --------------------------------------------------------
    
    function delayCheckVersion() {
    	checkVersion = false;
    	localStorage.setItem("delayCheckVersion", new Date().getTime());
    }
    
    function isCheckVersion() {
    	const notUpDataTime = parseInt(localStorage.getItem("delayCheckVersion")) || 0;
    	return (new Date().getTime() - notUpDataTime) > 24 * 3600 * 1000
    }
    
    function resetUpdataVersion() {
    	localStorage.removeItem(keyRenjuVersion);
    	localStorage.removeItem("delayCheckVersion");
    }
    
    function saveAppVersion(version) {
    	localStorage.removeItem("delayCheckVersion");
    	localStorage.setItem(keyRenjuVersion, version);
    	try {("caches" in window) && localCache.setItem(keyRenjuVersion, version)}catch(e){console.error(e && e.stack || e)};
    }
    
    async function refreshVersionInfos() {
    	const updataScriptVersion = scriptVersion;
    	return serviceWorker.postMessage({ cmd: "refreshVersionInfos" }, 30 * 1000)
    		.then(({ scriptVersion, currentCacheKey, updataCacheKey, currentVersionInfo, updateVersionInfo }) => {
    			currentVersion = currentVersionInfo && currentVersionInfo.version;
    			updateVersion = updateVersionInfo && updateVersionInfo.version;
    			console.log(`updata Version: ${updataScriptVersion} \nserviceWorker Version: ${scriptVersion} \ncurrentCacheKey: ${currentCacheKey} \nupdataCacheKey: ${updataCacheKey}`);
    		})
    }
    
    async function checkScriptVersion(filename) {
        const ver = window.SCRIPT_VERSIONS[filename];
        log(`checkScriptVersion [${[filename, ver || "undefined"]}]`, "info");
        if (ver && (ver != currentVersion)) {
            const ERR = `reload`;
            const ASK = `版本号不一致，可能影响正常运行\n_____________________\n\n${strLen("主页", 25)}版本号: ${currentVersion} \n${strLen(filename + ".js", 25)}版本号: ${window.SCRIPT_VERSIONS[filename]} \n_____________________\n\n`;
            const PS = `是否更新？\n\n${strLen("",15)}[取消] = 不更新${strLen("",10)}[确定] = 更新`;
            if (checkVersion && confirm(ASK + PS)) {
                await resetApp()
                resetUpdataVersion();
                await window.reloadApp();
            }
            else {
                checkVersion && delayCheckVersion();
            }
        }
    }

    async function checkAppVersion() {
        log(`checkAppVersion {currentVersion: ${currentVersion}, scriptVersion: ${scriptVersion}}`, "info")
        if ("localStorage" in window) {
            const ASK = `有新的更新\n\n 当前版本号: ${currentVersion} \n 新的版本号: ${scriptVersion}\n${logVersionInfo(scriptVersion)}\n`;
            const PS = `是否更新？\n\n${strLen("",15)}[取消] = 不更新${strLen("",10)}[确定] = 更新`;
            if (currentVersion != scriptVersion) {
                if (checkVersion && confirm(ASK + PS)) {
                    if (!(await checkLink())) {
                    	alert("网络异常");
                    	return;
                    }
                    await serviceWorker.updateServiceWorker();
                    await removeAppCache();
                    resetUpdataVersion();
                    await window.reloadApp()
                }
                else {
                    checkVersion && delayCheckVersion();
                }
            }
        }
    }
    
    //------------------------ update -----------------------------------------------------
    
    async function resetAndUpData() {
    	if (!(await checkLink())) {
    		alert("网络异常");
    		return;
    	}
    	await serviceWorker.updateServiceWorker();
    	await removeAppCache();
        resetUpdataVersion();
        await window.reloadApp();
    }

    async function fetchTXT(url) {
    	url = url.split("?")[0].split("#")[0] + "?cache=onlyNet";
        return fetch(url).then(r=>r.text())
    }

    async function getUpDataVersion() {
        const txt = await fetchTXT("Version/SOURCE_FILES.json");
        const versionCode = (/\"v\d+\.*\d*\"/i).exec(txt);
        const version = versionCode ? String(versionCode).split(/[\"\;]/)[1] : undefined;
        return {
            version: version,
            isNewVersion: version && version != currentVersion
        }
    }
    
    async function moveToCurrentCache() {
    	await serviceWorker.updateServiceWorker();
    	resetUpdataVersion(); 
    	return checkLink()
    		.then(online => online && serviceWorker.postMessage({cmd: "moveToCurrentCache"}, 60 * 1000))
    		.then(done => { 
    			if (!done) return;
    			/*延迟刷新，避开 Firefox serviceWorker fetch event respondWith bug*/
    			setTimeout(()=>window.reloadApp(), 3000);
    			(window.warn || window["fullscreenUI"] && fullscreenUI.contentWindow.warn || alert)("更新完成，3秒后刷新");
    		})
    }
    
    async function deleteCache(cacheKey) {
    	return caches.open(cacheKey)
    		.then(cache => cache.keys().then(requests => {
    			const ps = [];
    			requests.map(request => ps.push(cache.delete(request)));
    			return Promise.all(ps);
    		}))
    		.then(() => caches.delete(cacheKey))
    }
    
    async function removeAppCache(callback = () => {}, filter = () => true) {
    	if ("caches" in window) {
    		const cacheNames = await caches.keys();
    		cacheNames && cacheNames.map(cacheName => {
    			if (filter(cacheName)) {
    				deleteCache(cacheName);
    				log(`delete cache: ${cacheName}`, "info");
    				callback(cacheName)
    			}
    		})
    	}
    }
    
    async function removeOldAppCache() {
    	return removeAppCache(undefined, cacheName => cacheName != "localCache" && cacheName != currentVersion)
    }
    
    async function resetApp() {
    	if (!(await checkLink())) {
    		alert("网络异常");
    		return;
    	}
    	await serviceWorker.updateServiceWorker()
    	await removeAppCache()
    }
    
    async function searchUpdate() {
    	try {
    		async function fetchInfo(url) {
    			try { return JSON.parse(await fetchTXT(url)) } catch (e) {}
    		}
    		const rt = { title: "", warn: "", action: "", actionLabel: "", fun: () => {} };
    		const info = await fetchInfo("Version/UPDATA_INFO.json");
    		const version = await getUpDataVersion();
    		const { updateVersionInfo } = await serviceWorker.postMessage({ cmd: "getVersionInfos" }, 5000);
    		if (version.isNewVersion) {
    			const Cached = updateVersionInfo && updateVersionInfo.version == version.version && await serviceWorker.postMessage({ cmd: "checkCache", arg: "updataCache" }, 30 * 1000);
    			rt.title = `${Cached && "新版本已下载完成" || "发现新版本"} ${version.version}` + upData.logVersionInfo(version.version, info) + "\n";
    			rt.warn = `是否更新？\n\n${strLen("",15)}[取消] = 不更新${strLen("",10)}[确定] = 更新`;
    			rt.action = Cached ? "moveToCurrentCache" : "update";
    			rt.actionLabel = Cached ? "缓存" : "更新";
    		}
    		else {
    			const ck = await serviceWorker.postMessage({ cmd: "checkCache", arg: "currentCache" }, 30 * 1000)
    			if (!ck) {
    				rt.title = `当前版本离线缓存不完整，你可以点击缓存\n`;
    				rt.action = "updateCache";
    				rt.actionLabel = "缓存";
    			}
    			else rt.title = "没有发现新版本\n"
    		}
    		return rt;
    	} catch (e) { console.error(e.stack) }
    }

    //------------------------ cache -----------------------------------------
    
    const requestInit = {cache: "no-store", mode: 'cors'};
    Object.freeze(requestInit);
    
    function getUrlVersion(version) {
    	return "?v=" + version;
    }
    
    function formatURL(url, version) {
    	url = absoluteURL(url).split("?")[0].split("#")[0];
    	const URL_VERSION = "";//getUrlVersion(version);
    	const indexHtml = url.split("/").pop().indexOf(".") == -1 ? (url.slice(-1) == "/" ? "" : "/") + "index.html" : "";
    	return url + indexHtml + URL_VERSION
    }
    
    function checkServiceWorkerAndCaches() {
    	if (!('serviceWorker' in navigator)) {
    		console.warn(`upData.js: checkServiceWorkerAndCaches 'serviceWorker' in navigator = false`)
    		return false;
    	}
    	if(!navigator.serviceWorker.controller) {
    		console.warn(`upData.js: checkServiceWorkerAndCaches navigator.serviceWorker.controller = ${navigator.serviceWorker.controller}`)
    		return false;
    	}
    	if(!("caches" in window)) {
    		console.warn(`upData.js: checkServiceWorkerAndCaches "caches" in window = false`)
    		return false;
    	}
    	return true;
    }
	
    async function loadCache(cache, url) {
    	log(` loadCache ${url}`)
    	return await cache.match(new Request(url, requestInit));
    }
    
    async function putCache(cache, url, response) {
    	log(` putCache ${url}`)
    	return await cache.put(new Request(url, requestInit), response)
    }
    
    async function downloadToCache(url, cache) {
    	try{
			const response = await fetch(new Request(url.split("?")[0].split("#")[0] + "?v=" + new Date().getTime(), requestInit));
    		if (response.ok) {
    			await putCache(cache, url, response);
    			return await loadCache(cache, url)
    		}
    		else throw new Error(`response.ok = ${response.ok}`)
    	}catch(e){
    		console.error(`upData.js: downloadToCache ${e.stack}, url = ${url}`);
    		return false
    	}
    }
    
    async function saveCacheFile(url, cache, version = currentVersion) {
    	if(!checkServiceWorkerAndCaches()) return;
    	const response = await loadCache(cache, url);
    	if (response) {
    		log(` saveCacheFile loaded "${url}" in cache ${version}`, "info")
    		return 2;
    	}
    	else {
    		return !!await downloadToCache(url, cache) ? 1 : 0;
    	}
    }
    
    async function saveCacheFiles(urls, version = currentVersion) {
    	if(!checkServiceWorkerAndCaches()) return;
    	urls = urls.map(url => formatURL(absoluteURL(url), version));
    	
    	window.loadAnimation && (loadAnimation.open(), loadAnimation.lock(true));
    	const cache = await caches.open(version);
    	
    	const numFiles = urls.length;
    	const errUrls = [];
    	const ps = [];
    	let countFiles = 0;
    	
    	const waitSaveCacheFile = async () => { 
    			const url = urls.shift();
    			const rt = await saveCacheFile(url, cache);
    			rt == 0 && errUrls.push(url);
    			rt === 1 && window.loadAnimation && loadAnimation.text(`下载离线资源<br> ${++countFiles} / ${numFiles}`)
    		}
    		
    	while (urls.length) {
    		if (ps.length < 6) {
    			ps.push(waitSaveCacheFile());
    		}
    		else {
    			await Promise.race(ps);
    			await removeFinallyPromise(ps);
    		}
    	}
    	await Promise.all(ps);
    	
    	console[errUrls.length ? "error" : "info"](`upData.js: saveCacheFiles finish ${errUrls.length} error in ${numFiles} urls \n${errUrls.join("\n")}`)
    	window.loadAnimation && (loadAnimation.lock(false),loadAnimation.close());
    	return errUrls.length;
    }
    
    async function updateCache() {
    	if(!checkServiceWorkerAndCaches()) return;
    	return serviceWorker.postMessage({ cmd: "updateCache" }, 300 * 1000)
    }

    return {
        get ping() { return ping },
        get checkLink() { return checkLink },
        
        get isCheckVersion() { return isCheckVersion },
        get delayCheckVersion() { return delayCheckVersion },
        get currentVersion() { return currentVersion},
        get saveAppVersion() { return saveAppVersion },
        get resetUpdataVersion() { return resetUpdataVersion },
        get getUpDataVersion() { return getUpDataVersion },
        get refreshVersionInfos() { return refreshVersionInfos },
        get checkAppVersion() { return checkAppVersion },
        get checkScriptVersion() { return checkScriptVersion },
    	
        get deleteCache() { return deleteCache },
        get removeAppCache() { return removeAppCache },
        get removeOldAppCache() { return removeOldAppCache },
        get resetAndUpData() { return resetAndUpData },
        get searchUpdate() { return searchUpdate },
        get resetApp() { return resetApp },
        get fetchTXT() { return fetchTXT },
        get updateCache() { return updateCache },
        get saveCacheFiles() { return saveCacheFiles },
        get moveToCurrentCache() { return moveToCurrentCache },
        
        get logCache() { return logCache },
        get logCaches() { return logCaches },
        get logVersions() { return logVersions },
        get logVersionInfo() { return logVersionInfo },
        get logUpDataCompleted() { return logUpDataCompleted }
    }
})()
