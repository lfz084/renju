(function(global, factory) {
    (global = global || self, factory(global));
}(this, (function(exports) {
    'use strict';
    //console.log(exports);

    const UINT32 = 4;
    const UINT16 = 2;
    const UINT8 = 1;
    const INT32 = -4;
    const INT16 = -2;
    const INT8 = -1;
    const PAGE_SIZE = 0x00100000; //pageSize 1Mb;
    const AND_PAGE_SIZE = PAGE_SIZE - 1;

    class Page {
        /*部分浏览器不支持 static 变量*/
        //static PAGE_SIZE = 0x00100000; 

        constructor() {
            //try{
            this.buf = new ArrayBuffer(PAGE_SIZE);
            this.uint32 = new Uint32Array(this.buf);
            this.uint16 = new Uint16Array(this.buf);
            this.uint8 = new Uint8Array(this.buf);
            this.int32 = new Int32Array(this.buf);
            this.int16 = new Int16Array(this.buf);
            this.int8 = new Int8Array(this.buf);
            this.uint32.fill(0);
            //}
            //catch(err) {
            //console.error(err);
            //throw err;
            //}
        }
    }

    class TypeBuffer {
        /*部分浏览器不支持 static 变量*/
        //static UINT32 = 4;
        //static UINT16 = 2;
        //static UINT8 = 1;
        //static INT32 = -4;
        //static INT16 = -2;
        //static INT8 = -1;

        constructor(typeSize, initPages = 1, maxPages = 64) {
            initPages = initPages > maxPages ? maxPages : initPages;
            this.typeSize = typeSize;
            this.maxPages = maxPages;
            this.isFull = false;
            this.current = 4;
            this.size = initPages * PAGE_SIZE;
            this.pages = [];
            for (let i = 0; i < initPages; i++) {
                this.pages[i] = new Page();
            }
        }
    }

    TypeBuffer.prototype.addPages = function(newPages = 1) {
        let pagesNum = this.pages.length + newPages;
        if (pagesNum <= this.maxPages) {
            this.size = pagesNum * PAGE_SIZE;
            for (let i = 0; i < newPages; i++) {
                this.pages.push(new Page());
            }
            newPages && (this.isFull = false);
        }
        else {
            throw new Error("TypeBuffer pages is full");
        }
    };

    TypeBuffer.prototype.clePages = function() {
        let pagesNum = this.pages.length;
        this.current = 4;
        this.size = this.pages.length * PAGE_SIZE;
        this.pages = [];
        for (let i = 0; i < pagesNum; i++) {
            this.pages[i] = new Page();
        }
        this.pages.length && (this.isFull = false);
    };

    TypeBuffer.prototype.alloc = function() {
        if (this.isFull) return 0;
        let startPointer = this.current;
        do {
            let pIdx = this.current >> 20,
                bIdx = this.current & AND_PAGE_SIZE;
            this.current += this.typeSize;
            if (this.current <= this.size) {
                if ((bIdx + this.typeSize) <= PAGE_SIZE) { //
                    if (0 == this.pages[pIdx].uint8[bIdx])
                        return this.current - this.typeSize;
                }
                else //指针与内存分页对齐
                    this.current = (pIdx + 1) * PAGE_SIZE;
            }
            else {
                if (this.pages.length < this.maxPages) {
                    this.addPages(1);
                    this.current = (this.pages.length - 1) * PAGE_SIZE; //指针与内存分页对齐
                    if (this.current == startPointer) startPointer = this.current - this.typeSize;
                }
                else
                    this.current = 4; // 循环
            }
        } while (this.current != startPointer) // 循环一圈后退出
        throw new Error(`TypeBuffer alloc Error: buffer is full`);
        this.isFull = true;
        return 0;
    };

    TypeBuffer.prototype.free = function(pointer) {
        if (this.size >= pointer) {
            let pIdx = pointer >> 20,
                bIdx = pointer & AND_PAGE_SIZE;
            this.pages[pIdx].uint8[bIdx] = 0;
            this.isFull = false;
        }
    };
    
    TypeBuffer.prototype.resetObj = function(pointer) {
        let pIdx = pointer >> 20,
            bIdx = (pointer & AND_PAGE_SIZE) >> 2;
        
        for (let i = bIdx + (this.typeSize >> 2) - 1; i >= bIdx; i--) {
            this.pages[pIdx].uint32[i] = 0;
        }
    };

    TypeBuffer.prototype.setMemory = function(pointer, leng, value) {
        if (this.size >= pointer + leng) {
            let pIdx = pointer >> 20,
                bIdx = pointer & AND_PAGE_SIZE,
                firstSize = (PAGE_SIZE - bIdx) < leng ? (PAGE_SIZE - bIdx) : leng,
                endSize = (leng - firstSize) & AND_PAGE_SIZE,
                fullPagesNum = (leng - firstSize - endSize) >> 20;
            //console.log(`pointer: ${pointer}\nleng: ${leng}\npIdx: ${pIdx}\nbIdx: ${bIdx}\nfirstSize: ${firstSize}\nendSize: ${endSize}\nfullPagesNum: ${fullPagesNum}`);
        
            //console.log(`set first page: ${pIdx}`);
            for (let i = bIdx + firstSize - 1; i >= bIdx; i--) {
                this.pages[pIdx].uint8[i] = value;
            }
        
            for (let p = 0; p < fullPagesNum; p++) {
                pIdx++;
                //console.log(`set page: ${pIdx}`);
                for (let i = 0; i < PAGE_SIZE; i++)
                    this.pages[pIdx].uint8[i] = value;
            }
        
            pIdx++;
            //console.log(`set end page: ${pIdx}\nendSize: ${endSize}`);
            for (let i = 0; i < endSize; i++) {
                this.pages[pIdx].uint8[i] = value;
            }
        }
        else {
            console.error(new Error("TypeBuffer memory out"));
        }
    };

    TypeBuffer.prototype.writeMemory = function(sourceBuffer, pointer, leng) {
        if (this.size >= pointer + leng) {
            let pIdx = pointer >> 20,
                bIdx = pointer & AND_PAGE_SIZE,
                firstSize = (PAGE_SIZE - bIdx) < leng ? (PAGE_SIZE - bIdx) : leng,
                endSize = (leng - firstSize) & AND_PAGE_SIZE,
                fullPagesNum = (leng - firstSize - endSize) >> 20;
            //console.log(`pointer: ${pointer}\nleng: ${leng}\npIdx: ${pIdx}\nbIdx: ${bIdx}\nfirstSize: ${firstSize}\nendSize: ${endSize}\nfullPagesNum: ${fullPagesNum}`);

            let sIdx = 0;
            let end = bIdx + firstSize;
            for (let i = bIdx; i < end; i++) {
                this.pages[pIdx].uint8[i] = sourceBuffer[sIdx++];
            }
            //console.log(`write first page: ${pIdx}`);

            for (let p = 0; p < fullPagesNum; p++) {
                pIdx++;
                //console.log(`write page: ${pIdx}`);
                for (let i = 0; i < PAGE_SIZE; i++)
                    this.pages[pIdx].uint8[i] = sourceBuffer[sIdx++];
            }

            pIdx++;
            //console.log(`write end page: ${pIdx}`);
            for (let i = 0; i < endSize; i++) {
                this.pages[pIdx].uint8[i] = sourceBuffer[sIdx++];
            }
        }
        else {
            console.error(new Error("TypeBuffer memory out"));
        }
    };

    TypeBuffer.prototype.readMemory = function(targetBuffer, pointer, leng) {
        if (this.size >= pointer + leng) {
            let pIdx = pointer >> 20,
                bIdx = pointer & (PAGE_SIZE - 1),
                firstSize = (PAGE_SIZE - bIdx) < leng ? (PAGE_SIZE - bIdx) : leng,
                endSize = (leng - firstSize) & AND_PAGE_SIZE,
                fullPagesNum = (leng - firstSize - endSize) >> 20;
            //console.log(`pointer: ${pointer}\nleng: ${leng}\npIdx: ${pIdx}\nbIdx: ${bIdx}\nfirstSize: ${firstSize}\nendSize: ${endSize}\nfullPagesNum: ${fullPagesNum}`);

            let tIdx = 0;
            let end = bIdx + firstSize;
            for (let i = bIdx; i < end; i++) {
                targetBuffer[tIdx++] = this.pages[pIdx].uint8[i];
            }
            //console.log(`read first page: ${pIdx}`);

            for (let p = 0; p < fullPagesNum; p++) {
                pIdx++;
                //console.log(`read page: ${pIdx}`);
                for (let i = 0; i < PAGE_SIZE; i++)
                    targetBuffer[tIdx++] = this.pages[pIdx].uint8[i];
            }

            pIdx++;
            //console.log(`read end page: ${pIdx}`);
            for (let i = 0; i < endSize; i++) {
                targetBuffer[tIdx++] = this.pages[pIdx].uint8[i];
            }
        }
        else {
            console.error(new Error("TypeBuffer memory out"));
        }
    };

    TypeBuffer.prototype.setUint32 = function(pointer, value) {
        let pIdx = pointer >> 20,
            bIdx = (pointer & AND_PAGE_SIZE) >> 2;
        this.pages[pIdx].uint32[bIdx] = value;
    };

    TypeBuffer.prototype.setUint16 = function(pointer, value) {
        let pIdx = pointer >> 20,
            bIdx = (pointer & AND_PAGE_SIZE) >> 1;
        this.pages[pIdx].uint16[bIdx] = value;
    };

    TypeBuffer.prototype.setUint8 = function(pointer, value) {
        let pIdx = pointer >> 20,
            bIdx = pointer & AND_PAGE_SIZE;
        this.pages[pIdx].uint8[bIdx] = value;
    };

    TypeBuffer.prototype.setInt32 = function(pointer, value) {
        let pIdx = pointer >> 20,
            bIdx = (pointer & AND_PAGE_SIZE) >> 2;
        this.pages[pIdx].int32[bIdx] = value;
    };

    TypeBuffer.prototype.setInt16 = function(pointer, value) {
        let pIdx = pointer >> 20,
            bIdx = (pointer & AND_PAGE_SIZE) >> 1;
        this.pages[pIdx].int16[bIdx] = value;
    };

    TypeBuffer.prototype.setInt8 = function(pointer, value) {
        let pIdx = pointer >> 20,
            bIdx = pointer & AND_PAGE_SIZE;
        this.pages[pIdx].int8[bIdx] = value;
    };

    TypeBuffer.prototype.getUint32 = function(pointer) {
        let pIdx = pointer >> 20,
            bIdx = (pointer & AND_PAGE_SIZE) >> 2;
        return this.pages[pIdx].uint32[bIdx];
    };

    TypeBuffer.prototype.getUint16 = function(pointer) {
        let pIdx = pointer >> 20,
            bIdx = (pointer & AND_PAGE_SIZE) >> 1;
        return this.pages[pIdx].uint16[bIdx];
    };

    TypeBuffer.prototype.getUint8 = function(pointer) {
        let pIdx = pointer >> 20,
            bIdx = pointer & AND_PAGE_SIZE;
        return this.pages[pIdx].uint8[bIdx];
    };

    TypeBuffer.prototype.getInt32 = function(pointer) {
        let pIdx = pointer >> 20,
            bIdx = (pointer & AND_PAGE_SIZE) >> 2;
        return this.pages[pIdx].int32[bIdx];
    };

    TypeBuffer.prototype.getInt16 = function(pointer) {
        let pIdx = pointer >> 20,
            bIdx = (pointer & AND_PAGE_SIZE) >> 1;
        return this.pages[pIdx].int16[bIdx];
    };

    TypeBuffer.prototype.getInt8 = function(pointer) {
        let pIdx = pointer >> 20,
            bIdx = pointer & AND_PAGE_SIZE;
        return this.pages[pIdx].int8[bIdx];
    };
    
    
    exports.PAGE_SIZE_TYPEBUFFER = PAGE_SIZE; //pageSize 1Mb;
    
    exports.Page = Page;
    exports.TypeBuffer = TypeBuffer;
})))
