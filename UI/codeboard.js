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
                    -1, "H线对称翻转次数", "disabled",
					0, "翻转 0", "radio",
					1, "翻转 1", "radio"
				],
                change: function() {
                    numFilpY = this.input.value * 1;
                    setTimeout(() => this.bindButton.setText(this.text), 100)
                },
                reset: function() {
                    this.input.value = 0;
                    numFilpY = this.input.value * 1;
				    this.getOption(this.input.value).li.click();
                },
                onshowmenu: function() {
                    this.menu.scrollToOption(this.getOption(this.input.value));
                }
            },
            {
                varName: "menuCodeType",
                type: "select",
                text: "iwzq",
                options: [
                    -1, "选择代码模式", "disabled",
					0, "iwzq", "radio",
					1, "renju2002", "radio",
					2, "renjutool", "radio"
				],
                change: function() {
                    const codeTypeArr = ["iwzq", "renju2002", "renjutool"];
                    strCodeType = codeTypeArr[this.input.value];
                    setTimeout(() => this.bindButton.setText(this.text), 100);
                    code && outputCode(strCodeType)
                },
                reset: function() {
                    this.input.value = 0;
                    strCodeType = "iwzq";
				    this.getOption(this.input.value).li.click();
                },
                onshowmenu: function() {
                    this.menu.scrollToOption(this.getOption(this.input.value));
                }
            },
            {
                varName: "menuCW",
                type: "select",
                text: "右旋 0",
                options: [
                    -1, "H8中心正转90°次数", "disabled",
					0, "右旋 0", "radio",
					1, "右旋 1", "radio",
					2, "右旋 2", "radio",
					3, "右旋 3", "radio"
				],
                change: function() {
                    numCW = this.input.value * 1
                    setTimeout(() => this.bindButton.setText(this.text), 100)
                },
                reset: function() {
                    this.input.value = 0;
                    numCW = this.input.value * 1;
				    this.getOption(this.input.value).li.click();
                },
                onshowmenu: function() {
                    this.menu.scrollToOption(this.getOption(this.input.value));
                }
            },
            {
                varName: "menuMoveX",
                type: "select",
                text: "横移 0",
                options: [
                    -99, "横向偏移子数", "disabled",
					-9, "横移-9", "radio",
					-8, "横移-8", "radio",
					-7, "横移-7", "radio",
					-6, "横移-6", "radio",
					-5, "横移-5", "radio",
					-4, "横移-4", "radio",
					-3, "横移-3", "radio",
					-2, "横移-2", "radio",
					-1, "横移-1", "radio",
					0, "横移 0", "radio",
					1, "横移 1", "radio",
					2, "横移 2", "radio",
					3, "横移 3", "radio",
					4, "横移 4", "radio",
					5, "横移 5", "radio",
					6, "横移 6", "radio",
					7, "横移 7", "radio",
					8, "横移 8", "radio",
					9, "横移 9", "radio"
				],
                change: function() {
                    numMoveX = this.input.value * 1
                    setTimeout(() => this.bindButton.setText(this.text), 100)
                },
                reset: function() {
                    this.input.value = 0;
                    numMoveX = this.input.value * 1;
				    this.getOption(this.input.value).li.click();
                },
                onshowmenu: function() {
                    this.menu.scrollToOption(this.getOption(this.input.value));
                }
            },
            {
                varName: "menuMoveY",
                type: "select",
                text: "竖移 0",
                options: [
                    -99, "竖向偏移子数", "disabled",
					-9, "竖移-9", "radio",
					-8, "竖移-8", "radio",
					-7, "竖移-7", "radio",
					-6, "竖移-6", "radio",
					-5, "竖移-5", "radio",
					-4, "竖移-4", "radio",
					-3, "竖移-3", "radio",
					-2, "竖移-2", "radio",
					-1, "竖移-1", "radio",
					0, "竖移 0", "radio",
					1, "竖移 1", "radio",
					2, "竖移 2", "radio",
					3, "竖移 3", "radio",
					4, "竖移 4", "radio",
					5, "竖移 5", "radio",
					6, "竖移 6", "radio",
					7, "竖移 7", "radio",
					8, "竖移 8", "radio",
					9, "竖移 9", "radio"
				],
                change: function() {
                    numMoveY = this.input.value * 1;
                    setTimeout(() => this.bindButton.setText(this.text), 100)
                },
                reset: function() {
                    this.input.value = 0;
                    numMoveY = this.input.value * 1;
				    this.getOption(this.input.value).li.click();
                },
                onshowmenu: function() {
                    this.menu.scrollToOption(this.getOption(this.input.value));
                }
            },
        ];
        
        const btnSettings = [
            {
                varName: "btnCopy",
                type: "button",
                text: "复制",
                touchend: function() {
                    // 获取焦点避免copy()时报错 Document is not focused
                    this.input.focus(); 
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
                .then(() => warn("代码已复制到剪贴板", 500))
                .catch(e => {msgbox("复制代码失败")})
        }
        
        async function paste() {
            return navigator.clipboard.readText()
                .then(str => textarea.value = str)
                .catch(e => {textarea.value = "粘贴失败，请在浏览器设置里面找到权限设置，再给本网站授权访问剪贴板。如果你在用的浏览器不能访问剪贴板，请更换最新的 Chrome 浏览器。"})
        }
        
        function actions() {
            let strWarn = "";
            const oldSize = cBoard.size;
            cBoard.setSize(15);
            for (let i = 0; i < numFilpY; i++) {
                cBoard.rotateY180()
            } 
            numFilpY > 0 && (strWarn += `翻转 ${numFilpY} `);
            for (let i = 0; i < numCW; i++) {
                cBoard.rotate90()
            }
            numCW > 0 && (strWarn += `右转 ${numCW} `);
            numMoveX && cBoard.translate(0, numMoveX) && (strWarn += `横移 ${numMoveX} `);
            numMoveY && cBoard.translate(numMoveY, 0) && (strWarn += `竖移 ${numMoveY} `);
            cBoard.setSize(oldSize);
            strWarn && self.warn && warn(strWarn, 500)
        }
        
        function inputCode() {
            cBoard.inputCode(textarea.value, strCodeType);
            actions();
            code = cBoard.getCodeURL();
        }
        
        function outputCode() {
            cBoard.unpackCodeURL(code);
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
            open: async function(codeStr = "", boardSize = 15) {
                return new Promise(resolve => {
                    this.resolve = resolve;
                    open(codeStr);
                    code = codeStr;
                    cBoard.setSize(boardSize);
                    code && outputCode()
                })
            },
            loadTheme: loadTheme
        }
        return codeboard;
    } catch (e) { alert(e.message || e.toString()) }
})();