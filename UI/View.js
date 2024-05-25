
(function(global, factory) {
    (global = global || self, factory(global));
}(this, (function(exports) {
    'use strict';
    
    const SCALABLE = !(window.navigator.userAgent.indexOf("Lumia") + 1);  //windows Phone 
    function view(width) {
        let dw = document.documentElement.clientWidth;
        let dh = document.documentElement.clientHeight;
        let sw = window.screen.width;
        let sh = window.screen.height;
        let max = sw > sh ? sw : sh;
        let min = sw < sh ? sw : sh;
        let localhost = (String(window.location).indexOf("http://localhost") == 0);
        this.width = width || dw;
        this.scale = (dw > dh ? max : min) / this.width;
        this.viewport = document.createElement("meta");
        this.viewport.setAttribute("name", "viewport");
        document.head.appendChild(this.viewport);
        SCALABLE && this.viewport.setAttribute("content", `width=${this.width}, initial-scale=${this.scale}, minimum-scale=${this.scale}, maximum-scale =${localhost ? this.scale * 5 : this.scale}, user-scalable=${localhost ? "yes" : "no"}`);
    }

    view.prototype.resize = function(width, scalable) {
        let localhost = (String(window.location).indexOf("http://localhost") == 0);
        let self = this;
        width = width || self.width;
        scalable = scalable || self.scale;
        SCALABLE && self.viewport.setAttribute("content", `initial-scale=${scalable+0.01}`);
        SCALABLE && self.viewport.setAttribute("content", `width=${width}, initial-scale=${scalable}, minimum-scale=${scalable}, maximum-scale =${localhost ? scalable * 5 : scalable}, user-scalable=${localhost ? "no" : "no"}`);
        self.scrollTop();
    };

    view.prototype.userScalable = function(width, scalable) {   
        let self = this;
        width = width || self.width;
        scalable = scalable || self.scale;
        SCALABLE && self.viewport.setAttribute("content", `initial-scale=${scalable+0.01}`);
        SCALABLE && self.viewport.setAttribute("content", `width=${width}, initial-scale=${scalable}, minimum-scale=${scalable}, maximum-scale =${scalable * 5}, user-scalable=yes`);
        self.scrollTop();
    };

    view.prototype.scrollTop = function() {
        const TOP_ELEM = document.getElementById("top");
        TOP_ELEM && scrollToAnimation(getAbsolutePos(TOP_ELEM).y);
    }

    let scrollToAnimation = (() => {
        let moves = [];
        let animationFrameScroll = null;
        let targetScrollTop = 0
        let tempScrollTop = 0;

        function scrollTo() {
            tempScrollTop += moves.splice(0, 1)[0];
            setScrollY(tempScrollTop);
            if (moves.length) {
                animationFrameScroll = requestAnimationFrame(scrollTo);
            }
            else {
                cancelAnima();
            }
        }

        function cancelAnima() {
            cancelAnimationFrame(animationFrameScroll);
            moves = [];
            animationFrameScroll = null;
            targetScrollTop = 0
            tempScrollTop = 0;
        }
        return (top) => {
            cancelAnima();
            targetScrollTop = top;
            tempScrollTop = getScrollY();
            moves = getScrollPoints(targetScrollTop - tempScrollTop);
            scrollTo();
        }
    })();

    function getScrollY() {
        return document.documentElement.scrollTop || document.body.scrollTop || 0;
    }

    function setScrollY(top) {
        let t = document.documentElement.scrollTop;
        if (t !== undefined && t != top) {
            document.documentElement.scrollTop = top;
        }
        t = document.body.scrollTop;
        if (t !== undefined && t != top) {
            document.body.scrollTop = top;
        }
    }

    function getScrollPoints(move) {
        const PAR = 1.25;
        const PAR2 = move < 0 ? 1 : 1;
        const MAX_MOVE = 5000;
        const HALF = move / 2;
        let sum = Math.abs(HALF);
        let tempMove = 0;
        let tempMoves = [0]; //保证最少有一个
        while (sum) {
            tempMove = Math.pow(tempMove, PAR) * PAR2 || 2;
            tempMove = tempMove > MAX_MOVE ? MAX_MOVE : tempMove;
            tempMoves.push(tempMove);
            sum -= tempMove;
            if (sum < tempMove) {
                tempMoves[tempMoves.length - 1] = tempMoves[tempMoves.length - 1] + sum;
                sum = 0;
            }
        }
        let rtHs = [];
        for (let i = 0; i < tempMoves.length; i++) {
            rtHs.push(parseInt(tempMoves[i] * (move < 0 ? -1 : 1) * 10) / 10);
        }
        for (let i = tempMoves.length - 1; i >= 0; i--) {
            rtHs.push(parseInt(tempMoves[i] * (move < 0 ? -1 : 1) * 10) / 10);
        }
        //console.log(rtHs)
        return rtHs;
    }

    function getAbsolutePos(el) {
        var r = { x: el.offsetLeft, y: el.offsetTop };
        if (el.offsetParent) {
            var tmp = getAbsolutePos(el.offsetParent);
            r.x += tmp.x;
            r.y += tmp.y;
        }
        return r;
    }
    
    exports.View = view;
    exports.scrollToAnimation = scrollToAnimation;
    exports.getScrollY = getScrollY;
    exports.setScrollY = setScrollY;
    exports.getScrollPoints = getScrollPoints;
    exports.getAbsolutePos = getAbsolutePos;
})))
