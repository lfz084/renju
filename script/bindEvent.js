window.bindEvent = (function() {
	'use strict';

	//---------------------- Event Area --------------------
	
	let eventArea;
	let enabled = true;
	
	function isOutArea(x, y) {
		return eventArea && isOut(x, y, eventArea);
	}
	
	//---------------------- EventListener --------------------

	//用来保存跟踪正在发送的触摸事件
	const MAX_TOUCH_NUM = 2; // 最大支持双指触控
	const MAX_CANCEL_MOVE = 15; // touchStart, touchEnd 移动超过 50 取消事件
	const CONTEXTMENU_COUNTDOWN = 500; // contextmenu 事件倒计时 500 毫秒
	const CANCEL_CONTEXTMEMU_TIMEOUT = 1000; // contextmenu 1秒内只能触发一次
	const DBL_TOUCH_START_COUNTDOWN = 300; // dbltouchstart 事件倒计时 500 毫秒
	const CLICK_COUNTDOWN = 0; // click 事件倒计时，数字太小可能导致 dblclick 事件同时触发 CLICK_COUNTDOWN < DBL_TOUCH_START_COUNTDOWN
	const bodyStartTouches = []; // 辅助判断 touchstart 多指触摸。因为很难同时多指触发 touchstart
	const bodyPreviousTouch = [];
	let moveX = 0;
	let moveY = 0;
	let distance = 0;
	let isBodyClick = false; // 辅助判断单击
	let timerContextMenu = null;
	let timerClick = null;
	let selectArea = false;

	//拷贝一个触摸对象
	function copyTouch(touch, touchNum) {
		return { identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY, touchNum: touchNum };
	}

	//找出正在进行的触摸
	function onTouchesIndex(idToFind, touches) {
		for (let i = 0; i < touches.length; i++) {
			let id = touches[i].identifier;
			if (id == idToFind) return i;
		}
		return -1; //notfound
	}

	//处理触摸开始事件
	function bodyTouchStart(event) {
		if (!enabled) return;
		let touches = event.changedTouches; // touchstart  事件里面 event.changedTouches.length === 1
		moveX = touches[0].pageX;
		moveY = touches[0].pageY;
		if (bodyStartTouches.length == 0) {
			if (timerClick) { // 取消上次单击事件，避免与（单击，双击）事件同时触发
				clearTimeout(timerClick);
				timerClick = null;
			}
			if (bodyPreviousTouch.length) { //触发 dbltouchstart
				event.preventDefault();
				bodyDblTouchStart();
				// 触发长按事件之前删除定时器，变量timerContextMenu还要用来判断双击事件，由touchend 清空变量。
				setTimeout(function() { clearTimeout(timerContextMenu) }, 0);
			}

			//初始化长按事件
			if (!timerContextMenu) {
		        timerContextMenu = setTimeout(bodyContextMenu, CONTEXTMENU_COUNTDOWN);
			}
			//保存当前触摸点
			bodyStartTouches.push(copyTouch(touches[0], 1));
			//初始化单击事件
			isBodyClick = true;
		}
		else {
			// 多点触摸取消长按事件
			if (timerContextMenu) {
				clearTimeout(timerContextMenu);
				timerContextMenu = null;
			}
			let touchNum = bodyStartTouches.length + 1; //判断是第几个手指触摸屏幕
			if (touchNum <= MAX_TOUCH_NUM) { //超过最大触控点数忽略
				// 多点触摸 取消单击事件。
				isBodyClick = false;
				bodyStartTouches.push(copyTouch(touches[0], touchNum));
				if (bodyStartTouches.length == 2) {
					bodyZoomStart(); // 两指缩放开始
				}
			}
		}
	}

	//处理触摸移动事件
	function bodyTouchMove(event) {
		if (!enabled) return;
		let touches = event.changedTouches;
		moveX = touches[0].pageX;
		moveY = touches[0].pageY;
		selectArea && event.preventDefault();
		if (bodyStartTouches.length && Math.abs(bodyStartTouches[0].pageX - touches[0].pageX) && Math.abs(bodyStartTouches[0].pageY - touches[0].pageY)) {
			isBodyClick = false; // 取消单击事件。
			if (timerContextMenu) { //取消长按事件
				clearTimeout(timerContextMenu);
				timerContextMenu = null;
			}
		}
		if (touches.length == 2) {
			bodyZoom(event); // 两指缩放中
		}
	}

	//处理触摸结束事件
	function bodyTouchEnd(event) {
		if (!enabled) return;
		let cancelClick = false;
		let touches = event.changedTouches;
		let idx = onTouchesIndex(touches[0].identifier, bodyStartTouches);
		if (timerContextMenu) { //取消长按事件
			clearTimeout(timerContextMenu);
			timerContextMenu = null;
		}
		else { // 触发了长按事件，取消单击
			cancelClick = true;
		}
		if (idx >= 0) {
			let sX = bodyStartTouches[idx].pageX;
			let sY = bodyStartTouches[idx].pageY;
			let tX = touches[0].pageX;
			let tY = touches[0].pageY;
			let xMove = tX - sX;
			let yMove = tY - sY;
			let touchNum = bodyStartTouches.length; //判断是第几个手指触摸屏幕

			if (touchNum > MAX_TOUCH_NUM) { // 超过最大触控点数重置触摸跟踪
				bodyStartTouches.length = 0; //remove it; we're done
				distance = 0;
				return;
			}
			if (!cancelClick && isBodyClick) {
				//log(`cancelClick=${cancelClick}, isBodyClick=${isBodyClick}, length=${bodyPreviousTouch.length } `);
				event.preventDefault(); // 屏蔽浏览器 自动触发鼠标 click 事件，导致一次触摸点击产生两个 click 事件
				if ((bodyPreviousTouch.length > 0) &&
					(Math.abs(bodyPreviousTouch[0].pageX - tX) < MAX_CANCEL_MOVE) &&
					(Math.abs(bodyPreviousTouch[0].pageY - tY) < MAX_CANCEL_MOVE)
				) {
					bodyPreviousTouch.length = 0;
					/////////这里添加双击事件////////
					bodyDblClick(tX, tY);
				}
				else {
					bodyPreviousTouch[0] = copyTouch(touches[0], 1);
					setTimeout(() => {
						bodyPreviousTouch.length = 0;
					}, DBL_TOUCH_START_COUNTDOWN);
					/////////这里添加单击事件////////
					timerClick = setTimeout(bodyClick, CLICK_COUNTDOWN, tX, tY);
				}
			}
			bodyStartTouches.splice(idx, 1); //remove it;we're done
		}
		else { // 出错重新初始化 触摸跟踪
			bodyStartTouches.length = 0;
		}
		bodyStartTouches.length = 0;
		selectArea = false;
		distance = 0;
	}

	//处理触摸对出事件
	function bodyTouchCancel(event) {
		//log(`touchCancel`)
		if (!enabled) return;
		let touches = event.changedTouches;
		if (timerContextMenu) { // 取消长按事件
			clearTimeout(timerContextMenu);
			timerContextMenu = null;
		}
		bodyStartTouches.length = 0;
		selectArea = false;
		distance = 0;
	}

	function bodyClick(x, y) {
		if (!enabled) return;
		x = event && event.type == "click" ? event.pageX : x;
		y = event && event.type == "click" ? event.pageY : y;
		//log(`bodyClick x = ${x}, y = ${y}`)
		loopEvents("click", true, x, y);
	}

	function bodyDblClick(x, y) {
		if (!enabled) return;
		x = event && event.type == "dblclick" ? event.pageX : x;
		y = event && event.type == "dblclick" ? event.pageY : y;
		//log(`bodyDblClick x = ${x}, y = ${y}`)
		loopEvents("dblclick", true, x, y);
	}

	let cancelContextmenu = false;

	function bodyContextMenu() {
	    self["event"] && event.preventDefault();
		if (!enabled) return;
		if (cancelContextmenu) return;
		if (timerContextMenu) {
			clearTimeout(timerContextMenu);
			timerContextMenu = null;
		}
		cancelContextmenu = true;
		selectArea = true;
		setTimeout(() => {
			cancelContextmenu = false;
		}, CANCEL_CONTEXTMEMU_TIMEOUT);
		//log(event)
		let x = bodyStartTouches[0] ? bodyStartTouches[0].pageX : event.pageX;
		let y = bodyStartTouches[0] ? bodyStartTouches[0].pageY : event.pageY;
		// 恢复下一次长按事件
		bodyStartTouches.length = 0;
		distance = 0;
		//log(`bodyContextMenu x = ${x}, y = ${y}`)
		loopEvents("contextmenu", true, x, y);
	}

	function bodyDblTouchStart() {
		let x = ~~(moveX);
		let y = ~~(moveY);
		//log(`bodyDblTouchStart x = ${x}, y = ${y}`)
		loopEvents("dbltouchstart", true, x, y);
	}

	function bodyZoomStart() {
		const x1 = bodyStartTouches[0].pageX;
		const y1 = bodyStartTouches[0].pageY;
		const x2 = bodyStartTouches[1].pageX;
		const y2 = bodyStartTouches[1].pageY;
		const rt = loopEvents("zoomstart", true, x1, y1, x2, y2);
		if (rt) { //  如果有 htmlElement 触发 zoomstart 事件
			event.preventDefault();
			distance = Math.hypot(x1 - x2, y1 - y2);
		}
	}

	function bodyZoom(event) {
		const oldDistance = distance;
		const touches = event.changedTouches;
		if (!oldDistance) return; // touchstart 出错，退出
		distance = Math.hypot(touches[0].pageX - touches[1].pageX, touches[0].pageY - touches[1].pageY);
		//log(`bodyZoom scale = ${distance/oldDistance}`);
		loopEvents("zoom", true, touches[0].pageX, touches[0].pageY, touches[1].pageX, touches[1].pageY, distance / oldDistance);
	}

	// -------------------- bodyDiv  --------------------

	let bodyDiv; // 通过 bodyDiv 监听 event, bodyDiv左上角必须与body重合,
	let bodyDivScale = 1; // 如果用 css scale bodyDid 时，事件返回的是屏幕坐标， 需要 scale 计算实际坐标

	function addEvents() {
		bodyDiv.addEventListener("contextmenu", bodyContextMenu, false);
		bodyDiv.addEventListener("touchstart", bodyTouchStart, false);
		bodyDiv.addEventListener("touchend", bodyTouchEnd, false);
		bodyDiv.addEventListener("touchcancel", bodyTouchCancel, false);
		bodyDiv.addEventListener("touchleave", bodyTouchCancel, false);
		bodyDiv.addEventListener("touchmove", bodyTouchMove, false);
		bodyDiv.addEventListener("click", bodyClick, false);
		bodyDiv.addEventListener("dblclick", bodyDblClick, false);
	}

	function removeEvents() {
		bodyDiv.removeEventListener("contextmenu", bodyContextMenu, false);
		bodyDiv.removeEventListener("touchstart", bodyTouchStart, false);
		bodyDiv.removeEventListener("touchend", bodyTouchEnd, false);
		bodyDiv.removeEventListener("touchcancel", bodyTouchCancel, false);
		bodyDiv.removeEventListener("touchleave", bodyTouchCancel, false);
		bodyDiv.removeEventListener("touchmove", bodyTouchMove, false);
		bodyDiv.removeEventListener("click", bodyClick, false);
		bodyDiv.removeEventListener("dblclick", bodyDblClick, false);
	}

	function toPageCoordinate(point, htmlElement) {
		let l = htmlElement.offsetLeft;
		let t = htmlElement.offsetTop;
		let parentNode = htmlElement.parentNode;
		while (parentNode != document.body && parentNode != null) {
			l += parentNode.offsetLeft;
			t += parentNode.offsetTop;
			parentNode = parentNode.parentNode;
		}
		point.x = point.x + l;
		point.y = point.y + t;
		return point;
	}

	function isOut(x, y, htmlElement, width = 0) {
		let p = { x: 0 - width, y: 0 - width };
		toPageCoordinate(p, htmlElement);
		let xL = p.x,
			xR = xL + parseInt(htmlElement.style.width) + 2 * width,
			yT = p.y,
			yB = yT + parseInt(htmlElement.style.height) + 2 * width;
		return x < xL || x > xR || y < yT || y > yB;
	}

	//------------------------ Event Loop ----------------------

	//{element: htmlElement, callbackList: []}
	// zoom 需要 zoomstart 来触发, 单独添加 zoom 不会触发事件
	const clickEvents = [],
		dblclickEvents = [],
		contextmenuEvents = [],
		dbltouchstartEvents = [],
		zoomstartEvents = [],
		zoomEvents = [];
	const EVENTLIST = {
		click: clickEvents,
		dblclick: dblclickEvents,
		contextmenu: contextmenuEvents,
		dbltouchstart: dbltouchstartEvents,
		zoomstart: zoomstartEvents,
		zoom: zoomEvents
	}

	function eventIndex(htmlElement, list) {
		let i;
		for (i = list.length - 1; i >= 0; i--)
			if (list[i].element == htmlElement) return i;
		return -1;
	}

	function getEventObject(htmlElement, type) {
		const list = EVENTLIST[type];
		if (list) {
			for (let i = list.length - 1; i >= 0; i--)
				if (list[i].element == htmlElement) return list[i];
		}
	}

	function pushEventObject(htmlElement, type) {
		const list = EVENTLIST[type];
		if (list) {
			list.push({ element: htmlElement, callbackList: [] });
			return list[list.length - 1];
		}
	}

	function loopEvents(type, checkOut, x, y, ...args) {
		x /= bodyDivScale;
		y /= bodyDivScale;
		const list = EVENTLIST[type];
		let result = false;
		if (list) {
			for(let i = 0; i < list.length; i++) {
				const evtObj = list[i];
				if (!checkOut || !isOut(x, y, evtObj.element)) {
					//log(evtObj.callbackList.length)
					if (type == "zoom" || type == "zoomstart") {
						args[0] /= bodyDivScale;
						args[1] /= bodyDivScale;
						if (isOut(args[0], args[1], evtObj.element)) return;
					}
					for(let j = 0; j < evtObj.callbackList.length; j++) {
						const callback = evtObj.callbackList[j];
						try{callback(x, y, ...args)}catch(e){};
						result = true;
					}
				}
			}
		}
		return result;
	}
	
	function onEvent(htmlElement, type, x = 1, y = 1, ...args) {
		const list = EVENTLIST[type];
		let result = false;
		if (list) {
			for (let i = 0; i < list.length; i++) {
				const evtObj = list[i];
				if (evtObj.element == htmlElement) {
					for (let j = 0; j < evtObj.callbackList.length; j++) {
						const callback = evtObj.callbackList[j];
						try { callback(x, y, ...args) } catch (e) {};
						result = true;
					}
				}
			}
		}
		return result;
	}

	//------------------------ exports ---------------------------

	/**
	 * 指定一个htmlElement，用来接收事件
	 * @htmlElement 接收事件的对象
	 * @scale htmlElement缩放比例
	 */
	function setBodyDiv(htmlElement, scale = 1, area = htmlElement) {
		bodyDiv && removeEvents();
		bodyDiv = htmlElement;
		bodyDivScale = scale;
		eventArea = area;
		addEvents();
	}

	function addCallback(eventObject, callback) {
		for (let i = eventObject.callbackList.length - 1; i >= 0; i--)
			if (eventObject.callbackList[i] == callback) return;
		eventObject.callbackList.push(callback);
	}

	function removeCallback(eventObject, callback) {
		for (let i = eventObject.callbackList.length - 1; i >= 0; i--)
			if (eventObject.callbackList[i] == callback) eventObject.callbackList.splice(i, 1);
	}
	
	/**
	 * 添加一个监听事件
	 * @htmlElement target element
	 * @type event string {"click" || "dblclick" || "contextmenu" || "dbltouchstart" || "zoomstart" || "zoom"}
	 * @listens function
	 */
	function addEventListener(htmlElement, type, listener) {
		let evtObj = getEventObject(htmlElement, type);
		!evtObj && (evtObj = pushEventObject(htmlElement, type));
		evtObj && addCallback(evtObj, listener);
	}
	
	/**
	 * 移除一个监听事件
	 */
	function removeEventListener(htmlElement, type, listener) {
		let evtObj = getEventObject(htmlElement, type);
		evtObj && removeCallback(evtObj, listener);
	}

	return {
		setBodyDiv: setBodyDiv,
		addEventListener: addEventListener,
		removeEventListener: removeEventListener,
		onEvent: onEvent,
		get enabled() { return enabled },
		set enabled(b) { enabled = !!b },
	}
})()