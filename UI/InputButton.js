//if (self.SCRIPT_VERSIONS) self.SCRIPT_VERSIONS["button"] = "2024.23206";
(function(global, factory) {
	(global = global || self, factory(global));
}(this, (function(exports) {
	'use strict';
	
	function coordinateMove(htmlElement) {
		let l = htmlElement.offsetLeft;
		let t = htmlElement.offsetTop;
		let parentNode = htmlElement.parentNode;
		while (parentNode != document && parentNode != null) {
			l += parentNode.offsetLeft;
			t += parentNode.offsetTop;
			parentNode = parentNode.parentNode;
		}
		return { moveX: l, moveY: t }
	}
	
	function xyObjToPage(point, htmlElement) { // obj 原点坐标 转 page 原点坐标（左上角）
		const m = coordinateMove(htmlElement);
		point.x = point.x + m.moveX;
		point.y = point.y + m.moveY;
		return point;
	}
	
	function xyPageToObj(point, htmlElement) { // Page 原点坐标 转 obj 原点坐标（左上角）
		const m = coordinateMove(htmlElement);
		point.x = point.x - m.moveX;
		point.y = point.y - m.moveY;
		return point;
	}
	
	class InputButton {
		constructor(parentNode, left, top, width, height) {
			this.parentNode = parentNode; //保存父节点;
			this.div = document.createElement("div"); //定位
			this.input = document.createElement("input");
			this.input.setAttribute("type", "text");
			this.button = document.createElement("button");
			this.button.innerHTML = "✔";
			this.div.appendChild(this.input);
			this.div.appendChild(this.button);
			
			this.width = width;
			this.height = height;
			this.left = left;
			this.top = top;
			
			this.color = "#333333"; 
			this.backgroundColor = "white";
			this.selectBackgroundColor = "#e0e0e0"; 
			this.fontSize = parseInt(this.height) / 2.2;
			this.textAlign = "center";
			
			this._callback = () => {}
			this.div.addEventListener("touchstart", () => { event.cancelBubble = true }, true)
			this.button.addEventListener("click", () => { this.hide(); this._callback.call(this,this.value); })
			this.input.addEventListener("click", () => this.input.scrollIntoView(false) )
		}
		get value() { return this.input.value }
		set value(v) { return this.input.value = v }
		get callback() { return this._callback }
		set callback(fun) { return this._callback = fun }
	}
	
	InputButton.prototype.show = function(callback = this._callback) {
		if (!this.div.parentNode) this.parentNode.appendChild(this.div);
		this._callback = callback;
		const borderWidth = ~~(this.height / 30);
		Object.assign(this.div.style, {
			position: "absolute",
			left: this.left + "px",
			top: this.top + "px"
		})
		Object.assign(this.input.style, {
			position: "absolute",
			left: "0px",
			top: "0px",
			width: this.width - this.height + "px",
			height: this.height + "px",
			margin: "0",
			outline: "none",
			padding: "0",
			fontSize: this.fontSize + "px",
			textAlign: this.textAlign,
			color: this.color,
			backgroundColor: this.backgroundColor,
			border: `${borderWidth}px solid ${this.selectBackgroundColor}`
		})
		Object.assign(this.button.style, {
			position: "absolute",
			left: this.width - this.height + "px",
			top: "0px",
			width: this.height + "px",
			height: this.height + borderWidth * 2 + "px",
			margin: "0",
			outline: "none",
			padding: "0",
			fontSize: this.fontSize + "px",
			color: this.color,
			backgroundColor: this.selectBackgroundColor,
			border: `${borderWidth}px solid ${this.selectBackgroundColor}`
		})
	}
	
	InputButton.prototype.hide = function(callback = this._callback) {
		if (this.div.parentNode) this.parentNode.removeChild(this.div);
		this._callback = callback;
	}
	
	InputButton.prototype.move = function(left = this.left, top = this.top, width = this.width, height = this.height, parentNode = this.parentNode) {
		this.parentNode = parentNode;
		parentNode.appendChild(this.div)
		this.left = left;
		this.top = top;
		this.width = width;
		this.height = height;
		this.show();
	};
	
	InputButton.prototype.loadTheme = function(theme = {}) {
		Object.assign(this, theme);
		this.div.parentNode && this.show();
	}
	
	/**
	 * 与btn在页面上左上角对齐
 	*/
	InputButton.prototype.bindButton = function(btn, scale = 1) {
		function isVisible(btn) {
			let node = btn.parent || btn.parentNode;
			while (node) { 
				if (node == document.body) return true;
				node = node.parentNode;
			}
			return false;
		}
		if (!isVisible(btn)) return;
		let p = xyObjToPage({x:parseInt(btn.left), y:parseInt(btn.top)}, btn.parent || btn.parentNode );
		p = xyPageToObj(p, this.parentNode);
		this.move(p.x * scale, p.y * scale, parseInt(btn.width), parseInt(btn.height));
		Object.assign(this.div.style, {
			transformOrigin: "0px 0px",
			transform: `scale(${scale})`
		})
	}
	
	exports.InputButton = InputButton;
})))