    (function(global, factory) {
        (global = global || self, factory(global));
    }(this, (function(exports) {
        'use strict';

        const AREA_LT = 1;
        const AREA_RT = 2;
        const AREA1_LB = 3;
        const AREA1_RB = 4;
        const BORDER_WIDTH = 3;
        
        //----------------------------------------------
        
        function gray(imageData) {
            let min = 256, max = 0;
            const c = new Array(256).fill(0);
            const data = imageData.data;
            for (let i = (data.length >>> 2) - 1; i >= 0; i--) {
                const r = data[i * 4 + 0];
                const g = data[i * 4 + 1];
                const b = data[i * 4 + 2];
                const gy = ~~(r * 0.3 + g * 0.59 + b * 0.11);
                data[i * 4 + 0] = gy;
                data[i * 4 + 1] = gy;
                data[i * 4 + 2] = gy;
                c[gy]++;
                min > gy && (min = gy);
                max < gy && (max = gy);
            }
            return min + (max - min) / 2;
        }
        
        function binarization(imageData, threshold) {
            const data = imageData.data;
            for (let i = (data.length >>> 2) - 1; i >= 0; i--) {
                const v = data[i * 4 + 0] >= threshold ? 255 : 0;
                data[i * 4 + 0] = v;
                data[i * 4 + 1] = v;
                data[i * 4 + 2] = v;
            }
        }
        

        //----------------------- Animation ------------------

        function animationSelectArea(x, y) {
            const body = document.body;
            let isExitAnima = false;

            const setMove = function() {
                const touches = event.changedTouches;
                moveX = touches[0].pageX / this.bodyScale;
                moveY = touches[0].pageY / this.bodyScale;
            }.bind(this)

            function exitAnima() {
                isExitAnima = true;
            }

            const oldBorder = this.cutDiv.style.border;
            let moveX = x;
            let moveY = y;
            this.cleBorder();
            this.cutDiv.style.border = `${BORDER_WIDTH*5/3/this.scale}px dashed black`;
            this.cutDiv.style.backgroundColor = "white";
            this.cutDiv.style.opacity = "0.5";
            body.addEventListener("touchmove", setMove, true);
            body.addEventListener("touchend", exitAnima, true);
            body.addEventListener("touchcancel", exitAnima, true);
            body.addEventListener("touchleave", exitAnima, true);

            animation(() => !isExitAnima,
                () => {
                    let x = moveX;
                    let y = moveY;
                    let p = { x: x, y: y };
                    if (!this.isOut(x, y, this.viewBox, this.width) / 17) {
                        this.setxy(p, 0.02);
                        this.setCutDiv(p.x, p.y, true);
                    }
                },
                () => {},
                () => {
                    this.resetP();
                    this.printBorder();
                    this.cutDiv.style.border = oldBorder;
                    this.cutDiv.style.borderWidth = BORDER_WIDTH / this.scale + "px";
                    this.cutDiv.style.backgroundColor = "";
                    this.cutDiv.style.opacity = "1";
                    body.removeEventListener("touchmove", setMove, true);
                    body.removeEventListener("touchend", exitAnima, true);
                    body.removeEventListener("touchcancel", exitAnima, true);
                    body.removeEventListener("touchleave", exitAnima, true);
                })
        }

        function animationZoomArea(x1, y1, x2, y2) {
            const area = this.cutDiv;
            let isExitAnima = false;

            const setMove = function() {
                const touches = event.changedTouches;
                if (touches.length == 2) {
                    x1 = touches[0].pageX / this.bodyScale;
                    y1 = touches[0].pageY / this.bodyScale;
                    x2 = touches[1].pageX / this.bodyScale;
                    y2 = touches[1].pageY / this.bodyScale;
                }
            }.bind(this)

            function exitAnima() {
                isExitAnima = true;
            }

            const oldBorder = this.cutDiv.style.border;
            const startLeft = parseInt(area.style.left);
            const startTop = parseInt(area.style.top);
            const startWidth = parseInt(area.style.width);
            const startHeight = parseInt(area.style.height);
            const startDistance = Math.hypot(x1 - x2, y1 - y2) / this.bodyScale;
            let startCenterX = ((x1 - x2) / 2 + x2) / this.bodyScale; // 缩放中心点，Page 左上角为原点
            let startCenterY = ((y1 - y2) / 2 + y2) / this.bodyScale;
            const p = { x: startCenterX, y: startCenterY };
            this.xyPageToObj(p, this.viewBox); // 转为 viewBox 左上角为原点
            startCenterX = (p.x + this.viewBox.scrollLeft) / this.scale; // 转为 scaleBox 左上角为原点
            startCenterY = (p.y + this.viewBox.scrollTop) / this.scale; //  转换坐标单位
            this.cleBorder();
            area.style.border = `${BORDER_WIDTH*5/3/this.scale}px dashed black`;
            area.style.backgroundColor = "green";
            area.style.opacity = "0.33";

            area.addEventListener("touchmove", setMove, true);
            area.addEventListener("touchend", exitAnima, true);
            area.addEventListener("touchcancel", exitAnima, true);
            area.addEventListener("touchleave", exitAnima, true);

            animation(() => !isExitAnima,
                () => {
                    const distance = Math.hypot(x1 - x2, y1 - y2);
                    const scale = distance / startDistance;
                    let centerX = ((x1 - x2) / 2 + x2); // 缩放中心点，Page 左上角为原点
                    let centerY = ((y1 - y2) / 2 + y2); // 转换坐标单位
                    const p = { x: centerX, y: centerY };
                    this.xyPageToObj(p, this.viewBox); // 转为 viewBox 左上角为原点
                    centerX = (p.x + this.viewBox.scrollLeft) / this.scale; // 转为 scaleBox 左上角为原点
                    centerY = (p.y + this.viewBox.scrollTop) / this.scale;
                    area.style.width = `${startWidth * scale}px`;
                    area.style.height = `${startHeight * scale}px`;
                    area.style.left = `${startLeft - startWidth * (scale - 1) * (startCenterX - startLeft) / startWidth + centerX - startCenterX}px`;
                    area.style.top = `${startTop - startHeight * (scale - 1) * (startCenterY - startTop) / startHeight + centerY - startCenterY}px`;
                },
                () => {},
                () => {
                    this.resetP(this.cutDiv);
                    this.printBorder();
                    area.style.border = oldBorder;
                    area.style.borderWidth = BORDER_WIDTH / this.scale + "px";
                    area.style.backgroundColor = "";
                    area.style.opacity = "1";
                    area.removeEventListener("touchmove", setMove, true);
                    area.removeEventListener("touchend", exitAnima, true);
                    area.removeEventListener("touchcancel", exitAnima, true);
                    area.removeEventListener("touchleave", exitAnima, true);
                })
        }

        function animationMoveArea(x, y) {
            const body = document.body;
            let isExitAnima = false;

            const setMove = function() {
                const touche = event.type == "mousemove" ? event : event.changedTouches[0];
                if (event.type == "mousemove" || event.changedTouches.length == 1) {
                    moveX = touche.pageX / this.bodyScale;
                    moveY = touche.pageY / this.bodyScale;
                }
            }.bind(this)

            function exitAnima() {
            	isExitAnima = true;
            }

            const oldBorder = this.cutDiv.style.border;
            let startX = x / this.bodyScale,
                startY = y / this.bodyScale,
                moveX = x / this.bodyScale,
                moveY = y / this.bodyScale,
                startLeft = parseInt(this.cutDiv.style.left),
                startTop = parseInt(this.cutDiv.style.top);
            this.cleBorder();
            this.cutDiv.style.border = `${BORDER_WIDTH*5/3/this.scale}px dashed black`;
            this.cutDiv.style.backgroundColor = "#556B2F";
            this.cutDiv.style.opacity = "0.33";

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
                    this.cutDiv.style.left = startLeft + (moveX - startX) / this.scale + "px";
                    this.cutDiv.style.top = startTop + (moveY - startY) / this.scale + "px";
                },
                () => {},
                () => {
                    this.resetP(this.cutDiv);
                    this.printBorder();
                    this.cutDiv.style.border = oldBorder;
                    this.cutDiv.style.borderWidth = BORDER_WIDTH / this.scale + "px";
                    this.cutDiv.style.backgroundColor = "";
                    this.cutDiv.style.opacity = "1";
                    body.removeEventListener("touchmove", setMove, true);
                    body.removeEventListener("touchend", exitAnima, true);
                    body.removeEventListener("touchcancel", exitAnima, true);
                    body.removeEventListener("touchleave", exitAnima, true);
                    body.removeEventListener("mousemove", setMove, true);
                    body.removeEventListener("mouseup", exitAnima, true);
                    body.removeEventListener("mouseout", exitAnima, true);
                    body.removeEventListener("mouseleave", exitAnima, true);
                })
        }

        //------------------------------------------------

        //拷贝一个触摸对象
        function copyTouch(touch, touchNum) {
            return { identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY, touchNum: touchNum };
        }

        //---------------------- CheckerBoard ----------------

        class Board extends CheckerBoard {
            constructor(...args) {
                super(...args);
                this.cutDiv = document.createElement("div");
                this.oldScrollLeft = 0;
                this.oldScrollTop = 0;
                this.oldScale = 1;
                this.oldAreaLeft = this.cutDiv.style.left;
                this.oldAreaTop = this.cutDiv.style.top;
                this.oldAreaWidth = this.cutDiv.style.width;
                this.oldAreaHeight = this.cutDiv.style.Height;
                this.imgPadding = 0;//this.cutDiv.addEventListener("touchmove", () => event.preventDefault());
                const MOVE_COUNTDOWN = 180;
                let timerMove = null;
                let startTouchs = [];
                this.cutDiv.addEventListener("touchstart", () => {
                    event.preventDefault();
                    const touche = event.changedTouches[0];
                    timerMove && (clearTimeout(timerMove), timerMove = null);
                    if (startTouchs.length == 0) {
                        startTouchs.push(copyTouch(touche, 1));
                        timerMove = setTimeout(() => {
                            animationMoveArea.call(this, touche.pageX, touche.pageY);
                            startTouchs.length = 0;
                        }, MOVE_COUNTDOWN);
                    }
                    else if (startTouchs.length == 1) {
                        startTouchs.push(copyTouch(touche, 2));
                        animationZoomArea.call(this, startTouchs[0].pageX, startTouchs[0].pageY, startTouchs[1].pageX, startTouchs[1].pageY);
                    }
                    else startTouchs.length = 0
                }, true)
                this.cutDiv.addEventListener("mousedown", () => {
                    event.preventDefault();
                    animationMoveArea.call(this, event.pageX, event.pageY);
                }, true)
                this.cutDiv.addEventListener("click", () => {
                	event.cancelBubble = true;
                }, true);
                this.cutDiv.addEventListener("touchend", () => {
                    startTouchs.length = 0;
                }, true)
                this.cutDiv.addEventListener("touchleave", () => {
                    startTouchs.length = 0;
                }, true)
                this.cutDiv.addEventListener("touchcancel", () => {
                    startTouchs.length = 0;
                }, true)
            }
        }

        //  用虚线表示棋子的位置
        Board.prototype.printBorder = function() {
            for (let idx = 0; idx < 225; idx++) {
                let x = idx % 15,
                    y = ~~(idx / 15);
                if (x < this.SLTX && y < this.SLTY) {
                    this.P[idx].printBorder(this.gW, this.gH);
                }
            }
        };

        // 取消虚线显示棋子位置
        Board.prototype.cleBorder = function() {
            for (let i = 0; i < 225; i++) this.P[i].cle();
        };

        Board.prototype.showCutDiv = function() {
            this.cutDiv.style.border = "3px dashed red";
            this.cutDiv.style.zIndex = 0;
            this.scaleBox.appendChild(this.cutDiv);
        };

        Board.prototype.hideCutDiv = function() {
            this.cutDiv.style.borderStyle = "none";
            this.cutDiv.style.zIndex = -100;
            this.cutDiv.parentNode && this.cutDiv.parentNode.removeChild(this.cutDiv);
        };

        // 边框初始化
        Board.prototype.resetCutDiv = function() {
            let w = this.width;
            let h = this.height;
            let XL = w / 3;
            let XR = w / 3 * 2;
            let YT = h / 3;
            let YB = h / 3 * 2;
            let div = this.cutDiv;
            let s = this.cutDiv.style;
            s.position = "absolute";
            s.width = XR - XL + "px";
            s.height = YB - YT + "px";
            s.left = XL + "px";
            s.top = YT + "px";
            this.XL = parseInt(s.left);
            this.XR = XL + parseInt(s.width);
            this.YT = parseInt(s.top);
            this.YB = YT + parseInt(s.height);
            this.resetP();
            this.printBorder();
            this.showCutDiv();
        };

        Board.prototype.getArea = function(x, y) { // canvas  坐标
            const xL = this.cutDiv.offsetLeft;
            const xR = xL + parseInt(this.cutDiv.style.width);
            const xM = xL + (xR - xL) / 2;
            const yT = this.cutDiv.offsetTop;
            const yB = yT + parseInt(this.cutDiv.style.height);
            const yM = yT + (yB - yT) / 2;
            if (x < xM)
                if (y < yM) return AREA_LT;
                else return AREA_RT;
            else
            if (y < yM) return AREA1_LB;
            else return AREA1_RB;
        }

        Board.prototype.moveArea = function(left, top, width = parseInt(this.cutDiv.style.width), height = parseInt(this.cutDiv.style.height)) {
            let s = this.cutDiv.style;
            s.width = width + "px";
            s.height = height + "px";
            s.left = left + "px";
            s.top = top + "px";
            this.resetP(this.cutDiv);
            this.printBorder();
        }

        // 手动调整选择棋盘边框
        Board.prototype.setCutDiv = function(x, y, passResetP) { //调整棋盘的边框范围，用 mdiv 实时显示效果
            let p = { x: x, y: y };
            this.xyPageToObj(p, this.viewBox);
            x = ~~((this.viewBox.scrollLeft + p.x) / this.scale);
            y = ~~((this.viewBox.scrollTop + p.y) / this.scale);
            // x，y必须保持为整数，才能保持只移动一个角的两条边
            const cutDiv = this.cutDiv;
            const s = cutDiv.style;
            const xL = cutDiv.offsetLeft;
            const xR = xL + parseInt(s.width);
            const xM = xL + (xR - xL) / 2;
            const yT = cutDiv.offsetTop;
            const yB = yT + parseInt(s.height);
            const yM = yT + (yB - yT) / 2;

            let l, t, w, h;
            if (x < xM) {
                if (y < yM) {
                    l = x;
                    t = y;
                    w = xR - x;
                    h = yB - y;
                }
                else {
                    l = x;
                    t = yT;
                    w = xR - x;
                    h = y - yT;
                }
            }
            else {
                if (y < yM) {
                    l = xL;
                    t = y;
                    w = x - xL;
                    h = yB - y;
                }
                else {
                    l = xL;
                    t = yT;
                    w = x - xL;
                    h = y - yT;
                }
            }

            const canvas = this.canvas;
            s.position = "absolute";
            s.left = canvas.offsetLeft < l ? l + "px" : canvas.offsetLeft + "px";
            s.top = canvas.offsetTop < t ? t + "px" : canvas.offsetTop + "px";
            s.width = w > parseInt(canvas.style.width) - l ? parseInt(canvas.style.width) - l + "px" : w + "px";
            s.height = h > parseInt(canvas.style.height) - t ? parseInt(canvas.style.height) - t + "px" : h + "px";

            this.XL = l;
            this.XR = this.XL + w;
            this.YT = t;
            this.YB = this.YT + h;

            if (passResetP) return;
            this.resetP();
        };

        // 选取棋盘边框模式，设置一个移动的坐标点
        Board.prototype.setxy = function(p, speed) { //返回一个xy坐标，用来 调整棋盘边框位置，支持微调
            const s = this.cutDiv.style;
            const n = this.cutDiv;
            const xL = n.offsetLeft;
            const xR = xL + parseInt(s.width);
            const xM = xL + ((xR - xL) / 2);
            const yT = n.offsetTop;
            const yB = yT + parseInt(s.height);
            const yM = yT + ((yB - yT) / 2);
            let tempx;
            let tempy;
            let w = Math.min(parseInt(s.width), parseInt(s.height)) / (5 - 0.99);
            this.xyPageToObj(p, this.viewBox);
            p.x = (this.viewBox.scrollLeft + p.x) / this.scale;
            p.y = (this.viewBox.scrollTop + p.y) / this.scale;

            let x = p.x;
            let y = p.y;
            if (x < xM) {
                if (y < yM) {
                    tempx = xL;
                    tempy = yT;
                }
                else {
                    tempx = xL;
                    tempy = yB;
                }
            }
            else {
                if (y < yM) {
                    tempx = xR;
                    tempy = yT;
                }
                else {
                    tempx = xR;
                    tempy = yB;
                }
            }
            // 微调//////
            //alert("微调");
            if (speed < 1) { // speed < 1, touchMove
                if (Math.abs(x - tempx) < w && Math.abs(y - tempy) < w) {
                    let temps = Math.pow((x - tempx) / w, 2);
                    x = ~~((x - tempx) * speed * temps);
                    //x = x ? x : (p.x - tempx) < 0 ? -1 : 1;
                    //x += tempx;
                    temps = Math.pow((y - tempy) / w, 2);
                    y = ~~((y - tempy) * speed * temps);
                    //y = y ? y : (p.y - tempy) < 0 ? -1 : 1;
                    //y += tempy;
                    p.x += x;
                    p.y += y;
                }
            }
            else if (speed == 1) { // speed = 1 touchClick
                if (Math.abs(x - tempx) < (w / 3) && Math.abs(y - tempy) < (w / 3)) {
                    x = ((x - tempx) / 10 * speed);
                    x += tempx;
                    y = ((y - tempy) / 10 * speed);
                    y += tempy;
                    p.x = x;
                    p.y = y;
                }
                else if (Math.abs(x - tempx) < (w / 3 * 2) && Math.abs(y - tempy) < (w / 3 * 2)) {
                    x = ((x - tempx) / 8 * speed);
                    x += tempx;
                    y = ((y - tempy) / 8 * speed);
                    y += tempy;
                    p.x = x;
                    p.y = y;
                }
                else if (Math.abs(x - tempx) < w && Math.abs(y - tempy) < w) {
                    x = ((x - tempx) / 6 * speed);
                    x += tempx;
                    y = ((y - tempy) / 6 * speed);
                    y += tempy;
                    p.x = x;
                    p.y = y;
                }
            }
            else {
                // speed = 2, mouseClick not change
            }
            p.x = p.x * this.scale - this.viewBox.scrollLeft;
            p.y = p.y * this.scale - this.viewBox.scrollTop;
            this.xyObjToPage(p, this.viewBox);
        }

        Board.prototype.loadImgURL = async function(url, img = this.bakImg) {
            return new Promise(resolve => {
                try {
                    img.onload = function() {
                        img.onload = null;
                        resolve()
                    };
                    img.src = url;
                } catch (e) {
                    alert(e.stack);
                    resolve()
                }
            })
        }

        Board.prototype.loadImgFile = async function(file, img = this.bakImg) {
            const url = await new Promise(resolve => {
                try {
                    const reader = new FileReader();
                    reader.onload = function() {
                        resolve(reader.result);
                    };
                    reader.readAsDataURL(file);
                } catch (e) {
                    alert(e.stack);
                    resolve()
                }
            })
            return this.loadImgURL(url, img);
        }

        Board.prototype.putImg = function(img = this.bakImg, canvas = this.canvas, padding = 0) {
            const w = parseInt(img.width);
            const h = parseInt(img.height);
            let w1, h1;
            if (w <= h) {
                w1 = this.width - padding * 2;
                h1 = w1 * h / w;
            }
            else {
                h1 = this.width - padding * 2
                w1 = h1 * w / h;
            }
            this.imgPadding = padding;
            // 画图之前，设置画布大小
            canvas.width = w1 + padding * 2;
            canvas.height = h1 + padding * 2;
            canvas.style.width = canvas.width + "px";
            canvas.style.height = canvas.height + "px";
            let ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, w, h, padding, padding, w1, h1);
            ctx = null;
            this.mode = MODE_IMG;
            
            const bakCanvas = this.bakCanvas;
            ctx = bakCanvas.getContext("2d");
            bakCanvas.width = canvas.width;
            bakCanvas.height = canvas.height;
            ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
        }

        Board.prototype.selectArea = function(x, y) {
            !this.isOut(x, y, this.viewBox) && this.isOut(x, y, this.cutDiv) && animationSelectArea.call(this, x, y);
        }

        Board.prototype.lockArea = async function() {
            try {
                const cutDiv = this.cutDiv;
                const img = this.cutImg;
                const canvas = this.canvas;
                const bakCanvas = this.bakCanvas;
                const w = parseInt(cutDiv.style.width);
                const h = parseInt(cutDiv.style.height);
                const w2 = w / 11 * 13;
                const h2 = h / 11 * 13;
                const l = cutDiv.offsetLeft - w / 11 > 0 ? cutDiv.offsetLeft - w / 11 : 0;
                const t = cutDiv.offsetTop - h / 11 > 0 ? cutDiv.offsetTop - h / 11 : 0;
                const l2 = l > 0 ? 0 : w / 11 - cutDiv.offsetLeft;
                const t2 = t > 0 ? 0 : h / 11 - cutDiv.offsetTop;

                this.oldScrollLeft = this.viewBox.scrollLeft;
                this.oldScrollTop = this.viewBox.scrollTop;
                this.oldAreaLeft = this.cutDiv.style.left;
                this.oldAreaTop = this.cutDiv.style.top;
                this.oldAreaWidth = this.cutDiv.style.width;
                this.oldAreaHeight = this.cutDiv.style.Height;
                this.oldScale = this.scale;
                this.zoom(1);

                bakCanvas.width = w2;
                bakCanvas.height = h2;
                bakCanvas.style.width = w2 + "px";
                bakCanvas.style.height = h2 + "px";

                let ctx = bakCanvas.getContext("2d");
                ctx.fillStyle = this.backgroundColor;
                ctx.fillRect(0, 0, w2, h2);
                let w3 = parseInt(canvas.width) - cutDiv.offsetLeft;
                w3 = w3 < w / 11 * 12 ? w3 : w / 11 * 12;
                w3 += l == 0 ? cutDiv.offsetLeft : w / 11;
                let h3 = parseInt(canvas.height) - cutDiv.offsetTop;
                h3 = h3 < h / 11 * 12 ? h3 : h / 11 * 12;
                h3 += t == 0 ? cutDiv.offsetTop : h / 11;
                ctx.drawImage(canvas, l, t, w3, h3, l2, t2, w3, h3);

                const url = bakCanvas.toDataURL("image/png");
                await this.loadImgURL(url, img);

                ctx = canvas.getContext("2d");
                canvas.width = this.width;
                canvas.height = this.width;
                canvas.style.width = this.width + "px";
                canvas.style.height = this.width + "px";
                if (w >= h) {
                    const l = 0;
                    const w = this.width;
                    const t = (this.width / w2) * (w2 - h2) / 2;
                    const h = this.width * h2 / w2;
                    ctx.drawImage(img, 0, 0, w2, h2, l, t, w, h);
                    this.XL = l + w / 13;
                    this.XR = l + w / 13 * 12;
                    this.YT = t + h / 13;
                    this.YB = t + h / 13 * 12;
                }
                else {
                    const l = (this.width / h2) * (h2 - w2) / 2;
                    const w = this.width * w2 / h2;
                    const t = 0;
                    const h = this.width;
                    ctx.drawImage(img, 0, 0, w2, h2, l, t, w, h);
                    this.XL = l + w / 13;
                    this.XR = l + w / 13 * 12;
                    this.YT = t + h / 13;
                    this.YB = t + h / 13 * 12;
                }
                
                ctx = bakCanvas.getContext("2d");
                bakCanvas.width = canvas.width;
                bakCanvas.height = canvas.height;
                ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);

                
                /*const imgData = ctx.getImageData(0, 0, this.width, this.height);
                const threshold = gray(imgData);
                binarization(imgData, threshold);
                ctx.putImageData(imgData, 0, 0);*/
            
                this.resetP();
                this.cleBorder();
                this.hideCutDiv();
                ctx = null;
            } catch (e) { alert(e.stack) }
        }

        Board.prototype.unlockArea = function() {
            try {
                this.cle();
                this.putImg(this.bakImg, this.canvas, this.imgPadding);
                this.zoom(this.oldScale);
                this.cutDiv.style.left = this.oldAreaLeft;
                this.cutDiv.style.top = this.oldAreaTop;
                this.cutDiv.style.width = this.oldAreaWidth;
                this.cutDiv.style.Height = this.oldAreaHeight;
                this.viewBox.scrollLeft = this.oldScrollLeft;
                this.viewBox.scrollTop = this.oldScrollTop;
                this.resetP(this.cutDiv);
                this.showCutDiv();
                this.printBorder();
            } catch (e) { alert(e.stack) }
        }


        // 自动识别图片中的棋子
        Board.prototype.autoPut = function() {

            let arr = getArr2D([], 0, this.SLTX, this.SLTY);
            let max = 0;
            let min = 255;
            let test = false;
            let cNum;
            let rgb;
            let idx;
            let wBoard = true; // 默认白色棋盘
            let ctx = this.canvas.getContext("2d");
            let imgData = ctx.getImageData(0, 0, this.width, this.height);
            let data = imgData.data;
            
            for (let i = this.SLTY - 1; i >= 0; i--) {
                for (let j = this.SLTX - 1; j >= 0; j--) {
                    idx = i * 15 + j;
                    rgb = getPointColor(idx, this);
                    //alert(rgb.r+"\n"+rgb.g+"\n"+rgb.b);
                    cNum = (rgb.r + rgb.g + rgb.b) / 3;
                    // 黑，白以外-1000，表示空子。
                    //log(`cNum=${cNum}, ${j} - ${i} `);
                    //log(`r=${rgb.r},g=${rgb.g}, b=${rgb.b}`);
                    if (Math.abs(rgb.r - rgb.g) < 60 && Math.abs(rgb.r - rgb.b) < 60 && Math.abs(rgb.g - rgb.b) < 60) {
                        arr[i][j] = cNum;
                        max = cNum > max ? cNum : max; // 设置最白，最黑
                        min = cNum < min ? cNum : min;
                    }
                    else {
                        arr[i][j] = -1000;
                        wBoard = false;
                    }
                }
            }

            ctx = null;
            // 棋盘上只有一种颜色时重新设置 max，min
            if (Math.abs(max - min) < 30) {
                if ((max + min) / 2 < 128) {
                    max = 255;
                }
                else {
                    min = 0;
                }
            }
            for (let i = this.SLTY - 1; i >= 0; i--) {
                for (let j = this.SLTX - 1; j >= 0; j--) {
                    idx = i * 15 + j;
                    if (Math.abs(arr[i][j] - max) < (wBoard || max > 250 ? 20 : 50)) {
                        //arr[i][j] = 2;
                        this.P[idx].printNb(EMOJI_STAR_BLACK, "white", this.gW, this.gH, this.wNumColor);
                    }
                    else if (Math.abs(arr[i][j] - min) < (wBoard || min < 5 ? 30 : 60)) {
                        //arr[i][j] = 1;
                        this.P[idx].printNb(EMOJI_STAR_BLACK, "black", this.gW, this.gH, this.bNumColor);
                    }
                    else if (test) {
                        this.P[idx].printNb(EMOJI_TRIANGLE_BLACK, "black", this.gW, this.gH, this.bNumColor);
                    }
                }
            }



            //取得一个点的平均颜色
            function getPointColor(idx, cBoard) {

                //alert("getPointc");
                let width = ~~(cBoard.width);
                let w = ~~(cBoard.gW / 2);
                let h = ~~(cBoard.gH / 2);
                let l = ~~(cBoard.P[idx].x + (cBoard.gW - w) / 2 - cBoard.gW / 2);
                let t = ~~(cBoard.P[idx].y + (cBoard.gH - h) / 2 - cBoard.gH / 2);
                let r = 0;
                let g = 0;
                let b = 0;
                let arr = []; //  记录彩色
                let narr = []; // 记录黑白色

                for (let i = 0; i < w; i++) {
                    arr[i] = [];
                    for (let j = 0; j < h; j++) {
                        //let black = (i>w/4*1.5 && i<w/4*2.5 || j>h/4*1.5 && j<h/4*2.5) && c[0]<50 && c[1]<50 && c[2]<50 ? -38 : 0;
                        arr[i][j] = [];
                        arr[i][j][0] = data[(width * (t + j) + l + i) * 4];
                        arr[i][j][1] = data[(width * (t + j) + l + i) * 4 + 1];
                        arr[i][j][2] = data[(width * (t + j) + l + i) * 4 + 2];
                        arr[i][j][3] = data[(width * (t + j) + l + i) * 4 + 3];
                        r += arr[i][j][0];
                        g += arr[i][j][1];
                        b += arr[i][j][2];
                    }
                }

                //alert("Set arr end");
                if (isLine((r + g + b) / h / w / 3, cBoard)) {
                    //log("line");
                    return ({ r: 255, g: 125, b: 255 }); //网格, 无棋子
                }
                else if (isLine((r + g + b) / h / w / 3 + 18, cBoard)) {
                    //log("line");
                    return ({ r: 255, g: 125, b: 255 }); //网格, 无棋子
                }
                else if (isLine((r + g + b) / h / w / 3 - 18, cBoard)) {
                    //log("line");
                    return ({ r: 255, g: 125, b: 255 }); //网格, 无棋子
                }
                else {
                    //log("not Line");
                    return ({ r: r / w / h, g: g / w / h, b: b / w / h }); //不是网格
                }



                function isLine(cnum, cboard) {
                    let tx;
                    let ty; //网格的x，y 线
                    let x = idx % 15;
                    let y = ~~(idx / 15);
                    let count = 0; // 记录黑点
                    let c;
                    for (let i = 0; i < w; i++) {
                        narr[i] = [];
                        for (let j = 0; j < h; j++) {
                            c = arr[i][j];
                            if (c[0] < cnum && c[1] < cnum && c[2] < cnum) {
                                narr[i][j] = 1;
                                count++;
                            }
                            else {
                                narr[i][j] = 0;
                            }
                        }
                    }
                    if (count > w * h / 8 * 3) return false;

                    /*
                        // 测试
                    let str = idx+"\n";
                    for (let j=0; j<h; j++)  {
                        for (let i=0; i<w; i++)  {
                            str+=narr[i][j];
                        }
                        str+="\n"
                    }
                    alert(str)
                    */

                    // 针对白底棋盘，搜索棋盘网格线
                    if (y == null) {
                        x = idx % 15;
                        y = ~~(idx / 15);
                    }

                    if (x == 0) {
                        if (idx == 0) {
                            if (right() && buttom()) return true;
                        }
                        else if (idx == 15 * (cboard.SLTY - 1)) {
                            if (right() && top()) return true;
                        }
                        else {
                            if (right() && buttom() && top()) return true;
                        }
                    }
                    else if (x == cboard.SLTX - 1) {
                        if (idx == cboard.SLTX - 1) {
                            if (left() && buttom()) return true;
                        }
                        else if (idx == 15 * cboard.SLTY - 1) {
                            if (left() && top()) return true;
                        }
                        else {
                            if (left() && top() && buttom()) return true;
                        }
                    }
                    else if (y == 0) {
                        if (left() && right() && buttom()) return true;
                    }
                    else if (y == cboard.SLTY - 1) {
                        if (left() && right() && top()) return true;
                    }
                    else {
                        if (left() && right() && top() && buttom()) return true;
                    }

                    function left() {
                        let i;
                        let j;
                        for (i = 0; i < h; i++) {
                            let c = narr[0][i];
                            if (c == 1) {
                                if (ty != null) {
                                    if (Math.abs(i - ty) > h * 0.3 || Math.abs(i - ty) == 0) { return false; }
                                }
                                else {
                                    ty = i;
                                }
                                for (j = 1; j < w / 5; j++) {
                                    c = narr[j][i];
                                    if (c == 0 && narr[j + 2][i] == 0 && !(narr[j + 3][i] == 1 && narr[j + 4][i] == 1 && narr[j + 5][i] == 1)) break;
                                }
                                if (j >= w / 5) return true;
                                return false;
                            }
                        }
                        //alert("__left")
                    }

                    function right() {
                        let i;
                        let j;
                        for (i = h - 1; i >= 0; i--) {
                            let c = narr[w - 1][i];
                            if (c == 1) {
                                if (ty != null) {
                                    if (Math.abs(i - ty) > h * 0.3 || Math.abs(i - ty) == 0) { return false; }
                                }
                                else {
                                    ty = i;
                                }
                                for (j = w - 2; j > w * 4 / 5; j--) {
                                    c = narr[j][i];
                                    if (c == 0 && narr[j - 2][i] == 0 && !(narr[j - 3][i] == 1 && narr[j - 4][i] == 1 && narr[j - 5][i] == 1)) break;
                                }
                                if (j <= w * 4 / 5) return true;
                                return false;
                            }
                        }
                        //alert("__right")
                    }

                    function top() {
                        let i;
                        let j;
                        for (i = 0; i < w; i++) {
                            let c = narr[i][0];
                            if (c == 1) {
                                if (tx != null) {
                                    if (Math.abs(i - tx) > w * 0.3 || Math.abs(i - tx) == 0) { return false; }
                                }
                                else {
                                    tx = i;
                                }
                                for (j = 1; j < h / 5; j++) {
                                    c = narr[i][j];
                                    if (c == 0 && narr[i][j + 2] == 0 && !(narr[i][j + 3] == 1 && narr[i][j + 4] == 1 && narr[i][j + 5] == 1)) break;
                                }
                                if (j >= h / 5) return true;
                                return false;
                            }
                        }
                        //alert("__top")
                    }

                    function buttom() {
                        let i;
                        let j;
                        for (i = w - 1; i >= 0; i--) {
                            let c = narr[i][h - 1];
                            if (c == 1) {
                                if (tx != null) {
                                    if (Math.abs(i - tx) > w * 0.3 || Math.abs(i - tx) == 0) { return false; }
                                }
                                else {
                                    tx = i;
                                }
                                for (j = h - 2; j > h * 4 / 5; j--) {
                                    c = narr[i][j];
                                    if (c == 0 && narr[i][j - 2] == 0 && !(narr[i][j - 3] == 1 && narr[i][j - 4] == 1 && narr[i][j - 5] == 1)) break;
                                }
                                if (j <= h * 4 / 5) return true;
                                return false;
                            }
                        }
                        //alert("__buttom")
                    }
                }

            }

        };

        exports.CheckerBoard = Board;
    })))
