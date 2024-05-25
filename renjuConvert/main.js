(() => {
	try{
    "use strict";
    const d = document;
    const dw = d.documentElement.clientWidth;
    const dh = d.documentElement.clientHeight;
    
    function $(id) { return document.getElementById(id) };

    //-----------------------------------------------------------------------
	const fontSize = ~~(mainUI.buttonHeight / 1.8);
    const buttonSettings = [
    	mainUI.newLabel({
    		varName: "title",
    		type: "div",
    		width: mainUI.cmdWidth - mainUI.cmdPadding * 2,
    		height: mainUI.buttonHeight,
    		style: {
    			fontSize: `${fontSize}px`,
    			textAlign: "center",
    			lineHeight: `${mainUI.buttonHeight}px`
    		}
    	}),
    	mainUI.newComment({
    		varName: "comment",
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
    	}),
        {
        	varName: "btnFile",
            type: "file",
            text: "file",
            touchend: async function() {}
        },
        {
        	varName: "btn",
            type: "button",
            text: "button",
            touchend: async function() {}
        },
        {
        	varName: "btn",
            type: "button",
            text: "button",
            touchend: async function() {}
        },
        {
        	varName: "btn",
            type: "button",
            text: "button",
            touchend: async function() {}
        },
        {
        	varName: "btn",
            type: "button",
            text: "button",
            touchend: async function() {}
        },
        {
        	varName: "btn",
            type: "button",
            text: "button",
            touchend: async function() {}
        },
        {
        	varName: "btn",
            type: "button",
            text: "button",
            touchend: async function() {}
        },
        {
        	varName: "btn",
            type: "button",
            text: "button",
            touchend: async function() {}
        },
        {
        	varName: "btn",
            type: "button",
            text: "button",
            touchend: async function() {}
        },
        {
        	varName: "btn",
            type: "button",
            text: "button",
            touchend: async function() {}
        },
        {
        	varName: "btn",
            type: "button",
            text: "button",
            touchend: async function() {}
        },
        {
        	varName: "btn",
            type: "button",
            text: "button",
            touchend: async function() {}
        },
        {
        	varName: "btn",
            type: "button",
            text: "button",
            touchend: async function() {}
        },
        {
        	varName: "btn",
            type: "button",
            text: "button6",
            touchend: async function() {}
        }
    ];

    buttonSettings.splice(1, 0, null, null, null);
    buttonSettings.splice(5, 0, null);
    buttonSettings.splice(8, 0, null, null);
    buttonSettings.splice(12, 0, null, null);
    buttonSettings.splice(16, 0, null, null);
    buttonSettings.splice(20, 0, null, null);
    buttonSettings.splice(24, 0, null, null);
    buttonSettings.splice(28, 0, null, null);
    buttonSettings.splice(32, 0, null, null);

    const cBoard = mainUI.createCBoard();
    const cmdDiv = mainUI.createCmdDiv();
    mainUI.addButtons(mainUI.createButtons(buttonSettings), cmdDiv, 1);
        
    const { 
    } = mainUI.getChildsForVarname();

    function getFileName(path) {
        let temp = path.split(".");
        temp = temp.join(".");
        return temp.split("\\").pop();
    }
    //------------------------ 
    
    const game = {
    	cBoard,
    };

    //------------------------ 

    let textDecoder = new TextDecoder("gbk");
    let output = "";

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
        output += `${sLabel}: ${label}, ${value}, ${record.depth}, ${record.bound}\n`
        return sLabel.toLocaleUpperCase();
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
    
    function isEqual(arr1, arr2) {
        for (let i = 0; i < arr1.length; i++) {
            for (let j = 0; j < arr1[i].length; j++) {
                if (arr1[i][j] != arr2[i][j])
                    return false;
            }
        }
        return true;
    }
    
    //------------------------ Events ---------------------------

    cBoard.stonechange = function() { 
    	if (btnPlay.checked) {
    		cBoard.cleLb("all");
    	}
    	else {
    		game.showBranchNodes();
    	}
    };

    function addEvents() {
        bindEvent.setBodyDiv(mainUI.bodyDiv, mainUI.bodyScale, mainUI.upDiv);
        bindEvent.addEventListener(game.cBoard.viewBox, "click", (x, y, type) => {
            const idx = game.cBoard.getIndex(x, y);
            if (game.cBoard.P[idx].type == TYPE_NUMBER) {
                game.toPrevious(true); //点击棋子，触发悔棋
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
    }catch(e){alert(e.stack)}
    
})()
