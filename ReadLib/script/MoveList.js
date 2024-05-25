(function(global, factory) {
    (global = global || self, factory(global));
}(this, (function(exports) {
    'use strict';
    //console.log(exports);
    class MoveList {
        constructor() {
            this.MAXINDEX = 225;
            this.m_List = new Array(this.MAXINDEX + 1);
            this.m_nIndex = -1;
            this.clearAll();
        }
    }

    MoveList.prototype.clearAll = function() {
        for (let i = 0; i <= this.MAXINDEX; i++) {
            this.m_List[i] = 0;
        }
        this.m_nIndex = -1;
    };

    MoveList.prototype.clearEnd = function() {
        for (let i = this.m_nIndex + 1; i <= this.MAXINDEX; i++) {
            this.m_List[i] = 0;
        }
    };

    MoveList.prototype.isEmpty = function() {
        return this.m_nIndex == -1;
    };

    MoveList.prototype.isFull = function() {
        return this.m_nIndex == this.MAXINDEX;
    };

    MoveList.prototype.setRoot = function(pMove) {
        if (!this.isEmpty())
            throw `MoveList.setRoot Error: MoveList is not empty`;
        this.add(pMove);
    };

    MoveList.prototype.add = function(pMove) {
        //console.log(this.m_nIndex >= this.MAXINDEX)
        if (this.m_nIndex >= this.MAXINDEX)
            throw `MoveList.add Error: MoveList is Full`;
        this.m_List[++this.m_nIndex] = pMove;
    };

    MoveList.prototype.swap = function(nIndex1, nIndex2) {
        if (nIndex1 < 1 || nIndex1 > this.m_nIndex)
            throw `MoveList.swap Error: nIndex1 is out`;
        if (nIndex2 < 1 || nIndex2 > this.m_nIndex)
            throw `MoveList.swap Error: nIndex2 is out`;
        let temp = this.m_List[nIndex1];
        this.m_List[nIndex1] = this.m_List[nIndex2];
        this.m_List[nIndex2] = temp;
    };

    MoveList.prototype.getRoot = function() {
        if (this.isEmpty())
            throw `MoveList.getRoot Error: MoveList is empty`;
        return this.m_List[0];
    }

    MoveList.prototype.get = function(nIndex) {
        if (this.isEmpty())
            throw `MoveList.get Error: MoveList is empty`;
        if (nIndex < 0 || nIndex > this.MAXINDEX)
            throw `MoveList.get Error: nIndex is out`;
        return this.m_List[nIndex];
    };

    MoveList.prototype.current = function() {
        if (this.isEmpty())
            throw `MoveList.current Error: MoveList is empty`;
        return this.m_List[this.m_nIndex];
    };

    MoveList.prototype.next = function() {
        if (this.m_nIndex < this.MAXINDEX) {
            return this.m_List[this.m_nIndex + 1];
        }
        else {
            return 0;
        }
    };

    MoveList.prototype.previous = function() {
        if (this.m_nIndex > 0) {
            return this.m_List[this.m_nIndex - 1];
        }
        else {
            return 0;
        }
    };

    MoveList.prototype.setIndex = function(nIndex) {
        if (nIndex < 0 || nIndex > this.MAXINDEX)
            throw `MoveList.setIndex Error: nIndex is out`;
        this.m_nIndex = nIndex;
    };

    MoveList.prototype.setRootIndex = function() {
        this.setIndex(0);
    };

    MoveList.prototype.decrement = function() {
        if (this.m_nIndex <= 0)
            throw `MoveList.decrement Error: MoveList.m_nIndex<=0`;
        this.m_nIndex--;
    };

    MoveList.prototype.index = function() {
        return this.m_nIndex;
    };
    
    //-----------------------------------------------
    
    MoveList.prototype.getNames = function(){
        let names = "";
        for(let i=1; i<=this.m_nIndex; i++){
            names += `${this.get(i).getName()}, `;
        }
        return names;
    }


    exports.MoveList = MoveList;
})))

/*
console.log(MoveList.name)
i=new MoveList();
console.log(i.constructor.name)
*/
