'use strict';
// loaders.css
window.loadAnimation = (function() { //控制加载动画
	const DEBUG_LOADANIMA = false;
	
	function log(param, type = "log") {
		const print = console[type] || console.log;
		DEBUG_LOADANIMA && window.DEBUG && (window.vConsole || window.parent.vConsole) && print(`[loadAnimation.js]  ${ param}`);
	}
	
	//--------------------------------------------------------------------------
	
    let timer = null;
    const WIN_LOADING = document.createElement("div"),
        ANIMA = document.createElement("div"),
        LABEL = document.createElement("div"),
        DW = document.documentElement.clientWidth,
        DH = document.documentElement.clientHeight;
    const triangle = `<div class="center-body"><div class="loader-ball-51"><div></div><div></div><div></div></div></div>`,
        ball = `<div class="center-body"><div class="loader-ball-38"><div></div><div></div><div></div><div></div><div></div></div></div>`,
        black_white = `<div class="center-body"><div class="loader-ball-11"></div></div>`,
        busy = `<div class="center-body"><div class="loader-circle-101"></div></div>`;
    const ANIMA_NANE = {
        "triangle": triangle,
        "ball": ball,
        "black_white": black_white,
        "busy": busy
    }
    const scale = Math.min(DW, DH)/430;
    const fullScale = Math.min(window.screen.width, window.screen.height) / Math.min(DW, DH);
    let lock = false;
    let s = WIN_LOADING.style;
    s.position = "fixed";
    s.width = "150px";
    s.height = "150px";
    s.left = (DW - 150) / 2 + "px";
    s.top = (DH - 150) / 2 + "px";
    s.zIndex = 0xfffffe;
    s.transform = `scale(${scale})`;
    WIN_LOADING.setAttribute("class", "finish");

    s = ANIMA.style;
    s.position = "absolute";
    s.width = "150px";
    s.height = "150px";
    s.left = "0px";
    s.top = "0px";
    
    WIN_LOADING.appendChild(ANIMA);

    s = LABEL.style;
    s.position = "absolute";
    s.width = "150px";
    s.height = "25px";
    s.left = "0px";
    s.top = "150px";
    s.fontSize = "15px";
    s.textAlign = "center";
    s.lineHeight = "25px";
    s.background = "none";
    s.fontWeight = "bold";
    s.fontFamily = "mHeiTi, Roboto, emjFont, Symbola";
    s.opacity = 0.7;
    WIN_LOADING.appendChild(LABEL);

    return {
        open: (animaName, _timeout) => { //打开动画
            if (lock) return
            log("loadAnimation.open","info");
            if (!WIN_LOADING.parentNode) {
                ANIMA.innerHTML = ANIMA_NANE[animaName] || black_white;
                document.body.appendChild(WIN_LOADING);
                Object.assign(WIN_LOADING.style, {
                	left: (document.documentElement.clientWidth - 150) / 2 + "px",
                	top: (document.documentElement.clientHeight - 150) / 2 + "px"
                })
            }
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                if (!lock && WIN_LOADING.parentNode) WIN_LOADING.parentNode.removeChild(WIN_LOADING);
            }, _timeout || 30 * 1000);
        },
        close: (delay = 500) => { //关闭动画
            if (lock) return
            log("loadAnimation.close","info");
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                if (WIN_LOADING.parentNode) WIN_LOADING.parentNode.removeChild(WIN_LOADING);
                LABEL.innerHTML = "";
                LABEL.style.background = "none";
            }, delay);
        },
        lock: (value = false) => { lock = value }, //锁定后，不开打开或关闭
        text: (text = "") => { //动画标题，可以用来显示进度百分百
            LABEL.innerHTML = text;
            if (text) {
            	LABEL.style.color = document.body.style.color;
            	LABEL.style.background = document.body.style.background;
            }
        },
    };
})();

"serviceWorker" in navigator && navigator.serviceWorker.addEventListener("message", event => {
    if (typeof event.data == "string") {
        const MSG = event.data;
        if (MSG.indexOf("loading...") + 1) {
            loadAnimation.open();
        }
        else if (MSG.indexOf("load finish") + 1) {
            loadAnimation.close();
        }
    }
    else if (event.data.cmd && event.data.cmd == "progress") {
    	const progress = event.data.msg.progress;
    	loadAnimation.text(~~(progress*1000)/10 + "%");
    	progress < 1 ? loadAnimation.open() : loadAnimation.close();
    }
})

if (window != window.top) {
	window.top.loadAnimation.lock(false);
	window.top.loadAnimation.close(0);
	window.top.loadAnimation = window.loadAnimation;
}