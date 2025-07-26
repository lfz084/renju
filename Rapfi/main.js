(() => {
	try{
    "use strict";
    const d = document;
    const dw = d.documentElement.clientWidth;
    const dh = d.documentElement.clientHeight;
    
    const DBREAD_HELP = `棋谱阅读器使用技巧<br>1.点击棋子悔棋<br>2.双击棋子悔到双击的那一手<br>3.长按棋盘放大、缩小棋盘<br>4.棋谱注解乱码可以选择gbk以外的编码<br>5.棋谱规则和棋盘大小需要设置正确才能正常显示`
	let defaultComment = DBREAD_HELP;
    loadLinks()

    function loadLinks() {
        const url = "Version/databass.json";
        fetch(url + "?cache=netFirst")
            .then(response => response.ok && response.json())
            .then(links => {
                let linkString = "";
                for(let i = 0; i < links.length; i++) {
    	            if (links[i].url) linkString += `<a onclick='window.game.downloadFile("${links[i].url}")'>${links[i].title}</a><br>`;
    	            if (links[i].href) linkString += `<a href="${links[i].href}" target="${links[i].target}">${links[i].title}</a><br>`;
                }
                defaultComment = linkString + DBREAD_HELP;
                $("comment").innerHTML.indexOf("棋谱阅读器使用技巧") + 1 && ($("comment").innerHTML = defaultComment);
            })
            .catch(e => console.error(e))
    }

    function wait(timeout) {
		return new Promise(resolve => setTimeout(resolve, timeout));
	}
    //-----------------------------------------------------------------------

    const buttons = [];
    const buttonSettings = [
        {
        	varName: "btnStart",
            type: "button",
            text: "‖<<",
            touchend: async function() {
                game.toStart(true);
            }
        },
        {
            varName: "btnPrevious",
            type: "button",
            text: "<<",
            touchend: async function() {
                game.toPrevious(true, 100);
            }
        },
        {
            varName: "btnNext",
            type: "button",
            text: ">>",
            touchend: async function() {
                game.toNext(true, 100);
            }
        },
        {
            varName: "btnEnd",
            type: "button",
            text: ">>‖",
            touchend: async function() {
                game.toEnd(true);
            }
        },
        {
            varName: "btnRotateY180",
            type: "button",
            text: "↔180°",
            touchend: async function() {
                game.rotateY180();
            }
        },
        {
            varName: "btnRotate90",
            type: "button",
            text: " ↗90°",
            touchend: async function() {
                game.rotate90();
            }
        },
        {
            type: "file",
            text: "打开文件",
            change: async function() {
                try {
                	await game.openFile(this.files[0]);
                	game.tree = undefined;
					window.setBlockUnload(true)
                } catch (e) { console.error(e.stack) }
                this.value = "";
            }
        },
        {
            type: "button",
            text: "清空标记",
            touchend: async function() {
                game.cleLabel();
                game.tree = undefined;
                btnMark.checked && btnMark.defaultontouchend();
            }
        },
        {
        	varName: "btnAIPlay",
        	type: "button",
        	text: "AI选点",
        	touchend: async function() {
        		game.think();
        	}
        },
        {
            type: "button",
        	text: "隐藏手顺",
        	touchend:  function() {
        	    cBoard.setResetNum(256);
        	}
        },
        {
            varName: "btnRandomPlay",
            type: "button",
            text: "随机出题",
            touchend: async function() {
            	game.randomPlay();
            }
        },
        {
            type: "button",
            text: "下手为❶",
            touchend: async function() {
                game.resetNum(1);
            }
        },
        {
        	varName: "btnPlay",
        	type: "checkbox",
        	text: "对弈模式",
        	touchend:  function() {
        		if(this.checked) {
        			this.MS = cBoard.MS.slice(0);
        			this.MSindex = cBoard.MSindex;
        			btnAIPlay.enabled = false;
        			btnRandomPlay.enabled = false;
        			setTimeout(() => (cBoard.cleLb("all") ,$("comment").innerHTML = "开始对弈..."), 380);
        		}
        		else {
                	game.toStart(true);
        			cBoard.MS = this.MS.slice(0);
        			while(cBoard.MSindex < this.MSindex && cBoard.MSindex < cBoard.MS.length - 1) {
        				cBoard.toNext(true, 100);
        			}
        			cBoard.MSindex < 0 && game.cBoard.stonechange();
        			btnAIPlay.enabled = true;
        			btnRandomPlay.enabled = true;
        		}
        	}
        },
        {
            type: "button",
            text: "重置手数",
            touchend: async function() {
                game.resetNum(0);
            }
        },
        {
            varName:"btnMark",
            type: "checkbox",
            text: "标记局面",
            touchend: async function() {
                try {
            		const path = cBoard.MS.slice(0, cBoard.MSindex+1);
                	const node = this.checked ? (game.tree = game.tree || new RenjuTree(), game.tree.createPath(path)) : (game.tree && game.tree.getPathNode(path));
                	node && (node.score = this.checked ? 1 : 0);
                } catch (e) { console.error(e.stack) }
            }
        },
        {
            type: "select",
            text: "15 路",
            options: [15, "15 路", 14, "14 路", 13, "13 路", 12, "12 路", 11, "11 路", 10, "10 路", 9, "9 路", 8, "8 路", 7, "7 路", 6, "6 路"],
            change: function() {
                game.boardSize = this.input.value;
                game.showBranchNodes();
            }
        },
        {
            varName: "btnEncoding",
            type: "select",
            text: "auto",
            options: [0, "auto", 1, "gbk", 2, "big5", 3, "utf-8"],
            change: function() {
                const encoding = ["auto", "gbk", "big5", "utf-8"];
                textDecoder = ENUM_TEXT_DECODERS[encoding[this.input.value]];
                game.showBranchNodes();
            }
        },
        {
            varName: "btnRule",
            type: "select",
            text: "renju",
            options: [2, "renju", 1, "standard", 0, "freestyle"],
            change: function() {
                game.rule = this.input.value;
                game.showBranchNodes();
            }
        },
        {
            type: "button",
            text: "分享图片",
            touchend: async function() {
                share(cBoard);
            }
        },
        {
            type: "button",
            text: "输出代码",
            touchend: async function() {
                try {
                    game.outputCode();
                } catch (e) { console.error(e.stack) }
            }
        },
        {
            type: "select",
            text: "批量输出",
            options: [0,"批量输出JPG",1,"批量输出SVG",2,"批量输出SGF"],
            change: function() {
                try {
                    const types = ["jpg","svg","sgf"];
                	downloadZIP(types[this.input.value]);
                } catch (e) { console.error(e.stack) }
                
            },
			reset: function() {this.setText(`批量输出`, `批量输出`) }
        },
        {
            type: "select",
            text: "设置坐标",
            options: [0, "棋盘坐标:无坐标",
                1, "棋盘坐标:上下左右",
            	2, "棋盘坐标:上左",
            	3, "棋盘坐标:上右",
            	4, "棋盘坐标:下右",
            	5, "棋盘坐标:下左"],
            change: function() {
                cBoard.setCoordinate(this.input.value * 1);
            },
            onshowmenu: function() {
            	[...this.input].map((op, i) => op.checked = i === cBoard.coordinateType);
            },
			reset: function() {this.setText(`设置坐标`, `设置坐标`) }
        }
    ];

    buttonSettings.splice(0, 0, createLogDiv(), null, null, null);
    buttonSettings.splice(8, 0, createCommentDiv(), null);
    buttonSettings.splice(12, 0, null, null);
    buttonSettings.splice(16, 0, null, null);
    buttonSettings.splice(20, 0, null, null);
    buttonSettings.splice(24, 0, null, null);
    buttonSettings.splice(28, 0, null, null);
    buttonSettings.splice(32, 0, null, null);
    //dw > dh && buttonSettings.splice(0, 0, null, null, null, null);

    function $(id) { return document.getElementById(id) };

    function log(text) { $("log").innerText = text }

    function createLogDiv() {
        return mainUI.newLabel({
            id: "log",
            type: "div",
            width: mainUI.cmdWidth - mainUI.cmdPadding * 2,
            height: mainUI.buttonHeight,
            style: {
                fontSize: `${mainUI.buttonHeight / 1.8}px`,
                textAlign: "center",
                lineHeight: `${mainUI.buttonHeight}px`
            }
        })
    }

    function createCommentDiv() {
        const fontSize = mainUI.cmdWidth / 28;
        return mainUI.newComment({
            id: "comment",
            type: "div",
            width: mainUI.buttonWidth * 2.33,
            height: mainUI.buttonHeight * 9.5,
            style: {
            	position: "absolute",
        		fontSize: `${fontSize}px`,
            	wordBreak: "break-all",
            	overflowY: "auto",
            	borderStyle: "solid",
            	borderWidth: `${fontSize / 20}px`,
            	borderColor: "black",
            	background: "white",
            	padding: `${fontSize/2}px ${fontSize/2}px ${fontSize/2}px ${fontSize/2}px`
            },
			reset: function() {
    			this.viewElem.setAttribute("class", "textarea");
			}
        })
    }

    function createCmdDiv() {
        const cDiv = mainUI.createCmdDiv();
        buttons.push(...mainUI.createButtons(buttonSettings));
        mainUI.addButtons(buttons, cDiv, 1);
        return cDiv;
    }

    const cBoard = mainUI.createCBoard();
    const cmdDiv = createCmdDiv();
    const { 
    	btnStart,
    	btnPrevious,
    	btnNext,
    	btnEnd,
    	btnRotate90,
    	btnRotateY180,
    	btnRule, 
    	btnEncoding,
    	btnMark,
    	btnAIPlay,
    	btnPlay,
    	btnRandomPlay,
    } = mainUI.getChildsForVarname();

    function getFileName(url) {
        let temp = url.split("?")[0].split("#")[0].split("/");
        return temp.pop();
    }

    //------------------------ 
	
	const ENUM_TEXT_DECODERS = {
		"gbk": new TextDecoder("gbk"),
		"utf-8": new TextDecoder("utf-8"),
		"big5": new TextDecoder("big5")
	}
    let textDecoder = undefined;
    let output = "";
    
    /*--------------- utf-8 编码范围 -------------------
             char[1]	char[2]	    char[3]	  char[4]
    1byte    0X00~0x7F
    2byte    0x81~0xFE, 0x40~0xFE
    3byte    0x81~0x84, 0x30~0x39, 0x81~0xFE, 0x30~0x39
    4byte    0x95~0x9A, 0x30~0x39, 0x81~0xFE, 0x30~0x39
    ---------------------------------------------------*/
    function is_utf8(uint8) {
    	let i = 0;
    	const len = uint8.length;
    	while (i < len) {
    		if ( uint8[i] < 0x80) {
    			i++;
    		}
    		else if ((uint8[i] & 0xE0) == 0xC0) {
    			if ((uint8[i + 1] & 0xC0) != 0x80) return 0;
    			i += 2;
    		}
    		else if ((uint8[i] & 0xF0) == 0xE0) {
    			if ((uint8[i + 1] & 0xC0) != 0x80 || (uint8[i + 2] & 0xC0) != 0x80) return 0;
    			i += 3;
    		}
    		else if (( uint8[i] & 0xF8) == 0xF0) {
    			if ((uint8[ i + 1] & 0xC0) != 0x80 || (uint8[i + 2] & 0xC0) != 0x80 || (uint8[i + 3] & 0xC0) != 0x80) return 0;
    			i += 4;
    		} else {
    			return 0;
    		}
    	}
    	return 1;
    }
    /*------------- GB+18030 2022 编码范围 ----------------
             char[1]	char[2]	    char[3]	  char[4]
    1byte    0X00~0x7F
    2byte    0x81~0xFE, 0x40~0xFE
    4byte    0x81~0x84, 0x30~0x39, 0x81~0xFE, 0x30~0x39
    4byte    0x95~0x9A, 0x30~0x39, 0x81~0xFE, 0x30~0x39
    ---------------------------------------------------*/
    function is_gbk(uint8) {
    	let i = 0;
    	const len = uint8.length;
    	while ( i < len ) {
    		if (uint8[i] < 0x80) {
    			i++;
    		} 
    		else if (uint8[i] >= 0x81 && uint8[i] <= 0xFE) {
    			if (uint8[i + 1] == undefined || uint8[i + 1] > 0xFE) return 0;
    			else if (uint8[i + 1] < 0x40) {
    				if (uint8[i + 1] >= 0x30 && uint8[i + 1] <= 0x39 && uint8[i + 3] >= 0x30 && uint8[i + 3] <= 0x39) {
    					i+=4;
    				}
    				else return 0;
    			}
    			i += 2;
    		}
    		else {
    			return 0;
    		}
    	}
    	return 1;
    }
    
    function getEncodeLabel(uint8) {
    	return is_gbk(uint8) ? "gbk" : is_utf8(uint8) ? "utf-8" : "big5";
    }
    
    function autoDecoder(uint8) {
    	let key = getEncodeLabel(uint8);
    	return ENUM_TEXT_DECODERS[key];
    }

    function Uint16ToInt16(value) {
        return value & 0x8000 ? value - 0x10000: value;
    }

    function clamp(min, v, max) {
        return v < min ? min : v > max ? max : v;
    }

    function valueToWinRate(v) {
        if (v >= Value.VALUE_MATE_IN_MAX_PLY)
            return 1;
        if (v <= Value.VALUE_MATED_IN_MAX_PLY)
            return 0;
        return 1 / (1 + Math.exp(-v * (1 / 200)));
    }

    /// Get number of steps to mate from value and current ply
    function mate_step(v, ply) {
        return Value.VALUE_MATE - ply - (v < 0 ? -v : v);
    }

    function readLabel(buffer) {
        const record = new DBRecord(buffer);
        const label = record.label;
        const value = Uint16ToInt16(record.value);
        let sLabel = "";
        if (0 < label && label < 0xFF) {
            sLabel += String.fromCharCode(label);
            if (label == LABEL_WIN || label == LABEL_LOSE) {
                const mateValue = -value;
                if (label == LABEL_WIN && mateValue > Value.VALUE_MATE_IN_MAX_PLY ||
                    label == LABEL_LOSE && mateValue < Value.VALUE_MATED_IN_MAX_PLY)
                    sLabel += mate_step(mateValue, -1).toString();
                else
                    sLabel += '*';
            }
            sLabel.length < 3 && (sLabel = "  ".slice(0,3 - sLabel.length) + sLabel);
        }
        else if (label == LABEL_NONE && record.bound == 0b11) {
            const winRate = valueToWinRate(-value);
            const winRateLabel = parseInt(clamp(0, winRate * 100, 99)).toString();
            sLabel = `${"  ".slice(0,2 - winRateLabel.length)}${winRateLabel}%`;
        }
        else {
        	sLabel = [EMOJI_ROUND_BLACK, EMOJI_ROUND][game.sideToMove];
        }
        //output += `${sLabel}: ${label}, ${value}, ${record.depth}, ${record.bound}\n`
        return sLabel.toLocaleUpperCase();
    }
    
    const BOARDTEXT_HEARD = "@BTXT@";
    function hasBoardText(uint8) {
    	return uint8.length > BOARDTEXT_HEARD.length && uint8[0] == 64 && uint8[1] == 66 && uint8[2] == 84 && uint8[3] == 88 && uint8[4] == 84 && uint8[5] == 64
    }
    
    // read boardText string, remove boardText string, create new info.comment, 
    // create boardTextMap, add info.boardTextMap, 
    function readBoardText(info, textDecode) {
    	function lastIndex(uint8, char) {
    		const charCode = char.charCodeAt(0) & 0xFF;
    		let idx = -1;
    		for (let i = 0; i < uint8.length; i++) uint8[i] === charCode && (idx = i)
    		return idx;
    	}
    	
    	const end = Math.min(0xFFFFFFF & lastIndex(info.comment, "\b"), info.comment.length);
        const boardTextBuffer = new Uint8Array(info.comment.buffer, BOARDTEXT_HEARD.length, end - BOARDTEXT_HEARD.length);
                    	
        let cur = 0;
        const boardTextObjArr = []
        while(cur < boardTextBuffer.length) {
        	// const buffer = []
            const labelBuffer = [];
            const x = parseInt(String.fromCharCode(boardTextBuffer[cur++]), 25);
            // buffer.push(boardTextBuffer[cur])
            const y = parseInt(String.fromCharCode(boardTextBuffer[cur++]), 25);
            // buffer.push(boardTextBuffer[cur])
                    		
            while(cur < boardTextBuffer.length &&
            	boardTextBuffer[cur] != 0 &&
                boardTextBuffer[cur] != 10)
            {
            	labelBuffer.push(boardTextBuffer[cur++])
                // buffer.push(boardTextBuffer[cur])
            }
            // skip \0 \n
            while(cur < boardTextBuffer.length &&
            	(boardTextBuffer[cur] == 0 ||
                boardTextBuffer[cur] == 10))
            {
            	cur++;
                // buffer.push(boardTextBuffer[cur])
            }
            boardTextObjArr.push({
            	idx: y * 15 + x,
                //labelBuffer,
                // buffer,
                label: textDecode.decode(new Uint8Array(labelBuffer))
        	})
        }
        
        info.comment = new Uint8Array(info.comment.buffer, end, info.comment.length - end)
        
        const boardTextMap = {};
        if (boardTextObjArr.length) {
        	// 根据 trans 翻转参数，idx 现在座标，还原翻转前的座标 并返回
        	function undoTransPoint(boardWidth, boardHeight, idx, trans) {
        		const centerX = (boardWidth - 1) / 2;
        		const centerY = (boardHeight - 1) / 2;
        		let loop;
        		loop = (4 - (trans & 0x03)) & 0x03;
        		while (loop--) { idx = rotate90(centerX, centerY, idx % 15, ~~(idx / 15)) }
        		if (trans & 0x04) {
        			idx = reflectX(centerY, idx % 15, ~~(idx / 15));
        			idx = rotate90(centerX, centerY, idx % 15, ~~(idx / 15))
        		}
        		return idx;
        	}
        
        	// 根据 trans 翻转参数, idx 座标，计算翻转后的座标 并返回
        	const transPoint = undoTransPoint;
        	// 保存 构建 tDBKey 时 返回的数据, trans 记录翻转参数
        	const rtObject = { trans: 0 };
        	// getArray() 要去掉数组最后一位
        	let position = cBoard.getArray().slice(0, 225);
        	// 获取 trans
        	constructDBKey(game.rule, game.boardWidth, game.boardHeight, game.sideToMove, position, rtObject);
        	const parentTrans = rtObject.trans;
        	// 把 boardTextObjArr 里的所有座标 转到 当前局面 正确的位置
        	boardTextObjArr.map(obj => obj.idx = undoTransPoint(game.boardWidth, game.boardHeight, obj.idx, parentTrans))
        
        	const strPosition = JSON.stringify(position);
        	for (let trans = 0; trans < 8; trans++) {
        		if (trans == 4) {
        			position = reflectPosition(game.boardWidth, game.boardHeight, position);
        		}
        		else if (trans) { // 1,2,3,5,6,7
        			position = rotatePosition(game.boardWidth, game.boardHeight, position);
        		}
        		// 把当前棋局（trans=0 时）和 对称棋局 的座标 加入 boardTextMap
        		if (JSON.stringify(position) == strPosition) {
        			boardTextObjArr.map(obj => {
        				const idx = transPoint(game.boardWidth, game.boardHeight, obj.idx, trans)
        				boardTextMap[idx] = obj.label;
        			})
        		}
        	}
        }
        
        info.boardTextMap = boardTextMap;
                    	
    }

    async function inputText(initStr = "") {
        return (await msg({
            text: initStr,
            type: "input",
            butNum: 1,
            lineNum: 10
        })).inputStr
    }

    //------------------------ 


    /// Rule is the fundamental rule of the game
    const Rule = {
        FREESTYLE: 0,
        STANDARD: 1,
        RENJU: 2,
        RULE_NB: 3
    };

    const Color = {
        BLACK: 0,
        WHITE: 1,
        WALL: 2,
        EMPTY: 3,
        COLOR_NB: 4, // Total number of color on board
        SIDE_NB: 2 // Two side of stones (Black and White)
    };
    
    const regExp_EMPTY_LINE_HEARD = /^[\s\0\b\n]*(<br>)*[\s\0\b\n]*(<br>)*/i;

    const game = {
    	filename: "",
        rule: Rule.RENJU,
        tree: undefined,
        cBoard: cBoard,
        searching: false,
        thinking: false,
        
        toStart: function(isShowNum) {
        	this.stopThinking();
            cBoard.toStart(isShowNum);
        },
        toPrevious: function(isShowNum, timeout = 0) {
        	this.stopThinking();
            cBoard.toPrevious(isShowNum, timeout);
            cBoard.MS[cBoard.MSindex] == 225 && cBoard.toPrevious(isShowNum, timeout);
        },
        toNext: function(isShowNum, timeout = 0) {
        	this.stopThinking();
            cBoard.toNext(isShowNum, timeout);
            cBoard.MS[cBoard.MSindex] == 225 && cBoard.toNext(isShowNum, timeout);
        },
        toEnd: function(isShowNum) {
        	this.stopThinking();
            cBoard.toEnd(isShowNum);
        },
        rotate90: function(isShowNum) {
        	this.stopThinking();
            cBoard.rotate90();
        },
        rotateY180: function(isShowNum) {
        	this.stopThinking();
            cBoard.rotateY180();
        },
        cleLabel: function() {
            cBoard.cleLb("all");
        },
        resetNum: function(i) {
            const num = i ? cBoard.MSindex + 1 : 0;
            cBoard.setResetNum(num);
        },
        saveAsImage: function() {
            cBoard.saveAsImage();
        },
        outputCode: function() {
            const code = cBoard.getCodeURL();
            codeboard.open(code, cBoard.size).then(str => str && cBoard.unpackCodeURL(str));
        },
        scaleBoard: function() {
            const scale = cBoard.scale != 1 ? 1 : 1.5;
            cBoard.setScale(scale, true);
        },
        ctnBack: function(idx) { // 触发快速悔棋
            if (idx + 1 && cBoard.P[idx].type == TYPE_NUMBER) {
                if (idx != cBoard.MS[cBoard.MSindex]) {
                    while (cBoard.MS[cBoard.MSindex] != idx && cBoard.MSindex > - 1) {
                        cBoard.cleNb(cBoard.MS[cBoard.MSindex], true, 100);
                    }
                }
            }
        },
        downloadFile: async function(url) {
            try {
                const response = await fetch(url + "?cache=netFirst");
                if (!response.ok) {
                	(window.msg || alert)("网络不给力 请稍后点击下载");
                	return;
                }
                
                const blob = await response.blob();
                const file = new File([blob], getFileName(url));
                await this.openFile(file);
                this.tree = undefined;
				window.setBlockUnload(true);
            } catch (e) { console.error(e.stack) }
        },
        openFile: async function(file) {
        	mainUI.viewport.resize();
            const ratio = await game.openDatabass(file);
            if (ratio > 0) {
            	log(game.filename);
        		game.toStart();
            	await game.showBranchNodes();
            }
            else log("");
            return ratio;
        },
        openDatabass: async function(file) {
        	await DBClient.closeDatabass();
            const ratio = await DBClient.openDatabass(file, v => {
                if (typeof v == "number") {
                    if (v <= 1) log(`${~~(v * 10000)/100}%`);
                    else if (v >= (1024 * 1024 * 1024)) {
                        log(`正在解压 ${parseInt(v / (1024 * 1024 * 1024) * 100) / 100}GB`);
                    }
                    else if (v >= 2 * (1024 * 1024)) {
                        log(`正在解压 ${parseInt(v / (1024 * 1024) * 100) / 100}MB`);
                    }
                }
                else if (typeof v == "string") log(v);
            });
            if (ratio < 1) (self.msgbox || alert)(`浏览器内存不足，只打开了${parseInt(ratio*10000)/100}%棋谱\n手机请用Edeg浏览器，获得更大内存`);
            return ratio;
        },
        showBranchNodes: async function() {
            if (this.mode == this.MODE.DATABASS) {
            	const info = await DBClient.getBranchNodes({
                    rule: game.rule,
                    boardWidth: game.boardWidth,
                    boardHeight: game.boardHeight,
                    sideToMove: game.sideToMove,
                    position: cBoard.getArray()
                });
                
                if (!isEqual(info.position, cBoard.getArray())) return;
                
                if (info.comment) {
                	try{
                	const encodeLabel = getEncodeLabel(info.comment)
                    const _textDecoder = textDecoder || ENUM_TEXT_DECODERS[encodeLabel];
                    
                    if (hasBoardText(info.comment)) {
                    	readBoardText(info, _textDecoder)
                    }
                    $("comment").innerHTML = (_textDecoder.decode(info.comment) || defaultComment).replace(regExp_EMPTY_LINE_HEARD,"");
                    
                	}catch(e){alert(e.stack)}
                }
                else $("comment").innerHTML = (defaultComment).replace(regExp_EMPTY_LINE_HEARD,"");
                
                //output = "";
                cBoard.cleLb("all");
            	const boardTextMap = info.boardTextMap || {};
                info.records.map(record => {
                	const label = boardTextMap[record.idx] || readLabel(record.buffer);
                	cBoard.wLb(record.idx, label, "black");
                })
                game.rule == Rule.RENJU && game.sideToMove == 0 && info.position.map((v, i) => {
                	if (v == 0 && ("isFoul" in self) && isFoul(i, info.position)) {
                		cBoard.wLb(i, EMOJI_FOUL, "red");
                	}
                })
                //inputText(output);
                
                return info;
            }
        },
        think: async function() {
        	cBoard.cleLb("all");
        	await waitAIReady();
        	this.thinking = true;
        	puzzleAI.aiHelp(createGame());
        },
        checkWin: async function (position, idx) {
        	if (btnPlay.checked) {
        		const side = position[idx];
        		let state = getGameOver(position, side, idx);
        		if (state) {
        			const COLOR = []
        			let msg = "";
        			msgbox("棋局已经结束");
        			$("comment").innerHTML = "棋局已经结束";
        			return true;
        		}
        	}
        },
        lockBoard: () => {
        	bindEvent.enabled = false;
    		btnStart.enabled = false;
    		btnPrevious.enabled = false;
    		btnNext.enabled = false;
    		btnEnd.enabled = false;
    		btnRotate90.enabled = false;
    		btnRotateY180.enabled = false;
        },
        unlockBoard: () => {
        	bindEvent.enabled = true;
    		btnStart.enabled = true;
    		btnPrevious.enabled = true;
    		btnNext.enabled = true;
    		btnEnd.enabled = true;
    		btnRotate90.enabled = true;
    		btnRotateY180.enabled = true;
        },
        forEveryPosition: async function(_param) {
        this.searching = true;
        try{
        	function compareValue(x, y, node) {
        		const x1 = node.idx % 15;
        		const y1 = ~~(node.idx / 15);
        		const distance = Math.max(Math.abs(x1 - x), Math.abs(y1 - y));
        		const head = ["a","W"].indexOf(node.label[0]) + 1 ? 0 : ["c","L"].indexOf(node.label[0]) + 1 ? 1 : 2;
        		const step = parseInt(node.label.replace(/[^\d]/g, ""));
        		const stepCode = head == 1 ? 255 - (step || 0) : step || 255;
        		return (head << 16 | stepCode << 8 | distance);
        	}
        	
        	function sortNodes(nodes) {
        		const lastIdx = cBoard.MSindex > -1 ? cBoard.MS[cBoard.MSindex] : (cBoard.size >> 1) * 16;
        		const x = lastIdx % 15;
        		const y = ~~(lastIdx / 15);
        		nodes.sort((lNode, rNode) => {
        			return compareValue(x, y, lNode) - compareValue(x, y, rNode);
        		})
        	}
        	const param = {
        		filterNodes: ()=>{},
        		callback: ()=>{},
        		callback2: ()=>{},
        		condition: ()=>{}
        	}
        	Object.assign(param, _param);
        	
        	this.lockBoard();
        	const stack = [];
        	let depth = 0;
        	do {
        		let nodes = [];
        		let node = null;
        		const rt = await  game.showBranchNodes();
        		rt && rt.nodes && rt.nodes.map(node => nodes.push({idx: node.idx, label: node.txt, color: node.color}));
        		rt && rt.records && rt.records.map(record => nodes.push({idx: record.idx, label: readLabel(record.buffer)}));
        		if (nodes.length) {
        			sortNodes(nodes);
        			nodes = await param.filterNodes(nodes);
        			stack.push(nodes);
        			depth++;
        			node = nodes.pop();
        		}
        		else {
        			await param.callback2();
        			cBoard.toPrevious(true);
        			while (stack.length && stack[stack.length-1].length == 0) {
        				stack.pop();
        				depth--;
        				cBoard.toPrevious(true);
        			}
        			if (stack.length) node = stack[stack.length-1].pop();
        		}
        		if (!node) break;
        		cBoard.wNb(node.idx, "auto", true);
        		await param.callback();
        	} while(param.condition())
        	this.unlockBoard();
        }catch(e){
        	console.error(e.stack);
        	this.unlockBoard();
        }
        this.searching = false;
        },
        randomPlay: async function() {
        	let MS = [];
        	btnPlay.checked = false;
        	btnPlay.touchend();
        	await this.forEveryPosition({
        		filterNodes: nodes => {
        			const node = nodes[parseInt(Math.min(8, nodes.length) * Math.random())];
        			nodes.length = 0;
        			nodes.push(node);
        			return nodes;
        		},
    			callback: () => { MS = cBoard.MS.slice(0, cBoard.MSindex)},
        		condition: () => btnPlay.checked
        	});
        	cBoard.toStart(true);
        	cBoard.MS = MS;
        	while (cBoard.MSindex < cBoard.MS.length - 1) {
        		cBoard.toNext(true, 100);
        	}
    		this.mode == 0 && msg("请先打开一个棋谱，再随机出题");
        },
		stopThinking: async function() {
			if (!this.thinking) return;
    		cBoard.hideStone();
    		this.thinking = false;
			await puzzleAI.stopThinking();
		},
        get boardWidth() {
            return cBoard.SLTX;
        },
        get boardHeight() {
            return cBoard.SLTY;
        },
        get sideToMove() {
            return (cBoard.MSindex + 1) % 2;
        },
        get numBlackStones() {
            let count = 0;
            for (let i = 0; i <= cBoard.MSindex; i += 2) {
                if (cBoard.MS[i] >= 0) count++
            }
            return count;
        },
        get numWhiteStones() {
            let count = 0;
            for (let i = 1; i <= cBoard.MSindex; i += 2) {
                if (cBoard.MS[i] >= 0) count++
            }
            return count;
        },
        set boardSize(size) {
            cBoard.setSize(size);
        },
    }
    
    window.game = game;
    
    function isEqual(arr1, arr2) {
        for (let i = 0; i < arr1.length; i++) {
            for (let j = 0; j < arr1[i].length; j++) {
                if (arr1[i][j] != arr2[i][j])
                    return false;
            }
        }
        return true;
    }
    //------------------------ 

    function getButton(type, text) {
        return buttons.filter(but => but && but.type == type && but.text == text)[0];
    }

    //------------------------ Events ---------------------------

    game.cBoard.stonechange = async function() { 
    	if (game.searching) return;
    	if (btnPlay.checked) {
    		cBoard.cleLb("all");
    	}
    	else {
    		await game.showBranchNodes();
    		const path = cBoard.MS.slice(0, cBoard.MSindex+1);
            const node = game.tree && game.tree.getPathNode(path);
            const slt = !!(node && node.score);
            btnMark.checked = !slt;
            btnMark.defaultontouchend();
    	}
    };

    function addEvents() {
        bindEvent.setBodyDiv(mainUI.bodyDiv, mainUI.bodyScale, mainUI.upDiv);
        bindEvent.addEventListener(game.cBoard.viewBox, "click", (x, y, type) => {
            const idx = game.cBoard.getIndex(x, y);
            if (game.cBoard.P[idx].type == TYPE_NUMBER) {
                game.toPrevious(true, 100); //点击棋子，触发悔棋
            }
            else if (game.cBoard.P[idx].type == TYPE_EMPTY || game.cBoard.P[idx].type == TYPE_MARK) {
                game.cBoard.wNb(idx, "auto", true); // 添加棋子
                if (btnPlay.checked) {
                	game.checkWin(cBoard.getArray(), idx).then(gameOver => !gameOver && game.think());
                }
            }
        })
        bindEvent.addEventListener(game.cBoard.viewBox, "dblclick", (x, y) => {
            const idx = game.cBoard.getIndex(x, y);
            game.ctnBack(idx);
        })
        bindEvent.addEventListener(game.cBoard.viewBox, "contextmenu", (x, y) => {
            game.scaleBoard();
        })
        bindEvent.addEventListener(cBoard.viewBox, "zoomstart", (x1, y1, x2, y2) => {
        	cBoard.zoomStart(x1, y1, x2, y2);
        })
		/*
        bindEvent.addEventListener(game.cBoard.viewBox, "dbltouchstart", (x, y) => {
            
        })
        bindEvent.addEventListener(game.cBoard.viewBox, "zoomstart", (x1, y1, x2, y2) => {
            
        })
        */
    }

    //------------------------ load ------------------------ 
    
	addEvents();
    mainUI.loadTheme().then(() => mainUI.viewport.resize());
    log("你可以打开Rapfi保存的db棋谱") 
    $("comment").innerHTML = (defaultComment).replace(regExp_EMPTY_LINE_HEARD,"");
    //------------------------ support Renlib  ------------------------ 
    
    log("你可以打开db棋谱、lib棋谱") 
    RenjuLib.reset({
    	newGame: () => cBoard.cle(),
    	cBoard: cBoard,
    	getShowNum: () => true,
    	outputComment: (text) => $("comment").innerHTML = (text || defaultComment).replace(regExp_EMPTY_LINE_HEARD,"") 
    });
    
    const oldOpenFile = game.openFile;
    const oldshowBranchNodes = game.showBranchNodes;
    Object.assign(game, {
    	MODE: {
    		DATABASS: 1,
    		RENLIB: 2
    	},
    	mode: 0,
    	openFile: async function(file) {
    		mainUI.viewport.resize();
    		const type = file.name.toLowerCase().split(".").pop();
    		await DBClient.closeDatabass();
    		RenjuLib.closeLib();
    		game.filename = file.name;
    		if (type == "db") {
    			(await oldOpenFile.call(this, file)) > 0 && (this.mode = this.MODE.DATABASS) && (await oldshowBranchNodes.call(this));
    			btnEncoding.enabled = true;
    		}
    		else {
    			cBoard.cle();
    			(await RenjuLib.openLib(file)) && (this.mode = this.MODE.RENLIB);
    			RenjuLib.getAutoMove();
    			btnEncoding.enabled = false;
    		}
    		log(file.name);
        	btnPlay.checked && btnPlay.touchend();
    	},
    	showBranchNodes: async function() {
    		if (this.mode == this.MODE.DATABASS) return oldshowBranchNodes.call(this);
    		else if (this.mode == this.MODE.RENLIB) {
    			return RenjuLib.showBranchs({ 
    				path: cBoard.MS.slice(0, cBoard.MSindex + 1),
    				position: cBoard.getArray2D(),
    				callback:() => game.rule == Rule.RENJU && game.sideToMove == 0 && cBoard.getArray().map((color, idx, arr) => {
    					color == 0 && ("isFoul" in self) && isFoul(idx, arr) && cBoard.wLb(idx, EMOJI_FOUL, "red");
    				})
    			})
    		}
    		else $("comment").innerHTML = (defaultComment).replace(regExp_EMPTY_LINE_HEARD,"");
    	}
    })
    
    Object.defineProperty(game, 'boardSize', {
    	set: function(size) {
    		cBoard.cle();
    		cBoard.setSize(size);
			RenjuLib.setCenterPos({ x: cBoard.size / 2 + 0.5, y: cBoard.size / 2 + 0.5 });
			RenjuLib.getAutoMove();
    	}
    });
    
    //------------------------ support puzzleAI  ------------------------ 
    
    function outputInnerHTML(){}
    
    async function waitAIReady() {
    	if (!puzzleAI.ready) {
    		await puzzleAI.stopThinking()
    	}
    	cBoard.hideStone();
    }
    
    function checkAI() {
    	if (!window.puzzleAI) {
    		msgbox({
    			"title": "gomocalc 引擎异常，请尝试刷新页面"
    		})
    	}
    	else game.stopThinking();
    }
    
    function processOutput(output) {
    	try {
    		(window.vConsole || window.parent.vConsole) && console.log(output);
    		if (cBoard.startIdx == -1 && output.bestline && output.bestline[0]) {
    			const idx = output.bestline[0][1] * 15 + output.bestline[0][0];
    			cBoard.showStone(idx, TYPE_NUMBER);
    		}
    		if (output.realtime && output.realtime.pos) {
    			const idx = output.realtime.pos[1] * 15 + output.realtime.pos[0];
    			cBoard.showStone(idx, TYPE_NUMBER);
    		}
    		if (output.pos) {
    			const idx = output.pos[1] * 15 + output.pos[0];
    			cBoard.hideStone();
    			cBoard.wNb(idx, "auto", true);
        		game.thinking = false;
    			game.checkWin(cBoard.getArray(), idx).then(gameOver => !gameOver && btnPlay.checked && ($("comment").innerHTML = "请落子..."));
    		}
    		if (output.sideLabel) {
    			if (output.sideLabel.indexOf("ready") + 1) {
					btnPlay.checked && ($("comment").innerHTML = "请落子...");
    			}
    			else {
    				btnPlay.checked && ($("comment").innerHTML = output.sideLabel);
    			}
			}
			if (output.comment) {
				btnPlay.checked && ($("comment").innerHTML = output.comment);
			}
    	} catch (e) { console.error(e.stack) }
    }
    
    function createGame() {
    	return {
    		board: cBoard,
    		playerSide: 3 - (Math.abs(cBoard.MSindex % 2) + 1),
    		puzzle: {
    			rule: game.rule,
    			mode: 96,
    			size: cBoard.size
    		}
    	}
    }
    checkAI();
	puzzleAI.processOutput = processOutput;
	
	//---------------sgf--------------------------
	
	function createSGFStrinc(cBoard = cBoard) {
		let sgf = "(;GM[1]CA[gb2312]FF[4]AP[ZJRenju]SZ[15]";
		for (let index = 0; index <= cBoard.MSindex; index++) {
			const color = index % 2 ? "W" : "B";
			const x = String.fromCharCode( 97 + cBoard.MS[index] % 15 );
			const y = String.fromCharCode( 97 + ~~(cBoard.MS[index] / 15) );
			sgf += `;${color}[${x}${y}]`;
		}
		sgf += ")";
		return sgf
	}
	
	async function downloadZIP(type) {
		const MS = cBoard.MS.slice(0, cBoard.MSindex + 1);
		const oldText = btnPlay.text;
        btnPlay.checked = false;
        btnPlay.touchend();
        btnPlay.setText("停止搜索");
        
        try{
		type = {jpg: "jpg", svg: "svg", sgf: "sgf"}[type] || "svg";
        let count = 0;
		const zip = new JSZip();
		const addFile = {
			jpg: async() => {
				const blob = await new Promise(resolve => cBoard.canvas.toBlob(blob => resolve(blob), "image/jpeg", 0.1))
				await zip.file(`${++count}.${type}`, blob);
			},
			svg: async() => {
				await zip.file(`${++count}.${type}`, cBoard.getSVG());
			},
			sgf: async() => {
				await zip.file(`${++count}.${type}`, createSGFStrinc(cBoard));
			}
		}[type]
		
		!game.tree && await msg("你没有手动标记局面\n默认输出所有分支最后一手的局面")
		
		game.tree ?
		(await Promise.resolve()
			.then(() => (game.searching = true,game.lockBoard()))
			.then(() => game.tree.mapAsync(async(node, path) => {
				if (node.score) {
					cBoard.toStart(true);
					cBoard.MS = path.slice(0);
					cBoard.MSindex = -1;
					cBoard.toEnd(true);
					await addFile();
				}
			}))
			.catch(e => console.error(e && e.stack || e))
			.then(() => (game.searching = false,game.unlockBoard()))
		) :
		(await game.forEveryPosition({
			filterNodes: async(nodes) => nodes.filter(node => !node.color || node.color == "black"),
			callback: () => {},
			callback2: addFile,
			condition: () => btnPlay.checked
		}))
			
		let data = await zip.generateAsync({ type: "blob" }, function updateCallback(metadata) {
			log("progression: " + metadata.percent.toFixed(2) + " %");
			if (metadata.currentFile) {
				log("current file = " + metadata.currentFile);
			}
		});
		log("downloading...")
		setTimeout(() => log(game.filename), 30*1000)
		const _filename = (game.filename ? game.filename + "." : "") + type + ".zip";
		msg({
			title: `${count}个局面转成${type}文件\n打包在“${_filename}”\n是否下载文件`,
			butNum: 2
		})
		.then(({butCode}) => butCode==1 && saveFile.save(data, _filename))
        }catch(e){console.error(e.stack)}
        
        btnPlay.checked && btnPlay.touchend();
        btnPlay.setText(oldText);
        cBoard.toStart(true);
        cBoard.MS = MS;
        while (cBoard.MSindex < cBoard.MS.length - 1) {
        	cBoard.toNext(true, 100);
        }
	}

}catch(e){alert(e.stack)}
})()
