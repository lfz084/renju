(function(global, factory) {
    (global = global || self, factory(global));
}(this, (function(exports) {
    'use strict';
    //console.log(exports);

    const NullPoint = new JPoint(0, 0);
    const Center = new JPoint(8, 8);

    const MajorProgramVersion = 3;
    const MinorProgramVersion = 6;

    const BugFixProgramVersion = 0;

    const Year = 2006;
    const Month = 7;
    const Day = 16;

    const Version = (Year * 100 + Month) * 100 + Day;

    let strEmpty = "";

    const XY_6_6 = 6 + 5 * 16;
    const XY_7_6 = 7 + 5 * 16;
    const XY_8_6 = 8 + 5 * 16;
    const XY_9_6 = 9 + 5 * 16;
    const XY_10_6 = 10 + 5 * 16;

    const XY_6_7 = 6 + 6 * 16;
    const XY_7_7 = 7 + 6 * 16;
    const XY_8_7 = 8 + 6 * 16;
    const XY_9_7 = 9 + 6 * 16;
    const XY_10_7 = 10 + 6 * 16;

    const XY_6_8 = 6 + 7 * 16;
    const XY_7_8 = 7 + 7 * 16;
    const XY_8_8 = 8 + 7 * 16;
    const XY_9_8 = 9 + 7 * 16;
    const XY_10_8 = 10 + 7 * 16;

    const XY_6_9 = 6 + 8 * 16;
    const XY_7_9 = 7 + 8 * 16;
    const XY_8_9 = 8 + 8 * 16;
    const XY_9_9 = 9 + 8 * 16;
    const XY_10_9 = 10 + 8 * 16;

    const XY_6_10 = 6 + 9 * 16;
    const XY_7_10 = 7 + 9 * 16;
    const XY_8_10 = 8 + 9 * 16;
    const XY_9_10 = 9 + 9 * 16;
    const XY_10_10 = 10 + 9 * 16;

    let intervalPost = new IntervalPost();

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

    function LessThan(Left, Right) {
        return PointToPos(Left) < PointToPos(Right);
    }
    
    //---------------post seting -----------------
    
    let post_number_start = 0;  // addLibrary
    
    //-------------------------------------------

    let centerPos = { x: 8, y: 8 };

    function Point2Idx(point) {
        return point.x - 1 + (point.y - 1) * 15;
    }

    function Idx2Point(idx) {
        let x = idx % 15,
            y = ~~(idx / 15);
        return { x: x + 1, y: y + 1 }
    }

    function getIdx(pMove) {
        return pMove.mPos.x - 1 + (pMove.mPos.y - 1) * 15;
    }

    function rotate90(point) {
        let x = centerPos.x - point.x,
            y = centerPos.y - point.y;
        return { x: centerPos.x + y, y: centerPos.y - x }
    }

    function rotate180(point) {
        let x = centerPos.x - point.x,
            y = centerPos.y - point.y;
        return { x: centerPos.x + x, y: centerPos.y + y }
    }

    function rotate270(point) {
        let x = centerPos.x - point.x,
            y = centerPos.y - point.y;
        return { x: centerPos.x - y, y: centerPos.y + x }
    }

    function reflectX(point) {
        return { x: point.x, y: centerPos.y * 2 - point.y }
    }

    function normalizeCoord(point, nMatch) {
        switch (nMatch) {
            case 0:
            case 4:
                break;
            case 1:
            case 5:
                point = rotate270(point);
                break;
            case 2:
            case 6:
                point = rotate180(point);
                break;
            case 3:
            case 7:
                point = rotate90(point);
                break;
        }
        if (nMatch > 3) point = reflectX(point);
        return point;
    }

    function transposeCoord(point, nMatch) {
        if (nMatch > 3) point = reflectX(point);
        switch (nMatch) {
            case 0:
            case 4:
                break;
            case 1:
            case 5:
                point = rotate90(point);
                break;
            case 2:
            case 6:
                point = rotate180(point);
                break;
            case 3:
            case 7:
                point = rotate270(point);
                break;
        }
        return point;
    }

    class Node {
        constructor(idx, txt = "", color = "black") {
            this.idx = idx;
            this.txt = txt;
            this.color = color;
        }
    }

    class RenLibDoc {
        constructor() {
            this.m_MoveList = new MoveList();
            this.m_file;

            this.nodeCount = 0;
        }
    }
    
    RenLibDoc.prototype.setPostStart = function(start = 0) {
        post_number_start = start;
        post("info", `post_number_start = ${post_number_start}`);
    }

    RenLibDoc.prototype.setCenterPos = function(point) {
        centerPos.x = point.x;
        centerPos.y = point.y;
        //post("warn", `棋谱大小改为: ${centerPos.x*2-1} × ${centerPos.y*2-1} \n中心点已改为: x = ${centerPos.x}, y = ${centerPos.y}`)
    }

    RenLibDoc.prototype.readOldComment = function(libFile, pStrOneLine = [], pStrMultiLine = []) {

        function msb(ch) {
            return (ch & 0x80);
        }

        let buffer = new Uint8Array(2);
        pStrOneLine[0] = "";
        pStrMultiLine[0] = "";

        while (true) {
            libFile.get(buffer);
            if (msb(buffer[0]) || msb(buffer[1])) break;
        }

    }

    RenLibDoc.prototype.readNewComment = function(libFile, pStrOneLine = [0], pStrMultiLine = [0]) {
        let buffer = new Uint8Array(2),
            strNew = [];

        pStrOneLine[0] = "";
        pStrMultiLine[0] = "";

        while (true) {
            libFile.get(buffer);

            if (buffer[0] == 0) {
                break;
            }

            strNew.push(buffer[0]);

            if (buffer[1] == 0) {
                break;
            }

            strNew.push(buffer[1]);
        }

        strNew = TextCoder.decode(new Uint8Array(strNew), "GBK");
        //post("log", `${strNew}`)
        let n = strNew.indexOf(String.fromCharCode(10));
        if (n == -1) {
            pStrOneLine[0] = strNew;
        }
        else {
            pStrOneLine[0] = strNew.slice(0, n);
            pStrMultiLine[0] = strNew.slice(n + 1);
        }
    }

    RenLibDoc.prototype.readBoardText = function(libFile, pStrBoardText = []) {
        let buffer = new Uint8Array(2);

        let strNew = [];

        while (true) {

            libFile.get(buffer);

            if (buffer[0] == 0) {
                break;
            }

            strNew.push(buffer[0]);

            if (buffer[1] == 0) {
                break;
            }

            strNew.push(buffer[1]);
        }
        /*
        const buf = strNew.toString();
        const boardText = TextCoder.decode(new Uint8Array(strNew), "GBK");
        post("pushBoardText", {boardText, buf});
        */
        strNew.length > 4 ? strNew.length = 4 : strNew;
        pStrBoardText[0] = TextCoder.decode(new Uint8Array(strNew), "GBK");
        //post("log", `${strNew[0].toString(16)}${strNew[1].toString(16)} => ${pStrBoardText[0].charCodeAt(0).toString(16)}`)
        //post("log", pStrBoardText[0])

        /*
        let bufStr = new Uint8Array(pStrBoardText[0])
        let code = new Uint16Array([bufStr[0] << 8 | bufStr[1]])
        console.log(code)
        console.log(code[0].toString(16))
        console.log(bufStr)
        let u16 = ab2str_16(bufStr)
        console.log(new Uint16Array(str2ab(u16))[0].toString(16))
        console.log(u16)
        */
    }

    RenLibDoc.prototype.findMoveNode = function(pMoveToFind) {
        let m_Stack = new Stack();

        let isFound = false;

        let pMove = [this.m_MoveList.getRoot()];
        this.m_MoveList.clearAll();

        let done = false;

        while (!done) {
            if (pMove[0]) {
                this.m_MoveList.add(pMove[0]);

                if (pMove[0] == pMoveToFind) {
                    isFound = true;
                    break;
                }

                if (pMove[0].getRight()) {
                    m_Stack.push(this.m_MoveList.index(), pMove[0].getRight());
                }

                pMove[0] = pMove[0].getDown();
            }
            else if (!m_Stack.isEmpty()) {
                let nMove = [0];
                m_Stack.pop(nMove, pMove[0]);
                this.m_MoveList.setIndex(nMove[0] - 1);
            }
            else {
                this.m_MoveList.setRootIndex();
                pMove[0] = this.m_MoveList.current();
                done = true;
            }
        }

        //m_Board.SetLastMove(pMove[0].getPos());
        //SetPreviousVariant();

        // Clear end of move list
        this.m_MoveList.clearEnd();

        return isFound;
    }

    RenLibDoc.prototype.getVariant = function(pMove = new MoveNode(), Pos, number = -1) {

        /*let current = this.m_MoveList.index();
        for (let i = 0; i <= current; i++) { // 兼容 Rapfi 制谱
            let pM = this.m_MoveList.get(i);
            if (pM.getPos().x == Pos.x && pM.getPos().y == Pos.y) {
                let sPath = "";
                for(let j=0; j<=current; j++){ sPath += `${this.m_MoveList.get(j).getName()}, `}
                post("info", `Rapfi number=${number}, <${pM.pos2Name(Pos)}>, ${current} << ${i}\n${sPath}`);
                return pM;
            }
        }*/
        if (pMove.getDown()) { //RenLib 3.6 标准
            pMove = pMove.getDown();

            if (pMove.getPos().x == Pos.x && pMove.getPos().y == Pos.y) return pMove;

            while (pMove.getRight()) {
                pMove = pMove.getRight();
                if (pMove.getPos().x == Pos.x && pMove.getPos().y == Pos.y) return pMove;
            }
        }

        return 0;
    }

    RenLibDoc.prototype.addMove = function(pMove = new MoveNode(), pNewMove = new MoveNode()) {
        //console.log("addMove")
        if (pMove.getDown() == 0) {
            //console.log("addMove 1")
            pMove.setDown(pNewMove);
            //pNewMove.setRight(0);
        }
        else {
            //console.log("addMove 2")
            if (LessThan(pNewMove.getPos(), pMove.getDown().getPos())) {
                //console.log("addMove 2.1")
                pNewMove.setRight(pMove.getDown());
                pMove.setDown(pNewMove);
            }
            else {
                //console.log("addMove 2.2")
                pMove = pMove.getDown();

                while (true) {
                    //console.log("addMove 2.3")
                    if (pMove.getRight() == 0) {
                        pMove.setRight(pNewMove);
                        //pNewMove.setRight(0);
                        break;
                    }
                    else if (LessThan(pNewMove.getPos(), pMove.getRight().getPos())) {
                        pNewMove.setRight(pMove.getRight());
                        pMove.setRight(pNewMove);
                        break;
                    }
                    pMove = pMove.getRight();
                }
            }
        }
    }

    RenLibDoc.prototype.addComment = function(pMove, pStrOneLine = "", pStrMultiLine = "") {
        let isComment = false;

        if (pStrOneLine) {
            isComment = true;

            if (!pMove.getOneLineComment()) {
                pMove.setOneLineComment(pStrOneLine);
            }
            /*
            else if (pMove.getOneLineComment() != pStrOneLine[0]){
                m_SearchList.Add(SearchItem(pMove, pStrOneLine, SearchItem::ONE_LINE_COMMENT));
            }*/
        }

        if (pStrMultiLine) {
            isComment = true;

            if (!pMove.getMultiLineComment()) {
                pMove.setMultiLineComment(pStrMultiLine);
            }
            /*
            else if (pMove.getMultiLineComment() != pStrMultiLine[0] &&
                !Sgf::equalComment(pMove - > getMultiLineComment(), pStrMultiLine))
            {
                m_SearchList.Add(SearchItem(pMove, pStrMultiLine, SearchItem::MULTI_LINE_COMMENT));
            }*/
        }

        return isComment;
    }

    RenLibDoc.prototype.addBoardText = function(pMove, boardText = "") {
        let isBoardText = false;

        if (boardText) {
            isBoardText = true;

            if (!pMove.getBoardText()) {
                pMove.setBoardText(boardText);
            }
            /*
            else if (pMove.getBoardText() != boardText){
                m_SearchList.Add(SearchItem(pMove, boardText, SearchItem::BOARD_TEXT));
            }*/
        }

        return isBoardText;
    }

    RenLibDoc.prototype.addAttributes = function(pMove, pFrom, bMark = [], bMove = [], bStart = []) {

        bMark[0] = false;
        bMove[0] = false;
        bStart[0] = false;

        if (pFrom.isMark() && !pMove.isMark()) {
            bMark[0] = true;
            pMove.setIsMark(bMark[0]);
        }

        if (pFrom.isMove() && !pMove.isMove()) {
            bMove[0] = true;
            pMove.setIsMove(bMove[0]);
        }

        if (pFrom.isStart() && !pMove.isStart()) {
            bStart[0] = true;
            pMove.setIsStart(bStart[0]);
        }
    }


    RenLibDoc.prototype.addLibrary = function(buf) {
        
        let libFile = new LibraryFile();
        l
        if (!libFile.open(buf)) {
            return Promise.reject("libFile Open Error");
        }

        post("log", "addLibrary")
        if (!libFile.checkVersion()) {
            return Promise.reject(`不是五子棋棋谱`);
        }

        let m_Stack = new Stack();

        let number = 0;

        let pCurrentMove = 0;

        if (this.m_MoveList.isEmpty()) {
            //console.log("m_MoveList.isEmpty")
            pCurrentMove = new MoveNode(NullPoint);
            this.m_MoveList.setRoot(pCurrentMove);
        }
        else {
            //console.log("m_MoveList.isEmpty = false")
            pCurrentMove = this.m_MoveList.getRoot();
            this.m_MoveList.setRootIndex();
        }

        let pFirstMove = 0;
        let pNextMove;

        let nComments = 0;
        let nBoardTexts = 0;
        let nMarks = 0;
        let nNewMoves = 0;

        let bMark = [false];
        let bMove = [false];
        let bStart = [false];

        let checkRoot = true;

        let next = new MoveNode();
        
        let list = [];
        function isEq(m_list){
            if(m_list.index()==list.length){
                for(let i=0; i<list.length; i++){
                    //post("info", `${list[i].getName()} == ${m_list.get(i+1).getName()}`)
                    if(list[i]!=m_list.get(i+1)) return false;
                }
                return true;
            }
            else{
                return false;
            }
        }

        while (libFile.get(next)) {

            const Point = new JPoint(next.getPos());
            //post("log", next.getPos())
            
            intervalPost.post("loading", { current: libFile.m_file.m_current, end: libFile.m_file.m_end, count: number })
            if (Point.x == NullPoint.x && Point.y == NullPoint.y) {
                // Skip root node
                //post("log", `Skip root node, number=${number}, m_Stack.isEmpty=${m_Stack.isEmpty()}\n ${next.Info2Code()}`)
                if (checkRoot)
                    checkRoot = false;
            }
            else if ((Point.x != 0 || Point.y != 0) && (Point.x < 1 || Point.x > 15 || Point.y < 1 || Point.y > 15)) {
                next.setPos(new JPoint(1, 1));
                next.setIsMark(true);
                //SetModifiedFlag();
                post("error", "Point err")
                return Promise.reject("addLibrary: Point error");
            }
            else {
                number++;
                //console.log(`number=${number}`)
                
                pNextMove = this.getVariant(pCurrentMove, next.getPos(), number);

                if (pNextMove) {
                    //console.log(`pNextMove=${pNextMove}`)
                    pCurrentMove = pNextMove;
                }
                else {
                    //console.log(`pNextMove=0}`)
                    pNextMove = new MoveNode(next);

                    this.addMove(pCurrentMove, pNextMove);
                    pCurrentMove = pNextMove;

                    if (pCurrentMove.isMove()) {
                        nNewMoves++;

                        if (pFirstMove == 0) {
                            pFirstMove = pCurrentMove;
                        }
                    }
                }
                //console.log("list_add")
                this.m_MoveList.add(pCurrentMove);

            }
            
            /*if ((1 || number < 752201) && this.m_MoveList.index() == 1 && (!isEq(this.m_MoveList))) {
                let s = `${number}, `;
                list.length = 0;
                for (let i = 1; i <= this.m_MoveList.index(); i++) {
                    s += this.m_MoveList.get(i).getName() + ",";
                    list.push(this.m_MoveList.get(i));
                }
                post("log", s);
            }*/
            //number == post_number_start && post("info", `MoveList: ${this.m_MoveList.getNames()}`);
            //number>= post_number_start && number<post_number_start+ 500 && post("log", `${number}, len=${this.m_MoveList.index()}, ${next.getName()}, isDown=${next.isDown()}, isRight=${next.isRight()},\n ${next.Info2Code()}`);

            if (next.isOldComment() || next.isNewComment()) {

                let pStrOneLine = [""];
                let pStrMultiLine = [""];

                if (next.isOldComment()) {
                    post("warn",  `${number}, len=${this.m_MoveList.index()}, ${next.getName()}, isDown=${next.isDown()}, isRight=${next.isRight()},\n ${next.Info2Code()}`);
                    this.readOldComment(libFile, pStrOneLine, pStrMultiLine);
                }
                else if (next.isNewComment()) {
                    //console.log("readNewComment")
                    this.readNewComment(libFile, pStrOneLine, pStrMultiLine);
                }

                if (this.addComment(pCurrentMove, pStrOneLine, pStrMultiLine)) {
                    nComments++;
                }
            }

            let strBoardText = [""];

            if (next.isBoardText()) {
                //console.log("readBoardText")
                this.readBoardText(libFile, strBoardText);
                //console.log("addBoardText")
                if (this.addBoardText(pCurrentMove, strBoardText[0])) {
                    nBoardTexts++;
                }
            }

            // Add attributes
            this.addAttributes(pCurrentMove, next, bMark, bMove, bStart);

            if (bMark[0] || next.isMark()) {
                nMarks++;
                post("info", `${number}, len=${this.m_MoveList.index()}, ${next.getName()}, isDown=${next.isDown()}, isRight=${next.isRight()},\n ${next.Info2Code()}`);
            }
            
            //number<150 && next.isDown() && next.isRight() && post("error", number );

            if (next.isDown()) {
                //console.log(`m_Stack.push ${this.m_MoveList.index()}`)
                // Rapfi 制谱的棋谱 Root 节点 会添加 isDown属性，导致终结者打不开棋谱 index() > 0 避开这个bug
                this.m_MoveList.index() > 0 && m_Stack.push(this.m_MoveList.index());
            }

            if (next.isRight()) {
                if (!m_Stack.isEmpty()) {
                    let nMove = [0];
                    m_Stack.pop(nMove);
                    this.m_MoveList.setIndex(nMove[0] - 1);
                    pCurrentMove = this.m_MoveList.current();
                    //nMove[0]<=1 && post("log",`m_Stack.pop nMove=${nMove[0]-1}, pMove=${pCurrentMove.getName()}`);
                }
                else{
                    this.m_MoveList.setRootIndex();
                    pCurrentMove = this.m_MoveList.getRoot();
                }
            }
            
            //if(number>=7432830) break;

        }

        post("loading", { current: libFile.current(), end: libFile.end(), count: number });
        post("info", `loop << number = ${number}, nNewMoves = ${nNewMoves}`);
        libFile.close();
        if (number > 0) {
            this.m_MoveList.setRootIndex();
            this.m_MoveList.clearEnd();
            this.nodeCount = number;
        }

        let strInfo;

        if (pFirstMove) {
            //console.log("findMoveNode")
            this.findMoveNode(pFirstMove);
        }

        return Promise.resolve(true);
    }


    //-----------------------------------------------------------
    RenLibDoc.prototype.getBranchNodes = function(path) {
        function normalizeNodes(nodes, nMatch) {
            let idx,
                txt,
                rt = [];
            for (let i = 0; i < nodes.length; i++) {
                idx = Point2Idx(normalizeCoord(Idx2Point(nodes[i].idx), nMatch))
                txt = nodes[i].txt; //nMatch>0 && nodes[i].txt == "○" ? "●" : nodes[i].txt; 
                rt[i] = new Node(idx, txt, nMatch > 0 ? "green" : "black");
            }
            return rt;
        }

        function transposePath(path, nMatch) {
            let rt = [];
            for (let i = 0; i < path.length; i++) {
                rt[i] = Point2Idx(transposeCoord(Idx2Point(path[i]), nMatch))
            }
            return rt;
        }

        function findNode(pMove, idx) {
            while (pMove) {
                if (pMove.getPos().x - 1 + (pMove.getPos().y - 1) * 15 === idx) {
                    return pMove;
                }
                else if (pMove.getRight()) {
                    pMove = pMove.getRight();
                }
                else {
                    return null;
                }
            }
        }

        function getInnerHTML(pMove) {
            let iHTML = pMove.isOneLineComment() ? "<br>" + pMove.getOneLineComment() : "";
            iHTML += pMove.isMultiLineComment() ? "<br>" + String(pMove.getMultiLineComment()).split(String.fromCharCode(10)).join("<br>") : "";
            return iHTML;
        }

        function searchInnerHTMLInfo(path = []) {
            let pMove = this.m_MoveList.getRoot(),
                innerHTMLInfo = { innerHTML: getInnerHTML(this.m_MoveList.getRoot()), depth: -1 };
            for (let i = 0; i < path.length; i++) {
                if (pMove.getDown()) {
                    pMove = pMove.getDown();
                    pMove = findNode(pMove, path[i]);
                    if (pMove) {
                        let innerHTML = getInnerHTML(pMove);
                        if (innerHTML && i === path.length - 1) innerHTMLInfo = { innerHTML: innerHTML, depth: i };
                    }
                    else {
                        break;
                    }
                }
                else {
                    break;
                }
            }
            return innerHTMLInfo;
        }

        function getTXT(pMove) {
            return pMove.getBoardText() || "○";
        }

        function pushNodes(nodes1, nodes2) {
            function hasNode(nodes, node) {
                for (let i = 0; i < nodes.length; i++) {
                    if (nodes[i].idx === node.idx) return true
                }
                return false;
            }
            for (let i = nodes2.length - 1; i >= 0; i--) {
                if (hasNode(nodes1, nodes2[i])) nodes2.splice(i, 1);
            }
            return nodes1.concat(nodes2);
        }

            function _getBranchNodes(path) {
            let done = false,
                pMove = this.m_MoveList.getRoot().getDown(),
                nodes = [],
                jointNodes = [],
                jointNode = null,
                moveList = [],
                moveStack = [];
                
            while (!done) {
                if (pMove) {
                    let idx = path.indexOf(getIdx(pMove));
                    moveList.push(getIdx(pMove));
                    post("log", `moveList: [${moveList}]`);
                    if (pMove.getRight() &&
                        moveList.length <= path.length + 1
                    ) {
                        moveStack.push({ pMove: pMove.getRight(), length: moveList.length - 1 });
                    }

                    if ((moveList.length & 1) === (path.length + 1 & 1)) {
                        if (idx === -1 ||
                            (moveList.length & 1) !== (idx + 1 & 1)
                        ) {
                            if (!jointNode) {
                                jointNode = { pMove: pMove, length: moveList.length - 1 }
                            }
                            else {
                                pMove = null;
                                continue;
                            }
                        }
                    }
                    else {
                        if (idx === -1 ||
                            (moveList.length & 1) !== (idx + 1 & 1)
                        ) {
                            pMove = false;
                            continue;
                        }
                    }

                    if ((idx === -1 ||
                            (moveList.length & 1) === (idx + 1 & 1)) &&
                        moveList.length <= path.length + 1
                    ) {
                        if (moveList.length === path.length + 1) {
                            if (idx === -1) {
                                nodes.push(new Node(getIdx(pMove), getTXT(pMove)));
                            }
                            else {
                                jointNodes.push(new Node(getIdx(jointNode.pMove), getTXT(pMove), "Purple"));
                            }
                        }
                        pMove = pMove.getDown();
                    }
                    else {
                        pMove = 0;
                    }
                }
                else if (moveStack.length) {
                    let node = moveStack.pop();
                    pMove = node.pMove;
                    moveList.length = node.length;
                    if (jointNode && moveList.length <= jointNode.length) jointNode = null;
                }
                else {
                    done = true;
                }
            }

            return jointNodes.concat(nodes);
        }

        let done = false,
            //pMove = this.m_MoveList.getRoot().getDown(),
            innerHTMLInfo = { innerHTML: "", depth: -2 },
            nodes = [],
            PH,
            NS,
            normalizeNS;
        post("log", `棋谱中心点为, x = ${centerPos.x}, y = ${centerPos.y}`)
        for (let i = 0; i < 8; i++) {
            //if (i==1) break;
            PH = transposePath(path, i);
            post("log",`i=${i}, path=[${PH}]`)
            NS = _getBranchNodes.call(this, PH);
            post("log",NS);
            normalizeNS = normalizeNodes(NS, i);
            //post("log",normalizeNS)p>
            nodes = pushNodes(nodes, normalizeNS);
            let info = searchInnerHTMLInfo.call(this, PH);
            if (info.depth > innerHTMLInfo.depth) innerHTMLInfo = info;
        }

        return { nodes: nodes, innerHTML: innerHTMLInfo.innerHTML };
    }


    RenLibDoc.prototype.getAutoMove = function() {
        function getIdx(pMove) {
            return pMove.mPos.x - 1 + (pMove.mPos.y - 1) * 15;
        }
        let pMove = this.m_MoveList.getRoot(),
            path = [];
        while (pMove.getDown()) {
            pMove = pMove.getDown();
            if (!pMove.getRight()) {
                path.push(getIdx(pMove));
            }
            else {
                break;
            }
        }
        return path;
    }


    exports.RenLibDoc = RenLibDoc;
})))
