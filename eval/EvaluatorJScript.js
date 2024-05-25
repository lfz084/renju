//if (self.SCRIPT_VERSIONS) self.SCRIPT_VERSIONS["EvaluatorJScript"] = "2024.23206";

function loadEvaluatorJScript() {
    (function(global, factory) {
        (global = global || self, factory(global));
    }(this, (function(exports) {
        'use strict';
        //console.log(exports);

        //--------------------- idxLists ---------------------

        // 创建空白lists 用来保存阳线，阴线的idx
        function createEmptyLists() {
            let outIdx = 225,
                idxLists = new Array(4 * 29 * 43);

            for (let i = idxLists.length - 1; i >= 0; i--) {
                idxLists[i] = outIdx;
            }
            return idxLists;
        }

        //保存棋盘区域内每一条线的idx，每条线按照 line[n] < line[n+1] 排序
        function createIdxLists() {
            let List,
                idxLists = createEmptyLists();
            //direction = 0
            for (let y = 0; y < 15; y++) {
                List = y * 43;
                for (let x = 0; x < 15; x++) {
                    if (x < cBoardSize && y < cBoardSize) idxLists[List + 14 + x] = x + y * 15;
                }
            }
            //direction = 1
            for (let x = 0; x < 15; x++) {
                List = (29 + x) * 43;
                for (let y = 0; y < 15; y++) {
                    if (x < cBoardSize && y < cBoardSize) idxLists[List + 14 + y] = x + y * 15;
                }
            }
            //direction = 2
            for (let i = 0; i < 15; i++) { // x + (14-y) = i, y = x + 14 - i
                List = (2 * 29 + i) * 43;
                for (let j = 0; j <= i; j++) {
                    let x = 0 + j,
                        y = x + 14 - i;
                    if (x < cBoardSize && y < cBoardSize) idxLists[List + 14 + j] = x + y * 15;
                }
            }
            for (let i = 13; i >= 0; i--) { // (14-x) + y = i, y = i - 14 + x;
                List = (2 * 29 + 14 + 14 - i) * 43;
                for (let j = 0; j <= i; j++) {
                    let x = 14 - i + j,
                        y = i - 14 + x;
                    if (x < cBoardSize && y < cBoardSize) idxLists[List + 14 + j] = x + y * 15;
                }
            }
            //direction = 3
            for (let i = 0; i < 15; i++) { // x + y = i, y = i - x
                List = (3 * 29 + i) * 43;
                for (let j = 0; j <= i; j++) {
                    let x = i - j,
                        y = i - x;
                    if (x < cBoardSize && y < cBoardSize) idxLists[List + 14 + j] = x + y * 15;
                }
            }
            for (let i = 13; i >= 0; i--) { // (14-x)+(14-y) = i, y = 28 - i - x
                List = (3 * 29 + 14 + 14 - i) * 43;
                for (let j = 0; j <= i; j++) {
                    let x = 14 - j,
                        y = 28 - i - x;
                    if (x < cBoardSize && y < cBoardSize) idxLists[List + 14 + j] = x + y * 15;
                }
            }
            return idxLists;
        }

        let idxLists = createIdxLists(15);

        //------------------------- idxTable ----------------------

        // 创建索引表，快速读取阳线，阴线idx. 超出棋盘范围返回 outIdx = 225
        function createIdxTable() {
            let outIdx = 225,
                tb = new Array(226 * 29 * 4);
            for (let idx = 0; idx < 225; idx++) {
                for (let move = -14; move < 15; move++) {
                    for (let direction = 0; direction < 4; direction++) {
                        let x = getX(idx),
                            y = getY(idx);
                        if (x >= 0 && x < cBoardSize && y >= 0 && y < cBoardSize) {
                            switch (direction) {
                                case 0:
                                    tb[(idx * 29 + move + 14) * 4 + direction] = idxLists[(direction * 29 + y) * 43 + 14 + x + move];
                                    break;
                                case 1:
                                    tb[(idx * 29 + move + 14) * 4 + direction] = idxLists[(direction * 29 + x) * 43 + 14 + y + move];
                                    break;
                                case 2:
                                    tb[(idx * 29 + move + 14) * 4 + direction] = idxLists[(direction * 29 + x + 14 - y) * 43 + (x + 14 - y < 15 ? 14 + x + move : 14 + y + move)];
                                    break;
                                case 3:
                                    tb[(idx * 29 + move + 14) * 4 + direction] = idxLists[(direction * 29 + x + y) * 43 + (x + y < 15 ? 14 + y + move : 28 - x + move)];
                                    break;
                            }
                        }
                        else {
                            tb[(idx * 29 + move + 14) * 4 + direction] = outIdx;
                        }
                    }
                }
            }


            for (let i = 29 * 4 - 1; i >= 0; i--) {
                tb[225 * 29 * 4 + i] = outIdx;
            }

            return tb;
        }

        // 按照阳线，阴线读取idx, 如果参数idx在棋盘外，直接返回 outIdx = 225
        function moveIdx(idx, move, direction = 0) {
            return idxTable[(idx * 29 + move + 14) * 4 + direction]; // 7s
        }

        // 取得一个点的值
        function getArrValue(idx, move, direction, arr) {
            return arr[moveIdx(idx, move, direction)];
        }

        let idxTable = createIdxTable();

        //--------------------  aroundIdxTable  ------------------------

        function createAroundIdxTable() {
            let idxTable = new Array((15 + 225) * 225),
                outIdx = 225;
            for (let idx = 0; idx < 225; idx++) {
                for (let i = 0; i < 15; i++) {
                    idxTable[idx * 240 + i] = 0;
                }
                for (let i = 0; i < 225; i++) {
                    idxTable[idx * 240 + 15 + i] = outIdx;
                }
                let pIdx = 0,
                    x = idx % 15,
                    y = ~~(idx / 15);
                if (x < 0 || x >= cBoardSize || y < 0 || y >= cBoardSize) continue;
                idxTable[idx * 240 + 15 + pIdx++] = idx;
                idxTable[idx * 240] = pIdx;
                for (let radius = 1; radius < 15; radius++) {
                    let top = moveIdx(idx, -radius, 1),
                        right = moveIdx(idx, radius, 0),
                        buttom = moveIdx(idx, radius, 1),
                        left = moveIdx(idx, -radius, 0),
                        nIdx;
                    if (top != outIdx) {
                        for (let m = -radius + 1; m <= radius; m++) {
                            nIdx = moveIdx(top, m, 0);
                            if (nIdx != outIdx) idxTable[idx * 240 + 15 + pIdx++] = nIdx;
                        }
                    }
                    if (right != outIdx) {
                        for (let m = -radius + 1; m <= radius; m++) {
                            nIdx = moveIdx(right, m, 1);
                            if (nIdx != outIdx) idxTable[idx * 240 + 15 + pIdx++] = nIdx;
                        }
                    }
                    if (buttom != outIdx) {
                        for (let m = radius - 1; m >= -radius; m--) {
                            nIdx = moveIdx(buttom, m, 0);
                            if (nIdx != outIdx) idxTable[idx * 240 + 15 + pIdx++] = nIdx;
                        }
                    }
                    if (left != outIdx) {
                        for (let m = radius - 1; m >= -radius; m--) {
                            nIdx = moveIdx(left, m, 1);
                            if (nIdx != outIdx) idxTable[idx * 240 + 15 + pIdx++] = nIdx;
                        }
                    }
                    idxTable[idx * 240 + radius] = pIdx;
                }
                //console.info(`idx=${idx}, pIdx=${pIdx}`)
            }

            return idxTable;
        }

        //返回centerIdx为中心，顺时针绕圈的第index个点，index=0时就直接返回centerIdx
        function aroundIdx(centerIdx, index) {
            return aroundIdxTable[centerIdx * 240 + 15 + index];
        }

        //返回centerIdx为中心，radius半径内的点的计数，radius=0时，返回1
        function getAroundIdxCount(centerIdx, radius) {
            return aroundIdxTable[centerIdx * 240 + radius];
        }

        //，保存周围点的坐标
        let aroundIdxTable = createAroundIdxTable();

        //----------------------------------------------------

        function testLine(idx, direction, color, arr) {
            let rt,
                ov = arr[idx];
            arr[idx] = color;
            rt = _testLine(idx, direction, color, arr);
            arr[idx] = ov;
            return rt;
        }

        // (long*)lineInfo,  (lineInfo >>> 3) & 0b111
        function _testLine(idx, direction, color, arr) {
            let max = 0, // 0 | 1 | 2 | 3 | 4 | 5 | (SIX >> 1)
                addFree = 0, // 0 | 1
                addCount = 0,
                free = 0, // >= 0
                count = 0,
                markMove = 0,
                emptyCount = 0,
                colorCount = 0,
                vs = new Array(11); // getArrValue(18 - 28次)，使用缓存快一些
            //ov = arr[idx];
            //arr[idx] = color;

            vs[0] = getArrValue(idx, -5, direction, arr);
            vs[1] = getArrValue(idx, -4, direction, arr);
            for (let move = -4; move < 5; move++) {
                vs[move + 6] = getArrValue(idx, move + 1, direction, arr);
                let v = vs[move + 5];
                if (v == 0) {
                    emptyCount++;
                }
                else if (v == color) {
                    colorCount++;
                }
                else { // v!=color || v==-1
                    emptyCount = 0;
                    colorCount = 0;
                }
                if (emptyCount + colorCount == 5) {

                    if (gameRules == RENJU_RULES && color == 1 &&
                        (color == vs[move] || color == vs[move + 6]))
                    {
                        if (colorCount == 5 && colorCount > max) {
                            max = (SIX >> 1);
                            free = 0;
                            count = 0;
                            markMove = move;
                        }
                    }
                    else {
                        if (colorCount > max) {
                            max = colorCount;
                            addFree = 0;
                            addCount = 1;
                            free = 0;
                            count = 0;
                            markMove = move;
                        }

                        if (colorCount == max) {
                            if (addCount) count++;
                            addCount = 0;

                            if (addFree) {
                                free++;
                                markMove = move;
                            }
                            addFree = 1;
                        }

                    }

                    v = vs[move + 1];
                    if (v == 0) {
                        emptyCount--;
                        addCount = 1;
                    }
                    else {
                        colorCount--;
                        addFree = 0;
                    }
                }
            }

            //arr[idx] = ov;
            max &= 0b111;
            let lineFoul = max == 6 || max == 4 && count > 1 && !free ? 1 : 0;

            return direction << 12 |
                free << 8 |
                markMove << 5 |
                lineFoul << 4 | // set lineFoul
                max << 1 | // set maxNum
                (free ? 1 : 0); // set free
        }

        function testLineFoul(idx, direction, color, arr) {
            let rt,
                ov = arr[idx];
            arr[idx] = color;
            rt = _testLineFoul(idx, direction, color, arr);
            arr[idx] = ov;
            return rt;
        }


        function _testLineFoul(idx, direction, color, arr) {
            let max = 0, // 0 | 3 | 4 | 5 | (SIX >> 1)
                addFree = 0, // 0 | 1
                addCount = 0,
                free = 0, // >= 0
                count = 0,
                markMove = 0,
                emptyCount = 0,
                colorCount = 0,
                vs = new Array(11); // getArrValue(18 - 28次)，使用缓存快一些
            //ov = arr[idx];
            //arr[idx] = 1;

            vs[0] = getArrValue(idx, -5, direction, arr);
            vs[1] = getArrValue(idx, -4, direction, arr);
            for (let move = -4; move < 5; move++) {
                vs[move + 6] = getArrValue(idx, move + 1, direction, arr);
                let v = vs[move + 5];
                if (v == 0) {
                    emptyCount++;
                }
                else if (v == 1) {
                    colorCount++;
                }
                else { // v!=color || v==-1
                    emptyCount = 0;
                    colorCount = 0;
                }
                if (emptyCount + colorCount == 5) {
                    if (colorCount == 5) {
                        if (1 == vs[move] ||
                            1 == vs[move + 6])
                        {
                            max = (SIX >> 1);
                        }
                        else {
                            max = 5;
                        }
                        free = 0;
                        count = 0;
                        markMove = move;
                        break;
                    }
                    else if (colorCount == 4) {
                        if (1 == vs[move] ||
                            1 == vs[move + 6])
                        { //六腐形
                        }
                        else {
                            if (max < 4) {
                                max = 4;
                                addFree = 0;
                                addCount = 1;
                                free = 0;
                                count = 0;
                                markMove = move;
                            }

                            if (addCount) count++;
                            addCount = 0;

                            if (addFree) {
                                free++;
                                markMove = move;
                            }
                            addFree = 1;
                        }
                    }
                    else if (colorCount == 3 && max <= 3) {
                        if (1 == vs[move] ||
                            1 == vs[move + 6])
                        { //六腐形
                        }
                        else {
                            if (max < 3) {
                                max = 3;
                                addFree = 0;
                                addCount = 1;
                                free = 0;
                                count = 0;
                                markMove = move;
                            }

                            if (addCount) count++;
                            addCount = 0;

                            if (addFree) {
                                free++;
                                markMove = move;
                            }
                            addFree = 1;
                        }
                    }

                    v = vs[move + 1];
                    if (v == 0) {
                        emptyCount--;
                        addCount = 1;
                    }
                    else {
                        colorCount--;
                        addFree = 0;
                    }
                }
            }

            //arr[idx] = ov;

            return direction << 12 |
                free << 8 |
                markMove << 5 |
                (free ? max == 4 ? FOUR_FREE : THREE_FREE :
                    max == 4 && count > 1 ? LINE_DOUBLE_FOUR :
                    max << 1);
        }

        function testLineFour(idx, direction, color, arr) {
            let rt,
                ov = arr[idx];
            arr[idx] = color;
            rt = _testLineFour(idx, direction, color, arr);
            arr[idx] = ov;
            return rt;
        }


        // 不会验证x,y是否有棋子
        // idx,点在 direction指定这条线上是不是一个冲4点,活4
        function _testLineFour(idx, direction, color, arr) {

            let max = 0, // 0 | 4 | 5 | (SIX >> 1)
                addFree = 0, // 0 | 1
                addCount = 0,
                free = 0, // >= 0
                count = 0,
                markMove = 0,
                emptyCount = 0,
                colorCount = 0;
            //ov = arr[idx];
            //arr[idx] = color;

            for (let move = -4; move < 5; move++) {
                // getArrValur(18 - 22次)直接 getArrValur 快一些
                let v = getArrValue(idx, move, direction, arr);
                if (v == 0) {
                    emptyCount++;
                }
                else if (v == color) {
                    colorCount++;
                }
                else { // v!=color || v==-1
                    emptyCount = 0;
                    colorCount = 0;
                }
                if (emptyCount + colorCount == 5) {
                    if (colorCount == 5) {
                        if (gameRules == RENJU_RULES && color == 1 &&
                            (color == getArrValue(idx, move - 5, direction, arr) ||
                                color == getArrValue(idx, move + 1, direction, arr)))
                        {
                            max = (SIX >> 1);
                        }
                        else {
                            max = 5;
                        }
                        free = 0;
                        count = 0;
                        markMove = move;
                        break;
                    }
                    else if (colorCount == 4) {
                        if (gameRules == RENJU_RULES && color == 1 &&
                            (color == getArrValue(idx, move - 5, direction, arr) ||
                                color == getArrValue(idx, move + 1, direction, arr)))
                        { //六腐形
                        }
                        else {
                            if (max < 4) {
                                max = 4;
                                addFree = 0;
                                addCount = 1;
                                free = 0;
                                count = 0;
                                markMove = move;
                            }

                            if (addCount) count++;
                            addCount = 0;

                            if (addFree) {
                                free++;
                                markMove = move;
                            }
                            addFree = 1;
                        }
                    }

                    v = getArrValue(idx, move - 4, direction, arr);
                    if (v == 0) {
                        emptyCount--;
                        addCount = 1;
                    }
                    else {
                        colorCount--;
                        addFree = 0;
                    }
                }
            }
            //arr[idx] = ov;

            return direction << 12 |
                free << 8 |
                markMove << 5 |
                (free ? FOUR_FREE :
                    count > 1 ? LINE_DOUBLE_FOUR :
                    max << 1);
        }

        function testLineThree(idx, direction, color, arr) {
            let rt,
                ov = arr[idx];
            arr[idx] = color;
            rt = _testLineThree(idx, direction, color, arr);
            arr[idx] = ov;
            return rt;
        }


        function _testLineThree(idx, direction, color, arr) {
            let max = 0, // 0 | 3 | 4 | 5 | (SIX >> 1)
                addFree = 0, // 0 | 1
                addCount = 0,
                free = 0, // >= 0
                count = 0,
                markMove = 0,
                emptyCount = 0,
                colorCount = 0,
                vs = new Array(11); // getArrValue(18 - 28次)，使用缓存快一些
            //ov = arr[idx];
            //arr[idx] = color;

            vs[0] = getArrValue(idx, -5, direction, arr);
            vs[1] = getArrValue(idx, -4, direction, arr);
            for (let move = -4; move < 5; move++) {
                vs[move + 6] = getArrValue(idx, move + 1, direction, arr);
                let v = vs[move + 5];
                if (v == 0) {
                    emptyCount++;
                }
                else if (v == color) {
                    colorCount++;
                }
                else { // v!=color || v==-1
                    emptyCount = 0;
                    colorCount = 0;
                }
                if (emptyCount + colorCount == 5) {
                    if (colorCount == 5) {
                        if (gameRules == RENJU_RULES && color == 1 &&
                            (color == vs[move] ||
                                color == vs[move + 6]))
                        {
                            max = (SIX >> 1);
                        }
                        else {
                            max = 5;
                        }
                        free = 0;
                        count = 0;
                        markMove = move;
                        break;
                    }
                    else if (colorCount == 4) {
                        if (gameRules == RENJU_RULES && color == 1 &&
                            (color == vs[move] ||
                                color == vs[move + 6])) {}
                        else {
                            if (max < 4) {
                                max = 4;
                                addFree = 0;
                                addCount = 1;
                                free = 0;
                                count = 0;
                                markMove = move;
                            }

                            if (addCount) count++;
                            addCount = 0;

                            if (addFree) {
                                free++;
                                markMove = move;
                            }
                            addFree = 1;
                        }
                    }
                    else if (colorCount == 3 && max <= 3) {
                        if (gameRules == RENJU_RULES && color == 1 &&
                            (color == vs[move] ||
                                color == vs[move + 6]))
                        { //六腐形
                        }
                        else {
                            if (max < 3) {
                                max = 3;
                                addFree = 0;
                                addCount = 1;
                                free = 0;
                                count = 0;
                                markMove = move;
                            }

                            if (addCount) count++;
                            addCount = 0;

                            if (addFree) {
                                free++;
                                markMove = move;
                            }
                            addFree = 1;
                        }
                    }

                    v = vs[move + 1];
                    if (v == 0) {
                        emptyCount--;
                        addCount = 1;
                    }
                    else {
                        colorCount--;
                        addFree = 0;
                    }
                }
            }

            //arr[idx] = ov;

            return direction << 12 |
                free << 8 |
                markMove << 5 |
                (free ? max == 4 ? FOUR_FREE : THREE_FREE :
                    max == 4 && count > 1 ? LINE_DOUBLE_FOUR :
                    max << 1);
        }


        function testLinePoint(idx, direction, color, arr, lineInfoList) {
            let emptyList = new Array(9),
                emptyMoves = new Array(9);
            let emptyCount = 0,
                colorCount = 0,
                emptyStart = 0,
                emptyEnd = 0;
            for (let i = 0; i < 9; i++) lineInfoList[i] = 0;
            for (let move = -4; move < 5; move++) {
                let v = arr[moveIdx(idx, move, direction)];
                if (v == 0) {
                    emptyCount++;
                    emptyMoves[emptyEnd] = move;
                    emptyList[emptyEnd++] = move + 4;
                }
                else if (v == color) {
                    colorCount++;
                }
                else { // v!=color || v==-1
                    emptyCount = 0;
                    colorCount = 0;
                    emptyStart = emptyEnd;
                }

                if (emptyCount + colorCount == 5) {
                    if (gameRules == RENJU_RULES && color == 1 &&
                        (color == arr[moveIdx(idx, move - 5, direction)] ||
                            color == arr[moveIdx(idx, move + 1, direction)]))
                    { //六腐形
                        for (let e = emptyStart; e < emptyEnd; e++) {
                            if (colorCount == 4 && (colorCount + 1) > (lineInfoList[emptyList[e]] & MAX)) {
                                lineInfoList[emptyList[e]] = SIX | ((move - emptyMoves[e]) << 5);
                            }
                        }
                    }
                    else {
                        for (let e = emptyStart; e < emptyEnd; e++) {
                            if (((lineInfoList[emptyList[e]] & MAX) >>> 1) < colorCount + 1) {
                                lineInfoList[emptyList[e]] = ADD_MAX_COUNT | ((move - emptyMoves[e]) << 5) | (colorCount + 1 << 1);
                            }

                            if (((lineInfoList[emptyList[e]] & MAX) >>> 1) == colorCount + 1) {
                                if (lineInfoList[emptyList[e]] & ADD_MAX_COUNT) {
                                    lineInfoList[emptyList[e]] += 0x1000; //count++
                                }
                                lineInfoList[emptyList[e]] &= 0x7fff;

                                if (lineInfoList[emptyList[e]] & ADD_FREE_COUNT) {
                                    lineInfoList[emptyList[e]] += 0x100; //free++
                                    lineInfoList[emptyList[e]] = (lineInfoList[emptyList[e]] & 0xff1f) | ((move - emptyMoves[e]) << 5); //set markMove
                                }
                                lineInfoList[emptyList[e]] |= ADD_FREE_COUNT;
                            }
                        }
                    }

                    v = arr[moveIdx(idx, move - 4, direction)];
                    if (v == 0) {
                        emptyCount--;
                        emptyStart++;
                        for (let e = emptyStart; e < emptyEnd; e++) {
                            lineInfoList[emptyList[e]] |= ADD_MAX_COUNT; //set addCount
                        }
                    }
                    else {
                        colorCount--;
                        for (let e = emptyStart; e < emptyEnd; e++) {
                            lineInfoList[emptyList[e]] &= 0xf7ff;
                        }
                    }
                }
            }

            for (let e = 0; e < emptyEnd; e++) {
                if (lineInfoList[emptyList[e]]) {
                    let max = (lineInfoList[emptyList[e]] >>> 1) & 0x07,
                        free = lineInfoList[emptyList[e]] & 0x0700 ? 1 : 0,
                        lineFoul = (max == 6) || (max == 4 && (lineInfoList[emptyList[e]] & 0x7000) > 0x1000 && !free) ? 1 : 0;

                    lineInfoList[emptyList[e]] = (lineInfoList[emptyList[e]] & 0x07e0) |
                        direction << 12 | lineFoul << 4 | max << 1 | free;
                }
            }
        }


        function testLinePointFour(idx, direction, color, arr, lineInfoList) {
            let emptyList = new Array(9),
                emptyMoves = new Array(9);
            let emptyCount = 0,
                colorCount = 0,
                emptyStart = 0,
                emptyEnd = 0;
            for (let i = 0; i < 9; i++) lineInfoList[i] = 0;
            for (let move = -4; move < 5; move++) {
                let v = arr[moveIdx(idx, move, direction)];
                if (v == 0) {
                    emptyCount++;
                    emptyMoves[emptyEnd] = move;
                    emptyList[emptyEnd++] = move + 4;
                }
                else if (v == color) {
                    colorCount++;
                }
                else { // v!=color || v==-1
                    emptyCount = 0;
                    colorCount = 0;
                    emptyStart = emptyEnd;
                }

                if (emptyCount + colorCount == 5) {
                    if (colorCount == 4) {
                        if (gameRules == RENJU_RULES && color == 1 &&
                            (color == arr[moveIdx(idx, move - 5, direction)] ||
                                color == arr[moveIdx(idx, move + 1, direction)]))
                        {
                            for (let e = emptyStart; e < emptyEnd; e++) {
                                lineInfoList[emptyList[e]] = SIX | ((move - emptyMoves[e]) << 5);
                            }
                        }
                        else {
                            for (let e = emptyStart; e < emptyEnd; e++) {
                                lineInfoList[emptyList[e]] = FIVE | ((move - emptyMoves[e]) << 5);
                            }
                        }
                    }
                    else if (colorCount == 3) {
                        if (gameRules == RENJU_RULES && color == 1 &&
                            (color == arr[moveIdx(idx, move - 5, direction)] ||
                                color == arr[moveIdx(idx, move + 1, direction)]))
                        { //六腐形
                        }
                        else {
                            for (let e = emptyStart; e < emptyEnd; e++) {
                                if ((lineInfoList[emptyList[e]] & MAX) < FOUR_NOFREE) {
                                    lineInfoList[emptyList[e]] = ADD_MAX_COUNT | ((move - emptyMoves[e]) << 5) | FOUR_NOFREE;
                                }

                                if ((lineInfoList[emptyList[e]] & MAX) == FOUR_NOFREE) {
                                    if (lineInfoList[emptyList[e]] & ADD_MAX_COUNT) {
                                        lineInfoList[emptyList[e]] += 0x1000; //count++
                                    }
                                    lineInfoList[emptyList[e]] &= 0x7fff;

                                    if (lineInfoList[emptyList[e]] & ADD_FREE_COUNT) {
                                        lineInfoList[emptyList[e]] += 0x100; //free++
                                        lineInfoList[emptyList[e]] = (lineInfoList[emptyList[e]] & 0xff1f) | ((move - emptyMoves[e]) << 5); //set markMove
                                    }
                                    lineInfoList[emptyList[e]] |= ADD_FREE_COUNT;
                                }
                            }
                        }
                    }

                    v = arr[moveIdx(idx, move - 4, direction)];
                    if (v == 0) {
                        emptyCount--;
                        emptyStart++;
                        for (let e = emptyStart; e < emptyEnd; e++) {
                            lineInfoList[emptyList[e]] |= ADD_MAX_COUNT; //set addCount
                        }
                    }
                    else {
                        colorCount--;
                        for (let e = emptyStart; e < emptyEnd; e++) {
                            lineInfoList[emptyList[e]] &= 0xf7ff;
                        }
                    }
                }
            }

            for (let e = 0; e < emptyEnd; e++) {
                if (lineInfoList[emptyList[e]]) {
                    let four_max_free = lineInfoList[emptyList[e]] & 0x0700 ? FOUR_FREE :
                        (lineInfoList[emptyList[e]] & 0x7000) > 0x1000 ?
                        LINE_DOUBLE_FOUR : lineInfoList[emptyList[e]] & FOUL_MAX;

                    lineInfoList[emptyList[e]] = (lineInfoList[emptyList[e]] & 0x07e0) |
                        direction << 12 | four_max_free;
                }
            }
        }


        function testLinePointThree(idx, direction, color, arr, lineInfoList) {
            let emptyList = new Array(9),
                emptyMoves = new Array(9);
            let emptyCount = 0,
                colorCount = 0,
                emptyStart = 0,
                emptyEnd = 0;
            for (let i = 0; i < 9; i++) lineInfoList[i] = 0;
            for (let move = -4; move < 5; move++) {
                let v = arr[moveIdx(idx, move, direction)];
                if (v == 0) {
                    emptyCount++;
                    emptyMoves[emptyEnd] = move;
                    emptyList[emptyEnd++] = move + 4;
                }
                else if (v == color) {
                    colorCount++;
                }
                else { // v!=color || v==-1
                    emptyCount = 0;
                    colorCount = 0;
                    emptyStart = emptyEnd;
                }

                if (emptyCount + colorCount == 5) {
                    if (colorCount == 4) {
                        if (gameRules == RENJU_RULES && color == 1 &&
                            (color == arr[moveIdx(idx, move - 5, direction)] ||
                                color == arr[moveIdx(idx, move + 1, direction)]))
                        {
                            for (let e = emptyStart; e < emptyEnd; e++) {
                                lineInfoList[emptyList[e]] = SIX | ((move - emptyMoves[e]) << 5);
                            }
                        }
                        else {
                            for (let e = emptyStart; e < emptyEnd; e++) {
                                lineInfoList[emptyList[e]] = FIVE | ((move - emptyMoves[e]) << 5);
                            }
                        }
                    }
                    else if (4 > colorCount && colorCount > 1) {
                        if (gameRules == RENJU_RULES && color == 1 &&
                            (color == arr[moveIdx(idx, move - 5, direction)] ||
                                color == arr[moveIdx(idx, move + 1, direction)]))
                        { //六腐形
                        }
                        else {
                            for (let e = emptyStart; e < emptyEnd; e++) {
                                if (((lineInfoList[emptyList[e]] & MAX) >>> 1) < colorCount + 1) {
                                    lineInfoList[emptyList[e]] = ADD_MAX_COUNT | ((move - emptyMoves[e]) << 5) | (colorCount + 1 << 1);
                                }

                                if (((lineInfoList[emptyList[e]] & MAX) >>> 1) == colorCount + 1) {
                                    if (lineInfoList[emptyList[e]] & ADD_MAX_COUNT) {
                                        lineInfoList[emptyList[e]] += 0x1000; //count++
                                    }
                                    lineInfoList[emptyList[e]] &= 0x7fff;

                                    if (lineInfoList[emptyList[e]] & ADD_FREE_COUNT) {
                                        lineInfoList[emptyList[e]] += 0x100; //free++
                                        lineInfoList[emptyList[e]] = (lineInfoList[emptyList[e]] & 0xff1f) | ((move - emptyMoves[e]) << 5); //set markMove
                                    }
                                    lineInfoList[emptyList[e]] |= ADD_FREE_COUNT;
                                }
                            }
                        }
                    }

                    v = arr[moveIdx(idx, move - 4, direction)];
                    if (v == 0) {
                        emptyCount--;
                        emptyStart++;
                        for (let e = emptyStart; e < emptyEnd; e++) {
                            lineInfoList[emptyList[e]] |= ADD_MAX_COUNT; //set addCount
                        }
                    }
                    else {
                        colorCount--;
                        for (let e = emptyStart; e < emptyEnd; e++) {
                            lineInfoList[emptyList[e]] &= 0xf7ff;
                        }
                    }
                }
            }

            for (let e = 0; e < emptyEnd; e++) {
                if (lineInfoList[emptyList[e]]) {
                    let foul_max = (lineInfoList[emptyList[e]] >>> 1) & 0x0f,
                        four_max_free = lineInfoList[emptyList[e]] & 0x0700 ? (foul_max == 4 ? FOUR_FREE : THREE_FREE) :
                        foul_max == 4 && (lineInfoList[emptyList[e]] & 0x7000) > 0x1000 ?
                        LINE_DOUBLE_FOUR : foul_max << 1;

                    lineInfoList[emptyList[e]] = (lineInfoList[emptyList[e]] & 0x07e0) |
                        direction << 12 | four_max_free;
                }
            }
        }


        // 返回冲4的防点
        function getBlockFourPoint(idx, arr, lineInfo) {
            let move = (lineInfo >>> 5) & 7,
                direction = (lineInfo >>> 12) & 7,
                nIdx;
            for (let m = 0; m > -5; m--) {
                nIdx = moveIdx(idx, move + m, direction);
                if (0 == arr[nIdx] && nIdx != idx) return nIdx;
            }
        }


        function getBlockThreePoints(idx, arr, lineInfo) {
            let move = (lineInfo >>> 5) & 7,
                freeCount = (lineInfo >>> 8) & 7,
                direction = (lineInfo >>> 12) & 7,
                points = [0, 0, 0, 0],
                m = 0,
                nIdx;
            if (freeCount == 1) {
                for (m = 0; m > -6; m--) {
                    nIdx = moveIdx(idx, move + m, direction);
                    if (0 == arr[nIdx] && nIdx != idx) points[++points[0]] = nIdx;
                }
            }
            else if (freeCount == 2) {
                for (m = 0; m > -5; m--) {
                    nIdx = moveIdx(idx, move + m, direction);
                    if (0 == arr[nIdx] && nIdx != idx) break; // skip first
                }
                for (m--; m > -6; m--) {
                    nIdx = moveIdx(idx, move + m, direction);
                    if (0 == arr[nIdx] && nIdx != idx) points[++points[0]] = nIdx;
                }
            }

            return points;
        }


        function getFreeFourPoint(idx, arr, lineInfo) {
            let move = (lineInfo >>> 5) & 7,
                direction = (lineInfo >>> 12) & 7,
                points = [0, 0, 0],
                m = 0,
                nIdx;
            for (m = 0; m > -5; m--) {
                nIdx = moveIdx(idx, move + m, direction);
                if (0 == arr[nIdx] && nIdx != idx) break; // skip first
            }
            for (m--; m > -6; m--) {
                nIdx = moveIdx(idx, move + m, direction);
                if (0 == arr[nIdx] && nIdx != idx) {
                    points[++points[0]] = nIdx;
                }
            }
            points[0] = (lineInfo >>> 8) & 7; //set freePoint num

            return points;
        }


        function isFoul(idx, arr) {
            if (gameRules != RENJU_RULES) return false;
            const LEN = 8,
                VALUE = 0,
                COUNT = 1,
                PIDX = 2,
                IDX = 3,
                INFO_START = 4;
            let stack = new Array(36 * LEN),
                stackIdx = 0,
                threeCount = 0,
                fourCount = 0,
                foulCount = 0,
                ov = arr[idx];

            arr[idx] = 1;
            stack[VALUE] = 0;
            stack[COUNT] = 0;
            stack[PIDX] = 0;
            stack[IDX] = idx;
            for (let direction = 0; direction < 4; direction++) {
                let info = _testLineThree(idx, direction, 1, arr),
                    v = FOUL_MAX_FREE & info;
                if (v == FIVE) { // not foul
                    stackIdx = -1;
                    break;
                }
                else if (v > FOUL) foulCount++;
                else if (v >= FOUR_NOFREE) fourCount++;
                else if (v == THREE_FREE) {
                    threeCount++;
                    stack[INFO_START + stack[COUNT]++] = info & 0x8fff | (direction << 12);
                }
            }

            if (stackIdx > -1) {
                //console.log(`>>>`)
                if (fourCount > 1 || foulCount) { // is foul
                    stack[VALUE] = 2;
                    stackIdx = -1;
                }
                else if (threeCount < 2) stackIdx = -1; //not foul

                while (stackIdx > -1) { //continue test doubleThree

                    if ((stackIdx & 1) == 0) { // test freeFourPoint and first doubleThree
                        //console.log(`stackIdx=${stackIdx}, \n[${stack}]`)
                        let idx = stack[stackIdx * LEN + IDX];
                        if (stack[stackIdx * LEN + VALUE] > 1) { // is doubleThree
                            //console.log(1)
                            arr[idx] = 0;
                            stackIdx--;
                            if (stackIdx == -1) stack[VALUE] = 2; // set first doubleThree
                        }
                        else if (2 > (stack[stackIdx * LEN + VALUE] + stack[stackIdx * LEN + COUNT] - stack[stackIdx * LEN + PIDX])) { // not doubleThree
                            //console.log(2)
                            arr[idx] = 0;
                            stackIdx--;
                            if (stackIdx > -1) stack[stackIdx * LEN + VALUE] = 1; //set freeFourPoint
                        }
                        else { //depth++
                            //console.log(3)
                            let ps = getFreeFourPoint(idx, arr, stack[stackIdx * LEN + INFO_START + stack[stackIdx * LEN + PIDX]++]);
                            stackIdx++;
                            stack[stackIdx * LEN + VALUE] = 0;
                            stack[stackIdx * LEN + COUNT] = ps[0]; //count
                            stack[stackIdx * LEN + PIDX] = 0;
                            //stack[stackIdx * LEN + IDX] = idx;
                            stack[stackIdx * LEN + INFO_START + 0] = ps[1];
                            stack[stackIdx * LEN + INFO_START + 1] = ps[2];
                        }
                    }
                    else { // test next doubleThree
                        //console.info(`stackIdx=${stackIdx}, \n[${stack}]`)
                        if (stack[stackIdx * LEN + VALUE] == 1) { // find freeFourPoint is freeFour
                            //console.info(1)
                            stackIdx--;
                            stack[stackIdx * LEN + VALUE]++; // add one freeThree
                        }
                        else if (stack[stackIdx * LEN + PIDX] == stack[stackIdx * LEN + COUNT]) { // no find freeFourPoint not freeFour
                            //console.info(2)
                            stackIdx--;
                        }
                        else { //depth++
                            //console.info(3)
                            let skip = false,
                                idx = stack[stackIdx * LEN + INFO_START + stack[stackIdx * LEN + PIDX]++];

                            threeCount = 0;
                            fourCount = 0;
                            foulCount = 0;

                            arr[idx] = 1;
                            stackIdx++;
                            stack[stackIdx * LEN + VALUE] = 0;
                            stack[stackIdx * LEN + COUNT] = 0; //count
                            stack[stackIdx * LEN + PIDX] = 0;
                            stack[stackIdx * LEN + IDX] = idx;
                            for (let direction = 0; direction < 4; direction++) {
                                let info = _testLineThree(idx, direction, 1, arr),
                                    v = FOUL_MAX_FREE & info;
                                if (v == FIVE) {
                                    arr[idx] = 0;
                                    stackIdx--; //not freeFourPoint
                                    skip = true;
                                    break;
                                }
                                else if (v > FOUL) foulCount++;
                                else if (v >= FOUR_NOFREE) fourCount++;
                                else if (v == THREE_FREE) {
                                    threeCount++;
                                    stack[stackIdx * LEN + INFO_START + stack[stackIdx * LEN + COUNT]++] = info & 0x8fff | (direction << 12);
                                }
                            }

                            if (!skip) {
                                if (fourCount > 1 || foulCount) {
                                    arr[idx] = 0;
                                    stackIdx--; //not freeFourPoint
                                }
                                else if (threeCount < 2) {
                                    arr[idx] = 0;
                                    stackIdx--; // is freeFourPoint
                                    stack[stackIdx * LEN + VALUE] = 1;
                                }
                            }
                        }
                    }
                }
            }

            arr[idx] = ov;
            return stack[VALUE] > 1;
        }

        function testPointFour(idx, color, arr) {
            let info = 0,
                max = 0,
                ov = arr[idx];
            arr[idx] = color;
            for (let direction = 0; direction < 4; direction++) {
                let lineInfo = _testLineFour(idx, direction, color, arr),
                    lineMax = lineInfo & FOUL_MAX_FREE;
                if (lineMax > max) {
                    info = lineInfo;
                    max = lineMax;
                }
            }
            arr[idx] = ov;
            let foulV = (gameRules == RENJU_RULES) && (color == 1) && (isFoul(idx, arr)) ? 1 : 0;

            return info | (foulV << 4);
        }



        function toArr(r, arr) {
            arr = arr || getArr2D([]);
            if (r.length == 225) {
                for (let y = 0; y < 15; y++) {
                    for (let x = 0; x < 15; x++) {
                        arr[y][x] = r[x + y * 15];
                    }
                }
            }
            return arr;
        }


        function movesSort(fMoves, fun) {
            for (let i = fMoves.length - 2; i >= 0; i--) {
                for (let j = fMoves.length - 1; j > i; j--) {
                    if (fun(fMoves[j].length, fMoves[i].length)) {
                        let t = fMoves.splice(i, 1);
                        fMoves.splice(j, 0, t[0]);
                        break;
                    }
                }
            }
        }


        function testFive(arr, color, infoArr) {
            let emptyList = new Array(15),
                emptyMoves = new Array(15);
            for (let i = 0; i < 225; i++) infoArr[i] = 0;
            for (let direction = 0; direction < 4; direction++) {
                let markArr = new Array(225),
                    listStart = direction == 2 ? 15 - cBoardSize : 0,
                    listEnd = direction < 2 ? listStart + cBoardSize : listStart + cBoardSize * 2 - 5;
                for (let list = listStart; list < listEnd; list++) {
                    let emptyCount = 0,
                        colorCount = 0,
                        moveStart = direction < 3 || list < cBoardSize ? 14 : list < 15 ? 15 + list - cBoardSize : 29 - cBoardSize,
                        moveEnd = direction < 2 ? moveStart + cBoardSize : list - listStart < cBoardSize ? moveStart + list - listStart + 1 : moveStart + cBoardSize - (list - listStart + 1 - cBoardSize),
                        emptyStart = 0,
                        emptyEnd = 0;
                    for (let move = moveStart; move < moveEnd; move++) {
                        let pIdx = (direction * 29 + list) * 43 + move,
                            v = arr[idxLists[pIdx]];
                        if (v == 0) {
                            emptyCount++;
                            emptyMoves[emptyEnd] = move;
                            emptyList[emptyEnd++] = idxLists[pIdx];
                        }
                        else if (v == color) {
                            colorCount++;
                        }
                        else { // v!=color || v==-1
                            emptyCount = 0;
                            colorCount = 0;
                            emptyStart = emptyEnd;
                        }

                        if (emptyCount + colorCount == 5) {
                            if (colorCount == 4) {
                                if (gameRules == RENJU_RULES && color == 1 &&
                                    (color == arr[idxLists[pIdx - 5]] ||
                                        color == arr[idxLists[pIdx + 1]]))
                                {
                                    for (let e = emptyStart; e < emptyEnd; e++) {
                                        markArr[emptyList[e]] = SIX | ((move - emptyMoves[e]) << 5);
                                    }
                                }
                                else {
                                    for (let e = emptyStart; e < emptyEnd; e++) {
                                        markArr[emptyList[e]] = FIVE | ((move - emptyMoves[e]) << 5);
                                    }
                                }
                            }

                            v = arr[idxLists[pIdx - 4]];
                            if (v == 0) {
                                emptyCount--;
                                emptyStart++;
                                for (let e = emptyStart; e < emptyEnd; e++) {
                                    markArr[emptyList[e]] |= ADD_MAX_COUNT; //set addCount
                                }
                            }
                            else {
                                colorCount--;
                                for (let e = emptyStart; e < emptyEnd; e++) {
                                    markArr[emptyList[e]] = markArr[emptyList[e]] & 0xf7ff;
                                }
                            }
                        }
                    }
                }

                for (let idx = 0; idx < 225; idx++) {
                    let max = markArr[idx] & MAX;
                    if (FIVE == max) {
                        infoArr[idx] = markArr[idx] & 0x8fff | (direction << 12);
                    }
                }
            }
        }


        function testFour(arr, color, infoArr) {
            let emptyList = new Array(15),
                emptyMoves = new Array(15);
            for (let i = 0; i < 225; i++) infoArr[i] = 0;
            for (let direction = 0; direction < 4; direction++) {
                let markArr = new Array(225),
                    listStart = direction == 2 ? 15 - cBoardSize : 0,
                    listEnd = direction < 2 ? listStart + cBoardSize : listStart + cBoardSize * 2 - 5;
                for (let list = listStart; list < listEnd; list++) {
                    let emptyCount = 0,
                        colorCount = 0,
                        moveStart = direction < 3 || list < cBoardSize ? 14 : list < 15 ? 15 + list - cBoardSize : 29 - cBoardSize,
                        moveEnd = direction < 2 ? moveStart + cBoardSize : list - listStart < cBoardSize ? moveStart + list - listStart + 1 : moveStart + cBoardSize - (list - listStart + 1 - cBoardSize),
                        emptyStart = 0,
                        emptyEnd = 0;
                    for (let move = moveStart; move < moveEnd; move++) {

                        let pIdx = (direction * 29 + list) * 43 + move,
                            v = arr[idxLists[pIdx]];
                        if (v == 0) {
                            emptyCount++;
                            emptyMoves[emptyEnd] = move;
                            emptyList[emptyEnd++] = idxLists[pIdx];
                        }
                        else if (v == color) {
                            colorCount++;
                        }
                        else { // v!=color || v==-1
                            emptyCount = 0;
                            colorCount = 0;
                            emptyStart = emptyEnd;
                        }

                        if (emptyCount + colorCount == 5) {
                            if (colorCount == 4) {
                                if (gameRules == RENJU_RULES && color == 1 &&
                                    (color == arr[idxLists[pIdx - 5]] ||
                                        color == arr[idxLists[pIdx + 1]]))
                                {
                                    for (let e = emptyStart; e < emptyEnd; e++) {
                                        markArr[emptyList[e]] = SIX | ((move - emptyMoves[e]) << 5);
                                    }
                                }
                                else {
                                    for (let e = emptyStart; e < emptyEnd; e++) {
                                        markArr[emptyList[e]] = FIVE | ((move - emptyMoves[e]) << 5);
                                    }
                                }
                            }
                            else if (colorCount == 3) {
                                if (gameRules == RENJU_RULES && color == 1 &&
                                    (color == arr[idxLists[pIdx - 5]] ||
                                        color == arr[idxLists[pIdx + 1]]))
                                { //六腐形
                                }
                                else {
                                    for (let e = emptyStart; e < emptyEnd; e++) {
                                        if ((markArr[emptyList[e]] & MAX) < FOUR_NOFREE) {
                                            markArr[emptyList[e]] = ADD_MAX_COUNT | ((move - emptyMoves[e]) << 5) | FOUR_NOFREE;
                                        }

                                        if ((markArr[emptyList[e]] & MAX) == FOUR_NOFREE) {
                                            if (markArr[emptyList[e]] & ADD_MAX_COUNT) {
                                                markArr[emptyList[e]] += 0x1000; //count++
                                            }
                                            markArr[emptyList[e]] = markArr[emptyList[e]] & 0x7fff;

                                            if (markArr[emptyList[e]] & ADD_FREE_COUNT) {
                                                markArr[emptyList[e]] += 0x100; //free++
                                                markArr[emptyList[e]] = (markArr[emptyList[e]] & 0xff1f) | ((move - emptyMoves[e]) << 5); //set markMove
                                            }
                                            markArr[emptyList[e]] |= ADD_FREE_COUNT;
                                        }
                                    }
                                }
                            }

                            v = arr[idxLists[pIdx - 4]];
                            if (v == 0) {
                                emptyCount--;
                                emptyStart++;
                                for (let e = emptyStart; e < emptyEnd; e++) {
                                    markArr[emptyList[e]] |= ADD_MAX_COUNT; //set addCount
                                }
                            }
                            else {
                                colorCount--;
                                for (let e = emptyStart; e < emptyEnd; e++) {
                                    markArr[emptyList[e]] = markArr[emptyList[e]] & 0xf7ff;
                                }
                            }
                        }
                    }
                }

                for (let idx = 0; idx < 225; idx++) {
                    let max = markArr[idx] & MAX;
                    if (FIVE == max) {
                        infoArr[idx] = markArr[idx] & 0x8fff | (direction << 12);
                    }
                    else if (FOUR_NOFREE == max) {
                        markArr[idx] |= (markArr[idx] & FREE_COUNT) ? 1 : 0;
                        if ((markArr[idx] & FOUL_MAX_FREE) > (infoArr[idx] & FOUL_MAX_FREE)) {
                            if (gameRules == RENJU_RULES && color == 1) {
                                let foul = isFoul(idx, arr) ? 1 : 0;
                                infoArr[idx] = markArr[idx] & 0x8fff | (direction << 12) | foul << 4;
                            }
                            else
                                infoArr[idx] = markArr[idx] & 0x8fff | (direction << 12);
                        }
                    }
                }
            }
        }


        function testThree(arr, color, infoArr) {
            let emptyList = new Array(15),
                emptyMoves = new Array(15);
            for (let i = 0; i < 225; i++) infoArr[i] = 0;
            for (let direction = 0; direction < 4; direction++) {
                let markArr = new Array(225),
                    listStart = direction == 2 ? 15 - cBoardSize : 0,
                    listEnd = direction < 2 ? listStart + cBoardSize : listStart + cBoardSize * 2 - 5;
                for (let list = listStart; list < listEnd; list++) {
                    let emptyCount = 0,
                        colorCount = 0,
                        moveStart = direction < 3 || list < cBoardSize ? 14 : list < 15 ? 15 + list - cBoardSize : 29 - cBoardSize,
                        moveEnd = direction < 2 ? moveStart + cBoardSize : list - listStart < cBoardSize ? moveStart + list - listStart + 1 : moveStart + cBoardSize - (list - listStart + 1 - cBoardSize),
                        emptyStart = 0,
                        emptyEnd = 0;
                    for (let move = moveStart; move < moveEnd; move++) {
                        let pIdx = (direction * 29 + list) * 43 + move,
                            v = arr[idxLists[pIdx]];
                        if (v == 0) {
                            emptyCount++;
                            emptyMoves[emptyEnd] = move;
                            emptyList[emptyEnd++] = idxLists[pIdx];
                        }
                        else if (v == color) {
                            colorCount++;
                        }
                        else { // v!=color || v==-1
                            emptyCount = 0;
                            colorCount = 0;
                            emptyStart = emptyEnd;
                        }
                        //console.log(idxLists[pIdx])
                        if (emptyCount + colorCount == 5) {
                            //console.info(`idx = ${idxLists[pIdx]}, emptyCount = ${emptyCount}, colorCount = ${colorCount}`)
                            if (colorCount == 4) {
                                if (gameRules == RENJU_RULES && color == 1 &&
                                    (color == arr[idxLists[pIdx - 5]] ||
                                        color == arr[idxLists[pIdx + 1]]))
                                {
                                    for (let e = emptyStart; e < emptyEnd; e++) {
                                        markArr[emptyList[e]] = SIX | ((move - emptyMoves[e]) << 5);
                                    }
                                }
                                else {
                                    for (let e = emptyStart; e < emptyEnd; e++) {
                                        markArr[emptyList[e]] = FIVE | ((move - emptyMoves[e]) << 5);
                                    }
                                }
                            }
                            else if (4 > colorCount && colorCount > 1) {
                                if (gameRules == RENJU_RULES && color == 1 &&
                                    (color == arr[idxLists[pIdx - 5]] ||
                                        color == arr[idxLists[pIdx + 1]]))
                                { //六腐形
                                }
                                else {
                                    for (let e = emptyStart; e < emptyEnd; e++) {
                                        if (((markArr[emptyList[e]] & MAX) >>> 1) < colorCount + 1) {
                                            markArr[emptyList[e]] = ADD_MAX_COUNT | ((move - emptyMoves[e]) << 5) | (colorCount + 1 << 1);
                                            //if(idxToName(emptyList[e])=="L7") console.error(`direction: ${direction}\n markMove: ${(markArr[emptyList[e]] & 0xe0)>>>5}\n move: ${move} \nemptyMoves[e]: ${emptyMoves[e]}`);
                                        }

                                        if (((markArr[emptyList[e]] & MAX) >>> 1) == colorCount + 1) {
                                            if (markArr[emptyList[e]] & ADD_MAX_COUNT) {
                                                markArr[emptyList[e]] += 0x1000; //count++
                                            }
                                            markArr[emptyList[e]] = markArr[emptyList[e]] & 0x7fff;

                                            if (markArr[emptyList[e]] & ADD_FREE_COUNT) {
                                                markArr[emptyList[e]] += 0x100; //free++
                                                markArr[emptyList[e]] = (markArr[emptyList[e]] & 0xff1f) | ((move - emptyMoves[e]) << 5); //set markMove
                                                //if(idxToName(emptyList[e])=="L7") console.info(`direction: ${direction}\n markMove: ${(markArr[emptyList[e]] & 0xe0)>>>5}\n move: ${move} \nemptyMoves[e]: ${emptyMoves[e]}`);
                                            }
                                            markArr[emptyList[e]] |= ADD_FREE_COUNT;
                                        }
                                    }
                                }
                            }

                            v = arr[idxLists[pIdx - 4]];
                            if (v == 0) {
                                emptyCount--;
                                emptyStart++;
                                for (let e = emptyStart; e < emptyEnd; e++) {
                                    markArr[emptyList[e]] |= ADD_MAX_COUNT; //set addCount
                                }
                            }
                            else {
                                colorCount--;
                                for (let e = emptyStart; e < emptyEnd; e++) {
                                    markArr[emptyList[e]] = markArr[emptyList[e]] & 0xf7ff;
                                }
                            }
                        }
                    }
                }

                for (let idx = 0; idx < 225; idx++) {
                    let max = (markArr[idx] & MAX) >>> 1;
                    if (5 == max) {
                        infoArr[idx] = markArr[idx] & 0x8fff | (direction << 12);
                    }
                    else if (5 > max && max > 2) {
                        markArr[idx] |= (markArr[idx] & FREE_COUNT) ? 1 : 0; //mark free
                        if ((markArr[idx] & FOUL_MAX_FREE) > (infoArr[idx] & FOUL_MAX_FREE)) {
                            //console.log(`idx: ${idxToName(idx)}\n direction: ${direction}, \n markMove:  ${(markArr[idx] & 0xe0) >>> 5}`);
                            if (gameRules == RENJU_RULES && color == 1) {
                                let foul = isFoul(idx, arr) ? 1 : 0;
                                if ((max == 3) && (markArr[idx] & FREE) && (foul == 0)) {
                                    arr[idx] = color;
                                    let ps = getFreeFourPoint(idx, arr, ((markArr[idx] & 0x8fff) | (direction << 12)));
                                    //console.warn(`[${ps[0]},${idxToName(ps[1])}, ${idxToName(ps[2])}]`);
                                    let i = 1;
                                    for (i = 1; i <= ps[0]; i++) {
                                        let f = isFoul(ps[i], arr);
                                        //console.warn(`${idxToName(ps[i])} isFoul: ${f}`);
                                        if (!f) break; //ps[i] is freeFour point
                                    }
                                    arr[idx] = 0;
                                    if (i > ps[0]) {
                                        //console.warn(`markArr[idx]: ${markArr[idx]}`);
                                        markArr[idx] &= 0xf8fe; //clear free
                                        //console.warn(`markArr[idx]: ${markArr[idx]}`);
                                    }
                                }
                                infoArr[idx] = markArr[idx] & 0x8fff | (direction << 12) | foul << 4;
                                //console.log(`${idxToName(idx)}, foul=${foul}, infoArr[idx]=${infoArr[idx].toString(2)}`)
                            }
                            else
                                infoArr[idx] = markArr[idx] & 0x8fff | (direction << 12);
                        }
                    }
                }
            }
        }


        function isGameOver(arr, color) {
            let isOver = false;
            for (let direction = 0; direction < 4; direction++) {
                let listStart = direction == 2 ? 15 - cBoardSize : 0,
                    listEnd = direction < 2 ? listStart + cBoardSize : listStart + cBoardSize * 2 - 5;
                for (let list = listStart; list < listEnd; list++) {
                    let emptyCount = 0,
                        colorCount = 0,
                        moveStart = direction < 3 || list < cBoardSize ? 14 : list < 15 ? 15 + list - cBoardSize : 29 - cBoardSize,
                        moveEnd = direction < 2 ? moveStart + cBoardSize : list - listStart < cBoardSize ? moveStart + list - listStart + 1 : moveStart + cBoardSize - (list - listStart + 1 - cBoardSize);
                    for (let move = moveStart; move < moveEnd; move++) {
                        let pIdx = (direction * 29 + list) * 43 + move,
                            v = arr[idxLists[pIdx]];
                        if (v == 0) {
                            emptyCount++;
                        }
                        else if (v == color) {
                            colorCount++;
                        }
                        else { // v!=color || v==-1
                            emptyCount = 0;
                            colorCount = 0;
                        }

                        if (emptyCount + colorCount == 5) {
                            if (colorCount == 5) {
                                isOver = true;
                                direction = 4; //break for
                                list = listEnd;
                                move = moveEnd;
                            }

                            v = arr[idxLists[pIdx - 4]];
                            if (v == 0) {
                                emptyCount--;
                            }
                            else {
                                colorCount--;
                            }
                        }
                    }
                }
            }
            return isOver;
        }


        function getLevel(arr, color) {
            let infoArr = new Array(225),
                isWin = false,
                fiveIdx = -1;
            let emptyList = new Array(15),
                emptyMoves = new Array(15);
            for (let direction = 0; direction < 4; direction++) {
                let markArr = new Array(225),
                    listStart = direction == 2 ? 15 - cBoardSize : 0,
                    listEnd = direction < 2 ? listStart + cBoardSize : listStart + cBoardSize * 2 - 5;
                for (let list = listStart; list < listEnd; list++) {
                    let emptyCount = 0,
                        colorCount = 0,
                        moveStart = direction < 3 || list < cBoardSize ? 14 : list < 15 ? 15 + list - cBoardSize : 29 - cBoardSize,
                        moveEnd = direction < 2 ? moveStart + cBoardSize : list - listStart < cBoardSize ? moveStart + list - listStart + 1 : moveStart + cBoardSize - (list - listStart + 1 - cBoardSize),
                        emptyStart = 0,
                        emptyEnd = 0;
                    for (let move = moveStart; move < moveEnd; move++) {
                        let pIdx = (direction * 29 + list) * 43 + move,
                            v = arr[idxLists[pIdx]];
                        if (v == 0) {
                            emptyCount++;
                            emptyMoves[emptyEnd] = move;
                            emptyList[emptyEnd++] = idxLists[pIdx];
                        }
                        else if (v == color) {
                            colorCount++;
                        }
                        else { // v!=color || v==-1
                            emptyCount = 0;
                            colorCount = 0;
                            emptyStart = emptyEnd;
                        }

                        if (emptyCount + colorCount == 5) {
                            if (colorCount == 5) {
                                if (gameRules == RENJU_RULES && color == 1 &&
                                    (color == arr[idxLists[pIdx - 5]] ||
                                        color == arr[idxLists[pIdx + 1]]))
                                { //
                                }
                                else {
                                    isWin = true;
                                    direction = 4; //break for
                                    list = listEnd;
                                    move = moveEnd;
                                }
                            }
                            else if (colorCount == 4) {
                                if (gameRules == RENJU_RULES && color == 1 &&
                                    (color == arr[idxLists[pIdx - 5]] ||
                                        color == arr[idxLists[pIdx + 1]]))
                                { //
                                }
                                else {
                                    for (let e = emptyStart; e < emptyEnd; e++) {
                                        markArr[emptyList[e]] = FIVE | ((move - emptyMoves[e]) << 5);
                                    }
                                }
                            }

                            v = arr[idxLists[pIdx - 4]];
                            if (v == 0) {
                                emptyCount--;
                                emptyStart++;
                            }
                            else {
                                colorCount--;
                            }
                        }
                    }
                }

                for (let idx = 0; idx < 225; idx++) {
                    let max = (markArr[idx] & MAX) >>> 1;
                    if (5 == max) {
                        infoArr[idx] = markArr[idx] & 0x8fff | (direction << 12);
                    }
                }
            }

            if (isWin) {
                return LEVEL_WIN;
            }
            else {
                for (let idx = 0; idx < 225; idx++) {
                    let max = (infoArr[idx] & MAX) >>> 1;
                    if (5 == max) {
                        if (fiveIdx == -1) fiveIdx = idx;
                        else if (fiveIdx != idx) return (fiveIdx << 8) | LEVEL_FREEFOUR;
                    }
                }
                if (fiveIdx == -1)
                    return LEVEL_NONE;
                else if (gameRules == RENJU_RULES && color == 2 && isFoul(fiveIdx, arr))
                    return (fiveIdx << 8) | LEVEL_FREEFOUR;
                else
                    return (fiveIdx << 8) | LEVEL_NOFREEFOUR;
            }
        }

        // idx 不能是禁手
        function getLevelPoint(idx, color, arr) {
            let info = 0,
                fourCount = 0,
                mark = 0,
                level = 0,
                rt = LEVEL_NONE,
                ov = arr[idx];

            arr[idx] = color;
            for (let direction = 0; direction < 4; direction++) {
                let lineInfo = _testLineFour(idx, direction, color, arr);
                switch (lineInfo & FOUL_MAX_FREE) {
                    case FIVE:
                        level = LEVEL_WIN;
                        direction = 5;
                        break;
                    case FOUR_FREE:
                        if (mark < LEVEL_MARK_FREEFOUR) mark = LEVEL_MARK_FREEFOUR;
                        fourCount += 2;
                        info = lineInfo;
                        break;
                    case LINE_DOUBLE_FOUR:
                        if (mark < LEVEL_MARK_LINE_DOUBLEFOUR) mark = LEVEL_MARK_LINE_DOUBLEFOUR;
                        fourCount += 2;
                        info = lineInfo;
                        break;
                    case FOUR_NOFREE:
                        fourCount += 1;
                        info = lineInfo;
                        break;
                }
            }

            if (level) {
                rt = LEVEL_WIN;
            }
            else if (fourCount) {
                let bIdx = getBlockFourPoint(idx, arr, info);
                level = LEVEL_NOFREEFOUR;
                if (fourCount > 1) {
                    if (mark < LEVEL_MARK_MULTILINE_DOUBLEFOUR) mark = LEVEL_MARK_MULTILINE_DOUBLEFOUR;
                    level = LEVEL_FREEFOUR;
                }
                else if (fourCount == 1 && gameRules == RENJU_RULES && color == 2) {
                    if (isFoul(bIdx, arr)) level = LEVEL_FREEFOUR;
                }
                rt = (bIdx << 8) | mark | level;
            }
            arr[idx] = ov;

            return rt;
        }

        // moves.length 为单数
        function isVCF(color, arr, moves) {

            let isV = false;
            let OV = [];
            let l = moves.length;

            for (let i = 0; i < l; i += 2) {
                let levelInfo = i ? getLevelPoint(moves[i - 1], INVERT_COLOR[color], arr) : getLevel(arr, INVERT_COLOR[color]),
                    bIdx = (levelInfo >>> 8) & 0xff,
                    level = levelInfo & FOUL_MAX_FREE;
                if ((level < LEVEL_NOFREEFOUR && arr[moves[i]] == 0) ||
                    (level == LEVEL_NOFREEFOUR && bIdx == moves[i])) {
                    let info = testPointFour(moves[i], color, arr);
                    if ((info & FOUL_MAX) == FOUR_NOFREE) {
                        OV.push(moves[i]);
                        arr[moves[i]] = color;
                        if (i + 1 >= l) {
                            //所有手走完，判断是否出现胜形 (活4，44，冲4抓)
                            isV = LEVEL_FREEFOUR == (FOUL_MAX_FREE & getLevelPoint(moves[i], color, arr));
                            break;
                        }
                        //后手不判断禁手
                        let idx = getBlockFourPoint(moves[i], arr, info);
                        if (idx == moves[i + 1] && arr[idx] == 0) {
                            OV.push(idx);
                            arr[idx] = INVERT_COLOR[color];
                        }
                        else break;
                    }
                    else break;
                }
                else break;
            }

            // 还原改动的棋子
            for (let i = OV.length - 1; i >= 0; i--) {
                arr[OV[i]] = 0;
            }

            return isV;
        }

        // 去掉VCF无谓冲四，不会改变arr数组
        function simpleVCF(color, arr, moves) {

            let fs = []; // 把对手的反4点记录
            let leng = moves.length - 6;
            /*for (let j = 1; j <= leng; j += 2) { // add fourPoint
                //arr[moves[j -1]] = color;
                //arr[moves[j]] = INVERT_COLOR[color];
                if (FOUR_NOFREE == (FOUL_MAX & testPointFour(moves[j], INVERT_COLOR[color], arr))) fs.push(j);
            }
            //for (let j = 0; j <= leng; j++) {
                //arr[moves[j]] = 0;
            //}
            while (fs.length) { //判断引起对手反四的手顺是否可以去除
                let st = -1;
                let l = 2;
                for (let j = fs.length - 1; j >= 0; j--) {
                    st = fs[j] - 1;
                    l += 2;
                    if (j == 0 || fs[j] - fs[j - 1] > 2) {
                        fs.length -= ((l - 2) >>> 1);
                        break;
                    }
                }
                let VCF = moves.slice(0, st).concat(moves.slice(st + l, moves.length));
                if (isVCF(color, arr, VCF)) moves.splice(st, l);
            }

            leng = moves.length - 6;*/
            for (let j = 0; j <= leng; j++) { // 摆棋子
                arr[moves[j]] = (j & 1) ? INVERT_COLOR[color] : color;
            }

            for (let i = moves.length - 5; i >= 0; i -= 2) { // 从后向前逐个冲4尝试是否无谓冲4
                let VCF = moves.slice(i + 2); // 判断是否无谓冲四      
                if (isVCF(color, arr, VCF)) moves.splice(i, 2); //删除无谓冲四
                // 复原两步，直到最后可以完全复原数组
                if (i < 2) break;
                arr[moves[i - 1]] = 0;
                arr[moves[i - 2]] = 0;
            }

            return moves;
        }


        function findVCF(arr, color, maxVCF, maxDepth, maxNode) {
            //if (isGameOver(arr, 1) || isGameOver(arr,2)|| getLevel(arr, color) >= LEVEL_NOFREEFOUR) return [];
            resetVCF(arr, color, maxVCF, maxDepth, maxNode);
            let centerIdx = 112,
                colorIdx,
                nColorIdx,
                infoArr = new Array(225),
                moves = new Array(0),
                stackIdx = [-1, -1, 225, 225],
                sum = 0,
                sum1 = 0,
                done = false,
                pushMoveCount = 0,
                pushPositionCount = 0,
                hasCount = 0,
                loopCount = 0,
                continueInfo = vcfInfo.continueInfo;

            //console.warn(`color: ${color}, maxVCF: ${maxVCF}, maxDepth: ${maxDepth}\n maxNode: ${maxNode}`);
            //post("vConsole", `color: ${color}, maxVCF: ${maxVCF}, maxDepth: ${maxDepth}\n maxNode: ${maxNode}`);
            while (!done) {
                if (!(loopCount & 0x3FFFF) && typeof post == "function") post({ cmd: "moves", param: { moves: moves, firstColor: color } });
                nColorIdx = stackIdx.pop();
                colorIdx = stackIdx.pop();

                if (colorIdx > -1) {
                    if (colorIdx < 225) {
                        arr[colorIdx] = color;
                        arr[nColorIdx] = INVERT_COLOR[color];
                        moves.push(colorIdx);
                        continueInfo[3][colorIdx] |= continueInfo[color][colorIdx] = color;
                        moves.push(nColorIdx);
                        continueInfo[3][nColorIdx] |= continueInfo[INVERT_COLOR[color]][nColorIdx] = INVERT_COLOR[color];
                        centerIdx = colorIdx;
                        colorIdx & 1 ? sum += colorIdx : sum1 += colorIdx;
                        stackIdx.push(-1, -1);
                        //console.log(`[${movesToName(moves, 500)}]\n [${stackIdx}]\n ${colorIdx}`);
                        //console.warn(`${idxToName(vcfNodes[pCurrentNode])}`)
                    }
                    /*
                    if (loopCount >= logStart && loopCount < (logStart + logCount)) {
                        post("vConsole", loopCount);
                        post("vConsole", `[${movesToName(moves, 800)}]`);
                    }*/

                    //console.info(`${idxToName(vcfNodes[vcfNodes[pCurrentNode + 2]])}`)
                    if (transTableHas(vcfHashTable, moves.length, sum, sum1, moves, arr)) {
                        hasCount++;
                        //console.error(`[${movesToName(moves, 500)}]`);
                    }
                    else {
                        if (moves.length < maxDepth) {
                            //console.log(`[${movesToName(moves, 500)}]`);
                            testFour(arr, color, infoArr);
                            let nLevel = moves.length ? getLevelPoint(moves[moves.length - 1], INVERT_COLOR[color], arr) : getLevel(arr, INVERT_COLOR[color]);
                            //post("vConsole", `nLevel: ${nLevel}`);
                            if ((nLevel & FOUL_MAX_FREE) <= LEVEL_NOFREEFOUR) {
                                let end;
                                if ((nLevel & FOUL_MAX_FREE) == LEVEL_NOFREEFOUR) {
                                    end = 1;
                                    centerIdx = nLevel >>> 8;
                                }
                                else {
                                    end = 225;
                                }

                                let winInfo = 0,
                                    twoPoints = [],
                                    threePoints = [],
                                    elsePoints = [],
                                    fourPoints = [],
                                    isConcat = true;

                                for (let i = end - 1; i >= 0; i--) {
                                    let idx = aroundIdx(centerIdx, i),
                                        max = infoArr[idx] & FOUL_MAX;
                                    if (max == FOUR_NOFREE) { //freeFour win
                                        arr[idx] = color;
                                        let levelInfo = getLevelPoint(idx, color, arr),
                                            level = levelInfo & 0xff;
                                        arr[idx] = 0;
                                        if (level >= LEVEL_CATCHFOUL) { //
                                            if ((winInfo & 0xff) < level) winInfo = idx << 8 | level;
                                            //post({cmd: "log", param: `winInfo: [${idxToName(idx)}], level: ${level}`})
                                        }
                                        else {
                                            fourPoints.push(idx, levelInfo >> 8);
                                        }
                                    }
                                }

                                if (winInfo) {
                                    let idx = winInfo >> 8 & 0xff,
                                        wMoves = moves.concat(idx);
                                    simpleVCF(color, vcfInfo.initArr, wMoves);
                                    pushWinMoves(vcfWinMoves, wMoves);
                                    isConcat = false;
                                    vcfInfo.vcfCount++;
                                    maxVCF > 1 && "post" in self && post({ cmd: "vcfInfo", param: { vcfInfo: vcfInfo } });
                                    transTablePush(vcfHashTable, moves.length, sum, sum1, moves, arr);
                                    if (vcfInfo.vcfCount == 0x3FF || vcfWinMoves.length == maxVCF) {
                                        for (let j = moves.length - 1; j >= 0; j--) {
                                            stackIdx.push(-1);
                                        }
                                        stackIdx.push(-1, -1);
                                    }
                                }

                                if (isConcat) {
                                    let fpLen = fourPoints.length;
                                    for (let i = 0; i < fpLen; i += 2) {
                                        arr[fourPoints[i]] = color;
                                    }

                                    for (let i = 0; i < fpLen; i += 2) {
                                        let lineInfo = 0,
                                            idx = fourPoints[i];
                                        for (let direction = 0; direction < 4; direction++) {
                                            let info = MAX_FREE & _testLine(idx, direction, color, arr);
                                            if (info <= FOUR_FREE && info > lineInfo) lineInfo = info;
                                        }
                                        switch (lineInfo) {
                                            case FOUR_FREE:
                                            case THREE_FREE:
                                                threePoints.push(idx, fourPoints[i + 1]);
                                                break;
                                            case FOUR_NOFREE:
                                            case THREE_NOFREE:
                                                threePoints = [idx, fourPoints[i + 1]].concat(threePoints);
                                                break;
                                            case TWO_FREE:
                                            case TWO_NOFREE:
                                                twoPoints.push(idx, fourPoints[i + 1]);
                                                break;
                                            default:
                                                elsePoints.push(idx, fourPoints[i + 1]);
                                        }
                                    }

                                    for (let i = 0; i < fpLen; i += 2) {
                                        arr[fourPoints[i]] = 0;
                                    }

                                    stackIdx = stackIdx.concat(elsePoints, twoPoints, threePoints);

                                    /*if (loopCount >= logStart && loopCount < (logStart + logCount))
                                        post("vConsole", `[${movesToName(stackIdx, 800)}]`);
                                    */
                                }
                            }
                        }
                    }

                }
                else {

                    if (moves.length < HASHTABLE_MAX_MOVESLEN)
                        pushMoveCount++;
                    else
                        pushPositionCount++;
                    transTablePush(vcfHashTable, moves.length, sum, sum1, moves, arr);

                    if (moves.length) {
                        let idx = moves.pop();
                        arr[idx] = 0;
                        idx = moves.pop();
                        arr[idx] = 0;
                        idx & 1 ? sum -= idx : sum1 -= idx;
                    }
                    else {
                        done = true;
                    }
                    //console.info(`[${movesToName(moves, 500)}]\n [${stackIdx}]\n ${colorIdx}`);
                }

                if (++loopCount >= maxNode) { //break loop
                    stackIdx.push(-1, -1);
                }
            }

            vcfInfo.pushMoveCount = pushMoveCount;
            vcfInfo.pushPositionCount = pushPositionCount;
            vcfInfo.hasCount = hasCount;
            vcfInfo.nodeCount = loopCount;
            resetHashTable(vcfHashTable);

            return vcfInfo.winMoves.length ? vcfInfo.winMoves[0] : [];
        }


        function getBlockVCF(arr, color, vcfMoves, includeFour) {
            let fast = true, //默认采用快速搜索防点
                blockPoints = new Array(0), //保存防点
                blockArr = new Array(225); //保存可能防点
            let fourCount = 0, //分析最后一手棋
                infoIdx = 0,
                lineInfoList = new Array(4),
                fFourCount = 0, //分析被抓禁手点
                fInfoIdx = 0,
                fLineInfoList = new Array(4);
            let end = 0,
                len = vcfMoves.length,
                endIdx = vcfMoves[vcfMoves.length - 1]; //保存最后一手棋
            let infoArr = new Array(225);

            testFour(arr, INVERT_COLOR[color], infoArr); // 搜索先手冲4

            if (color == 1 && gameRules == RENJU_RULES) { //黑棋VCF路线是否有复杂禁手防点
                for (let i = 0; i < len; i += 2) {
                    arr[vcfMoves[end++]] = 1;

                    let threeCount = 0;
                    for (let direction = 0; direction < 4; direction++) {
                        let lineInfo = _testLineThree(vcfMoves[i], direction, 1, arr);
                        if (THREE_FREE == (MAX_FREE & lineInfo)) threeCount++;
                        if (end == len && FOUR_FREE == (MAX_FREE & lineInfo)) {
                            fourCount += 2;
                            lineInfoList[infoIdx++] = lineInfo;
                        }
                    }
                    if (threeCount > 1) { // 有33型
                        fast = false;
                        break;
                    }

                    (end < len) && (arr[vcfMoves[end++]] = 2);
                }
            }
            else { //白棋VCF路线是否有复杂禁手防点
                for (let i = 0; i < len; i++) {
                    arr[vcfMoves[end++]] = (i & 1) ? INVERT_COLOR[color] : color;
                }

                for (let direction = 0; direction < 4; direction++) {
                    let lineInfo = _testLineFour(endIdx, direction, color, arr);
                    switch (lineInfo & FOUL_MAX_FREE) {
                        case FOUR_FREE:
                        case LINE_DOUBLE_FOUR:
                            fourCount += 2;
                            lineInfoList[infoIdx++] = lineInfo;
                            break;
                        case FOUR_NOFREE:
                            fourCount += 1;
                            lineInfoList[infoIdx++] = lineInfo;
                            break;
                    }
                }

                if (fourCount == 1) {
                    let foulIdx = getBlockFourPoint(endIdx, arr, lineInfoList[0]);
                    blockArr[foulIdx] = 1; //保存抓禁的直接防点
                    arr[foulIdx] = 1;
                    for (let direction = 0; direction < 4; direction++) {
                        let lineInfo = _testLineFour(foulIdx, direction, 1, arr);
                        switch (lineInfo & FOUL_MAX_FREE) {
                            case SIX:
                                fFourCount += 3;
                                break;
                            case LINE_DOUBLE_FOUR:
                                fFourCount += 2;
                                fLineInfoList[fInfoIdx++] = lineInfo;
                                break;
                            case FOUR_FREE:
                                fFourCount += 1;
                                break;
                            case FOUR_NOFREE:
                                fFourCount += 1;
                                fLineInfoList[fInfoIdx++] = lineInfo;
                                break;
                        }
                    }
                    arr[foulIdx] = 0;
                    if (fFourCount < 2) { // 抓33
                        fast = false;
                    }
                }
            }

            if (fast) { // 没有33，快速搜索防点
                if (fourCount == 1) { // 找44解禁点
                    if (fFourCount == 2) {
                        let foulIdx = getBlockFourPoint(endIdx, arr, lineInfoList[0]);
                        for (let i = 0; i < fInfoIdx; i++) {
                            let direction = (fLineInfoList[i] >>> 12) & 0x07,
                                bIdx = getBlockFourPoint(foulIdx, arr, fLineInfoList[i]),
                                isLineFF = LINE_DOUBLE_FOUR == (fLineInfoList[i] & FOUL_MAX_FREE),
                                st;
                            !isLineFF && (arr[bIdx] = 1);
                            for (let abs = -1; abs < 2; abs += 2) {
                                st = isLineFF ? -1 : 0;
                                for (let move = 1; move <= 5; move++) {
                                    let idx = moveIdx(foulIdx, move * abs, direction);
                                    switch (arr[idx]) {
                                        case 0:
                                            st++;
                                            if (st) {
                                                let ov = arr[bIdx];
                                                arr[bIdx] = 0;
                                                arr[idx] = 1;
                                                !isFoul(foulIdx, arr) && (blockArr[idx] = 1);
                                                arr[idx] = 0;
                                                arr[bIdx] = ov;
                                                move = 6;
                                            }
                                            break;
                                        case -1:
                                        case 2:
                                            move = 6;
                                            break;
                                    }
                                }
                            }
                            arr[bIdx] = 0;
                        }
                    }
                    //alert(`1_${movesToName(blockArr.map((v,idx)=>v && idx).filter(v => v))}`)
                }
                else if (fourCount == 2) {
                    if (infoIdx == 1) { // 找活4，单线44防点
                        let direction = (lineInfoList[0] >>> 12) & 0x07,
                            bPoints = new Array(2);
                        for (let abs = -1; abs < 2; abs += 2) {
                            for (let move = 1; move <= 4; move++) {
                                let idx = moveIdx(endIdx, move * abs, direction);
                                if (0 == arr[idx]) {
                                    blockArr[idx] = 1;
                                    bPoints[(abs + 1) / 2] = idx;
                                    break;
                                }
                            }
                        }

                        //排除连活三多余防点
                        if (FOUR_FREE == (FOUL_MAX_FREE & lineInfoList[0])) {
                            arr[endIdx] = 0;
                            for (let i = 0; i < 2; i++) {
                                arr[bPoints[i]] = color;
                                if (FOUR_FREE == (FOUL_MAX_FREE & _testLineFour(bPoints[i], direction, color, arr))) {
                                    if (gameRules != RENJU_RULES || color != 1 || !isFoul(bPoints[i], arr)) {
                                        blockArr[bPoints[(i + 1) % 2]] = 0; //连活三如果有两个活四点，排除一个防点
                                        arr[bPoints[i]] = 0;
                                        break;
                                    }
                                }
                                arr[bPoints[i]] = 0;
                            }
                            arr[endIdx] = color;
                        }
                    }
                    else { //infoIdx == 2，双线44防点
                        let idx = getBlockFourPoint(endIdx, arr, lineInfoList[0]);
                        blockArr[idx] = 1;
                        idx = getBlockFourPoint(endIdx, arr, lineInfoList[1]);
                        blockArr[idx] = 1;
                    }
                }

                arr[vcfMoves[--end]] = 0;
                blockArr[vcfMoves[end]] = 1; // 搜索直接防和反防
                const AND = INVERT_COLOR[color] == 1 && gameRules == RENJU_RULES ? FOUL_MAX : MAX;
                for (let i = end - 1; i >= 0; i -= 2) {
                    end--;
                    for (let direction = 0; direction < 4; direction++) {
                        let lineInfoList = new Array(9);
                        testLinePointFour(vcfMoves[end], direction, INVERT_COLOR[color], arr, lineInfoList);
                        for (let j = 0; j < 9; j++) {
                            if (FOUR_NOFREE == (AND & lineInfoList[j])) {
                                let idx = moveIdx(vcfMoves[end], j - 4, direction);
                                blockArr[idx] = 1;
                            }
                        }
                    }
                    arr[vcfMoves[end]] = 0;
                    blockArr[vcfMoves[end]] = 1;
                    arr[vcfMoves[--end]] = 0;
                    blockArr[vcfMoves[end]] = 1;
                }

                //alert(`2_${movesToName(blockArr.map((v,idx)=>v && idx).filter(v => v))}`)

                for (let i = 0; i < 225; i++) {
                    if (FOUR_NOFREE == (FOUL_MAX & infoArr[i])) {
                        blockArr[i] = includeFour ? 1 : 0;
                    }
                    if (blockArr[i] &&
                        (gameRules != RENJU_RULES || color != 2 || !isFoul(i, arr))) {
                        blockPoints.push(i);
                    }
                }

                //alert(`3_${movesToName(blockArr.map((v,idx)=>v && idx).filter(v => v))}`)
            }
            else { // 有33，暴力搜索防点

                for (let i = 0; i < end; i++) {
                    arr[vcfMoves[i]] = 0;
                }

                for (let i = 0; i < 225; i++) {
                    let isPush = FOUR_NOFREE == (FOUL_MAX & infoArr[i]) ? includeFour : true;
                    if (isPush && arr[i] == 0 &&
                        (gameRules != RENJU_RULES || color != 2 || !isFoul(i, arr))) {
                        arr[i] = INVERT_COLOR[color];
                        if (!isVCF(color, arr, vcfMoves)) {
                            blockPoints.push(i);
                        }
                        arr[i] = 0;
                    }
                }
            }

            return blockPoints;
        }


        //--------------------------------------------------

        exports.setGameRules = rules => gameRules = rules;
        exports.moveIdx = moveIdx;
        exports.getArrValue = getArrValue;
        exports.aroundIdx = aroundIdx;
        exports.getAroundIdxCount = getAroundIdxCount;
        exports.testLine = testLine;
        exports.testLineFoul = testLineFoul;
        exports.testLineFour = testLineFour;
        exports.testLineThree = testLineThree;
        exports.testLinePoint = testLinePoint;
        exports.testLinePointFour = testLinePointFour;
        exports.testLinePointThree = testLinePointThree;
        exports.getBlockFourPoint = getBlockFourPoint;
        exports.getBlockThreePoints = getBlockThreePoints;
        exports.getFreeFourPoint = getFreeFourPoint;
        exports.isFoul = isFoul;
        exports.testPointFour = testPointFour;
        exports.testFive = testFive;
        exports.testFour = testFour;
        exports.testThree = testThree;
        exports.getLevel = getLevel;
        exports.getLevelPoint = getLevelPoint;
        exports.isVCF = isVCF;
        exports.simpleVCF = simpleVCF;
        exports.findVCF = findVCF;
        exports.isGameOver = isGameOver;
        exports.getLevelB = getLevelB;
        exports.getBlockVCF = getBlockVCF;
        //test

    })))
}
