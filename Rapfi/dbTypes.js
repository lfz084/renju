"use strict";

const ACTUAL_BOARD_SIZE = 15;

/// Rule is the fundamental rule of the game
const Rule = {
    FREESTYLE: 0,
    STANDARD: 1,
    RENJU: 2,
    RULE_NB: 3
};

const Color = {
    BLACK: 0,
    WHITE: 1,
    WALL: 2,
    EMPTY: 3,
    COLOR_NB: 4, // Total number of color on board
    SIDE_NB: 2 // Two side of stones (Black and White)
};

// Integer value that representing the result of a search
const Value = {
    VALUE_ZERO: 0,
    VALUE_DRAW: 0,
    VALUE_MATE: 30000,
    VALUE_INFINITE: 30001,
    VALUE_NONE: -30002,
    VALUE_BLOCKED: -30003,

    VALUE_MATE_IN_MAX_PLY: 30000 - 500,
    VALUE_MATED_IN_MAX_PLY: -30000 + 500,
    VALUE_MATE_FROM_DATABASE: 30000 - 500,
    VALUE_MATED_FROM_DATABASE: -30000 + 500,

    VALUE_EVAL_MAX: 20000,
    VALUE_EVAL_MIN: -20000
};


//-------------------- rotate -------------------------

function rotate90(centerX, centerY, _x, _y) {
    let x = centerX - _x,
        y = centerY - _y;
    return (centerX + y) + (centerY - x) * 15;
}

function reflectX(centerY, _x, _y) {
    return _x + (centerY * 2 - _y) * 15;
}

function rotatePosition(w, h, position) {
    const nPosition = new Array(225).fill(0);
    for (let i = 0; i < 225; i++) {
        if (position[i]) {
            const idx = rotate90((w - 1) / 2, (h - 1) / 2, i % 15, ~~(i / 15))
            nPosition[idx] = position[i];
        }
    }
    return nPosition;
}

function reflectPosition(w, h, position) {
    const nPosition = new Array(225).fill(0);
    for (let i = 0; i < 225; i++) {
        if (position[i]) {
            const idx = reflectX((h - 1) / 2, i % 15, ~~(i / 15))
            nPosition[idx] = position[i];
        }
    }
    return nPosition;
}

//------------------------- getStones --------------------------

function getStones(position, sideToMove) {
    let blackIndex = 0;
    let whiteIndex = 0;
    const blackStones = [];
    const whiteStones = [];
    for (let x = 0; x < 15; x++) {
        for (let y = 0; y < 15; y++) {
            const idx = x + y * 15;
            if (position[idx] == 1) {
                blackStones[blackIndex++] = x;
                blackStones[blackIndex++] = y;
            }
            else if (position[idx] == 2) {
                whiteStones[whiteIndex++] = x;
                whiteStones[whiteIndex++] = y;
            }
        }
    }
    const numBlackStones = blackStones.length >>> 1;
    const numWhiteStones = whiteStones.length >>> 1;
    const side = numBlackStones - numWhiteStones;
    if (side < sideToMove) { //add passMove
        for (let i = side; i < sideToMove; i++) {
            blackStones.push(0xFF, 0xFF);
        }
    }
    else if (side > sideToMove) {
        for (let i = side; i > sideToMove; i--) {
            whiteStones.push(0xFF, 0xFF);
        }
    }
    
    return blackStones.concat(whiteStones);
}

function compareStone(lx, ly, rx, ry) {
    lx == 0xFF && (lx = -1);
    ly == 0xFF && (ly = -1);
    rx == 0xFF && (rx = -1);
    ry == 0xFF && (ry = -1);
    return (lx * 32 + ly) - (rx * 32 + ry);
}

function compareStones(lStones, rStones, numCompare = lStones.length, sIndex = 0) {
    for (let i = 0; i < numCompare; i += 2) {
        const diff = compareStone(lStones[sIndex + i], lStones[sIndex + i + 1], rStones[sIndex + i], rStones[sIndex + i + 1]);
        if (diff == 0) continue;
        else return diff;
    }
    return 0;
}

function smallStones(lStones, rStones) {
    const diff = compareStones(lStones, rStones);
    return diff <= 0 ? lStones : rStones;
}

//---------------------- CompactDBKey -------------------

/*
class CompactDBKey {
    constructor(rule, boardWidth, boardHeight, sideToMove, numBlackStones, numWhiteStones, stones) {
        this.uint8 = new Uint8Array([rule, boardWidth, boardHeight, sideToMove, numBlackStones, numWhiteStones].concat(...stones)); //(stones.length + 6);
    }

    get rule() { return this.uint8[0] };
    get boardWidth() { return this.uint8[1] };
    get boardHeight() { return this.uint8[2] };
    get sideToMove() { return this.uint8[3] };
    get numBlackStones() { return this.uint8[4] };
    get numWhiteStones() { return this.uint8[5] };

    set rule(r) { this.uint8[0] = r };
    set boardWidth(w) { this.uint8[1] = w };
    set boardHeight(h) { this.uint8[2] = h };
    set sideToMove(s) { this.uint8[3] = s };
    set numBlackStones(b) { this.uint8[4] = b };
    set numWhiteStones(w) { this.uint8[5] = w };

    static isEqual(key1, key2) {

    }

    static toStringKey(key) {
        return String.fromCharCode(...key.uint8);
    }
}

CompactDBKey.prototype.blackStonesBegin = function() { return 6 };
CompactDBKey.prototype.blackStonesEnd = function() { return 6 + this.uint8[4] };
CompactDBKey.prototype.whiteStonesBegin = function() { return 6 + this.uint8[4] };
CompactDBKey.prototype.whiteStonesEnd = function() { return 6 + this.uint8[4] + this.uint8[5] };


class DBKey extends CompactDBKey{
    constructor(rule, boardWidth, boardHeight, sideToMove, numBlackStones, numWhiteStones, stones) {
        super(rule, boardWidth, boardHeight, sideToMove, numBlackStones, numWhiteStones, stones);
    }
}
*/

function constructAllDBKey(rule, boardWidth, boardHeight, sideToMove, position) {
    const Keys = [];
    for (let i = 0; i < 8; i++) {
        if (i == 4) {
            position = reflectPosition(boardWidth, boardHeight, position);
        }
        else if (i) { // 1,2,3,5,6,7
            position = rotatePosition(boardWidth, boardHeight, position);
        }
        const stones = getStones(position, sideToMove);
        const numKeyBytes = 3 + stones.length;
        Keys[i] = [numKeyBytes & 0xFF, numKeyBytes >>> 8, rule, boardWidth, boardHeight].concat(stones);
    }
    return Keys;
}


function constructDBKey(rule, boardWidth, boardHeight, sideToMove, position, rtObject = {}) {
    let rt;
    let small = [0xFFFF, 0xFFFF];
    for (let i = 0; i < 8; i++) {
        if (i == 4) {
            position = reflectPosition(boardWidth, boardHeight, position);
        }
        else if (i) { // 1,2,3,5,6,7
            position = rotatePosition(boardWidth, boardHeight, position);
        }
        const stones = getStones(position, sideToMove);
        small = smallStones(stones, small);
        
        if (stones == small) {
        	rtObject.trans = i;
        }
    }
    const numKeyBytes = 3 + small.length;
    const keyArray = [numKeyBytes & 0xFF, numKeyBytes >>> 8, rule, boardWidth, boardHeight].concat(small);
    return keyArray;
}

/// The three-way comparator of two database key.
/// DBKey is sorted using an "ascending" lexicographical order, in the following:
///     1. rule
///     2. board width
///     3. board height
///     4. stone positions
///     5. side to move (black=0, white=1)
/// @return Negative if lhs < rhs; 0 if lhs > rhs; Positive if lhs > rhs.

function databaseKeyCompare(lUint8, rUint8) {
    
    let diff = lUint8[2] - rUint8[2]; //rule
    if (diff != 0) return diff;
    diff = lUint8[3] - rUint8[3]; //board width
    if (diff != 0) return diff;
    diff = lUint8[4] - rUint8[4]; //board height
    if (diff != 0) return diff;
    
    const numBytesLhs = (lUint8[0] | lUint8[1] << 8) - 3;
    const numBytesRhs = (rUint8[0] | rUint8[1] << 8) - 3;
    const numCompare = Math.min(numBytesLhs, numBytesRhs);
    if (numBytesLhs != numBytesRhs) return numBytesLhs - numBytesRhs;
    diff = compareStones(lUint8, rUint8, numCompare, 5);
    if (diff != 0) return diff;

    
    const numBlackStonesL = ((numBytesLhs >>> 1) + 1) >>> 1;
    const numWhiteStonesL = numBytesLhs >>> 1 >>> 1;
    const sideToMoveL = numBlackStonesL == numWhiteStonesL ? Color.BLACK : Color.WHITE;

    const numBlackStonesR = ((numBytesRhs >>> 1) + 1) >>> 1;
    const numWhiteStonesR = numBytesRhs >>> 1 >>> 1;
    const sideToMoveR = numBlackStonesR == numWhiteStonesR ? Color.BLACK : Color.WHITE;
    
    return sideToMoveL - sideToMoveR;
}


//-------------------------- DBRecord -----------------------
/// DBLabel represents a one-byte tag that attached to a node in the game DAG.
const LABEL_NULL = 0; /// Null record, default constructed, only stores key in database
const LABEL_NONE = 0xFF //c++ = -1; /// Undetermined result

const LABEL_RESULT_MARKS_BEGIN = 32;

const LABEL_FORCEMOVE = '!'.charCodeAt(); /// the forced move (will be used as root move if exist)
const LABEL_WIN = 'w'.charCodeAt(); /// a winning position
const LABEL_LOSE = 'l'.charCodeAt(); /// a losing position
const LABEL_DRAW = 'd'.charCodeAt(); /// a draw position
const LABEL_BLOCKMOVE = 'x'.charCodeAt(); /// a blocked position (will not be considered in search)

const LABEL_RESULT_MARKS_END = 127;

/// DBRecordMask specify what parts of a record are selected.
const RECORD_MASK_NONE = 0x0;
const RECORD_MASK_LABEL = 0x1;
const RECORD_MASK_VALUE = 0x2;
const RECORD_MASK_DEPTHBOUND = 0x4;
const RECORD_MASK_TEXT = 0x8;

const RECORD_MASK_LVDB = RECORD_MASK_LABEL | RECORD_MASK_VALUE | RECORD_MASK_DEPTHBOUND;
const RECORD_MASK_ALL = RECORD_MASK_LVDB | RECORD_MASK_TEXT;

//this.label      // label ('l' or 'w' or '\0', 1 byte)
//this.value      // value (int16, 2 bytes, optional)
//this.depthbound // depth & bound (int16, 2 bytes, optional)
//this.text       // utf-8 text message (string ending with '\0', (n3 - 5) bytes, optional)

class DBRecord {
    constructor(buf) {
        this.uint8 = new Uint8Array(buf)
    }

    get label() { return this.uint8[0] }
    get value() { return this.uint8[1] | this.uint8[2] << 8 }
    get depthbound() { return this.uint8[3] | this.uint8[4] << 8 }
    get text() { return this.uint8.slice(5) }

    /// Return the depth component of a depth bound.
    get depth() { return this.depthbound >> 2 }
    /// Return the bound component of a depth bound.
    get bound() { return this.depthbound & 0b11 }

    set depthbound(depthbound) {
        this.uint8[3] = depthbound;
        this.uint8[4] = depthbound >>> 8;
    }

    set text(codebuf) {
        this.uint8 = new Uint8Array([this.uint8.slice(0, 5)].concat(...codebuf));
    }
}

/// Set a new depth and bound for this record.
DBRecord.prototype.setDepthBound = function(depth, bound) {
    const depthbound = depth << 2 | bound;
    this.uint8[3] = depthbound;
    this.uint8[4] = depthbound >>> 8;
    return depthbound;
}


/// Checks if this record is a null record
DBRecord.prototype.isNull = function() {
    return this.label == LABEL_NULL;
}

/// Update label, value, depth, bound of this record
DBRecord.prototype.update = function(rhs, mask) {
    if (mask & RECORD_MASK_LABEL)
        this.label = rhs.label;
    if (mask & RECORD_MASK_VALUE)
        this.value = rhs.value;
    if (mask & RECORD_MASK_DEPTHBOUND)
        this.depthbound = rhs.depthbound;
    if (mask & RECORD_MASK_TEXT) {
        this.text = rhs.text;
        // Make sure text is not saved as null label
        if (this.label == LABEL_NULL && !text.empty())
            this.label = LABEL_NONE;
    }
}
