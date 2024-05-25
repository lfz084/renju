
(function(global, factory) {
    (global = global || self, factory(global));
}(this, (function(exports) {
    'use strict';
    //console.log(exports);
    //--------------------- Position ---------------------

    const NORMALIZE_TABLE = [[{}]];
    const TRANSPOSE_TABLE = [[{}]];

    for (let idx = 0; idx < 226; idx++) {
        NORMALIZE_TABLE[idx] = [];
        TRANSPOSE_TABLE[idx] = [];
        for (let nMatch = 0; nMatch < 8; nMatch++) {
            NORMALIZE_TABLE[idx][nMatch] = {};
            TRANSPOSE_TABLE[idx][nMatch] = {};
            for (let size = 6; size < 16; size++) {
                NORMALIZE_TABLE[idx][nMatch][size] = Point2Idx(normalizeCoord(Idx2Point(idx), nMatch, { x: (size + 1) / 2, y: (size + 1) / 2 }));
                TRANSPOSE_TABLE[idx][nMatch][size] = Point2Idx(transposeCoord(Idx2Point(idx), nMatch, { x: (size + 1) / 2, y: (size + 1) / 2 }));
            }
        }
    }
    // movePoint = {x: [1-15], y: [1-15]} , idx: [0-224]
    // passMove = {x: 1, y:16}, idx: 225
    function Point2Idx(point) {
        return point.x - 1 + (point.y - 1) * 15;
    }

    function Idx2Point(idx) {
        let x = idx % 15,
            y = ~~(idx / 15);
        return { x: x + 1, y: y + 1 }
    }

    function rotate90(point, centerPos) {
        let x = centerPos.x - point.x,
            y = centerPos.y - point.y;
        if (point.x == 1 && point.y == 16) return point;
        return { x: centerPos.x + y, y: centerPos.y - x }
    }

    function rotate180(point, centerPos) {
        let x = centerPos.x - point.x,
            y = centerPos.y - point.y;
        if (point.x == 1 && point.y == 16) return point;
        return { x: centerPos.x + x, y: centerPos.y + y }
    }

    function rotate270(point, centerPos) {
        let x = centerPos.x - point.x,
            y = centerPos.y - point.y;
        if (point.x == 1 && point.y == 16) return point;
        return { x: centerPos.x - y, y: centerPos.y + x }
    }

    function reflectX(point, centerPos) {
        if (point.x == 1 && point.y == 16) return point;
        return { x: point.x, y: centerPos.y * 2 - point.y }
    }

    function normalizeCoord(point, nMatch, centerPos) {
        switch (nMatch) {
            case 0:
            case 4:
                break;
            case 1:
            case 5:
                point = rotate270(point, centerPos);
                break;
            case 2:
            case 6:
                point = rotate180(point, centerPos);
                break;
            case 3:
            case 7:
                point = rotate90(point, centerPos);
                break;
        }
        if (nMatch > 3) point = reflectX(point, centerPos);
        return point;
    }

    function transposeCoord(point, nMatch, centerPos) {
        if (nMatch > 3) point = reflectX(point, centerPos);
        switch (nMatch) {
            case 0:
            case 4:
                break;
            case 1:
            case 5:
                point = rotate90(point, centerPos);
                break;
            case 2:
            case 6:
                point = rotate180(point, centerPos);
                break;
            case 3:
            case 7:
                point = rotate270(point, centerPos);
                break;
        }
        return point;
    }

    function normalizeIdx(idx, nMatch, size) {
        return NORMALIZE_TABLE[idx][nMatch][size];
    }

    function normalizePath(path, nMatch, size) {
        return path.map(idx => NORMALIZE_TABLE[idx][nMatch][size]);
    }

    function transposeIdx(idx, nMatch, size) {
        return TRANSPOSE_TABLE[idx][nMatch][size];
    }

    function transposePath(path, nMatch, size) {
        return path.map(idx => TRANSPOSE_TABLE[idx][nMatch][size]);
    }

    class Position {
        constructor(path) {
            this.position = new Array(225);
            this.positionB = new Array(225);
            this.movesCount = 0;
            path.map((idx, i) => idx >= 0 && idx <= 224 && (this.position[idx] = (i & 1) + 1));
        }
    }

    Position.prototype.reset = function() {
        this.positionB = new Array(225);
        this.movesCount = 0;
    }

    Position.prototype.getEmptyIdx = function(path) {
        path.find(idx => idx < 225 && !this.positionB[idx]);
    }

    Position.prototype.move = function(idx, color) {
        //console.log(`move ${idxToName(idx)}, ${color}\nthis.position[idx]: ${this.position[idx]}\nthis.positionB[idx]: ${this.positionB[idx]}`)
        if (this.position[idx] == color && !this.positionB[idx]) {
            this.positionB[idx] = color;
            return ++this.movesCount;
        }
        else {
            return 0;
        }
    }

    Position.prototype.back = function(idx) {
        if (this.positionB[idx]) {
            this.positionB[idx] = 0;
            return this.movesCount--;
        }
        else {
            return 0;
        }
        //console.log(`back ${idxToName(idx)}\nthis.positionB[idx]: ${this.positionB[idx]}`);
    }

    //--------------------- NodeBuffer ---------------------

    const NODE_SIZE = 20;

    class NodeBuffer extends TypeBuffer {
        constructor(initPages = 1, maxPages = 1024) {
            super(NODE_SIZE, initPages, maxPages);
        }
    }

    //-------------------- CommentBuffer ---------------------

    const COMMENT_SIZE = 1024;

    class CommentBuffer extends TypeBuffer {
        constructor(initPages = 1, maxPages = 64) {
            super(COMMENT_SIZE, initPages, maxPages);
        }
    }

    //----------------------- Comment ---------------------
    /*
    class Comment {
        get comment() {
            
        }
        set comment(str) {
            
        }
        constructor(commentBuffer, pointer) {
            this.commentBuf = commentBuffer;
            this.pointer = pointer;
        }
    }
    
    Comment.prototype.free = function() {
        this.commentBuf.free(this.pointer);
    }
    */
    //---------------------- Branch -------------------

    class Branchs {
        constructor() {
            this.branchs = [];
            this.branchsInfo = 0;
            this.boardText = "";
        }
    }

    class Branch {
        constructor ({ idx, nMatch = 0, color = "black", boardText, comment, path = [], indexOf, isJoinNode }) {
            this.idx = idx;
            this.nMatch = nMatch;
            this.color = color;
            this.boardText = boardText;
            this.comment = comment;
            this.path = path;
            this.indexOf = indexOf || path.length;
            this.isJoinNode = isJoinNode;
        }
    }

    //------------------------ Node ---------------------

    const DEFAULT_BOARD_TXT = ["", "●", "○", "◐"];
    //byte idx; // 1 - 226, 226 is passMove
    //byte info;  || info
    //DWORD level; || //DWORD exInfo;   //RenLib.cpp -> class MoveNode
    
    //UINT down;
    //UINT right;
    //UINT boardText;
    //UINT pointer comment;
    class Node {
        static isEqual(node1, node2) {
            return node1.pointer == node2.pointer && node1.nodeBuf == node2.nodeBuf;
        }

        get idx() {
            return this.nodeBuf.getUint8(this.pointer) - 1;
        }
        get info() {
            return this.nodeBuf.getUint8(this.pointer + 1);
        }
        get level() {
            return this.nodeBuf.getUint16(this.pointer + 2);
        }
        get depth() {
            return this.nodeBuf.getUint8(this.pointer + 2);
        }
        get score() {
            return this.nodeBuf.getUint8(this.pointer + 3);
        }
        get down() {
            let pointer = this.nodeBuf.getUint32(this.pointer + 4);
            if (pointer) {
                return new Node(this.nodeBuf, this.commentBuf, pointer);
            }
        }
        get right() {
            let pointer = this.nodeBuf.getUint32(this.pointer + 8);
            if (pointer) {
                return new Node(this.nodeBuf, this.commentBuf, pointer);
            }
        }
        get boardText() {
            let buf = [], i = -1;
            this.nodeBuf.readMemory(buf, this.pointer + 12, 4);
            i = buf.indexOf(0);
            (i + 1) && (buf = buf.slice(0, i));
            return TextCoder.decode(new Uint8Array(buf), "GBK");
        }
        get comment() {
            let pointer = this.nodeBuf.getUint32(this.pointer + 16),
                buf = [];
            //console.log(`get comment this.pointer = ${this.pointer}, pointer = ${pointer}`)
            if (pointer) {
                this.commentBuf.readMemory(buf, pointer + 4, COMMENT_SIZE - 4);
                let i = buf.indexOf(0);
                (i + 1) && (buf = buf.slice(0, i));
                return TextCoder.decode(new Uint8Array(buf), "GBK");
            }
            else
                return "";
        }

        set idx(value) {
            this.nodeBuf.setUint8(this.pointer, value + 1);
        }
        set info(value) {
            this.nodeBuf.setUint8(this.pointer + 1, value);
        }
        set level(value) {
            this.nodeBuf.setUint16(this.pointer + 2, value);
        }
        set depth(value) {
            this.nodeBuf.setUint8(this.pointer + 2, value);
        }
        set score(value) {
            this.nodeBuf.setUint8(this.pointer + 3, value);
        }
        set down(node) {
            if (node && node.constructor.name == "Node")
                this.nodeBuf.setUint32(this.pointer + 4, node.pointer);
            else
                this.nodeBuf.setUint32(this.pointer + 4, 0);
        }
        set right(node) {
            if (node && node.constructor.name == "Node")
                this.nodeBuf.setUint32(this.pointer + 8, node.pointer);
            else
                this.nodeBuf.setUint32(this.pointer + 8, 0);
        }
        set boardText(str) {
            if (str) {
                let buf = TextCoder.encode(str, "GBK").slice(0, 4);
                this.nodeBuf.writeMemory(buf, this.pointer + 12, buf.length);
                (buf.length < 4) && this.nodeBuf.writeMemory([0], this.pointer + 12 + buf.length, 1);
            }
        }
        set comment(str) {
            if (str) {
                let pointer = this.nodeBuf.getUint32(this.pointer + 16),
                    buf = TextCoder.encode(str, "GBK").slice(0, COMMENT_SIZE - 4);
                if (0 == pointer) {
                    pointer = this.commentBuf.alloc();
                    //pointer==0 && alert(pointer)
                    this.commentBuf.setUint8(pointer, 1);
                    this.nodeBuf.setUint32(this.pointer + 16, pointer);
                }
                //console.log(`set comment this.pointer = ${this.pointer}, pointer = ${pointer}\n${str}`)
                if (pointer) {
                    this.commentBuf.writeMemory(buf, pointer + 4, buf.length);
                    (buf.length < COMMENT_SIZE - 4) && this.commentBuf.writeMemory([0], pointer + 4 + buf.length, 1);
                }
            }
        }

        constructor(nodeBuffer, commentBuffer, pointer, idx, boardText) {
            this.nodeBuf = nodeBuffer;
            this.commentBuf = commentBuffer;
            this.pointer = pointer;
            idx != undefined && (this.idx = idx);
            boardText && (this.boardText = boardText);
        }
    }

    Node.prototype.free = function() {
        let pointer = this.nodeBuf.getUint32(this.pointer + 16);
        this.nodeBuf.free(this.pointer);
        pointer && (this.commentBuf.free(pointer));
    }

    Node.prototype.isEqual = function(node) {
        return Node.isEqual(this, node);
    }

    Node.prototype.isChild = function(childNode) {
        let cNode = this.down;
        while (cNode) {
            if (cNode.isEqual(childNode)) return true;
            cNode = cNode.right;
        }
        return false;
    }

    Node.prototype.isParent = function(parentNode) {
        return parentNode.isChild(this);
    }

    Node.prototype.getChild = function(idx) {
        let cNode = this.down;
        while (cNode) {
            if (cNode.idx === idx) return cNode;
            cNode = cNode.right;
        }
    }

    Node.prototype.getChilds = function(moves) {
        let nodes = [];
        if (!Array.isArray(moves)) { //all childNode
            let node = this.down;
            while (node) {
                nodes.push(node);
                node = node.right;
            }
        }
        else { //
            nodes = moves.map(idx => this.getChild(idx)).filter(node => !!node);
        }
        return nodes;
    }

    Node.prototype.getMaxChild = function() {
        let cNode = this.down,
            max = -0xFFFF,
            maxNode = cNode;
        while (cNode) {
            let score = cNode.score;
            if (score > max && score != 0xFF) {
                max = score;
                maxNode = cNode;
            }
            cNode = cNode.right;
        }
        return maxNode;
    }

    Node.prototype.getMinChild = function() {
        let cNode = this.down,
            min = 0xFFFF,
            minNode = cNode;
        while (cNode) {
            let score = cNode.score;
            if (score < min && score != 0x00) {
                min = score;
                minNode = cNode;
            }
            cNode = cNode.right;
        }
        return minNode;
    }

    Node.prototype.getMaxMinScore = function() {
        let cNode = this.down,
            max = -0xFFFF,
            min = 0xFFFF;
        while (cNode) {
            let score = cNode.score;
            //console.error(`${idxToName(cNode.idx)}, score: ${score}, max: ${max}, min: ${min}`)
            if (score > max && score != 0xFF) {
                max = score;
            }
            if (score < min && score != 0x00) {
                min = score;
            }
            cNode = cNode.right;
        }
        max == 0x00 && (min == max);
        min == 0xFF && (min == max);
        return { maxScore: max, minScore: min };
    }
    
    Node.prototype.copyNode = function(sourceNode) {
        this.idx = sourceNode.idx;
        this.level = sourceNode.level;
        this.boardText = sourceNode.boardText;
        this.comment = sourceNode.comment + this.comment;
        return this;
    }

    Node.prototype.addChild = function(childNode) {
        if (childNode.nodeBuf != this.nodeBuf) throw new Error(`Node.addChild Error: childNode.nodeBuf != this.nodeBuf`);
        let leftNode = this.down,
            rightNode,
            cIdx = childNode.idx;
        if (leftNode) {
            if (cIdx < leftNode.idx) {
                this.down = childNode;
                childNode.right = leftNode;
                return childNode;
            }
            else if (cIdx == leftNode.idx) {
                leftNode.copyNode(childNode);
                return leftNode;
            }
            
            rightNode = leftNode.right;
            while (rightNode) {
                if (cIdx < rightNode.idx) {
                    childNode.right = rightNode;
                    leftNode.right = childNode;
                    return childNode;
                }
                else if (cIdx == rightNode.idx) {
                    rightNode.copyNode(childNode);
                    return rightNode;
                }
                
                leftNode = rightNode;
                rightNode = leftNode.right
            }

            leftNode.right = childNode;
        }
        else {
            this.down = childNode;
        }
        return childNode;
    }

    Node.prototype.addChilds = function(childNodes) {
        return childNodes.map(node => this.addChild(node));
    }

    Node.prototype.removeChild = function(childNode) {
        let leftNode = this.down,
            rightNode = leftNode ? leftNode.right : undefined;
        if (leftNode.isEqual(childNode)) {
            this.down = rightNode;
            childNode.right = null;
        }
        else {
            while (rightNode) {
                if (rightNode.isEqual(childNode)) {
                    leftNode.right = childNode.right;
                    childNode.right = null;
                    return;
                }
                leftNode = rightNode;
                rightNode = rightNode.right;
            }
        }
    }

    Node.prototype.removeChilds = function(childNodes) {
        childNodes.map(node => this.removeChild(node));
    }

    Node.prototype.map = function(callback) {
        let current = this,
            right,
            down,
            stack = [];
        typeof callback != "function" && (callback = () => {});
        while (current) {
            
            callback(current);
            right = current.right;
            down = current.down;

            if (right) stack.push(right);

            if (down) {
                current = down;
            }
            else {
                if (stack.length) current = stack.pop();
                else current = undefined;
            }
        }
    }

    Node.prototype.sortIdx = function(order = 1) {
        const LEN = 226;
        let list = new Array(LEN),
            current = this.down;

        if (current == undefined) return;
        while (current) {
            let idx = order == -1 ? LEN -1 - current.idx : current.idx;
            list[idx] = current;
            current = current.right;
        }   

        let i = -1;
        while (++i < LEN) {
            if (list[i]) {
                this.down = list[i];
                current = list[i];
                break;
            }
        }

        while (++i < LEN) {
            if (list[i]) {
                current.right = list[i];
                current = list[i];
            }
        }
        current.right = undefined;
    }

    Node.prototype.sortScore = function(order = 1) {
        const LEN = 256;
        let list = new Array(LEN),
            current = this.down;

        if (current == undefined) return;
        for (let i = 0; i < LEN; i++) {
            list[i] = [];
        }
        while (current) {
            let idx = order == -1 ? LEN - 1 - current.score : current.score;
            list[idx].push(current);
            current = current.right;
        }

        let i = -1;
        while (++i < LEN) {
            let end = list[i].length;
            if (end) {
                this.down = list[i][0];
                current = list[i][0];
                for (let j = 1; j < end; j++) {
                    current.right = list[i][j];
                    current = list[i][j];
                }
                break;
            }
        }

        while (++i < LEN) {
            let end = list[i].length;
            if (end) {
                for (let j = 0; j < end; j++) {
                    current.right = list[i][j];
                    current = list[i][j];
                }
            }
        }
        current.right = undefined;
    }

    //------------------------ Tree ---------------------

    class Tree {
        constructor(initPages = 1, maxPages = 1024, centerPos = { x: 8, y: 8 }) {
            this.nodeBuf = new NodeBuffer(initPages, maxPages);
            this.commentBuf = new CommentBuffer(initPages, maxPages);
            this.root = this.newNode();
            this.centerPos = centerPos;
            this.size = centerPos.x * 2 - 1;
            this.nMatch = 0;
        }
    }

    Tree.prototype.normalizeIdx = function(idx, nMatch = this.nMatch) {
        return normalizeIdx(idx, nMatch, this.size);
    }

    Tree.prototype.normalizePath = function(path, nMatch = this.nMatch) {
        return normalizePath(path, nMatch, this.size);
    }

    Tree.prototype.transposeIdx = function(idx, nMatch = this.nMatch) {
        return transposeIdx(idx, nMatch, this.size);
    }

    Tree.prototype.transposePath = function(path, nMatch = this.nMatch) {
        return transposePath(path, nMatch, this.size);
    }

    Tree.prototype.newNode = function(idx = 225, boardText) {
        let pointer = this.nodeBuf.alloc();
        if (pointer) {
            this.nodeBuf.resetObj(pointer); // set Obj buf = {0};
            return new Node(this.nodeBuf, this.commentBuf, pointer, idx, boardText);
        }
        else
            return null;
    }

    Tree.prototype.copyNode = function(sourceNode, targetNode = this.newNode()) {
        targetNode.copyNode(sourceNode);
        return targetNode;
    }

    Tree.prototype.cle = function() {
        this.nodeBuf.clePages();
        this.commentBuf.clePages();
        this.root = this.newNode();
    }
    
    //copyNode childNode addChileNode
    Tree.prototype.addChild = function(parNode, childNode) {
        if (parNode.nodeBuf != this.nodeBuf) throw new Error(`Tree.addChild Error: parNode.nodeBuf != this.nodeBuf`);
        let leftNode = parNode.down,
            rightNode,
            cIdx = childNode.idx;
        if (leftNode) {
            let idx = leftNode.idx;
            if (cIdx < idx) {
                let nNode = this.copyNode(childNode);
                parNode.down = nNode;
                nNode.right = leftNode;
                return nNode;
            }
            else if (cIdx == idx) {
                this.copyNode(childNode, leftNode);
                return leftNode;
            }

            rightNode = leftNode.right;
            while (rightNode) {
                let idx = rightNode.idx;
                if (cIdx < idx) {
                    let nNode = this.copyNode(childNode);
                    leftNode.right = nNode;
                    nNode.right = rightNode;
                    return nNode;
                }
                else if (cIdx == idx) {
                    this.copyNode(childNode, rightNode);
                    return rightNode;
                }
                leftNode = rightNode;
                rightNode = rightNode.right
            }

            let nNode = this.copyNode(childNode);
            leftNode.right = nNode;
            return nNode;
        }
        else {
            let nNode = this.copyNode(childNode);
            parNode.down = nNode;
            return nNode;
        }
    }

    //parNode.nodeBuf == this.nodeBuf
    Tree.prototype.addChilds = function(parNode, childNodes) {
        return childNodes.map(node => this.addChild(parNode, node));
    }

    Tree.prototype.addRight = function(leftNode, rightNode) {
        if (leftNode.nodeBuf != this.nodeBuf) throw new Error(`Tree.addRight Error: leftNode.nodeBuf != this.nodeBuf`);
        let current = leftNode.right,
            rIdx = rightNode.idx;

        while (current) {
            let idx = current.idx;
            if (rIdx < idx) {
                let nNode = this.copyNode(rightNode);
                leftNode.right = nNode;
                nNode.right = current;
                return nNode;
            }
            else if (rIdx == idx) {
                this.copyNode(rightNode, current);
                return current;
            }
            leftNode = current;
            current = current.right;
        }

        let nNode = this.copyNode(rightNode);
        leftNode.right = nNode;
        return nNode;
    }

    Tree.prototype.removeNode = function(parNode, node) {
        parNode.removeChild(node);
    }

    Tree.prototype.removeNodes = function(parNode, nodes) {
        parNode.removeChilds(nodes);
    }

    Tree.prototype.findNode = function(parentNode, idx) {
        return parentNode.getChild(idx);
    }

    Tree.prototype.seek = function(path) {
        let current = this.root,
            i = 0;
        while (current && i < path.length) {
            current = this.findNode(current, path[i++]);
        }
        return current;
    }

    Tree.prototype.removeBranch = function(path) {
        let idx,
            parNode,
            cNode,
            rightNode,
            downNode,
            stack = [];
        if (path.length == 0) {
            this.cle();
        }
        else {
            idx = path.pop();
            parNode = this.seek(path);
            parNode && (cNode = parNode.getChild(idx));
            if (cNode) {
                parNode.removeChild(cNode);
                cNode.free();
                //console.log(idxToName(cNode.idx));
                cNode = cNode.down;
                cNode && cNode.map(node => node.free());
            }
        }
    }
    
    //copy branchRoot.childs to target
    //target: path || node
    Tree.prototype.insertBranch = function(target, branchRoot) {
        let braCur = branchRoot.down,
            braDown,
            braRight,
            braStack = [],
            tagCur = Array.isArray(target) ? this.createPath(target) : target,
            tagStack = [],
            isDown = true;

        while (braCur) {
            if (isDown) tagCur = this.addChild(tagCur, braCur);
            else tagCur = this.addRight(tagCur, braCur);

            braDown = braCur.down;
            braRight = braCur.right;
            if (braRight) {
                tagStack.push(tagCur);
                braStack.push(braRight);
            }

            if (braDown) {
                braCur = braDown;
                isDown = true;
            }
            else {
                if (braStack.length) {
                    tagCur = tagStack.pop();
                    braCur = braStack.pop();
                    isDown = false;
                }
                else {
                    braCur = undefined;
                }
            }
        }
    }

    Tree.prototype.mergeTree = function(...trees) {
        trees.map(tree => {
            this.nodeBuf != tree.nodeBuf && this.insertBranch([], tree.root);
        })
    }

    Tree.prototype.copyBranch = function(node) {}

    Tree.prototype.copyTree = function(node) {}

    Tree.prototype.getPositionNodes = function(path, maxMatch = 0, maxCount = 900) {
        let nodes = [],
            movesLen = 0;

        path.map(idx => idx < 225 && movesLen++);
        
        if (movesLen==0) {
            nodes.push(this.root);
            return nodes;
        }

        for (let nMatch = 0; nMatch <= maxMatch; nMatch++) {
            let moveList = [],
                stack = [],
                downNode,
                rightNode,
                current = this.root.down,
                tPath = transposePath(path, nMatch, this.size),
                position = new Position(tPath);

            while (current) {
                let isBack = false,
                    idx = current.idx;

                rightNode = current.right;
                downNode = current.down;
                if (rightNode) stack.push({ node: rightNode, len: moveList.length });
                moveList.push(idx);

                let color = (moveList.length - 1 & 1) + 1,
                    rt = position.move(idx, color);

                if (rt || idx == 225) {
                    if (rt == movesLen) {
                        nodes.push(current);
                        if (maxCount ==1) return nodes;
                        isBack = true;
                    }
                    else {
                        if (downNode) current = downNode;
                        else isBack = true;
                    }
                }
                else {
                    isBack = true;
                }

                if (isBack) {
                    if (stack.length) {
                        let st = stack.pop();
                        current = st.node;
                        for (let i = moveList.length; i > st.len; i--) {
                            let idx = moveList.pop();
                            position.back(idx);
                        }
                    }
                    else {
                        current = null;
                        for (let i = moveList.length; i > 0; i--) {
                            let idx = moveList.pop();
                            position.back(idx);
                        }
                    }
                }
            }
        }
        return nodes;
    }
    
    
    Tree.prototype.hasPosition = function(path, maxMatch = 0) {
        return  !!this.getPositionNodes(path, maxMatch).length;
    }

    Tree.prototype.getBranchNodes = function(path) {
        function checkPath(shortPath, longPath) {
            return !shortPath.find((idx, i) => idx != longPath[i]);
        }

        function addBranch(branch) {
            let current = nodes[branch.idx],
                branchsInfo = (branch.indexOf + 1 & 1) + 1; //last move color

            if (undefined == current) {
                current = nodes[branch.idx] = new Branchs();
            }

            if (0 == (current.branchsInfo & branchsInfo) || 
                branch.color == "black" || 
                (current.branchs[branchsInfo - 1] && current.branchs[branchsInfo - 1].isJoinNode))
            {
                current.branchsInfo |= branchsInfo;
                current.branchs[branchsInfo - 1] = branch;
                3 == current.branchsInfo && (current.boardText = DEFAULT_BOARD_TXT[3]);
            }
        }

        function addChildBranchs(current, currentPath, nMatch) {
            let childNodes = current.getChilds(),
                passNode,
                color = this.nMatch == nMatch ? checkPath(path, currentPath) ? "black" : "#556B2F" : "#008000";

            childNodes.length && childNodes[childNodes.length - 1].idx == 225 && (passNode = childNodes.pop());
            childNodes.map(cur => {
                let idx = normalizeIdx(cur.idx, nMatch, this.size),
                    path = currentPath.concat([idx]),
                    branch = new Branch({
                        idx: idx,
                        nMatch: nMatch,
                        color: color,
                        boardText: cur.boardText,
                        comment: cur.comment,
                        path: path,
                    });
                addBranch(branch);
                //console.log(`this.nMatch: ${this.nMatch}\nnMatch: ${nMatch}\n`);
            });
            passNode && passNode.getChilds().map(cur => {
                let idx = normalizeIdx(cur.idx, nMatch, this.size),
                    path = currentPath.concat([225, idx]),
                    branch = new Branch({
                        idx: idx,
                        nMatch: nMatch,
                        color: color,
                        boardText: cur.boardText,
                        comment: cur.comment,
                        path: path,
                    });
                addBranch(branch);
            });
        }

        let nodes = new Array(226),
            movesLen = path.filter(idx => idx < 225).length;

        for (let nMatch = 0; nMatch < 8; nMatch++) {
            let moveList = [],
                stack = [],
                downNode,
                rightNode,
                current = this.root,
                tPath = transposePath(path, nMatch, this.size),
                position = new Position(tPath),
                jointNode = null;

            //console.log(`RenjuTree getBranchNodes: [${movesToName(path)}]>>> [${movesToName(tPath)}]`);
            if (tPath.length == 0) {
                addChildBranchs.call(this, current, [], nMatch);
                continue;
            }
            else {
                current = current.down;
            }

            while (current) {
                let isBack = false,
                    idx = current.idx;

                rightNode = current.right;
                downNode = current.down;
                rightNode && stack.push({ node: rightNode, len: moveList.length });
                moveList.push(idx);

                let color = (moveList.length - 1 & 1) + 1,
                    rt = position.move(idx, color);
                //console.warn(`${idxToName(idx)} rt: ${rt}`)
                if (rt || idx == 225) {
                    if (rt == movesLen) {
                        let currentPath = normalizePath(moveList.slice(0), nMatch, this.size);
                        if (jointNode) {
                            let branch = new Branch({
                                idx: normalizeIdx(jointNode.node.idx, nMatch, this.size),
                                nMatch: nMatch,
                                color: "#685D8B", //"#483D8B"
                                boardText: DEFAULT_BOARD_TXT[(jointNode.len - 1 & 1) + 1],
                                path: currentPath,
                                indexOf: jointNode.len,
                                isJoinNode: true
                            });
                            addBranch(branch);
                            //console.log(`red: [${movesToName(branch.path)}]`);
                        }
                        else {
                            addChildBranchs.call(this, current, currentPath, nMatch);
                        }
                        isBack = true;
                        //console.warn(`[${movesToName(moveList)}]`);
                    }
                    else {
                        if (downNode) current = downNode;
                        else isBack = true;
                    }
                }
                else if (!jointNode) {
                    jointNode = { node: current, len: moveList.length };
                    if (downNode) current = downNode;
                    else isBack = true;
                }
                else {
                    isBack = true;
                }

                if (isBack) {
                    let len;
                    if (stack.length) {
                        let st = stack.pop();
                        current = st.node;
                        len = st.len;
                    }
                    else {
                        current = null;
                        len = 0;
                    }
                    for (let i = moveList.length; i > len; i--) {
                        position.back(moveList.pop());
                    }
                    if (jointNode && jointNode.len > moveList.length) jointNode = null;
                }
            }
        }

        nodes = nodes.filter(cur => !!cur);
        //console.log(`nMatch: ${nodes.map(cur => (cur.branchs[0] && cur.branchs[0].nMatch) || (cur.branchs[1] && cur.branchs[1].nMatch))}`)
        //console.log(`[${movesToName(nodes.map(cur => (cur.branchs[0] && cur.branchs[0].idx) || (cur.branchs[1] && cur.branchs[1].idx)))}]`)
        return nodes;
    }
    
    Tree.prototype.getInnerHtml = function(path) {
        let current = this.root.down,
            depth = 0,
            iHtml = "";
        //console.log(`Tree getInnerHtml path[${path}], ${path.length}`)
        while (current) {
            while (current) {
                //console.log(`[${path[depth]}], ${depth}`)
                if (current.idx == path[depth]) {
                    depth++;
                    if (depth < path.length) {
                        current = current.down;
                    }
                    else{
                        iHtml = current.comment;
                        current = undefined;
                    }
                }
                else current = current.right;
            }
        }
        return iHtml;
    }

    Tree.prototype.createPath = function(path, nodeInfo) {
        //console.log(`createPath: [${path}]`);
        let preNode = this.root,
            downNode = this.root,
            i = 0;
        while (i < path.length) {
            downNode = this.findNode(preNode, path[i]);
            if (!downNode) {
                downNode = this.newNode();
                downNode.idx = path[i];
                if (typeof nodeInfo === "object") {
                    downNode.level = nodeInfo.level;
                    downNode.boardText = nodeInfo.boardText;
                    downNode.comment = nodeInfo.comment;
                }
                else
                    downNode.boardText = DEFAULT_BOARD_TXT[(i & 1) + 1];
                preNode.addChild(downNode);
            }
            preNode = downNode;
            i++;
        }
        return downNode;
    }

    Tree.prototype.createPathVCF = function(preNode, path) {
        let downNode = preNode,
            i = 0;
        while (i < path.length) {
            downNode = this.findNode(preNode, path[i]);
            if (!downNode) {
                downNode = this.newNode();
                downNode.idx = path[i];
                downNode.boardText = i & 1 ? "L" : "W";
                preNode.addChild(downNode);
            }
            preNode = downNode;
            i++;
        }
        return downNode;
    }

    Tree.prototype.createNodes = function(moves, nodeInfo) {
        let nodes = [];
        moves.map((idx, i) => {
            nodes[i] = this.newNode();
            if (nodes[i]) {
                nodes[i].idx = idx;
                if (typeof nodeInfo === "object") {
                    nodes[i].level = nodeInfo.level;
                    nodes[i].boardText = nodeInfo.boardText;
                    nodes[i].comment = nodeInfo.comment;
                }
            }
        })
        return nodes;
    }

    Tree.prototype.map = function(callback) {
        this.root.map(callback);
    }
    
    Tree.prototype.sortIdx = function(order = 1) {
        this.map(node => node.sortIdx(order));
    }
    
    Tree.prototype.sortScore = function(order = 1) {
        this.map(node => node.sortScore(order));
    }

    //----------------------- exports -------------------------
    
    exports.RenjuNode = Node;
    exports.RenjuTree = Tree;
    
})))
