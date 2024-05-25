//if (self.SCRIPT_VERSIONS) self.SCRIPT_VERSIONS["EvaluatorWebassembly"] = "2024.23206";

function loadEvaluatorWebassembly() {

    (function(global, factory) {
        (global = global || self, factory(global));
    }(this, (function(exports) {
        'use strict';
        //console.log(exports);
        let wGlobal,
            memory;

        function grow(pages = 100) {
            try {
                memory.grow(pages);
                return pages;
            }
            catch (err) {
                alert(err);
            }
        }

        let url = /Worker/.exec(`${exports}`) ? "Evaluator.wasm" : "eval/Evaluator.wasm",
            importObject = {
                env: {
                    memcpy: function(param1, param2, param3) {
                        console.log(`memcpy: param1=${param1}, param2=${param2}, length=${param3}`);
                        if ((param1 & 1) == 0 && (param2 & 1) == 0 && (param3 & 1) == 0) {
                            param3 >>= 1;
                            let buf1 = new Uint16Array(memory.buffer, param1, param3),
                                buf2 = new Uint16Array(memory.buffer, param2, param3);
                            for (let i = 0; i < param3; i++) {
                                buf1[i] = buf2[i];
                            }
                        }
                        else {
                            let buf1 = new Uint8Array(memory.buffer, param1, param3),
                                buf2 = new Uint8Array(memory.buffer, param2, param3);
                            for (let i = 0; i < param3; i++) {
                                buf1[i] = buf2[i];
                            }
                        }

                        return param1;
                    },
                    memset: function(param1, param2, param3) {
                        //console.log(`memset: start=${param1}, value=${param2}, length=${param3}`);
                        if ((param1 & 3) == 0 && (param3 & 3) == 0) {
                            param2 |= ((param2 << 24) | (param2 << 16) | (param2 << 8));
                            param3 >>= 2;
                            let buf = new Uint32Array(memory.buffer, param1, param3);
                            for (let i = 0; i < param3; i++) {
                                buf[i] = param2;
                            }
                        }
                        else if ((param1 & 1) == 0 && (param3 & 1) == 0) {
                            param2 |= (param2 << 8);
                            param3 >>= 1;
                            let buf = new Uint16Array(memory.buffer, param1, param3);
                            for (let i = 0; i < param3; i++) {
                                buf[i] = param2;
                            }
                        }
                        else {
                            let buf = new Uint8Array(memory.buffer, param1, param3);
                            for (let i = 0; i < param3; i++) {
                                buf[i] = param2;
                            }
                        }

                        return param1;
                    },
                    _Z3logPhj: function(buf, len) {
                        console.log(`[${movesToName(new Uint8Array(memory.buffer, buf, len))}]`);
                    },
                    _Z3logd: function(num) {
                        console.log(`log: ${num}`);
                    },
                    _Z4growj: grow,
                }
            };

        fetch(url.split("?")[0].split("#")[0] + "?v=" + new Date().getTime())
            .then(response => {
                return response.arrayBuffer()
            })
            .then(bytes => {
                //通过浏览器提供的标准WebAssembly接口来编译和初始化一个Wasm模块
                return WebAssembly.instantiate(bytes, importObject);
            })
            .then(results => {
                wGlobal = results.instance.exports;
                memory = wGlobal.memory;

                const BOARD_SIZE = 15;
                const RULES = 2;
                const IN_BUF = wGlobal._Z11getInBufferv();
                const OUT_BUF = wGlobal._Z12getOutBufferv();
                const ARR = IN_BUF;
                const INFOLIST = ARR + 228;
                const INFOARR = INFOLIST + 24;
                const MOVES = INFOARR + 456;
                const MOVESLEN = MOVES + 227;
                const INITARR = MOVESLEN + 1;


                function putArr(arr) {
                    let buf = new Int8Array(memory.buffer, ARR, 226);
                    for (let i = 0; i < 226; i++) {
                        buf[i] = arr[i];
                    }
                    return ARR;
                }

                function putInitArr(arr) {
                    let buf = new Int8Array(memory.buffer, INITARR, 226);
                    for (let i = 0; i < 226; i++) {
                        buf[i] = arr[i];
                    }
                    return INITARR;
                }

                function putMoves(moves) {
                    let buf = new Uint8Array(memory.buffer, MOVES, moves.length);
                    for (let i = moves.length - 1; i >= 0; i--) {
                        buf[i] = moves[i];
                    }
                    return MOVES;
                }

                function getInfoList(infoList) {
                    let buf = new Uint16Array(memory.buffer, INFOLIST, 9);
                    for (let i = 8; i >= 0; i--) {
                        infoList[i] = buf[i];
                    }
                }

                function getInfoArr(infoArr) {
                    let buf = new Uint16Array(memory.buffer, INFOARR, 225);
                    for (let i = 224; i >= 0; i--) {
                        infoArr[i] = buf[i];
                    }
                }
                /*
                function getVcfInfo(vcfInfo) {
                    let pInfo = wGlobal._Z10getVcfInfov(),
                        buf = new Uint32Array(memory.buffer, pInfo, 8),
                        pInitArr = buf[0],
                        initArr = new Int8Array(memory.buffer, pInitArr, 226),
                        pWinMovesList = buf[7],
                        winMovesList = new Uint32Array(memory.buffer, pWinMovesList, 2),
                        winMoves = new Uint8Array(memory.buffer, winMovesList[1], 268),
                        winMovesLen = winMoves[4];
                    vcfWinMoves.length = 0;
                    vcfWinMoves[0] = TypedArray2Array(winMoves.slice(12, 12 + winMovesLen));
                    vcfInfo.initArr = initArr.slice(0, 226);
                    vcfInfo.color = buf[1] & 0xff;
                    vcfInfo.maxVCF = (buf[1] >> 8) & 0xff;
                    vcfInfo.maxDepth = (buf[1] >> 16) & 0xff;
                    vcfInfo.vcfCount = (buf[1] >> 24) & 0xff;
                    vcfInfo.maxNode = buf[2];
                    vcfInfo.pushMoveCount = buf[3];
                    vcfInfo.pushPositionCount = buf[4];
                    vcfInfo.hasCount = buf[5];
                    vcfInfo.nodeCount = buf[6];
                }*/

                function getArrValue(idx, move, direction, arr) {
                    return wGlobal._Z11getArrValuehchPc(idx, move, direction, putArr(arr));
                }

                function testLine(idx, direction, color, arr) {
                    let rt,
                        ov = arr[idx];
                    arr[idx] = color;
                    rt = wGlobal._Z8testLinehhcPc(idx, direction, color, putArr(arr));
                    arr[idx] = ov;
                    return rt;
                }

                function testLineFoul(idx, direction, color, arr) {
                    let rt,
                        ov = arr[idx];
                    arr[idx] = color;
                    rt = wGlobal._Z12testLineFoulhhcPc(idx, direction, color, putArr(arr));
                    arr[idx] = ov;
                    return rt;
                }

                function testLineFour(idx, direction, color, arr) {
                    let rt,
                        ov = arr[idx];
                    arr[idx] = color;
                    rt = wGlobal._Z12testLineFourhhcPc(idx, direction, color, putArr(arr));
                    arr[idx] = ov;
                    return rt;
                }

                function testLineThree(idx, direction, color, arr) {
                    let rt,
                        ov = arr[idx];
                    arr[idx] = color;
                    rt = wGlobal._Z13testLineThreehhcPc(idx, direction, color, putArr(arr));
                    arr[idx] = ov;
                    return rt;
                }

                function testLinePoint(idx, direction, color, arr, lineInfoList) {
                    wGlobal._Z13testLinePointhhcPcPt(idx, direction, color, putArr(arr), INFOLIST);
                    getInfoList(lineInfoList);
                }

                function testLinePointFour(idx, direction, color, arr, lineInfoList) {
                    wGlobal._Z17testLinePointFourhhcPcPt(idx, direction, color, putArr(arr), INFOLIST);
                    getInfoList(lineInfoList);
                }

                function testLinePointThree(idx, direction, color, arr, lineInfoList) {
                    wGlobal._Z18testLinePointThreehhcPcPt(idx, direction, color, putArr(arr), INFOLIST);
                    getInfoList(lineInfoList);
                }

                function getBlockFourPoint(idx, arr, lineInfo) {
                    return wGlobal._Z17getBlockFourPointhPct(idx, putArr(arr), lineInfo);
                }

                function getBlockThreePoints(idx, arr, lineInfo) {
                    let rt = wGlobal._Z19getBlockThreePointshPct(idx, putArr(arr), lineInfo);
                    return [rt & 0xff, (rt >> 8) & 0xff, (rt >> 16) & 0xff, (rt >> 24) & 0xff];
                }

                function getFreeFourPoint(idx, arr, lineInfo) {
                    let rt = wGlobal._Z16getFreeFourPointhPct(idx, putArr(arr), lineInfo);
                    return [rt & 0xff, (rt >> 8) & 0xff, (rt >> 16) & 0xff, (rt >> 24) & 0xff];
                }

                function isFoul(idx, arr) {
                    if (gameRules != RENJU_RULES) return false;
                    return wGlobal._Z6isFoulhPc(idx, putArr(arr));
                }

                function testPointFour(idx, color, arr) {
                    return wGlobal._Z13testPointFourhcPc(idx, color, putArr(arr));
                }

                function testFive(arr, color, infoArr) {
                    wGlobal._Z8testFivePccPt(putArr(arr), color, INFOARR);
                    getInfoArr(infoArr);
                }

                function testFour(arr, color, infoArr) {
                    wGlobal._Z8testFourPccPt(putArr(arr), color, INFOARR);
                    getInfoArr(infoArr);
                }

                function testThree(arr, color, infoArr) {
                    wGlobal._Z9testThreePccPt(putArr(arr), color, INFOARR);
                    getInfoArr(infoArr);
                }
                
                function isGameOver(arr, color) {
                    return wGlobal._Z10isGameOverPcc(putArr(arr), color);
                }

                function getLevel(arr, color) {
                    return wGlobal._Z8getLevelPcc(putArr(arr), color);
                }
                
                function getLevelPoint(idx, color, arr) {
                    return wGlobal._Z13getLevelPointhcPc(idx, color, putArr(arr));
                }

                function isVCF(color, arr, moves) {
                    return wGlobal._Z5isVCFcPcPhh(color, putArr(arr), putMoves(moves), moves.length);
                }

                function simpleVCF(color, arr, moves) {
                    let bufMoves = new Uint8Array(memory.buffer, MOVES, moves.length),
                        bufLen = new Uint8Array(memory.buffer, MOVESLEN, 1);
                    bufLen[0] = moves.length;
                    wGlobal._Z9simpleVCFcPcPhRh(color, putArr(arr), putMoves(moves), MOVESLEN);
                    moves.leng = bufLen[0];
                    for (let i = moves.leng - 1; i >= 0; i--) moves[i] = bufMoves[i];
                    return moves;
                }
                /*
                function findVCF(arr, color, maxVCF, maxDepth, maxNode) {
                    wGlobal._Z7findVCFPcchhj(putArr(arr), color, maxVCF, maxDepth, maxNode);
                    getVcfInfo(vcfInfo);
                }*/

                function findVCF(arr, color, maxVCF, maxDepth, maxNode) {
                    //if (isGameOver(arr, 1) || isGameOver(arr,2) || getLevel(arr, color) >= LEVEL_NOFREEFOUR) return [];
                    let int8Arr = new Int8Array(memory.buffer, ARR, 226);
                    putArr(arr);
                    putInitArr(arr);
                    resetVCF(arr, color, maxVCF, maxDepth, maxNode);
                    let centerIdx = 112,
                        colorIdx,
                        nColorIdx,
                        infoArr = new Uint16Array(memory.buffer, INFOARR, 225),
                        moves = new Array(0),
                        stackIdx = [-1, -1, 225, 225],
                        sum = 0,
                        sum1 = 0,
                        position = new Uint8Array(225),
                        done = false,
                        pushMoveCount = 0,
                        pushPositionCount = 0,
                        hasCount = 0,
                        loopCount = 0,
                        continueInfo = vcfInfo.continueInfo;

                    while (!done) {
                        if (!(loopCount & 0x3FFFF) && typeof post == "function") post({ cmd: "moves", param: { moves: moves, firstColor: color } });
                        nColorIdx = stackIdx.pop();
                        colorIdx = stackIdx.pop();

                        if (colorIdx > -1) {
                            if (colorIdx < 225) {
                                int8Arr[colorIdx]  = color;
                                int8Arr[nColorIdx] = INVERT_COLOR[color];
                                position[colorIdx] = 1;
                                position[nColorIdx] = 2;
                                moves.push(colorIdx);
                                continueInfo[3][colorIdx] |= continueInfo[color][colorIdx] = color;
                                moves.push(nColorIdx);
                                continueInfo[3][nColorIdx] |= continueInfo[INVERT_COLOR[color]][nColorIdx] = INVERT_COLOR[color];
                                centerIdx = colorIdx;
                                colorIdx & 1 ? sum += colorIdx : sum1 += colorIdx;
                                stackIdx.push(-1, -1);
                            }
                            
                            if (transTableHas(vcfHashTable, moves.length, sum, sum1, moves, position)) {
                                hasCount++;
                            }
                            else {
                                if (moves.length < maxDepth) {
                            
                                    wGlobal._Z8testFourPccPt(ARR, color, INFOARR);
                                    let nLevel = moves.length ? wGlobal._Z13getLevelPointhcPc(moves[moves.length - 1], INVERT_COLOR[color], ARR) : wGlobal._Z8getLevelPcc(ARR, INVERT_COLOR[color]);
                                    
                                    if ((nLevel & FOUL_MAX_FREE) <= LEVEL_NOFREEFOUR) {
                                        let end;
                                        if ((nLevel & FOUL_MAX_FREE) == LEVEL_NOFREEFOUR) {
                                            end = 1;
                                            centerIdx = nLevel >> 8;
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
                                            let idx = wGlobal._Z9aroundIdxhh(centerIdx, i),
                                                max = infoArr[idx] & FOUL_MAX;
                                            if (max == FOUR_NOFREE) {
                                                int8Arr[idx] = color;
                                                let levelInfo = wGlobal._Z13getLevelPointhcPc(idx, color, ARR),
                                                    level = levelInfo & 0xff;
                                                int8Arr[idx] = 0;
                                                
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
                                                winMoves = moves.concat(idx),
                                                bufLen = new Uint8Array(memory.buffer, MOVESLEN, 1);
                                            bufLen[0] = winMoves.length;
                                            wGlobal._Z9simpleVCFcPcPhRh(color, INITARR, putMoves(winMoves), MOVESLEN);
                                            pushWinMoves(vcfWinMoves, new Uint8Array(memory.buffer, MOVES, bufLen[0]));
                                            //pushWinMoves(vcfWinMoves, winMoves);
                                            isConcat = false;
                                            vcfInfo.vcfCount++;
                                            maxVCF > 1 && "post" in self && post({ cmd: "vcfInfo", param: { vcfInfo: vcfInfo } });
                                            transTablePush(vcfHashTable, moves.length, sum, sum1, moves, position);
                                            
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
                                                int8Arr[fourPoints[i]] = color;
                                            }

                                            for (let i = 0; i < fpLen; i += 2) {
                                                let lineInfo = 0,
                                                    idx = fourPoints[i];
                                                for (let direction = 0; direction < 4; direction++) {
                                                    let info = MAX_FREE & wGlobal._Z8testLinehhcPc(idx, direction, color, ARR);
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
                                                int8Arr[fourPoints[i]] = 0;
                                            }

                                            stackIdx = stackIdx.concat(elsePoints, twoPoints, threePoints);
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
                            transTablePush(vcfHashTable, moves.length, sum, sum1, moves, position);

                            if (moves.length) {
                                let idx = moves.pop();
                                int8Arr[idx] = position[idx] = 0;
                                idx = moves.pop();
                                int8Arr[idx] = position[idx] = 0;
                                idx & 1 ? sum -= idx : sum1 -= idx;
                            }
                            else {
                                done = true;
                            }
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
                    wGlobal._Z11getBlockVCFPccPhhb(putArr(arr), color, putMoves(vcfMoves), vcfMoves.length, includeFour);
                    let pMoves = wGlobal._Z17getBlockVCFBufferv(),
                        movesLen = new Uint8Array(memory.buffer, pMoves, 1)[0];
                    return TypedArray2Array(new Uint8Array(memory.buffer, pMoves + 1, movesLen));
                }


                wGlobal._Z4inithh(BOARD_SIZE, RULES);
                
            //----------------------------------------------------------------
                
                exports.setGameRules = rules => { gameRules = rules; wGlobal._Z4inithh(BOARD_SIZE, rules)};
                exports.moveIdx = wGlobal._Z7moveIdxhch;
                exports.getArrValue = getArrValue;
                exports.aroundIdx = wGlobal._Z9aroundIdxhh;
                exports.getAroundIdxCount = wGlobal._Z17getAroundIdxCounthh;
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
                exports.isGameOver = isGameOver;
                exports.getLevel = getLevel;
                exports.getLevelPoint = getLevelPoint;
                exports.isVCF = isVCF;
                exports.simpleVCF = simpleVCF;
                exports.findVCF = findVCF;
                exports.getLevelB = getLevelB;
                exports.getBlockVCF = getBlockVCF;
            })
    })))



}
