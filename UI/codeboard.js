/*------ 棋谱代码窗口 ------*/
window.codeboard = (() => {
    try {
        "use strict";
        const d = document;
        const dw = d.documentElement.clientWidth;
        const dh = d.documentElement.clientHeight;
        const gridWidth = 980;
        const tempWidth = gridWidth * (dw > dh ? 2 : 1);
        const scale = dw / (dw / dh > 2 ? dw / dh * gridWidth : tempWidth);
        const winWidth = dw / scale;
        const winHeight = dh / scale;
        const ANIMATION_TIMEOUT = 300;
        
        let code = "";
        let numFilpY, numCW, numMoveX, numMoveY, strCodeType;

        let color = "black";
		let backgroundColor = "#d0d0d0";
		let textareaBackgroundColor = "white";

        const coverArea = document.createElement("div");
        coverArea.ontouch = function() { if (event) event.preventDefault(); };

        const codeWindow = document.createElement("div");
        codeWindow.ontouch = function() { if (event) event.preventDefault(); };
        coverArea.appendChild(codeWindow);

        const textarea = document.createElement("textarea");
        codeWindow.appendChild(textarea);

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
        Object.assign(codeWindow.style, {
            position: "relative",
            width: wdWidth + "px",
            height: wdHeight + "px",
            top: wdTop,
            left: wdLeft,
            backgroundColor: backgroundColor,
            border: `0px solid `
        })
        const fontSize = ~~(wdWidth / 20);
        const textWidth = ~~(wdWidth - 10 * 2);
        const textHeight = ~~(wdHeight / 2);
        Object.assign(textarea.style, {
            position: "absolute",
            width: textWidth + "px",
            height: textHeight + "px",
            top: 10 + "px",
            left: 10 + "px",
            border: `0px solid black`,
            fontSize: fontSize + "px"
        })
        
        const menuSettings = [
            {
                varName: "menuFlipY",
                type: "select",
                text: "翻转 0",
                options: [
					0, "翻转 0",
					1, "翻转 1"
				],
                change: function() {
                    numFilpY = this.input.value * 1;
                    setTimeout(() => this.bindButton.setText(this.text), 100)
                },
                reset: function() {
                    this.input.value = 0;
                    numFilpY = this.input.value * 1;
                }
            },
            {
                varName: "menuCodeType",
                type: "select",
                text: "iwzq",
                options: [
					0, "iwzq",
					1, "renju2002"
				],
                change: function() {
                    const codeTypeArr = ["iwzq", "renju2002"];
                    strCodeType = codeTypeArr[this.input.value];
                    setTimeout(() => this.bindButton.setText(this.text), 100);
                    code && outputCode(strCodeType)
                },
                reset: function() {
                    this.input.value = 0;
                    strCodeType = "iwzq";
                }
            },
            {
                varName: "menuCW",
                type: "select",
                text: "右旋 0",
                options: [
					0, "右旋 0",
					1, "右旋 1",
					2, "右旋 2",
					3, "右旋 3"
				],
                change: function() {
                    numCW = this.input.value * 1
                    setTimeout(() => this.bindButton.setText(this.text), 100)
                },
                reset: function() {
                    this.input.value = 0;
                    numCW = this.input.value * 1
                }
            },
            {
                varName: "menuMoveX",
                type: "select",
                text: "平移 0",
                options: [
					-9, "平移-9",
					-8, "平移-8",
					-7, "平移-7",
					-6, "平移-6",
					-5, "平移-5",
					-4, "平移-4",
					-3, "平移-3",
					-2, "平移-2",
					-1, "平移-1",
					0, "平移 0",
					1, "平移 1",
					2, "平移 2",
					3, "平移 3",
					4, "平移 4",
					5, "平移 5",
					6, "平移 6",
					7, "平移 7",
					8, "平移 8",
					9, "平移 9"
				],
                change: function() {
                    numMoveX = this.input.value * 1
                    setTimeout(() => this.bindButton.setText(this.text), 100)
                },
                reset: function() {
                    this.input.value = 0;
                    numMoveX = this.input.value * 1
                }
            },
            {
                varName: "menuMoveY",
                type: "select",
                text: "竖移 0",
                options: [
					-9, "竖移-9",
					-8, "竖移-8",
					-7, "竖移-7",
					-6, "竖移-6",
					-5, "竖移-5",
					-4, "竖移-4",
					-3, "竖移-3",
					-2, "竖移-2",
					-1, "竖移-1",
					0, "竖移 0",
					1, "竖移 1",
					2, "竖移 2",
					3, "竖移 3",
					4, "竖移 4",
					5, "竖移 5",
					6, "竖移 6",
					7, "竖移 7",
					8, "竖移 8",
					9, "竖移 9"
				],
                change: function() {
                    numMoveY = this.input.value * 1;
                    setTimeout(() => this.bindButton.setText(this.text), 100)
                },
                reset: function() {
                    this.input.value = 0;
                    numMoveY = this.input.value * 1
                }
            },
        ];
        
        const btnSettings = [
            {
                varName: "btnCopy",
                type: "button",
                text: "复制",
                touchend: function() {
                    copy()
                }
            },
            {
                varName: "btnPaste",
                type: "button",
                text: "粘贴",
                touchend: function() {
                    paste()
                }
            },
            {
                varName: "btnEnter",
                type: "button",
                text: "输入",
                touchend: function() {
                    inputCode();
                    close();
                    codeboard.resolve(code)
                }
            },
            {
                varName: "btnFlipY",
                type: "button",
                text: "",
                touchend: function() {
                    this.bindButton.showMenu(menuLeft, menuTop)
                }
            },
            {
                varName: "btnCodeType",
                type: "button",
                text: "",
                touchend: function() {
                    this.bindButton.showMenu(menuLeft, menuTop)
                }
            },
            {
                varName: "btnCancel",
                type: "button",
                text: "取消",
                touchend: function() {
                    close();
                    codeboard.resolve("")
                }
            },
            {
                varName: "btnCW",
                type: "button",
                text: "",
                touchend: function() {
                    this.bindButton.showMenu(menuLeft, menuTop)
                }
            },
            {
                varName: "btnMoveX",
                type: "button",
                text: "",
                touchend: function() {
                    this.bindButton.showMenu(menuLeft, menuTop)
                }
            },
            {
                varName: "btnMoveY",
                type: "button",
                text: "",
                touchend: function() {
                    this.bindButton.showMenu(menuLeft, menuTop)
                }
            },
        ];
        
        const menuArr = mainUI.createButtons(menuSettings);
        const buttons = mainUI.createButtons(btnSettings);
        const btnWidth = mainUI.buttonWidth;
        const btnHeight = mainUI.buttonHeight;
        const t = 10 + textHeight;
        const w = ~~((wdWidth - mainUI.buttonWidth * 3) / 4);
        const h = ~~((wdWidth - t - mainUI.buttonHeight * 3) / 4);
        const menuLeft = (winWidth - mainUI.menuWidth) / 2;
        const menuTop = winHeight / 2 - h;
        
        
        menuArr.splice(0, 0, null, null, null);
        menuArr.splice(5, 0, null);
        
        for (let i = 0; i < buttons.length; i++) {
            const button = buttons[i];
            if (menuArr[i]) {
                menuArr[i].bindButton = buttons[i];
                buttons[i].bindButton = menuArr[i];
                buttons[i].setText(menuArr[i].text);
                menuArr[i].move(w + (i % 3) * (btnWidth + w), t + h + ~~(i / 3) * (btnHeight + h), btnWidth, btnHeight, codeWindow);
            }
            button.move(w + (i % 3) * (btnWidth + w), t + h + ~~(i / 3) * (btnHeight + h), btnWidth, btnHeight, codeWindow);
        }
        
        const cBoard = new CheckerBoard(document.createElement("div"), 0, 0, 13, 13);
        cBoard.showCheckerBoard();
        
        async function copy() {
            return navigator.clipboard.writeText(textarea.value)
                .then(() => warn("代码已复制到剪贴板"))
                .catch(() => msgbox("复制代码失败"))
        }
        
        async function paste() {
            return navigator.clipboard.readText()
                .then(str => textarea.value = str)
                .catch(() => textarea.value = "粘贴失败，请在浏览器设置里面找到权限设置，再给本网站授权访问剪贴板。如果你在用的浏览器不能访问剪贴板，请更换最新的 Chrome 浏览器。")
        }
        
        function actions() {
            for (let i = 0; i < numFilpY; i++) {
                cBoard.rotateY180()
            }
            for (let i = 0; i < numCW; i++) {
                cBoard.rotate90()
            }
            cBoard.translate(0, numMoveX);
            cBoard.translate(numMoveY, 0);
        }
        
        function inputCode() {
            cBoard.inputCode(textarea.value, strCodeType);
            actions();
            code = cBoard.getCode();
        }
        
        function outputCode() {
            cBoard.unpackCode(code);
            actions();
            textarea.value = cBoard.outputCode(strCodeType);
        }

        function open(codeStr) {
            document.body.appendChild(coverArea);
            codeWindow.setAttribute("class", "show");
            code = "";
            cBoard.cle();
            textarea.value = "";
        }

        function close() {
            codeWindow.setAttribute("class", "hide");
            setTimeout(() => {
                coverArea.parentNode.removeChild(coverArea);
            }, ANIMATION_TIMEOUT);
        }
        
        function loadTheme(themes = {}) {
            const msgWindowTheme = themes["msgWindow"] || {};
            color = msgWindowTheme.color || color;
            backgroundColor = msgWindowTheme.backgroundColor || backgroundColor;
            textareaBackgroundColor = msgWindowTheme.textareaBackgroundColor || textareaBackgroundColor;
            codeWindow.style.backgroundColor = backgroundColor;
            textarea.style.color = color;
            textarea.style.backgroundColor = textareaBackgroundColor;
        
            const butTheme = themes["Button"] || {};
            buttons.map(but => but.loadTheme(butTheme));
            menuArr.filter(but => but).map(but => but.loadTheme(butTheme));
        }

        const codeboard = {
            resolve: ()=>{},
            open: async function(codeStr = "") {
                return new Promise(resolve => {
                    this.resolve = resolve;
                    open(codeStr);
                    code = codeStr;
                    code && outputCode()
                })
            },
            loadTheme: loadTheme
        }
        return codeboard;
    } catch (e) { alert(e.message || e.toString()) }
})();