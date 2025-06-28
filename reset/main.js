(async () => {
	try{
    "use strict";
    const d = document;
    const dw = d.documentElement.clientWidth;
    const dh = d.documentElement.clientHeight;
    
    
    function $(id) { return document.getElementById(id) };

    function log(text) { 
    	const logDiv = $("log");
    	const innerHTML = logDiv.innerHTML.replace(/(\<br\>|\n)+$/ig, "") + "<br>"
    	logDiv.innerHTML = innerHTML + text.replace(/^(\<br\>|\n)+|(\<br\>|\n)+$/ig, "") + "<br>";
    	logDiv.scrollTop += 500;
    	mainUI.viewport.scrollTop();
    }
    
    //-----------------------------------------------------------------------
    class removeButton {
    	constructor(parent, src, title, callback = () => {}) {
    		const div = document.createElement("div");
    		const img = document.createElement("img");
    		const label = document.createElement("label");
    
    		const height = mainUI.buttonHeight * 1.8;
    		const fontSize = mainUI.buttonHeight;
    
    		parent.appendChild(div);
    		div.appendChild(img);
    		div.appendChild(label);
    
    		img.src = src;
    		label.innerHTML = title;
    
    		Object.assign(div.style, {
    			cursor: "pointer",
				position: "relative",
    			height: height + "px"
    		})
    
    		Object.assign(img.style, {
    			position: "absolute",
    			left: "0px",
    			top: "5px",
    			width: height - 10 + "px",
    			height: height - 10 + "px",
    			borderRadius: "50%",
    			opacity: 0.6
    		})
    
    		Object.assign(label.style, {
    			position: "absolute",
    			left: parseInt(img.style.width) + 15 + "px",
    			top: img.style.top,
    			fontSize: fontSize + "px",
    			lientHeight: fontSize + "px"
    		})
    		div.addEventListener("mousedown", () => div.style.border = `5px ${document.body.style.color} dashed`, true);
			div.addEventListener("mouseup", () => setTimeout(()=>div.style.border="", 500), true);
			div.addEventListener("click", callback, true);
    	}
    }
    
    async function checkLink() {
    	return upData.checkLink(str => log(str + "<br>"))
    }
    
    async function upDataApp() {
    	log("<br>");
    	await updateServiceWorker()
    	upData.resetUpdataVersion()
    	await removeCaches()
    	await serviceWorker.postMessage({cmd: "waitCacheReady"}, 60 * 1000)
    	const ok = await saveCacheFiles();
    	ok && toIndex()
    }
    
    async function saveCacheFiles() {
    	log("<br>");
    	const files = (await loadJSON("Version/SOURCE_FILES.json")).files;
    	const urls = Object.keys(files).map(key => files[key]);
    	const { currentCacheKey } = await serviceWorker.postMessage({cmd: "getCacheKeys"}, 5000);
    	const errCount = await upData.saveCacheFiles(urls, currentCacheKey);
    	log(`缓存结束,${errCount}个文件错误<br>`)
    	return !errCount;
    }
    
    async function updateCache() {
    	log("<br>");
    	const done = await upData.updateCache();
    	log(`${done?"缓存结束":"缓存失败！<br>请刷新页面,查看版本信息"}<br>`)
    	return done;
    }
    
    async function moveToCurrentCache() {
    	log("<br>");
    	await updateServiceWorker();
    	upData.resetUpdataVersion();
    	const ok = await serviceWorker.postMessage({cmd: "moveToCurrentCache"}, 60 * 1000).then(ok => (log(`${ok && "更新完成<br>" || "更新失败！<br>请刷新页面,查看版本信息<br>"}`), ok));
    	ok && toIndex()
    }
    
    async function logNewVersion() {
    	const up = await upData.searchUpdate();
    	if (up) {
    		log("正在搜索可用更新......<br>");
			log(up.title.split("\n").join("<br>"));
			if (up.action) {
				async function onclick() {
					btn.removeEventListener("click", onclick, true);
					up.action == "moveToCurrentCache" ? (await checkLink() && moveToCurrentCache()) : up.action == "updateCache" ? (await checkLink() && updateCache()) : (await checkLink() && updateCache().then(done=>done&&moveToCurrentCache()));
				}
				const logDiv = $("log");
				const btn = document.createElement("a");
				btn.innerHTML = "点击" + up.actionLabel;
				logDiv.appendChild(btn);
				btn.addEventListener("click", onclick, true);
				btn.scrollIntoView({behavior: "smooth"});
			}
    	}
    }
    
    async function removeServiceWorker() {
    	return serviceWorker.removeServiceWorker(registration => log(`删除 serviceWorker ${registration.scope}<br>`))
    }
    
    async function updateServiceWorker() {
    	return serviceWorker.updateServiceWorker(registration => log(`更新 serviceWorker ${registration.scope}<br>`))
    }
    
    async function removeCaches() {
    	return upData.removeAppCache(key => log(`删除 caches ${key}<br>`))
    }
    
    function removeLocalStorage() {
    	"localStorage" in window &&
    		Object.keys(localStorage).map(key => {
    			localStorage.removeItem(key);
    			log(`删除 localStorage ${key}<br>`);
    		})
    }
    
    async function removeDatabass() {
    	await IndexedDB.delete("lfz084");
    	log(`删除本地数据库<br>`);
    }
    
    function toIndex() {
    	let s = 5;
    	log(`<font id = "sec">${s}</font>秒后回到首页<br>`);
    	let timer = setInterval(() => {
    		s--;
    		$("sec").innerHTML = s;
    		if(s <= 0) {
    			clearInterval(timer);
    			timer = null;
				const timestamp = ("navigator" in self && navigator.serviceWorker && navigator.serviceWorker.controller) ? "" : ("?v=" + new Date().getTime());
    			window.top.location.href = "index.html" + timestamp;
    		}
    	}, 1000);
    }
    
    //------------------ --- -----------------------------
	
	const btnSettkng = [
		{
			src: "settings.png",
			title: "从本地更新版本",
			callback: async function() {
				window.top.location.href="offlineUpdate.html";
			}
		},
		{
			src: "settings.png",
			title: "删除数据后更新",
			callback: async function() {
				await checkLink() && msg({
					title: "请确认删除本地缓存后，更新到最新版本。本地数据库不会被删除",
					butNum: 2,
					enterFunction: () =>  (removeLocalStorage(), upDataApp())
				})
			}
		},
		{
			src: "settings.png",
			title: "删除 ServiceWorker",
			callback: async function() {
				await msg({
					title: "请确认删除 ServiceWorker",
					butNum: 2,
					enterFunction: removeServiceWorker
				})
			}
		},
		{
			src: "settings.png",
			title: "删除 localStorage",
			callback: async function() {
				await checkLink() && msg({
					title: "请确认删除 localStorage",
					butNum: 2,
					enterFunction: removeLocalStorage
				})
			}
		},
		{
			src: "settings.png",
			title: "删除离线缓存",
			callback: async function() {
				await checkLink() && msg({
					title: "请确认删除离线缓存。删除后需要联网下载缓存后，才能使用。",
					butNum: 2,
					enterFunction: removeCaches
				})
			}
		},
		{
			src: "settings.png",
			title: "删除本地数据库",
			callback: async function() {
				await checkLink() && msg({
					title: "请确认删除本地数据库。答题器进度，答题器题集，你保存的主题会被删除，请做好备份。",
					butNum: 2,
					enterFunction: removeDatabass
				})
			}
		}
	];
	
	const divWidth = mainUI.cmdWidth / 3 * 2.2;
	const divStyle = {
		position: "absolute",
		left: (mainUI.cmdWidth - divWidth)/ 2 + "px",
		top: mainUI.cmdPadding + "px",
		width: divWidth + "px",
		height: mainUI.cmdWidth - mainUI.cmdPadding * 2 + "px",
		overflowY: "auto"
	}
	
	const btnDiv = document.createElement("div");
	Object.assign(btnDiv.style, divStyle);
	mainUI.downDiv.appendChild(btnDiv);
	btnSettkng.map(setting => {
		new removeButton(btnDiv, setting.src, setting.title, setting.callback)
	})
	
	const logDiv = mainUI.newComment({
		id: "log",
		type: "div",
		left: mainUI.cmdPadding * 2.5,
		top: 0,
		width: mainUI.cmdWidth - mainUI.cmdPadding * 5,
		height: mainUI.cmdWidth - mainUI.cmdPadding * 2,
		style: {
			fontSize: `${mainUI.buttonHeight / 1.8}px`,
			lineHeight: `${mainUI.buttonHeight}px`
		},
		reset: function() { this.viewElem.setAttribute("class", "textarea") }
	})
	logDiv.move(undefined, undefined, undefined, undefined, upDiv);
    
	//------------------ load -----------------------------
	checkLink().then(online => online && logNewVersion())
	mainUI.loadTheme().then(() => mainUI.viewport.resize());
	}catch(e){alert(e.stack)}
})()
