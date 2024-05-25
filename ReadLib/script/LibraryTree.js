(function(global, factory) {
    (global = global || self, factory(global));
}(this, (function(exports) {
    'use strict';
    //console.log(exports);

    const PAGESIZE = 1024 * 3;
    
    class pointNode {
        constructor() {
    
        }
    }
    
    class LibraryTree {
        constructor() {
            this.pageCurrent = new Uint32Array(PAGESIZE);
            this.bufferPages = [];
            this.bufferPages.push(this.pageCurrent);
            this.bufferCurrent = 0;
        }
    }

    LibraryTree.prototype.pushNode = function([variant, down, right]) {
        if (this.bufferCurrent >= PAGESIZE) {
            this.pageCurrent = new Uint32Array(PAGESIZE);
            this.bufferPages.push(this.pageCurrent);
            this.bufferCurrent = 0;
        }
        let result = this.bufferCurrent;
        if (variant != undefined) this.pageCurrent[this.bufferCurrent] = variant;
        if (down != undefined) this.pageCurrent[this.bufferCurrent+1] = down;
        if (right != undefined) this.pageCurrent[this.bufferCurrent+2] = right;
        this.bufferCurrent+=3;
        return result;
    };
    
    LibraryTree.prototype.getNode = function(point, bufferNode = []) {
        if (point % 3 || point < 0 || point > (PAGESIZE * this.bufferPages.length - 3)) {
            throw new Error("LibraryTree.getNode() point error ")
        }
        let page = this.bufferPages[parseInt(point/PAGESIZE)],
            current = point % PAGESIZE;
        bufferNode[0] = page[current];
        bufferNode[1] = page[current+1];
        bufferNode[2] = page[current+2];
        return bufferNode;
    };
    
    LibraryTree.prototype.setNode = function(point, bufferNode = []) {
        if (point % 3 || point < 0 || point > (PAGESIZE * this.bufferPages.length - 3)) {
            throw new Error("LibraryTree.getNode() point error ")
        }
        let page = this.bufferPages[parseInt(point / PAGESIZE)],
            current = point % PAGESIZE;
        page[current] = bufferNode[0];
        page[current + 1] = bufferNode[1];
        page[current + 2] = bufferNode[2];
        return true;
    };


    exports.LibraryTree = LibraryTree;
})))
