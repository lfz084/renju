(function(global, factory) {
	(global = global || self, factory(global));
}(this, (function(exports) {
	'use strict';

	const TYPE_MARKARROW = 7;
	const TYPE_MARKLINE = 8;
	const SIN45 = 0.707105;

	function findIdx(lineOrArrow, idx) {
		for (let i = lineOrArrow.length - 1; i >= 0; i--) {
			if (lineOrArrow[i].P.indexOf(idx) + 1) {
				return i;
			}
		}
		return -1;
	}

	class markLine {
		constructor(points, color, direction) {
			this.P = points;
			this.color = color;
			this.direction = direction;
		}
	}

	class markArrow {
		constructor(points, color, direction) {
			this.P = points;
			this.color = color;
			this.direction = direction;
		}
	}

	class Board extends CheckerBoard {
		constructor(...args) {
			super(...args);
			this.isShowAutoLine = false;
			this.autoLines = [];
			this.lines = [];
			this.arrows = [];
			this.startIdx = -1;
			this.selectLine = null;
			this.selectArrow = null;
			this.selectIdx = -1;
			this.drawLine = { startPoint: null, selectDiv: null, dashedLine: [] };
			this.drawLine.startPoint = document.createElement("div");
			let s = this.drawLine.startPoint.style;
			s.position = "absolute";
			s.borderStyle = "solid";
			s.borderWidth = "0px";
			s.borderColor = "red";
			s.borderRadius = "50%";
			s.width = this.gW / 3 + "px";
			s.height = this.gH / 3 + "px";
			s.backgroundColor = "red";
			s.zIndex = -100;
			for (let i = 0; i < 4; i++) {
				this.drawLine.dashedLine.push(document.createElement("div"));
				s = this.drawLine.dashedLine[i].style;
				s.position = "absolute";
				s.borderStyle = "dashed";
				s.borderWidth = "1px";
				s.borderColor = "red";
				s.zIndex = -100;
				this.scaleBox.appendChild(this.drawLine.dashedLine[i]);
			}
			this.scaleBox.appendChild(this.drawLine.startPoint);
			this.drawLine.selectDiv = document.createElement("div");
			s = this.drawLine.selectDiv.style;
			s.position = "absolute";
			s.borderStyle = "dashed";
			s.borderWidth = "1px";
			s.borderColor = "red";
			s.zIndex = -100;
			this.scaleBox.appendChild(this.drawLine.selectDiv);
		}
	}

	Board.prototype.showStartPoint = function(idx, color = this.bNumColor, borderColor = this.backgroundColor, _class = "startPoint") {
		if (idx < 0 || idx >= this.P.length) return;
		let s = this.drawLine.startPoint.style;
		s.width = this.gW / 3 + "px";
		s.height = this.gW / 3 + "px";
		s.borderWidth = this.gW / 6 + "px";
		s.borderColor = borderColor;
		s.left = this.P[idx].x - this.gW / 3 + this.canvas.offsetLeft + "px";
		s.top = this.P[idx].y - this.gW / 3 + this.canvas.offsetTop + "px";
		s.backgroundColor = color;
		s.zIndex = 1;
		this.scaleBox.appendChild(this.drawLine.startPoint);
		this.startIdx = idx;
		this.drawLine.startPoint.setAttribute("class", _class);
	}

	Board.prototype.hideStartPoint = function() {
		this.drawLine.startPoint.style.zIndex = -100;
		if (this.drawLine.startPoint.parentNode) this.drawLine.startPoint.parentNode.removeChild(this.drawLine.startPoint);
		this.startIdx = -1;
		this.drawLine.startPoint.setAttribute("class", "none");
	}

	Board.prototype.showDrawLine = function(idx, color = this.bNumColor) {
		if (idx < 0 || idx >= this.P.length) return;
		
		let x = idx % 15;
		let y = ~~(idx / 15);
		let lw = x;
		let rw = this.SLTX - 1 - x;
		let uh = y;
		let bh = this.SLTY - 1 - y;
		
		for (let i = 0; i < 4; i++) {
			let lWidth, rWidth;
			this.scaleBox.appendChild(this.drawLine.dashedLine[i]);
			let s = this.drawLine.dashedLine[i].style;
			s.borderWidth = this.gW / 20 + "px";
			s.height = this.gW / 20 + "px";
			s.top = this.P[idx].y - this.gW * 3 / 40 + this.canvas.offsetTop + "px";
			s.borderColor = color;
			s.backgroundColor = this.backgroundColor;
			switch (i) {
				case 0:
					s.width = this.gW * (this.SLTX - 1) + "px";
					s.left = this.P[idx].x - this.gW * lw - parseInt(s.borderWidth) + this.canvas.offsetLeft + "px";
					break;
				case 1:
					s.width = this.gH * (this.SLTY - 1) + "px";
					s.left = this.P[idx].x - this.gH * uh - parseInt(s.borderWidth) + this.canvas.offsetLeft + "px";
					s.transformOrigin = `${~~(this.gH * uh+parseInt(s.borderWidth))}px ${this.gW*3/40}px`;
					s.transform = `rotate(${90}deg)`;
					break;
				case 2:
					lWidth = Math.min(lw, uh);
					rWidth = Math.min(rw, bh);
					s.width = this.gW * (lWidth + rWidth) / SIN45 + "px";
					s.left = this.P[idx].x - this.gW * lWidth / SIN45 - parseInt(s.borderWidth) + this.canvas.offsetLeft + "px";
					s.transformOrigin = `${~~(this.gW * lWidth/SIN45)+parseInt(s.borderWidth)}px ${this.gW*3/40}px`;
					s.transform = `rotate(${45}deg)`;
					break;
				case 3:
					lWidth = Math.min(lw, bh);
					rWidth = Math.min(rw, uh);
					s.width = this.gH * (lWidth + rWidth) / SIN45 + "px";
					s.left = this.P[idx].x - this.gH * lWidth / SIN45 - parseInt(s.borderWidth) + this.canvas.offsetLeft + "px";
					s.transformOrigin = `${~~(this.gH * lWidth / SIN45)+parseInt(s.borderWidth)}px ${this.gW*3/40}px`;
					s.transform = `rotate(${-45}deg)`;
					break;
			}
			s.opacity = 0.5;
			s.zIndex = 0;
		}
	}
	
	Board.prototype.hideDrawLine = function() {
		for (let i = 0; i < 4; i++) {
			this.drawLine.dashedLine[i].style.zIndex = -100;
			if (this.drawLine.dashedLine[i].parentNode) this.drawLine.dashedLine[i].parentNode.removeChild(this.drawLine.dashedLine[i]);
		}
	}
	
	Board.prototype.showSelectDiv = function(idx, color = this.bNumColor) {
		if (idx < 0 || idx >= this.P.length) return;
		
		this.selectIdx = findIdx(this.arrows, idx);
		let mk = null;
		if (this.selectIdx + 1) {
			this.selectArrow = true;
			mk = this.arrows[this.selectIdx];
		}
		else {
			this.selectIdx = findIdx(this.lines, idx);
			if (this.selectIdx + 1) {
				this.selectLine = true;
				mk = this.lines[this.selectIdx];
			}
		}
		
		if (mk) {
			let x = this.P[mk.P[mk.P.length - 1]].x;
			let y = this.P[mk.P[mk.P.length - 1]].y;
			this.drawLine.selectDiv.onmousedown = function() {}
			this.scaleBox.appendChild(this.drawLine.selectDiv);
			let s = this.drawLine.selectDiv.style;
			s.borderWidth = this.getMarkLineWidth() + "px";
			s.borderColor = mk.color;
			s.width = mk.direction & 1 ? this.gW * (mk.P.length - 1) / SIN45 + "px" : this.gW * (mk.P.length - 1) + "px";
			s.height = this.gH / 2 + "px";
			s.left = x - parseInt(s.borderWidth) + this.canvas.offsetLeft + "px";
			s.top = y - parseInt(s.height) / 2 - parseInt(s.borderWidth) + this.canvas.offsetTop + "px";
			s.transformOrigin = `${parseInt(s.borderWidth)}px ${parseInt(s.height)/2+parseInt(s.borderWidth)}px`;
			s.transform = `rotate(${45*mk.direction}deg)`;
			s.zIndex = 0;
			this.drawLine.selectDiv.setAttribute("class", "selectLine");
		}
	}
	
	Board.prototype.hideSelectDiv = function() {
		this.drawLine.selectDiv.style.zIndex = -100;
		if (this.drawLine.selectDiv.parentNode) this.drawLine.selectDiv.parentNode.removeChild(this.drawLine.selectDiv);
		this.selectIdx = -1;
		this.selectArrow = false;
		this.selectLine = false;
		this.drawLine.selectDiv.setAttribute("class", "none");
	}

	//edit
	Board.prototype.drawLineStart = function(idx, color, cmd) {
		if (this.startIdx < 0) {
			this.showStartPoint(idx, this.backgroundColor, color);
			this.showDrawLine(idx, color);
				this.showSelectDiv(idx);
		}
		else {
			let cancel = false;
			if (this.selectArrow) {
				cancel = this.arrows[this.selectIdx].P.indexOf(idx) + 1;
				if (cancel) this.removeMarkArrow(this.selectIdx);
			}
			else if (this.selectLine) {
				cancel = this.lines[this.selectIdx].P.indexOf(idx) + 1;
				if (cancel) this.removeMarkLine(this.selectIdx);
			}
			if (!cancel && cmd == "arrow") {
				this.createMarkArrow(this.startIdx, idx, color);
			}
			else if (!cancel && cmd == "line") {
				this.createMarkLine(this.startIdx, idx, color);
			}
			this.drawLineEnd();
		}
	}

	//edit
	Board.prototype.drawLineEnd = function() {
		this.hideStartPoint();
		this.hideDrawLine();
		this.hideSelectDiv();
	}

	Board.prototype.getMarkLineWidth = function() {
		return Math.min(this.gW, this.gH) / 8;
	}

	Board.prototype.getMarkArrowPoints = function(markArrow, idx, cleArrow) {
		const SIN45 = 0.707105;
		let x = this.P[markArrow.P[0]].x;
		let y = this.P[markArrow.P[0]].y;
		let w = this.gW * 1.07 / 2;
		let h = this.gH * 1.07 / 2;
		let points = {
			line: [],
			arrow: [],
		};
		if (idx == undefined || idx == null) {
			points.line.push({ x: x, y: y });
			x = this.P[markArrow.P[markArrow.P.length - 1]].x;
			y = this.P[markArrow.P[markArrow.P.length - 1]].y;
			switch (markArrow.direction) {
				case 1:
					x += w;
					y += h;
					break;
				case 3:
					x -= w;
					y += h;
					break;
				case 5:
					x -= w;
					y -= h;
					break;
				case 7:
					x += w;
					y -= h;
					break;
				case 0:
					x += w;
					break;
				case 2:
					y += h;
					break;
				case 4:
					x -= w;
					break;
				case 6:
					y -= h;
					break;
			}
			points.line.push({ x: x, y: y });
			points.arrow = getArrow(this, markArrow.P[markArrow.P.length - 1], markArrow.color, markArrow.direction);
		}
		else {
			if (markArrow.P.indexOf(idx) == -1) return;
			let x1, x2, y1, y2;
			if (idx == markArrow.P[0]) {
				x1 = this.P[idx].x;
				y1 = this.P[idx].y;
				switch (markArrow.direction) {
					case 0:
						x2 = x1 - w;
						y2 = y1;
						break;
					case 1:
						x2 = x1 - w - 1;
						y2 = y1 - h - 1;
						break;
					case 2:
						x2 = x1;
						y2 = y1 - h;
						break;
					case 3:
						x2 = x1 + w + 1;
						y2 = y1 - h - 1;
						break;
					case 4:
						x2 = x1 + w;
						y2 = y1;
						break;
					case 5:
						x2 = x1 + w + 1;
						y2 = y1 + h + 1;
						break;
					case 6:
						x2 = x1;
						y2 = y1 + h;
						break;
					case 7:
						x2 = x1 - w - 1;
						y2 = y1 + h + 1;
						break;
				}
			}
			else if (idx == markArrow.P[markArrow.P.length - 1]) {
				x1 = this.P[idx].x;
				y1 = this.P[idx].y;
				switch (markArrow.direction) {
					case 4:
						x1 -= w;
						x2 = x1 - w;
						y2 = y1;
						break;
					case 5:
						x1 -= w;
						y1 -= h;
						x2 = x1 - w - 1;
						y2 = y1 - h - 1;
						break;
					case 6:
						y1 -= h;
						x2 = x1;
						y2 = y1 - h;
						break;
					case 7:
						x1 += w;
						y1 -= h;
						x2 = x1 + w + 1;
						y2 = y1 - h - 1;
						break;
					case 0:
						x1 += w;
						x2 = x1 + w;
						y2 = y1;
						break;
					case 1:
						x1 += w;
						y1 += h;
						x2 = x1 + w + 1;
						y2 = y1 + h + 1;
						break;
					case 2:
						y1 += h;
						x2 = x1;
						y2 = y1 + h;
						break;
					case 3:
						x1 -= w;
						y1 += h;
						x2 = x1 - w - 1;
						y2 = y1 + h + 1;
						break;
				}

			}
			else {
				x = this.P[idx].x;
				y = this.P[idx].y;
				if (markArrow.direction == 0 || markArrow.direction == 4) {
					x1 = x - w;
					y1 = y;
					x2 = x + w;
					y2 = y;
				}
				else if (markArrow.direction == 1 || markArrow.direction == 5) {
					x1 = x - w - 1;
					y1 = y - h - 1;
					x2 = x + w + 1;
					y2 = y + h + 1;
				}
				else if (markArrow.direction == 2 || markArrow.direction == 6) {
					x1 = x;
					y1 = y - h;
					x2 = x;
					y2 = y + h;
				}
				else {
					x1 = x - w - 1;
					y1 = y + h + 1;
					x2 = x + w + 1;
					y2 = y - h - 1;
				}
			}
			points.line.push({ x: x1, y: y1 });
			points.line.push({ x: x2, y: y2 });
			if (idx == markArrow.P[markArrow.P.length - 1]) points.arrow = getArrow(this, markArrow.P[markArrow.P.length - 1], markArrow.color, markArrow.direction);
		}
		return points;


		function getArrow(cBd, idx, color, direction) {
			let x1, x2, y1, y2;
			let tx, ty;
			let arrow = [];
			let lineWidth = cBd.gW / 8;
			lineWidth *= cleArrow ? 1.6 : 1;
			let arrowWidth = direction & 1 ? cBd.gW * 0.8 * SIN45 : cBd.gW * 0.8;
			let arrowHeight = direction & 1 ? lineWidth * 4 * SIN45 : lineWidth * 4;
			arrowWidth += cleArrow ? 1 : 0;
			arrowHeight += cleArrow ? 1 : 0;
			switch (direction) {
				case 0:
					x1 = x2 = cBd.P[idx].x + arrowWidth;
					y1 = cBd.P[idx].y - arrowHeight / 2;
					y2 = cBd.P[idx].y + arrowHeight / 2;
					break;
				case 1:
					tx = cBd.P[idx].x + arrowWidth;
					ty = cBd.P[idx].y + arrowWidth;
					x1 = tx - arrowHeight / 2;
					y1 = ty + arrowHeight / 2;
					x2 = tx + arrowHeight / 2;
					y2 = ty - arrowHeight / 2;
					break;
				case 2:
					x1 = cBd.P[idx].x - arrowHeight / 2;
					x2 = cBd.P[idx].x + arrowHeight / 2;
					y1 = y2 = cBd.P[idx].y + arrowWidth;
					break;
				case 3:
					tx = cBd.P[idx].x - arrowWidth;
					ty = cBd.P[idx].y + arrowWidth;
					x1 = tx - arrowHeight / 2;
					y1 = ty - arrowHeight / 2;
					x2 = tx + arrowHeight / 2;
					y2 = ty + arrowHeight / 2;
					break;
				case 4:
					x1 = x2 = cBd.P[idx].x - arrowWidth;
					y1 = cBd.P[idx].y - arrowHeight / 2;
					y2 = cBd.P[idx].y + arrowHeight / 2;
					break;
				case 5:
					tx = cBd.P[idx].x - arrowWidth;
					ty = cBd.P[idx].y - arrowWidth;
					x1 = tx + arrowHeight / 2;
					y1 = ty - arrowHeight / 2;
					x2 = tx - arrowHeight / 2;
					y2 = ty + arrowHeight / 2;
					break;
				case 6:
					x1 = cBd.P[idx].x - arrowHeight / 2;
					x2 = cBd.P[idx].x + arrowHeight / 2;
					y1 = y2 = cBd.P[idx].y - arrowWidth;
					break;
				case 7:
					tx = cBd.P[idx].x + arrowWidth;
					ty = cBd.P[idx].y - arrowWidth;
					x1 = tx - arrowHeight / 2;
					y1 = ty - arrowHeight / 2;
					x2 = tx + arrowHeight / 2;
					y2 = ty + arrowHeight / 2;
					break;
			}
			arrow.push({ x: cBd.P[idx].x, y: cBd.P[idx].y });
			arrow.push({ x: x1, y: y1 });
			arrow.push({ x: x2, y: y2 });
			return arrow;
		}

	}

	Board.prototype.printTriangle = function({ points, color }, ctx) {
		ctx.moveTo(points[points.length - 1].x, points[points.length - 1].y);
		points.map(point => ctx.lineTo(point.x, point.y));
		ctx.fillStyle = color;
		ctx.fill();
	}

	//print || clear
	Board.prototype._printMarkArrow = function(markArrow, idx, cleArrow) {
		let arrowDrawPoints = this.getMarkArrowPoints(markArrow, idx, cleArrow);
		let ctx = this.canvas.getContext("2d");
		this.printLine({
			x1: arrowDrawPoints.line[0].x,
			y1: arrowDrawPoints.line[0].y,
			x2: arrowDrawPoints.line[1].x,
			y2: arrowDrawPoints.line[1].y,
			color: markArrow.color,
			lineWidth: this.getMarkLineWidth() * (cleArrow ? 1.6 : 1)
		}, ctx);
		if (arrowDrawPoints.arrow.length) {
			this.printTriangle({
				points: arrowDrawPoints.arrow,
				color: markArrow.color
			}, ctx)
		}
		ctx = null;
	}

	Board.prototype.printMarkArrow = function(markArrow, idx) {
		this._printMarkArrow(markArrow, idx);
	}

	Board.prototype.getMarkLinePoints = function(markLine, idx) {
		let points = {
			line: [],
		}
		let x = this.P[markLine.P[0]].x;
		let y = this.P[markLine.P[0]].y;
		if (idx == undefined || idx == null) {
			points.line.push({ x: x, y: y });
			x = this.P[markLine.P[markLine.P.length - 1]].x;
			y = this.P[markLine.P[markLine.P.length - 1]].y;
			points.line.push({ x: x, y: y });
		}
		else {
			if (markLine.P.indexOf(idx) == -1) return;
			let w = this.gW / 2 * 1.07;
			let h = this.gH / 2 * 1.07;
			let x1, x2, y1, y2;
			if (idx == markLine.P[0]) {
				x1 = this.P[idx].x;
				y1 = this.P[idx].y;
				switch (markLine.direction) {
					case 0:
						x2 = x1 - w;
						y2 = y1;
						break;
					case 1:
						x2 = x1 - w - 1;
						y2 = y1 - h - 1;
						break;
					case 2:
						x2 = x1;
						y2 = y1 - h;
						break;
					case 3:
						x2 = x1 + w + 1;
						y2 = y1 - h - 1;
						break;
					case 4:
						x2 = x1 + w;
						y2 = y1;
						break;
					case 5:
						x2 = x1 + w + 1;
						y2 = y1 + h + 1;
						break;
					case 6:
						x2 = x1;
						y2 = y1 + h;
						break;
					case 7:
						x2 = x1 - w - 1;
						y2 = y1 + h + 1;
						break;
				}
			}
			else if (idx == markLine.P[markLine.P.length - 1]) {
				x1 = this.P[idx].x;
				y1 = this.P[idx].y;
				switch (markLine.direction) {
					case 4:
						x2 = x1 - w;
						y2 = y1;
						break;
					case 5:
						x2 = x1 - w - 1;
						y2 = y1 - h - 1;
						break;
					case 6:
						x2 = x1;
						y2 = y1 - h;
						break;
					case 7:
						x2 = x1 + w + 1;
						y2 = y1 - h - 1;
						break;
					case 0:
						x2 = x1 + w;
						y2 = y1;
						break;
					case 1:
						x2 = x1 + w + 1;
						y2 = y1 + h + 1;
						break;
					case 2:
						x2 = x1;
						y2 = y1 + h;
						break;
					case 3:
						x2 = x1 - w - 1;
						y2 = y1 + h + 1;
						break;
				}
			}
			else {
				x = this.P[idx].x;
				y = this.P[idx].y;
				if (markLine.direction == 0 || markLine.direction == 4) {
					x1 = x - w;
					y1 = y;
					x2 = x + w;
					y2 = y;
				}
				else if (markLine.direction == 1 || markLine.direction == 5) {
					x1 = x - w - 1;
					y1 = y - h - 1;
					x2 = x + w + 1;
					y2 = y + h + 1;
				}
				else if (markLine.direction == 2 || markLine.direction == 6) {
					x1 = x;
					y1 = y - h;
					x2 = x;
					y2 = y + h;
				}
				else {
					x1 = x - w - 1;
					y1 = y + h + 1;
					x2 = x + w + 1;
					y2 = y - h - 1;
				}
			}
			points.line.push({ x: x1, y: y1 });
			points.line.push({ x: x2, y: y2 });
		}
		return points;

	}

	//print || clear
	Board.prototype._printMarkLine = function(markLine, idx, cleLine) {
		let lineDrawPoints = this.getMarkLinePoints(markLine, idx);
		let ctx = this.canvas.getContext("2d");
		this.printLine({
			x1: lineDrawPoints.line[0].x,
			y1: lineDrawPoints.line[0].y,
			x2: lineDrawPoints.line[1].x,
			y2: lineDrawPoints.line[1].y,
			color: markLine.color,
			lineWidth: this.getMarkLineWidth() * (cleLine ? 1.6 : 1)
		}, ctx);
		ctx = null;
	}

	Board.prototype.printMarkLine = function(markLine, idx) {
		function refreshIdx(idx) {
			let txt = "";
			if (this.P[idx].text) txt = this.P[idx].text;
			this._printPoint(idx, this.isShowNum);
			this.refreshMarkArrow(idx);
		}

		this._printMarkLine(markLine, idx);
		if (idx == undefined || idx == null) {
			for (let i = markLine.P.length - 1; i >= 0; i--) {
				idx = markLine.P[i];
				refreshIdx.call(this, idx);
			}
		}
		else {
			refreshIdx.call(this, idx);
		}
	}

	Board.prototype.refreshMarkLine = function(idx, lines = this.lines) {
		lines = idx === this.autoLines ? this.autoLines : lines;
		if (idx == "all" || idx == "All") {
			for (let i = 0; i < lines.length; i++) {
				this.printMarkLine(lines[i]);
			}
		}
		else {
			for (let i = 0; i < lines.length; i++) {
				if (lines[i].P.indexOf(idx) + 1) {
					this.printMarkLine(lines[i], idx);
				}
			}
		}
	}

	Board.prototype.refreshMarkArrow = function(idx, arrows = this.arrows) {
		if (idx == "all" || idx == "All") {
			for (let i = 0; i < arrows.length; i++) {
				this.printMarkArrow(arrows[i]);
			}
		}
		else {
			for (let i = 0; i < arrows.length; i++) {
				if (arrows[i].P.indexOf(idx) + 1) {
					this.printMarkArrow(arrows[i]);
				}
			}
		}
	}

	Board.prototype.cleMarkLine = function(markLine) {
		let oldIdx = -1;
		let color = markLine.color;
		markLine.color = this.backgroundColor;
		this._printMarkLine(markLine, undefined, true);
		markLine.color = color;
		for (let i = markLine.P.length - 1; i >= 0; i--) {
			let idx = markLine.P[i];
			let w = markLine.direction == 0 ? this.gW : markLine.direction == 4 ? this.gW : this.gW / 3;
			let h = markLine.direction == 2 ? this.gH : markLine.direction == 6 ? this.gH : this.gH / 3;
			//log(`w=${w}, h=${h}`)
			this.clePointB(idx, w + 1, h + 1);
			if (oldIdx + 1) {
				this.refreshMarkLine(oldIdx, this.autoLines);
				this.refreshMarkLine(oldIdx);
				this._printPoint(oldIdx, this.isShowNum);
				this.refreshMarkArrow(oldIdx);
			}
			oldIdx = idx;
			if (markLine.direction & 1) {
				let nIdx = idx + (markLine.direction < 5 ? 0 - this.SLTX : this.SLTX);
				let nIdx1 = idx + (nIdx < idx ? (markLine.direction == 1 ? -1 : 1) : (markLine.direction == 5 ? 1 : -1));
				if (nIdx >= 0 && nIdx < this.P.length) {
					this.refreshMarkLine(nIdx, this.autoLines);
					this.refreshMarkLine(nIdx);
					this._printPoint(nIdx, this.isShowNum);
					this.refreshMarkArrow(nIdx);
				}
				if (nIdx1 >= 0 && nIdx1 < this.P.length) {
					this.refreshMarkLine(nIdx1, this.autoLines);
					this.refreshMarkLine(nIdx1);
					this._printPoint(nIdx1, this.isShowNum);
					this.refreshMarkArrow(nIdx1);
				}
			}
		}
		if (oldIdx + 1) {
			this.refreshMarkLine(oldIdx, this.autoLines);
			this.refreshMarkLine(oldIdx);
			this._printPoint(oldIdx, this.isShowNum);
			this.refreshMarkArrow(oldIdx);
		}
		if ((markLine.direction + 1) & 1) {
			let idx1, idx2;
			switch (markLine.direction) {
				case 0:
					idx1 = markLine.P[0] + 1;
					idx2 = markLine.P[markLine.P.length - 1] - 1;
					break;
				case 4:
					idx1 = markLine.P[0] - 1;
					idx2 = markLine.P[markLine.P.length - 1] + 1;
					break;
				case 2:
					idx1 = markLine.P[0] + this.SLTX;
					idx2 = markLine.P[markLine.P.length - 1] - this.SLTX;
					break;
				case 6:
					idx1 = markLine.P[0] - this.SLTX;
					idx2 = markLine.P[markLine.P.length - 1] + this.SLTX;
					break;
			}
			this.refreshMarkArrow(idx1);
			this.refreshMarkArrow(idx2);
		}
	}

	Board.prototype.cleMarkArrow = function(markArrow) {
		let oldIdx = -1;
		let color = markArrow.color;
		markArrow.color = this.backgroundColor;
		this._printMarkArrow(markArrow, undefined, true);
		markArrow.color = color;
		for (let i = markArrow.P.length - 1; i >= 0; i--) {
			let idx = markArrow.P[i];
			let w = markArrow.direction == 0 ? this.gW : markArrow.direction == 4 ? this.gW : this.gW / 3;
			let h = markArrow.direction == 2 ? this.gH : markArrow.direction == 6 ? this.gH : this.gH / 3;
			//log(`w=${w}, h=${h}`)
			this.clePointB(idx, w + 1, h + 1);
			if (oldIdx + 1) {
				this.refreshMarkLine(oldIdx, this.autoLines);
				this.refreshMarkLine(oldIdx);
				this._printPoint(oldIdx, this.isShowNum);
				this.refreshMarkArrow(oldIdx);
			}
			oldIdx = idx;
			if (markArrow.direction & 1) {
				let nIdx = idx + (markArrow.direction < 5 ? 0 - this.SLTX : this.SLTX);
				let nIdx1 = idx + (nIdx < idx ? (markArrow.direction == 1 ? -1 : 1) : (markArrow.direction == 5 ? 1 : -1));
				if (nIdx >= 0 && nIdx < this.P.length) {
					this.refreshMarkLine(nIdx, this.autoLines);
					this.refreshMarkLine(nIdx);
					this._printPoint(nIdx, this.isShowNum);
					this.refreshMarkArrow(nIdx);
				}
				if (nIdx1 >= 0 && nIdx1 < this.P.length) {
					this.refreshMarkLine(nIdx1, this.autoLines);
					this.refreshMarkLine(nIdx1);
					this._printPoint(nIdx1, this.isShowNum);
					this.refreshMarkArrow(nIdx1);
				}
			}

		}
		if (oldIdx + 1) {
			this.refreshMarkLine(oldIdx, this.autoLines);
			this.refreshMarkLine(oldIdx);
			this._printPoint(oldIdx, this.isShowNum);
			this.refreshMarkArrow(oldIdx);
		}
		if ((markArrow.direction + 1) & 1) {
			let idx1, idx2;
			switch (markArrow.direction) {
				case 0:
					idx1 = markArrow.P[0] + 1;
					idx2 = markArrow.P[markArrow.P.length - 1] - 1;
					break;
				case 4:
					idx1 = markArrow.P[0] - 1;
					idx2 = markArrow.P[markArrow.P.length - 1] + 1;
					break;
				case 2:
					idx1 = markArrow.P[0] + this.SLTX;
					idx2 = markArrow.P[markArrow.P.length - 1] - this.SLTX;
					break;
				case 6:
					idx1 = markArrow.P[0] - this.SLTX;
					idx2 = markArrow.P[markArrow.P.length - 1] + this.SLTX;
					break;
			}
			this.refreshMarkArrow(idx1);
			this.refreshMarkArrow(idx2);
		}
	}

	Board.prototype.createMarkArrow = function(start, end, color) {
		let x1 = start % 15;
		let y1 = ~~(start / 15);
		let x2 = end % 15;
		let y2 = ~~(end / 15);
		let direction;
		let P = [];
		let n;
		if (x1 == x2 && y1 != y2) {
			direction = start > end ? 2 : 6;
			n = direction == 2 ? 0 - 15 : 15;
		}
		else if (y1 == y2 && x1 != x2) {
			direction = start > end ? 0 : 4;
			n = direction == 0 ? 0 - 1 : 1;
		}
		else if (Math.abs(y1 - y2) == Math.abs(x1 - x2) && x1 != x2) {
			direction = start > end ? (x1 > x2 ? 1 : 3) : (x1 > x2 ? 7 : 5);
			n = direction == 1 ? 0 - 15 - 1 : direction == 3 ? 0 - 15 + 1 : direction == 5 ? 15 + 1 : 15 - 1;
		}
		else {
			return;
		}
		for (let idx = start; idx != end; idx += n) {
			P.push(idx);
		}
		P.push(end);
		let mkArrow = new markArrow(P, color, direction);
		this.arrows.push(mkArrow);
		this.printMarkArrow(mkArrow);
		return mkArrow;
	}

	Board.prototype.createMarkLine = function(start, end, color, lines) {
		let x1 = start % 15;
		let y1 = ~~(start / 15);
		let x2 = end % 15;
		let y2 = ~~(end / 15);
		let direction;
		let P = [];
		let n;
		lines = lines || this.lines;
		if (x1 == x2 && y1 != y2) {
			direction = start > end ? 2 : 6;
			n = direction == 2 ? 0 - 15 : 15;
		}
		else if (y1 == y2 && x1 != x2) {
			direction = start > end ? 0 : 4;
			n = direction == 0 ? 0 - 1 : 1;
		}
		else if (Math.abs(y1 - y2) == Math.abs(x1 - x2) && x1 != x2) {
			direction = start > end ? (x1 > x2 ? 1 : 3) : (x1 > x2 ? 7 : 5);
			n = direction == 1 ? 0 - 15 - 1 : direction == 3 ? 0 - 15 + 1 : direction == 5 ? 15 + 1 : 15 - 1;
		}
		else {
			return;
		}
		for (let idx = start; idx != end; idx += n) {
			P.push(idx);
		}
		P.push(end);
		let mkLine = new markLine(P, color, direction);
		lines.push(mkLine);
		this.printMarkLine(mkLine);
		return mkLine;
	}

	Board.prototype.removeMarkArrow = function(idx, arrows = this.arrows) {
		if (idx == "all" || idx == "All") {
			while (arrows.length) {
				let mkArrow = arrows.pop();
				this.cleMarkArrow(mkArrow);
			}
		}
		else {
			if (idx < 0 || idx >= arrows.length) return;
			let mkArrow = arrows.splice(idx, 1);
			this.cleMarkArrow(mkArrow[0]);
		}
		return true;
	}

	Board.prototype.removeMarkLine = function(idx, lines = this.lines) {
		lines = idx === this.autoLines ? this.autoLines : lines;
		if (idx == "all" || idx == "All" || idx === this.autoLines) {
			while (lines.length) {
				let mkLine = lines.pop();
				this.cleMarkLine(mkLine);
			}
		}
		else {
			if (idx < 0 || idx >= lines.length) return;
			let mkLine = lines.splice(idx, 1);
			this.cleMarkLine(mkLine[0]);
		}
		return true;
	}

	//----------------------------------------

	function refreshLine(idx) {
		let mv = [0, -this.SLTX, this.SLTX, -1, 1];
		for (let i = mv.length - 1; i >= 0; i--) {
			let nIdx = idx + mv[i];
			if (nIdx >= 0 && nIdx < this.P.length) {
				this.refreshMarkLine(nIdx, this.autoLines);
				this.refreshMarkLine(nIdx);
				this.refreshMarkArrow(nIdx);
			}
		}
	}

	function removeAllLine() {
		this.removeMarkArrow("all");
		this.removeMarkLine("all");
		this.removeMarkLine(this.autoLines);
	}

	function refreshNum(callback, ...args) {
		let points = callback.call(this, ...args);
		points.map(idx => {
			this.refreshMarkArrow(idx);
		})
	}

	let cle = CheckerBoard.prototype.cle;
	Board.prototype.cle = function(...args) {
		cle.call(this, ...args);
		removeAllLine.call(this);
		this.drawLineEnd();
	}

	let cleLb = CheckerBoard.prototype.cleLb;
	Board.prototype.cleLb = function(...args) {
		let points = cleLb.call(this, ...args);
		points.map(idx => {
			refreshLine.call(this, idx);
		})
	}

	let cleNb = CheckerBoard.prototype.cleNb;
	Board.prototype.cleNb = function(...args) {
		let points = cleNb.call(this, ...args);
		points.map(idx => {
			refreshLine.call(this, idx);
		})
	}

	let printMoves = CheckerBoard.prototype.printMoves;
	CheckerBoard.prototype.Board = function(...args) {
		cle.printMoves(this, ...args);
		removeAllLine.cal(this);
	}

	Board.prototype.refreshCheckerBoard = function() {
		this.printEmptyCBoard();
		this.refreshMarkLine("all");
		this.refreshBoardPoint("all");
		this.refreshMarkArrow("all");
		this.stonechange();
	}

	let hideNum = CheckerBoard.prototype.hideNum;
	Board.prototype.hideNum = function(...args) {
		refreshNum.call(this, hideNum, ...args);
	}

	let showNum = CheckerBoard.prototype.showNum;
	Board.prototype.showNum = function(...args) {
		refreshNum.call(this, showNum, ...args);
	}

	let showLastNb = CheckerBoard.prototype.showLastNb;
	Board.prototype.showLastNb = function(...args) {
		refreshNum.call(this, showLastNb, ...args);
	}

	let wLb = CheckerBoard.prototype.wLb;
	Board.prototype.wLb = function(...args) {
		refreshNum.call(this, wLb, ...args);
	}

	let wNb = CheckerBoard.prototype.wNb;
	Board.prototype.wNb = function(...args) {
		refreshNum.call(this, wNb, ...args);
	}

	//----------------------------------------


	exports.TYPE_MARKARROW = TYPE_MARKARROW;
	exports.TYPE_MARKLINE = TYPE_MARKLINE;

	exports.CheckerBoard = Board;

})))