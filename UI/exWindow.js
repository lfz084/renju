window.exWindow = (() => {
    "use strict";
    let fontSize = 30;
    let exWinLeft = 0;
    let exWinTop = 0;
    let exWinWidth = 500;
    let exWinHeight = 500;  
    let parentNode = document.body;
    
    const xWindow = document.createElement("div");
    
    const xIframe = document.createElement("div");
    xIframe.setAttribute("class", "textarea");
    xWindow.appendChild(xIframe);
    Object.assign(xIframe.style, {
    	color: "black",
    	borderColor: "black",
    	backgroundColor: "white"
    })
        

    const butClose = document.createElement("img");
    butClose.src = "./pic/xmark-circle-svgrepo-com.svg";
    butClose.oncontextmenu = (event) => {
        event.preventDefault();
    }
    setButtonClick(butClose, closeWindow);
    xWindow.appendChild(butClose);


    function resetStyle(left = exWinLeft, top = exWinTop, width = exWinWidth, height = exWinHeight, fSize = fontSize, pNode = parentNode) {
        
        exWinLeft = left;
        exWinTop = top;
        exWinWidth = width;
        exWinHeight = height;
        fontSize = fSize;
        parentNode = pNode;
        
        let s = xWindow.style;
        s.position = "absolute";
        s.left = exWinLeft + "px";
        s.top = exWinTop + "px";
        s.width = exWinWidth + "px";
        s.height = exWinHeight + "px";
        s.zIndex = 9999;

        s = xIframe.style;
        s.position = "absolute";
        s.left = "0px";
        s.top = "0px";
        s.width = exWinWidth - fontSize + "px";
        s.height = exWinHeight - fontSize + "px";
        s.fontSize = ~~fontSize + "px";
        s.borderStyle = "solid";
        s.borderWidth = `${fontSize / 7}px`;
        s.fontWeight = "normal";
        s.padding = `${fontSize/2}px ${fontSize/2}px ${fontSize/2}px ${fontSize/2}px`;

        s = butClose.style;
        let sz = exWinWidth / 10;
        s.position = "absolute";
        s.left = (exWinWidth - sz) / 2 + "px";
        s.top = "0px";
        s.width = sz + "px";
        s.height = sz + "px";
        s.opacity = "0.5";
        //s.backgroundColor = xIframe.style.backgroundColor;
        s.borderRadius = sz / 2 + "px"
    }
    
    function loadTheme(theme = {}) {
    	Object.assign(xIframe.style, theme);
		butClose.src = theme.icons;
    }

    function openWindow() {
        if (xWindow.parentNode) return;
        xWindow.setAttribute("class", "showEXWindow");
        resetStyle();
        parentNode.appendChild(xWindow); //插入body内，保证a标签可以工作。因为renjuCmddiv.parentNode屏蔽了浏览器触摸click
    }

    function closeWindow() {
        xIframe.innerHTML = "";
        xWindow.setAttribute("class", "hideEXWindow");
        if (xWindow.parentNode) setTimeout(() => xWindow.parentNode.removeChild(xWindow), 350);
    }

    function setHTML(iHtml) {
        return xIframe.innerHTML = iHtml;
    }
    
    return {
        get setStyle() {return resetStyle},
        get innerHTML() {return setHTML},
        get open() {return openWindow},
        get close() {return closeWindow},
        get loadTheme() {return loadTheme},
        
        set innerHTML(ihtml) {return setHTML(ihtml)}
    }
})()
