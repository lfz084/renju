//if (self.SCRIPT_VERSIONS) self.SCRIPT_VERSIONS["CheckerBoard"] = "2024.23206";
(function(global, factory) {
    (global = global || self, factory(global));
}(this, (function(exports) {
    'use strict';

    const DEBUG_CHECKER_BOARD = false;
    const TYPE_EMPTY = 0;
    const TYPE_MARK = 1 << 4; // 标记
    const TYPE_MOVE = TYPE_MARK | 1; //VCF手顺
    const TYPE_MARKFOUL = TYPE_MARK | 2;
	const TYPE_NUMBER = 2 << 4; // 顺序添加的棋子
    const TYPE_BLACK = TYPE_NUMBER | 1; // 无序号 添加的黑棋
    const TYPE_WHITE = TYPE_NUMBER | 2; // 无序号 添加的黑棋
    
    const COORDINATE_NONE = 0;
    const COORDINATE_ALL = 1;
    const COORDINATE_LEFT_UP = 2;
    const COORDINATE_RIGHT_UP = 3;
    const COORDINATE_RIGHT_DOWN = 4;
    const COORDINATE_LEFT_DOWN = 5;
    const COORDINATE_NUM_CW = 6;
    const COORDINATE_NUM_CCW = 7;
    
    const MODE_BOARD = 0;
    const MODE_IMG = 1;

    const MAX_SCALE = 1.5;
    const MAX_ZOOM = 5;
    const MIN_SCALE = 1;
    const MIN_ZOOM = 1;

    const ALL_STAR_POINTS = {
        15: [112, 48, 56, 168, 176],
        14: [96, 97, 111, 112, 32, 41, 167, 176],
        13: [96, 32, 40, 152, 160],
        12: [80, 81, 95, 96, 16, 25, 151, 160],
        11: [80, 16, 24, 136, 144],
        10: [64, 65, 79, 80],
        9: [64],
        8: [48, 49, 63, 64],
        7: [48],
        6: []
    }
    
    const defaultTheme = {
    	"backgroundColor": "white",
    	"wNumColor": "white",
    	"bNumColor": "#000000",
    	"wNumFontColor": "#000000",
    	"bNumFontColor": "#ffffff",
    	"LbBackgroundColor": "white",
    	"coordinateColor": "#000000",
    	"lineColor": "#000000",
    	"borderColor": "#bbbbbb",
    	"wLastNumColor": "#ff0000",
    	"bLastNumColor": "#ffaaaa",
    	"moveWhiteColor": "#bbbbbb",
    	"moveBlackColor": "#bbbbbb",
    	"moveWhiteFontColor": "#ffffff",
    	"moveBlackFontColor": "#000000",
    	"moveLastFontColor": "red"
    }

    function log(param, type = "log") {
        const print = console[type] || console.log;
        DEBUG_CHECKER_BOARD && window.DEBUG && (window.vConsole || window.parent.vConsole) && print(`[CheckerBoard.js] ${ param}`);
    }

    //------------------------ loadFont ------------------

    let fonts_status = "unloaded"; // unloaded >> loading >> loaded
    const fonts = [{	//  优先加载 Roboto 英文字体
        	family: "Roboto",
        	descriptors: { weight: "normal" }
        }, {
        	family: "Roboto",
        	descriptors: { weight: "bold" }
        }, {
        	family: "Roboto",
        	descriptors: { weight: "900" }
        }, {
        	family: "mHeiTi",
        	descriptors: { weight: "normal" }
        }, {
        	family: "mHeiTi",
        	descriptors: { weight: "bold" }
        }, {
        	family: "mHeiTi",
        	descriptors: { weight: "900" }
        },{
        	family: "emjFont",
        	descriptors: { weight: "normal" }
        }, {
        	family: "emjFont",
        	descriptors: { weight: "bold" }
        }, {
        	family: "emjFont",
        	descriptors: { weight: "900" }
    	}];
    const queueBoards = [];

    async function wait(timeout) {
        return new Promise(resolve => setTimeout(resolve, timeout))
    }

    async function loadFonts(cBoard) {
    	!(queueBoards.find(board => board===cBoard)) && queueBoards.push(cBoard);
    	if (fonts_status == "unloaded") {
    		await wait(1000);
            fonts_status = "loading";
            let log_str = "CheckerBoard loadFonts:\n";
            const numFonts = fonts.length;
            while (fonts.length) {
                const font = fonts.shift();
                const fontCSS = `${font.descriptors.weight} 50px ${font.family}`;
                const text = "五子棋renju123㉕㉖";
                log_str += `loading: ${fontCSS}, ${numFonts - fonts.length} / ${numFonts}\n`;
                log(log_str, "info");
            	const fontFaces = await document.fonts.load(fontCSS, text);
                const logFontFaces = fontFaces.map(fontFace => `${fontFace.weight} 50px ${fontFace.family} ${fontFace.status}`).join("\n") || "没有找到字体";
                log_str += `${logFontFaces} \n`;
                log(log_str, "info");
                queueBoards.map(board => {
                	if (board.mode != MODE_BOARD) return;
        			board.printEmptyCBoard();
        			board.refreshBoardPoint("all");
        			log(`font loaded: refreshCheckerBoard`);
                })
            }
            fonts_status = "loaded";
        }
        else if (fonts_status == "loading") {
            while (fonts_status == "loading") {
                await wait(1000);
            }
        }
    }	


    //------------------------ Animation ------------------
	/** 封装好的动画函数
	 * @callbackCondition {function} 返回一个bool值，false 立刻关闭动画
	 * @callBackFrame {function} 处理每一针动画
	 * @callBackStart {function} 可选，动画开始前执行
	 * @callbackEnd {function} 可选，动画结束后执行
	 */ 
    const animation = (() => {
        let _callbackCondition = () => {},
            _callBackStart = () => {},
            _callBackFrame = () => {},
            _callbackEnd = () => {},
            _isBusy = false,
            _animation = null;

        function scrollTo() {
            _callBackFrame();
            if (_callbackCondition()) {
                _animation = requestAnimationFrame(scrollTo);
            }
            else {
                cancelAnima();
            }
        }

        function cancelAnima() {
            cancelAnimationFrame(_animation);
            _callbackEnd();
            _callbackCondition = () => {};
            _callBackStart = () => {};
            _callBackFrame = () => {};
            _callbackEnd = () => {};
            _animation = null;
            _isBusy = false;
        }
        return (callbackCondition, callBackFrame, callBackStart = () => {}, callbackEnd = () => {}) => {
            if (_isBusy) return;
            _isBusy = true;
            _callbackCondition = callbackCondition;
            _callBackStart = callBackStart;
            _callBackFrame = callBackFrame;
            _callbackEnd = callbackEnd;
            _callBackStart();
            scrollTo();
        }
    })();

    function animationZoomBoard(x1, y1, x2, y2) {
        const box = this.viewBox;
        let isExitAnima = false;

        const setMove = function() {
            const touches = event.changedTouches;
            if (touches.length == 2) {
                x1 = touches[0].pageX / this.bodyScale;
                y1 = touches[0].pageY / this.bodyScale;
                x2 = touches[1].pageX / this.bodyScale;
                y2 = touches[1].pageY / this.bodyScale;
            }
        }.bind(this)

        function exitAnima() {
            isExitAnima = true;
        }

        const oldScale = this.scale;
        let distance = Math.hypot(x1 - x2, y1 - y2);
        let centerX = ((x1 - x2) / 2 + x2); // 缩放中心点，Page 左上角为原点
        let centerY = ((y1 - y2) / 2 + y2);
        const p = { x: centerX, y: centerY };
        this.xyPageToObj(p, this.viewBox); // 转为 viewBox 左上角为原点
        centerX = p.x; //记录中心点
        centerY = p.y;
        p.x += this.viewBox.scrollLeft; // 转为 scaleBox 左上角为原点
        p.y += this.viewBox.scrollTop;
        box.addEventListener("touchmove", setMove, true);
        box.addEventListener("touchend", exitAnima, true);
        box.addEventListener("touchcancel", exitAnima, true);
        box.addEventListener("touchleave", exitAnima, true);

        animation(() => !isExitAnima,
            () => {
                const oldDistance = distance;
                distance = Math.hypot(x1 - x2, y1 - y2);
                this.scale = Math.min(Math.max(MIN_ZOOM, this.scale * distance / oldDistance), MAX_ZOOM);
                scaleBoard.call(this, this.scale);
                //this.scaleBox.style.transformOrigin = `0px 0px`;
                //this.scaleBox.style.transform = `scale(${this.scale})`;
                this.viewBox.scrollLeft = p.x * this.scale / oldScale - centerX; // 中心点在 viewBox 保存不变
                this.viewBox.scrollTop = p.y * this.scale / oldScale - centerY;
            },
            () => {this.setViewBoxBorder(true)},
            () => {
                this.setViewBoxBorder(this.scale > 1);
                box.removeEventListener("touchmove", setMove, true);
                box.removeEventListener("touchend", exitAnima, true);
                box.removeEventListener("touchcancel", exitAnima, true);
                box.removeEventListener("touchleave", exitAnima, true);
            })
    }

    function animationScaleBoard(scale) {
        let oldScale = this.scale,
            newScale = scale,
            points = [],
            moves_x = [],
            moves_y = [],
            width_arr = [];
        if (newScale <= 1) {
            points = getPoints(this.width * (1 - oldScale));
            moves_x = getMoveArray(0 - this.viewBox.scrollLeft, points);
            moves_y = getMoveArray(0 - this.viewBox.scrollTop, points);
            width_arr = getScaleArray(this.width * (1 - oldScale), points, this.width * oldScale, this.width);
        }
        else {
            points = getPoints(this.width * (newScale - oldScale));
            moves_x = getMoveArray(Math.max(0, this.width * (newScale - 1) / 2) - this.viewBox.scrollLeft, points);
            moves_y = getMoveArray(Math.max(0, this.width * (newScale - 1) / 2) - this.viewBox.scrollTop, points);
            width_arr = getScaleArray(this.width * (newScale - oldScale), points, this.width * oldScale, this.width);
        }
        animation(() => moves_x.length || moves_y.length || width_arr.length,
            () => {
                if (width_arr.length) {
                    scaleBoard.call(this, width_arr.shift());
                    //this.scaleBox.style.transformOrigin = `0px 0px`;
                    //this.scaleBox.style.transform = `scale(${width_arr.shift()})`;
                }
                moves_x.length && (this.viewBox.scrollLeft += moves_x.shift());
                moves_y.length && (this.viewBox.scrollTop += moves_y.shift());
            },
            () => this.setViewBoxBorder(true),
            () => this.setViewBoxBorder(newScale > 1))
    }

    function getMoveArray(move, points) {
        let rt = [],
            sum = 0;
        for (let i = 0; i < points.length - 1; i++) {
            rt[i] = ~~(move * points[i]);
            sum += rt[i];
        }
        rt[rt.length] = (Math.abs(move) - Math.abs(sum)) * (move < 0 ? -1 : 1);
        //log(`${rt}`,"info")
        return rt;
    }

    function getScaleArray(move, points, scaleWidth, width) {
        let rt = [],
            sum = 0;
        for (let i = 0; i < points.length - 1; i++) {
            sum += points[i];
            rt[i] = (move * sum + scaleWidth) / width;
        }
        rt[rt.length] = (move + scaleWidth) / width;
        //log(`${rt}`, "info")
        return rt;
    }

    function getPoints(move) {
        const PAR = 1.1;
        const PAR2 = move < 0 ? 1.38 : 1.38;
        const MAX_MOVE = 5000;
        let sum = Math.abs(move);
        let tempMove = 0;
        let tempMoves = [0]; //保证最少有一个
        while (sum) {
            tempMove = Math.pow(tempMove, PAR) * PAR2 || sum / 300;
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
            rtHs.push(tempMoves[i] / Math.abs(move));
        }
        //log(`${rtHs}`,"info")
        return rtHs;
    }

    //------------------------ point -----------------------

    //定义棋盘上的一个点
    class point {
        constructor(x, y, d) {
            this.x = x;
            this.y = y;
            this.d = d; // 对div标签的引用，null为空;
            this.type = 0; // 这个点是否有棋子，=TYPE_EMPTY为空，棋子=TYPE_NUMBER,bi标记=TYPE_MARK
            this.text = "";
            this.color = null;
            this.bkColor = null;
            this.branchs = null;
        }
    }

    //清空这个点上面的棋子，数字，标记              
    point.prototype.cle = function() {
        if (this.d != null) {
            this.d.innerHTML = "";
            this.d.style.background = "";
            this.d.style.borderStyle = "none";
            this.d.style.zIndex = -100;
            this.d.style.position = "absolute";
            this.d.style.left = "0px";
            this.d.style.top = "0px";
        }
        // this.d = null;
        this.type = 0;
        this.text = "";
        this.color = null;
        this.bkColor = null;
        this.branchs = null;
        //alert("p.cle")
    }

    point.prototype.printBorder = function(gW, gH) {
        let size;
        let temp;
        if (this.x == null || this.y == null) { return };
        temp = (gW < gH) ? gW : gH;
        size = ~~(temp / 4 * 3.6);
        this.d.style.position = "absolute";
        this.d.style.width = size + "px";
        this.d.style.height = size + "px";
        this.d.style.left = this.x - (size / 2) - Math.max(size/10, 1) + "px";
        this.d.style.top = this.y - (size / 2) - Math.max(size/10, 1) + "px";
        this.d.style.border = `${Math.max(size/10, 1)}px dashed red`;
        this.d.style.zIndex = 0;
    }

    //在这个点上记一个标记
    point.prototype.printLb = function(s, color, gW, gH) {
        //alert("printLb")
        let size;
        let temp;
        this.type = TYPE_MARK;
        this.text = s;
        this.color = color;
        this.d.innerHTML = this.text;
        temp = (gW < gH) ? gW : gH;
        size = ~~(temp / 4 * 3);
        this.d.style.fontSize = size + "px";
        this.d.style.color = color;
        this.d.style.position = "absolute";
        this.d.style.background = "";
        this.d.style.width = size + "px";
        this.d.style.height = size + "px";
        this.d.style.lineHeight = size + "px";
        this.d.style.left = this.x - ~~(size / 2) + "px";
        this.d.style.top = this.y - ~~(size / 2) + "px";
        this.d.style.zIndex = 0;
    }

    // 在这个点上放一个棋子or数字;
    point.prototype.printNb = function(n, color, gW, gH, numColor) {
        let size;
        let temp;
        this.color = numColor;
        this.text = String(n);
        this.type = color == "black" ? TYPE_BLACK : TYPE_WHITE;
        this.d.innerHTML = this.text;
        temp = (gW < gH) ? gW : gH;
        size = (color == "black" || color == "white") ? ~~(temp / 4 * 1.5) : ~~(temp / 4 * 3);
        this.d.style.fontSize = size + "px";
        size = ~~(temp / 4 * 2);
        this.d.style.color = color == "white" ? "black" : "white";
        this.d.style.position = "absolute";
        this.d.style.background = (color == "white") ? "white" : (color == "black") ? "black" : "";
        this.d.style.width = size + "px";
        this.d.style.height = size + "px";
        this.d.style.lineHeight = size + "px";
        this.d.style.left = this.x - ~~(size / 2) + "px";
        this.d.style.top = this.y - ~~(size / 2) + "px";
        this.d.style.borderStyle = "";
        this.d.style.zIndex = 0;
        if (color == "black" || color == "white") {
            this.d.style.borderStyle = "solid";
            this.d.style.borderWidth = "1px";
            this.d.style.borderColor = color;
            if (color == "white") this.d.style.borderColor = "black";
        }
    }

    //改变一个棋子or数字颜色
    point.prototype.setcolor = function(color) {
        this.printNb(parseInt(this.text), color);
    }

    //bind div
    point.prototype.setd = function(d) { this.d = d; };

    point.prototype.setxy = function(x, y) {
        this.x = x;
        this.y = y;
    }

    //--------------------------- scaleBoard --------------------
    //--为了兼容 safari 实现 viewBox 的滚动 -------------------------
    //--必须改变 fullBox 尺寸, 撑开 viewBox ------------------------------------

    function scaleBoard(scale) {
        this.fullBox.style.width = `${~~(scale*this.width)}px`;
        this.fullBox.style.height = `${~~(scale*this.height)}px`;
        this.scaleBox.style.transformOrigin = `0px 0px`;
        this.scaleBox.style.transform = `scale(${scale})`;
    }

    //------------------------ transform board ------------------
	/*
	function rotate90({x, y}, size = 15) {
	    return {x: size - 1 - y, y: x}
	}
	    
	function rotateY180({x, y}, size = 15) {
	    return {x: size - 1 - x, y: y}
	}
	*/
		
    function isStoneOut(x, y) {
        return x >= this.size || y >= this.size;
    }

    function isStoneMoveOut(x, y, row, col) {
        return x + col < 0 || x + col >= this.size || y + row < 0 || y + row >= this.size;
    }
    
    function isBoardMoveOut(row, col) {
        for (let i = 0; i < 225; i++) {
            switch (this.P[i].type) {
                case TYPE_BLACK:
                case TYPE_WHITE:
                case TYPE_NUMBER:
                    let x = i % 15,
                        y = ~~(i / 15);
                    if (!isStoneOut.call(this, x, y) && isStoneMoveOut.call(this, x, y, row, col)) return true;
            }
        }
    }

    function transform_MS(callback, row = 0, col = 0) {
        let len = this.MS.length;
        for (let i = 0; i < len; i++) {
            let x = this.MS[i] % 15,
                y = ~~(this.MS[i] / 15);
            if (this.MS[i] == 225) { //passMove
            }
            else if (isStoneOut.call(this, x, y) || isStoneMoveOut.call(this, x, y, row, col)) {
                for (let j = i; j < len; j++) this.free_TYPE_NUMBER(this.MS[j])
                this.MS.splice(i, len - i);
                if (this.MSindex >= i) this.MSindex = i - 1;
                break;
            }
            else {
                callback(i, x, y);
            }
        }
    }

    function rotate90_MS() {
        transform_MS.call(this, (i, x, y) => {
        	let x1 =  this.SLTY - 1 - y,
            	y1 =  x;
            this.MS[i] = y1 * 15 + x1;
        });
    }

    function rotateY180_MS() {
        transform_MS.call(this, (i, x, y) => {
            let x1 = this.SLTX - 1 - x,
            	y1 = y;
            this.MS[i] = y1 * 15 + x1;
        });
    }

    function translate_MS(row = 0, col = 0) {
        transform_MS.call(this, (i, x, y) => {
            let x1 = x + col,
                y1 = y + row;
            this.MS[i] = y1 * 15 + x1;
        }, row, col);
    }

    function transform_P(callback, row = 0, col = 0) {
        let arr2d = [];
        for (let y = 0; y < 15; y++) {
            arr2d[y] = [];
            for (let x = 0; x < 15; x++) {
                arr2d[y][x] = this.P[y * 15 + x];
                if (isStoneOut.call(this, x, y) || isStoneMoveOut.call(this, x, y, row, col))
                    arr2d[y][x].cle();
            }
        }
        for (let y = 0; y < this.SLTY; y++) {
            for (let x = 0; x < this.SLTX; x++) {
                callback(x, y, arr2d);
            }
        }
        this.resetP();
    }

    function rotate90_P() {
        transform_P.call(this, (x, y, arr2d) => {
            let y1 = this.SLTX - 1 - x;
            this.P[y * 15 + x] = arr2d[y1][y];
        })
    }

    function rotateY180_P() {
        transform_P.call(this, (x, y, arr2d) => {
        	let x1 = this.SLTX - 1 - x;
            this.P[y * 15 + x] = arr2d[y][x1];
        })
    }

    function translate_P(row = 0, col = 0) {
        transform_P.call(this, (x, y, arr2d) => {
            let x1 = (x + col + this.SLTX) % this.SLTX,
                y1 = (y + row + this.SLTY) % this.SLTY;
            this.P[y1 * 15 + x1] = arr2d[y][x];
        }, row, col)
    }

    //-------------------- idx Name ----------------------

    const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    function idxToName(idx) {
        let x = (idx % 15);
        let y = ~~(idx / 15);
        return alpha.charAt(x) + (15 - y);
    }

    function nameToIdx(name) {
        let x = name.toLowerCase().charCodeAt() - "a".charCodeAt();
        name = name.substring(1);
        let y = 15 - name; //转换成第一行为0，依次为1,2,3...
        return x + y * 15;
    }

    //-------------------- code --------------------

    // 对传入的棋谱代码排错;
    function checkerCode(codeStr = "") {
        let d, a, n, m = codeStr.toUpperCase();
        codeStr = "";
        while (m.length) {
            a = "";
            n = "";
            while (m.length) {
                a = m.substring(0, 1);
                m = m.substring(1);
                d = a.charCodeAt() - "A".charCodeAt();
                if (d >= 0 && d <= 14) break; // 找到英文字母为止;
            }
            while (m.length) {
                n = m.substring(0, 1);
                m = m.substring(1);
                d = n.charCodeAt() - "0".charCodeAt();
                if (d >= 0 && d <= 9) break; // 找到一个数字为止;
            }
            //每个棋子落点横坐标用A-O表示，纵坐标用1-15来表
            //判断棋子纵坐标是否是2位，是则继续截取，补足3位。
            d = m.charCodeAt() - "0".charCodeAt();
            if (d >= 0 && d <= 9) {
                n += m.substring(0, 1);
                m = m.substring(1);
            }
            let isPass = (a + n) == "A0";
            // 排除不存在的坐标，同时去掉重复的坐标
            if ((parseInt(n) <= 15 && parseInt(n) > 0) || isPass) {
                let index = codeStr.indexOf(a + n);
                if (index < 0 || isPass) {
                    // 没有重复
                    codeStr = codeStr + a + n;
                }
                else if (parseInt(n) <= 9) { // 如果Y坐标是一位数字，再确认是否重复
                    let r = codeStr.substring(index + 2, 1).charCodeAt() - "0".charCodeAt();
                    // 没有重复
                    if (r >= 0 && r <= 9) codeStr = codeStr + a + n;
                }
            }
        }
        return codeStr;
    }
    
    function putStone(idx, type = TYPE_NUMBER) {
    	if (!this.P[idx]) return false;
    	const oldType = this.P[idx].type;
    	this.P[idx].type = type;
    	const { x, y, radius, color, lineWidth } = this.getBoardPointInfo(idx, false).circle;
    	this.P[idx].type = oldType;
    	log(`${this.firstColor}\n${this.MS.slice(0,this.MSindex+1)}\n${this.MS.slice(0)}`)
    	const fill =[this.bNumColor, this.wNumColor][(this.MSindex + (this.firstColor=="black"?1:2)) % 2]
    	Object.assign(this.stoneDiv.style, {
    		position: "absolute",
    		left: x - radius + "px",
    		top: y - radius + "px",
    		width: radius * 2 + "px",
    		height: radius * 2 + "px",
    		border: `${lineWidth}px solid ${color}`,
    		backgroundColor: fill
    	})
    	this.viewBox.appendChild(this.stoneDiv);
    	return true;
    }

    //---------------------- Board ------------------------

    //定义一个棋盘
    class Board {
    	get defaultTheme() { return defaultTheme }
        get onMove() { return this._onMove }
        set onMove(callback) { this._onMove = callback.bind(this) }
        get sizechange() { return this._sizechange }
        set sizechange(callback) { this._sizechange = callback.bind(this) }
        get boardchange() { return this._boardchange }
        set boardchange(callback) { this._boardchange = callback.bind(this) }
        get viewchange() { return this._viewchange }
        set viewchange(callback) { this._viewchange = callback.bind(this) }
        get stonechange() { return this._stonechange }
        set stonechange(callback) { this._stonechange = callback.bind(this) }

        constructor(parentNode, left, top, width, height) {
            //event
            this._onMove = () => {};
            this._sizechange = () => {};
            this._boardchange = () => {};
            this._viewchange = () => {};
            this._stonechange = () => {};
            
            this.mode = MODE_BOARD;

            this.parentNode = parentNode;
            this.left = parseInt(left);
            this.top = parseInt(top);
            this.width = parseInt(width);
            this.height = parseInt(height);

            this.isShowNum = true; // 是否显示手顺
            this.isShowFoul = false;

            this.P = new Array(226); //用来保存225个点
            this.MS = []; //保存落子顺序,index
            this.MSindex = -1; //  指针，指向当前棋盘最后一手在MS索引   
            this.resetNum = 0; //重置显示的手数，控制从第几手开始显示序号
            this.hideLastMove = false; // = true ,取消最后一手高亮显示
            this.printMovesTime = 0;

            this.XL = 0; //棋盘落子范围，左右上下的4条边
            this.XR = 0;
            this.YT = 0;
            this.YB = 0;
            this.gW = 0; //棋盘格子宽度,浮点数
            this.gH = 0; //棋盘格子高度,浮点数
            this.size = 15;
            this.coordinateType = COORDINATE_ALL;
            this.SLTX = this.size;
            this.SLTY = this.SLTX; //默认是15×15棋盘;

            //页面显示的棋盘
            this.viewBox = document.createElement("div");
            this.viewBox.style.position = "absolute";
            this.viewBox.style.width = this.width + "px";
            this.viewBox.style.height = this.height + "px";
            this.viewBox.style.left = this.left + "px";
            this.viewBox.style.top = this.top + "px";
            this.viewBox.setAttribute("id", "viewBox");
            this.viewBox.setAttribute("class", "viewBox");
            this.parentNode.appendChild(this.viewBox);

            this.bodyScale = 1;
            this.scale = 1;
            
            this.fullBox = document.createElement("div");
            this.fullBox.style.position = "absolute";
            this.fullBox.style.width = this.width + "px";
            this.fullBox.style.height = this.height + "px";
            this.fullBox.style.left = "0px";
            this.fullBox.style.top = "0px";
            this.fullBox.setAttribute("id", "fullBox");
            this.viewBox.appendChild(this.fullBox);
            
            this.scaleBox = document.createElement("div");
            this.scaleBox.style.position = "absolute";
            this.scaleBox.style.width = this.width + "px";
            this.scaleBox.style.height = this.height + "px";
            this.scaleBox.style.left = "0px";
            this.scaleBox.style.top = "0px";
            this.scaleBox.setAttribute("id", "scaleBox");
            this.viewBox.appendChild(this.scaleBox);

            this.searchIdx = []; // 记录正在计算的点
            this.searchPoints = [];
            for (let i = 0; i < 225; i++) {
                this.searchPoints[i] = document.createElement("div");
                //this.scaleBox.appendChild(this.searchPoints[i]);
                this.searchPoints[i].style.zIndex = 1;
                this.searchPoints[i].style.borderRadius = "50%";
                this.searchPoints[i].style.borderStyle = "";
                this.searchPoints[i].style.margin = "";
                this.searchPoints[i].style.padding = "";
            }
            for (let i = 0; i < 30; i++) { this.searchIdx[i] = -1; };

            this.backgroundColor = "white"; //"#f0f0f0"; //888888
            this.wNumColor = "white";
            this.bNumColor = "#000000"; //333333
            this.wNumFontColor = "#000000"; //333333
            this.bNumFontColor = "#ffffff"; //333333
            this.LbBackgroundColor = "#f0f0f0"; //888888
            this.coordinateColor = "#000000"; //111111
            this.lineColor = "#000000"; //111111
            this.borderColor = "#bbbbbb";
            this.wLastNumColor = "#ff0000"; //dd0000
            this.bLastNumColor = "#ffaaaa"; //dd0000
            this.moveWhiteColor = "#bbbbbb"; //bbbbbb
            this.moveBlackColor = "#bbbbbb"; //666666
            this.moveWhiteFontColor = "#ffffff"; //ffffff
            this.moveBlackFontColor = "#000000"; //000000
            this.moveLastFontColor = "red"; //ff0000
            this.firstColor = "black";
            this.lineStyle = "normal";
            this.theme = defaultTheme;

            this.pixelRatio = window.devicePixelRatio || 1;
            this.canvas = document.createElement("canvas");
            this.canvas.style.position = "absolute";
            this.canvas.style.width = this.viewBox.style.width;
            this.canvas.style.height = this.canvas.style.width;
            this.canvas.style.left = "0px";
            this.canvas.style.top = "0px";
            this.canvas.style.zIndex = 0;
            //this.canvas.style.transformOrigin = `0px 0px`;
            //this.canvas.style.transform = `scale(${this.scale})`;
            this.scaleBox.appendChild(this.canvas);

            //后台保存的空棋盘
            this.bakCanvas = document.createElement("canvas");
            this.bakCanvas.style.position = "absolute";
            this.bakCanvas.style.width = this.canvas.style.width;
            this.bakCanvas.style.height = this.canvas.style.height;
            this.bakCanvas.style.left = this.canvas.offsetLeft + "px";
            this.bakCanvas.style.top = this.canvas.offsetTop + "px";
            //this.scaleBox.appendChild(this.bakCanvas);
            //后台裁剪图片的canvas
            this.cutCanvas = document.createElement("canvas");

            //后台处理图片的img     
            this.bakImg = document.createElement("img");
            this.bakImg.style.position = "absolute";
            this.cutImg = document.createElement("img");
            this.cutImg.style.position = "absolute";
            //this.scaleBox.appendChild(this.cutImg);

            for (let i = 0; i < 226; i++) {
                let div = document.createElement("div");
                div.style.borderRadius = "50%";
                this.scaleBox.appendChild(div);
                div.addEventListener("touchend", () => event.preventDefault(), true);
                //div.addEventListener("touchmove", () => event.preventDefault());
                this.P[i] = new point(-500, -500, div);
            }
            
            this.stoneDiv = document.createElement("div");
            this.stoneDiv.style.borderRadius = "50%";
            this.stoneDiv.addEventListener("touchend", () => event.preventDefault(), true);

            this.delay = function() { // 设置延迟执行
                let timer;
                return function(callback, timeout) {
                    if (timer) clearTimeout(timer);
                    if (timeout == 0) try {callback()} catch(e){console.error(e.stack)}
                    else timer = setTimeout(()=>{try {callback()} catch(e){console.error(e.stack)}}, timeout);
                }
            }();
        }
    }


    Board.prototype.map = function(callback) {
        this.P.map(p => callback(p))
    }

    Board.prototype.move = function(left = this.left, top = this.top, width = this.width, height = this.height, parentNode = this.parentNode) {
        parentNode.appendChild(this.viewBox);
        this.parentNode = parentNode;
        this.XL *= width / this.width;
        this.XR *= width / this.width;
        this.YT *= width / this.width;
        this.YB *= width / this.width;
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
        this.viewBox.style.left = left + "px";
        this.viewBox.style.top = top + "px";
        this.viewBox.style.width = width + "px";
        this.viewBox.style.height = height + "px";
    }

    // 顺时针 翻转棋盘90°
    Board.prototype.rotate90 = function() {
        rotate90_MS.call(this);
        rotate90_P.call(this);
        this.refreshCheckerBoard();
    }

    // 左右 翻转棋盘180°
    Board.prototype.rotateY180 = function() {
        rotateY180_MS.call(this);
        rotateY180_P.call(this);
        this.refreshCheckerBoard();
    }

    //移动棋盘， row，col 偏移的行数，列数
    Board.prototype.translate = function(row, col) {
        if (isBoardMoveOut.call(this, row, col)) return;
        translate_MS.call(this, row, col);
        translate_P.call(this, row, col);
        this.refreshCheckerBoard();
    }
    
    Board.prototype.rotateMoves90 = function(moves) {
    	const oldMS = this.MS;
    	const oldMSindex = this.MSindex;
    	this.MS = moves;
    	rotate90_MS.call(this);
    	this.MS = oldMS;
    	this.MSindex = oldMSindex;
    	return moves;
    }
    
    Board.prototype.rotateMovesY180 = function(moves) {
    	const oldMS = this.MS;
    	const oldMSindex = this.MSindex;
    	this.MS = moves;
    	rotateY180_MS.call(this);
    	this.MS = oldMS;
    	this.MSindex = oldMSindex;
    	return moves;
    }
     
    Board.prototype.translateMoves = function(moves, row, col) {
    	const oldMS = this.MS;
    	const oldMSindex = this.MSindex;
    	this.MS = moves;
    	translate_MS.call(this, row, col);
    	this.MS = oldMS;
    	this.MSindex = oldMSindex;
    	return moves;
    }

    // 清空棋盘上每一个点的显示，和记录
    Board.prototype.cle = function() {
        this.MSindex = -1;
        this.MS.length = 0;
        for (let i = 0; i < 225; i++) {
            this.clePoint(i);
        }
    }

    // 删除一个标记
    Board.prototype.cleLb = function(idx) {
        let points = [];
        if (typeof(idx) == "string" && idx == "all") {
            for (let i = 0; i < 15 * 15; i++) {
                if (this.P[i].type == TYPE_MARK || this.P[i].type == TYPE_MOVE) {
                    this.clePoint(i);
                    points.push(i);
                }
            }
        }
        else {
            if (this.P[idx].type == TYPE_MARK || this.P[idx].type == TYPE_MOVE) {
                this.clePoint(idx);
                points.push(idx);
            }
        }
        return points;
    }

    // 删除一颗棋子,不删除MS的记录
    Board.prototype.cleNb = function(idx, showNum, timeout = 0) {
        if (idx < 0 || idx > 225) return;
        let points = [];
        if (idx == 225 || this.P[idx].type == TYPE_NUMBER) {
            this.cletLbMoves();
            let i = this.MSindex;
            if (i < 0) return;
            this.clePoint(this.MS[i]);
            this.MSindex--;
            this.showLastNb(showNum);
            points[0] = this.MS[i];
        }
        else if (this.P[idx].type == TYPE_BLACK || this.P[idx].type == TYPE_WHITE) {
            this.cletLbMoves();
            this.clePoint(idx);
            points[0] = idx;
        }
        this.delay(function() {
            this.stonechange();
            this.onMove(idx);
        }.bind(this), timeout);
        return points;
    }


    Board.prototype.cletLbMoves = function() {
        for (let i = 0; i < 15 * 15; i++)(this.P[i].type == TYPE_MOVE) && this.cleLb(i);
    }


    Board.prototype.center = function() {
        if (this.scale <= 1) return;
        let x = this.canvas.width * (this.scale - 1) / 2,
            y = this.canvas.height * (this.scale - 1) / 2;
        this.viewBox.scrollLeft = x;
        this.viewBox.scrollTop = y;
    }


    Board.prototype.cleSearchPoint = function(num) {
        if (num >= 0 && num < this.searchPoints.length) {
            this.printSearchPoint(num);
        }
        else
            for (let i = this.searchPoints.length - 1; i >= 0; i--) {
                this.printSearchPoint(i);
            }
    }


    //棋盘上清空一个棋子,标记的显示
    Board.prototype.clePoint = function(idx, refresh, width, height) {
        if (!refresh) this.P[idx].cle(); // 清除点的数据
        // 棋盘上打印空点
        let p = { x: this.P[idx].x, y: this.P[idx].y },
            ctx = this.canvas.getContext("2d"),
            x,
            y;

        width = width || this.gW + 1;
        height = height || this.gH + 1;
        x = p.x - (width / 2);
        y = p.y - (height / 2);
        if (x < 0) {
            width += x;
            x = 0;
        }
        if (y < 0) {
            height += y;
            y = 0;
        }
        if (x + width > this.bakCanvas.width) {
            width = this.bakCanvas.width - x;
        }
        if (y + height > this.bakCanvas.height) {
            height = this.bakCanvas.height - y;
        }
        (0 <= idx && idx <= 224) && ctx.drawImage(this.bakCanvas, x, y, width, height, x, y, width, height);
        ctx = null;
        if ("appData" in window && appData.renjuSave && !refresh) appData.renjuSave(this);
    }


    Board.prototype.clePointB = function(idx, width, height) {
        this.clePoint(idx, true, width, height);
    }
    
    Board.prototype.checkerCode = checkerCode;

    //裁剪指定canvas一块区域的图像，返回包含新图像的canvas;
    Board.prototype.cutToCanvas = function(originCanvas, x, y, width, height) {
        let c = this.cutCanvas,
            ctx = c.getContext("2d");
        c.width = width;
        c.height = height;
        ctx.drawImage(originCanvas, x, y, width, height, 0, 0, width, height);
        ctx = null;
        return c;
    }


    Board.prototype.getViewBoxRect = function(scale = 1) {
        return {
            x: ~~(this.viewBox.scrollLeft / this.scale * scale),
            y: ~~(this.viewBox.scrollTop / this.scale * scale),
            width: ~~(this.width / this.scale * scale),
            height: ~~(this.height / this.scale * scale)
        }
    }


    Board.prototype.cutViewBox = function() {
        let rect = this.getViewBoxRect();
        return this.cutToCanvas(this.canvas, rect.x, rect.y, rect.width, rect.height)
    }


    Board.prototype.free_TYPE_NUMBER = function(idx) {
        if (this.P[idx] && this.P[idx].type == TYPE_NUMBER) {
            this.P[idx].type = this.P[idx].color == this.bNumColor ? TYPE_BLACK : TYPE_WHITE;
            this.P[idx].text = "";
        }
    }


    //判断用户点击了棋盘上面的哪一个点，在返回这个点的index
    Board.prototype.getIndex = function(x, y) {
        let i;
        let j;
        if (this.isOut(x, y, this.viewBox)) return -1;
        let p = { x: x, y: y };
        // page 坐标 转 canvas 坐标
        this.xyPageToObj(p, this.viewBox);
        p.x = (this.viewBox.scrollLeft + p.x) / this.scale;
        p.y = (this.viewBox.scrollTop + p.y) / this.scale;
        x = p.x + ~~(this.gW / 2);
        y = p.y + ~~(this.gH / 2);
        i = ~~((x - this.XL) / this.gW);
        if (i == this.SLTX) i--;
        j = ~~((y - this.YT) / this.gH);
        if (j == this.SLTY) j--;
        return ~~(15 * j + i);
    }


    Board.prototype.getCode = function() {
        let code = this.getCodeType(TYPE_NUMBER);
        code += "\n{" + this.getCodeType(TYPE_BLACK) + "}";
        code += "{" + this.getCodeType(TYPE_WHITE) + "}";
        return code;
    }


    Board.prototype.getCodeURL = function() {
        let codeURL = this.getCodeType(TYPE_NUMBER);
        codeURL += "&" + this.getCodeType(TYPE_BLACK);
        codeURL += "&" + this.getCodeType(TYPE_WHITE);
        codeURL += "&" + this.size;
        codeURL += "&" + this.resetNum;
        return codeURL;
    }


    Board.prototype.parserCodeURL = function(codeURL) {
    	try {
    	codeURL = replaceAll(codeURL,"%","&"); //兼容旧版本
        let code = codeURL.split("&"),
            moves = checkerCode(code[0]),
            blackMoves = checkerCode(code[1]),
            whiteMoves = checkerCode(code[2]),
            cBoardSize = parseInt(code[3]) < 6 ? 6 : parseInt(code[3]) > 15 ? 15 : parseInt(code[3]),
            resetNum = parseInt(code[4]);
        return {
            moves: moves,
            blackMoves: blackMoves,
            whiteMoves: whiteMoves,
            cBoardSize: cBoardSize,
            resetNum: resetNum
        }
    	}catch { return null }
    }
    
    Board.prototype.putStone = async function(idx, type = TYPE_NUMBER) {
    	this.stoneDiv.setAttribute("class", "putStone");
    	this.stoneDiv.style.opacity = "1";
    	this.stoneDiv.style.transform = `scale(0.8)`;
    	putStone.call(this, idx, type);
    }
    
    Board.prototype.showStone = function(idx, type = TYPE_NUMBER) {
    	this.stoneDiv.setAttribute("class", "stoneReady");
    	this.stoneDiv.style.opacity = "0.6";
    	this.stoneDiv.style.transform = `scale(0.8)`;
    	putStone.call(this, idx, type) && (this.startIdx = idx);
    }
    
    Board.prototype.hideStone = function() {
    	this.startIdx = -1;
    	this.stoneDiv.parentNode && this.stoneDiv.parentNode.removeChild(this.stoneDiv)
    }

    Board.prototype.codeString2CodeArray = function(codeString) {
        let codeArray = [],
            start = 0,
            end = 1,
            len = codeString.length;
        codeString = codeString.toUpperCase();
        while (++end < len) {
            let charCode = codeString.charCodeAt(end);
            if (charCode > 64 && charCode < 91) {
                codeArray.push(codeString.slice(start, end));
                start = end;
            }
        }
        start < len && codeArray.push(codeString.slice(start, end));
        return codeArray;
    }

    // 当前棋盘显示的棋子， 转成棋谱返回
    Board.prototype.getCodeType = function(type) {
        let ml = "";
        if (type == TYPE_WHITE || type == TYPE_BLACK) {
            for (let x = 0; x < this.SLTX; x++) {
                for (let y = 0; y < this.SLTY; y++) {
                    let idx = x + y * 15;
                    if (this.P[idx].type == type) {
                        ml += idxToName(idx);
                    }
                }
            }
        }
        else if (type == TYPE_NUMBER) {
            for (let i = 0; i <= this.MSindex; i++) {
                ml = ml + idxToName(this.MS[i]);
            }
        }
        return ml;
    }


    //把当前棋盘记录写入二维数组
    Board.prototype.getArray2D = function() {
        let arr2D = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
        for (let x = 0; x < 15; x++) {
            for (let y = 0; y < 15; y++) {
                let idx = x + y * 15;
                if (x < 0 || x >= this.size || y < 0 || y >= this.size) {
                    arr2D[y][x] = -1;
                }
                else {
                    switch (this.P[idx].type) {
                        case TYPE_BLACK:
                        case TYPE_WHITE:
                        case TYPE_NUMBER:
                            arr2D[y][x] = this.P[idx].color == this.bNumColor ? 1 : 2;
                            break;
                        default:
                            arr2D[y][x] = 0;
                    }
                }
            }
        }
        return arr2D;
    }


    Board.prototype.getArray = function() {
        let arr = new Array(225 + 1);
        for (let idx = 0; idx < 225; idx++) {
            let x = idx % 15,
                y = ~~(idx / 15);
            if (x < 0 || x >= this.size || y < 0 || y >= this.size) {
                arr[idx] = -1;
            }
            else {
                switch (this.P[idx].type) {
                    case TYPE_BLACK:
                    case TYPE_WHITE:
                    case TYPE_NUMBER:
                        arr[idx] = this.P[idx].color == this.bNumColor ? 1 : 2;
                        break;
                    default:
                        arr[idx] = 0;
                }
            }
        }
        arr[225] = -1;
        return arr;
    }


    Board.prototype.getBoardPointInfo = function(idx, showNum) {
        let txt = "",
            x = this.P[idx].x,
            y = this.P[idx].y,
            w = Math.min(this.gW, this.gH) / 2 * 0.85,
            fontSize = ~~(w * 1.08),
            radius = w,
            pointInfo;

        let type = this.P[idx].type;
        if (type == TYPE_NUMBER || type == TYPE_WHITE || type == TYPE_BLACK) {
            if (showNum && this.P[idx].text) { // 显示数字
                txt = this.P[idx].type == TYPE_NUMBER && parseInt(this.P[idx].text) ? String(parseInt(this.P[idx].text) - this.resetNum) : this.P[idx].text;
                txt = parseInt(txt) < 1 ? "" : txt;
            }
            pointInfo = {
                circle: {
                    x: x,
                    y: y,
                    radius: radius,
                    color: "black",
                    lineWidth: this.lineStyle == "heavy" ? w / 9 : this.lineStyle == "bold" ? w / 15 : 1,
                    fill: this.P[idx].color
                },
                text: {
                    txt: txt,
                    x: x,
                    y: y,
                    color: this.P[idx].color == this.wNumColor ? this.wNumFontColor : this.bNumFontColor,
                    weight: "900",
                    family: "mHeiTi, Roboto, emjFont, Symbola",
                    size: fontSize
                }
            }
        }
        else {
            txt = this.P[idx].text || "";
            radius = this.P[idx].type == TYPE_MARKFOUL ? w : txt.length > 1 ? w * 0.8 : w / 1.7;
            if (txt.length == 1) { // 两位数数数字不需要放大字体
                let code = txt.charCodeAt(); // 再把一位数字排除
                if (code < "0".charCodeAt() || code > "9".charCodeAt()) {
                    switch (txt) {
                        case EMOJI_TRIANGLE_BLACK:
                        case EMOJI_SQUARE_BLACK:
                        case EMOJI_STAR:
                        case EMOJI_ROUND_DOUBLE:
                        case EMOJI_FORK:
                            fontSize = ~~(w * 1.1);
                            break;
                        default: // 把数字和特殊标记排除，其它一位字符统一放大字体
                            fontSize = ~~(w * 1.5);
                            break;
                    }
                }
            }
            else if (txt.length >= 3) {
            	const strLen = [...txt.split(".").join("")].reduce((a,c,i,arr) => {
            		return a + (arr[i].charCodeAt(0) < 256 ? 1 : 1.39)
            	},0)
                fontSize = ~~(w * 3.3 / strLen);
                radius = strLen > 3 ? w * 1.18 : radius;
            }
            pointInfo = {
                circle: {
                    x: x,
                    y: y,
                    radius: radius,
                    color: this.P[idx].bkColor || this.LbBackgroundColor,
                    lineWidth: 0,
                    fill: this.P[idx].bkColor || this.LbBackgroundColor
                },
                text: {
                    txt: txt,
                    x: x,
                    y: y,
                    color: this.P[idx].color,
                    weight: "900",
                    family: "mHeiTi, Roboto, emjFont, Symbola",
                    size: fontSize
                }
            }
        }

        if (idx == this.MS[this.MSindex] && !this.hideLastMove) {
            pointInfo.text.color = this.P[idx].color == this.wNumColor ? this.wLastNumColor : this.bLastNumColor;
            if (!showNum) {
                let w = Math.min(this.gW, this.gH) / 2 * 0.85;
                pointInfo.text.txt = "◤";
                pointInfo.text.x -= w * 0.15;
                pointInfo.text.y -= w * 0.15;
            }
        }
        return pointInfo;
    }

    Board.prototype.getBoardLinesInfo = function() {
        let boardLines = [],
            normalLineWidth = this.lineStyle == "heavy" ? Math.min(this.gW, this.gH) / 18 : this.lineStyle == "bold" ? Math.min(this.gW, this.gH) / 23 : this.width / 500,
            boldLineWidth = normalLineWidth * 2;
        if (this.coordinateType <= 5) {
            for (let i = 0; i < this.SLTX; i++) {
                let lineWidth = i == 0 || i == (this.SLTX - 1) ? boldLineWidth : normalLineWidth,
                    x1 = this.P[i].x,
                    y1 = this.P[i].y,
                    x2 = this.P[i + (this.SLTY - 1) * 15].x,
                    y2 = this.P[i + (this.SLTY - 1) * 15].y;
                boardLines.push({ x1: x1, y1: y1, x2: x2, y2: y2, color: this.lineColor, lineWidth: lineWidth })
            }
            // 划横线
            for (let j = 0; j < this.SLTY * 15; j += 15) {
                let lineWidth = j == 0 || j == (this.SLTY - 1) * 15 ? boldLineWidth : normalLineWidth,
                    x1 = this.P[j].x,
                    y1 = this.P[j].y,
                    x2 = this.P[j + (this.SLTX - 1)].x,
                    y2 = this.P[j + (this.SLTX - 1)].y;
                boardLines.push({ x1: x1, y1: y1, x2: x2, y2: y2, color: this.lineColor, lineWidth: lineWidth })
            }
        }
        else {
            boldLineWidth = boldLineWidth * 2;
            for (let i = 0; i < this.SLTX; i++) {
                let lineWidth = i == 0 ? boldLineWidth : normalLineWidth,
                    x1 = this.P[i].x - this.gW / 2,
                    y1 = this.P[i].y - this.gH / 2,
                    x2 = this.P[i + (this.SLTY - 1) * 15].x - this.gW / 2,
                    y2 = this.P[i + (this.SLTY - 1) * 15].y + this.gH / 2;
                boardLines.push({ x1: x1, y1: y1, x2: x2, y2: y2, color: this.lineColor, lineWidth: lineWidth })
            }
            let lineWidth = boldLineWidth,
                x1 = this.P[this.SLTX - 1].x + this.gW / 2,
                y1 = this.P[this.SLTX - 1].y - this.gH / 2,
                x2 = this.P[this.SLTX - 1 + (this.SLTY - 1) * 15].x + this.gW / 2,
                y2 = this.P[this.SLTX - 1 + (this.SLTY - 1) * 15].y + this.gH / 2;
            boardLines.push({ x1: x1, y1: y1, x2: x2, y2: y2, color: this.lineColor, lineWidth: lineWidth })
            // 划横线
            for (let j = 0; j < this.SLTY * 15; j += 15) {
                let lineWidth = j == 0 ? boldLineWidth : normalLineWidth,
                    x1 = this.P[j].x - this.gW / 2,
                    y1 = this.P[j].y - this.gH / 2,
                    x2 = this.P[j + (this.SLTX - 1)].x + this.gW / 2,
                    y2 = this.P[j + (this.SLTX - 1)].y - this.gH / 2;
                boardLines.push({ x1: x1, y1: y1, x2: x2, y2: y2, color: this.lineColor, lineWidth: lineWidth })
            }
                lineWidth = boldLineWidth;
                x1 = this.P[(this.SLTY -1) * 15].x - this.gW / 2;
                y1 = this.P[(this.SLTY -1) * 15].y + this.gH / 2;
                x2 = this.P[(this.SLTY -1) * 15 + (this.SLTX - 1)].x + this.gW / 2;
                y2 = this.P[(this.SLTY -1) * 15 + (this.SLTX - 1)].y + this.gH / 2;
            boardLines.push({ x1: x1, y1: y1, x2: x2, y2: y2, color: this.lineColor, lineWidth: lineWidth })
        }
        return boardLines;
    }

    Board.prototype.getStarPointsInfo = function() {
        let points = ALL_STAR_POINTS[this.size],
            radius = this.getBoardLinesInfo()[1].lineWidth * 3,
            circles = [];
        for (let i = points.length - 1; i >= 0; i--) {
            circles.push({
                x: this.P[points[i]].x,
                y: this.P[points[i]].y,
                radius,
                color: this.lineColor,
                lineWidth: 0,
                fill: this.lineColor
            });
        }
        return circles;
    }
    
    Board.prototype.getNumberCoordinate = function() {
        let x = 0,
            y = 0,
            w = this.size;
        let arr = [];
        const turn = this.coordinateType - COORDINATE_LEFT_DOWN;
        
        turn == 1 ? x-- : y--;
        while (w > 0) {
            for (let i = 0; i < w; i++) {
                turn == 1 ? x++ : y++;
                arr.splice(0,0,y * 15 + x);
            }
            w--;
            if (w == 0) break;
            for (let i = 0; i < w; i++) {
                turn == 1 ? y++ : x++;
                arr.splice(0,0,y * 15 + x);
            }
            for (let i = 0; i < w; i++) {
                turn == 1 ? x-- : y--;
                arr.splice(0,0,y * 15 + x);
            }
            w--;
            if (w == 0) break;
            for (let i = 0; i < w; i++) {
                turn == 1 ? y-- : x--;
                arr.splice(0,0,y * 15 + x);
            }
        }
        
        return arr;
    }

    Board.prototype.getCoordinateInfo = function() {
        let textArr = [],
            m;
        for (let i = 0; i < this.SLTX; i++) {
            for (let j = 0; j <= 15 * (this.SLTY - 1); j += 15 * (this.SLTY - 1)) {
                m = j == 0 ? -this.gH : this.gH;
                textArr.push({
                    txt: alpha.charAt(i),
                    x: this.P[i + j].x,
                    y: this.P[i + j].y + m,
                    color: this.coordinateColor,
                    weight: "bold",
                    family: "mHeiTi, Roboto, emjFont, Symbola",
                    size: ~~(this.gW * 0.5)
                })
            }
        }
        for (let i = 0; i < this.SLTY; i++) {
            for (let j = 0; j <= this.SLTX - 1; j += this.SLTX - 1) {
                m = j == 0 ? -this.gW : this.gW;
                textArr.push({
                    txt: String(this.SLTY - i),
                    x: this.P[i * 15 + j].x + m,
                    y: this.P[i * 15 + j].y,
                    color: this.coordinateColor,
                    weight: "bold",
                    family: "mHeiTi, Roboto, emjFont, Symbola",
                    size: ~~(this.gW * 0.5)
                })
            }
        }
        return textArr;
    }


    Board.prototype.printLine = function({ x1, y1, x2, y2, color, lineWidth }, ctx) {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }


    Board.prototype.printCircle = function({ x, y, radius, color, lineWidth, fill }, ctx) {
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.strokeStyle = color;
        lineWidth && ctx.stroke();
    }


    Board.prototype.printText = function({ txt, x, y, color, weight, family, size }, ctx) {
        ctx.font = `${weight} ${size}px ${family}`;
        ctx.fillStyle = color;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(txt, x, y);
    }
    
    Board.prototype.hide = function() {
    	this.parentNode.removeChild(this.viewBox);
    }

    // 顺序棋盘上棋子，隐藏手数
    Board.prototype.hideNum = function() {
        let color,
            points = [];
        for (let i = 0; i <= this.MSindex; i++) {
            color = (i & 1) ? this.wNumColor : this.bNumColor;
            this.printPoint(this.MS[i]);
            points.push(this.MS[i]);
        }
        return points;
    }

    //  判断坐标是否出界，出界返回 true
    Board.prototype.isOut = function(x, y, htmlObj, width) {
        width = width ? width : 0;
        let xL = 0 - width;
        let xR = xL + parseInt(htmlObj.style.width) + 2 * width;
        let yT = 0 - width;
        let yB = yT + parseInt(htmlObj.style.height) + 2 * width;
        let p = { x: x, y: y };
        this.xyPageToObj(p, htmlObj);
        x = p.x;
        y = p.y;
        if (x < xL || x > xR || y < yT || y > yB) { // out cBoard
            return true;
        }
        return false;
    }
    
    Board.prototype.loadTheme = function(theme = {}) {
    	const wNumColor = this.wNumColor;
    	const bNumColor = this.bNumColor;
    	this.theme = theme;
    	Object.assign(this, theme);
    	// 还需要刷新棋子颜色
    	this.P.map(p => {
    		if ([TYPE_BLACK, TYPE_WHITE, TYPE_NUMBER].indexOf(p.type) + 1) {
    			p.color = p.color == wNumColor ? this.wNumColor : p.color == bNumColor ? this.bNumColor : p.color;
    		}
    	})
    	this.mode == MODE_BOARD && this.printEmptyCBoard();
    	this.refreshBoardPoint("all");
    }


    Board.prototype.nextColor = function() {
        return this.MSindex & 1 ? 1 : 2;
    }


    Board.prototype.printEmptyCBoard = function() {
    	let canvas = this.bakCanvas; // 准备在后台画棋盘
        // 画图之前，设置画布大小
        canvas.width = this.width;
        canvas.height = this.height;
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.viewBox.style.backgroundColor = document.body.style.backgroundColor;
        
        let boardLinesInfo = this.getBoardLinesInfo();
        boardLinesInfo.map(lineInfo => this.printLine(lineInfo, ctx))

        let starPointsInfo = this.getStarPointsInfo();
        starPointsInfo.map(starPointInfo => this.printCircle(starPointInfo, ctx))

        if (this.coordinateType < 6) {
            let coordinateTypeInfo = this.getCoordinateInfo();
            coordinateTypeInfo.map(textInfo => this.printText(textInfo, ctx))
        }
        else {
            let numCoordinate = this.getNumberCoordinate();
            numCoordinate.map((idx,i) => {
                const num = `${i+1}`;
                let circle = {
                    x: this.P[idx].x,
                    y: this.P[idx].y,
                    radius: Math.min(this.gW, this.gH) / 2 * 0.8,
                    color: this.LbBackgroundColor,
                    lineWidth: 0,
                    fill: this.LbBackgroundColor
                },
                text = {
                    txt: num,
                    x: this.P[idx].x,
                    y: this.P[idx].y,
                    color: this.coordinateColor,
                    weight: "bold",
                    family: "mHeiTi, Roboto, emjFont, Symbola",
                    size: ~~(this.gW * (0.7 - 0.08 * num.length) * 0.9)
                };
                this.printCircle(circle, ctx);
                this.printText(text, ctx);
            })
        }

        let canvas2 = this.canvas;
        ctx = canvas2.getContext("2d");
        canvas2.width = canvas.width;
        canvas2.height = canvas.height;
        ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height);
        ctx = null;
        
        this.mode = MODE_BOARD;
    }


    // 画空棋盘
    Board.prototype.resetCBoardCoordinate = function() {
        this.SLTX = this.size;
        this.SLTY = this.SLTX;
        let padding = (this.coordinateType == 0 || this.coordinateType > 5) ? ~~(this.width / this.SLTX / 2) :
            this.coordinateType == 1 ? ~~(this.width / (this.SLTX + 2) * 1.5) :
            ~~(this.width / (this.SLTX + 1) * 1.5);

        switch (this.coordinateType) {
            case COORDINATE_ALL:
            case COORDINATE_NUM_CW:
            case COORDINATE_NUM_CCW:
            case COORDINATE_NONE:
                this.XL = padding;
                this.XR = this.width - padding;
                this.YT = padding;
                this.YB = this.height - padding;
                break;
            case COORDINATE_LEFT_UP:
                this.XL = padding;
                this.XR = this.width - ~~(padding / 3);
                this.YT = padding;
                this.YB = this.height - ~~(padding / 3);
                break;
            case COORDINATE_RIGHT_UP:
                this.XL = ~~(padding / 3);
                this.XR = this.width - padding;
                this.YT = padding;
                this.YB = this.height - ~~(padding / 3);
                break;
            case COORDINATE_RIGHT_DOWN:
                this.XL = ~~(padding / 3);
                this.XR = this.width - padding;
                this.YT = ~~(padding / 3);
                this.YB = this.height - padding;
                break;
            case COORDINATE_LEFT_DOWN:
                this.XL = padding;
                this.XR = this.width - ~~(padding / 3);
                this.YT = ~~(padding / 3);
                this.YB = this.height - padding;
                break;
        }

        this.resetP(this.XL, this.XR, this.YT, this.YB);
    }



    // 在棋盘上面打印一个VCF手顺   
    Board.prototype.printMoves = function(moves, firstColor) {
        let nowTime = new Date().getTime();
        let idx = 0;
        if (nowTime - this.printMovesTime < 100) return;
        this.printMovesTime = nowTime;
        this.cleLb("all");
        for (let i = 0; i < moves.length; i++) {
            let color;
            let fontColor;
            if (i == moves.length - 1) {
                fontColor = this.moveLastFontColor;
                if (firstColor == 1) {
                    color = i & 1 ? this.moveWhiteColor : this.moveBlackColor;
                }
                else {
                    color = i & 1 ? this.moveBlackColor : this.moveWhiteColor;
                }
            }
            else if (firstColor == 1) {
                color = i & 1 ? this.moveWhiteColor : this.moveBlackColor;
                fontColor = i & 1 ? this.moveWhiteFontColor : this.moveBlackFontColor;
            }
            else {
                color = i & 1 ? this.moveBlackColor : this.moveWhiteColor;
                fontColor = i & 1 ? this.moveBlackFontColor : this.moveWhiteFontColor;
            }

            this.wLb(moves[i], i + 1, fontColor, color, false);
        }
    }
    
    Board.prototype.printSide = function(side) {
    	const idx = (this.size - 1) * 15;
    	const w = Math.min(this.gW, this.gH) / 2 * 0.85;
    	const pointInfo = {
    		circle: {
    			x: this.P[idx].x - this.gW,
    			y: this.P[idx].y + this.gH,
    			radius: w,
    			color: "black",
    			lineWidth: this.lineStyle == "heavy" ? w / 9 : this.lineStyle == "bold" ? w / 15 : 1,
    			fill: side == 1 ? this.bNumColor : this.wNumColor
    		}
    	};
    	let ctx = this.canvas.getContext("2d");
        this.printCircle(pointInfo.circle, ctx);
    	ctx = null;
    }

    Board.prototype.printNb = function(idx, showNum) {
        let ctx = this.canvas.getContext("2d"),
            pointInfo = this.getBoardPointInfo(idx, showNum);
        this.printCircle(pointInfo.circle, ctx);
        this.printText(pointInfo.text, ctx);
        ctx = null;
    }


    Board.prototype.printLb = function(idx) {
        this.printNb(idx);
    }


    Board.prototype._printPoint = function(idx, showNum) {
        if (idx < 0 || idx > 224 || this.P[idx].type == TYPE_EMPTY) return;
        let type = this.P[idx].type;
        if (type == TYPE_NUMBER || type == TYPE_WHITE || type == TYPE_BLACK) {
            this.printNb(idx, showNum);
        }
        else { //  打印标签
            this.printLb(idx);
        }
    }


    // 在棋盘上打印一个点
    Board.prototype.printPoint = function(idx, showNum) {
        if (idx < 0 || idx > 224 || this.P[idx].type == TYPE_EMPTY) return;
        let type = this.P[idx].type;
        this._printPoint(idx, showNum);
        //log(`text=${text}, hideLastMove=${hideLastMove}`)
        if (type == TYPE_NUMBER && idx == this.MS[this.MSindex] && !this.hideLastMove) {
            this.showLastNb(showNum);
        }
        if ("appData" in window && appData.renjuSave) appData.renjuSave(this);
    }


    // 在棋盘上打印当前正在计算的点
    Board.prototype.printSearchPoint = function(num, idx, color) {
        let size;
        let temp;
        num = num ? parseInt(num) : 0;
        //清除旧标记
        if (this.searchIdx[num] > -1 && this.searchIdx[num] != idx) {
            this.searchPoints[num].setAttribute("class", "");
            if (this.searchPoints[num] && this.searchPoints[num].parentNode) this.searchPoints[num].parentNode.removeChild(this.searchPoints[num])
        }
        //写入新标记
        if (idx > -1) {
            this.searchIdx[num] = idx;
            temp = 1.3 * ((this.gW < this.gH) ? this.gW : this.gH);
            size = ~~(temp / 9);
            this.searchPoints[num].innerHTML = "";
            this.searchPoints[num].style.fontSize = size + "px";
            this.searchPoints[num].style.color = color;
            this.searchPoints[num].style.position = "absolute";
            this.searchPoints[num].style.backgroundColor = this.backgroundColor;
            this.searchPoints[num].style.width = size + "px";
            this.searchPoints[num].style.height = size + "px";
            this.searchPoints[num].style.lineHeight = size + "px";
            this.searchPoints[num].style.textAlign = "center";
            this.searchPoints[num].style.padding = "";
            this.searchPoints[num].style.margin = "";
            this.searchPoints[num].style.borderStyle = "solid";
            this.searchPoints[num].style.borderWidth = size + "px";
            this.searchPoints[num].style.borderColor = "green";
            this.searchPoints[num].style.left = this.P[idx].x - ~~(temp / 6) + this.canvas.offsetLeft + "px";
            this.searchPoints[num].style.top = this.P[idx].y - ~~(temp / 6) + this.canvas.offsetTop + "px";
            this.scaleBox.appendChild(this.searchPoints[num]);
            this.searchPoints[num].setAttribute("class", "startPoint");
            this.cleLb(idx);
        }
    }


    Board.prototype.refreshBoardPoint = function(idx) {
        let ctx = this.canvas.getContext("2d"),
            st = 0,
            end = 225;
        typeof idx == "number" && 0 <= idx && idx <= 224 && (st = idx, end = idx + 1)
        for (let i = st; i < end; i++) {
            if (this.P[i].type != TYPE_EMPTY) {
                let pointInfo = this.getBoardPointInfo(i, this.isShowNum);
                this.printCircle(pointInfo.circle, ctx);
                this.printText(pointInfo.text, ctx);
            }
        }
        ctx = null;
    }


    Board.prototype.refreshCheckerBoard = function() {
    	this.printEmptyCBoard();
        this.refreshBoardPoint("all");
        this.stonechange();
    }


    // 后台设置棋盘所有点的坐标。不会改变棋盘的显示
    Board.prototype.resetP = function(xL, xR, yT, yB) {
        let i, j, l, x, y;
        if (typeof xL == "object" && xL.style) {
            let obj = xL;
            xL = parseInt(obj.style.left);
            xR = xL + parseInt(obj.style.width);
            yT = parseInt(obj.style.top);
            yB = yT + parseInt(obj.style.height);

        }
        if (xL == null || xR == null || yT == null || yB == null) {
            xL = this.XL;
            xR = this.XR;
            yT = this.YT;
            yB = this.YB;
        }
        this.gW = (xR - xL) / (this.SLTX - 1);
        this.gH = (yB - yT) / (this.SLTY - 1);

        for (j = 0; j < 15; j++) {
            y = (this.gH * j) + yT;
            for (i = 0; i < 15; i++) {
                x = (this.gW * i) + xL;
                l = j * 15 + i;
                //if (i >= this.size || j >= this.size) x = y = 0;
                this.P[l].setxy(x, y);
            }
        }
    }
    
    Board.prototype.show = function() {
    	this.parentNode.appendChild(this.viewBox);
    }

    Board.prototype.showCheckerBoard = async function() {
        if (this.mode != MODE_BOARD) return;
        this.resetCBoardCoordinate();
        this.printEmptyCBoard();
        await loadFonts(this);
    }

    Board.prototype.setCoordinate = function(coordinateType) {
        if (coordinateType < 0 || coordinateType > 7) return;
        this.coordinateType = coordinateType;
        this.resetCBoardCoordinate();
        this.refreshCheckerBoard();
        this.boardchange(this);
    }


    // 设置从第几手开始显示序号， 默认==0 时第一手开始显示，==1 时第二手显示❶
    Board.prototype.setResetNum = function(num) {
        this.resetNum = parseInt(num);
        this.showNum();
    }


    Board.prototype.setSize = function(size = 15) {
        size = parseInt(size);
        size = size < 6 ? 6 : size > 15 ? 15 : size;
        if (this.size == size) return;
        this.size = size;
        this.resetCBoardCoordinate();
        this.refreshCheckerBoard();
        this.sizechange(this);
    }


    Board.prototype.setLineStyle = function(_style) {
        const WEIGHT = ["normal", "bold", "heavy"];
        WEIGHT.indexOf(_style) && (this.lineStyle = _style);
        this.refreshCheckerBoard();
    }


    Board.prototype.zoomStart = function(x1, y1, x2, y2) {
        animationZoomBoard.call(this, x1, y1, x2, y2);
    }

    Board.prototype.zoom = function(scale) {
        scale = Math.min(Math.max(MIN_ZOOM, scale), MAX_ZOOM);
        this.setViewBoxBorder(scale > 1);
        scaleBoard.call(this, scale);
        //this.scaleBox.style.transformOrigin = `0px 0px`;
        //this.scaleBox.style.transform = `scale(${scale})`;
        this.scale = scale;
    }


    Board.prototype.setScale = function(scale, timeout = 0) {
        //log(`scale=${scale}`,"info")
        scale = Math.min(Math.max(MIN_SCALE, scale), MAX_SCALE);
        if (timeout == 0) {
            this.setViewBoxBorder(scale > 1);
            scaleBoard.call(this, scale);
            //this.scaleBox.style.transformOrigin = `0px 0px`;
            //this.scaleBox.style.transform = `scale(${scale})`;
            this.scale = scale;
            this.center();
        }
        else {
            animationScaleBoard.call(this, scale);
            this.scale = scale;
        }
        this.viewchange();
    }


    Board.prototype.setViewBoxBorder = function(value) {
        const bw = ~~(this.width / 100);
        if (value) {
            this.viewBox.style.border = `${bw}px solid ${this.borderColor}`;
            this.viewBox.style.left = `${this.left - bw}px`;
            this.viewBox.style.top = `${this.top - bw}px`;
            this.viewBox.style.backgroundColor = "black";
        }
        else {
            this.viewBox.style.border = ``;
            this.viewBox.style.left = `${this.left}px`;
            this.viewBox.style.top = `${this.top}px`;
            this.viewBox.style.backgroundColor = document.body.style.backgroundColor;
        }
    }


    // 根据用户设置 决定是否高亮显示 最后一手棋
    Board.prototype.showLastNb = function(showNum) {
        let idx,
            points = [];
        if (this.MSindex >= 0) { // 存在倒数第1手，特殊标记
            idx = this.MS[this.MSindex];
        }
        else { // 不存在倒数第1手，退出
            return points;
        }
        this.printNb(idx, showNum);
        points.push(idx);
        let preIndex = this.MSindex;
        while (--preIndex >= 0) { // 存在倒数第二手，恢复正常标记
            idx = this.MS[preIndex];
            if (idx != 225) {
                this.printNb(idx, showNum);
                points.push(idx);
                return points;
            }
        }
        return points;
    }


    // 刷新棋盘上棋子显示手数
    Board.prototype.showNum = function() {
        let color,
            points = [];
        for (let i = 0; i <= this.MSindex; i++) {
            color = (i & 1) ? this.wNumColor : this.bNumColor;
            this.printPoint(this.MS[i], true);
            points.push(this.MS[i]);
        }
        return points;
    }


    // 跳到第 0 手。
    Board.prototype.toStart = function(isShowNum = this.isShowNum) {
        let index = this.MSindex;
        while (this.MSindex > -1 && index-- > -2) {
            this.toPrevious(isShowNum, 100);
        }
        index < -1 && console.error(`CheckerBoard.js toStart infinite loop`)
    }

    //跳到最后一手
    Board.prototype.toEnd = function(isShowNum = this.isShowNum) {
        let index = this.MSindex;
        while (this.MSindex < this.MS.length - 1 && index++ < this.MS.length) {
            this.toNext(isShowNum, 100);
        }
        index >= this.MS.length && console.error(`CheckerBoard.js toEnd infinite loop`)
    }

    // 返回上一手
    Board.prototype.toPrevious = function(isShowNum = this.isShowNum, timeout = 0) {
        if (this.MSindex >= 0) {
            this.cleNb(this.MS[this.MSindex], isShowNum, timeout);
        }
    }

    // 跳到下一手
    Board.prototype.toNext = function(isShowNum = this.isShowNum, timeout = 0) {
        if (this.MS.length - 1 > this.MSindex) {
            this.wNb(this.MS[this.MSindex + 1], "auto", isShowNum, undefined, undefined, timeout);
        }
    }


    Board.prototype.unpackCode = function(codeStr, targetType, showNum = this.isShowNum, resetNum = 0, firstColor = "black") {
        let st = 0;
        let end = codeStr.indexOf("{");
        end = end == -1 ? codeStr.length : end;
        let moves;
        let blackMoves;
        let whiteMoves;
        moves = checkerCode(codeStr.slice(st, end));
        st = end + 1;
        end = codeStr.indexOf("}{", st);
        end = end == -1 ? codeStr.length : end;
        blackMoves = checkerCode(codeStr.slice(st, end));
        st = end + 2;
        end = codeStr.length;
        whiteMoves = checkerCode(codeStr.slice(st, end));
        if (moves || blackMoves || whiteMoves) {
            this.cle();
            this.resetNum = resetNum;
            this.firstColor = firstColor;
            if (moves) this.unpackCodeType(moves, TYPE_NUMBER, targetType, showNum);
            if (blackMoves) this.unpackCodeType(blackMoves, TYPE_BLACK, targetType, showNum);
            if (whiteMoves) this.unpackCodeType(whiteMoves, TYPE_WHITE, targetType, showNum);
        }
    }
    
    Board.prototype.moveCode2Points = function(moveCode = "") {
    	let points = [];
    	let m = moveCode;
    	while (m.length) {
    		let a = m.substring(0, 2); //取前两个字符
    		m = m.substring(2); //去掉前两个字符
    		//每个棋子落点横坐标用A-O表示，纵坐标用1-15来表
    		//判断棋子纵坐标是否是2位，是则继续截取，补足3位。
    		let d = m.charCodeAt() - "0".charCodeAt();
    		if (d >= 0 && d <= 9) {
    			a += m.substring(0, 1);
    			m = m.substring(1);
    		}
    		points.push(nameToIdx(a));
    	}
    	return points;
    }
    
    Board.prototype.points2MoveCode = function(moves) {
    	return moves.map(idx => idxToName(idx)).join("");
    }

    //解析（已经通过this.getCodeType 格式化）棋谱,摆棋盘
    Board.prototype.unpackCodeType = function(moves = "", sourceType = TYPE_NUMBER, targetType = sourceType, showNum = this.isShowNum) {
        if (sourceType == TYPE_NUMBER) {
            this.MS.length = 0; //清空数组
            this.MSindex = -1;
        }
        const points = this.moveCode2Points(moves);
        points.map(idx => {
        	// 棋谱坐标转成 index 后添加棋子
            if (sourceType == TYPE_NUMBER) {
                log(`unpackCodeType sourceType == TYPE_NUMBER`);
                this.wNb(idx, "auto", showNum, undefined, undefined, 100);
            }
            else if (sourceType == TYPE_BLACK) {
                log(`unpackCodeType sourceType == TYPE_BLACK`);
                switch (targetType) {
                    case TYPE_NUMBER:
                        if (0 == (this.MSindex & 1)) this.wNb(225, "auto", showNum, undefined, undefined, 100);
                        this.wNb(idx, "auto", showNum, undefined, undefined, 100);
                        break;
                    default:
                        this.wNb(idx, "black", showNum, undefined, undefined, 100);
                        break;
                }
            }
            else if (sourceType == TYPE_WHITE) {
                log(`unpackCodeType sourceType == TYPE_WHITE`);
                switch (targetType) {
                    case TYPE_NUMBER:
                        if (1 == (this.MSindex & 1)) this.wNb(225, "auto", showNum, undefined, undefined, 100);
                        this.wNb(idx, "auto", showNum, undefined, undefined, 100);
                        break;
                    default:
                        this.wNb(idx, "white", showNum, undefined, undefined, 100);
                        break;
                }
            }
        })
    }


    // 解析二维数组后，摆棋
    Board.prototype.unpackArray = function(arr2D, isShowNum) {
        if (arr2D.length >= 225) {
            let arr = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
            for (let idx = 0; idx < 225; idx++) {
                let x = idx % 15,
                    y = ~~(idx / 15);
                arr[y][x] = arr2D[idx];
            }
            arr2D = arr;
        }
        let bNarr = [];
        let wNarr = [];
        /*this.MS.length = 0; //清空数组
        this.MSindex = -1;
        this.resetNum = 0;*/
        this.cle()
        for (let y = 0; y < this.SLTY; y++) {
            for (let x = 0; x < this.SLTX; x++) {
                let idx = x + 15 * y;
                switch (String(arr2D[y][x])) {
                    case "0":
                        this.clePoint(idx);
                        break;
                    case "1":
                        bNarr.push(idx);
                        break;
                    case "2":
                        wNarr.push(idx);
                        break;
                }
            }
        }
        if (bNarr.length - wNarr.length == 1 || bNarr.length - wNarr.length == 0) {
            for (let i = 0; i < wNarr.length; i++) {
                bNarr.splice((i + 1) * 2 - 1, 0, wNarr[i]);
            }
            this.resetNum = bNarr.length;
            for (let i = 0; i < bNarr.length; i++) {
                this.wNb(bNarr[i], "auto", isShowNum, TYPE_NUMBER, undefined, 100);
            }
        }
        else {
            for (let i = 0; i < bNarr.length; i++) {
                this.wNb(bNarr[i], "black", isShowNum, TYPE_BLACK, undefined, 100);
            }
            for (let i = 0; i < wNarr.length; i++) {
                this.wNb(wNarr[i], "white", isShowNum, TYPE_WHITE, undefined, 100);
            }
        }
    }


    //  在棋盘的一个点上面，打印一个标记
    Board.prototype.wLb = function(idx, text, color, backgroundColor) {
        if (idx < 0 || idx > 224) return [];
        if (this.P[idx].type != TYPE_EMPTY) {
            if (this.P[idx].type == TYPE_MARK || this.P[idx].type == TYPE_MOVE) {
                this.cleLb(idx);
            }
            else {
                this.cleNb(idx);
            }
        }
        this.P[idx].color = color;
        this.P[idx].bkColor = backgroundColor || null;
        //log(backgroundColor)
        this.P[idx].type = backgroundColor ? TYPE_MOVE : TYPE_MARK;
        this.P[idx].text = String(text);
        this.printPoint(idx);
        return [idx];
    }


    // 在棋盘的一个点上面，摆一颗棋子
    Board.prototype.wNb = function(idx, color, showNum, type, isFoulPoint, timeout = 0) {
        if (idx < 0 || idx > 225) return [];
        if (idx != 225 && this.P[idx].type != TYPE_EMPTY) {
            if (this.P[idx].type == TYPE_MARK || this.P[idx].type == TYPE_MOVE) {
                this.cleLb(idx);
            }
            else {
                this.cleNb(idx);
            }
        }
        let i = this.MSindex + 1;
        let colorName = this.firstColor == "black" ? ["white", "black"] : ["black", "white"],
            c = color == "auto" ? colorName[this.MSindex & 1] : color;
        if (isFoulPoint && c == "black") {
            warn(EMOJI_FOUL_THREE + idxToName(idx) + " 是禁手" + EMOJI_FOUL_THREE, 100)
        }
        this.cletLbMoves();
        if (color == "auto" || type == TYPE_NUMBER) { // 顺序添加棋子
            this.MSindex++;
            // 如果当前添加的点和历史记录不一样，就把后面没用的记录删除
            if (this.MS.length >= i && this.MS[i] != idx) {
                this.MS.length = i;
            }
            this.MS[i] = idx; //顺序添加的棋子 记录下来
        }
        this.P[idx].color = c == "black" ? this.bNumColor : this.wNumColor;
        this.P[idx].type = type == null ? color == "auto" ? TYPE_NUMBER : c == "white" ? TYPE_WHITE : TYPE_BLACK : type;
        this.P[idx].text = this.P[idx].type == TYPE_NUMBER ? String(i + 1) : "";
        this.printPoint(idx, showNum);
        this.delay(function() {
            this.stonechange();
            this.onMove(idx);
        }.bind(this), timeout);
        return [idx];
    }


    // 把 page 坐标 转成 htmlObj 坐标
    Board.prototype.xyPageToObj = function(p, htmlObj) {
        let l = htmlObj.offsetLeft;
        let t = htmlObj.offsetTop;
        let parentNode = htmlObj.parentNode;
        while (parentNode != document.body && parentNode != null) {
            l += parentNode.offsetLeft;
            t += parentNode.offsetTop;
            parentNode = parentNode.parentNode;
        }
        p.x = p.x - l;
        p.y = p.y - t;
    }



    // 把 htmlObj 坐标 转成 page 坐标
    Board.prototype.xyObjToPage = function(p, htmlObj) {
        let l = htmlObj.offsetLeft;
        let t = htmlObj.offsetTop;
        let parentNode = htmlObj.parentNode;
        while (parentNode != document.body && parentNode != null) {
            l += parentNode.offsetLeft;
            t += parentNode.offsetTop;
            parentNode = parentNode.parentNode;
        }
        p.x = p.x + l;
        p.y = p.y + t;
    }

    exports.MODE_BOARD = Board.MODE_BOARD = MODE_BOARD;
    exports.MODE_IMG = Board.MODE_IMG = MODE_IMG;
    
    exports.TYPE_EMPTY = Board.TYPE_EMPTY = TYPE_EMPTY;
    exports.TYPE_MARK = Board.TYPE_MARK = TYPE_MARK; // 标记
    exports.TYPE_NUMBER = Board.TYPE_NUMBER = TYPE_NUMBER; // 顺序添加的棋子
    exports.TYPE_BLACK = Board.TYPE_BLACK = TYPE_BLACK; // 无序号 添加的黑棋
    exports.TYPE_WHITE = Board.TYPE_WHITE = TYPE_WHITE; // 无序号 添加的黑棋
    exports.TYPE_MOVE = Board.TYPE_MOVE = TYPE_MOVE; //VCF手顺
    exports.TYPE_MARKFOUL = Board.TYPE_MARKFOUL = TYPE_MARKFOUL;

    exports.COORDINATE_ALL = Board.COORDINATE_ALL = COORDINATE_ALL;
    exports.COORDINATE_LEFT_UP = Board.COORDINATE_LEFT_UP = COORDINATE_LEFT_UP;
    exports.COORDINATE_RIGHT_UP = Board.COORDINATE_RIGHT_UP = COORDINATE_RIGHT_UP;
    exports.COORDINATE_RIGHT_DOWN = Board.COORDINATE_RIGHT_DOWN = COORDINATE_RIGHT_DOWN;
    exports.COORDINATE_LEFT_DOWN = Board.COORDINATE_LEFT_DOWN = COORDINATE_LEFT_DOWN;
    exports.COORDINATE_NONE = Board.COORDINATE_NONE = COORDINATE_NONE;

    exports.animation = animation;
    exports.CheckerBoard = Board;
})))
