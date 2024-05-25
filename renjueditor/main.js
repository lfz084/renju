(() => {
    "use strict";
    const d = document;
    const dw = d.documentElement.clientWidth;
    const dh = d.documentElement.clientHeight;
    
    function log(text) {document.getElementById("log").innerText = text}
    
    function log1(text) {document.getElementById("log1").innerText = text}
    
    function randomly(games, loop = 5) {
    	const len = games.length;
    	while (loop-- > 0) {
    		for(let i = 0; i < len; i++) {
    			const randomIdx = parseInt(Math.random() * (len-1));
    			const game = games.splice(i,1)[0];
    			games.splice(randomIdx, 0, game);
    		}
    	}
    }
    //-----------------------------------------------------------------------
    const MANUAL = 0;
    const UNLOCK = 1;
    const LOCK = 2;

    let warn = true;
    let checkStones = true;
    let status = MANUAL;
    let filename = "download";
    let gameIndex = -1;
    const buttons = [];
    const BTNMODE_SETTINGS = [
    	-0, "残局分类", "disabled", 0,
    	-1, "VCF", "radio", puzzleCoder.MODE.VCF,
    	-2, "VCT", "radio", puzzleCoder.MODE.VCT,
    	-3, "三手胜", "radio", puzzleCoder.MODE.VCT3,
    	-4, "自由对弈", "radio", puzzleCoder.MODE.FREE,
    	-5, "四子五连", "radio", puzzleCoder.MODE.STONES4,
    	-6, "五子五连", "radio", puzzleCoder.MODE.STONES5,
    	-10, "自动分类（左边优先）", "disabled", 0,
    	-11, "VCF， VCT", "radio", puzzleCoder.MODE.VCF | puzzleCoder.MODE.VCT << 8,
    	-12, "三手胜， VCT", "radio", puzzleCoder.MODE.VCT3 | puzzleCoder.MODE.VCT << 8,
    	-13, "VCF， 三手胜， VCT", "radio", puzzleCoder.MODE.VCF | puzzleCoder.MODE.VCT3 << 8 | puzzleCoder.MODE.VCT << 16,
    	-14, "VCF， 四子五连， VCT", "radio", puzzleCoder.MODE.VCF | puzzleCoder.MODE.STONES4 << 8 | puzzleCoder.MODE.VCT << 16,
    	-15, "找狭义双杀， 找双杀防点", "radio", puzzleCoder.MODE.BASE_DOUBLE_VCF | puzzleCoder.MODE.BASE_BLOCK_DOUBLE_VCF << 8,
    	-20, "五子茶馆点点题分类", "disabled", 0,
    	-21, "找狭义双杀", "radio", puzzleCoder.MODE.BASE_DOUBLE_VCF,
    	-22, "找双杀防点", "radio", puzzleCoder.MODE.BASE_BLOCK_DOUBLE_VCF,
    	-23, "找做V点", "radio", puzzleCoder.MODE.BASE_MAKE_VCF,
    	-24, "找做四三点", "radio", puzzleCoder.MODE.BASE_MAKE_VCF_43,
    	-25, "找做四四点", "radio", puzzleCoder.MODE.BASE_MAKE_VCF_44,
    	-26, "找VCF防点", "radio", puzzleCoder.MODE.BASE_BLOCK_VCF,
    	-27, "防冲四抓禁", "radio", puzzleCoder.MODE.BASE_BLOCK_CATCH_FOUL,
    	-28, "找禁手点", "radio", puzzleCoder.MODE.BASE_FOUL,
    	-29, "找三三禁手点", "radio", puzzleCoder.MODE.BASE_FOUL_33,
    	-30, "找四四禁手点", "radio", puzzleCoder.MODE.BASE_FOUL_44,
    	-31, "找长连禁手点", "radio", puzzleCoder.MODE.BASE_FOUL_6,
    	-32, "找活三点", "radio", puzzleCoder.MODE.BASE_FREE_THREE,
    	-33, "找复活三点", "radio", puzzleCoder.MODE.BASE_REVIVE_FREE_THREE,
    	-34, "找眠三点", "radio", puzzleCoder.MODE.BASE_NOTFREE_THREE,
    	-35, "找活四点", "radio", puzzleCoder.MODE.BASE_FREE_FOUR,
    	-36, "找冲四点", "radio", puzzleCoder.MODE.BASE_NOTFREE_FOUR];
    const buttonSettings = [
        {
        	varName: "btnFile",
        	type: "file",
        	text: "打开文件",
        	change: async function() {
        		try {
        			mainUI.viewport.resize();
        			await unlockArea();
        			const file = this.files[0];
        			const games = await renjuEditor.openFile(file, this.value.split("/").pop(), outputProgress);
        			filename = getFileName(this.value);
        			for (let i = 0; i < games.length; i++) {
        				pushGame(games[i]);
        				await puzzleCoder.wait(0);
        				i == games.length - 1 && loadGame(gameIndex);
        			}
        			log(file.name);
					window.setBlockUnload(true);
					cBoard.cle();
        		} catch (e) { console.error(e.stack) }
        		this.value = "";
        	}
        },
        {
            varName: "btnAutoPut",
            type: "button",
            text: "自动识别",
            touchend: async function() {
                if (!btnLock.checked) await lockArea();
                cBoard.autoPut();
                if (checkStones) {
                	let numBlackStones = 0;
                	let numWhiteStones = 0;
                	cBoard.getArray().map(v => (v == 1 && numBlackStones++, v == 2 && numWhiteStones++ ));
                	if ((numBlackStones - numWhiteStones) & 0xFE) {
                		msgbox({
                			title: `棋子数量不对, 黑减白 = ${numBlackStones - numWhiteStones}`,
                			enterTXT:  "我知道了",
							cancelTXT: "不再提醒",
							cancelFunction: () => checkStones=false,
							butNum: 2
						});
						return false;
                	}
                }
                return true;
            }
        },
        {
        	type: "button",
        	text: "上一页",
        	touchend: async function() {
        		await unlockArea();
        		return await renjuEditor.prePage();
        	}
        },
        {
            varName: "btnNextPage",
            type: "button",
            text: "下一页",
            touchend: async function() {
                await unlockArea();
                return await renjuEditor.nextPage();
            }
        },
        {
            varName: "btnLock",
            type: "checkbox",
            text: "选定棋盘",
            touchend: async function() {
            	if (btnLock.checked) await lockArea();
                else unlockArea();
            }
        },
        {
        	varName: "btnPushGame",
        	type: "button",
        	text: "加入题集",
        	touchend: function() {
        		if (warn && (cBoard.SLTX != miniBoard.size || cBoard.SLTY != miniBoard.size)) {
        			warn = false;
        			msgbox({ text: `长按图片天元点可对齐棋盘\n（鼠标可右键代替长按）`, btnNum: 1 });
        		}
        		const array = cBoard.getArray();
        		array.find(v => v > 0) ? (pushGame(createGame(array, cBoard)), loadGame(gameIndex), window.setBlockUnload(true)) : window.warn("空棋盘");
        	}
        },
        {
            type: "select",
            text: "15 行",
            options: [15, "15 行", "radio", 14, "14 行", "radio", 13, "13 行", "radio", 12, "12 行", "radio", 11, "11 行", "radio", 10, "10 行", "radio", 9, "9 行", "radio", 8, "8 行", "radio", 7, "7 行", "radio", 6, "6 行", "radio"],
			change: function() {
                cBoard.SLTY = this.input.value;
                cBoard.resetP(cBoard.cutDiv);
                if (!btnLock.checked) {
                    cBoard.cleBorder();
                    cBoard.printBorder();
                }
                else {
                    unlockArea();
                }
            },
            reset: function() {
				const option = this.getOption(15);
				option.li.click();
            }
        },
        {
            type: "select",
            text: "15 列",
            options: [15, "15 列", "radio", 14, "14 列", "radio", 13, "13 列", "radio", 12, "12 列", "radio", 11, "11 列", "radio", 10, "10 列", "radio", 9, "9 列", "radio", 8, "8 列", "radio", 7, "7 列", "radio", 6, "6 列", "radio"],
			change: function() {
                cBoard.SLTX = this.input.value;
                cBoard.resetP(cBoard.cutDiv);
                if (!btnLock.checked) {
                    cBoard.cleBorder();
                    cBoard.printBorder();
                }
                else {
                    unlockArea();
                }
            },
            reset: function() {
				const option = this.getOption(15);
				option.li.click();
            }
        },
        {
            varName: "btnAuto",
            type: "radio",
            text: "◐ 棋",
            group: "side1",
			touchend: function() {}
        },
        {
            varName: "btnBlack",
            type: "radio",
            text: "● 棋",
            group: "side1",
            touchend: function(){}
        },
        {
            varName: "btnWhite",
            type: "radio",
            text: "○ 棋",
            group: "side1",
            touchend: function(){}
        },
        {
            varName: "btnLabel",
            type: "select",
            text: "ABC...",
            group: "side1",
            mode: "radio",
            options: [0, "ABC...", 1, "abc...", 2, "123..."],
            touchend: function(){setcBoardClick()},
            change: function(){setcBoardClick()}
        },
        {
            type: "button",
            text: "上一题",
            touchend: () => preGame()
        },
        {
            type: "button",
            text: "下一题",
            touchend: () => nextGame()
        },
        mainUI.createMiniBoard({varName: "miniBoard"}),
        mainUI.newTextBox({
        	varName: "titleBox",
        	width: (mainUI.buttonWidth * 2.33),
        	height: mainUI.buttonHeight * 1,
        	style: {
        		fontSize: `${mainUI.buttonHeight / 1.8}px`,
        		borderStyle: "solid",
        		borderWidth: `${mainUI.buttonHeight / 1.8 / 20}px`,
        		borderColor: "black",
        		background: "white",
        		padding: "0"
        	},
        	click: function() {
        		this.viewElem.rows = 1;
        	}
        }),
        mainUI.newTextBox({
        	varName: "commentBox",
        	width: (mainUI.buttonWidth * 2.33),
        	height: mainUI.buttonHeight * 4,
        	style: {
        		fontSize: `${mainUI.buttonHeight / 1.8}px`,
        		wordBreak: "break-all",
        		overflowY: "auto",
        		borderStyle: "solid",
        		borderWidth: `${mainUI.buttonHeight / 1.8 / 20}px`,
        		borderColor: "black",
        		background: "white",
        		padding: "0"
        	},
        	click: () => {
        	
        	}
        }),
        {
            type: "btnRotate90",
            text: "↗90°",
            touchend: () => {
    			miniBoard.rotate90(true);
    			changeGame();
            }
        },
        {
            type: "btnRotate180",
            text: "↔180°",
            touchend: () => {
            	miniBoard.rotateY180(true);
            	changeGame();
            }
        },
        {
            type: "btnUp",
            text: "↑",
            touchend: () => {
            	miniBoard.translate(-1, 0);
            	changeGame();
            }
        },
        {
            type: "btnDown",
            text: "↓",
            touchend: () => {
            	miniBoard.translate(1, 0);
            	changeGame();
            }
        },
        {
            type: "btnLeft",
            text: "←",
            touchend: () => {
            	miniBoard.translate(0, -1);
            	changeGame();
            }
        },
        {
            type: "btnRight",
            text: "→",
            touchend: () => {
            	miniBoard.translate(0, 1);
            	changeGame();
            }
        },
        {
            type: "button",
            text: "删一题",
            touchend: () => removeGame(gameIndex)
        },
        {
            varName: "btnRandomRotate",
            type: "select",
            options: [-1,"出题方向", "disabled", 1, "随机翻转", "radio", 0, "固定方向", "radio"],
            reset: function() { 
				const option = this.getOption(null, "随机翻转");
				option.li.click();
				this.setText("","翻转")
			},
            change: async function() {
            	
            }
        },
		{
			varName: "btnRule",
			type: "select",
			options: [2, "有禁", "radio", 0, "无禁", "radio"],
			change: function() {},
			reset: function() {
				const option = this.getOption(null, "有禁");
				option.li.click();
			},
			onhidemenu: function() {}
	    },
		{
			varName: "btnSize",
			type: "select",
			text: "15 路",
			options: [15, "15 路", "radio", 14, "14 路", "radio", 13, "13 路", "radio", 12, "12 路", "radio", 11, "11 路", "radio", 10, "10 路", "radio", 9, "9 路", "radio", 8, "8 路", "radio", 7, "7 路", "radio", 6, "6 路", "radio"],
			change: function() {
				miniBoard.setSize(this.input.value);
				loadGame(gameIndex);
			},
			reset: function() {
				const option = this.getOption(15);
				option.li.click();
			},
			onhidemenu: function() {}
	    },
		{
			varName: "btnSide",
			type: "select",
			options: [0, "自动", "radio", 1, "黑先", "radio", 2, "白先", "radio"],
			change: function() {
			},
			reset: function() {
				const option = this.getOption(null, "自动");
				option.li.click();
			},
			onhidemenu: function() {}
	    },
		{
			varName: "btnMode",
			type: "select",
			options: BTNMODE_SETTINGS.filter((v,i) => i%4 < 3),
			change: function() {
			},
			reset: function() {
				const option = this.getOption(null, "自由对弈");
				option.li.click();
			},
			onhidemenu: function() {}
	    },
        {
            varName: "btnEdit",
            type: "button",
            text: "编辑JSON",
            touchend: async function() {
            	setBusy(true);
                if (games.length) {
            	const puzzles = createPuzzles(games);
            	const logStr = await puzzleAI.checkPuzzles(puzzles, miniBoard, outputProgress)
            	const json = await puzzleCoder.puzzles2RenjuJSON({puzzles}, outputProgress);
            	await msg({
            		text: json,
            		type: "input",
            		enterTXT: "下载",
            		callEnter: (text) => puzzleCoder.downloadJSON(text, filename)
            	})
                }
            	setBusy(false);
            }
        },
        {
            varName: "btnSave",
            type: "select",
            options: [0, "开宝JSON", 1, "小工具JSON"],
            reset: function() { this.setText("保存","保存") },
            change: async function() {
                setBusy(true);
                if (games.length) {
                if (this.input.value * 1 == 0) {
                	const json = await puzzleCoder.games2kaibaoJSON(games, outputProgress);
                	puzzleCoder.downloadJSON(json, filename);
                }
                else {
                	const puzzles = createPuzzles(games);
            		const logStr = await puzzleAI.checkPuzzles(puzzles, miniBoard, outputProgress);
            		const json = await puzzleCoder.puzzles2RenjuJSON({puzzles}, outputProgress);
            		puzzleCoder.downloadJSON(json, filename);
                }
                }
                setBusy(false);
            }
        }
    ];
    
    buttonSettings.splice(0, 0, createLogDiv(), null,null,null);
    buttonSettings.splice(16, 0, createLogDiv1(),null);
    buttonSettings.splice(21, 0, null);
    buttonSettings.splice(23, 0, null);
    buttonSettings.splice(24, 0, null, null);
    buttonSettings.splice(27, 0, null);
    buttonSettings.splice(28, 0, null, null, null, null);
    buttonSettings.splice(28, 0, null, null, null, null);
    buttonSettings.splice(28, 0, null, null);
    
    function createCmdDiv() {
        const cDiv = mainUI.createCmdDiv();
        buttons.push(...mainUI.createButtons(buttonSettings));
        mainUI.addButtons(buttons, cDiv, 3);
        dw > dh && (cDiv.viewElem.style.overflowY = "auto");
        return cDiv;
    }

    function createLogDiv() {
        const fontSize = mainUI.buttonHeight / 2;
        return mainUI.newLabel({
            id: "log",
            type: "div",
            width: mainUI.buttonWidth * 4.99,
            height: mainUI.buttonHeight,
            style: {
                fontSize: `${fontSize}px`,
                textAlign: "center",
                lineHeight: `${mainUI.buttonHeight}px`
            },
            click: async () => {
                if (status == LOCK || status == UNLOCK) {
                    const numPage = parseInt(prompt(`输入要跳转的页码（1 - ${renjuEditor.numPages})`));
                    if (numPage === +numPage && 0 < numPage && numPage <= renjuEditor.numPages) {
                        unlockArea();
                        renjuEditor.loadPage(numPage);
                    }
                }
                else {
                	btnFile.touchend();
                }
            }
        })
    }

    function createLogDiv1() {
        const fontSize = mainUI.buttonHeight / 2;
        return mainUI.newLabel({
            id: "log1",
            type: "div",
            width: mainUI.buttonWidth * 2.33,
            height: mainUI.buttonHeight,
            style: {
                fontSize: `${fontSize}px`,
                textAlign: "center",
                lineHeight: mainUI.buttonHeight + "px",
                backgroundColor: "white"
            },
            click: () => {
                if (games.length) {
                    const idx = parseInt(prompt(`输入要跳转的题号（1 - ${games.length})`));
                    if (idx === +idx && 0 < idx && idx <= games.length) {
                        loadGame(idx - 1);
                    }
                }
            }
        })
    }

    const cmdDiv = createCmdDiv();
    const cBoard = mainUI.createCBoard();
    const {
    	miniBoard,
    	btnFile,
    	btnRule,
    	btnSide,
    	btnSize,
    	btnMode,
    	btnLock,
    	btnAuto,
    	btnBlack,
    	btnWhite,
    	btnLabel,
    	btnSave,
    	btnEdit,
    	titleBox,
    	commentBox,
    	btnRandomRotate,
    	btnAutoPut,
    	btnPushGame,
    	btnNextPage
    } = mainUI.getChildsForVarname();
    
    function setBusy(isBusy) {
    	btnSave.disabled = btnEdit.disabled = !!isBusy;
    }
    
    function outputProgress(progress) {
    	log1(`${(progress*100).toFixed(2)}%`)
    }
    
    function getFileName(path) {
        let temp = path.split(".");
        temp.pop();
        temp = temp.join(".");
        return temp.split("\\").pop();
    }
    
    //------------------------ GAMES ------------------------ 
    const games = [];
    
    function mapLb(callback) {
    	cBoard.map(p => {
    		p.type != TYPE_NUMBER && callback(p);
    	})
    }
    
    function getMaxChar(startChar = "A") { // 搜索棋盘上最大的字母;
    	let code = startChar.charCodeAt();
    	mapLb(p => {
    		if (p.text.length == 1) {
    			let tcode = p.text.charCodeAt(0);
    			if (tcode >= code && tcode <= (code + 25))
    				code = tcode < (code + 25) ? tcode + 1 : tcode;
    		}
    	})
    	return String.fromCharCode(code);
    }
    
    function getMaxNum(minNum = 1, maxNum = 225) {
    	let code = minNum;
    	mapLb(p => {
    		let tcode = p.text * 1;
    		if (tcode >= code && tcode <= maxNum) {
    			code = tcode < maxNum ? tcode + 1 : tcode;
    		}
    	})
    	return code;
    }

    function wLb(board, idx, txt) {
    	const type = board.P[idx] && board.P[idx].type;
    	if (type == TYPE_EMPTY) {
    		board.wLb(idx, txt, board.bNumColor)
    	}
    	else if((type & TYPE_NUMBER) == TYPE_NUMBER) {
    		board.P[idx].text = txt;
    		board._printPoint(idx, true);
    	}
    }
    
    function cleLb(board, idx) {
    	const type = board.P[idx] && board.P[idx].type;
    	if (type == TYPE_MARK) {
    		board.cleLb(idx)
    	}
    	else if((type & TYPE_NUMBER) == TYPE_NUMBER) {
    		board.P[idx].text = "";
    		board._printPoint(idx, true);
    	}
    }
    
    function printLabels(board, labels = []) {
    	labels.map(str => {
    		const [code,label] = str.split(",");
    		const idx = board.moveCode2Points(code)[0];
    		wLb(board, idx, label);
    	})
    }
    
    function getArray(game) {
    	const size = getSize();
    	const arr = game || new Array(226).fill(0);
    	for (let x = 0; x < 15; x++) {
    		for (let y = 0; y < 15; y++) {
    			const idx = y * 15 + x;
    			if (arr[idx] < 1) {
    				arr[idx] = x < size && y < size ? 0 : -1;
    			}
    		}
    	}
    	return arr;
    }
    
    function getSide(game) {
    	const side = btnSide.input.value * 1;
    	if (side) return side;
    	else {
    		const arr = getArray(game);
    		let numBlackStones = 0, numWhiteStones = 0;
    		arr.map(v => { v == 1 && numBlackStones++; v == 2 && numWhiteStones++ })
    		return numWhiteStones < numBlackStones ? 2 : 1;
    	}
    }
    
    function getRapfiRule() {
    	return btnRule.input.value * 1;
    }
    
    function getRenjuRule() {
    	return 	{0: 1,2: 2}[getRapfiRule()]
    }
    
    function getSize() {
    	return btnSize.input.value * 1;
    }
    
    function getTitle(gameIndex) {
    	const game = games[gameIndex];
    	return (game && game.title || "").split("\n").join("");
    }
    
    function getComment(gameIndex) {
    	const game = games[gameIndex];
    	return game && game.comment || "";
    }
    
    function getLabels(gameIndex) {
    	const game = games[gameIndex];
    	return game && game.labels;
    }
    
    function setLabels(game, board) {
    	const labels = [];
    	board.P.map((p, i) => {
    		const type = p.type;
    		p.type != TYPE_NUMBER && p.text && p.text != EMOJI_STAR_BLACK && labels.push(`${board.points2MoveCode([i])},${p.text}`)
    	})
    	labels.length && (game.labels = labels)
    }
    
    function setStones(game, board) {
    	game.stones = board.getCodeType(TYPE_NUMBER) || undefined;
    	game.blackStones = board.getCodeType(TYPE_BLACK) || undefined;
    	game.whiteStones = board.getCodeType(TYPE_WHITE) || undefined;
    	game.sequence = board.MSindex + 1;
    }
    
    function createGame(array, board) {
    	board.getCodeType(TYPE_NUMBER) && setStones(array, board);
    	setLabels(array, board);
    	return array;
    }
    
    function changeGame() {
    	const array = miniBoard.getArray();
    	games[gameIndex].sequence && setStones(array, miniBoard);
    	setLabels(array, miniBoard);
    	Object.assign(games[gameIndex], array);
    }
    
    function getRandomRotate() {
    	return !!btnRandomRotate.input.value;
    }
    
    function getModes(value = btnMode.input.value) {
    	const modes = BTNMODE_SETTINGS.find((v,i) => BTNMODE_SETTINGS[i-3] == value);
    	return modes
    }
    
    /**
	 * 传入 games ， 转成 puzzleAI 专用 Puzzles 对象
 	*/
    function createPuzzles(games) {
    	const puzzles = [];
    	games.map((game, i) => {
    		puzzles.push({
    			arr: getArray(game),
    			side: getSide(game),
    			rule: getRapfiRule(),
    			size: getSize(),
    			modes: getModes(),
    			title: getTitle(i),
    			comment: getComment(i),
    			labels: getLabels(i),
    			randomRotate: getRandomRotate(),
    			stones: game.stones,
    			blackStones: game.blackStones,
    			whiteStones: game.whiteStones,
    			options: game.options,
    			mark: game.mark,
    			mode: game.mode,
    			level: game.level,
    			image: game.image,
    			rotate: game.rotate,
    			delayHelp: game.delayHelp,
    			sequence: game.sequence
    		})
    	})
    	return puzzles;
    }
    
    function pushGame(array) {
        gameIndex++;
        games.splice(gameIndex, 0, array);
    }

    function nextGame() {
        if (gameIndex + 1 < games.length) {
            loadGame(++gameIndex);
        }
    }

    function preGame() {
        if (gameIndex - 1 >= 0) {
            loadGame(--gameIndex);
        }
    }

    function loadGame(idx) {
    	if (0 <= idx && idx < games.length) {
            gameIndex = idx;
            const game = games[gameIndex];
            if (game.stones || game.blackStones || game.whiteStones) {
            	miniBoard.unpackCode(`${game.stones}{${game.blackStones}}{${game.whiteStones}}`, undefined, true)
            }
            else {
            	miniBoard.unpackArray(game);
            }
            printLabels(miniBoard, game.labels);
            titleBox.value = game.title || "";
            commentBox.value = game.comment || "";
            log1(`第${gameIndex+1}题 / ${games.length}题`);
        }
        else if(games.length == 0) {
        	miniBoard.cle();
        	titleBox.value = commentBox.value = "";
            log1(`第${gameIndex+1}题 / ${games.length}题`);
        }
    }

    function removeGame(idx) {
        if (0 <= idx && idx < games.length) {
            games.splice(idx, 1);
            gameIndex = idx;
            gameIndex >= games.length && (gameIndex = games.length - 1);
            loadGame(gameIndex);
        }
    }
    
    //------------------------ 

    async function lockArea() {
        if (status == UNLOCK) {
            setFirstArea();
            btnLock.setChecked(true);
            await cBoard.lockArea();
            btnAuto.checked && btnWhite.defaultontouchend();
            setcBoardClick();
            status = LOCK;
        }
    }
    
    async function unlockArea() {
        if (status == LOCK) {
            btnLock.setChecked(false);
            cBoard.unlockArea();
            status = UNLOCK;
        }
    }
    
    let autoPushing = false;
    async function autoPushGame() {
    	if (autoPushing) return autoPushing = false;
    	const { butCode } = await msgbox({
    		title: `是否开启自动扫描模式?\n1.确保已经打开文件\n2.确保每页图片坐标大小一致\n3.选定棋盘`,
    		butNum: 2
    	})
    	if (butCode == 1 && renjuEditor.numPages) {
    		autoPushing = true;
    		do {
    			await puzzleCoder.wait(500);
    			if (!(await btnAutoPut.touchend())) break;
    			await puzzleCoder.wait(100);
    			await btnPushGame.touchend();
    			await puzzleCoder.wait(100);
    			if (!(await btnNextPage.touchend())) break;
    		} while(autoPushing);
    		autoPushing = false;
    	}
    }

    //------------------------ firstArea -----------------------

    let canSetFirstArea = true;
    let firstArea = null;

    function setFirstArea() {
        if (canSetFirstArea) {
            firstArea = {
                scale: cBoard.scale,
                scrollLeft: cBoard.viewBox.scrollLeft,
                scrollTop: cBoard.viewBox.scrollTop,
                left: parseInt(cBoard.cutDiv.style.left),
                top: parseInt(cBoard.cutDiv.style.top)
            };
            canSetFirstArea = false;
        }
    }

    function getFirstArea() {
        return {
            scale: firstArea ? firstArea.scale : 1,
            scrollLeft: firstArea ? firstArea.scrollLeft : 0,
            scrollTop: firstArea ? firstArea.scrollTop : 0,
            left: firstArea ? firstArea.left : 0,
            top: firstArea ? firstArea.top : 0
        }
    }
    
    //------------------------ Events ---------------------------

    let cBoardClickLockMode = ()=>{};
    let cBoardClickManualMode = ()=>{};
    
    function setcBoardClick() {
    	if (btnAuto.checked) {
    		cBoardClickLockMode = autoStoneLockMode;
    		cBoardClickManualMode = autoStoneLockMode;
    	}
    	else if (btnBlack.checked) {
    		cBoardClickLockMode = blackStoneLockMode;
    		cBoardClickManualMode = blackStoneManualMode;
    	}
    	else if (btnWhite.checked) {
    		cBoardClickLockMode = whiteStoneLockMode;
    		cBoardClickManualMode = whiteStoneManualMode;
    	}
    	else {
    		const getChar = [getMaxChar, () => getMaxChar("a"), getMaxNum][btnLabel.input.value];
    		cBoardClickLockMode = (idx) => labelLockMode(idx, getChar());
    		cBoardClickManualMode = (idx) => labelManualMode(idx, getChar());
    	}
    }
    
    function autoStoneLockMode(idx) {
    	if ((cBoard.P[idx].type & TYPE_NUMBER) == TYPE_NUMBER) {
    		cBoard.cleNb(idx, true);
    	}
    	else if (cBoard.P[idx].type == TYPE_EMPTY) {
    		cBoard.wNb(idx, "auto", true);
    	}
    }
    
    function blackStoneLockMode(idx) {
    	if (cBoard.P[idx].type == TYPE_NUMBER) {
    		cBoard.cleNb(idx, true);
    	}
    	else if ((cBoard.P[idx].type & TYPE_NUMBER) == TYPE_NUMBER) {
    		cBoard.P[idx].cle();
    	}
    	else if (cBoard.P[idx].type == TYPE_EMPTY) {
    		cBoard.P[idx].printNb(EMOJI_STAR_BLACK, "black", cBoard.gW, cBoard.gH, cBoard.bNumColor);
    	}
    }
    
    function whiteStoneLockMode(idx) {
    	if (cBoard.P[idx].type == TYPE_NUMBER) {
    		cBoard.cleNb(idx, true);
    	}
    	else if ((cBoard.P[idx].type & TYPE_NUMBER) == TYPE_NUMBER) {
    		cBoard.P[idx].cle();
    	}
    	else if (cBoard.P[idx].type == TYPE_EMPTY) {
    		cBoard.P[idx].printNb(EMOJI_STAR_BLACK, "white", cBoard.gW, cBoard.gH, cBoard.wNumColor);
    	}
    }
    
    function blackStoneManualMode(idx) {
    	if ((cBoard.P[idx].type & TYPE_NUMBER) == TYPE_NUMBER) {
    		cBoard.cleNb(idx, true);
    	}
    	else if (cBoard.P[idx].type == TYPE_EMPTY) {
    		cBoard.wNb(idx, "black", true)
    	}
    }
    
    function whiteStoneManualMode(idx) {
    	if ((cBoard.P[idx].type & TYPE_NUMBER) == TYPE_NUMBER) {
    		cBoard.cleNb(idx, true);
    	}
    	else if (cBoard.P[idx].type == TYPE_EMPTY) {
    		cBoard.wNb(idx, "white", true)
    	}
    }
    
    function labelLockMode(idx, txt) {
    	if (cBoard.P[idx].type == TYPE_NUMBER) return;
    	const type = cBoard.P[idx].type;
    	const color1 = cBoard.P[idx].color;
    	const color = color1 == cBoard.bNumColor ? "black" : "white";
    			
    	if (cBoard.P[idx].text && cBoard.P[idx].text != EMOJI_STAR_BLACK) {
    		if ((cBoard.P[idx].type & TYPE_NUMBER) == TYPE_NUMBER) {
    			cBoard.P[idx].printNb("", color, cBoard.gW, cBoard.gH, color1);
    			cBoard.P[idx].type = type;
    		}
    		else
    			cleLb(cBoard, idx);
    	}
    	else {
    		if ((cBoard.P[idx].type & TYPE_NUMBER) == TYPE_NUMBER) {
    			cBoard.P[idx].printNb(txt, color, cBoard.gW, cBoard.gH, color1);
    			cBoard.P[idx].type = type;
    		}
    		else
    			wLb(cBoard, idx, txt);
    	}
    }
    
    function labelManualMode(idx, txt) {
    	if (cBoard.P[idx].type == TYPE_NUMBER) return;
    	if (cBoard.P[idx].text) {
    		cleLb(cBoard, idx);
    	}
    	else {
    		wLb(cBoard, idx, txt);
    	}
    }
    
    function addEvents(cbd) {
        function ctnBack(idx) { // 触发快速悔棋
            if (idx + 1 && cbd.P[idx].type == TYPE_NUMBER) {
                if (idx != cbd.MS[cbd.MSindex]) {
                    while (cbd.MS[cbd.MSindex] != idx) {
                        cbd.cleNb(cbd.MS[cbd.MSindex], true);
                    }
                }
            }
        }
        bindEvent.setBodyDiv(mainUI.bodyDiv, mainUI.bodyScale, mainUI.upDiv);
        bindEvent.addEventListener(cbd.viewBox, "click", (x, y) => {
            if (status == LOCK) {
                const idx = cbd.getIndex(x, y);
    			if (idx < 0) return;
    			cBoardClickLockMode(idx);
            }
            else if (status == UNLOCK) {
                const p = { x: x, y: y };
                cbd.setxy(p, event && event.type == "click" ? 2 : 1);
                cbd.setCutDiv(p.x, p.y, true);
                cbd.resetP();
                cbd.printBorder();
            }
            else if (status == MANUAL) {
                const idx = cbd.getIndex(x, y);
    			if (idx < 0) return;
    			cBoardClickManualMode(idx)
            }
        })
        bindEvent.addEventListener(cbd.viewBox, "dblclick", (x, y) => {
            if (status == MANUAL) {
                let idx = cbd.getIndex(x, y);
                ctnBack(idx)
            }
        })
        bindEvent.addEventListener(cbd.viewBox, "dbltouchstart", (x, y) => {
            status == UNLOCK && cbd.selectArea(x, y)
        })
        bindEvent.addEventListener(cbd.viewBox, "contextmenu", (x, y) => {
            if (status == UNLOCK) cbd.selectArea(x, y)
            else if (status == LOCK) {
            	const idx = cbd.getIndex(x, y);
                if (idx < 0) return;
                const moveX = ~~((miniBoard.size - 1) / 2) - (idx % 15);
                const moveY = ~~((miniBoard.size - 1) / 2) - ~~(idx / 15);
                const arr = cBoard.getArray();
        		arr.find(v => v > 0) ? (pushGame(createGame(arr, cBoard)), loadGame(gameIndex), miniBoard.translate(moveY, moveX), changeGame(), window.setBlockUnload(true)) : window.warn("空棋盘");
            }
        })
        bindEvent.addEventListener(cbd.viewBox, "zoomstart", (x1, y1, x2, y2) => {
            cbd.zoomStart(x1, y1, x2, y2)
        })
        
        bindEvent.addEventListener(miniBoard.viewBox, "click", (x, y) => {
        	autoPushGame();
        })
        bindEvent.addEventListener(miniBoard.viewBox, "zoomstart", (x1, y1, x2, y2) => {
        	miniBoard.zoomStart(x1, y1, x2, y2)
        })
        bindEvent.addEventListener(miniBoard.viewBox, "contextmenu", (x, y) => {
			miniBoard.setScale(miniBoard.scale != 1 ? 1 : 1.5, true);
		})
		titleBox.viewElem.addEventListener("input", () => games[gameIndex] && (games[gameIndex].title = titleBox.value))
		commentBox.viewElem.addEventListener("input", () => games[gameIndex] && (games[gameIndex].comment = commentBox.value))
    }
    
    async function onloadPage(pageIndex, numPages, url) {
        const {scale, scrollLeft, scrollTop, left, top} = getFirstArea();
        canSetFirstArea = true;
        await cBoard.loadImgURL(url);
        cBoard.putImg(cBoard.bakImg, cBoard.canvas);
        cBoard.zoom(scale);
        cBoard.viewBox.scrollLeft = scrollLeft;
        cBoard.viewBox.scrollTop = scrollTop;
        if (cBoard.cutDiv.parentNode) cBoard.moveArea(left, top);
        else cBoard.resetCutDiv();
        status = UNLOCK;
        btnLock.setChecked(false);
        log(`第${pageIndex}页 / ${numPages}页`);
    }
	
	//------------------ load -----------------------------
	
	
    btnAuto.defaultontouchend();
    setcBoardClick();
    addEvents(cBoard);
    mainUI.loadTheme().then(() => mainUI.viewport.resize());
    renjuEditor.onloadPage = onloadPage;
    log("打开(pdf,zip,jpg,png,json)");
    log1(`第${0}题 / ${0}题`);
})()
