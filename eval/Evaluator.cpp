#define NULL 0
typedef unsigned char BYTE;
typedef unsigned int UINT; 
typedef unsigned short DWORD;

const UINT _ONE_KB = 1024;
const UINT _PAGE_SIZE = 1024*64; //64K
const UINT _IO_BUFFER_SIZE = _PAGE_SIZE;

const BYTE FIND_ALL = 0;
const BYTE ONLY_FREE = 1; // 只找活3，活4
const BYTE ONLY_NOFREE = 2; // 只找眠3，眠4
const BYTE ONLY_VCF = 1; // 只找做VCF点
const BYTE ONLY_SIMPLE_WIN = 2; // 只找43级别做杀点

const BYTE GOMOKU_RULES = 1; //无禁
const BYTE RENJU_RULES = 2; //有禁

//---------------- color --------------------

const char BLACK_COLOR = 1;
const char WHITE_COLOR = 2;
const char INVERT_COLOR[3] = {0, 2, 1}; //利用数组反转棋子颜色

//---------------- level --------------------

const BYTE LEVEL_MARK_FREEFOUR = 0x80;
const BYTE LEVEL_MARK_LINE_DOUBLEFOUR = 0x40;
const BYTE LEVEL_MARK_MULTILINE_DOUBLEFOUR = 0x20;
const BYTE LEVEL_FOUL = 30;
const BYTE LEVEL_WIN = 10;
const BYTE LEVEL_FREEFOUR = 9;
const BYTE LEVEL_NOFREEFOUR = 8;
const BYTE LEVEL_DOUBLEFREETHREE = 7;
const BYTE LEVEL_DOUBLEVCF = LEVEL_DOUBLEFREETHREE;
const BYTE LEVEL_FREETHREE = 6;
const BYTE LEVEL_VCF = LEVEL_FREETHREE;
const BYTE LEVEL_VCT = 4;
const BYTE LEVEL_NONE = 0;
const BYTE LEVEL_TRUE_FREEFOUR = LEVEL_MARK_FREEFOUR | LEVEL_FREEFOUR;
const BYTE LEVEL_LINE_DOUBLEFOUR = LEVEL_MARK_LINE_DOUBLEFOUR | LEVEL_FREEFOUR;
const BYTE LEVEL_MULTILINE_DOUBLEFOUR = LEVEL_MARK_MULTILINE_DOUBLEFOUR | LEVEL_FREEFOUR;
const BYTE LEVEL_CATCHFOUL = 0 | LEVEL_FREEFOUR;

//--------------- lineInfo ------------------

const DWORD FREE = 1; //0b00000001
const DWORD MAX = 14; //0b00001110
const DWORD MAX_FREE = 15; //0b00001111
const DWORD FOUL = 16; //0b00010000
const DWORD FOUL_FREE = 17; //0b00010001
const DWORD FOUL_MAX = 30; //0b00011110
const DWORD FOUL_MAX_FREE = 31; //0b00011111
const DWORD MARK_MOVE = 224; //0b11100000
const DWORD FREE_COUNT = 0x0700; //0b00000111 00000000
const DWORD ADD_FREE_COUNT = 0x800; //0b00001000 00000000
const DWORD MAX_COUNT = 0x7000; //0b01110000 00000000
const DWORD DIRECTION = 0x7000; //0b01110000 00000000
const DWORD ADD_MAX_COUNT = 0x8000; //0b10000000 00000000
const DWORD ZERO = 0;
const DWORD ONE_FREE = 3;
const DWORD ONE_NOFREE = 2;
const DWORD TWO_FREE = 5;
const DWORD TWO_NOFREE = 4;
const DWORD THREE_FREE = 7;
const DWORD THREE_NOFREE = 6;
const DWORD FOUR_FREE = 9;
const DWORD FOUR_NOFREE = 8;
const DWORD LINE_DOUBLE_FOUR = 24;
const DWORD FIVE = 10;
const DWORD SIX = 28;
const DWORD SHORT = 14; //空间不够


//  --------------------------  --------------------------
BYTE cBoardSize = 15;
BYTE gameRules = RENJU_RULES;

BYTE out_buffer[4] = {0};
BYTE in_buffer[_IO_BUFFER_SIZE] = {0};

BYTE idxLists[4 * 29 * 43] = {0}; // = createIdxLists();
BYTE idxTable[226 * 29 * 4] = {0}; // = createIdxTable();
BYTE aroundIdxTable[(15 + 225) * 225] = {0}; // = createAroundIdxTable();

char valueList[12] = {0}; //testLine, testLineThree...
BYTE stackBuffer[36 * 12] = {0}; // isFoul stackBuffer
BYTE getPoints[4] = {0}; // getBlockThreePoints, getFreeFourPoint
BYTE freeFourPoints[4] = {0}; //testThree

char cEmptyMoves[16] = {0}; //testLinePoint...
BYTE emptyList[16] = {0}; //testFive ...
BYTE emptyMoves[16] = {0}; //testLinePoint...testFive ...
DWORD markArr[228] = {0};

DWORD infoArr[228] = {0}; //level

DWORD vcfInfoArr[228] = {0};   // findVCF
char vcfInitArr[228] = {0};
BYTE vcfMoves[228] = {0},
    vcfTwoPoints[228] = {0},
    vcfThreePoints[228] = {0},
    vcfFreeThreePoints[228] = {0},
    vcfElsePoint[228] = {0},
    vcfFourPoints[228] = {0},
    vcfStack[_PAGE_SIZE] = {0},
    isvcfValues[228] = {0},    // isVCF
    svcfFourPoints[228] = {0}, //simpleVCF
    svcfVCF[228] = {0};

BYTE blockBuf[1024] = {0}; // getBlockVCF
BYTE* const blockPoints = blockBuf;// getBlockVCF
BYTE* const blockArr = (blockBuf + 228); //保存可能防点
DWORD* const blockLineInfos = (DWORD*)(blockBuf + 456);
DWORD* const blockFLineInfos= (DWORD*)(blockBuf + 464);
DWORD* const blockLineInfoList = (DWORD*)(blockBuf + 472);
DWORD* const blockInfoArr = (DWORD*)(blockBuf + 496);
BYTE* const tempBlockPoints = (blockBuf + 952);

struct Moves {
    struct Moves* next;
    BYTE len;
    BYTE* moves;
};

struct MovesList {
    BYTE len;
    struct Moves* firstMoves;
};

struct VCFinfo {
    char* initArr;
    char color;
    BYTE maxVCF;
    BYTE maxDepth;
    BYTE vcfCount;
    UINT maxNode;
    UINT pushMoveCount;
    UINT pushPositionCount;
    UINT hasCount;
    UINT nodeCount;
    struct MovesList* winMoves;
};

struct VCFinfo vcfInfo = {0};
struct MovesList vcfWinMoves = {0};
BYTE bufVcfWinMoves[_PAGE_SIZE] = {0};
BYTE* const vcfWinMovesEnd = (bufVcfWinMoves + _PAGE_SIZE - 268);
BYTE*  vcfWinMovesNext = bufVcfWinMoves;

//--------------------- log --------------------------

extern void log(double num);

extern void log(BYTE* buf, UINT len);

//--------------------- IO_BUFFER --------------------

BYTE* getInBuffer() {
    return in_buffer;
}

BYTE* getOutBuffer() {
    return out_buffer;
}

struct VCFinfo* getVcfInfo() {
    return &vcfInfo;
}

struct MovesList* getVcfWinMoves() {
    return &vcfWinMoves;
} 

BYTE* getVcfMoves() {
    return vcfMoves;
}

//------------------ copyBuffer ---------------------

void copyBuffer(BYTE* tBuf, BYTE* sBuf, long len) {
    for (long i=0; i<len; i+=2) {
        tBuf[i] = sBuf[i];
    }
    for (long i=1; i<len; i+=2) {
        tBuf[i] = sBuf[i];
    }
}
    
void copyBuffer(DWORD* tBuf, DWORD* sBuf, long len) {
    for (long i=0; i<len; i+=2) {
        tBuf[i] = sBuf[i];
    }
    for (long i=1; i<len; i+=2) {
        tBuf[i] = sBuf[i];
    }
}

void copyBuffer(UINT* tBuf, UINT* sBuf, long len) {
    for (long i=0; i<len; i+=2) {
        tBuf[i] = sBuf[i];
    }
    for (long i=1; i<len; i+=2) {
        tBuf[i] = sBuf[i];
    }
}

//------------------ setBuffer ---------------------

void setBuffer(BYTE* buf, long len, BYTE value) {
    for (long i=0; i<len; i+=2) {
        buf[i] = value;
    }
    for (long i=1; i<len; i+=2) {
        buf[i] = value;
    }
}
    
void setBuffer(DWORD* buf, long len, DWORD value) {
    for (long i=0; i<len; i+=2) {
        buf[i] = value;
    }
    for (long i=1; i<len; i+=2) {
        buf[i] = value;
    }
}

void setBuffer(UINT* buf, long len, UINT value) {
    for (long i=0; i<len; i+=2) {
        buf[i] = value;
    }
    for (long i=1; i<len; i+=2) {
        buf[i] = value;
    }
}

//--------------------- idxLists ---------------------

// 创建空白lists 用来保存阳线，阴线的idx
void createEmptyLists() {
    BYTE outIdx = 225;
    setBuffer(idxLists, 4 * 29 * 43, outIdx);
}

//保存棋盘区域内每一条线的idx，每条线按照 line[n] < line[n+1] 排序
void createIdxLists() {
    BYTE* List = NULL;
    
    //direction = 0
    for (BYTE y = 0; y < 15; y++) {
        List = idxLists + y * 43;
        for (BYTE x = 0; x < 15; x++) {
            if (x < cBoardSize && y < cBoardSize) List[14 + x] = x + y * 15;
        }
    }
    
    //direction = 1
    for (BYTE x = 0; x < 15; x++) {
        List = idxLists + (29 + x) * 43;
        for (BYTE y = 0; y < 15; y++) {
            if (x < cBoardSize && y < cBoardSize) List[14 + y] = x + y * 15;
        }
    }
    
    //direction = 2
    for (BYTE i = 0; i < 15; i++) { // x + (14-y) = i, y = x + 14 - i
        List = idxLists + (2 * 29 + i) * 43;
        for (BYTE j = 0; j <= i; j++) {
            BYTE x = 0 + j,
                y = x + 14 - i;
            if (x < cBoardSize && y < cBoardSize) List[14 + j] = x + y * 15;
        }
    }
    for (BYTE i = 0; i < 14; i++) { // (14-x) + y = i, y = i - 14 + x;
        List = idxLists + (2 * 29 + 14 + 14 - i) * 43;
        for (BYTE j = 0; j <= i; j++) {
            BYTE x = 14 - i + j,
                y = i - 14 + x;
            if (x < cBoardSize && y < cBoardSize) List[14 + j] = x + y * 15;
        }
    }
    
    //direction = 3
    for (BYTE i = 0; i < 15; i++) { // x + y = i, y = i - x
        List = idxLists + (3 * 29 + i) * 43;
        for (BYTE j = 0; j <= i; j++) {
            BYTE x = i - j,
                y = i - x;
            if (x < cBoardSize && y < cBoardSize) List[14 + j] = x + y * 15;
        }
    }
    for (BYTE i = 0; i < 14; i++) { // (14-x)+(14-y) = i, y = 28 - i - x
        List = idxLists + (3 * 29 + 14 + 14 - i) * 43;
        for (BYTE j = 0; j <= i; j++) {
            BYTE x = 14 - j,
                y = 28 - i - x;
            if (x < cBoardSize && y < cBoardSize) List[14 + j] = x + y * 15;
        }
    }
    
}

//------------------------- idxTable ----------------------

// 创建索引表，快速读取阳线，阴线idx. 超出棋盘范围返回 outIdx = 225
void createIdxTable() {
    BYTE outIdx = 225;
    
    for (BYTE idx = 0; idx < 225; idx++) {
        for (char move = -14; move < 15; move++) {
            for (BYTE direction = 0; direction < 4; direction++) {
                BYTE x = idx % 15,
                    y = ~~(idx/15);
                if (x >= 0 && x < cBoardSize && y >= 0 && y < cBoardSize) {
                    switch (direction) {
                        case 0:
                            idxTable[(idx * 29 + move + 14) * 4 + direction] = idxLists[(direction * 29 + y) * 43 + 14 + x + move];
                            break;
                        case 1:
                            idxTable[(idx * 29 + move + 14) * 4 + direction] = idxLists[(direction * 29 + x) * 43 + 14 + y + move];
                            break;
                        case 2:
                            idxTable[(idx * 29 + move + 14) * 4 + direction] = idxLists[(direction * 29 + x + 14 - y) * 43 + (x + 14 - y < 15 ? 14 + x + move : 14 + y + move)];
                            break;
                        case 3:
                            idxTable[(idx * 29 + move + 14) * 4 + direction] = idxLists[(direction * 29 + x + y) * 43 + (x + y < 15 ? 14 + y + move : 28 - x + move)];
                            break;
                    }
                }
                else {
                    idxTable[(idx * 29 + move + 14) * 4 + direction] = outIdx;
                }
            }
        }
    }
    
    setBuffer(&idxTable[225 * 29 * 4],  29 * 4, outIdx);

}

// 按照阳线，阴线读取idx, 如果参数idx在棋盘外，直接返回 outIdx = 225
BYTE moveIdx(BYTE idx, char move, BYTE direction) {
    return idxTable[(idx * 29 + move + 14) * 4 + direction]; // 7s
}

// 取得一个点的值
char getArrValue(BYTE idx, char move, BYTE direction, char* arr) {
    return arr[moveIdx(idx, move, direction)];
}

//--------------------  aroundIdxTable  ------------------------

void createAroundIdxTable() {
    BYTE outIdx = 225;
    
    for (BYTE idx = 0; idx < 225; idx++) { //RESET
        setBuffer(&aroundIdxTable[idx * 240], 15, 0);
        setBuffer(&aroundIdxTable[idx * 240 + 15], 225, outIdx);
        BYTE pIdx = 0,
            x = idx % 15,
            y = ~~(idx / 15);
        if (x < 0 || x >= cBoardSize || y < 0 || y >= cBoardSize) continue;
        aroundIdxTable[idx * 240 + 15 + pIdx++] = idx;
        aroundIdxTable[idx * 240] = pIdx;
        for (BYTE radius = 1; radius < 15; radius++) {
            BYTE top = moveIdx(idx, -radius, 1),
                right = moveIdx(idx, radius, 0),
                buttom = moveIdx(idx, radius, 1),
                left = moveIdx(idx, -radius, 0),
                nIdx;
            if (top != outIdx) {
                for (char m = -radius + 1; m <= radius; m++) {
                    nIdx = moveIdx(top, m, 0);
                    if (nIdx != outIdx) aroundIdxTable[idx * 240 + 15 + pIdx++] = nIdx;
                }
            }
            if (right != outIdx) {
                for (char m = -radius + 1; m <= radius; m++) {
                    nIdx = moveIdx(right, m, 1);
                    if (nIdx != outIdx) aroundIdxTable[idx * 240 + 15 + pIdx++] = nIdx;
                }
            }
            if (buttom != outIdx) {
                for (char m = radius - 1; m >= -radius; m--) {
                    nIdx = moveIdx(buttom, m, 0);
                    if (nIdx != outIdx) aroundIdxTable[idx * 240 + 15 + pIdx++] = nIdx;
                }
            }
            if (left != outIdx) {
                for (char m = radius - 1; m >= -radius; m--) {
                    nIdx = moveIdx(left, m, 1);
                    if (nIdx != outIdx) aroundIdxTable[idx * 240 + 15 + pIdx++] = nIdx;
                }
            }
            aroundIdxTable[idx * 240 + radius] = pIdx;
        }
    }
}

//返回centerIdx为中心，顺时针绕圈的第index个点，index=0时就直接返回centerIdx
BYTE aroundIdx(BYTE centerIdx, BYTE index) {
    return aroundIdxTable[centerIdx * 240 + 15 + index];
}

//返回centerIdx为中心，radius半径内的点的计数，radius=0时，返回1
BYTE getAroundIdxCount(BYTE centerIdx, BYTE radius) {
    return aroundIdxTable[centerIdx * 240 + radius];
}

//----------------------  Moves  --------------------------

bool isChildMove(BYTE* parentMove, BYTE pLen, BYTE* childMove, BYTE cLen) {
    DWORD j, k;
    // 判断一个颜色,最后一手活四级忽略
    for (k = 1; k < pLen; k += 2) {
        for (j = 1; j < cLen; j += 2) {
            if (childMove[j] == parentMove[k]) {
                break; //找到相同数据
            }
        }
        if (j >= cLen) break; // 没有找到相同数据;
    }
    return k >= pLen;
}

bool isRepeatMove(BYTE* newMove, BYTE* oldMove, BYTE len) {
    return isChildMove(newMove, len, oldMove, len);
}
/*
struct Moves* NewMoves(BYTE*& nextMoves, BYTE* end, BYTE len) {
    if (nextMoves < end) {
        struct Moves* pMoves = (struct Moves*)nextMoves;
        pMoves->next = NULL;
        pMoves->len = len;
        pMoves->moves = (BYTE*)pMoves + sizeof(struct Moves);
        nextMoves += (sizeof(struct Moves) + len);
        return pMoves;
    }
    else 
        return NULL;
}

void addMoves(struct Moves* preMoves, struct Moves* newMoves) {
    struct Moves* next = preMoves->next;
    preMoves->next = newMoves;
    newMoves->next = next;
}

void removeMoves(struct Moves* preMoves) {
    struct Moves* next = preMoves->next;
    preMoves->next = next->next;
}
*//*
// 添加一个成立的VCF分支
bool pushWinMoves(struct MovesList* winMoves, struct Moves* move) {
    struct Moves head = {0};
    struct Moves* preMoves = &head;
    struct Moves* inserMoves = &head;
    struct Moves* nextMoves = winMoves->firstMoves;
    preMoves->next = nextMoves;*/
    /*
    while(nextMoves) {
        if (move->len < nextMoves->len) {
            if (isChildMove(move->moves, move->len, nextMoves->moves, nextMoves->len)) { // 把所有重复的替换掉
                removeMoves(preMoves); //remove nextMoves
                winMoves->len--;
            }
        }
        else {
            if (isChildMove(nextMoves->moves, nextMoves->len, move->moves, move->len)) {
                return false;
            }
            inserMoves = nextMoves;
        }
        
        preMoves = nextMoves;
        nextMoves = preMoves->next;
    }
    */
    /*addMoves(inserMoves, move);
    winMoves->len++;
    winMoves->firstMoves = head.next;
    return true;
}*/

//----------------------  init  --------------------------


int init(BYTE size, BYTE rules) {
    gameRules = rules;
	cBoardSize = size;
	createEmptyLists();
	createIdxLists();
	createIdxTable();
	createAroundIdxTable();
	return 1;
}

//------------------------------------------------------

// (long*)lineInfo,  (lineInfo >> 3) & 0b111
DWORD testLine(BYTE idx, BYTE direction, char color, char* arr) {
    char max = 0; // 0 | 1 | 2 | 3 | 4 | 5 | (SIX >> 1)
    BYTE addFree = 0, // 0 | 1
        addCount = 0,
        free = 0, // >= 0
        count = 0,
        markMove = 0,
        emptyCount = 0,
        colorCount = 0;
    
    // getArrValue(18 - 28次)，使用缓存快一些
    valueList[0] = getArrValue(idx, -5, direction, arr);
    valueList[1] = getArrValue(idx, -4, direction, arr);
    for (char move = -4; move < 5; move++) {
        valueList[move + 6] = getArrValue(idx, move + 1, direction, arr);
        char v = valueList[move + 5];
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
                (color == valueList[move] || color == valueList[move + 6]))
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

            v = valueList[move + 1];
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

    max &= 0b111;
    BYTE lineFoul = (max == 6) || ((max == 4) && (count > 1) && (!free)) ? 1 : 0;

    return (direction << 12) |
        (free << 8) |
        (markMove << 5) |
        (lineFoul << 4) | // set lineFoul
        (max << 1) | // set maxNum
        (free ? 1 : 0); // set free
}



DWORD testLineFoul(BYTE idx, BYTE direction, char color, char* arr) {
    char max = 0; // 0 | 3 | 4 | 5 | (SIX >> 1)
    BYTE addFree = 0, // 0 | 1
        addCount = 0,
        free = 0, // >= 0
        count = 0,
        markMove = 0,
        emptyCount = 0,
        colorCount = 0;
    
    // getArrValue(18 - 28次)，使用缓存快一些
    valueList[0] = getArrValue(idx, -5, direction, arr);
    valueList[1] = getArrValue(idx, -4, direction, arr);
    for (char move = -4; move < 5; move++) {
        valueList[move + 6] = getArrValue(idx, move + 1, direction, arr);
        char v = valueList[move + 5];
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
                if (1 == valueList[move] ||
                    1 == valueList[move + 6])
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
                if (1 == valueList[move] ||
                    1 == valueList[move + 6])
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
                if (1 == valueList[move] ||
                    1 == valueList[move + 6])
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

            v = valueList[move + 1];
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

    return (direction << 12) |
        (free << 8) |
        (markMove << 5) |
        (free ?  (max == 4 ? FOUR_FREE : THREE_FREE) :
            ((max == 4) && (count > 1) ? LINE_DOUBLE_FOUR :
            max << 1));
}



// 不会验证x,y是否有棋子
// idx,点在 direction指定这条线上是不是一个冲4点,活4
DWORD testLineFour(BYTE idx, BYTE direction, char color, char* arr) {
    char max = 0; // 0 | 4 | 5 | (SIX >> 1)
    BYTE addFree = 0, // 0 | 1
        addCount = 0,
        free = 0, // >= 0
        count = 0,
        markMove = 0,
        emptyCount = 0,
        colorCount = 0;

    for (char move = -4; move < 5; move++) {
        // getArrValur(18 - 22次)直接 getArrValur 快一些
        char v = getArrValue(idx, move, direction, arr);
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

    return (direction << 12) |
        (free << 8) |
        (markMove << 5) |
        (free ? FOUR_FREE :
            (count > 1 ? LINE_DOUBLE_FOUR :
            (max << 1)));
}



DWORD testLineThree(BYTE idx, BYTE direction, char color, char* arr) {
    char max = 0; // 0 | 3 | 4 | 5 | (SIX >> 1)
    BYTE addFree = 0, // 0 | 1
        addCount = 0,
        free = 0, // >= 0
        count = 0,
        markMove = 0,
        emptyCount = 0,
        colorCount = 0;
        
    // getArrValue(18 - 28次)，使用缓存快一些
    valueList[0] = getArrValue(idx, -5, direction, arr);
    valueList[1] = getArrValue(idx, -4, direction, arr);
    for (char move = -4; move < 5; move++) {
        valueList[move + 6] = getArrValue(idx, move + 1, direction, arr);
        char v = valueList[move + 5];
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
                    (color == valueList[move] ||
                        color == valueList[move + 6]))
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
                    (color == valueList[move] ||
                        color == valueList[move + 6])) {}
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
                    (color == valueList[move] ||
                        color == valueList[move + 6]))
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

            v = valueList[move + 1];
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
    
    return (direction << 12) |
        (free << 8) |
        (markMove << 5) |
        (free ? (max == 4 ? FOUR_FREE : THREE_FREE) :
            ((max == 4) && (count > 1) ? LINE_DOUBLE_FOUR :
            max << 1));
}



void testLinePoint(BYTE idx, BYTE direction, char color, char* arr, DWORD* lineInfoList) {
    BYTE emptyCount = 0,
        colorCount = 0,
        emptyStart = 0,
        emptyEnd = 0;
    setBuffer(lineInfoList, 10, 0);
    for (char move = -4; move < 5; move++) {
        char v = arr[moveIdx(idx, move, direction)];
        if (v == 0) {
            emptyCount++;
            cEmptyMoves[emptyEnd] = move;
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
                for (BYTE e = emptyStart; e < emptyEnd; e++) {
                    if (colorCount == 4 && (colorCount + 1) > (lineInfoList[emptyList[e]] & MAX)) {
                        lineInfoList[emptyList[e]] = SIX | (BYTE)(move - cEmptyMoves[e]) << 5;
                    }
                }
            }
            else {
                for (BYTE e = emptyStart; e < emptyEnd; e++) {
                    if (((lineInfoList[emptyList[e]] & MAX) >> 1) < colorCount + 1) {
                        lineInfoList[emptyList[e]] = ADD_MAX_COUNT | (BYTE)(move - cEmptyMoves[e]) << 5 | ((colorCount + 1) << 1);
                    }

                    if (((lineInfoList[emptyList[e]] & MAX) >> 1) == colorCount + 1) {
                        if (lineInfoList[emptyList[e]] & ADD_MAX_COUNT) {
                            lineInfoList[emptyList[e]] += 0x1000; //count++
                        }
                        lineInfoList[emptyList[e]] &= 0x7fff;

                        if (lineInfoList[emptyList[e]] & ADD_FREE_COUNT) {
                            lineInfoList[emptyList[e]] += 0x100; //free++
                            lineInfoList[emptyList[e]] = (lineInfoList[emptyList[e]] & 0xff1f) | (BYTE)(move - cEmptyMoves[e]) << 5; //set markMove
                        }
                        lineInfoList[emptyList[e]] |= ADD_FREE_COUNT;
                    }
                }
            }

            v = arr[moveIdx(idx, move - 4, direction)];
            if (v == 0) {
                emptyCount--;
                emptyStart++;
                for (BYTE e = emptyStart; e < emptyEnd; e++) {
                    lineInfoList[emptyList[e]] |= ADD_MAX_COUNT; //set addCount
                }
            }
            else {
                colorCount--;
                for (BYTE e = emptyStart; e < emptyEnd; e++) {
                    lineInfoList[emptyList[e]] &= 0xf7ff;
                }
            }
        }
    }
    
    for (BYTE e = 0; e < emptyEnd; e++) {
        if (lineInfoList[emptyList[e]]) {
            BYTE max = (lineInfoList[emptyList[e]] >> 1) & 0x07,
                free = lineInfoList[emptyList[e]] & 0x0700 ? 1 : 0,
                lineFoul = (max == 6) || (max == 4 && ((lineInfoList[emptyList[e]] & 0x7000) > 0x1000) && !free) ? 1 : 0;
            
            lineInfoList[emptyList[e]] = (lineInfoList[emptyList[e]] & 0x07e0) |
                direction << 12 | lineFoul << 4 | max << 1 | free;
        }
    }
}



void testLinePointFour(BYTE idx, BYTE direction, char color, char* arr, DWORD* lineInfoList) {
    BYTE emptyCount = 0,
        colorCount = 0,
        emptyStart = 0,
        emptyEnd = 0;
    setBuffer(lineInfoList, 10, 0);
    for (char move = -4; move < 5; move++) {
        char v = arr[moveIdx(idx, move, direction)];
        if (v == 0) {
            emptyCount++;
            cEmptyMoves[emptyEnd] = move;
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
                    for (BYTE e = emptyStart; e < emptyEnd; e++) {
                        lineInfoList[emptyList[e]] = SIX | (BYTE)(move - cEmptyMoves[e]) << 5;
                    }
                }
                else {
                    for (BYTE e = emptyStart; e < emptyEnd; e++) {
                        lineInfoList[emptyList[e]] = FIVE | (BYTE)(move - cEmptyMoves[e]) << 5;
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
                    for (BYTE e = emptyStart; e < emptyEnd; e++) {
                        if ((lineInfoList[emptyList[e]] & MAX) < FOUR_NOFREE) {
                            lineInfoList[emptyList[e]] = ADD_MAX_COUNT | (BYTE)(move - cEmptyMoves[e]) << 5 | FOUR_NOFREE;
                        }

                        if ((lineInfoList[emptyList[e]] & MAX) == FOUR_NOFREE) {
                            if (lineInfoList[emptyList[e]] & ADD_MAX_COUNT) {
                                lineInfoList[emptyList[e]] += 0x1000; //count++
                            }
                            lineInfoList[emptyList[e]] &= 0x7fff;

                            if (lineInfoList[emptyList[e]] & ADD_FREE_COUNT) {
                                lineInfoList[emptyList[e]] += 0x100; //free++
                                lineInfoList[emptyList[e]] = (lineInfoList[emptyList[e]] & 0xff1f) | (BYTE)(move - cEmptyMoves[e]) << 5; //set markMove
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
                for (BYTE e = emptyStart; e < emptyEnd; e++) {
                       lineInfoList[emptyList[e]] |= ADD_MAX_COUNT; //set addCount
                }
            }
            else {
                colorCount--;
                for (BYTE e = emptyStart; e < emptyEnd; e++) {
                    lineInfoList[emptyList[e]] &= 0xf7ff;
                }
            }
        }
    }

    for (BYTE e = 0; e < emptyEnd; e++) {
        if (lineInfoList[emptyList[e]]) {
            BYTE four_max_free = lineInfoList[emptyList[e]] & 0x0700 ? FOUR_FREE :
                (lineInfoList[emptyList[e]] & 0x7000) > 0x1000 ?
                LINE_DOUBLE_FOUR : lineInfoList[emptyList[e]] & FOUL_MAX;

            lineInfoList[emptyList[e]] = (lineInfoList[emptyList[e]] & 0x07e0) |
                direction << 12 | four_max_free;
        }
    }
}



void testLinePointThree(BYTE idx, BYTE direction, char color, char* arr, DWORD* lineInfoList) {
    BYTE emptyCount = 0,
        colorCount = 0,
        emptyStart = 0,
        emptyEnd = 0;
    setBuffer(lineInfoList, 10, 0);
    for (char move = -4; move < 5; move++) {
        char v = arr[moveIdx(idx, move, direction)];
        if (v == 0) {
            emptyCount++;
            cEmptyMoves[emptyEnd] = move;
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
                    for (BYTE e = emptyStart; e < emptyEnd; e++) {
                        lineInfoList[emptyList[e]] = SIX | (BYTE)(move - cEmptyMoves[e]) << 5;
                    }
                }
                else {
                    for (BYTE e = emptyStart; e < emptyEnd; e++) {
                        lineInfoList[emptyList[e]] = FIVE | (BYTE)(move - cEmptyMoves[e]) << 5;
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
                    for (BYTE e = emptyStart; e < emptyEnd; e++) {
                        if (((lineInfoList[emptyList[e]] & MAX) >> 1) < colorCount + 1) {
                            lineInfoList[emptyList[e]] = ADD_MAX_COUNT | (BYTE)(move - cEmptyMoves[e]) << 5 | ((colorCount + 1) << 1);
                        }

                        if (((lineInfoList[emptyList[e]] & MAX) >> 1) == colorCount + 1) {
                            if (lineInfoList[emptyList[e]] & ADD_MAX_COUNT) {
                                lineInfoList[emptyList[e]] += 0x1000; //count++
                            }
                            lineInfoList[emptyList[e]] &= 0x7fff;

                            if (lineInfoList[emptyList[e]] & ADD_FREE_COUNT) {
                                lineInfoList[emptyList[e]] += 0x100; //free++
                                lineInfoList[emptyList[e]] = (lineInfoList[emptyList[e]] & 0xff1f) | (BYTE)(move - cEmptyMoves[e]) << 5; //set markMove
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
                for (BYTE e = emptyStart; e < emptyEnd; e++) {
                    lineInfoList[emptyList[e]] |= ADD_MAX_COUNT; //set addCount
                }
            }
            else {
                colorCount--;
                for (BYTE e = emptyStart; e < emptyEnd; e++) {
                       lineInfoList[emptyList[e]] &= 0xf7ff;
                }
            }
        }
    }

    for (BYTE e = 0; e < emptyEnd; e++) {
        if (lineInfoList[emptyList[e]]) {
            BYTE foul_max = (lineInfoList[emptyList[e]] >> 1) & 0x0f,
                four_max_free = lineInfoList[emptyList[e]] & 0x0700 ? (foul_max == 4 ? FOUR_FREE : THREE_FREE) :
                    foul_max == 4 && (lineInfoList[emptyList[e]] & 0x7000) > 0x1000 ?
                    LINE_DOUBLE_FOUR : foul_max << 1;

            lineInfoList[emptyList[e]] = (lineInfoList[emptyList[e]] & 0x07e0) |
                direction << 12 | four_max_free;
        }
    }
}



// 返回冲4的防点
BYTE getBlockFourPoint(BYTE idx, char* arr, DWORD lineInfo) {
    char move = (lineInfo >> 5) & 7;
    BYTE direction = (lineInfo >> 12) & 7,
        nIdx;
    for (char m = 0; m > -5; m--) {
        nIdx = moveIdx(idx, move + m, direction);
        if (0 == arr[nIdx] && nIdx != idx) return nIdx;
    }
    return 225; //return outIdx
}

UINT getBlockThreePoints(BYTE idx, char* arr, DWORD lineInfo) {
    char move = (lineInfo >> 5) & 7;
    BYTE freeCount = (lineInfo >> 8) & 7,
        direction = (lineInfo >> 12) & 7,
        nIdx;
    BYTE* points = getPoints; //point array
    
    char m = 0;
    *(UINT*)(points) = 0; //reset array
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
    
    return *(UINT*)(points);
}

UINT getFreeFourPoint(BYTE idx, char* arr, DWORD lineInfo) {
    char move = (lineInfo >> 5) & 7;
    BYTE direction = (lineInfo >> 12) & 7,
        nIdx;
    BYTE* points = getPoints; //point array
    
    char m = 0;
    *(UINT*)(points) = 0; //reset array
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
    points[0] = (lineInfo >> 8) & 7; //set freePoint num

    return *(UINT*)(points);
}



bool isFoul(BYTE idx, char* arr) {
    if (gameRules != RENJU_RULES) return false;
    const BYTE LEN = 12, // [value, count, pIdx, idx, info[4]]
        VALUE = 0, // if value > 1 then isFoul = true
        COUNT = 1,
        PIDX = 2,
        IDX = 3,
        INFO_START = 4;
    char stackIdx = 0,
        threeCount = 0,
        fourCount = 0,
        foulCount = 0,
        ov = arr[idx];

    arr[idx] = 1;
    stackBuffer[VALUE] = 0;
    stackBuffer[COUNT] = 0;
    stackBuffer[PIDX] = 0;
    stackBuffer[IDX] = idx;
    
    for (BYTE direction = 0; direction < 4; direction++) {
        DWORD info = testLineThree(idx, direction, 1, arr);
        BYTE v = FOUL_MAX_FREE & info;
        if (v == FIVE) { // not foul
            stackIdx = -1;
            break;
        }
        else if (v >= FOUL) foulCount++;
        else if (v >= FOUR_NOFREE) fourCount++;
        else if (v == THREE_FREE) {
            threeCount++;
            *(DWORD*)(stackBuffer + INFO_START + stackBuffer[COUNT]*2) = (info & 0x8fff) | (direction << 12);
            stackBuffer[COUNT]++;
        }
    }

    if (stackIdx > -1) {
        if ((fourCount > 1) || foulCount) { // is foul
            stackBuffer[VALUE] = 2;
            stackIdx = -1;
        }
        else if (threeCount < 2) stackIdx = -1; //not foul
        
        while (stackIdx > -1) { //continue test doubleThree
            
            if ((stackIdx & 1) == 0) { // test freeFourPoint and first doubleThree
                
                BYTE idx = stackBuffer[stackIdx * LEN + IDX];
                if (stackBuffer[stackIdx * LEN + VALUE] > 1) { // is doubleThree
                    arr[idx] = 0;
                    stackIdx--;
                    if (stackIdx == -1) stackBuffer[VALUE] = 2; // set first doubleThree
                }
                else if (2 > (stackBuffer[stackIdx * LEN + VALUE] + stackBuffer[stackIdx * LEN + COUNT] - stackBuffer[stackIdx * LEN + PIDX])) { // not doubleThree
                    arr[idx] = 0;
                    stackIdx--;
                    if (stackIdx > -1) stackBuffer[stackIdx * LEN + VALUE] = 1; //set freeFourPoint
                }
                else {
                    UINT fps = getFreeFourPoint(idx, arr, *(DWORD*)(stackBuffer + stackIdx * LEN + INFO_START + stackBuffer[stackIdx * LEN + PIDX]*2));
                    BYTE* ps = (BYTE*)(&fps);
                    stackBuffer[stackIdx * LEN + PIDX]++;
                    stackIdx++;
                    stackBuffer[stackIdx * LEN + VALUE] = 0;
                    stackBuffer[stackIdx * LEN + COUNT] = ps[0]; //count
                    stackBuffer[stackIdx * LEN + PIDX] = 0;
                    //stackBuffer[stackIdx * LEN + IDX] = idx;
                    stackBuffer[stackIdx * LEN + INFO_START + 0] = ps[1];
                    stackBuffer[stackIdx * LEN + INFO_START + 1] = ps[2];
                }
            }
            else { // test next doubleThree
                
                if (stackBuffer[stackIdx * LEN + VALUE] == 1) { // find freeFourPoint
                    stackIdx--;
                    stackBuffer[stackIdx * LEN + VALUE]++; // add one freeThree
                }
                else if (stackBuffer[stackIdx * LEN + PIDX] == stackBuffer[stackIdx * LEN + COUNT]) { // not freeFourPoint
                    stackIdx--;
                }
                else {
                    bool skip = false;
                    BYTE idx = stackBuffer[stackIdx * LEN + INFO_START + stackBuffer[stackIdx * LEN + PIDX]++];

                    threeCount = 0;
                    fourCount = 0;
                    foulCount = 0;

                    arr[idx] = 1;
                    stackIdx++;
                    stackBuffer[stackIdx * LEN + VALUE] = 0;
                    stackBuffer[stackIdx * LEN + COUNT] = 0; //count
                    stackBuffer[stackIdx * LEN + PIDX] = 0;
                    stackBuffer[stackIdx * LEN + IDX] = idx;
                    for (BYTE direction = 0; direction < 4; direction++) {
                        DWORD info = testLineThree(idx, direction, 1, arr);
                        BYTE v = FOUL_MAX_FREE & info;
                        if (v == FIVE) {
                            arr[idx] = 0;
                            stackIdx--; //not freeFourPoint
                            skip = true;
                            break;
                        }
                        else if (v >= FOUL) foulCount++;
                        else if (v >= FOUR_NOFREE) fourCount++;
                        else if (v == THREE_FREE) {
                            threeCount++;
                            *(DWORD*)(stackBuffer + stackIdx * LEN + INFO_START + stackBuffer[stackIdx * LEN + COUNT]*2) = (info & 0x8fff) | (direction << 12);
                            stackBuffer[stackIdx * LEN + COUNT]++;
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
                            stackBuffer[stackIdx * LEN + VALUE] = 1;
                        }
                    }
                }
            }
        }
    }
    
    arr[idx] = ov;
    return stackBuffer[VALUE] > 1;
}


DWORD testPointFour(BYTE idx, char color, char* arr) {
    DWORD info = 0;
    BYTE max = 0;
    char ov = arr[idx];
    arr[idx] = color;
    for (BYTE direction = 0; direction < 4; direction++) {
        DWORD lineInfo = testLineFour(idx, direction, color, arr);
        BYTE lineMax = lineInfo & FOUL_MAX_FREE;
        if (lineMax > max) {
            info = lineInfo;
            max = lineMax;
        }
    }
    arr[idx] = ov;
    BYTE foulV = (gameRules == RENJU_RULES) && (color == 1) && (isFoul(idx, arr)) ? 1 : 0;

    return info | (foulV << 4);
}


void testFive(char* arr, char color, DWORD* infoArr) {
    setBuffer(infoArr, 226, 0);
    for (BYTE direction = 0; direction < 4; direction++) {
        setBuffer(markArr, 226, 0);
        BYTE listStart = direction == 2 ? 15 - cBoardSize : 0,
            listEnd = direction < 2 ? listStart + cBoardSize : listStart + cBoardSize * 2 - 5;
        for (BYTE list = listStart; list < listEnd; list++) {
            BYTE emptyCount = 0,
                colorCount = 0,
                moveStart = direction < 3 || list < cBoardSize ? 14 : list < 15 ? 15 + list - cBoardSize : 29 - cBoardSize,
                moveEnd = direction < 2 ? moveStart + cBoardSize : list - listStart < cBoardSize ? moveStart + list - listStart + 1 : moveStart + cBoardSize - (list - listStart + 1 - cBoardSize),
                emptyStart = 0,
                emptyEnd = 0;
            for (BYTE move = moveStart; move < moveEnd; move++) {
                long pIdx = (direction * 29 + list) * 43 + move;
                char v = arr[idxLists[pIdx]];
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
                            for (BYTE e = emptyStart; e < emptyEnd; e++) {
                                markArr[emptyList[e]] = SIX | ((move - emptyMoves[e]) << 5);
                            }
                        }
                        else {
                            for (BYTE e = emptyStart; e < emptyEnd; e++) {
                                markArr[emptyList[e]] = FIVE | ((move - emptyMoves[e]) << 5);
                            }
                        }
                    }

                    v = arr[idxLists[pIdx - 4]];
                    if (v == 0) {
                        emptyCount--;
                        emptyStart++;
                        for (BYTE e = emptyStart; e < emptyEnd; e++) {
                            markArr[emptyList[e]] |= ADD_MAX_COUNT; //set addCount
                        }
                    }
                    else {
                        colorCount--;
                        for (BYTE e = emptyStart; e < emptyEnd; e++) {
                            markArr[emptyList[e]] = markArr[emptyList[e]] & 0xf7ff;
                        }
                    }
                }
            }
        }

        for (BYTE idx = 0; idx < 225; idx++) {
            BYTE max = markArr[idx] & MAX;
            if (FIVE == max) {
                infoArr[idx] = (markArr[idx] & 0x8fff) | (direction << 12);
            }
        }
    }
}

void testFour(char* arr, char color, DWORD* infoArr) {
    setBuffer(infoArr, 226, 0);
    for (BYTE direction = 0; direction < 4; direction++) {
        setBuffer(markArr, 226, 0);
        BYTE listStart = direction == 2 ? 15 - cBoardSize : 0,
            listEnd = direction < 2 ? listStart + cBoardSize : listStart + cBoardSize * 2 - 5;
        for (BYTE list = listStart; list < listEnd; list++) {
            BYTE emptyCount = 0,
                colorCount = 0,
                moveStart = direction < 3 || list < cBoardSize ? 14 : list < 15 ? 15 + list - cBoardSize : 29 - cBoardSize,
                moveEnd = direction < 2 ? moveStart + cBoardSize : list - listStart < cBoardSize ? moveStart + list - listStart + 1 : moveStart + cBoardSize - (list - listStart + 1 - cBoardSize),
                emptyStart = 0,
                emptyEnd = 0;
            for (BYTE move = moveStart; move < moveEnd; move++) {
                long pIdx = (direction * 29 + list) * 43 + move;
                char v = arr[idxLists[pIdx]];
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
                            for (BYTE e = emptyStart; e < emptyEnd; e++) {
                                markArr[emptyList[e]] = SIX | ((move - emptyMoves[e]) << 5);
                            }
                        }
                        else {
                            for (BYTE e = emptyStart; e < emptyEnd; e++) {
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
                            for (BYTE e = emptyStart; e < emptyEnd; e++) {
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
                        for (BYTE e = emptyStart; e < emptyEnd; e++) {
                            markArr[emptyList[e]] |= ADD_MAX_COUNT; //set addCount
                        }
                    }
                    else {
                        colorCount--;
                        for (BYTE e = emptyStart; e < emptyEnd; e++) {
                            markArr[emptyList[e]] = markArr[emptyList[e]] & 0xf7ff;
                        }
                    }
                }
            }
        }

        for (BYTE idx = 0; idx < 225; idx++) {
            BYTE max = markArr[idx] & MAX;
            if (FIVE == max) {
                infoArr[idx] = (markArr[idx] & 0x8fff) | (direction << 12);
            }
            else if (FOUR_NOFREE == max) {
                markArr[idx] |= (markArr[idx] & FREE_COUNT) ? 1 : 0;
                if ((markArr[idx] & FOUL_MAX_FREE) > (infoArr[idx] & FOUL_MAX_FREE)) {
                    if (gameRules == RENJU_RULES && color == 1) {
                        BYTE foul = isFoul(idx, arr) ? 1 : 0;
                        infoArr[idx] = (markArr[idx] & 0x8fff) | (direction << 12) | foul << 4;
                    }
                    else
                        infoArr[idx] = (markArr[idx] & 0x8fff) | (direction << 12);
                }
            }
        }
    }
}

void testThree(char* arr, char color, DWORD* infoArr) {
    setBuffer(infoArr, 226, 0);
    for (BYTE direction = 0; direction < 4; direction++) {
        setBuffer(markArr, 226, 0);
        BYTE listStart = direction == 2 ? 15 - cBoardSize : 0,
            listEnd = direction < 2 ? listStart + cBoardSize : listStart + cBoardSize * 2 - 5;
        for (BYTE list = listStart; list < listEnd; list++) {
            BYTE emptyCount = 0,
                colorCount = 0,
                moveStart = direction < 3 || list < cBoardSize ? 14 : list < 15 ? 15 + list - cBoardSize : 29 - cBoardSize,
                moveEnd = direction < 2 ? moveStart + cBoardSize : list - listStart < cBoardSize ? moveStart + list - listStart + 1 : moveStart + cBoardSize - (list - listStart + 1 - cBoardSize),
                emptyStart = 0,
                emptyEnd = 0;
            for (BYTE move = moveStart; move < moveEnd; move++) {
                long pIdx = (direction * 29 + list) * 43 + move;
                char v = arr[idxLists[pIdx]];
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
                            for (BYTE e = emptyStart; e < emptyEnd; e++) {
                                markArr[emptyList[e]] = SIX | ((move - emptyMoves[e]) << 5);
                            }
                        }
                        else {
                            for (BYTE e = emptyStart; e < emptyEnd; e++) {
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
                            for (BYTE e = emptyStart; e < emptyEnd; e++) {
                                if (((markArr[emptyList[e]] & MAX) >> 1) < colorCount + 1) {
                                    markArr[emptyList[e]] = ADD_MAX_COUNT | ((move - emptyMoves[e]) << 5) | ((colorCount + 1) << 1);
                                }

                                if (((markArr[emptyList[e]] & MAX) >> 1) == colorCount + 1) {
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
                        for (BYTE e = emptyStart; e < emptyEnd; e++) {
                            markArr[emptyList[e]] |= ADD_MAX_COUNT; //set addCount
                        }
                    }
                    else {
                        colorCount--;
                        for (BYTE e = emptyStart; e < emptyEnd; e++) {
                            markArr[emptyList[e]] = markArr[emptyList[e]] & 0xf7ff;
                        }
                    }
                }
            }
        }

        for (BYTE idx = 0; idx < 225; idx++) {
            BYTE max = (markArr[idx] & MAX) >> 1;
            if (5 == max) {
                infoArr[idx] = (markArr[idx] & 0x8fff) | (direction << 12);
            }
            else if (5 > max && max > 2) {
                markArr[idx] |= (markArr[idx] & FREE_COUNT) ? 1 : 0; //mark free
                if ((markArr[idx] & FOUL_MAX_FREE) > (infoArr[idx] & FOUL_MAX_FREE)) {
                    if (gameRules == RENJU_RULES && color == 1) {
                        BYTE foul = isFoul(idx, arr) ? 1 : 0;
                        if((max == 3) && (markArr[idx] & FREE) && (foul == 0)) {
                            arr[idx] = color;
                            *(UINT*)(freeFourPoints) = getFreeFourPoint(idx, arr, ((markArr[idx] & 0x8fff) | (direction << 12)));
                            BYTE i = 1;
                            for (i=1; i<=freeFourPoints[0]; i++) { 
                                BYTE f = isFoul(freeFourPoints[i], arr);
                                if (!f) break; //freeFourPoints[i] is freeFour point
                            }
                            if (i > freeFourPoints[0]) markArr[idx] &= 0xf8fe; //clear free
                            arr[idx] = 0;
                        }
                        infoArr[idx] = (markArr[idx] & 0x8fff) | (direction << 12) | foul << 4;
                    }
                    else
                        infoArr[idx] = (markArr[idx] & 0x8fff) | (direction << 12);
                }
            }
        }
    }
}


bool isGameOver(char* arr, char color) {
    bool isOver = false;
    for (BYTE direction = 0; direction < 4; direction++) {
        BYTE listStart = direction == 2 ? 15 - cBoardSize : 0,
            listEnd = direction < 2 ? listStart + cBoardSize : listStart + cBoardSize * 2 - 5;
        for (BYTE list = listStart; list < listEnd; list++) {
            BYTE emptyCount = 0,
                colorCount = 0,
                moveStart = direction < 3 || list < cBoardSize ? 14 : list < 15 ? 15 + list - cBoardSize : 29 - cBoardSize,
                moveEnd = direction < 2 ? moveStart + cBoardSize : list - listStart < cBoardSize ? moveStart + list - listStart + 1 : moveStart + cBoardSize - (list - listStart + 1 - cBoardSize);
            for (BYTE move = moveStart; move < moveEnd; move++) {
                long pIdx = (direction * 29 + list) * 43 + move;
                char v = arr[idxLists[pIdx]];
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


DWORD getLevel(char* arr, char color) {
    bool isWin = false;
    BYTE fiveIdx = 0xff;
    setBuffer(infoArr, 226, 0);
    for (BYTE direction = 0; direction < 4; direction++) {
        setBuffer(markArr, 226, 0);
        BYTE listStart = direction == 2 ? 15 - cBoardSize : 0,
            listEnd = direction < 2 ? listStart + cBoardSize : listStart + cBoardSize * 2 - 5;
        for (BYTE list = listStart; list < listEnd; list++) {
            BYTE emptyCount = 0,
                colorCount = 0,
                moveStart = direction < 3 || list < cBoardSize ? 14 : list < 15 ? 15 + list - cBoardSize : 29 - cBoardSize,
                moveEnd = direction < 2 ? moveStart + cBoardSize : list - listStart < cBoardSize ? moveStart + list - listStart + 1 : moveStart + cBoardSize - (list - listStart + 1 - cBoardSize),
                emptyStart = 0,
                emptyEnd = 0;
            for (BYTE move = moveStart; move < moveEnd; move++) {
                long pIdx = (direction * 29 + list) * 43 + move;
                char v = arr[idxLists[pIdx]];
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
                            for (BYTE e = emptyStart; e < emptyEnd; e++) {
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

        for (BYTE idx = 0; idx < 225; idx++) {
            BYTE max = (markArr[idx] & MAX) >> 1;
            if (5 == max) {
                infoArr[idx] = (markArr[idx] & 0x8fff) | (direction << 12);
            }
        }
    }

    if (isWin) {
        return LEVEL_WIN;
    }
    else {
        for (BYTE idx = 0; idx < 225; idx++) {
            BYTE max = (infoArr[idx] & MAX) >> 1;
            if (5 == max) {
                if (fiveIdx == 0xff) fiveIdx = idx;
                else if (fiveIdx != idx) return (fiveIdx << 8) | LEVEL_FREEFOUR;
            }
        }
        if (fiveIdx == 0xff)
            return LEVEL_NONE;
        else if (gameRules == RENJU_RULES && color == 2 && isFoul(fiveIdx, arr))
            return (fiveIdx << 8) | LEVEL_FREEFOUR;
        else
            return (fiveIdx << 8) | LEVEL_NOFREEFOUR;
    }
}

// idx 不能是禁手
DWORD getLevelPoint(BYTE idx, char color, char* arr) {
    DWORD info = 0,
        rt = LEVEL_NONE,
        mark = 0;
    BYTE fourCount = 0,
        level = 0;
    char ov = arr[idx];
                
    arr[idx] = color;
    for (BYTE direction = 0; direction < 4; direction++) {
        DWORD lineInfo = testLineFour(idx, direction, color, arr);
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
        BYTE bIdx = getBlockFourPoint(idx, arr, info);
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

//--------------------- vcf ------------------------
/*
const UINT VCF_HASHTABLE_LEN = 5880420 + 6400000 + 116000000; //((135+224)*45)*91*4 + 80*80000 + 232*500000
BYTE vcfHashTable[VCF_HASHTABLE_LEN + 256] = {0};
UINT vcfHashNextValue = 0;
BYTE HASHTABLE_MAX_MOVESLEN = 73;
    
void setVCFHashMaxMovesLen (BYTE maxLen) {
    HASHTABLE_MAX_MOVESLEN = maxLen + 1;
}

void resetVcfWinMoves() {
    vcfWinMovesNext = bufVcfWinMoves;
    vcfWinMoves.len = 0;
    vcfWinMoves.firstMoves = NULL;
}
    
void resetVCF(char* arr, char color, BYTE maxVCF, BYTE maxDepth, UINT maxNode) {
    copyBuffer((BYTE*)vcfInitArr, (BYTE*)arr, 228);
    resetVcfWinMoves();
    
    vcfInfo.initArr = vcfInitArr;
    vcfInfo.winMoves = &vcfWinMoves;
    vcfInfo.color = color;
    vcfInfo.maxVCF = maxVCF;
    vcfInfo.maxDepth = maxDepth;
    vcfInfo.maxNode = maxNode;
    vcfInfo.vcfCount = 0;
    vcfInfo.pushMoveCount = 0;
    vcfInfo.pushPositionCount = 0;
    vcfInfo.hasCount = 0;
    vcfInfo.nodeCount = 0;
                
    vcfHashNextValue = 5880420;
    setBuffer(vcfHashTable, 5880420, 0);
}

UINT vcfPositionPush(BYTE keyLen, UINT keySum, char* position) {
    if (vcfHashNextValue >= VCF_HASHTABLE_LEN) {
        return 0;
    }
    
    UINT pNext = ((keyLen >> 1) * 16155 + keySum) << 2,
        pPosition = *(UINT*)(vcfHashTable + pNext);
    while (pPosition) {
        pNext = pPosition + 228;
        pPosition =  *(UINT*)(vcfHashTable + pNext);
    }

    *(UINT*)(vcfHashTable + pNext) = vcfHashNextValue;
    
    char* newPosition = (char*)(vcfHashTable + vcfHashNextValue);
    for (BYTE i = 0; i < 225; i++) {
        newPosition[i] = position[i];
    }
    
    pNext = vcfHashNextValue + 228;
    *(UINT*)(vcfHashTable + pNext) = 0;
    vcfHashNextValue += 232;
    
    return vcfHashNextValue;
}


bool vcfPositionHas(BYTE keyLen, UINT keySum, char* position) {
    UINT pNext = ((keyLen >> 1) * 16155 + keySum) << 2,
        pPosition = *(UINT*)(vcfHashTable + pNext);
    while (pPosition) {
        bool isEqual = true;
        char* nextPosition = (char*)(vcfHashTable + pPosition);
        for (BYTE i = 0; i < 225; i++) {
            if (nextPosition[i] != position[i]) {
                isEqual = false;
                break;
            }
        }
        if (isEqual) return true;
        pNext = pPosition + 228;
        pPosition = *(UINT*)(vcfHashTable + pNext);
    }
    return false;
}


UINT vcfMovesPush(BYTE keyLen, UINT keySum, BYTE* move) {
    if (vcfHashNextValue >= VCF_HASHTABLE_LEN) {
        return 0;
    }
    
    BYTE movesByte = ((keyLen >> 2) + 1) << 2;
    UINT pNext = ((keyLen >> 1) * 16155 + keySum) << 2,
        pMoves =  *(UINT*)(vcfHashTable + pNext);
    
    while (pMoves) {
        pNext = pMoves + movesByte;
        pMoves = *(UINT*)(vcfHashTable + pNext);
    }
    
    *(UINT*)(vcfHashTable + pNext) = vcfHashNextValue;
    
    BYTE* newMoves = vcfHashTable + vcfHashNextValue;
    newMoves[0] = keyLen;
    newMoves++;
    for (BYTE i = 0; i < keyLen; i++) {
        newMoves[i] = move[i];
    }
    
    pNext = vcfHashNextValue + movesByte;
    *(UINT*)(vcfHashTable + pNext) = 0;
    vcfHashNextValue = pNext+ 4;
    
    return vcfHashNextValue;
}

// 对比VCF手顺是否相等
bool vcfMovesHas(BYTE keyLen, UINT keySum, BYTE* move) {
    BYTE movesByte = ((keyLen >> 2) + 1) << 2;
    UINT pNext = ((keyLen >> 1) * 16155 + keySum) << 2,
        pMoves = *(UINT*)(vcfHashTable + pNext);
    while (pMoves) {
        if(isRepeatMove(move, vcfHashTable + pMoves + 1, keyLen)) return true;
        pNext = pMoves + movesByte;
        pMoves = *(UINT*)(vcfHashTable + pNext);
    }
    return false;
}

void transTablePush(BYTE keyLen, UINT keySum, BYTE* moves, char* position) {
    if (keyLen < HASHTABLE_MAX_MOVESLEN)
        vcfMovesPush(keyLen, keySum, moves);
    else
        vcfPositionPush(keyLen, keySum, position);
}

bool transTableHas(BYTE keyLen, UINT keySum, BYTE* moves, char* position) {
    if (keyLen < HASHTABLE_MAX_MOVESLEN)
        return vcfMovesHas(keyLen, keySum, moves);
    else
        return vcfPositionHas(keyLen, keySum, position);
}

struct Moves* NewVcfMoves(BYTE* moves, BYTE movesLen, BYTE lastIdx) {
    struct Moves* vcfMoves = NewMoves(vcfWinMovesNext, vcfWinMovesEnd, movesLen+1);
    if (vcfMoves) {
        copyBuffer(vcfMoves->moves, moves, movesLen);
        (vcfMoves->moves)[movesLen] = lastIdx;
    }
    return vcfMoves;
}
*/
// movesLen 为单数
bool isVCF(char color, char* arr, BYTE* moves, BYTE movesLen) {
    bool isV = false;
    BYTE isvcfValuesLen = 0;

    for (DWORD i = 0; i < movesLen; i += 2) {
        DWORD levelInfo = i ? getLevelPoint(moves[i - 1], INVERT_COLOR[color], arr) : getLevel(arr, INVERT_COLOR[color]);
        BYTE bIdx = (levelInfo >> 8) & 0xff,
            level = levelInfo & FOUL_MAX_FREE;
        if ((level < LEVEL_NOFREEFOUR && arr[moves[i]] == 0) ||
            (level == LEVEL_NOFREEFOUR && bIdx == moves[i])) {
            DWORD info = testPointFour(moves[i], color, arr);
            if ((info & FOUL_MAX) == FOUR_NOFREE) {
                isvcfValues[isvcfValuesLen++] = moves[i];
                arr[moves[i]] = color;
                if (i + 1 >= movesLen) {
                    //所有手走完，判断是否出现胜形 (活4，44，冲4抓)
                    isV = LEVEL_FREEFOUR == (FOUL_MAX_FREE & getLevelPoint(moves[i], color, arr));
                    break;
                }
                //后手不判断禁手
                BYTE idx = getBlockFourPoint(moves[i], arr, info);
                if (idx == moves[i + 1] && arr[idx] == 0) {
                    isvcfValues[isvcfValuesLen++] = idx;
                    arr[idx] = INVERT_COLOR[color];
                }
                else break;
            }
            else break;
        }
        else break;
    }

    // 还原改动的棋子
    for (BYTE i = 0; i < isvcfValuesLen; i++) {
        arr[isvcfValues[i]] = 0;
    }

    return isV;
}


// 去掉VCF无谓冲四，不会改变arr数组
void simpleVCF(char color, char* arr, BYTE* moves, BYTE& movesLen) {
    
    BYTE svcfFourPointsLen = 0,
        svcfVCFLen = 0;
        
    short leng = movesLen - 6;
    /*for (DWORD j = 1; j <= leng; j += 2) { // add fourPoint
        arr[moves[j-1]] = color;
        arr[moves[j]] = INVERT_COLOR[color];
        if (FOUR_NOFREE == (FOUL_MAX & testPointFour(moves[j], INVERT_COLOR[color], arr))) svcfFourPoints[svcfFourPointsLen++] = j;
    }
    for(DWORD j = 0; j <= leng; j++) {
        arr[moves[j]] = 0;
    }
    while (svcfFourPointsLen) { //判断引起对手反四的手顺是否可以去除
        BYTE st = 0;
        BYTE l = 2;
        for (BYTE j = svcfFourPointsLen - 1; j >= 0; j--) {
            st = svcfFourPoints[j] - 1;
            l += 2;
            if ((j == 0) || (svcfFourPoints[j] - svcfFourPoints[j - 1] > 2)) {
                svcfFourPointsLen -= ((l - 2) >> 1);
                break;
            }
        }
        
        svcfVCFLen = 0; //concat
        for (BYTE j=0; j<st; j++) svcfVCF[svcfVCFLen++] = moves[j];
        for (BYTE j=st + l; j<movesLen; j++) svcfVCF[svcfVCFLen++] = moves[j];
        if (isVCF(color, arr, svcfVCF, svcfVCFLen)) { //splice
            movesLen = st;  //删除无谓冲四
            for (BYTE j=st; j<svcfVCFLen; j++) moves[movesLen++] = svcfVCF[j];
        }
    }

    leng = movesLen - 6;*/
    for (BYTE j = 0; j <= leng; j++) { // 摆棋子
        arr[moves[j]] = (j & 1) ? INVERT_COLOR[color] : color;
    }

    for (short i = movesLen - 5; i >= 0; i -= 2) { // 从后向前逐个冲4尝试是否无谓冲4
        svcfVCFLen = 0; //slice
        for (BYTE j= i+2; j<movesLen; j++) svcfVCF[svcfVCFLen++] = moves[j];
        if (isVCF(color, arr, svcfVCF, svcfVCFLen)) { //splice
            movesLen = i;  //删除无谓冲四
            for (BYTE j=0; j<svcfVCFLen; j++) moves[movesLen++] = svcfVCF[j];
        }
        // 复原两步，直到最后可以完全复原数组
        if (i < 2) break; // i=0, break;
        arr[moves[i - 1]] = 0;
        arr[moves[i - 2]] = 0;
    }
}

/*
void findVCF(char* arr, char color, BYTE maxVCF, BYTE maxDepth, UINT maxNode) {
    BYTE centerIdx = 112,
        colorIdx = 0xff,
        nColorIdx = 0xff;
    BYTE movesLen = 0;
    UINT stackLen = 0;
    bool done = false;
    UINT sum = 0,
        pushMoveCount = 0,
        pushPositionCount = 0,
        hasCount = 0,
        loopCount = 0;
        
    resetVCF(arr, color, maxVCF, maxDepth, maxNode);
    
    vcfStack[stackLen++] = 0xff;
    vcfStack[stackLen++] = 0xff;
    vcfStack[stackLen++] = 225;
    vcfStack[stackLen++] = 225;
    
    while (!done) {
        if(!(loopCount & 0xffff)) log(loopCount);
        
        nColorIdx = vcfStack[--stackLen];
        //log(nColorIdx);
        colorIdx = vcfStack[--stackLen];
        //log(colorIdx);
        
        if (colorIdx < 0xff) {
            if (colorIdx < 225) {
                arr[colorIdx] = color;
                arr[nColorIdx] = INVERT_COLOR[color];
                vcfMoves[movesLen++] = colorIdx;
                vcfMoves[movesLen++] = nColorIdx;
                centerIdx = colorIdx;
                sum += colorIdx;
                vcfStack[stackLen++] = 0xff;
                vcfStack[stackLen++] = 0xff;
                //log((BYTE*)(vcfMoves),movesLen);
            }

            if (transTableHas(movesLen, sum, vcfMoves, arr)) {
                hasCount++;
            }
            else {
                if (movesLen < maxDepth) {
                
                    //if (loopCount >= logStart && loopCount < (logStart + logCount)) {
                        //log(loopCount);
                        //log((BYTE*)(vcfMoves), movesLen);
                    //}
                    
                    testFour(arr, color, vcfInfoArr);
                    DWORD nLevel = getLevel(arr, INVERT_COLOR[color]);
                    //log(nLevel);
                    if ((nLevel & 0xff) <= LEVEL_NOFREEFOUR) {
                        BYTE end;
                        if ((nLevel & 0xff) == LEVEL_NOFREEFOUR) {
                            end = 1;
                            centerIdx = nLevel >> 8;
                        }
                        else {
                            end = 225;
                        }

                        BYTE twoPointsLen = 0,
                            threePointsLen = 0,
                            freeThreePointsLen = 0,
                            elsePointsLen = 0,
                            fourPointsLen = 0;
                        BYTE i = 0;
                        for (i = 0; i < end; i++) {
                            BYTE idx = aroundIdx(centerIdx, i);
                            DWORD max = vcfInfoArr[idx] & FOUL_MAX;
                            //if((max & MAX) == FOUR_NOFREE) log(max);
                            if (max == FOUR_NOFREE) {
                                arr[idx] = color;
                                DWORD level = getLevel(arr, color);
                                arr[idx] = 0;
                                //log(level);
                                //log((level & 0xff) == LEVEL_FREEFOUR);

                                if ((level & 0xff) == LEVEL_FREEFOUR) { //
                                    //push VCF
                                    transTablePush(movesLen, sum, vcfMoves, arr);
                                    //log(vcfMoves, movesLen);
                                    struct Moves* winMoves = NewVcfMoves(vcfMoves, movesLen, idx);
                                    //log(winMoves->moves, winMoves->len);
                                    simpleVCF(color, vcfInitArr, winMoves->moves, winMoves->len);
                                    if (winMoves) {
                                        //log(winMoves->moves, winMoves->len);
                                        pushWinMoves(&vcfWinMoves, winMoves);
                                        vcfInfo.vcfCount = vcfWinMoves.len;
                                        if (vcfInfo.vcfCount == maxVCF) {
                                            for (BYTE j = 0; j < movesLen; j++) {
                                                vcfStack[stackLen++] = 0xff;
                                            }
                                            vcfStack[stackLen++] = 0xff;
                                            vcfStack[stackLen++] = 0xff;
                                            break; // break while loop
                                        }
                                    }
                                    
                                }
                                else {
                                    vcfFourPoints[fourPointsLen++] = (level >> 8);
                                    vcfFourPoints[fourPointsLen++] = idx;
                                }
                            }
                        }
                        if (i >= end) {
                            
                            //if (loopCount >= logStart && loopCount < (logStart + logCount)) {
                                //log((BYTE*)(vcfFourPoints), fourPointsLen);
                                //log((BYTE*)(vcfTwoPoints), twoPointsLen);
                                //log((BYTE*)(vcfThreePoints), threePointsLen);
                                //log((BYTE*)(vcfFreeThreePoints), freeThreePointsLen);
                            //}
                            
                            for (DWORD i=1; i<fourPointsLen; i+=2) {
                                arr[vcfFourPoints[i]] = color;
                            }
                            
                            for (DWORD i=1; i<fourPointsLen; i+=2) {
                                DWORD lineInfo = 0;
                                BYTE idx = vcfFourPoints[i];
                                for (BYTE direction=0; direction<4; direction++) {
                                    DWORD info = MAX_FREE & testLine(idx, direction, color, arr);
                                    if (info <= FOUR_FREE && info > lineInfo) lineInfo = info;
                                }
                                switch (lineInfo) {
                                    case THREE_FREE:
                                        vcfFreeThreePoints[freeThreePointsLen++] = vcfFourPoints[i-1];
                                        vcfFreeThreePoints[freeThreePointsLen++] = idx;
                                        break;
                                    case FOUR_FREE:
                                    case FOUR_NOFREE:
                                    case THREE_NOFREE:
                                        vcfThreePoints[threePointsLen++] = idx;  //打乱顺序，搜索会更快
                                        vcfThreePoints[threePointsLen++] = vcfFourPoints[i-1];
                                        break;
                                    case TWO_FREE:
                                    case TWO_NOFREE:
                                        vcfTwoPoints[twoPointsLen++] = vcfFourPoints[i-1];
                                        vcfTwoPoints[twoPointsLen++] = idx;
                                        break;
                                    default:
                                        vcfElsePoint[elsePointsLen++] = vcfFourPoints[i-1];
                                        vcfElsePoint[elsePointsLen++] = idx;
                                }
                            }
                                
                            end = elsePointsLen;          
                            for (BYTE i=0; i<end; i++) vcfStack[stackLen++] = vcfElsePoint[--elsePointsLen];
                            end = twoPointsLen;
                            for (BYTE i=0; i<end; i++) vcfStack[stackLen++] = vcfTwoPoints[--twoPointsLen];
                            end = threePointsLen;
                            for (BYTE i=0; i<end; i++) vcfStack[stackLen++] = vcfThreePoints[i];
                            end = freeThreePointsLen;
                            for (BYTE i=0; i<end; i++) vcfStack[stackLen++] = vcfFreeThreePoints[--freeThreePointsLen];
                            
                            for (DWORD i=1; i<fourPointsLen; i+=2) {
                                arr[vcfFourPoints[i]] = 0;
                            }
                            
                            //if (loopCount >= logStart && loopCount < (logStart + logCount)) 
                                //log((BYTE*)(vcfStack), stackLen);
                            
                        }
                    }
                }
            }
            
        }
        else {
            
            if (movesLen < HASHTABLE_MAX_MOVESLEN)
                pushMoveCount++;
            else
                pushPositionCount++;
            transTablePush(movesLen, sum, vcfMoves, arr);
            
            if (movesLen) {
                BYTE idx = vcfMoves[--movesLen];
                arr[idx] = 0;
                idx = vcfMoves[--movesLen];
                arr[idx] = 0;
                sum -= idx;
            }
            else {
                done = true;
            }
        }
        
        if (++loopCount >= maxNode) { //break loop
            vcfStack[stackLen++] = 0xff;
            vcfStack[stackLen++] = 0xff;
        }
    }
    
    vcfInfo.pushMoveCount = pushMoveCount;
    vcfInfo.pushPositionCount = pushPositionCount;
    vcfInfo.hasCount = hasCount;
    vcfInfo.nodeCount = loopCount;
}
*/

BYTE* getBlockVCFBuffer() {
    return blockPoints;
}

void getBlockVCF(char* arr, char color, BYTE* vcfMoves, BYTE vcfMovesLen, bool includeFour) {
    bool fast = true;//默认采用快速搜索防点
    BYTE fourCount = 0, //分析最后一手棋
        infoIdx = 0,
        fFourCount = 0, //分析被抓禁手点
        fInfoIdx = 0,
        end = 0,    
        endIdx = vcfMoves[vcfMovesLen - 1]; //保存最后一手棋
    
    setBuffer(blockBuf, 952, 0);
    testFour(arr, INVERT_COLOR[color], blockInfoArr); // 搜索先手冲4

    if (color == 1 && gameRules == RENJU_RULES) { //黑棋VCF路线是否有复杂禁手防点
        for (DWORD i = 0; i < vcfMovesLen; i += 2) {
            arr[vcfMoves[end++]] = 1;

            BYTE threeCount = 0;
            for (BYTE direction = 0; direction < 4; direction++) {
                DWORD lineInfo = testLineThree(vcfMoves[i], direction, 1, arr);
                if (THREE_FREE == (MAX_FREE & lineInfo)) threeCount++;
                if (end == vcfMovesLen && FOUR_FREE == (MAX_FREE & lineInfo)) {
                    fourCount += 2;
                    blockLineInfos[infoIdx++] = lineInfo;
                }
            }
            if (threeCount > 1) { // 有33型,暴力搜索防点
                fast = false;
                break;
            }

            if (end < vcfMovesLen) arr[vcfMoves[end++]] = 2;
        }
    }
    else { //白棋VCF路线是否有复杂禁手防点
        for (BYTE i = 0; i < vcfMovesLen; i++) {
            arr[vcfMoves[end++]] = (i & 1) ? INVERT_COLOR[color] : color;
        }
        for (BYTE direction = 0; direction < 4; direction++) {
            DWORD lineInfo = testLineFour(endIdx, direction, color, arr);
            switch (lineInfo & FOUL_MAX_FREE) {
                case FOUR_FREE:
                case LINE_DOUBLE_FOUR:
                    fourCount += 2;
                    blockLineInfos[infoIdx++] = lineInfo;
                    break;
                case FOUR_NOFREE:
                    fourCount += 1;
                    blockLineInfos[infoIdx++] = lineInfo;
                    break;
            }
        }
        
        if (fourCount == 1) { //抓禁
            BYTE foulIdx = getBlockFourPoint(endIdx, arr, blockLineInfos[0]);
            blockArr[foulIdx] = 1; //保存抓禁的直接防点
            arr[foulIdx] = 1;
            for (BYTE direction = 0; direction < 4; direction++) {
                DWORD lineInfo = testLineFour(foulIdx, direction, 1, arr);
                switch (lineInfo & FOUL_MAX_FREE) {
                    case SIX:
                        fFourCount += 3;
                        break;
                    case LINE_DOUBLE_FOUR:
                        fFourCount += 2;
                        blockFLineInfos[fInfoIdx++] = lineInfo;
                        break;
                    case FOUR_FREE:
                        fFourCount += 1;
                        break;
                    case FOUR_NOFREE:
                        fFourCount += 1;
                        blockFLineInfos[fInfoIdx++] = lineInfo;
                        break;
                }
            }
            arr[foulIdx] = 0;
            if (fFourCount < 2)  fast = false; // 抓33,暴力搜索防点
        }
    }

    if (fast) { // 没有33，快速搜索防点
        if (fourCount == 1) { // 找44解禁点
            if (fFourCount == 2) {
                BYTE foulIdx = getBlockFourPoint(endIdx, arr, blockLineInfos[0]);
                for (BYTE i = 0; i < fInfoIdx; i++) {
                    BYTE direction = (blockFLineInfos[i] >> 12) & 0x07,
                        bIdx = getBlockFourPoint(foulIdx, arr, blockFLineInfos[i]),
                        isLineFF = LINE_DOUBLE_FOUR == (blockFLineInfos[i] & FOUL_MAX_FREE);
                    char st;
                    if (!isLineFF) arr[bIdx] = 1;
                    for (char abs = -1; abs < 2; abs += 2) {
                        st = isLineFF ? -1 : 0;
                        for (char move = 1; move <= 5; move++) {
                            BYTE idx = moveIdx(foulIdx, move * abs, direction);
                            switch (arr[idx]) {
                                case 0:
                                    st++;
                                    if (st) {
                                        char ov = arr[bIdx];
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
        }
        else if (fourCount == 2) {
            if (infoIdx == 1) { // 找活4，单线44防点
                BYTE direction = (blockLineInfos[0] >> 12) & 0x07;
                for (char abs = -1; abs < 2; abs += 2) {
                    for (char move = 1; move <= 4; move++) {
                        BYTE idx = moveIdx(endIdx, move * abs, direction);
                        if (0 == arr[idx]) {
                            blockArr[idx] = 1;
                            tempBlockPoints[(abs + 1) / 2] = idx;
                            break;
                        }
                    }
                }
                
                //排除连活三多余防点
                if (FOUR_FREE == (FOUL_MAX_FREE & blockLineInfos[0])) { 
                    arr[endIdx] = 0;
                    for (BYTE i = 0; i < 2; i++) {
                        arr[tempBlockPoints[i]] = color;
                        if (FOUR_FREE == (FOUL_MAX_FREE & testLineFour(tempBlockPoints[i], direction, color, arr))) {
                            if (gameRules != RENJU_RULES || color != 1 || !isFoul(tempBlockPoints[i], arr)) {
                                blockArr[tempBlockPoints[(i + 1) % 2]] = 0; //连活三如果有两个活四点，排除一个防点
                                arr[tempBlockPoints[i]] = 0;
                                break;
                            }
                        }
                        arr[tempBlockPoints[i]] = 0;
                    }
                    arr[endIdx] = color;
                }
                
            }
            else { //infoIdx == 2，双线44防点
                BYTE idx = getBlockFourPoint(endIdx, arr, blockLineInfos[0]);
                blockArr[idx] = 1;
                idx = getBlockFourPoint(endIdx, arr, blockLineInfos[1]);
                blockArr[idx] = 1;
            }
        }

        arr[vcfMoves[--end]] = 0;
        blockArr[vcfMoves[end]] = 1; // 搜索直接防和反防
        const short AND = INVERT_COLOR[color] == 1 && gameRules == RENJU_RULES ? FOUL_MAX : MAX;
        for (DWORD i = 0; i < vcfMovesLen - 1; i += 2) {
            end--;
            for (BYTE direction = 0; direction < 4; direction++) {
                testLinePointFour(vcfMoves[end], direction, INVERT_COLOR[color], arr, blockLineInfoList);
                for (BYTE j = 0; j < 9; j++) {
                    if (FOUR_NOFREE == (AND & blockLineInfoList[j])) {
                        BYTE idx = moveIdx(vcfMoves[end], j - 4, direction);
                        blockArr[idx] = 1;
                    }
                }
            }
            arr[vcfMoves[end]] = 0;
            blockArr[vcfMoves[end]] = 1;
            arr[vcfMoves[--end]] = 0;
            blockArr[vcfMoves[end]] = 1;
        }
        for (BYTE i = 0; i < 225; i++) {
            if (FOUR_NOFREE == (FOUL_MAX & blockInfoArr[i])) {
                blockArr[i] = includeFour ? 1 : 0;
            }
            if (blockArr[i] &&
                (gameRules != RENJU_RULES || color != 2 || !isFoul(i, arr))) {
                blockPoints[++blockPoints[0]] = i;
            }
        }
    }
    else { // 有33，暴力搜索防点
        for (BYTE i = 0; i < end; i++) {
            arr[vcfMoves[i]] = 0;
        }
        for (BYTE i = 0; i < 225; i++) {
            bool isPush = FOUR_NOFREE == (FOUL_MAX & blockInfoArr[i]) ? includeFour : true;
            if (isPush && arr[i] == 0 &&
                (gameRules != RENJU_RULES || color != 2 || !isFoul(i, arr))) {
                arr[i] = INVERT_COLOR[color];
                if (!isVCF(color, arr, vcfMoves, vcfMovesLen)) {
                    blockPoints[++blockPoints[0]] = i;
                }
                arr[i] = 0;
            }
        }
    }
}

//--------------------------------------------------

