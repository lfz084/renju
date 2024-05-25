//if (self.SCRIPT_VERSIONS) self.SCRIPT_VERSIONS["button"] = "2024.23206";
(function(global, factory) {
	(global = global || self, factory(global));
}(this, (function(exports) {
	'use strict';

	const ANIMATION_TIMEOUT = 300;
	const DEBUG_BUTTON = false;
	let isMenuShow = false; //不允许同时打开两个菜单

	function log(param, type = "log") {
		const print = console[type] || console.log;
		DEBUG_BUTTON && window.DEBUG && (window.vConsole || window.parent.vConsole) && print(`[Button.js]  ${ param}`);
	}

	// ---------------------- groups ------------------------ 

	/**
	 * @type {group1, group2...}
	 * @group {buttons: {button}[], callback}
	 */

	const groups = {};

	function getGroup(groups, key) {
		return groups[key] = groups[key] || { buttons: [], callback: () => {} };
	}

	function pushButton(group, button) {
		group.buttons = group.buttons || [];
		return group.buttons.push({ button });
	}

	function pushCallback(group, callback) {
		return group.callback = callback || group.callback;
	}

	// ---------------------------------------------- 

	function get_hr(height = 1, marginLeft = -1, padding = 0) {
		const hr = document.createElement("hr");
		hr.style.height = height + "px";
		hr.style.marginLeft = marginLeft + "px";
		hr.style.padding = padding + "px";
		return hr;
	}

	function get_li({ text, fontSize, textAlign, lineHeight, width, height, paddingLeft, option }) {
		const li = document.createElement("li");
		option && (option.li = li);
		li.option = option;
		li.innerHTML = text;
		li.style.fontWeight = "bold";
		li.style.fontFamily = "mHeiTi, Roboto, emjFont, Symbola";
		li.style.whiteSpace = "nowrap"; 
		li.style.overflow = "hidden"; 
		li.style.textOverflow = "ellipsis";
		li.style.fontSize = ~~fontSize + "px";
		li.style.textAlign = textAlign;
		li.style.lineHeight = lineHeight + "px";
		li.style.width = width - paddingLeft + "px";
		li.style.height = height + "px";
		li.style.paddingLeft = paddingLeft + "px";
		li.style.margin = "0px";
		return li;
	}
	// ----------------------- menu --------------- 

	class Menu {
		constructor(button, left, top, width, height, fontSize, closeAnimation, isCancelMenuClick = () => {}, scale = 1) {
			const input = button.input;
			const optionsHeight = (fontSize * 2.5 + 3) * input.length;
			const muWindow = document.createElement("div"); // 铺满屏幕最顶层
			const anima = document.createElement("div"); //控制菜单动画
			const menu = document.createElement("div"); //菜单
			const lis = [];
			muWindow.appendChild(anima);
			muWindow.style.transformOrigin = `0px 0px`;
			muWindow.style.transform = `scale(${scale})`;
			muWindow.onclick = menu.onclick = function() {
				if (isCancelMenuClick()) return; //safari 长按棋盘会误触发click事件 isCancelMenuClick判断是否是误触发
				if (event) {
					event.cancelBubble = true;
					event.preventDefault()
				};
				this.hide(closeAnimation ? ANIMATION_TIMEOUT : ANIMATION_TIMEOUT);
			}.bind(this);
			anima.appendChild(menu);
			menu.setAttribute("class", "menu");

			const borderWidth = parseInt(fontSize) / 3;
			height = height || document.clientHeight * 0.8;
			if (input.length && ((height - (fontSize + 3) * 1) < optionsHeight)) {
				const li = get_li({
					text: "︾",
					fontSize: fontSize,
					textAlign: "center",
					lineHeight: fontSize * 3.5,
					width: width - borderWidth * 2,
					height: fontSize * 2.5,
					paddingLeft: 0
				});
				lis["down"] = li;
				menu.appendChild(li);
				li.onclick = function() {
					if (isCancelMenuClick()) return;
					if (event) event.cancelBubble = true;
					this.scroll(parseInt(li.style.lineHeight) * 5);
				}.bind(this);
				menu.appendChild(get_hr());
			}
			for (let i = 0; i < input.length; i++) {
				const li = get_li({
					text: input[i].innerHTML,
					fontSize: fontSize,
					textAlign: "left",
					lineHeight: fontSize * 2.5,
					width: width - borderWidth * 2,
					height: fontSize * 2.5,
					paddingLeft: fontSize,
					option: input[i]
				});
				lis.push(li);
				menu.appendChild(li);
				if (li.option.type == "disabled") {
					li.style.opacity = 0.5;
					li.addEventListener("click", () => { event.cancelBubble = true }, true);
				}
				else {
					li.onclick = function() {
						if (isCancelMenuClick()) return;
						if (event) event.cancelBubble = true;
						input.selectedIndex = i; // input.onchange();
						if (muWindow.parentNode) {
							this.hide(closeAnimation ? ANIMATION_TIMEOUT : ANIMATION_TIMEOUT, this.button.change.bind(this.button));
						}
						const type = input[i].type || "_";
						if (type.indexOf("radio") + 1) {
							[...input].map(option => { if (option.type === type) option.checked = option == input[i] });
						}
						else if (type.indexOf("checked") + 1) {
							input[i].checked = !input[i].checked;
						}
					}.bind(this)
				}
				i < input.length - 1 && menu.appendChild(get_hr());
			}
			if (input.length && ((height - (fontSize + 3) * 1) < optionsHeight)) {
				menu.appendChild(get_hr());
				const li = get_li({
					text: "︽",
					fontSize: fontSize,
					textAlign: "center",
					lineHeight: fontSize * 1.5,
					width: width - borderWidth * 2,
					height: fontSize * 2.5,
					paddingLeft: 0
				});
				lis["up"] = li;
				menu.appendChild(li);
				li.onclick = function() {
					if (isCancelMenuClick()) return;
					if (event) event.cancelBubble = true;
					this.scroll(-parseInt(li.style.lineHeight) * 5);
				}.bind(this);
			}
			else {
				height = optionsHeight + 3 + borderWidth * 2;
			}

			this.button = button;
			this.bodyScale = scale;
			this.menuWindow = muWindow;
			this.anima = anima;
			this.menu = menu;
			this.lis = lis;
			this.menuLeft = left;
			this.menuTop = top;
			this.menuHeight = height;
			this.menuWidth = width;
			this.fontSize = fontSize;
			this.timerHideMenu = null;
			this.showX = 0;
			this.showY = 0;
		}
		
	}

	Menu.prototype.show = function show(x, y) {
		if (isMenuShow) return;
		if (this.button.disabled) return;
		try {this.button.onshowmenu.call(this.button, this.button)} catch (e) { console.error(e.stack) }
		
		const dh = window.fullscreenUIHeight || document.documentElement.clientHeight;
		const dw = window.fullscreenUIWidth || document.documentElement.clientWidth;
		const muWindow = this.menuWindow;
		muWindow.style.position = "fixed";
		muWindow.style.zIndex = 9999;
		muWindow.style.width = dw / this.bodyScale + "px";
		muWindow.style.height = dh * 2 / this.bodyScale + "px";
		muWindow.style.top = "0px";
		muWindow.style.left = "0px";
		
		this.anima.style.position = "absolute";
		this.anima.style.width = muWindow.style.width;
		this.anima.style.height = muWindow.style.height;
		this.anima.style.left = "0px";
		this.anima.style.top = "0px";
		x = x || this.menuLeft;
		x = x < this.fontSize * 2.5 ? this.fontSize * 2.5 : (x + this.menuWidth) > (dw / this.bodyScale - this.fontSize * 2.5) ? dw / this.bodyScale - this.menuWidth - this.fontSize * 2.5 : x;
		y = y || this.menuTop;
		y = y < this.fontSize * 2.5 ? this.fontSize * 2.5 : (y + this.menuHeight) > (dh / this.bodyScale - this.fontSize * 2.5) ? dh / this.bodyScale - this.menuHeight - this.fontSize * 2.5 : y;
		this.showX = x;
		this.showY = y;
		const borderWidth = parseInt(this.fontSize) / 3;
		this.menu.style.position = "absolute";
		this.menu.style.left = `${x}px`;
		this.menu.style.top = `${y}px`;
		this.menu.style.width = `${this.menuWidth - borderWidth * 2}px`;
		this.menu.style.height = `${this.menuHeight - borderWidth * 2}px`;
		this.menu.style.borderRadius = parseInt(this.fontSize) * 1.5 + "px";
		this.menu.style.border = `${borderWidth}px solid ${this.button.selectBackgroundColor}`;
		this.menu.style.overflow = "scroll";
		this.menu.style.background = this.button.backgroundColor;
		this.menu.style.autofocus = "true";
		this.anima.setAttribute("class", "show");

		this.lis.map(li => {
			if (li.option) {
				li.innerHTML = li.option.innerHTML + (li.option.checked ? "  ✔" : "");
			}
		})

		document.body.appendChild(muWindow);

		isMenuShow = true; // 设置两次
		setTimeout(() => {
			if (muWindow.getAttribute("class") == "show") isMenuShow = true;
		}, ANIMATION_TIMEOUT);
	}


	Menu.prototype.hide = function(ms, callback = () => {}) {
		const muWindow = this.menuWindow;
		const input = this.button.input;
		if (this.timerHideMenu) {
			clearTimeout(this.timerHideMenu);
			this.timerHideMenu = null;
		}
		this.anima.setAttribute("class", `${0?"hideContextMenu":"hide"}`);
		ms = parseInt(ms) || 0;
		const close = () => {
			muWindow.parentNode.removeChild(muWindow);
			isMenuShow = false;
			callback.call(this.button, this.button);
			try { this.button.onhidemenu.call(this.button, this.button) } catch (e) { console.error(e.stack) }
		}
		if (ms > 0) {
			this.timerHideMenu = setTimeout(() => {
				clearTimeout(this.timerHideMenu);
				this.timerHideMenu = null;
				close();
			}, ms);
		}
		else close();
			
	}

	Menu.prototype.scroll = function(top) {
		//log("menuScroll")
		const optionsHeight = (this.fontSize * 2.5 + 3) * (this.button.input.length + 2);
		const maxScrollTop = optionsHeight - parseInt(this.menuHeight);
		const targetScrollTop = this.menu.scrollTop + top;
		const scrollTo = function() {
			let scl = Math.abs(parseInt((this.targetScrollTop - this.tempScrollTop) / 50)) + Math.abs(top) / 50;
			//log(`scl=${scl}`)
			if ((top < 0) && (this.tempScrollTop > this.targetScrollTop)) {
				this.tempScrollTop -= scl;
			}
			else if ((top > 0) && (this.tempScrollTop < this.targetScrollTop)) {
				this.tempScrollTop += scl;
			}
			else { //  to cancelAnimationFrame
				this.tempScrollTop = top < 0 ? this.targetScrollTop - 1 : this.targetScrollTop + 1;
			}
			this.menu.scrollTop = this.tempScrollTop;
			//log(`animationFrameScroll  ${this.tempScrollTop},  targetScrollTop=${ this.targetScrollTop}`)
			this.animationFrameScroll = requestAnimationFrame(scrollTo);
			if (top < 0 ? this.tempScrollTop <= this.targetScrollTop : this.tempScrollTop >= this.targetScrollTop) {
				cancelAnima();
			}
		}.bind(this)
		const cancelAnima = function() {
			//log("exit animationFrameScroll")
			cancelAnimationFrame(this.animationFrameScroll);
			this.animationFrameScroll = null;
			this.menu.scrollTop = this.menu.scrollTop < 0 ? 0 : this.menu.scrollTop > maxScrollTop ? maxScrollTop : this.menu.scrollTop;
		}.bind(this)

		if (this.animationFrameScroll) cancelAnima();
		this.targetScrollTop = targetScrollTop;
		//log(`menu.scrollTop=${this.menu.scrollTop}, top=${top}`)
		this.tempScrollTop = this.menu.scrollTop;
		scrollTo();
	}

	// ---------------------------------------------- 

	function touchstart() {
		try {
			if (this.disabled) return;
			log(`default touchstart......`)
			if (event) event.cancelBubble = true;
			this.defaultontouchstart();
		} catch (e) { console.error(e.stack) }
	}

	function mousedown() {
		try {
			if (this.disabled) return;
			log(`default mousedown......`)
			if (event) {
				event.cancelBubble = true;
				event.preventDefault();
				if (event.button == 0) this.defaultontouchstart();
			}
		} catch (e) { console.error(e.stack) }
	}

	function touchcancel() {
		try {
			if (this.disabled) return;
			log(`default touchcancel......`)
			if (event) event.cancelBubble = true;
			this.isEventMove = true;
			this.defaultontouchend();
		} catch (e) { console.error(e.stack) }
	}

	function touchleave() {
		try {
			if (this.disabled) return;
			log(`default touchleave......`)
			if (event) event.cancelBubble = true;
			this.isEventMove = true;
			this.defaultontouchend();
		} catch (e) { console.error(e.stack) }
	}

	function touchend() {
		try {
			if (this.disabled) return;
			log(`default touchend......`)
			if (event) event.cancelBubble = true;
			this.defaultontouchend();
		} catch (e) { console.error(e.stack) }
	}

	function mouseup() {
		try {
			if (this.disabled) return;
			log(`default mouseup......`)
			if (event) {
				event.cancelBubble = true;
				event.preventDefault();
			}
			this.isEventMove = false;
			if (this.type == "file") {
				//this.isEventMove = true; //cancel defaultontouchend to click();
				this.defaultontouchend(); // defaultontouchend() to onchange();
			} // if "input file" cancel this click; 
			else {
				this.touchend();
			}
		} catch (e) { console.error(e.stack) }
	}

	function click() {
		try {
			if (this.disabled) return;
			log(`default click......`)
		} catch (e) { console.error(e.stack) }
	}

	function change() {
		try {
			if (this.disabled) return;
			log(`default change......`)
			if (event) event.cancelBubble = true;
			this.defaultonchange();
		} catch (e) { console.error(e.stack) }
	}

	function touchmove() {
		try {
			if (this.disabled) return;
			log(`default touchmove......`)
			if (event) event.cancelBubble = true;
			this.defaultontouchmove();
		} catch (e) { console.error(e.stack) }
	}


	//----------------------- button ------------------------------

	// 定制按钮，button，file，Radio，select。

	class Button {
		constructor(parentNode, type, left, top, width, height) {

			this.parentNode = parentNode; //保存父节点;
			this.div = document.createElement("div"); //定位
			this.button = document.createElement("button"); //显示
			this.div.appendChild(this.button);
			this.label = null;
			if (type == "select") {
				this.input = document.createElement("select"); //接受用户事件  
				this.label = document.createElement("div");
				this.label.innerHTML = "▼";
				this.div.appendChild(this.label);
			}
			else {
				this.input = document.createElement("input"); //接受用户事件  
				this.input.setAttribute("type", type);
			}


			if (type != "select" && type != "file") this.div.appendChild(this.input);
			this.menu = null;
			this.onshowmenu = () => {};
			this.onhidemenu = () => {};

			this.type = type;
			this.width = width == null ? "200px" : parseInt(width) + "px";
			this.height = height == null ? "150px" : parseInt(height) + "px";
			this.left = left == null ? "0px" : parseInt(left) + "px";
			this.top = top == null ? "0px" : parseInt(top) + "px";
			this.color = "#333333"; //字体默认颜色
			this.selectColor = "black"; //按钮按下时字体颜色
			this.lockColor = null; // 优先显示lockColor
			this.backgroundColor = "white"; //"#f0f0f0"; //按钮颜色999999
			this.selectBackgroundColor = "#e0e0e0"; // "#d0d0d0"; / / 666666
			//if (this.type=="button") {
			//let col = this.backgroundColor;
			//this.backgroundColor = this.selectBackgroundColor;
			//this.selectBackgroundColor = col;
			//}
			this.margin = 0;
			this.outline = "none"; //去掉外框
			this.fontSize = parseInt(this.height) / 2.2 + "px";
			this.textAlign = "center";
			this.checked = false;
			this.borderRadius = (parseInt(this.width) > parseInt(this.height) ? parseInt(this.height) : parseInt(this.width)) / 2 * 30 / 28 + "px";
			this.text = ""; //未选中显示的文本
			this.text2 = ""; //优先显示text2

			this.isEventMove = false; // 记录 touchstart 到 touchend 中间 是否触发 touchmove;
			this.touchStart = [];

			this.targetScrollTop = 0;
			this.tempScrollTop = 0;
			this.animationFrameScroll = null;

			this.varName = void 0;
			this._group = void 0;
			this.mode = void 0;

			this._disabled = false;
			this.touchstart = touchstart.bind(this);
			this.mousedown = mousedown.bind(this);
			this.touchcancel = touchcancel.bind(this);
			this.touchleave = touchleave.bind(this);
			this.touchend = touchend.bind(this);
			this.mouseup = mouseup.bind(this);
			this.click = click.bind(this);
			this.change = change.bind(this);
			this.touchmove = touchmove.bind(this);
			
			this.button.style.cursor = this.input.style.cursor = "default";

			const key = (this.type == "select" || this.type == "file") ? "div" : "input";
			this[key].addEventListener("touchstart", this.touchstart, true);
			this[key].addEventListener("mousedown", this.mousedown, true);
			this[key].addEventListener("touchcancel", this.touchcancel, true);
			this[key].addEventListener("touchend", this.touchend, true);
			this[key].addEventListener("touchleave", this.touchleave, true);
			this[key].addEventListener("mouseup", this.mouseup, true);
			this[key].addEventListener("click", this.click, true);
			this[key].addEventListener("touchmove", this.touchmove, true);
			this.input.addEventListener("change", this.change, true);

		}

		get group() { return this._group }
		set group(groupName) {
			try{
			if (!groupName) return;
			log(`group: ${groupName}`)
			this._group = groupName;
			const group = getGroup(groups, groupName);
			group.buttons.push(this);
			}catch(e){alert(e.stack)}
		}
		get disabled() { return	this._disabled }
		set disabled(v) { 
			this._disabled = !!v;
			this.div.style.opacity = this._disabled ? 0.5 : 0.9;
		}
		get enabled() { return !this.disabled }
		set enabled(v) { this.disabled = !v }
	}



	// 对 select 添加 option
	Button.prototype.addOption = function(value, text, type) {
		//log(`add t=${this.text}`);
		if (this.type != "select") return;
		let op = document.createElement("option");
		op.setAttribute("value", value);
		op.innerHTML = text;
		op.type = type;
		this.input.appendChild(op);
	};


	// arr = [index1, text1, ?type1, index2, text2, ?type2 ...]
	Button.prototype.addOptions = function(arr) {
		for (let i = 0; i < arr.length; i += 2) {
			const value = arr[i];
			const text = arr[i + 1];
			const type = "number" == typeof arr[i + 2] ? void 0 : (i++, arr[i + 1]);
			this.addOption(value, text, type);
		}
	};
	

	Button.prototype.createMenu = function(left, top, width, height, fontSize, closeAnimation, isCancelMenuClick = () => {}, scale = 1) {
		if (this.type != "select" || this.menu) return; //safari 长按棋盘会误触发click事件 isCancelMenuClick判断是否是误触发
		this.menu = new Menu(this, left, top, width, height, fontSize, closeAnimation, isCancelMenuClick, scale);
	};


	Button.prototype.defaultontouchstart = function() {
		try {
			if (this.disabled) return;
			//log(`str t=${this.text}`);
			if (this.tyle == "select" && event) event.preventDefault();
			this.isEventMove = false;
			//log(`isEventMove=${this.isEventMove}`)
			//log(this)
			this.button.style.opacity = 1;
			this.button.style.fontSize = parseInt(this.fontSize) * 0.9 + "px";
			if (this.backgroundColor != "black") {
				this.button.style.color = "black";
			}
			else {
				this.button.style.color = "#ccc";
			}
			this.button.style.backgroundColor = this.selectBackgroundColor;
			return true;
		} catch (e) { console.error(e.stack) }
	};


	Button.prototype.defaultontouchmove = function() {
		try {
			if (this.disabled) return;
			//log(`mov t=${this.text}`);
			this.isEventMove = true; // 取消单击事件
			return true;
		} catch (e) { console.error(e.stack) }
	};



	// 默认事件，
	Button.prototype.defaultontouchend = function() {
		try {
			if (this.disabled) return;
			//log(`typeof event=${typeof event}, isEventMove=${this.isEventMove}`);
			if (event) event.preventDefault();
			//   "✔  ○●",radio,checked,前面加上特殊字符。
			let s;
			let timeout;
			let cancel = false; // 判断是否取消单击

			if (this.isEventMove) cancel = true; // 不触发单击事件
			
			// radio, checkbox 修改 checked
			if ((!cancel) && ((this.mode || this.type) == "radio" || (this.mode || this.type) == "checkbox")) {
				this.checked = this.type == "radio" || !this.checked;
			}
			//log(`checked = ${this.checked} ,this.isEventMove = ${this.isEventMove}`);
			if (this.checked) {
				// 选中的时，按钮外观
				s = this.type == "radio" ? "☞" : this.type == "checkbox" ? "✔" : "";
				s += this.text2 || this.text;

				if (this.type == "select") {
					s = s + "&nbsp;" + "&nbsp" + "&nbsp;";
				}

				this.button.innerHTML = s;
				this.button.style.fontSize = this.fontSize;
				this.button.style.color = this.lockColor || this.selectColor;
				this.button.style.backgroundColor = this.selectBackgroundColor;
			}
			else {
				// 未选中时的外观
				if (this.type != "select" || this.type == "checkbox") {
					timeout = 0;
				}
				else {
					timeout = 0;
				}
				s = this.type == "radio" ? "" : this.type == "checkbox" ? "" : "";
				s += this.text2 || this.text;

				if (this.type == "select") {
					s = s + "&nbsp;" + "&nbsp" + "&nbsp;";
				}
				this.button.innerHTML = s;

				let but = this;
				if (timeout) {
					setTimeout(function() {
						but.button.style.fontSize = but.fontSize;
						but.button.style.color = but.lockColor || but.color;
						but.button.style.backgroundColor = but.backgroundColor;
					}, timeout);
				}
				else {
					but.button.style.fontSize = but.fontSize;
					but.button.style.color = but.lockColor || but.color;
					but.button.style.backgroundColor = but.backgroundColor;
				}
			}

			//log(`cancel=${cancel}`);
			if (this.type == "file" && !cancel) {
				//log(`cancel=${"click"}`);
				this.input.click();
			}
			else if (this.type == "select" && !cancel) {
				//log(`click t=${this.text}`);
				this.showMenu(undefined, this.autoMenuTop());
			}

			if (this.group && !cancel) {
				const buttons = getGroup(groups, this.group).buttons;
				buttons.map((button,i) => {
					if ("radio" == (button.mode || button.type)) {
						button.setChecked(button == this)
					}
				})
			}
			
			return cancel ? false : true;
		} catch (e) { console.error(e.stack) }
	};


	Button.prototype.autoMenuTop = function() {
		let top = window.scrollY / this.menu.bodyScale + this.menu.fontSize * 2.5 * 2;
		top = event && event.pageY ? event.pageY / this.menu.bodyScale - top : event && event.changedTouches[0] ? event.changedTouches[0].pageY / this.menu.bodyScale - top : undefined;
		return top;
	}


	Button.prototype.defaultonchange = function() {
		try {
			if (this.disabled) return;
			//log(`chg t=${this.text}`);
			//log(`defaultonchange  ,i=${this.input.selectedIndex==-1 ? this.input[1].text : this.input.options[this.input.selectedIndex].text} `);
			if (this.type != "select" || this.input.selectedIndex < 0) return true;
			let txt = this.input.options[this.input.selectedIndex].text;
			this.setText(txt);
			return true;
		} catch (e) { console.error(e.stack) }
	};
	/**
	 * 返回 button 内匹配的第一个 option，失败返回undefined
	 * @value  先匹配option.value
	 * @text 匹配value失败，再匹配option.text
 	*/
	Button.prototype.getOption = function(value, text) {
		if (this.type == "select") {
			let option;
			if (value !== undefined) {
				option = [...this.input].find(op => op.value == value);
			}
			if (option === undefined && text !== undefined) {
				option = [...this.input].find(op => op.text == text);
			}	
			return option;
		}
	}


	//移出节点
	Button.prototype.hide = function() {
		let f = this.div;
		if (f.parentNode) f.parentNode.removeChild(f);
	};



	Button.prototype.hideMenu = function(ms, callback = () => {}) {
		this.menu.hide(ms, callback);
	}
	
	
	Button.prototype.loadTheme = function(theme = {}) {
		Object.assign(this, theme);
		const innerHTML = this.button.innerHTML;
		this.div.parentNode && this.show();
		this.button.innerHTML = innerHTML;
	}


	//  移动和设置大小
	Button.prototype.move = function(left, top, width, height, parentNode = this.parentNode) {
		parentNode && parentNode.appendChild(this.div);
		this.parentNode = parentNode;
		let text = this.text;
		this.left = left == null ? this.left : parseInt(left) + "px";
		this.top = top == null ? this.top : parseInt(top) + "px";
		this.width = width == null ? this.width : parseInt(width) + "px";
		this.height = height == null ? this.height : parseInt(height) + "px";
		this.show();
		text && this.setText(text);
	};


	//按钮背景色
	Button.prototype.setBackgroundColor = function(color) {
		//log(`sbc t=${this.text}`);
		this.backgroundColor = color;
		this.button.style.backgroundColor = color;

	};


	//  设置按钮形状
	Button.prototype.setBorderRadius = function(rs) {
		//log(`sbr t=${this.text}`);
		this.borderRadius = rs;
		this.show();
	};


	Button.prototype.setColor = function(color) {
		//log(`sclr t=${this.text}`);
		this.lockColor = color;
		this.button.style.color = color;
	};


	//设置选定状态    
	Button.prototype.setChecked = function(checked) {
		//log(`sckd t=${this.text}`);
		if (this.checked == (checked == true)) return;
		this.checked = checked ? true : false;
		this.setText(this.text, this.text2);
		//log(this.checked);
	};


	//字体
	Button.prototype.setFontSize = function(fontSize) {
		this.fontSize = parseInt(fontSize) + "px";
		if (this.checked) {
			this.button.style.fontSize = parseInt(parseInt(this.fontSize) * 0.9) + "px";
		}
		else {
			this.button.style.fontSize = this.fontSize;
		}
	};
	
	Button.prototype.setonshowmenu = function(callback = () => {}) {
		this.type == "select" && (this.onshowmenu = callback);
	};
	
	Button.prototype.setonhidemenu = function(callback = () => {}) {
		this.type == "select" && (this.onhidemenu = callback);
	};
	
	// 給事件绑定函数
	Button.prototype.setonchange = function(callback = () => {}) {
		let fun = this.change;
		let but = this;
		this.change = function() {
			try {
				if (but.disabled) return;
				log(`new setonchange......`)
				if (event) event.cancelBubble = true;
				if (but.defaultonchange()) return callback.call(this, but)
			} catch (e) { console.error(e.stack) }
		}
		this.input.removeEventListener("change", fun, true);
		this.input.addEventListener("change", this.change, true);
	};



	// 給事件绑定函数
	Button.prototype.setontouchstart = function(callback = () => {}) {
		let fun = this.touchstart;
		let but = this;
		this.touchstart = function() {
			try {
				if (but.disabled) return;
				log(`new touchstart......`)
				if (event) event.cancelBubble = true;
				if (but.defaultontouchstart()) return callback.call(this, but);
			} catch (e) { console.error(e.stack) }
		}
		const key = (this.type == "select" || this.type == "file") ? "div" : "input";
		this[key].removeEventListener("touchstart", fun, true);
		this[key].addEventListener("touchstart", this.touchstart, true);
	};



	// 給事件绑定函数
	Button.prototype.setontouchend = function(callback = () => {}) {
		const group = getGroup(groups, this.group);
		const key = (this.type == "select" || this.type == "file") ? "div" : "input";
		const buttons = this.group ? group.buttons : [this];
		this.group && (group.callback = callback);
		buttons.map(button => {
			const fun = button.touchend;
			button.touchend = () => {
				try {
					if (button.disabled) return;
					log(`new touchend......`)
					if (event) event.cancelBubble = true;
					if (button.defaultontouchend()) return callback.call(button, button);
				} catch (e) { console.error(e.stack) }
			}
			button[key].removeEventListener("touchend", fun, true);
			button[key].addEventListener("touchend", button.touchend, true);
		})
	};


	// 设置文本
	Button.prototype.setText = function(txt, txt2 = this.text2) {
		//log(`stxt t=${this.text}`);
		let s;
		this.text = txt == null ? "" : txt;
		this.text2 = txt2 == null ? "" : txt2;
		this.button.style.fontFamily = "mHeiTi, Roboto, emjFont, Symbola";
		this.button.style.fontWeight = "bold";
		this.button.style.whiteSpace = "nowrap"; 
		this.button.style.overflow = "hidden"; 
		this.button.style.textOverflow = "ellipsis";
		if (this.checked) {
			s = this.type == "radio" ? "☞" : this.type == "checkbox" ? "✔" : "";
			s += this.text2 || this.text;
			this.button.innerHTML = s;
			this.button.style.fontSize = this.fontSize;
			this.button.style.color = this.lockColor || this.selectColor;
			this.button.style.backgroundColor = this.selectBackgroundColor;
		}
		else {
			let timeout;
			if (this.type == "radio" || this.type == "checkbox") {
				timeout = 0;
			}
			else {
				timeout = 0;
			}
			s = this.type == "radio" ? "" : this.type == "checkbox" ? "" : "";
			s += this.text2 || this.text;
			this.button.innerHTML = s;

			let but = this;
			if (timeout) {
				setTimeout(function() {
					but.button.style.fontSize = but.fontSize;
					but.button.style.color = but.lockColor || but.color;
					but.button.style.backgroundColor = but.backgroundColor;
				}, timeout);
			}
			else
			{
				but.button.style.fontSize = but.fontSize;
				but.button.style.color = but.lockColor || but.color;
				but.button.style.backgroundColor = but.backgroundColor;
			}
		}

		if (this.type == "select") {
			s = s + "&nbsp;" + "&nbsp" + "&nbsp;";
		}

		this.button.innerHTML = s;
	};



	//显示，刷新
	Button.prototype.show = function(left, top, width, height) {
		if (!this.div.parentNode) this.parentNode.appendChild(this.div);

		this.div.style.position = "absolute";
		if (width) this.width = parseInt(width) + "px";
		this.div.style.width = this.width;
		if (height) this.height = parseInt(height) + "px";
		this.div.style.height = this.height;
		if (top) this.top = parseInt(top) + "px";
		this.div.style.top = this.top;
		if (left) this.left = parseInt(left) + "px";
		this.div.style.left = this.left;
		this.div.style.borderRadius = this.borderRadius == null ? parseInt(this.width) + "px" : this.borderRadius;

		this.div.style.borderStyle = "solid";
		this.div.style.borderWidth = parseInt(this.width) < parseInt(this.height) ? parseInt(this.width) / 30 + "px" : parseInt(this.height) / 30 + "px";
		this.div.style.borderColor = this.selectBackgroundColor;
		//this.div.style.backgroundColor = "red"

		this.fontSize = parseInt(this.div.style.height) / 2.2 + "px";

		this.button.style.position = "absolute";
		this.button.style.padding = "0px 0px 0px 0px";
		this.button.style.zIndex = this.div.style.zIndex;
		this.button.style.width = this.width;
		this.button.style.height = this.height;
		this.button.style.top = "0px";
		this.button.style.left = "0px";
		this.button.style.borderWidth = "0px";
		this.button.style.margin = "0px";
		this.button.style.borderRadius = this.div.style.borderRadius
		this.button.style.outline = "none";
		this.button.style.textAlign = "center";
		this.button.style.lineHeight = parseInt(this.height) + "px";
		this.button.style.backgroundColor = this.backgroundColor;
		this.button.style.fontSize = this.fontSize;
		this.button.style.color = this.lockColor || this.color;
		this.button.style.opacity = 0.9;
		if (this.type == "select") {
			let s = this.label.style;
			s.position = "absolute";
			s.padding = "0px 0px 0px 0px";
			s.fontSize = this.fontSize;
			s.left = `${parseInt(this.width)-parseInt(this.fontSize)*1.5}px`;
			s.top = "0px";
			s.margin = "0px";
			s.textAlign = this.button.style.textAlign;
			s.height = this.button.style.height;
			s.lineHeight = this.button.style.lineHeight;
			s.opacity = 0.9;
		}

		this.input.style.position = "absolute";
		this.input.style.zIndex = this.button.style.zIndex + 1;
		this.input.style.width = this.width;
		this.input.style.height = this.height;
		this.input.style.top = "0px";
		this.input.style.left = "0px";
		this.input.style.borderRadius = this.div.style.borderRadius
		this.input.style.opacity = 0;

		this.setText(this.text, this.text2); // 正确显示按钮文本
		if (this.type == "select") this.defaultonchange();
	};


	Button.prototype.showMenu = function(x, y) {
		if (this.disabled) return;
		log(`${this}.showMenu`)
		this.menu.show(x, y);
	};


	exports.ANIMATION_TIMEOUT = ANIMATION_TIMEOUT;
	exports.Button = Button;
})))