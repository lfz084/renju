'use strict';
window.addEventListener("error", (event) => {
	let textContent = `${event.type}: ${event.message}\n`;
	console.error(textContent);
})

//------------------------------------------------------------

async function wait(timeout) {
	return new Promise(resolve => setTimeout(resolve, timeout))
}

//------------------------------------------------------------

async function _readFileAsType(file, type = "readAsArrayBuffer") {
	return new Promise(function(resolve, reject) {
		let fr = new FileReader();
		fr.onload = function() {
			resolve(fr.result)
		};
		fr.onerror = function() {
			reject(fr.error)
		};
		fr[type](file);
	});
}

Blob.prototype.arrayBuffer = Blob.prototype.arrayBuffer || async function() {
	return _readFileAsType(this, "readAsArrayBuffer");
};

Blob.prototype.text = Blob.prototype.text || async function() {
	return _readFileAsType(this, "readAsText");
};

//------------------------------------------------------------

/**
 * 当对象属性与 value 想等时， resolve(obj[key])
 * @obj			要判断的对象
 * @key			要判断的属性名
 * @value		要判断的值
 * @timeout		循环的间隔时间
 */
async function waitValue(obj, key, value, timeout = 500) {
	return new Promise((resolve) => {
		let timer = setInterval(() => {
			if (obj[key] == value) {
				clearInterval(timer);
				resolve(obj[key]);
			}
		}, timeout)
	})
}
/**
 * 当对象属性与 value 不等时， resolve(obj[key])
 * @obj			要判断的对象
 * @key			要判断的属性名
 * @value		要判断的值
 * @timeout		循环的间隔时间
 */
async function waitValueChange(obj, key, value, timeout = 500) {
	return new Promise((resolve) => {
		let timer = setInterval(() => {
			if (obj[key] != value) {
				clearInterval(timer);
				resolve(obj[key]);
			}
		}, timeout)
	})
}

//------------------------------------------------------------
window.alert = function(name) { //更改默认标题
	const iframe = document.createElement('iframe');
	iframe.style.display = 'none';
	iframe.setAttribute('src', 'data:text/plain,');
	document.documentElement.appendChild(iframe);
	window.frames[0].window.alert(name);
	iframe.parentNode.removeChild(iframe)
};

window.prompt = function(name) { //更改默认标题
	const iframe = document.createElement('iframe');
	iframe.style.display = 'none';
	iframe.setAttribute('src', 'data:text/plain,');
	document.documentElement.appendChild(iframe);
	setTimeout(() => { iframe.parentNode.removeChild(iframe) }, 100);
	return window.frames[0].window.prompt(name);
};

//------------------------------------------------------------

function $(id) { return document.getElementById(id) }

//-------------------  board Array ---------------------------

function getArr2D(arr, setnum = 0, x = 15, y = 15) {
	let j = 0;
	arr.length = 0;
	for (j = 0; j < y; j++) {
		arr[j] = [];
		for (let i = 0; i < x; i++) {
			arr[j][i] = setnum;
		}
	}
	return arr;
}

function arrayToArray2D(array) {
	const arr2D = [];
	for (let i = 0; i < 15; i++) {
		arr2D.push(array.slice(i * 15, (i + 1) * 15));
	}
	return arr2D;
}

function array2DToArray(arr2D) {
	const array = [];
	for (let y = 0; y < 15; y++) {
		for (let x = 0; x < 15; x++) {
			array[y * 15 + x] = arr2D[y][x];
		}
	}
	array[225] = -1;
	return array;
}

//-------------------  坐标原点转换 ---------------------------

function coordinateMove(htmlElement) {
	let l = htmlElement.offsetLeft;
	let t = htmlElement.offsetTop;
	let parentNode = htmlElement.parentNode;
	while (parentNode != document.body && parentNode != null) {
		l += parentNode.offsetLeft;
		t += parentNode.offsetTop;
		parentNode = parentNode.parentNode;
	}
	return { moveX: l, moveY: t }
}

function xyPageToObj(point, htmlElement) { // Page 原点坐标 转 obj 原点坐标（左上角）
	const m = coordinateMove(htmlElement);
	point.x = point.x - m.moveX;
	point.y = point.y - m.moveY;
	return point;
}

function xyObjToPage(point, htmlElement) { // obj 原点坐标 转 page 原点坐标（左上角）
	const m = coordinateMove(htmlElement);
	point.x = point.x + m.moveX;
	point.y = point.y + m.moveY;
	return point;
}

function xyLeftToRight(pointLeft, htmlElementL, htmlElementR) { // obj1 原点坐标 转 obj2 原点坐标（左上角）
	xyObjToPage(pointLeft, htmlElementL);
	xyPageToObj(pointLeft, htmlElementR);
	return pointLeft;
}

//--------------------- htmlElement bind click event ---------------------------------

function setClick(elem, callback = () => {}, timeout = 300) {
	let startX = 0,
		startY = 0;
	elem.onclick = (() => {
		let busy = false;
		return () => {
			if (busy) return;
			busy = true;
			setTimeout(() => { busy = false; }, 1000);
			setTimeout(() => {
				callback();
			}, timeout); //延迟，避免某些浏览器触发窗口下一层elem的click事件。
		};
	})();

	elem.addEventListener("touchstart", (event) => {
		startX = event.changedTouches[0].pageX;
		startY = event.changedTouches[0].pageY;
	}, true);
	elem.addEventListener("touchend", (event) => {
		event.preventDefault();
		let tX = event.changedTouches[0].pageX;
		let tY = event.changedTouches[0].pageY;
		if ((Math.abs(startX - tX) < 30) && (Math.abs(startY - tY) < 30)) {
			elem.onclick();
		}
	}, true);
}

function setButtonClick(elem, callback = () => {}) {
	setClick(elem, () => {
		let bkColor = elem.style.opacity;
		elem.style.opacity = "0.2";
		setTimeout(() => {
			elem.style.opacity = bkColor;
			callback();
		}, 300);
	}, 0);
}


//----------------------  退出前确认 ------------------------------------

(() => {
	const funBlockUnload = function(e) {
		e = e || window.event;
		// 兼容IE8和Firefox 4之前的版本
		if (e) {
			e.returnValue = '离开提示';
		}
		// Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
		return '离开提示';
	}

	let block = false;

	window.setBlockUnload = function setBlockUnload(enable) {
		if (enable && !block) {
			window.addEventListener("beforeunload", funBlockUnload, true)
			block = true;
			console.warn("blockUnload: enable");
		}
		else if (!enable && block) {
			window.removeEventListener("beforeunload", funBlockUnload, true)
			block = false;
			console.warn("blockUnload: disable");
		}
	}

	self.getBlockUnload = function getBlockUnload() {
		return block && !confirm(`离开页面可能会丢失数据，是否离开`)
	}
})()

//----------------------  bufferToBase64String ----------------

function bufferToBase64String(buffer) {
	let base64 = btoa(
		new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
	);
	return base64;
}

function base64StringToBuffer(str) {
	let asciiString = atob(str);
	return new Uint8Array([...asciiString].map(char => char.charCodeAt(0))).buffer;
}

function replaceAll(str, pattern, replacement) {
	if (str.replaceAll) return str.replaceAll(pattern, replacement);
	let loopCount = str.length
	while (str.indexOf(pattern) + 1 && loopCount-- > 0) {
		str = str.replace(pattern, replacement);
	}
	return str;
}

//----------------------  Color Names To HTML Color Codes ----------------

function colorName2colorCode(name) {
	const list = {
		AliceBlue: "#F0F8FF",
		AntiqueWhite: "#FAEBD7",
		Aqua: "#00FFFF",
		Aquamarine: "#7FFFD4",
		Azure: "#F0FFFF",
		Beige: "#F5F5DC",
		Bisque: "#FFE4C4",
		Black: "#000000",
		BlanchedAlmond: "#FFEBCD",
		Blue: "#0000FF",
		BlueViolet: "#8A2BE2",
		Brown: "#A52A2A",
		BurlyWood: "#DEB887",
		CadetBlue: "#5F9EA0",
		Chartreuse: "#7FFF00",
		Chocolate: "#D2691E",
		Coral: "#FF7F50",
		CornflowerBlue: "#6495ED",
		Cornsilk: "#FFF8DC",
		Crimson: "#DC143C",
		Cyan: "#00FFFF",
		DarkBlue: "#00008B",
		DarkCyan: "#008B8B",
		DarkGoldenRod: "#B8860B",
		DarkGray: "#A9A9A9",
		DarkGreen: "#006400",
		DarkKhaki: "#BDB76B",
		DarkMagenta: "#8B008B",
		DarkOliveGreen: "#556B2F",
		Darkorange: "#FF8C00",
		DarkOrchid: "#9932CC",
		DarkRed: "#8B0000",
		DarkSalmon: "#E9967A",
		DarkSeaGreen: "#8FBC8F",
		DarkSlateBlue: "#483D8B",
		DarkSlateGray: "#2F4F4F",
		DarkTurquoise: "#00CED1",
		DarkViolet: "#9400D3",
		DeepPink: "#FF1493",
		DeepSkyBlue: "#00BFFF",
		DimGray: "#696969",
		DodgerBlue: "#1E90FF",
		Feldspar: "#D19275",
		FireBrick: "#B22222",
		FloralWhite: "#FFFAF0",
		ForestGreen: "#228B22",
		Fuchsia: "#FF00FF",
		Gainsboro: "#DCDCDC",
		GhostWhite: "#F8F8FF",
		Gold: "#FFD700",
		GoldenRod: "#DAA520",
		Gray: "#808080",
		Green: "#008000",
		GreenYellow: "#ADFF2F",
		HoneyDew: "#F0FFF0",
		HotPink: "#FF69B4",
		IndianRed: "#CD5C5C",
		Indigo: "#4B0082",
		Ivory: "#FFFFF0",
		Khaki: "#F0E68C",
		Lavender: "#E6E6FA",
		LavenderBlush: "#FFF0F5",
		LawnGreen: "#7CFC00",
		LemonChiffon: "#FFFACD",
		LightBlue: "#ADD8E6",
		LightCoral: "#F08080",
		LightCyan: "#E0FFFF",
		LightGoldenRodYellow: "#FAFAD2",
		LightGrey: "#D3D3D3",
		LightGreen: "#90EE90",
		LightPink: "#FFB6C1",
		LightSalmon: "#FFA07A",
		LightSeaGreen: "#20B2AA",
		LightSkyBlue: "#87CEFA",
		LightSlateBlue: "#8470FF",
		LightSlateGray: "#778899",
		LightSteelBlue: "#B0C4DE",
		LightYellow: "#FFFFE0",
		Lime: "#00FF00",
		LimeGreen: "#32CD32",
		Linen: "#FAF0E6",
		Magenta: "#FF00FF",
		Maroon: "#800000",
		MediumAquaMarine: "#66CDAA",
		MediumBlue: "#0000CD",
		MediumOrchid: "#BA55D3",
		MediumPurple: "#9370D8",
		MediumSeaGreen: "#3CB371",
		MediumSlateBlue: "#7B68EE",
		MediumSpringGreen: "#00FA9A",
		MediumTurquoise: "#48D1CC",
		MediumVioletRed: "#C71585",
		MidnightBlue: "#191970",
		MintCream: "#F5FFFA",
		MistyRose: "#FFE4E1",
		Moccasin: "#FFE4B5",
		NavajoWhite: "#FFDEAD",
		Navy: "#000080",
		OldLace: "#FDF5E6",
		Olive: "#808000",
		OliveDrab: "#6B8E23",
		Orange: "#FFA500",
		OrangeRed: "#FF4500",
		Orchid: "#DA70D6",
		PaleGoldenRod: "#EEE8AA",
		PaleGreen: "#98FB98",
		PaleTurquoise: "#AFEEEE",
		PaleVioletRed: "#D87093",
		PapayaWhip: "#FFEFD5",
		PeachPuff: "#FFDAB9",
		Peru: "#CD853F",
		Pink: "#FFC0CB",
		Plum: "#DDA0DD",
		PowderBlue: "#B0E0E6",
		Purple: "#800080",
		Red: "#FF0000",
		RosyBrown: "#BC8F8F",
		RoyalBlue: "#4169E1",
		SaddleBrown: "#8B4513",
		Salmon: "#FA8072",
		SandyBrown: "#F4A460",
		SeaGreen: "#2E8B57",
		SeaShell: "#FFF5EE",
		Sienna: "#A0522D",
		Silver: "#C0C0C0",
		SkyBlue: "#87CEEB",
		SlateBlue: "#6A5ACD",
		SlateGray: "#708090",
		Snow: "#FFFAFA",
		SpringGreen: "#00FF7F",
		SteelBlue: "#4682B4",
		Tan: "#D2B48C",
		Teal: "#008080",
		Thistle: "#D8BFD8",
		Tomato: "#FF6347",
		Turquoise: "#40E0D0",
		Violet: "#EE82EE",
		VioletRed: "#D02090",
		Wheat: "#F5DEB3",
		White: "#FFFFFF",
		WhiteSmoke: "#F5F5F5",
		Yellow: "#FFFF00",
		YellowGreen: "#9ACD32"
	}
	if (name[0] == "#") {
		const reg3 = /^#[A-Fa-f0-9]{3}$/;
		const reg6 = /^#[A-Fa-f0-9]{6}$/;
		if (reg6.test(name)) return name;
		if (reg3.test(name)) return name[0] + name[1] + name[1] + name[2] + name[2] + name[3] + name[3];
	}
	for (const color in list) {
		if (color.toUpperCase() == name.toUpperCase()) return list[color];
	}
}