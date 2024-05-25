(() => {
    "use strict";
    const DEBUG_HELP = true;
    
    function log(param, type = "log") {
        const  print = window.top.console[type] || window.top.console.log;
        DEBUG_HELP && window.top.DEBUG && window.top.vConsole && print(`[help.js]  ${ param}`);
    }
    
    const topImage = (() => {

        let busy = false;
        let topDocument, topDiv, topImg;
        let startX = 0,
            startY = 0;

        function resetTopImage() {
        	let topWindow = window;
        	do {
            	topDocument = topWindow.document;
            	if (topWindow === window.top) break;
            	topWindow = topWindow.parent;
            	if (topWindow.fullscreenUI) break;
        	} while(true);
            topDiv = topDocument.createElement("div");
            topImg = topDocument.createElement("img");
            topDocument.body.appendChild(topDiv);
            topDiv.appendChild(topImg);

            topDiv.addEventListener("touchstart", (event) => {
                startX = event.changedTouches[0].pageX;
                startY = event.changedTouches[0].pageY;
                if (event) event.cancelBubble = true;
            }, true);

            topDiv.addEventListener("touchend", (event) => {
                let tX = event.changedTouches[0].pageX;
                let tY = event.changedTouches[0].pageY;
                if (event) event.cancelBubble = true;
                if ((Math.abs(startX - tX) < 30) && (Math.abs(startY - tY) < 30)) {
                    close();
                }
            }, true);

            topDiv.onclick = () => {
                if (event) event.cancelBubble = true;
                close();
            }
        }

        function close() {
            topDiv.setAttribute("class", "hide");
            setTimeout(() => {
                topDiv.style.zIndex = -99999;
                busy = false;
            }, 1000)
        }
        return (img) => {
            if (busy) return;
            busy = true;
            if (!topDocument) {
                resetTopImage();
            }
            let padding = img.width > img.height ? img.width : img.height;
            let dw = topDocument.documentElement.clientWidth;
            let dh = topDocument.documentElement.clientHeight;
            let scaleWidth = dw / img.width;
            let scaleHeight = dh / img.height;
            let minScale = scaleWidth < scaleHeight ? scaleWidth : scaleHeight;

            let s = topDiv.style;
            s.position = "fixed";
            s.left = -padding + "px";
            s.top = -padding + "px";
            s.width = dw + padding * 2 + "px";
            s.height = dh + padding * 2 + "px";
            s.backgroundColor = document.body.style.backgroundColor;
            s.zIndex = 99999;

            s = topImg.style;
            s.position = "absolute";
            s.left = (dw - img.width * minScale) / 2 + padding + "px";
            s.top = (dh - img.height * minScale) / 2 + padding + "px";
            s.width = img.width * minScale + "px";
            s.height = img.height * minScale + "px";
        	s.opacity = "0.68";
            topImg.src = img.src;

            topDiv.setAttribute("class", "show");
            topDiv.focus();

        }
    })();


    const elemClick = (() => {

        let busy = false;

        return (elem, fast) => {

            if (!fast && busy) return;
            busy = !fast;
            const NODE_NAME = elem.nodeName;
            if (NODE_NAME == "UL" || NODE_NAME == "OL") {
                listClick(elem, fast);
            }
            if (busy) setTimeout(() => {
                busy = false;
            }, 1000);
        }

    })();



    const listClick = (() => {

        let busy = false;
        return (elem, fast) => {

            if (!fast && busy) return;
            busy = !fast;
            if (getFirstChildNode(elem, undefined, 1).style.display == "none") {
                showList(elem);
                if (!fast) {
                	scrollToElement(elem);
                    focusElement(elem);
                    setFocus(elem);
                }
            }
            else {
                hideList(elem);
                if (!fast) {
                    focusElement(elem);
                    setFocus(elem);
                    setTimeout(() => {
                        scrollToElement(elem);
                        /*
                    	const p = getAbsolutePos(elem);
                        if (getScrollY() > p.y - 256) {
                            scrollToElement(elem);
                        }
                        else if (getScrollY() + document.documentElement.clientHeight < p.y + 100) {
                            scrollToAnimation(getScrollY() + 100);
                        }*/
                    }, 0);
                }
            }
            if (busy) setTimeout(() => {
                busy = false;
            }, 1000);
        }
    })();



    const focusElement = (() => {

        let busy = false;
        let focusDiv = document.createElement("div");
        let focusDiv1 = document.createElement("div");
        let s = focusDiv.style;
        let s1 = focusDiv1.style;
        s.position = s1.position = "relative";
        s.top = s1.top = "0px";

        return (elem) => {

            if (busy) return;
            busy = true;
            if (elem && elem.childNodes) {
                focusDiv.setAttribute("class", "hideFocus");
                focusDiv1.setAttribute("class", "hideFocus");
                elem.insertBefore(focusDiv, elem.childNodes[0]);
                elem.appendChild(focusDiv1);
                setTimeout(() => {
                    focusDiv.parentNode.removeChild(focusDiv);
                    focusDiv1.parentNode.removeChild(focusDiv1);
                }, 700);
            }
            setTimeout(() => {
                busy = false;
            }, 1000);
        }

    })();


    const scrollToElement = (() => {

        let busy = false;

        return (elem, fast) => {
            //log(`scrollToElement`)
            if (!fast && busy) return;
            busy = !fast;
            if (elem && elem.nodeType == 1) {
                //log(`scrollHeight = ${elem.scrollHeight}`)
                const padding = 256;
                const p = getAbsolutePos(elem);
                const scrollY = getScrollY();
                const height = elem.offsetHeight;
                const clientHeight = getClientHeight();
                let top = scrollY;
                top += Math.max(0, (p.y + height) - (scrollY + clientHeight - padding));
                top -= Math.max(0, (top + padding) - p.y);
                scrollToAnimation(top);
                setFocus(elem);
            }
            if (busy) setTimeout(() => {
                busy = false;
            }, 1000);
        };
    })();



    window.scrollToAnimation = (() => {

        let moves = [];
        let animationFrameScroll = null;
        let targetScrollTop = 0;
        let tempScrollTop = 0;

        function scrollTo() {

            tempScrollTop += moves.splice(0, 1)[0];
            setScrollY(tempScrollTop);
            if (moves.length) {
                animationFrameScroll = requestAnimationFrame(scrollTo);
            }
            else {
                cancelAnima();
            }
        }

        function cancelAnima() {

            //log(`cancel \n getScrollY= +${tempScrollTop}, targetScrollTop=${targetScrollTop}`)
            cancelAnimationFrame(animationFrameScroll);
            moves = [];
            animationFrameScroll = null;
            targetScrollTop = 0;
            tempScrollTop = 0;
        }

        return (top) => {
            //log(`scroll animation`)
            cancelAnima();
            setScrollHeight();
            targetScrollTop = top;
            tempScrollTop = getScrollY();
            //log(`getScrollY= +${tempScrollTop}, targetScrollTop=${targetScrollTop}`)
            moves = getScrollPoints(targetScrollTop - tempScrollTop);
            scrollTo();
        }
    })();

	
	let focusBorderColor = "green";
    const setFocus = (() => {
        let busy = false;
        let focusH = null;
        return (elem) => {
            //if (busy) return;
            busy = true;
            //log("setFocus......" + new Date().getTime())
            if (elem &&
                elem.nodeType == 1 &&
                elem.parentNode != document.body)
            {
                if (focusH) focusH.style.border = "";
                focusH = elem;
                focusH.style.border = `5px solid ${focusBorderColor}`;
            }
            else {
                if (focusH) focusH.style.border = "";
            }
            busy = false;
        }
    })();



    const linkTo = (() => {

        let busy = false;
        const LINK = document.createElement("a");
        document.body.appendChild(LINK);

        function link(url = "#", target = "_self") {

            LINK.href = url;
            LINK.target = target;
            LINK.click();
        }
        return (url, target) => {
            if (busy) return;
            busy = true;
            link(url, target);
            setTimeout(() => {
                busy = false;
            }, 1000);
        }
    })();



    window.getAbsolutePos = (el) => {
        var r = { x: el.offsetLeft, y: el.offsetTop };
        if (el.offsetParent) {
            var tmp = getAbsolutePos(el.offsetParent);
            r.x += tmp.x;
            r.y += tmp.y;
        }
        return r;
    }


    window.getScrollPoints = (move) => {

        const PAR = 1.28;
        const PAR2 = move < 0 ? 2 : 1;
        const MAX_MOVE = 5000;
        const HALF = move / 2;
        let sum = Math.abs(HALF);
        let tempMove = 0;
        let tempMoves = [0]; //保证最少有一个
        while (sum) {
            tempMove = Math.pow(tempMove, PAR) * PAR2 || 2;
            tempMove = tempMove > MAX_MOVE ? MAX_MOVE : tempMove;
            tempMoves.push(tempMove);
            sum -= tempMove;
            if (sum < tempMove) {
                tempMoves[tempMoves.length - 1] = tempMoves[tempMoves.length - 1] + sum;
                sum = 0;
            }
        }

        let rtHs = [];
        for (let i = 0; i < tempMoves.length; i++) {
            rtHs.push(parseInt(tempMoves[i] * (move < 0 ? -1 : 1) * 10) / 10);
        }
        for (let i = tempMoves.length - 1; i >= 0; i--) {
            rtHs.push(parseInt(tempMoves[i] * (move < 0 ? -1 : 1) * 10) / 10);
        }

        //log(String(rtHs))
        return rtHs;
    }


    window.getScrollY = () => {
        //log("doc.h" + document.documentElement.scrollTop + "\nbody.scH=" + document.body.scrollTop);
        return document.documentElement.scrollTop || document.body.scrollTop || 0;
    }


    window.setScrollY = (top) => {

        let t = document.documentElement.scrollTop;
        if (t !== undefined && t != top) {
            document.documentElement.scrollTop = top;
        }
        t = document.body.scrollTop;
        if (t !== undefined && t != top) {
            document.body.scrollTop = top;
        }
    }


	/* 为了兼容ios safari 滚动, window.parent 会修改下面两个函数 */
    window.setScrollHeight = () => {};
	window.getClientHeight = () => document.documentElement.clientHeight;


    function showList(elem) {

        if (!elem) return;
        //log(`${elem} showlist`)
        const UL_LIST_STYLE = ["none", "disc", "circle", "square", "disc", "circle", "square"];
        const OL_LIST_STYLE = ["none", "decimal", "decimal-leading-zero", "lower-alpha", "upper-alpha", "lower-roman", "upper-roman"];
        if (["H4"].indexOf(elem.nodeName) + 1) {
            let firstList = getFirstChildNode(elem, ["UL", "OL"]);
            showChildNode(firstList, getListDepth(firstList), firstList.nodeName);
        }
        else {
            showChildNode(elem, getListDepth(elem), elem.nodeName);
        }
        showParentNodes(elem);
        if (["UL", "OL"].indexOf(elem.nodeName) + 1) {
            elem.setAttribute("class", "showList");
        }
        setScrollHeight();

        function showNode(node, depth) {

            const NODE_TYPE = node.nodeType;
            const NODE_NAME = node.nodeName;
            if (NODE_TYPE == 1) {
                let value = NODE_NAME == "LI" ? "list-item" : "block";
                node.style.display = value;
                if (NODE_NAME == "LI") {
                    node.style.listStyle = getListName(node) == "UL" ?
                        UL_LIST_STYLE[depth % UL_LIST_STYLE.length] : OL_LIST_STYLE[depth % OL_LIST_STYLE.length];
                }
            }
            else if (NODE_TYPE == 3) {
                const TOHIDE_TXT = "⇦ ";
                const TOSHOW_TXT = "➪ 点  我";
                const NODE_VALUE = node.nodeValue;
                const ISTOSHOW = NODE_VALUE.indexOf(TOSHOW_TXT) == 0;
                node.nodeValue = ISTOSHOW ?
                    TOHIDE_TXT : node.nodeValue;
            }
        }

        function showChildNode(elem, depth) {
            //log(`${elem}showChildNode`)
            const CHILD_NODES = elem.childNodes;
            for (let i in CHILD_NODES) { // show childNode
                showNode(CHILD_NODES[i], depth);
            }
        }

        function showParentNodes(elem) {

            let pNode = elem.parentNode;
            while (pNode && pNode != document.body) {
                const NODE_NAME = pNode.nodeName;
                //log(NODE_NAME + getListDepth(pNode))
                if (["OL", "UL"].indexOf(NODE_NAME) + 1) {
                    showChildNode(pNode, getListDepth(pNode), NODE_NAME);
                }
                pNode = pNode.parentNode;
            }
        }

    }



    function hideList(elem) {

        if (!elem) return;
        const CHILD_NODES = elem.childNodes;
        for (let i in CHILD_NODES) {
            const NODE_TYPE = CHILD_NODES[i].nodeType;
            const NODE_NAME = CHILD_NODES[i].nodeName;
            if (NODE_TYPE == 1) {
                CHILD_NODES[i].style.display = "none";
            }
            else if (NODE_TYPE == 3) {
                const TOHIDE_TXT = "⇦ ";
                const TOSHOW_TXT = "➪ 点  我";
                const NODE_VALUE = CHILD_NODES[i].nodeValue;
                const ISTOHIDE = NODE_VALUE.indexOf(TOHIDE_TXT) == 0;
                CHILD_NODES[i].nodeValue = ISTOHIDE ?
                    TOSHOW_TXT : CHILD_NODES[i].nodeValue;
            }
        }
        if (["UL", "OL"].indexOf(elem.nodeName) + 1) {
            elem.setAttribute("class", "hideList");
        }
        setScrollHeight();
    }



    function getListDepth(elem, depth = 0) {

        let listName = null;
        let pNode = elem;
        let pNodeName = pNode.nodeName;
        while (pNode && pNode != document.body) {

            if (["OL", "UL"].indexOf(pNodeName) + 1) {
                if (listName === null) {
                    listName = pNodeName;
                    depth++;
                }
                else {
                    if (listName == pNodeName) {
                        depth++;
                    }
                    else {
                        break;
                    }
                }
            }
            pNode = pNode.parentNode;
            pNodeName = pNode.nodeName;
        }
        return depth;
    }



    function getListName(elem) {

        if (!elem || elem.nodeName != "LI") return;
        elem = elem.parentNode;
        while (elem && elem != document.body) {
            if (elem.nodeName == "UL") {
                return "UL";
            }
            else if (elem.nodeName == "OL") {
                return "OL";
            }
            elem = elem.parentNode;
        }
    }




    function getFirstChildNode(parentNode, nodeNameList = ["###defoult###defoult###"], nodeType = "defoult") {

        if (!parentNode) return;
        const CHILD_NODES = parentNode.childNodes;
        for (let i in CHILD_NODES) {
            if (CHILD_NODES[i]) {
                const NODE_NAME = CHILD_NODES[i].nodeName;
                const NODE_TYPE = CHILD_NODES[i].nodeType;
                if (nodeNameList.indexOf(NODE_NAME) + 1 || NODE_TYPE === nodeType) {
                    return CHILD_NODES[i];
                }
            }
        }
    }


    function getTopNode(elem) {

        let depth = 10;
        while (depth--) {
            const CLASS_NANE = elem.parentNode.getAttribute("class");
            if (CLASS_NANE == "bodyDiv") {
                return elem;
            }
            elem = elem.parentNode;
        }
    }



    const hashControl = (() => {
        let busy = false;
        return () => {
            if (busy) return;
            busy = true;
            const HASH = window.location.hash;
            //log(HASH)
            if (HASH != "#1" && HASH != "#0") {

                if (HASH) {
                    const ID = HASH.slice(1);
                    /*
                    const ELEM = document.getElementById(ID);
                    const FIRST_LIST = getFirstChildNode(ELEM, ["UL", "OL"]);

                    let node = getFirstChildNode(FIRST_LIST, ["LI"]);
                    if (node && node.style.display == "none") {
                        //log(`hashChange elemClick`);
                        elemClick(node.parentNode, true);
                    }

                    scrollToElement(ELEM);
                    focusElement(ELEM);
                    */

                    const TARGET_ELEM = document.getElementById(ID);
                    //const FIRST_NODE = getFirstChildNode(TARGET_ELEM, ["UL", "OL"]);
                    showList(TARGET_ELEM);
                    scrollToElement(TARGET_ELEM);
                    focusElement(TARGET_ELEM);

                }
                else {
                    const FIRST_NODE = getFirstChildNode(document.body, undefined, 1);
                    scrollToElement(FIRST_NODE);
                }
            }
            setTimeout(() => {
                busy = false;
            }, 1000);
        };
    })();



    window.onhashchange = function(event) {
        //log(`onhashchang`)
        setTimeout(hashControl, 1000);
    }


    document.body.onload = async () => {
    	//if (window.parent == window.self) setView();
		const iHTML = document.body.innerHTML;
        document.body.innerHTML = "";
        let dDiv = createDocumentDiv(),
            topDiv = createTop(dDiv),
            bodyDiv = createBody(iHTML, dDiv),
            buttomDiv = createButtom(dDiv);
        window.onhashchange();
        //log(`parentWindow=${window.parent==window.self}`);
    	await loadTheme();
		document.body.setAttribute("class", "finish");
    }
    
    window.setView = (doc = document, width = 800) => {

        const ELEM_LIST = doc.getElementsByName("viewport");
        const VIEW = ELEM_LIST[0] || doc.createElement("meta");
        let dw = doc.documentElement.clientWidth;
        let dh = doc.documentElement.clientHeight;
        let sw = window.screen.width;
        let sh = window.screen.height;
        let max = sw > sh ? sw : sh;
        let min = sw < sh ? sw : sh;
        let scale = (dw > dh ? max : min) / width;
        doc.head.appendChild(VIEW);
        VIEW.setAttribute("name", "viewport");
        VIEW.setAttribute("content", `initial-scale=${self.scale+0.01} `);
        VIEW.setAttribute("content", `width=${width}, initial-scale=${scale}, minimum-scale=${scale}, maximum-scale =${scale*3}, user-scalable=${"yes"}`);

    }



    function createDocumentDiv(parentNode = document.body) {

        const D_DIV = document.createElement("div");
        D_DIV.setAttribute("class", "documentDiv");
        parentNode.appendChild(D_DIV);
        center(D_DIV);
        return D_DIV;
    }


    function createTop(parentNode = document.body) {

        const TOP_DIV = document.createElement("div");
        TOP_DIV.setAttribute("class", "topDiv");
        //TOP_DIV.innerHTML = `<a onclick="window.open('./renjuhelp.html','_self')"><< 首页</a>`;
        parentNode.appendChild(TOP_DIV);
        return TOP_DIV;
    }


    function createBody(iHTML, parentNode = document.body) {

        const BODY_DIV = document.createElement("div");
        const DEFOULT_HEIGHT =
            BODY_DIV.setAttribute("class", "bodyDiv");
        BODY_DIV.innerHTML = iHTML;
        mapUL(BODY_DIV);
        parentNode.appendChild(BODY_DIV);
        return BODY_DIV;
        //log(`BODY_DIV.height=${BODY_DIV.scrollHeight}`);

        function mapUL(elem, colorDepth = 0) {
            const CHILD_NODES = elem.childNodes;
            for (let i in CHILD_NODES) {
                if (CHILD_NODES[i]) {
                    const NODE_NAME = CHILD_NODES[i].nodeName;
                    if (["OL", "UL"].indexOf(NODE_NAME) + 1) {
                        mapLI(CHILD_NODES[i], NODE_NAME, colorDepth + 1);
                        CHILD_NODES[i].setAttribute("colorDepth", `${colorDepth}`);
                    }
                    else if (["B", "H4", "H3", "DIV"].indexOf(NODE_NAME) + 1) {
                        mapLI(CHILD_NODES[i]);
                    }

                }
            }
        }

        function mapLI(elem, listName, colorDepth = 0) {
            const ELEM_NAME = elem.nodeName;
            if (["UL", "OL"].indexOf(ELEM_NAME) + 1) {
                elem.onclick = (event) => { // if not ListClick to cancel
                    if (event) event.cancelBubble = true;
                    elemClick(elem);
                }
            }
            else if (ELEM_NAME == "A") {
                const HASH = elem.getAttribute("href");
                if (HASH.indexOf("#") == 0) {
                    const ID = HASH.slice(1);
                    elem.removeAttribute("href")
                    elem.onclick = (event) => {
                        if (event) event.cancelBubble = true;
                        const TARGET_ELEM = document.getElementById(ID);
                        //const FIRST_NODE = getFirstChildNode(TARGET_ELEM, ["UL", "OL"]);
                        //cancel parentNode click event
                        //elemClick(elem);
                        //log(`ID="${ID}" ${elem} a_click, ${TARGET_ELEM} showlist`)
                        showList(TARGET_ELEM);
                        scrollToElement(TARGET_ELEM);
                        focusElement(TARGET_ELEM);
                    }
                }
            }
            else if (ELEM_NAME == "IMG") {
                elem.onclick = () => { // if not ListClick to cancel
                    if (event) event.cancelBubble = true;
                    //elemClick(elem);
                    topImage(elem);
                }
            }

            const CHILD_NODES = elem.childNodes;
            for (let i in CHILD_NODES) {
                if (CHILD_NODES[i]) {
                    const NODE_NAME = CHILD_NODES[i].nodeName;
                    if (NODE_NAME == "UL" || NODE_NAME == "OL") {
                        listName = ELEM_NAME == listName ? listName : ELEM_NAME;
                        mapLI(CHILD_NODES[i], listName, colorDepth + 1);
                        CHILD_NODES[i].setAttribute("colorDepth", `${colorDepth}`);
                    }
                    else if (["LI", "A", "IMG", "MARK", "PS", "B", "I", "P", "DIV", "TEXT"].indexOf(NODE_NAME) + 1) {
                        mapLI(CHILD_NODES[i], listName, colorDepth);
                    }
                    else if (i == 0 && NODE_NAME == "#text") {
                        const TOHIDE_TXT = "...";
                        const NEW_TOSHOW_TXT = "⇦ ";
                        const NODE_VALUE = CHILD_NODES[i].nodeValue.replace(/^\s*/g, "");
                        const ISTOHIDE = NODE_VALUE.indexOf(TOHIDE_TXT) == 0;
                        CHILD_NODES[i].nodeValue = ISTOHIDE ? NEW_TOSHOW_TXT : NODE_VALUE;
                    }
                }
            }
            if (ELEM_NAME == "UL" || ELEM_NAME == "OL") {
                elemClick(elem, true);
            }
        }
    }


    function createButtom(parentNode = document.body) {
        const BUTTOM_DIV = document.createElement("div");
        BUTTOM_DIV.setAttribute("class", "buttomDiv");
        //BUTTOM_DIV.innerHTML = `<a onclick="window.open('./renjuhelp.html','_self')"><< 首页</a>`;
        parentNode.appendChild(BUTTOM_DIV);
        return BUTTOM_DIV;
    }


    function center(elem) {

        if (window.parent == window.self) {
            const DW = document.documentElement.clientWidth;
            const ELEM_WIDTH = 800;
            elem.style.position = "absolute";
            elem.style.left = (DW - ELEM_WIDTH) / 2 + `px`;
        }
    }

//---------------------- load theme ---------------------------
	    

const themes = {"light":"light", "grey":"grey", "green":"green", "dark":"dark"};
const defaultThemeKey = "light";


window.loadJSON = window.parent.loadJSON;
window.settingData = window.parent.settingData;

function colorName2colorCode(color) {
	return window.parent.colorName2colorCode(color) || "#000000";
}

function changeColor(colorCode, v) {
	colorCode = colorName2colorCode(colorCode);
	const r = ("0" + (Math.max(0, Math.min(255, parseInt("0x" + colorCode[1] + colorCode[2]) + parseInt(v)))).toString(16)).slice(-2);
	const g = ("0" + (Math.max(0, Math.min(255, parseInt("0x" + colorCode[3] + colorCode[4]) + parseInt(v)))).toString(16)).slice(-2);
	const b = ("0" + (Math.max(0, Math.min(255, parseInt("0x" + colorCode[5] + colorCode[6]) + parseInt(v)))).toString(16)).slice(-2);
	return "#" + r + g + b;
}

function colorToRGB(color) {
	color = colorName2colorCode(color);
	const r = Math.max(0, Math.min(255, parseInt("0x" + color[1] + color[2])));
	const g = Math.max(0, Math.min(255, parseInt("0x" + color[3] + color[4])));
	const b = Math.max(0, Math.min(255, parseInt("0x" + color[5] + color[6])));
	return `rgb(${r}, ${g}, ${b})`;
}

async function getCSSStyleSheet(name) {
	return new Promise(resolve => {
		let count = 0;
		let timer = setInterval(() => {
			if (++count > 10) {
				resolve();
				clearInterval(timer);
			}
			for (let i = 0; i < document.styleSheets.length; i++) {
				const sheet = document.styleSheets[i];
				if ("CSSStyleSheet" == sheet.constructor.name && sheet.href.indexOf(name) + 1) {
					resolve(sheet);
					clearInterval(timer);
				}
			}
		}, 100);
	})
}

async function loadTheme() {
	const themeKey = localStorage.getItem("theme") || defaultThemeKey;
	const sheet = await getCSSStyleSheet("help.css");
	const data = window.settingData && (await settingData.getDataByKey("themes"));
	const theme = data && data.themes[themeKey] || (await loadJSON(`UI/theme/${themeKey}/theme.json`));
	if (!sheet || !sheet.cssRules) return;
	const rgb = colorToRGB(theme["body"]["backgroundColor"]).match(/[0-9]+/g).map(v=>v*1);
	for (let i = 1; i < 4; i++) {
		let done = false;
		const vColor = 39;
		
		if (vColor <= Math.abs(Math.min(255, rgb[i % 3] + vColor) - rgb[i % 3])) {
			rgb[i % 3] = Math.min(255, rgb[i % 3] + vColor);
			done = true;
		}
		else if (vColor <= Math.abs(Math.min(255, rgb[(i + 1) % 3] + vColor) - rgb[(i + 1) % 3])) {
			rgb[(i + 1) % 3] = Math.min(255, rgb[(i + 1) % 3] + vColor);
			done = true;
		}
		else if (vColor <= Math.abs(Math.min(255, rgb[(i + 2) % 3] + vColor) - rgb[(i + 2) % 3])) {
			rgb[(i + 2) % 3] = Math.min(255, rgb[(i + 2) % 3] + vColor);
			done = true;
		}
		else if (vColor <= Math.abs(Math.max(0, rgb[i % 3] - vColor) - rgb[i % 3])) {
			rgb[i % 3] = Math.max(0, rgb[i % 3] - vColor);
			done = true;
		}
		else if (vColor <= Math.abs(Math.max(0, rgb[(i + 1) % 3] - vColor) - rgb[(i + 1) % 3])) {
			rgb[(i + 1) % 3] = Math.max(0, rgb[(i + 1) % 3] - vColor);
			done = true;
		}
		else if (vColor <= Math.abs(Math.max(0, rgb[(i + 2) % 3] - vColor) - rgb[(i + 2) % 3])) {
			rgb[(i + 2) % 3] = Math.max(0, rgb[(i + 2) % 3] - vColor);
			done = true;
		}
		if (done) {
			focusBorderColor = "#" + ("0" + rgb[0].toString(16)).slice(-2) + ("0" + rgb[1].toString(16)).slice(-2) + ("0" + rgb[2].toString(16)).slice(-2);
			break;
		}
	}
	
	for(let index = 0; index < sheet.cssRules.length; index++) {
		let cssText = sheet.cssRules[index].cssText || sheet.cssRules[index];
		//log(cssText)
		/*if (navigator.userAgent.indexOf("iPhone") + 1) {
			(/body[\s]+\*[\s]+\{[\s]+max-height/).test(cssText) && sheet.deleteRule(index);
		}*/
		if (theme["a"] && (/^(a \{)|(a:link \{)|(a:visited \{)|(a:hover \{)|(a:active \{)/).test(cssText)) {
			sheet.deleteRule(index);
			sheet.insertRule(cssText = cssText.replace(/(color:[\s]*rgb[\s]*\([\s]*[0-9]+[\s]*\,[\s]*[0-9]+[\s]*\,[\s]*[0-9]+[\s]*\)[\s]*;)|(color:[\s]*[a-zA-z]+[\s]*;)/, `color: ${theme["a"]["color"]};`), index);
		}
		if ((/body \{/).test(cssText)) {
			sheet.deleteRule(index);
			cssText = cssText.replace(/(color:[\s]*rgb[\s]*\([\s]*[0-9]+[\s]*\,[\s]*[0-9]+[\s]*\,[\s]*[0-9]+[\s]*\)[\s]*;)|(color:[\s]*[a-zA-z]+[\s]*;)/, `color: ${theme["body"]["color"]};`);
			sheet.insertRule(cssText = cssText.replace(/(background-color:[\s]*rgb[\s]*\([\s]*[0-9]+[\s]*\,[\s]*[0-9]+[\s]*\,[\s]*[0-9]+[\s]*\)[\s]*;)|(background-color:[\s]*[a-zA-z]+[\s]*;)/, `background-color: ${theme["body"]["backgroundColor"]};`), index);
		}
		if ((/^(h3 \{)|(h4 \{)|(li \{)/).test(cssText)) {
			sheet.deleteRule(index);
			sheet.insertRule(cssText = cssText.replace(/(color:[\s]*rgb[\s]*\([\s]*[0-9]+[\s]*\,[\s]*[0-9]+[\s]*\,[\s]*[0-9]+[\s]*\)[\s]*;)|(color:[\s]*[a-zA-z]+[\s]*;)/, `color: ${theme["body"]["color"]};`), index);
		}
		if ((/(text \{)|(mark \{)/).test(cssText)) {
			sheet.deleteRule(index);
			cssText = cssText.replace(/(color:[\s]*rgb[\s]*\([\s]*[0-9]+[\s]*\,[\s]*[0-9]+[\s]*\,[\s]*[0-9]+[\s]*\)[\s]*;)|(color:[\s]*[a-zA-z]+[\s]*;)/, `color: ${theme["body"]["color"]};`);
			sheet.insertRule(cssText = cssText.replace(/(background-color:[\s]*rgb[\s]*\([\s]*[0-9]+[\s]*\,[\s]*[0-9]+[\s]*\,[\s]*[0-9]+[\s]*\)[\s]*;)|(background-color:[\s]*[a-zA-z]+[\s]*;)/, `background-color: ${theme["body"]["backgroundColor"]};`), index);
		}
		if ((/(\.showFocus \{)|(\.hideFocus \{)/).test(cssText)) {
			sheet.deleteRule(index);
			cssText = cssText.replace(/(color:[\s]*rgb[\s]*\([\s]*[0-9]+[\s]*\,[\s]*[0-9]+[\s]*\,[\s]*[0-9]+[\s]*\)[\s]*;)|(color:[\s]*[a-zA-z]+[\s]*;)/, `color: ${theme["body"]["color"]};`);
			sheet.insertRule(cssText = cssText.replace(/(background-color:[\s]*rgb[\s]*\([\s]*[0-9]+[\s]*\,[\s]*[0-9]+[\s]*\,[\s]*[0-9]+[\s]*\)[\s]*;)|(background-color:[\s]*[a-zA-z]+[\s]*;)/, `background-color: ${theme["body"]["backgroundColor"]};`), index);
		}
		if ((/ol \{/).test(cssText)) {
			sheet.deleteRule(index);
			sheet.insertRule(cssText = cssText.replace(/(color:[\s]*rgb[\s]*\([\s]*[0-9]+[\s]*\,[\s]*[0-9]+[\s]*\,[\s]*[0-9]+[\s]*\)[\s]*;)|(color:[\s]*[a-zA-z]+[\s]*;)/, `color: ${theme["body"]["color"]};`), index);
		}
		if ((/li::marker \{/).test(cssText)) {
			sheet.deleteRule(index);
			sheet.insertRule(cssText = cssText.replace(/(color:[\s]*rgb[\s]*\([\s]*[0-9]+[\s]*\,[\s]*[0-9]+[\s]*\,[\s]*[0-9]+[\s]*\)[\s]*;)|(color:[\s]*[a-zA-z]+[\s]*;)/, `color: ${theme["body"]["color"]};`), index);
		}
		if ((/ul\[color[dD]epth/).test(cssText)) {
			//log(cssText)
			for (let i = 0; i < 7; i++) {
				//log(new RegExp(`ol\\[color[dD]epth\\="${i}"\\] \\{`).toString());
				if (new RegExp(`ol\\[color[dD]epth\\="${i}"\\] \\{`).test(cssText)) {
					sheet.deleteRule(index);
					//log(cssText)
					cssText = cssText.replace(/(background-color:[\s]*rgb[\s]*\([\s]*[0-9]+[\s]*\,[\s]*[0-9]+[\s]*\,[\s]*[0-9]+[\s]*\)[\s]*;)|(background-color:[\s]*[a-zA-z]+[\s]*;)/, `background-color: ${theme["body"]["backgroundColor"]};`);
					//log(cssText, ">")
					sheet.insertRule(cssText = cssText.replace(/(solid[\s]*rgb[\s]*\([\s]*[0-9]+[\s]*\,[\s]*[0-9]+[\s]*\,[\s]*[0-9]+[\s]*\)[\s]*;)|(solid[\s]*[a-zA-z]+[\s]*;)/, `solid ${theme["body"]["color"]};`), index);
				}
			}
		}
		//log(cssText, "info")
	}
	//log(sheet.cssRules)
}

})();
