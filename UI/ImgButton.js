//if (self.SCRIPT_VERSIONS) self.SCRIPT_VERSIONS["button"] = "2024.23206";
(function(global, factory) {
	(global = global || self, factory(global));
}(this, (function(exports) {
	'use strict';
		//------------------------ Animation ------------------
	/** 封装好的动画函数
	 * @callbackCondition {function} 返回一个bool值，false 立刻关闭动画
	 * @callBackFrame {function} 处理每一针动画
	 * @callBackStart {function} 可选，动画开始前执行
	 * @callbackEnd {function} 可选，动画结束后执行
	 */
    const animation = (() => {
        let _callbackCondition = () => {},
            _callBackStart = () => {},
            _callBackFrame = () => {},
            _callbackEnd = () => {},
            _isBusy = false,
            _animation = null;

        function scrollTo() {
            _callBackFrame();
            if (_callbackCondition()) {
                _animation = requestAnimationFrame(scrollTo);
            }
            else {
                cancelAnima();
            }
        }

        function cancelAnima() {
            cancelAnimationFrame(_animation);
            _callbackEnd();
            _callbackCondition = () => {};
            _callBackStart = () => {};
            _callBackFrame = () => {};
            _callbackEnd = () => {};
            _animation = null;
            _isBusy = false;
        }
        return (callbackCondition, callBackFrame, callBackStart = () => {}, callbackEnd = () => {}) => {
            if (_isBusy) return;
            _isBusy = true;
            _callbackCondition = callbackCondition;
            _callBackStart = callBackStart;
            _callBackFrame = callBackFrame;
            _callbackEnd = callbackEnd;
            _callBackStart();
            scrollTo();
            return true;
        }
    })();
    
    function animationMoveBoard(x, y) {
    	try{
    	const body = document.body;
    	let isExitAnima = false;
    	const bodyScale = 1;
    	const scale = this.scale;
    
    	const setMove = function() {
    		const touche = event.type == "mousemove" ? event : event.changedTouches[0];
    		if (event.type == "mousemove" || event.changedTouches.length == 1) {
    			moveX = touche.pageX / bodyScale;
    			moveY = touche.pageY / bodyScale;
    		}
    	}.bind(this)
    
    	function exitAnima() {
    		isExitAnima = true;
    	}
    
    	let startX = x / bodyScale,
    		startY = y / bodyScale,
    		moveX = x / bodyScale,
    		moveY = y / bodyScale,
    		startLeft = parseInt(this.board.style.left),
    		startTop = parseInt(this.board.style.top);
    	
    	body.addEventListener("touchmove", setMove, true);
    	body.addEventListener("touchend", exitAnima, true);
    	body.addEventListener("touchcancel", exitAnima, true);
    	body.addEventListener("touchleave", exitAnima, true);
    	body.addEventListener("mousemove", setMove, true);
    	body.addEventListener("mouseup", exitAnima, true);
    	body.addEventListener("mouseout", exitAnima, true);
    	body.addEventListener("mouseleave", exitAnima, true);
    
    	animation(() => !isExitAnima,
    		() => {
    			this.board.style.left = startLeft + (moveX - startX) / scale + "px";
    			this.board.style.top = startTop + (moveY - startY) / scale + "px";
    		},
    		() => {},
    		() => {
    			body.removeEventListener("touchmove", setMove, true);
    			body.removeEventListener("touchend", exitAnima, true);
    			body.removeEventListener("touchcancel", exitAnima, true);
    			body.removeEventListener("touchleave", exitAnima, true);
    			body.removeEventListener("mousemove", setMove, true);
    			body.removeEventListener("mouseup", exitAnima, true);
    			body.removeEventListener("mouseout", exitAnima, true);
    			body.removeEventListener("mouseleave", exitAnima, true);
    		})
    	}catch(e){alert(e.stack)}
    }
    
    const animaLine32 = [0,0.000033567184720217515,0.0002685374777617401,0.000906313987445873,0.002148299822093921,0.00419589809002719,0.007250511899566984,0.011513544359034608,0.017186398576751367,0.02447047766103857,0.03356718472021752,0.04467792286260951,0.05800409519653587,0.07374710483031788,0.09210835487227687,0.11328924843073411,0.13749118861401094,0.16491557853042865,0.19576382128830855,0.23023731999597194,0.26853747776174014,0.3108656976939344,0.3574233829008761,0.40841193649088653,0.46403276157228696,0.5244872612533987,0.589976838642543,0.6607028968480414,0.7368668389782149,0.818670068141385,0.9063139874458729,1];
    const animaLine16 = [0,0.0002962962962962963,0.0023703703703703703,0.008,0.018962962962962963,0.037037037037037035,0.064,0.10162962962962963,0.1517037037037037,0.216,0.2962962962962963,0.39437037037037037,0.512,0.650962962962963,0.813037037037037,1];
    //------------------------ ImgButton --------------------------
    

	class ImgButton extends Button {
		constructor(parentNode, left, top, width, height) {
			super(parentNode, "img", left, top, width, height);
			this.img = document.createElement("img");
			this.img.style.cursor = "default";
			this.div.appendChild(this.img);
			this.icons = [];
			this.clickFunctions = [];
			this.clickFunctionIndex = 0;
			this.show();
		}
	}


	/*
	const butStyle = {
		position: "absolute",
		width: imgWidth + "px",
		height: imgWidth + "px",
		borderRadius: this.width / 2 + "px",
		border: "none",
		zIndex: "#ffffff",
		opacity: "1",
		color: "white",
		fontSize: "100px",
		backgroundColor: "black",
		padding: `${butPadding}px ${butPadding}px ${butPadding}px ${butPadding}px`
	};*/

	const show = Button.prototype.show;
	ImgButton.prototype.show = function() {
		show.call(this, this.left, this.top, this.width, this.height);
		Object.assign(this.img.style, {
			position: "absolute",
			left: parseInt(this.width) / 4 + "px",
			top: parseInt(this.height) / 4 + "px",
			width: parseInt(this.width) / 2 + "px",
			height: parseInt(this.height) / 2 + "px"
		})
		
		if (this.icons.length) {
			this.img.style.opacity = "1"
			this.img.src = this.icons[this.clickFunctionIndex];
			this.text = "";
			this.button.innerHTML = "";
		}
		else {
			this.img.style.opacity = "0";
		}
	}

	const touchend = Button.prototype.defaultontouchend;
	ImgButton.prototype.defaultontouchend = function() {
		try {
			if (this.clickFunctions.length) {
				touchend.call(this)
				this.clickFunctions[this.clickFunctionIndex] && this.clickFunctions[this.clickFunctionIndex].call(this);
				this.clickFunctionIndex = (this.clickFunctionIndex + 1) % this.clickFunctions.length;
				this.icons[this.clickFunctionIndex] && (this.img.src = this.icons[this.clickFunctionIndex]);
			}
		} catch (e) { console.error(e.stack) }
	}
	
	ImgButton.prototype.setClickFunctions = function(clickFunctions) {
		if (clickFunctions.constructor.name === "Array") {
			this.clickFunctions.length = 0;
			clickFunctions.map(f=> typeof f === "function" && this.clickFunctions.push(f))
		}
		else if(typeof clickFunctions === "function") {
			this.clickFunctions.length = 0;
			this.clickFunctions.push(clickFunctions);
		}
	}
	ImgButton.prototype.setontouchend = ImgButton.prototype.setClickFunctions;
	
	ImgButton.prototype.setIcons = function(urls) {
		if (urls.constructor.name === "Array") {
			this.icons.length = 0;
			urls.map(url => typeof url === "string" && this.icons.push(url))
			this.show()
		}
		else if(typeof urls === "string") {
			this.icons.length = 0;
			this.icons.push(urls);
			this.show()
		}
	}
	
	//------------------- ButtonBoard ---------------------
	
	const svgShowButtons = "./UI/theme/light/dots-3-horizontal-svgrepo-com.svg";
	const svgHideButtons = "./UI/theme/light/dots-3-vertical-svgrepo-com.svg";
		
	class ButtonBoard {
		constructor(parentNode, left, top, width, height, numButtons = 8, position = "fixed") {
			numButtons = numButtons >>> 1;
			
			this.parentNode = parentNode;
			this.left = left;
			this.top = top;
			this.width = width;
			this.height = height;
			
			this.state = 0;
			this.frameIndex = 0;
			this.showWidth = width * numButtons;
			this.scale = 1;
			
			this.board = document.createElement("div");
			this.leftBoard = document.createElement("div");
			this.rightBoard = document.createElement("div");
			this.topBoard = document.createElement("div");
			this.board.appendChild(this.leftBoard);
			this.board.appendChild(this.rightBoard);
			this.board.appendChild(this.topBoard);
			
			const butBoardStyle = {
				position: position,
				left: left + "px",
				top: top + "px",
				width: width + "px",
				height: width + "px",
				zIndex: "#ffffff",
				opacity: "0.8",
				borderRadius: width / 2 + "px"
			};
			this.backgroundColor = "white";
			
			Object.assign(this.board.style, butBoardStyle)
			
			Object.assign(butBoardStyle, { position: "absolute", left: "0px", top: "0px", overflow: "hidden"})
			Object.assign(this.leftBoard.style, butBoardStyle)
			Object.assign(this.rightBoard.style, butBoardStyle)
			Object.assign(this.topBoard.style, butBoardStyle)
			
			this.leftButtons = new Array(numButtons).fill(0).map((_null, i) => {
				return new ImgButton(this.leftBoard, width * (i + 1), 0, width * 29 / 30, width * 29 / 30);
			})
			this.rightButtons = new Array(numButtons).fill(0).map((_null, i) => {
				return new ImgButton(this.rightBoard, width * (i + 1), 0, width * 29 / 30, width * 29 / 30);
			})
			this.topButtons = new Array(1).fill(0).map((_null, i) => {
				return new ImgButton(this.topBoard, width * i, 0, width * 29 / 30, width * 29 / 30);
			})
			
			Object.assign(this.leftBoard.style, {
				transform: `rotateY(180deg)`,
				transformOrigin: `${ width / 2 }px ${ width / 2 }px`
			})
			
			this.leftButtons.concat(this.rightButtons, this.topButtons).map((btn, i) => {
				const rotateY = i < 4 ? "180deg" : "0deg";
				btn.div.style.transform = `scale(1) rotateY(${rotateY})`;
				//btn.downTransform = `scale(0.8) rotateY(${rotateY})`;
				//btn.upTransform = `scale(1) rotateY(${rotateY})`;
			})
			
			this.topButtons[0].setText("+");
			this.topButtons[0].setClickFunctions([() => this.showButtons(), () => this.hideButtons()]);
			this.topButtons[0].setIcons([svgShowButtons, svgHideButtons])
			//this.topButtons[0].div.style.transform = `rotate(0.125turn)`;
			
			this.board.addEventListener("touchstart", () => {
            	event.preventDefault();
            	const touche = event.changedTouches[0];
            	animationMoveBoard.call(this, touche.pageX, touche.pageY);
            }, true)
            this.board.addEventListener("mousedown", () => {
                event.preventDefault();
                animationMoveBoard.call(this, event.pageX, event.pageY);
            }, true)
		}
	}
	
	ButtonBoard.prototype.moveCenter = function(x, y, parentNode = this.parentNode, position = this.board.style.position) {
		this.parentNode = parentNode;
		this.parentNode.appendChild(this.board);
		this.left = x - parseInt(this.board.style.width) / 2;
		this.top = y - parseInt(this.board.style.height) / 2;
		Object.assign(this.board.style, {
			position: position,
			left: this.left + "px",
			top: this.top + "px"
		})
	}
	
	ButtonBoard.prototype.show = function() {
		this.board.setAttribute("class", "showBoard");
		this.leftBoard.style.backgroundColor = this.rightBoard.style.backgroundColor = this.backgroundColor;
		this.board.parentNode != this.parentNode && this.parentNode.appendChild(this.board);
	}
	
	ButtonBoard.prototype.hide = function() {
		this.board.setAttribute("class", "hideBoard");
		//this.board.parentNode && this.board.parentNode.removeChild(this.board);
	}
	
	ButtonBoard.prototype.showButtons = function () {
		if (this.state == 0) {
			this.leftBoard.setAttribute("class", "showButtons");
			this.rightBoard.setAttribute("class", "showButtons");
			this.state = 1;
		}
		/*this.state == 0 && animation(() => this.state == 0,
			() => {
				this.leftBoard.style.width = this.rightBoard.style.width = this.width + this.showWidth * animaLine16[this.frameIndex] + "px";
				if (++this.frameIndex >= animaLine16.length) this.state = 1;
			},
			() => { this.frameIndex = 0 },
			() => {}
		)*/
	}
	
	ButtonBoard.prototype.hideButtons = function () {
		if (this.state == 1) {
			this.leftBoard.setAttribute("class", "hideButtons");
			this.rightBoard.setAttribute("class", "hideButtons");
			this.state = 0;
			setTimeout(() => {
				this.leftBoard.removeAttribute("class");
				this.rightBoard.removeAttribute("class");
			}, 380)
		}
		/*this.state == 1 && animation(() => this.state == 1,
			() => {
				this.leftBoard.style.width = this.rightBoard.style.width = this.width + this.showWidth * animaLine16[this.frameIndex] + "px";
				if (--this.frameIndex < 0) this.state = 0;
			},
			() => { this.frameIndex = animaLine16.length - 1 },
			() => {}
		)*/
	}
	
	ButtonBoard.prototype.loadTheme = function(themes = {}) {
		Object.assign(this, themes.ButtonBoard);
		this.leftBoard.style.backgroundColor = this.rightBoard.style.backgroundColor = this.backgroundColor;
		
		this.leftButtons.map((btn, i) => {
			btn.loadTheme(themes.Button)
			btn.loadTheme(themes.btnBoard.leftButtons[i])
		})
		this.rightButtons.map((btn, i) => {
			btn.loadTheme(themes.Button)
			btn.loadTheme(themes.btnBoard.rightButtons[i])
		})
		this.topButtons.map((btn, i) => {
			btn.loadTheme(themes.Button)
			btn.loadTheme(themes.btnBoard.topButtons[i])
		})
	}

	
	exports.ImgButton = ImgButton;
	exports.ButtonBoard = ButtonBoard;

})))