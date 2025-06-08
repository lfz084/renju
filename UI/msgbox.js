//if (self.SCRIPT_VERSIONS) self.SCRIPT_VERSIONS["msgbox"] = "2024.23206";
(function(global, factory) {
	(global = global || self, factory(global));
}(this, (function(exports) {
	'use strict';

	const d = document;
	const dw = d.documentElement.clientWidth;
	const dh = d.documentElement.clientHeight;
	const ANIMATION_TIMEOUT = 300;

	let isMsgShow = false; // =true 屏蔽 bodytouch 事件;
	exports.msgWindow = (() => {
		const TYPE_MSG = 1;
		const TYPE_INPUT = 2;

		const gridWidth = 980;
		const tempWidth = gridWidth * (dw > dh ? 2 : 1);
		const scale = dw / (dw / dh > 2 ? dw / dh * gridWidth : tempWidth);
		const winWidth = dw / scale;
		const winHeight = dh / scale;
		const defaultWidth = gridWidth * 0.76;

		let closeTimer = null;
		let color = "black";
		let backgroundColor = "#d0d0d0";
		let textareaBackgroundColor = "white";

		// 创建一个屏蔽层
		let MsgBoxobj = document.createElement("div");
		MsgBoxobj.style.transformOrigin = `0px 0px`;
		MsgBoxobj.style.transform = `scale(${scale})`;
		MsgBoxobj.style.overflowY = "auto";

		let scrollBox = document.createElement("div");
		MsgBoxobj.appendChild(scrollBox);
		scrollBox.style.position = "absolute";

		// msg 窗口
		let windowDiv = document.createElement("div");
		MsgBoxobj.appendChild(windowDiv);
		windowDiv.style.position = "absolute";

		// 文本框
		let msgTextarea = document.createElement("textarea"); //
		windowDiv.appendChild(msgTextarea);
		msgTextarea.style.position = "absolute";
		msgTextarea.style.fontFamily = "mHeiTi, Roboto, emjFont, Symbola";
		msgTextarea.style.fontWeight = "bold";

		//确认按钮
		let butEnter = new Button(windowDiv, "button", 50, 50, 50, 50);
		butEnter.show();

		//取消按钮
		let butCancel = new Button(windowDiv, "button", 50, 50, 50, 50);
		butCancel.show();

		function msg(text, type = `msgbox`, left, top, width, height, enterTXT, cancelTXT, callEnter, callCancel, butNum, lineNum, textAlign) {
			isMsgShow = true; // 屏蔽 bodytouch 事件;
			if (closeTimer) {
				clearTimeout(closeTimer);
				closeTimer = null;
			}

			const numChars = 21;
			butNum = butNum == null ? type == "input" ? 2 : 1 : butNum;
			if (lineNum == "auto") {
				lineNum = !height ? 1 : ~~(height * 0.8 / winWidth / 0.05 / 1.25);
			}
			else if (!lineNum) {
				lineNum = Math.min(
					(text || "").split(`\n`)
					.map(lineStr => ~~(lineStr.length / numChars) + 1)
					.reduce((c, v) => c + v, 0),
					12)
			}
			width = width || defaultWidth;
			height = height || width / numChars * (lineNum + (butNum === 0 ? 0.8 : 3)) * 1.3;

			Object.assign(MsgBoxobj.style, {
				position: "fixed",
				zIndex: 9999,
				width: winWidth + "px",
				height: winHeight * 2 + "px",
				top: "0px",
				left: "0px"
			})

			Object.assign(scrollBox.style, {
				width: winWidth + "px",
				height: winHeight * 2 + (type == "input" ? height / 2 : 0) + "px",
			})

			MsgBoxobj.ontouchend = MsgBoxobj.onclick = butNum == 0 ? () => { closeMsg(1) } : null;

			Object.assign(windowDiv.style, {
				width: width + "px",
				height: height + "px",
				left: (winWidth / dw * (window.fullscreenUIWidth || document.documentElement.clientWidth) - width) / 2 + "px",
				top: (winHeight / dh * (window.fullscreenUIHeight || document.documentElement.clientHeight) - height) / 2 + "px",
				backgroundColor: backgroundColor,
				border: `0px solid ${butEnter.selectBackgroundColor}`
			})
			windowDiv.ontouchend = windowDiv.onclick = butNum == 0 ? () => { closeMsg(1) } : null;

			const fontSize = ~~(width / numChars);
			const borderWidth = ~~(fontSize / 20);
			const paddingWidth = 10;
			if (type == "msgbox") {
				msgTextarea.readOnly = true;
				
				Object.assign(msgTextarea.style, {
					textAlign: textAlign || "center",
					border: `0px`,
					color: color,
					backgroundColor: backgroundColor
				})
				msgTextarea.onclick = () => {}
			}
			else {
				msgTextarea.readOnly = false;
				Object.assign(msgTextarea.style, {
					textAlign: "left",
					border: `${borderWidth}px solid black`,
					color: color,
					backgroundColor: textareaBackgroundColor
				})
				msgTextarea.onclick = () => { windowDiv.scrollIntoView(false) }
			}
			Object.assign(msgTextarea.style, {
				left: `${paddingWidth}px`,
				top: `${paddingWidth}px`,
				width: `${parseInt(windowDiv.style.width) - (paddingWidth + borderWidth) * 2}px`,
				fontSize: fontSize + "px",
				height: ~~(fontSize * 1.35 * lineNum) + "px"
			})
			msgTextarea.value = text || "";

			const s = msgTextarea.style;
			const w = fontSize * 5;
			const h = w / 3.1;
			const t = parseInt(s.height) + parseInt(s.top) + (parseInt(windowDiv.style.height) - parseInt(s.height) - h) / 2;

			if (butNum != 0) {
				butEnter.setText(enterTXT ? enterTXT : "确定");
				butEnter.show(butNum == 2 ? (width - 2 * w) / 3 : (width - w) / 2, t, w, h);
				butEnter.setontouchend(function() {
					closeMsg(1);
					if (callEnter) callEnter(String(msgTextarea.value));
				});
			}

			if (butNum == 2 || butNum == null) {
				butCancel.show((width - 2 * w) / 3 * 2 + w, t, w, h);
				butCancel.setText(cancelTXT ? cancelTXT : "取消");
				butCancel.setontouchend(function() {
					closeMsg(1);
					if (callCancel) callCancel(String(msgTextarea.value));
				});
				setOpacity("0.38");
			}
			else if (butNum == 1) {
				butCancel.hide();
				setOpacity("0.38")
			}
			else {
				butCancel.hide();
				butEnter.hide();
			}

			windowDiv.setAttribute("class", butNum ? "show" : "showlabel");
			setTimeout(() => { document.body.appendChild(MsgBoxobj) }, 1);

		}

		function closeMsg(timeout) {

			if (closeTimer) {
				clearTimeout(closeTimer);
				closeTimer = null;
			}
			timeout = parseInt(timeout) > 0 ? parseInt(timeout) : 300;
			closeTimer = setTimeout(function() {
				closeTimer = null;
				const CLASS_NAME = windowDiv.getAttribute("class");
				const NEW_CLASS_NAME = CLASS_NAME == "show" ? "hide" : "hidelabel";
				if (CLASS_NAME) windowDiv.setAttribute("class", NEW_CLASS_NAME);
				closeTimer = setTimeout(() => {
					closeTimer = null;
					isMsgShow = false;
					if (MsgBoxobj.parentNode) MsgBoxobj.parentNode.removeChild(MsgBoxobj);
					msgTextarea.value = "";
					windowDiv.setAttribute("class", "");
					MsgBoxobj.ontouchend = MsgBoxobj.click = function() {};
				}, ANIMATION_TIMEOUT);
			}, timeout);
			setOpacity("1");
		}

		function msgScale(scl) {
			MsgBoxobj.style.transform = `scale(${scl})`;
		}

		function loadTheme(themes = {}) {
			const msgWindowTheme = themes["msgWindow"] || {};
			color = msgWindowTheme.color || color;
			backgroundColor = msgWindowTheme.backgroundColor || backgroundColor;
			textareaBackgroundColor = msgWindowTheme.textareaBackgroundColor || textareaBackgroundColor;
			windowDiv.style.backgroundColor = backgroundColor;
			msgTextarea.style.color = color;
			msgTextarea.style.backgroundColor = msgTextarea.readOnly ? backgroundColor : textareaBackgroundColor;

			const butTheme = themes["Button"] || {};
			butEnter.loadTheme(butTheme);
			butCancel.loadTheme(butTheme);
		}

		function setOpacity(opacity) { // mainUI.bodyDiv 设置无效，改为设置 mainUI.upDiv + mainUI.downDiv
			const elems = self["mainUI"] ? [mainUI.upDiv, mainUI.downDiv] : [];
			elems.map(div => div.setAttribute("class", opacity == 1 ? "exitBackgroundImg" : "backgroundImg"));
		}

		return {
			"msg": msg,
			"closeMsg": closeMsg,
			"msgScale": msgScale,
			"loadTheme": loadTheme
		}
	})();


	exports.MSG_ENTER = 1;
	exports.MSG_CANCEL = -1;

	exports.msgScale = msgWindow.msgScale;

	exports.msg = function msg(text, type = `msgbox`, left, top, width, height, enterTXT, cancelTXT, callEnter = () => {}, callCancel = () => {}, butNum, lineNum, textAlign) {
		if (typeof text == "object") {
			const data = text;
			text = data.title || data.text || "";
			type = data.type || type;
			left = data.left || left;
			top = data.top || top;
			width = data.width || width;
			height = data.height || height;
			enterTXT = data.enterTXT || enterTXT;
			cancelTXT = data.cancelTXT || cancelTXT;
			callEnter = data.enterFunction || data.callEnter || callEnter;
			callCancel = data.cancelFunction || data.callCancel || callCancel;
			butNum = data.butNum || butNum;
			lineNum = data.lineNum || lineNum;
			textAlign = data.textAlign || textAlign;
		}

		return new Promise(resolve => {
			const newCallEnter = (param) => {
				callEnter(param);
				resolve({ butCode: MSG_ENTER, inputStr: param });
			}
			const newCallCancel = (param) => {
				callCancel(param);
				resolve({ butCode: MSG_CANCEL });
			}
			msgWindow.msg(text, type, left, top, width, height, enterTXT, cancelTXT, newCallEnter, newCallCancel, butNum, lineNum, textAlign);
		})
	}

	exports.msgbox = function msgbox(title, enterTXT, enterFunction = () => {}, cancelTXT, cancelFunction = () => {}, butNum, timeout) {
		if (typeof title == "object") {
			const data = title;
			title = data.title || data.text || "";
			enterTXT = data.enterTXT || enterTXT;
			cancelTXT = data.cancelTXT || cancelTXT;
			enterFunction = data.enterFunction || data.callEnter || enterFunction;
			cancelFunction = data.cancelFunction || data.callCancel || cancelFunction;
			butNum = data.butNum || butNum;
			timeout = data.timeout || timeout;
		}

		return new Promise(resolve => {
			const newEnterFunction = (param) => {
				enterFunction(param);
				resolve({ butCode: MSG_ENTER, inputStr: param });
			}
			const newCancelFunction = (param) => {
				cancelFunction(param);
				resolve({ butCode: MSG_CANCEL });
			}
			msgWindow.msg(title, "msgbox", undefined, undefined, undefined, undefined, enterTXT, cancelTXT, newEnterFunction, newCancelFunction, butNum == undefined ? cancelTXT ? 2 : 1 : butNum, butNum == 0 ? 1 : undefined);
			(butNum == 0) && exports.closeMsg(timeout).then(resolve).catch(resolve);
		})
	}

	exports.closeMsg = function closeMsg(timeout) {
		timeout = parseInt(timeout) > 0 ? parseInt(timeout) : 300;
		msgWindow.closeMsg(timeout);

		return new Promise(resolve => {
			setTimeout(resolve, timeout);
		})
	}

	exports.warn = (() => {
		let isShowLabel = true;
		return async (txt, timeout = 2000) => {
			if (!isShowLabel) return;
			isShowLabel = false;
			await msgbox(txt, undefined, undefined, undefined, undefined, 0, timeout)
			isShowLabel = true;
		}
	})();

})))