(() => {
	"use strict";
	const d = document;
	const dw = d.documentElement.clientWidth;
	const dh = d.documentElement.clientHeight;

	class LinkButton {
		constructor(parent, src, title, link, target = "_self", change = () => {}) {
			const div = document.createElement("div");
			const img = document.createElement("img");
			const label = document.createElement("label");
			
			const height = mainUI.buttonHeight * 1.8;
			const fontSize = mainUI.buttonHeight;
			
			parent.appendChild(div);
			div.appendChild(img);
			div.appendChild(label);
			
			img.src = src;
			label.innerHTML = title;
			
			Object.assign(div.style, {
				position: "relative",
				height: height + "px"
			})
	
			Object.assign(img.style, {
				position: "absolute",
				left: "0px",
				top: "5px",
				width: height - 10 + "px",
				height: height - 10 + "px",
				borderRadius: "50%",
				opacity: 0.6
			})
			
			Object.assign(label.style, {
				position: "absolute",
				left: parseInt(img.style.width) + 15 + "px",
				top: img.style.top,
				fontSize: fontSize + "px",
				lientHeight: fontSize + "px"
			})
			div.addEventListener("click", () => window.open(link, target), true);
		}
	}
	
	const tools = [
		{
			src: "icon(192x192).png",
			title: "摆棋小工具",
			link: "./renju.html",
			target: "_self"
		},
		{
			src: "icon(192x192).png",
			title: "DB阅读器",
			link: "./dbread.html",
			target: "_self"
		},
		{
			src: "icon(192x192).png",
			title: "连珠答题器",
			link: "./puzzle.html",
			target: "_self"
		},
		{
			src: "icon(192x192).png",
			title: "习题编辑器",
			link: "./renjueditor.html",
			target: "_self"
		},
		{
			src: "icon(192x192).png",
			title: "制作VCF",
			link: "./makevcf.html",
			target: "_self"
		},
		{
			src: "icon(192x192).png",
			title: "棋盘图片标记",
			link: "./tuya.html",
			target: "_self"
		},
		{
			src: "icon(192x192).png",
			title: "LIB转SGF",
			link: "./lib2sgf.html",
			target: "_self"
		}
	];
	const settings = [
		{
			src: "settings.png",
			title: "编辑主题",
			link: "setTheme.html",
			target: "_self"
		},
		{
			src: "settings.png",
			title: "检查更新",
			link: "reset.html",
			target: "_self" 
		},
		{
			src: "help.jpg",
			title: "使用说明",
			link: "instructions.html",
			target: "_self"
		},
	];
	
	const divWidth = mainUI.cmdWidth / 1.5;
	const divStyle = {
		position: "absolute",
		left: (mainUI.cmdWidth - divWidth)/ 2 + "px",
		top: mainUI.cmdPadding + "px",
		width: divWidth + "px",
		height: mainUI.cmdWidth - mainUI.cmdPadding * 2 + "px",
		overflowY: "auto"
	}
	
	const toolDiv = document.createElement("div");
	Object.assign(toolDiv.style, divStyle);
	mainUI.upDiv.appendChild(toolDiv);
	tools.map(tool => {
		new LinkButton(toolDiv, tool.src, tool.title, tool.link, tool.target)
	})
	
	const settingDiv = document.createElement("div");
	Object.assign(settingDiv.style, divStyle);
	mainUI.downDiv.appendChild(settingDiv);
	settings.map(setting => {
		new LinkButton(settingDiv, setting.src, setting.title, setting.link, setting.target)
	})
	
	//------------------- load -------------------------
	
    mainUI.loadTheme().then(() => mainUI.viewport.resize());
})()