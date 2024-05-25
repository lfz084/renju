(async () => {
    "use strict";
    const d = document;
    const dw = d.documentElement.clientWidth;
    const dh = d.documentElement.clientHeight;
    
    //-----------------------------------------------------------------------
    const fontSize = mainUI.cmdWidth / 28;
    const buttonSettings = [
        mainUI.newComment({
        	varName: "commentBox",
        	id: "comment",
        	type: "div",
        	width: mainUI.buttonWidth * 2.33,
        	height: mainUI.buttonHeight * 5,
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
        mainUI.newComment({
        	varName: "inputBoard",
        	id: "comment",
        	type: "div",
        	width: mainUI.buttonWidth * 2.33,
        	height: mainUI.buttonHeight * 13.5,
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
        		this.viewElem.setAttribute("class", "viewBox");
        	}
        }),
        {
            varName: "btnLight",
            type: "radio",
            text: "明亮主题",
			group: "theme",
			reset: function() { this.themeKey = "light" }
        },
        {
            varName: "btnGreen",
            type: "radio",
            text: "护眼主题",
            group: "theme",
			reset: function() { this.themeKey = "green" }
        },
        {
            varName: "btnDark",
            type: "radio",
            text: "暗黑主题",
            group: "theme",
			reset: function() { this.themeKey = "dark" }
        },
        {
            varName: "btnGrey",
            type: "radio",
            text: "经典主题",
            group: "theme",
			reset: function() { this.themeKey = "grey" },
			touchend: function() { 
				themeKey  = this.themeKey;
				refreshTheme();
			}
        },
        {
            varName: "btnIndex",
            type: "button",
            text: "输入数字",
            touchend: function() {
            	openIndexBoard();
            }
        },
        {
            type: "button",
            text: "普通弹窗",
            touchend: function() {
            	msg({
            		text: "普通弹窗效果预览普通弹窗效果预览普通弹窗效果预览普通弹窗效果预览普通弹窗效果预览",
            		type: "input",
            		lineNum: 10
            	})
            }
        },
        {
            type: "button",
            text: "分享弹窗",
            touchend: function(){ 
				window.share(cBoard);
            }
        },
        {
            type: "button",
            text: "棋谱弹窗",
            touchend: function() {
            	window.exWindow.setStyle(mainUI.cmdPadding, 0, mainUI.cmdWidth - mainUI.cmdPadding * 2, mainUI.cmdWidth, mainUI.cmdWidth / 28, cmdDiv.viewElem);
            	window.exWindow.innerHTML("<br><br>棋谱弹窗文字效果预览棋谱弹窗文字效果预览棋谱弹窗文字效果预览棋谱弹窗文字效果预览棋谱弹窗文字效果预览");
				window.exWindow.open();
            }
        },
        {
            type: "button",
            text: "默认设置",
            touchend: async function() {
            	Object.assign(themesData.themes[themeKey], JSON.parse(JSON.stringify(({ light, grey, green, dark })[themeKey])) );
				refreshTheme();
            }
        },
        {
            type: "button",
            text: "保存设置",
            touchend: async function() {
            	if (settingData) {
            		const newData = { key: "themes", themes: copyDefaultThemes() };
            		const oldData = await settingData.getDataByKey("themes");
            		oldData && coverObject(newData.themes, oldData.themes);
            		coverObject(newData.themes[themeKey], themesData.themes[themeKey]);
        			(await settingData.putData(newData)) && msg(`已经保存"${({ "light": btnLight.text, "grey": btnGrey.text, "green": btnGreen.text, "dark": btnDark.text })[themeKey]}"`);
            	}
            }
        },
        {
            type: "file",
            text: "导入主题",
            change: async function() {
            	try{
            	const jsonStr = await this.files[0].text();
            	const theme = JSON.parse(jsonStr);
            	theme["body"] && theme["Board"] && theme["Button"] && (themes[themeKey] = theme, refreshTheme());
            	}catch(e){console.error(e.stack)}
            }
        },
        {
            type: "button",
            text: "导出主题",
            touchend: function() {
            	const jsonStr = JSON.stringify(themes[themeKey], null, 2);
            	saveFile.save(jsonStr, "theme.json");
            }
        }
    ];
    
    buttonSettings.splice(1, 0, null);
    buttonSettings.splice(3, 0, null);
    buttonSettings.splice(4, 0, null, null, null, null);
    buttonSettings.splice(8, 0, null, null, null, null);
    buttonSettings.splice(12, 0, null, null, null, null);
    buttonSettings.splice(18, 0, null, null);
    buttonSettings.splice(22, 0, null, null);
    buttonSettings.splice(26, 0, null, null);
    buttonSettings.splice(30, 0, null, null);
    buttonSettings.splice(34, 0, null, null);
    
    const cmdDiv = mainUI.createCmdDiv();
    const cBoard = mainUI.createCBoard();
    mainUI.addButtons(mainUI.createButtons(buttonSettings), cmdDiv, 0);
    const { 
    	btnLight,
    	btnGreen,
    	btnGrey,
    	btnDark,
    	btnIndex,
    	inputBoard,
    	commentBox
    } = mainUI.getChildsForVarname();
    
    const indexBoard = mainUI.newIndexBoard({
    	left: mainUI.gridPadding,
    	top: mainUI.gridPadding,
    	width: mainUI.cmdWidth,
    	height: mainUI.cmdWidth,
    	parent: mainUI.upDiv,
    	style: {
    		borderColor: "black",
    		background: "white",
    		borderStyle: "solid",
    		borderWidth: `${5}px`
    	}
    })
    
    indexBoard.hide();
    indexBoard.callback = function(index) {
    	event.cancelBubble = true;
    	closeIndexBoard();
    };
    mainUI.addChild({
    	variant: indexBoard,
    	type: indexBoard.constructor.name,
    	varName: "indexBoard"
    });
    
    const inputButton = new InputButton(document.body, 0, 0, btnIndex.with, btnIndex.height);
    inputButton.callback = indexBoard.callback;
    mainUI.addChild({
    	variant: inputButton,
    	type: inputButton.constructor.name,
    	varName: "inputButton"
    });
    
    function openIndexBoard() {
    	const selectIndex = 8;
    	indexBoard.show();
    	mainUI.viewport.resize();
    	indexBoard.removeIndexes();
    	for (let i = 0; i < 100; i++) {
    		const style = {
    			opacity: `${i < 18 ? 1 : 0.5}`
    		};
    		i + 1 == selectIndex && (style.borderWidth = "5px");
    		indexBoard.createIndex(i + 1, style)
    	}
    	inputButton.bindButton(btnIndex, mainUI.bodyScale);
    	inputButton.value = selectIndex;
    }
    
    function closeIndexBoard() {
    	indexBoard.hide();
    	indexBoard.removeIndexes();
    	inputButton.hide();
    }
    
    bindEvent.setBodyDiv(mainUI.bodyDiv, mainUI.bodyScale, mainUI.upDiv);
    bindEvent.addEventListener(cBoard.viewBox, "click", (x, y, type) => {
    	const idx = cBoard.getIndex(x, y);
    	if (cBoard.P[idx].type == TYPE_NUMBER) {
    		cBoard.toPrevious(true); //点击棋子，触发悔棋
    	}
    	else if (cBoard.P[idx].type == TYPE_EMPTY) {
    		cBoard.wNb(idx, "auto", true); // 添加棋子
    	}
    });
    bindEvent.addEventListener(cBoard.viewBox, "contextmenu", (x, y) => {
    	const scale = cBoard.scale != 1 ? 1 : 1.5;
    	cBoard.setScale(scale, true);
    });
	bindEvent.addEventListener(cBoard.viewBox, "zoomstart", (x1, y1, x2, y2) => {
		cBoard.zoomStart(x1, y1, x2, y2);
	});
			
	class InputColor {
		constructor(parent, title, value, change = ()=>{}) {
			function checkColorCode(value) {
				const reg3 = /^#[A-Fa-f0-9]{3}$/;
				const reg6 = /^#[A-Fa-f0-9]{6}$/;
				const codeStr = `${colorName2colorCode(value)}`;
				return reg3.test(codeStr) || reg6.test(codeStr);
			}
			const div = document.createElement("div");
			const input = document.createElement("input");
			const label = document.createElement("label");
			const colorDiv = document.createElement("div");
			const colorCode = document.createElement("input");
			
			const btnWidth = mainUI.buttonWidth * 1.1;
			const btnHeight = mainUI.buttonHeight * 0.9;
			parent.appendChild(div);
			div.appendChild(colorDiv);
			div.appendChild(label);
			div.appendChild(colorCode);
			label.innerHTML = title;
			input.setAttribute("type", "color");
			input.setAttribute("value", colorName2colorCode(value));
			colorCode.setAttribute("type", "text");
			colorCode.value = input.value;
			
			Object.assign(div.style,{
				position: "relative",
				height: btnHeight * 2 + "px"
			})
			Object.assign(label.style, {
				position: "absolute",
				left: "0px",
				top: "0PX",
				fontSize: btnHeight * 0.6 + "px",
				lientHeight: btnHeight + "px"
			})
			Object.assign(colorDiv.style,{
				position: "absolute",
				left: "0px",
				top: btnHeight + "px",
				width: btnWidth + "px",
				height: btnHeight + "px",
				background: input.value,
				border: "1px solid black"
			})
			Object.assign(colorCode.style,{
				position: "absolute",
				left: btnWidth + btnHeight * 0.33 + "px",
				top: btnHeight + "px",
				width: btnWidth + "px",
				height: btnHeight + "px",
				border: "1px solid black",
				fontSize: btnHeight * 0.7 + "px",
				//lientHeight: btnHeight + "px"
			})
			colorDiv.addEventListener("click", () => input.click(), true);
			input.addEventListener("change", change, true);
			colorCode.addEventListener("input", () => checkColorCode(colorCode.value) && change.call(colorCode), true);
			this.input = input;
			this.label = label;
			this.colorDiv = colorDiv;
			this.colorCode = colorCode;
		}
		get title() { return this.label.innerHTML }
		set title(t) { this.label.innerHTML = t }
		get value() { return this.colorDiv.style.background }
		set value(v) { this.colorDiv.style.background = this.colorCode.value = v; this.input.value = colorName2colorCode(v) }
	}
	
	InputColor.prototype.loadTheme = function(theme = {}) {
		Object.assign(this.colorCode.style, theme);
	}
	
	const inputColors = [];
	const colorButtonSettings = [
		{ key: "body", styleKey: "color",  title: "页面-字体颜色" },
		{ key: "a", styleKey: "color", title: "页面-链接字体颜色" },
		{ key: "body", styleKey: "backgroundColor", title: "页面-背景颜色" },
		
		{ key: "Board", styleKey: "backgroundColor", title: "棋盘-背景颜色" },
		{ key: "Board", styleKey: "wNumColor", title: "棋盘-白棋颜色" },
		{ key: "Board", styleKey: "bNumColor", title: "棋盘-黑棋颜色" },
		{ key: "Board", styleKey: "wNumFontColor", title: "棋盘-白棋数字颜色" },
		{ key: "Board", styleKey: "bNumFontColor", title: "棋盘-黑棋数字颜色" },
		{ key: "Board", styleKey: "LbBackgroundColor", title: "棋盘-标记背景颜色" },
		{ key: "Board", styleKey: "coordinateColor", title: "棋盘-坐标字体颜色" },
		{ key: "Board", styleKey: "lineColor", title: "棋盘-线条颜色" },
		{ key: "Board", styleKey: "borderColor", title: "棋盘-缩放框颜色" },
		{ key: "Board", styleKey: "wLastNumColor", title: "棋盘-最后白子字体颜色" },
		{ key: "Board", styleKey: "bLastNumColor", title: "棋盘-最后黑子字体颜色" },
		{ key: "Board", styleKey: "moveWhiteColor", title: "棋盘-VCF白棋颜色" },
		{ key: "Board", styleKey: "moveBlackColor", title: "棋盘-VCF黑棋颜色" },
		{ key: "Board", styleKey: "moveWhiteFontColor", title: "棋盘-VCF白棋字体颜色" },
		{ key: "Board", styleKey: "moveBlackFontColor", title: "棋盘-VCF黑棋字体颜色" },
		{ key: "Board", styleKey: "moveLastFontColor", title: "棋盘-VCF最后棋子字色" },
		
		{ key: "Button", styleKey: "color", title: "按钮-字体颜色" },
		{ key: "Button", styleKey: "backgroundColor", title: "按钮-背景颜色" },
		{ key: "Button", styleKey: "selectColor", title: "按钮-选中字体颜色" },
		{ key: "Button", styleKey: "selectBackgroundColor", title: "按钮-选中背景颜色" },
		
		{ key: "ButtonBoard", styleKey: "color", title: "图标按钮-字体颜色" },
		{ key: "ButtonBoard", styleKey: "backgroundColor", title: "图标按钮-背景颜色" },
		{ key: "ButtonBoard", styleKey: "selectColor", title: "图标按钮-选中字体颜色" },
		{ key: "ButtonBoard", styleKey: "selectBackgroundColor", title: "图标按钮-选中背景颜色" },
		
		{ key: "InputButton", styleKey: "color", title: "输入框-字体颜色" },
		{ key: "InputButton", styleKey: "backgroundColor", title: "输入框-背景颜色" },
		{ key: "InputButton", styleKey: "selectColor", title: "输入框-选中字体颜色" },
		{ key: "InputButton", styleKey: "selectBackgroundColor", title: "输入框-选中背景颜色" },
	
		{ key: "msgWindow", styleKey: "color", title: "普通弹窗-字体颜色" },
		{ key: "msgWindow", styleKey: "backgroundColor", title: "普通弹窗-背景颜色" },
		{ key: "msgWindow", styleKey: "textareaBackgroundColor", title: "普通弹窗-文字区颜色" },
		
		{ key: "share", styleKey: "color", title: "分享弹窗-字体颜色" },
		{ key: "share", styleKey: "backgroundColor", title: "分享弹窗-背景颜色" },
		
		{ key: "exWindow", styleKey: "color", title: "棋谱弹窗-字体颜色" },
		{ key: "exWindow", styleKey: "borderColor", title: "棋谱弹窗-边框颜色" },
		{ key: "exWindow", styleKey: "backgroundColor", title: "棋谱弹窗-背景颜色" }
	];
	
	const light = await loadJSON(`UI/theme/light/theme.json`);
	const grey = await loadJSON(`UI/theme/grey/theme.json`);
	const green = await loadJSON(`UI/theme/green/theme.json`);
	const dark = await loadJSON(`UI/theme/dark/theme.json`);
	function copyDefaultThemes() {
		return { 
			light: JSON.parse(JSON.stringify(light)), 
			grey: JSON.parse(JSON.stringify(grey)), 
			green: JSON.parse(JSON.stringify(green)), 
			dark: JSON.parse(JSON.stringify(dark))
		}
	}
	
	const themesData = { key: "themes", themes: copyDefaultThemes() };
	const themes = themesData.themes;
	
	if (settingData) {
		const data = await settingData.getDataByKey("themes");
		data && coverObject(themes, data.themes);
	}
	
	let themeKey = localStorage.getItem("theme") || "light";
			
	colorButtonSettings.map(info => {
		themes[themeKey][info.key] && themes[themeKey][info.key][info.styleKey] && inputColors.push(new InputColor(inputBoard.viewElem, info.title, themes[themeKey][info.key][info.styleKey], function(){
			themes[themeKey][info.key][info.styleKey] = this.value;
			window.setBlockUnload(true);
			refreshTheme();
		}))
	})
	
	function coverObject(target, source) {
		Object.keys(source).map(key => {
			if (typeof source[key] == "object") {
				if (typeof target[key] == "object") {
					coverObject(target[key], source[key]);
				}
				else {
					target[key] = JSON.parse(JSON.stringify(source[key]));
				}
			}
			else target[key] = source[key];
		})
	}
	
	function refreshTheme() {
		mainUI.refreshTheme(themes[themeKey]);
		const code = "J10K10G8G9H8I9J8F7E7H7H6J7I6G6J6K6L5";
		const vcfCode = "I7G7K7L7I8J9H9G10F5E4F9E9F8F6F11F10K9K8I11";
		const labels = ["E2,棋","F2,盘", "G2,标","H2,记","I2,效","J2,果","K2,测","L2,试"];
		cBoard.unpackCode(code, undefined, true);
		cBoard.printMoves(cBoard.moveCode2Points(vcfCode), 2);
		labels.map(str => {
			const [code, char] = str.split(",");
			const idx = cBoard.moveCode2Points(code)[0];
			if (cBoard.P[idx].type == TYPE_EMPTY) {
				cBoard.wLb(idx, char, cBoard.bNumColor);
			}
			else if ((cBoard.P[idx].type & 0xF0) == TYPE_NUMBER) {
				cBoard.P[idx].text = char;
				cBoard._printPoint(idx, true);
			}
		})
		
		for (let i = 0, j = 0; i < colorButtonSettings.length; i++) {
			const info = colorButtonSettings[i];
			if (themes[themeKey][info.key] && themes[themeKey][info.key][info.styleKey]) {
				inputColors[j].value = themes[themeKey][info.key][info.styleKey];
				inputColors[j].loadTheme({
					color: themes[themeKey]["body"]["color"],
					backgroundColor: themes[themeKey]["body"]["backgroundColor"]
				})
				j++;
			}
		}
	}
    
	//------------------ load -----------------------------
	
	({ "light": btnLight, "grey": btnGrey, "green": btnGreen, "dark": btnDark }[themeKey].defaultontouchend)();
	cBoard.unpackCode("J11G11H10E9I10G9F9H9F8I8G8K8H8F7J8K7G7H6F5H5J5I5", undefined, true);
    commentBox.innerHTML = "<a>链接文字效果预览</a><br>页面文字效果预览页面文字效果预览页面文字效果预览页面文字效果预览页面文字效果预览页面文字效果预览页面文字效果预览页面文字效果预览页面文字效果预览......";
	try{refreshTheme();}catch(e){alert(e.stack)}
	mainUI.loadTheme().then(() => mainUI.viewport.resize());
})()
