(function(global, factory) {
    (global = global || self, factory(global));
}(this, (function(exports) {
    'use strict';
    //console.log(exports);

    const BOARD_TEXT = 0x000100;

    const DOWN = 0x000080;
    const RIGHT = 0x000040;
    const OLD_COMMENT = 0x000020;
    const MARK = 0x000010;
    const COMMENT = 0x000008;
    const START = 0x000004;
    const NO_MOVE = 0x000002;
    const EXTENSION = 0x000001;

    const MASK = 0xFFFF3F;
    const NullPoint = new JPoint(0, 0);

    function isValid(Pos) {
        return (Pos.x == NullPoint.x && Pos.y == NullPoint.y) ||
            (Pos.x >= 1 && Pos.x <= 15 && Pos.y >= 1 && Pos.y <= 15);
    }

    function bit_is_one(bit_value, value) {
        return ((value & bit_value) != 0);
    }

    function set_bit(bit_value, value) {
        value |= bit_value;
        return value;
    }

    function clear_bit(bit_value, value) {
        value &= ~bit_value;
        return value;
    }

    function PosToPoint(pos) {
        //console.log(`pos=${pos}`)
        if (pos == 0) {
            return new JPoint(0, 0);
        }
        else {
            return new JPoint(pos % 16, pos / 16 + 1)
        }
    }

    function PointToPos(point) {
        if (isValidPoint(point)) {
            return 16 * (point.y - 1) + point.x;
        }
        else {
            return 0;
        }
    }

    function isValidPoint(point) {
        return point.x >= 1 && point.x <= 15 && point.y >= 1 && point.y <= 15;
    }



    class MoveNode {
        constructor(mPos) {
            let name = typeof mPos == "object" ? mPos.constructor.name : undefined;
            if (name == "JPoint") {
                this.mPos = mPos;
                this.mInfo = 0;
                if (!isValid(this.mPos))
                    throw `MoveNode Error: mPos error`;
            }
            else if (name == "MoveNode") {
                this.mPos = mPos.mPos;
                this.mInfo = mPos.mInfo;
                if (!isValid(this.mPos))
                    throw `MoveNode Error: mPos error`;
            }
            else {
                this.mPos = NullPoint;
                this.mInfo = 0;
            }

            this.mMatch = 0;

            this.mOneLineComment = "";
            this.mMultiLineComment = "";
            this.mBoardText = "";

            this.mDown = 0;
            this.mRight = 0;

        }
    }


    MoveNode.prototype.checkExtension = function() {
        this.setIsExtension((this.mInfo & 0xFFFF00) != 0);
    }

    MoveNode.prototype.isValue = function(bitValue) {
        return bit_is_one(bitValue, (this.mInfo));
    }

    MoveNode.prototype.setIsValue = function(value, bitValue) {
        if (value) {
            this.mInfo = set_bit(bitValue, this.mInfo);
        }
        else {
            this.mInfo = clear_bit(bitValue, this.mInfo);
        }
    }

    MoveNode.prototype.setPos = function(pos) {
        this.mPos = pos;
        this.setIsMove(true);
    }

    MoveNode.prototype.getPos = function() {
        return this.mPos;
    }

    MoveNode.prototype.setPosInfo = function(pos, info) {
        this.mPos = PosToPoint(pos);
        this.mInfo = (this.mInfo & 0xFFFF00) | info;
        //post("warn",this.pos2Name(pos))
        //console.log(`mInfo=${this.mInfo}, info=${info}`)
        //console.info(("00000000"+this.mInfo.toString(2)).slice(-8))
    }

    MoveNode.prototype.getPosInfo = function(arrBuf = new Uint8Array(2)) {
        arrBuf[0] = PointToPos(this.mPos);
        arrBuf[1] = this.mInfo & 0xFF;
    }

    MoveNode.prototype.setExtendedInfo = function(info2, info1) {
        this.mInfo &= 0xFF;
        this.mInfo |= ((info2 << 8) | info1) << 8;
        //console.log(`mInfo=${this.mInfo}, info2=${info2}, info1=${info1}`)
        /*
        let s = ("000000000000000000000000"+this.mInfo.toString(2)).slice(-24),
            b1 = s.slice(0,8),
            b2 = s.slice(8,16),
            b3 = s.slice(16);
        console.warn(`${b1},${b2},${b3}`)
        */
    }

    MoveNode.prototype.getExtendedInfo = function(arrBuf = new Uint8Array(2)) {
        arrBuf[0] = (this.mInfo >> 16) & 0xFF; // info2
        arrBuf[1] = (this.mInfo >> 8) & 0xFF; //info1
    }

    MoveNode.prototype.clearInformation = function() {
        this.mInfo = 0;
    }

    MoveNode.prototype.isInformation = function() {
        return (this.mInfo & MASK) != 0;
    }

    MoveNode.prototype.isDown = function() {
        return this.isValue(DOWN);
    }

    MoveNode.prototype.setIsDown = function(value) {
        this.setIsValue(value, DOWN);
    }

    MoveNode.prototype.isRight = function() {
        return this.isValue(RIGHT);
    }

    MoveNode.prototype.setIsRight = function(value) {
        this.setIsValue(value, RIGHT);
    }

    MoveNode.prototype.isOldComment = function() {
        return this.isValue(OLD_COMMENT);
    }

    MoveNode.prototype.isNewComment = function() {
        return this.isValue(COMMENT);
    }

    MoveNode.prototype.setIsNewComment = function(value) {
        this.setIsValue(value, COMMENT);
        this.setIsValue(false, OLD_COMMENT);
    }

    MoveNode.prototype.isMark = function() {
        return this.isValue(MARK);
    }

    MoveNode.prototype.setIsMark = function(value) {
        this.setIsValue(value, MARK);
    }

    MoveNode.prototype.isStart = function() {
        return this.isValue(START);
    }

    MoveNode.prototype.setIsStart = function(value) {
        this.setIsValue(value, START);
    }

    MoveNode.prototype.isMove = function() {
        return !this.isValue(NO_MOVE);
    }

    MoveNode.prototype.isPassMove = function() {
        let result = false;
        if (this.isMove()) {
            result = this.mPos.x == 0 && this.mPos.y == 0;
        }
        return result;
    }

    MoveNode.prototype.setIsMove = function(value) {
        this.setIsValue(!value, NO_MOVE);
    }

    MoveNode.prototype.isExtension = function() {
        return this.isValue(EXTENSION);
    }

    MoveNode.prototype.setIsExtension = function(value) {
        this.setIsValue(value, EXTENSION);
    }

    MoveNode.prototype.setMatch = function(match) {
        this.mMatch = match;
    }

    MoveNode.prototype.getMatch = function() {
        return this.mMatch;
    }

    MoveNode.prototype.setDown = function(node) {
        this.mDown = node;
    }

    MoveNode.prototype.getDown = function() {
        return this.mDown;
    }

    MoveNode.prototype.setRight = function(node) {
        this.mRight = node;
    }

    MoveNode.prototype.getRight = function() {
        return this.mRight;
    }

    MoveNode.prototype.isOneLineComment = function() {
        return !!this.mOneLineComment;
    }

    MoveNode.prototype.setOneLineComment = function(comment) {
        this.mOneLineComment = comment;
        this.setIsNewComment(this.isOneLineComment() || this.isMultiLineComment());
    }

    MoveNode.prototype.getOneLineComment = function() {
        return this.mOneLineComment;
    }

    MoveNode.prototype.isMultiLineComment = function() {
        return !!this.mMultiLineComment;
    }

    MoveNode.prototype.setMultiLineComment = function(comment) {
        this.mMultiLineComment = comment;
        this.setIsNewComment(this.isOneLineComment() || this.isMultiLineComment());
    }

    MoveNode.prototype.getMultiLineComment = function() {
        return this.mMultiLineComment;
    }

    MoveNode.prototype.setIsBoardText = function(value) {
        this.setIsValue(value, BOARD_TEXT);
        this.checkExtension();
    }

    MoveNode.prototype.isBoardText = function() {
        return this.isValue(BOARD_TEXT);
    }

    MoveNode.prototype.setBoardText = function(text) {
        this.mBoardText = text;
        this.setIsBoardText(!!this.mBoardText);
    }

    MoveNode.prototype.getBoardText = function() {
        return this.mBoardText;
    }


    //--------------------------------------------------------
    
    MoveNode.prototype.Info2Code = function(){
        let s = "",
            i = 0;
        i = (this.mInfo >> 24) & 0xFF;
        s += ("00000000" + i.toString(2)).slice(-8) + " ";
        i = (this.mInfo >> 16) & 0xFF;
        s += ("00000000" + i.toString(2)).slice(-8) + " ";
        i = (this.mInfo >> 8) & 0xFF;
        s += ("00000000" + i.toString(2)).slice(-8) + " ";
        i = this.mInfo & 0xFF;
        s += ("00000000" + i.toString(2)).slice(-8) + " ";
        return s;
    }

    MoveNode.prototype.pos2Name = function(pos) {
        let alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            mbArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        switch ((pos).constructor.name) {
            case "Number":
                if (pos >= 0 && pos < 225)
                    return alpha.charAt(pos % 16 - 1).toUpperCase() + mbArr[(15 - parseInt(pos / 16) - 1)];
            case "JPoint":
                return alpha.charAt(pos.x - 1).toUpperCase() + mbArr[(15 - pos.y)];
        }
    }
    
    MoveNode.prototype.getName = function() {
        return this.pos2Name(this.getPos());
    }

    MoveNode.prototype.toRenjuNode = function(renjuNode = new RenjuNode()) {
        renjuNode.idx = this.mPos.x - 1 + (this.mPos.y - 1) * 15;
        renjuNode.txt = this.getBoardText() || "○";
        renjuNode.innerHTML = this.isOneLineComment() ? "<br>" + this.getOneLineComment() : "";
        renjuNode.innerHTML +=  this.isMultiLineComment() ? "<br>" + String(this.getMultiLineComment()).split(String.fromCharCode(10)).join("<br>") : "";
        return renjuNode;
    }

    exports.MoveNode = MoveNode;
})))
/*
let n = new MoveNode(), buf = new Uint8Array(2);
    n.setPosInfo(1,256*55)
    n.getExtendedInfo(buf);
    n.setOneLineComment("22333")
    console.log(n.isOneLineComment())
    let a=[0],b,c
    a++
    console.log([buf[0],buf[1],c])
*/
