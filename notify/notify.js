let scriptDirectory = document.currentScript.src;
scriptDirectory = scriptDirectory.substr(0, scriptDirectory.lastIndexOf('/') + 1);
const url = scriptDirectory + "notify.json" + "?cache=netFirst"

let notifyNumbers = JSON.parse(localStorage.getItem("notifyNumbers"));
!Array.isArray(notifyNumbers) && (notifyNumbers=[]);

fetch(url)
.then(response => {
    if (response && response.ok) {
        return response.json()
    }
    else throw new Error("fetch notify.json error")
})
.then(notify =>{
    function checkNotify(notify) {
        const start = Date.parse(notify.start);
        const end = Date.parse(notify.end);
        const now = Date.now();
        
        if(now < start || now > end || notifyNumbers.filter(number => number == notify.number).length) return false;
        return true;
    }
    
    if (typeof notify !== "object") throw new Error("notify is not object")
    else if (checkNotify(notify)) return notify
    else throw new Error("cancel notify")
})
.then(notify => {
    return new Promise((resolve, reject) => {
    try{
        const d = document;
        const dw = d.documentElement.clientWidth;
        const dh = d.documentElement.clientHeight;
        const gridWidth = 980;
        const tempWidth = gridWidth * (dw > dh ? 2 : 1);
        const scale = dw / (dw / dh > 2 ? dw / dh * gridWidth : tempWidth);
        const winWidth = dw / scale;
        const winHeight = dh / scale;
        const ANIMATION_TIMEOUT = 300;
        
        let color = "black";
		let backgroundColor = "#d0d0d0";
		let textareaBackgroundColor = "white";

        const coverArea = document.createElement("div");
        coverArea.ontouch = function() { if (event) event.preventDefault(); };

        const notifyWindow = document.createElement("div");
        notifyWindow.ontouch = function() { if (event) event.preventDefault(); };
        coverArea.appendChild(notifyWindow);

        const textarea = document.createElement("div");
        notifyWindow.appendChild(textarea);

        Object.assign(coverArea.style, {
            position: "fixed",
            zIndex: 9999,
            width: winWidth + "px",
            height: winHeight * 2 + "px",
            top: "0px",
            left: "0px",
            transformOrigin: `0px 0px`,
            transform: `scale(${scale})`
        })
        const wdWidth = ~~(gridWidth * 3 / 4);
        const wdHeight = wdWidth;
        const wdLeft = ~~((winWidth / dw * (window.fullscreenUIWidth || document.documentElement.clientWidth) - wdWidth) / 2) + "px";
        const wdTop = ~~((winHeight / dh * (window.fullscreenUIHeight || document.documentElement.clientHeight) - wdHeight) / 2) + "px";
        Object.assign(notifyWindow.style, {
            position: "relative",
            width: wdWidth + "px",
            height: wdHeight + "px",
            top: wdTop,
            left: wdLeft
        })
        const fontSize = ~~(wdWidth / 20);
        const textWidth = ~~(wdWidth);
        const textHeight = textWidth;
        Object.assign(textarea.style, {
            position: "absolute",
            width: textWidth + "px",
            height: textHeight + "px",
            top: "0px",
            left: "0px",
            backgroundColor: textareaBackgroundColor,
            border: `5px solid black`,
            fontSize: fontSize + "px",
            wordBreak: "break-all",
            overflowY: "auto"
        })
        
        async function setTheme() {
        	const themeKey = localStorage.getItem("theme");
			const data = window.settingData && ( await settingData.getDataByKey("themes"));
			const theme = data && data.themes[themeKey] || ( await loadJSON(`UI/theme/${themeKey}/theme.json`));
			if (theme && theme["exWindow"]) {
				const exWindowTheme = theme["exWindow"];
				Object.assign(textarea.style, {
					color: exWindowTheme["color"],
					backgroundColor: exWindowTheme["backgroundColor"],
					border: `5px solid ${exWindowTheme["borderColor"]}`
				})
			}
        }

        function open() {
            document.body.appendChild(coverArea);
            notifyWindow.setAttribute("class", "show");
            
            window._notify_resolve = () => {
                notifyNumbers.splice(0, 0, notify.number);
                notifyNumbers = notifyNumbers.slice(0, 10);
                localStorage.setItem("notifyNumbers", JSON.stringify(notifyNumbers));
                close()
                resolve();
            }
            const innerHTML = notify.innerHTML || notify.html || notify.innerText || notify.text || notify.msg;
            textarea.innerHTML = innerHTML + `<br><br><a onclick="window._notify_resolve()">关闭通知</a><br>`;
        }

        function close() {
            notifyWindow.setAttribute("class", "hide");
            setTimeout(() => {
                coverArea.parentNode.removeChild(coverArea);
            }, ANIMATION_TIMEOUT);
            
            delete window._notify_resolve
        }
        
        setTheme()
        	.catch(() => {})
        	.then(() => open())
    }catch(e){reject(e)}
    })
    
})
.catch(e => {
    //alert(e.message || e.toString())
    console.error(e.message || e.toString())
})
.then(() => {
    document.currentScript.remove();
})

