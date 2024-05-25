/*------ 分享图片窗口 ------*/
window.share = (() => {
    "use strict";
    const d = document;
    const dw = d.documentElement.clientWidth;
    const dh = d.documentElement.clientHeight;
    const gridWidth = 980;
    const tempWidth = gridWidth * (dw > dh ? 2 : 1);
    const scale = dw / (dw / dh > 2 ? dw / dh * gridWidth : tempWidth);
    const winWidth = dw / scale;
    const winHeight = dh / scale;
        
    let sharing = false;
    
    let color = "black";
    let backgroundColor = "#d0d0d0";

    let shareWindow = document.createElement("div");
    shareWindow.ontouch = function() { if (event) event.preventDefault(); };

    let imgWindow = document.createElement("div");
    imgWindow.ontouch = function() { if (event) event.preventDefault(); };
    shareWindow.appendChild(imgWindow);

    let shareLabel = document.createElement("div");
    imgWindow.appendChild(shareLabel);

    let checkDiv = document.createElement("div");
    imgWindow.appendChild(checkDiv);

    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox")
    checkbox.checked = true;
    checkDiv.appendChild(checkbox);

    let shareLabel2 = document.createElement("div");
    checkDiv.appendChild(shareLabel2);

    let shareImg = document.createElement("img");
    imgWindow.appendChild(shareImg);

    //取消按钮
    const ICO_DOWNLOAD = document.createElement("img");
    imgWindow.appendChild(ICO_DOWNLOAD);
    ICO_DOWNLOAD.src = "./pic/arrow-to-line-down-svgrepo-com.svg";
    ICO_DOWNLOAD.oncontextmenu = (event) => {
        event.preventDefault();
    };

    const ICO_CLOSE = document.createElement("img");
    imgWindow.appendChild(ICO_CLOSE);
    ICO_CLOSE.src = "./pic/xmark-circle-svgrepo-com.svg";
    ICO_CLOSE.oncontextmenu = (event) => {
        event.preventDefault();
    };

    function refreshImg(_cBoard, theme) {
        _cBoard.loadTheme(theme);
        shareImg.src = _cBoard.cutViewBox().toDataURL();
    }

    function shareClose() {
        imgWindow.setAttribute("class", "hide");
        setTimeout(() => {
            shareWindow.parentNode.removeChild(shareWindow);
            sharing = false;
        }, ANIMATION_TIMEOUT);
    }
    
    function setOpacity(opacity) { // mainUI.bodyDiv 设置无效，改为设置 mainUI.upDiv + mainUI.downDiv
    	const elems = self["mainUI"] ? [mainUI.upDiv, mainUI.downDiv] : [];
    	elems.map(div => div.setAttribute("class", opacity == 1 ? "exitBackgroundImg" : "backgroundImg"));
    }

    const share = (_cBoard) => {
        try {
            if (sharing) return;
            sharing = true;
            let oldTheme = _cBoard.theme;

            let s = shareWindow.style;
            s.position = "fixed";
            s.zIndex = 9999;
            s.width = winWidth + "px";
            s.height = winHeight * 2 + "px";
            s.top = "0px";
            s.left = "0px";
            s.transformOrigin = `0px 0px`;
            s.transform = `scale(${scale})`;
            
            let imgWidth = gridWidth;
            imgWidth = ~~(imgWidth * 3 / 4);
            s = imgWindow.style;
            s.position = "relative";
            s.width = imgWidth + "px";
            s.height = imgWidth + "px";
            s.top = ~~((winHeight / dh * (window.fullscreenUIHeight || document.documentElement.clientHeight) - imgWidth) / 2) + "px";
            s.left = ~~((winWidth / dw * (window.fullscreenUIWidth || document.documentElement.clientWidth) - imgWidth) / 2) + "px";
            s.backgroundColor = backgroundColor; //"#d0d0d0"; //"#666666";
            s.border = `0px solid `;
			
            let iWidth = ~~(imgWidth * 3 / 5);
            s = shareImg.style;
            s.position = "absolute";
            s.width = iWidth + "px";
            s.height = iWidth + "px";
            s.top = ~~((imgWidth - iWidth) / 2) + "px";
            s.left = ~~((imgWidth - iWidth) / 2) + "px";
            s.border = `0px solid black`;

            let h = ~~((imgWidth - iWidth) / 2 / 2);
            let w = h * 4;
            let l = (imgWidth - w) / 2;
            let t = imgWidth - h - (imgWidth - iWidth) / 8;

            shareLabel.innerHTML = `长按图片分享`;
            s = shareLabel.style;
            s.position = "absolute";
            s.width = w + "px";
            s.height = h + "px";
            s.top = (imgWidth - iWidth) / 8 + "px";
            s.left = l + "px";
            s.textAlign = "center";
            s.fontSize = ~~(h*0.45) + "px";
            s.color = color;
            s.backgroundColor = imgWindow.style.backgroundColor || "#666666";

            s = checkDiv.style;
            s.position = "absolute";
            s.width = w / 2 + "px";
            s.height = h + "px";
            s.top = ~~((imgWidth - iWidth) / 2 - h) + "px";
            s.left = ~~((imgWidth - iWidth) / 2) + "px";

            s = checkbox.style;
            s.position = "absolute";
            s.width = h / 3 + "px";
            s.height = h / 3 + "px";
            s.top = h / 3 + "px";
            s.left = 0 + "px";
            checkbox.onclick = () => {
                if (checkbox.checked) refreshImg(_cBoard, oldTheme)
                else refreshImg(_cBoard, _cBoard.defaultTheme)
            };

            s = shareLabel2.style;
            s.position = "absolute";
            s.width = h + "px";
            s.height = h + "px";
            s.top = h / 3 + "px";
            s.left = h / 2 + "px";
            s.fontSize = h / 3 + "px";
            shareLabel2.innerHTML = `原图`;
            shareLabel2.onclick = () => checkbox.click()

            s = ICO_DOWNLOAD.style;
            s.position = "absolute";
            s.width = (imgWidth - parseInt(shareImg.style.top) - parseInt(shareImg.style.height)) / 2 + "px";
            s.height = s.width;
            s.top = imgWidth - parseInt(s.width) * 1.5 + "px";
            s.left = imgWidth / 2 - parseInt(s.width) * 1.5 + "px";
            //s.backgroundColor = "#e0e0e0"; //#787878";
            s.opacity = "0.8";
            s.borderRadius = parseInt(s.width) / 2 + "px";
            setButtonClick(ICO_DOWNLOAD, () => {
                try{
                _cBoard.saveAsImage("png");
                }catch(e){alert(e.stack)}
            });

            s = ICO_CLOSE.style;
            s.position = "absolute";
            s.width = ICO_DOWNLOAD.style.width;
            s.height = ICO_DOWNLOAD.style.height;
            s.top = ICO_DOWNLOAD.style.top;
            s.left = imgWidth / 2 + parseInt(s.width) * 0.5 + "px";
            //s.backgroundColor = "#e0e0e0"; //"#787878";
            s.opacity = "0.8";
            s.borderRadius = parseInt(s.width) / 2 + "px";
            setButtonClick(ICO_CLOSE, () => {
                shareClose();
                if (_cBoard.theme != oldTheme) {
                    refreshImg(_cBoard, oldTheme);
                }
                setOpacity("1")
            });
            setOpacity("0.38")
            
            checkbox.onclick();
            
            document.body.appendChild(shareWindow); 
            imgWindow.setAttribute("class", "show");
        } catch (e) { alert(e.stack) }
    };
    
    share.loadTheme = function(themes = {}) {
    	const imgWindowTheme = themes || {};
    	color = imgWindowTheme.color || color;
    	backgroundColor = imgWindowTheme.backgroundColor || backgroundColor;
		shareLabel.style.color = color;
    	imgWindow.style.backgroundColor = shareLabel.style.backgroundColor = backgroundColor;
    	ICO_DOWNLOAD.src = themes.iconDownload;
    	ICO_CLOSE.src = themes.iconClose;
    }
    
    return share;
})();
