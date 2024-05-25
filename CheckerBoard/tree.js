(function(global, factory) {
    (global = global || self, factory(global));
}(this, (function(exports) {
    'use strict';
    
    //window.exWindow
    
    class Board extends CheckerBoard {
        constructor(...args) {
            super(...args);
            this.isTransBranch = true;
            this.tree = undefined;
        }
    }
    
    Board.prototype.addTree = function(tree) {
        this.firstColor = "black";
        this.resetNum = 0;
        this.tree = tree;
        if (tree.init) {
            this.cle();
            this.MS = tree.init.MS;
            this.resetNum = tree.init.resetNum;
            while (this.MSindex < tree.init.MSindex) this.toNext(true, 100);
            //console.log(`addTree this.MS = [${this.MS}]\n[${this.MS.slice(0, this.MSindex + 1)}]`)
        }
    };

    Board.prototype.mergeTree = function(tree) {
        if (this.tree && tree.init) {
            let targetPath = this.MS.slice(0, this.MSindex + 1),
                branchRootPath = tree.init.MS.slice(0, tree.init.MSindex + 1),
                target = this.tree.createPath(targetPath),
                branchRoot = tree.createPath(branchRootPath);

            //console.log(`targetPath: [${targetPath}] len: ${targetPath.length}\n branchRootPath: [${branchRootPath}] len: ${branchRootPath.length}`)
            target.comment = branchRoot.comment + target.comment;

            if ((targetPath.length & 1) == (branchRootPath.length & 1)) {
                tree.init.MS = targetPath.concat(tree.init.MS.slice(tree.init.MSindex + 1));
                tree.init.MSindex = this.MSindex;
                tree.init.resetNum = targetPath.length;
                branchRoot && branchRoot.down && branchRoot.down.idx == 225 && tree.init.resetNum++;

                this.tree.insertBranch(target, branchRoot);
                //console.log(`insertBranch(target, branchRoot)`)
            }
            else {
                let rMS = tree.init.MS.slice(tree.init.MSindex + 1);
                rMS.length && (rMS[0] == 225 ? rMS.splice(0, 1) : rMS.splice(0, 0, 225));
                tree.init.MS = targetPath.concat(rMS);
                tree.init.MSindex = this.MSindex;
                tree.init.resetNum = targetPath.length;

                let passNode = branchRoot.getChild(225);
                if (passNode) {
                    this.tree.insertBranch(target, passNode);
                    branchRoot.removeChild(passNode);
                    //console.log(`insertBranch(target, passNode)`)
                }
                else tree.init.resetNum++

                passNode = this.tree.createPath(targetPath.concat([225]));
                this.tree.insertBranch(passNode, branchRoot);
                //console.log(`insertBranch(passNode, branchRoot)`)
            }
        }
        else {
            this.tree = this.tree || new RenjuTree();
            this.tree.mergeTree(tree);
        }
        this.tree.init = tree.init;
        //console.log(`mergeTree tree.init.MS = ${tree.init.MS}`)
        this.addTree(this.tree);
    }

    
    Board.prototype.removeTree = function() {
        this.firstColor = "black";
        this.tree = undefined;
        this.cleLb("all");
        window.exWindow && window.exWindow.close();
    }
    
    Board.prototype.showBranchs = function(outputComment = _outputComment) {
        //log(this.tree)
        this.cleLb("all");
        let path = this.MS.slice(0, this.MSindex + 1),
            nodes = this.tree.getBranchNodes(path),
            iHtml = this.tree.getInnerHtml(path),
            nextMove = { idx: -1, level: -2, idxColor: undefined },
            level = ["l", "L", "c", "c5", "c4", "c3", "c2", "c1", "w", "W", "a", "a5", "a4", "a3", "a2", "a1"];
        //console.log(`showBranchs path = ${path}`)
        nodes.map(cur => {
            if (cur) {
                //console.log(`cur.branchsInfo: ${cur.branchsInfo}`)
                let i = cur.branchsInfo + 1 & 1,
                    idx = cur.branchs[i].idx,
                    txt = cur.boardText || cur.branchs[i].boardText,
                    color = !this.isTransBranch ? "black" :
                    cur.branchsInfo < 3 ? cur.branchs[i].color :
                    cur.branchs[0] && cur.branchs[0].color == "black" ?
                    "black" : cur.branchs[1].color;

                this.wLb(idx, txt, color);
                this.P[idx].branchs = cur;

                if (nextMove.level < level.indexOf(txt)) {
                    nextMove.level = level.indexOf(txt);
                    nextMove.idx = idx;
                    nextMove.idxColor = i + 1;
                }
            }
        });
        
        outputComment(iHtml)

        if (this.MSindex + 1 === this.MS.length && nextMove.idx > -1 && nextMove.idx < 225) {
            (this.MSindex & 1) + 1 == nextMove.idxColor && this.MS.push(225);
            this.MS.push(nextMove.idx);
        }
    }
    
    function _outputComment(iHtml) {
        let exWindow = window.exWindow;
        exWindow.innerHTML(iHtml);
        iHtml && exWindow.open();
    }
    
    exports.CheckerBoard = Board;
})))
