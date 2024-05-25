(() => {
	try {
		"use strict";
		const d = document;
		const dw = d.documentElement.clientWidth;
		const dh = d.documentElement.clientHeight;
		const labels = ["■", "▲", "◆", "●"];
		const colors = ["black", "red", "green", "white"];

		const fileButtonSettings = [
			undefined,
			{
				type: "button",
				text: "分享图片",
				touchend: async function() {
					share(cBoard);
				}
    	},
			{
				type: "button",
				text: "使用帮助",
				touchend: async function() {
					window.open("./help/tuyahelp/tuyahelp.html", "_self");
				}
    	},
			undefined,
			{
				type: "file",
				text: "打开图片",
				change: async function() {
					await game.openImg(this);
					window.setBlockUnload(true);
					this.value = "";
				},
				reset: function() {
					this.input.accept = "image/*";
				}
    	},
			{
				varName: "btnLockArea",
				type: "checkbox",
				text: "选定棋盘",
				touchend: async function() {
					if (game.state != WAITING) this.checked && game.lockArea() || game.unlockArea();
					else this.setChecked(false)
				}
    	},
			{
				type: "select",
				text: "15 行",
				options: [15, "15 行", 14, "14 行", 13, "13 行", 12, "12 行", 11, "11 行", 10, "10 行", 9, "9 行", 8, "8 行", 7, "7 行", 6, "6 行"],
				change: function() {
					game.sltyChang(this.input.value);
				}
    	},
			{
				type: "select",
				text: "15 列",
				options: [15, "15 列", 14, "14 列", 13, "13 列", 12, "12 列", 11, "11 列", 10, "10 列", 9, "9 列", 8, "8 列", 7, "7 列", 6, "6 列"],
				change: function() {
					game.sltxChang(this.input.value);
				}
    	}];

		const markButtonSettings = [
			{
				type: "button",
				text: "‖<<",
				touchend: async function() {
					game.toStart(true);
				}
    	},
			{
				type: "button",
				text: "<<",
				touchend: async function() {
					game.toPrevious(true);
				}
    	},
			{
				type: "button",
				text: ">>",
				touchend: async function() {
					game.toNext(true);
				}
    	},
			{
				type: "button",
				text: ">>‖",
				touchend: async function() {
					game.toEnd(true);
				}
    	},
			{
				varName: "btnBlackWhite",
				type: "radio",
				text: "黑先棋子",
				group: "mark"
    	},
			{
				varName: "btnWhiteBlack",
				type: "radio",
				text: "白先棋子",
				group: "mark"
    	},
			{
				varName: "btnGreenRed",
				type: "radio",
				text: "绿红数字",
				group: "mark"
    	},
			{
				varName: "btnRedGreen",
				type: "radio",
				text: "红绿数字",
				group: "mark"
    	},
			{
				varName: "btnLabel01",
				type: "radio",
				text: `${labels[0]} \b标记`,
				group: "mark"
    	},
			{
				varName: "btnLabel02",
				type: "radio",
				text: `${labels[1]} \b标记`,
				group: "mark"
    	},
			{
				varName: "btnLabel03",
				type: "radio",
				text: `${labels[2]} \b标记`,
				group: "mark"
    	},
			{
				varName: "btnLabel04",
				type: "radio",
				text: `${labels[3]} \b标记`,
				group: "mark",
				touchend: async function() {
					game.markChange(this)
				}
    	},
			{
				varName: "btnColor01",
				type: "checkbox",
				text: "黑色标记",
				group: "color",
				mode: "radio",
				//reset: function() { this.setColor("black") }
    	},
			{
				varName: "btnColor02",
				type: "checkbox",
				text: "红色标记",
				group: "color",
				mode: "radio",
				//reset: function() { this.setColor("red") }
    	},
			{
				varName: "btnColor03",
				type: "checkbox",
				text: "绿色标记",
				group: "color",
				mode: "radio",
				//reset: function() { this.setColor("green") }
    	},
			{
				varName: "btnColor04",
				type: "checkbox",
				text: "白色标记",
				group: "color",
				mode: "radio",
				touchend: async function() {
					game.colorChange(this)
				},
				//reset: function() { this.setColor("white") }
    	}];


		const fileCmdDiv = mainUI.createCmdDiv({ varName: "fileCmdDiv" });
		//const markCmdDiv = mainUI.createCmdDiv({varName: "markCmdDiv"});

		const cBoard = mainUI.createCBoard({ varName: "cBoard" });

		dw > dh && fileButtonSettings.splice(0, 0, ...new Array(8))
		mainUI.addButtons(mainUI.createButtons(fileButtonSettings.concat(markButtonSettings)), fileCmdDiv, 2);
		const {
			btnBlackWhite,
			btnWhiteBlack,
			btnGreenRed,
			btnRedGreen,
			btnLabel01,
			btnLabel02,
			btnLabel03,
			btnLabel04,
			btnColor01,
			btnColor02,
			btnColor03,
			btnColor04,
			btnLockArea
		} = mainUI.getChildsForVarname();

		const WAITING = -1;
		const LOCK = 0;
		const UNLOCK = 1;
		const game = {
			state: WAITING,
			color: colors[0],
			label: labels[0],
			addMark: function() {},
			reset: function() {
				cBoard.firstColor = "black";
				cBoard.cle();
				this.resetButtons();
			},
			resetButtons: function() {
				btnLockArea.setChecked(false);
				btnBlackWhite.setChecked(true);
				btnColor01.setChecked(true);
				this.markChange(btnBlackWhite);
				this.colorChange(btnColor01);
			},
			openImg: async function(fileInput) {
				await cBoard.loadImgFile(fileInput.files[0]);
				fileInput.value = "";
				await cBoard.putImg(cBoard.bakImg, cBoard.canvas, cBoard.width / 13);
				cBoard.resetCutDiv();
				cBoard.cle();
				mainUI.viewport.userScalable();
				this.state = UNLOCK;
				btnLockArea.setChecked(false);
			},
			lockArea: async function() {
				await cBoard.lockArea();
				cBoard.cle();
				mainUI.viewport.resize();
				this.state = LOCK;
				btnLockArea.setChecked(true);
			},
			unlockArea: async function() {
				await cBoard.unlockArea();
				cBoard.cle();
				mainUI.viewport.userScalable();
				this.state = UNLOCK;
				btnLockArea.setChecked(false);
			},
			markChange: async function(btn) {
				if ([btnBlackWhite, btnWhiteBlack].indexOf(btn) + 1) {
					cBoard.wNumColor = "white";
					cBoard.bNumColor = "black";
					cBoard.wNumFontColor = "black";
					cBoard.bNumFontColor = "white";
					cBoard.printNb = printNb;
					this.addMark = (idx) => cBoard.wNb(idx, "auto", true);
				}
				else if ([btnGreenRed, btnRedGreen].indexOf(btn) + 1) {
					cBoard.wNumFontColor = "red";
					cBoard.bNumFontColor = "green";
					cBoard.printNb = printLb;
					this.addMark = (idx) => cBoard.wNb(idx, "auto", true);
				}
				else {
					this.label = labels[[btnLabel01, btnLabel02, btnLabel03, btnLabel04].indexOf(btn)] || this.label;
					cBoard.printLb = printLb;
					this.addMark = (idx) => cBoard.wLb(idx, this.label, this.color);
				}

				if ([btnBlackWhite, btnGreenRed].indexOf(btn) + 1) {
					cBoard.firstColor = "black";
				}
				else if ([btnWhiteBlack, btnRedGreen].indexOf(btn) + 1) {
					cBoard.firstColor = "white";
				}

				if (this.state == LOCK) {
					const index = cBoard.MSindex;
					while (cBoard.MSindex + 1) cBoard.toPrevious()
					while (cBoard.MSindex < index) cBoard.toNext()
				}
			},
			colorChange: async function(btn) {
				this.color = colors[[btnColor01, btnColor02, btnColor03, btnColor04].indexOf(btn)] || "black";
			},
			boardChange: async function() {
				cBoard.resetP(cBoard.cutDiv);
				if (this.state == UNLOCK) {
					cBoard.cleBorder();
					cBoard.printBorder();
				}
				else {
					this.unlockArea();
				}
			},
			sltxChang: async function(value) {
				cBoard.SLTX = value;
				this.boardChange();
			},
			sltyChang: async function(value) {
				cBoard.SLTY = value;
				this.boardChange();
			},
			toStart: function() {
				cBoard.toStart()
			},
			toEnd: function() {
				cBoard.toEnd()
			},
			toPrevious: function() {
				cBoard.toPrevious()
			},
			toNext: function() {
				cBoard.toNext()
			},
			boardClick: function(idx) {
				if (cBoard.P[idx].type == TYPE_EMPTY) {
					this.addMark(idx);
				}
				else if (cBoard.P[idx].type == TYPE_NUMBER) {
					this.toPrevious();
				}
				else if (cBoard.P[idx].type == TYPE_MARK) {
					cBoard.cleLb(idx)
				}
			},
			continueBack: function(idx) { // 触发快速悔棋
				if (idx + 1 && cBoard.P[idx].type == TYPE_NUMBER) {
					while (cBoard.MS[cBoard.MSindex] != idx) {
						this.toPrevious()
					}
				}
			}
		}


		function printNb(idx, showNum) {
			let ctx = this.canvas.getContext("2d"),
				pointInfo = this.getBoardPointInfo(idx, showNum);
			this.printCircle(pointInfo.circle, ctx);
			this.printText(pointInfo.text, ctx);
			ctx = null;
		}

		function printLb(idx, showNum) {
			let ctx = this.canvas.getContext("2d"),
				pointInfo = this.getBoardPointInfo(idx, showNum);
			//pointInfo.circle.radius = pointInfo.circle.radius / 2;
			//pointInfo.circle.fill = pointInfo.circle.color = "white";
			//this.printCircle(pointInfo.circle, ctx);
			this.printText(pointInfo.text, ctx);
			ctx = null;
		}

		//------------------------ Events ---------------------------

		function addEvents() {
			bindEvent.setBodyDiv(mainUI.bodyDiv, mainUI.bodyScale, mainUI.upDiv);
			bindEvent.addEventListener(cBoard.viewBox, "click", (x, y) => {
				if (game.state == LOCK) {
					const idx = cBoard.getIndex(x, y);
					game.boardClick(idx);
				}
				else if (game.state == UNLOCK) {
					const p = { x: x, y: y };
					cBoard.setxy(p, event && event.type == "click" ? 2 : 1);
					cBoard.setCutDiv(p.x, p.y, true);
					cBoard.resetP();
					cBoard.printBorder();
				}
			})
			bindEvent.addEventListener(cBoard.viewBox, "dblclick", (x, y) => {
				const idx = cBoard.getIndex(x, y);
				game.state == LOCK && game.continueBack(idx);
			})
			bindEvent.addEventListener(cBoard.viewBox, "contextmenu", (x, y) => {
				game.state == UNLOCK && cBoard.selectArea(x, y)
			})
			bindEvent.addEventListener(cBoard.viewBox, "dbltouchstart", (x, y) => {
				game.state == UNLOCK && cBoard.selectArea(x, y)
			})
			bindEvent.addEventListener(cBoard.viewBox, "zoomstart", (x1, y1, x2, y2) => {
				cBoard.zoomStart(x1, y1, x2, y2)
			})
		}

		//---------------------- onload ------------------------------

		cBoard.hideLastMove = true;
		cBoard.loadImgURL("./tuya/start.png")
			.then(() => cBoard.putImg())
			.then(() => game.reset())
			.then(() => mainUI.loadTheme())
			.then(() => mainUI.viewport.resize())
		
		addEvents();

	} catch (e) { alert(e.stack) }
})()