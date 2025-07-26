"use strict";
//if (self.SCRIPT_VERSIONS) self.SCRIPT_VERSIONS["Evaluator"] = "2024.23206";
const DIRECTIONS = [0, 1, 2, 3] //[→, ↓, ↘, ↗]; // 米字线
const FIND_ALL = 0;
const ONLY_FREE = 1; // 只找活3，活4
const ONLY_NOFREE = 2; // 只找眠3，眠4
const ONLY_VCF = 1; // 只找做VCF点
const ONLY_SIMPLE_WIN = 2; // 只找43级别做杀点

const GOMOKU_RULES = 1; //无禁
const RENJU_RULES = 2; //有禁

//---------------- color --------------------

const BLACK_COLOR = 1;
const WHITE_COLOR = 2;
const INVERT_COLOR = [0, 2, 1]; //利用数组反转棋子颜色

//---------------- level --------------------
const LEVEL_MARK_FREEFOUR = 0x80;
const LEVEL_MARK_LINE_DOUBLEFOUR = 0x40;
const LEVEL_MARK_MULTILINE_DOUBLEFOUR = 0x20;
const LEVEL = 0x0f;
const LEVEL_FOUL = 30;
const LEVEL_WIN = 10;
const LEVEL_FREEFOUR = 9;
const LEVEL_NOFREEFOUR = 8;
const LEVEL_DOUBLEFREETHREE = 7;
const LEVEL_DOUBLEVCF = LEVEL_DOUBLEFREETHREE;
const LEVEL_FREETHREE = 6;
const LEVEL_VCF = LEVEL_FREETHREE;
const LEVEL_VCT = 4;
const LEVEL_NONE = 0;
const LEVEL_TRUE_FREEFOUR = LEVEL_MARK_FREEFOUR | LEVEL_FREEFOUR;
const LEVEL_LINE_DOUBLEFOUR = LEVEL_MARK_LINE_DOUBLEFOUR | LEVEL_FREEFOUR;
const LEVEL_MULTILINE_DOUBLEFOUR = LEVEL_MARK_MULTILINE_DOUBLEFOUR | LEVEL_FREEFOUR;
const LEVEL_CATCHFOUL = 0 | LEVEL_FREEFOUR;

//--------------- lineInfo ------------------

const FREE = 1; //0b00000001
const MAX = 14; //0b00001110
const MAX_FREE = 15; //0b00001111
const FOUL = 16; //0b00010000
const FOUL_FREE = 17; //0b00010001
const FOUL_MAX = 30; //0b00011110
const FOUL_MAX_FREE = 31; //0b00011111
const MARK_MOVE = 224; //0b11100000
const FREE_COUNT = 0x0700; //0b00000111 00000000
const ADD_FREE_COUNT = 0x800; //0b00001000 00000000
const MAX_COUNT = 0x7000; //0b01110000 00000000
const DIRECTION = 0x7000; //0b01110000 00000000
const ADD_MAX_COUNT = 0x8000; //0b10000000 00000000
const ZERO = 0;
const ONE_FREE = 3;
const ONE_NOFREE = 2;
const TWO_FREE = 5;
const TWO_NOFREE = 4;
const THREE_FREE = 7;
const THREE_NOFREE = 6;
const FOUR_FREE = 9;
const FOUR_NOFREE = 8;
const LINE_DOUBLE_FOUR = 24;
const FIVE = 10;
const SIX = 28;
const SHORT = 14; //空间不够

const EMPTYLIST = new Array(15);

const LINE_NAME = {
	1: "活",
	16: "禁手",
	0: "零",
	3: "活一",
	2: "眠一",
	5: "活二",
	4: "眠二",
	7: "活三",
	6: "眠三",
	9: "活四",
	8: "冲四",
	24: "四四",
	10: "五连",
	28: "长连",
	14: "空间不足"
}

//--------------------- game -----------------------------

let gameRules = RENJU_RULES;
let cBoardSize = 15;

//---------------  ------------------ ------------------

if ("loadEvaluatorWebassembly" in self) {
	loadEvaluatorWebassembly.call(this);
	console.warn("loadEvaluatorWebassembly");
}
else if ("loadEvaluatorJScript" in self) {
	loadEvaluatorJScript.call(this);
	console.warn("loadEvaluatorJScript");
}
else throw new Error(`"loadEvaluatorWebassembly" && "loadEvaluatorJScript" not found`)

//---------------------- IDX_LISTS ------------------------

const IDX_LISTS = [[], [], [], []];

for (let direction = 0; direction < 4; direction++) {
	switch (direction) { //生成阴线，阳线
		case 0:
			for (let y = 0; y < 15; y++) {
				IDX_LISTS[direction][y] = [];
				for (let x = 0; x < 15; x++) {
					IDX_LISTS[direction][y][x] = y * 15 + x;
				}
			}
			break;
		case 1:
			for (let x = 0; x < 15; x++) {
				IDX_LISTS[direction][x] = [];
				for (let y = 0; y < 15; y++) {
					IDX_LISTS[direction][x][y] = y * 15 + x;
				}
			}
			break;
		case 2:
			for (let i = 0; i < 15; i++) {
				IDX_LISTS[direction][i] = [];
				for (let j = 0; j <= i; j++) {
					let x = 0 + j,
						y = x + 14 - i;
					IDX_LISTS[direction][i][j] = y * 15 + x;
				}
			}
			for (let i = 13; i >= 0; i--) {
				IDX_LISTS[direction][28 - i] = [];
				for (let j = 0; j <= i; j++) {
					let x = 14 - i + j,
						y = i - 14 + x;
					IDX_LISTS[direction][28 - i][j] = y * 15 + x;
				}
			}
			break;
		case 3:
			for (let i = 0; i < 15; i++) {
				IDX_LISTS[direction][i] = [];
				for (let j = 0; j <= i; j++) {
					let x = i - j,
						y = i - x;
					IDX_LISTS[direction][i][j] = y * 15 + x;
				}
			}
			for (let i = 13; i >= 0; i--) {
				IDX_LISTS[direction][28 - i] = [];
				for (let j = 0; j <= i; j++) {
					let x = 14 - j,
						y = 28 - i - x;
					IDX_LISTS[direction][28 - i][j] = y * 15 + x;
				}
			}
			break;
	}
}

//--------------------- line -------------------------

//return lines[]
//line: { start: idx, end: idx, "level": ["THREE_FREE" | "FOUR_NOFREE" | "FOUR_FREE" | "FIVE"] }
function getLines(arr, color) {
	let infoArr = new Array(226),
		lineINFO = new Uint32Array(226),
		lines = [];
	testThree(arr, color, infoArr); //取得活三以上的点

	infoArr.map((info, idx) => { //分析每个点保存路线,3开始,1结束
		if (THREE_FREE <= (info & FOUL_MAX_FREE) && (info & FOUL_MAX_FREE) <= FIVE) {
			for (let direction = 0; direction < 4; direction++) {
				let lineInfo = testLineThree(idx, direction, color, arr),
					move = (lineInfo & 0xff) >>> 5,
					i;
				switch (FOUL_MAX_FREE & lineInfo) {
					case FIVE:
						for (let m = -4; m < 0; m++) {
							i = moveIdx(idx, m + (move), direction);
							lineINFO[i] |= (3 << 6 << direction * 8);
						}
						i = moveIdx(idx, move, direction);
						lineINFO[i] |= (1 << 6 << direction * 8);
						break;
					case FOUR_FREE:
						for (let m = -5; m < 0; m++) {
							i = moveIdx(idx, m + (move), direction);
							lineINFO[i] |= (3 << 4 << direction * 8);
						}
						i = moveIdx(idx, move, direction);
						lineINFO[i] |= (1 << 4 << direction * 8);
						break;
					case FOUR_NOFREE:
						for (let m = -4; m < 0; m++) {
							i = moveIdx(idx, m + (move), direction);
							lineINFO[i] |= (3 << 2 << direction * 8);
						}
						i = moveIdx(idx, move, direction);
						lineINFO[i] |= (1 << 2 << direction * 8);
						break;
					case THREE_FREE:
						for (let m = -5; m < 0; m++) {
							i = moveIdx(idx, m + (move), direction);
							lineINFO[i] |= (3 << direction * 8);
						}
						i = moveIdx(idx, move, direction);
						lineINFO[i] |= (1 << direction * 8);
						break;
				}
			}
		}
	});

	for (let direction = 0; direction < 4; direction++) {

		//console.warn(`direction: ${direction}`)
		IDX_LISTS[direction].map(list => { //找出每一条线
			const LVL = ["THREE_FREE", "FOUR_NOFREE", "FOUR_FREE", "FIVE"];
			let lineStart = [-1, -1, -1, -1],
				lineEnd = [-1, -1, -1, -1];
			//console.log(list);
			list.map(idx => {
				let v = [0, 0, 0, 0];
				v[0] = (lineINFO[idx] & (3 << direction * 8)) >>> direction * 8;
				v[1] = (lineINFO[idx] & (3 << 2 << direction * 8)) >>> 2 >>> direction * 8;
				v[2] = (lineINFO[idx] & (3 << 4 << direction * 8)) >>> 4 >>> direction * 8;
				v[3] = (lineINFO[idx] & (3 << 6 << direction * 8)) >>> 6 >>> direction * 8;
				//console.log(`direction: ${direction}, ${lineINFO[idx].toString(2)},\n${v[0].toString(2)}, ${v[1].toString(2)}, ${v[2].toString(2)}, ${v[3].toString(2)}`)
				for (let vi = 0; vi < 4; vi++) {
					if (v[vi] == 3) {
						if (lineStart[vi] == -1) lineStart[vi] = idx;
						else lineEnd[vi] = idx;
					}
					else if (v[vi] == 1) {
						if (lineStart[vi] > -1 && lineEnd[vi] > -1) {
							lines.push({ "start": lineStart[vi], "end": idx, "level": LVL[vi] });
						}
						lineStart[vi] = lineEnd[vi] = -1;
					}
				}
			});
		});
	}

	return lines;
}

//---------------  ------------------ ------------------

//return string: length = 45
function getKey(arr) {
	let key = "";
	for (let y = 0; y < 15; y++) {
		for (let i = 0; i < 15; i += 5) {
			let sum = 0;
			for (let j = 0; j < 5; j++) {
				let m = arr[y][i + j];
				sum += m * Math.pow(3, j);
			}
			key += String.fromCharCode(sum);
		}
	}
	return key;
}

//return number
function getMoveKey(move) {
	const MOVE_LEN = move.length;
	let sum = 0; // 对每一手棋索引求，保存到数组最后位置。
	for (let i = 0; i < MOVE_LEN; i += 2) {
		sum += move[i];
	}
	return sum;
}

//arr[] to arr[15][15]
//return arr[15][15]
function getArr2D(arr, setnum = 0, x = 15, y = 15) {
	let j = 0;
	arr.length = 0;
	for (j = 0; j < y; j++) {
		arr[j] = [];
		for (let i = 0; i < x; i++) {
			arr[j][i] = setnum;
		}
	}
	return arr;
}

//Int8Array, Uint8Array... To Array,
function TypedArray2Array(moves) {
	let m = [];
	let len = moves.length
	for (let i = 0; i < len; i++) {
		m[i] = moves[i];
	}
	return m;
}

//  复制一个arr二维数组, 
function copyArr2D(arr, arr2) {
	getArr2D(arr);
	for (let y = 0; y < 15; y++) {
		for (let x = 0; x < 15; x++) {
			arr[y][x] = arr2[y][x];
		}
	}
	return arr;
}

function getX(idx) {
	return idx % 15;
}

function getY(idx) {
	return ~~(idx / 15);
}

// index ，转字母数字坐标
function idxToName(idx) {
	let alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	let x = getX(idx);
	let y = getY(idx);
	if (x < 0 || x >= cBoardSize || y < 0 || y >= cBoardSize)
		return "--";
	else
		return alpha.charAt(x) + (cBoardSize - y);
}

function movesToName(moves, maxLength) {
	let name = "";
	for (let i = 0; i < moves.length; i++) {
		name += `${i?",":""}${idxToName(moves[i])}`;
		if (name.length >= maxLength) {
			name += "......";
			break;
		}
	}
	return name;
}

//----------------------- xxh32 -----------------------------

var { xxh4, xxh32 } = (() => {
	// Simple hash function, from: http://burtleburtle.net/bob/hash/integer.html.
    // Chosen because it doesn't use multiply and achieves full avalanche.

    // Reads a 32-bit little-endian integer from an array.
    function readU32(b, n) {
        var x = 0;
        x |= b[n++] << 0;
        x |= b[n++] << 8;
        x |= b[n++] << 16;
        x |= b[n++] << 24;
        return x;
    }

    // Multiplies two numbers using 32-bit integer multiplication.
    // Algorithm from Emscripten.
    function imul(a, b) {
        var ah = a >>> 16;
        var al = a & 65535;
        var bh = b >>> 16;
        var bl = b & 65535;

        return al * bl + (ah * bl + al * bh << 16) | 0;
    }

    // xxh32.js - implementation of xxhash32 in plain JavaScript
    
    // xxhash32 primes
    var prime1 = 0x9e3779b1;
    var prime2 = 0x85ebca77;
    var prime3 = 0xc2b2ae3d;
    var prime4 = 0x27d4eb2f;
    var prime5 = 0x165667b1;

    // Utility functions/primitives
    // --

    function rotl32(x, r) {
        x = x | 0;
        r = r | 0;

        return x >>> (32 - r | 0) | x << r | 0;
    }

    function rotmul32(h, r, m) {
        h = h | 0;
        r = r | 0;
        m = m | 0;

        return imul(h >>> (32 - r | 0) | h << r, m) | 0;
    }

    function shiftxor32(h, s) {
        h = h | 0;
        s = s | 0;

        return h >>> s ^ h | 0;
    }

    // Implementation
    // --

    function xxhapply(h, src, m0, s, m1) {
        return rotmul32(imul(src, m0) + h, s, m1);
    }

    function xxh1(h, src, index) {
        return rotmul32((h + imul(src[index], prime5)), 11, prime1);
    }

    function xxh4(h, src, index) {
        return xxhapply(h, readU32(src, index), prime3, 17, prime4);
    }

    function xxh16(h, src, index) {
        return [
    xxhapply(h[0], readU32(src, index + 0), prime2, 13, prime1),
    xxhapply(h[1], readU32(src, index + 4), prime2, 13, prime1),
    xxhapply(h[2], readU32(src, index + 8), prime2, 13, prime1),
    xxhapply(h[3], readU32(src, index + 12), prime2, 13, prime1)
  ];
    }

    function xxh32(seed, src, index, len) {
        var h, l;
        l = len;
        if (len >= 16) {
            h = [
      seed + prime1 + prime2,
      seed + prime2,
      seed,
      seed - prime1
    ];
    let s = "";
    s += `${h.length} : ${h.map(v => v.toString(10))}\n`

            while (len >= 16) {
                h = xxh16(h, src, index);
                s += `${h.length} : ${h.map(v => v.toString(10))}\n`
                index += 16;
                len -= 16;
            }

            h = rotl32(h[0], 1) + rotl32(h[1], 7) + rotl32(h[2], 12) + rotl32(h[3], 18) + l;
        } else {
            h = (seed + prime5 + len) >>> 0;
        }

        while (len >= 4) {
            h = xxh4(h, src, index);

            index += 4;
            len -= 4;
        }

        while (len > 0) {
            h = xxh1(h, src, index);

            index++;
            len--;
        }

        h = shiftxor32(imul(shiftxor32(imul(shiftxor32(h, 15), prime2), 13), prime3), 16);

        return h >>> 0;
    }
    return { xxh4, xxh32 };
})()

//--------------------- moves HashTable ------------------------

let HASHTABLE_MAX_MOVESLEN = 225;
/**
 * lMove.length == rMove.length 时判断两个手顺个是否相等
 * lMove.length < rMove.length 时判断 rMove 是否为 lMove 分支手顺
 * position rMove 对应的 position
 */
function isChildMove(lMove, rMove, position) {
	if (!position) {
		position = new Array(225);
		for (let j = rMove.length - 1; j >= 0; j--) position[rMove[j]] = (j & 1) + 1;
	}
	for (let k = lMove.length - 1; k >= 0; k--) {
		if (position[lMove[k]] != (k & 1) + 1) return false;
	}
	return true;
}

function isRepeatMove(oldMove, newMove, position) {
	return isChildMove(oldMove, newMove, position);
}

// 添加一个VCF
function pushWinMoves(winMoves, move) {
	let i;
	const MOVE_LEN = move.length;
	const WINMOVES_LEN = winMoves.length;

	function getSpliceStart(move, moves) {
		const LEN = move.length;
		for (let i = 0; i < moves.length; i++) {
			if (moves[i].length >= LEN) return i;
		}
		return moves.length;
	}
	for (i = WINMOVES_LEN - 1; i >= 0; i--) {
		if (MOVE_LEN < winMoves[i].length) {
			if (isChildMove(move, winMoves[i])) { // 把所有重复的替换掉
				winMoves.splice(i, 1);
			}
		}
		else {
			if (isChildMove(winMoves[i], move)) {
				return false;
			}
		}
	}
	const START = getSpliceStart(move, winMoves);
	winMoves.splice(START, 0, move.slice(0));
	return true;
}

function resetHashTable(hashTable) {
	let hashcollision = 0;
	//hashTable.map(v => v.length > hashcollision && (hashcollision = v.length))
	hashTable.length = 0;
	Object.assign(vcfInfo, { hashcollision })
}

const sortMoves = function (moves, position) {
	let d = 0,
		s = 1;
	for(let i = 0; i < 225; i++) {
		const v = position[i];
		if (v == 1) {
			moves[d] = i;
			d += 2
		}
		else if(v == 2) {
			moves[s] = i;
			s += 2
		}
		if(d >= moves.length && s >= moves.length) break;
	}
	return moves;
}

const sortList = function(list) {
	for (let i = 0; i < list.length; i++) {
		const position = new Array(225);
		const moves = list[i];
		for (let j = 0; j < moves.length; j++) {
			position[moves[j]] = (j & 1) + 1;
		}
		sortMoves(moves, position);
	}
	list.sort((lMoves, rMoves) => compareMoves(lMoves, rMoves))
}

const compareMoves = function(lMoves, rMoves) {
	for (let i = 0; i < lMoves.length; i++) {
		const v = lMoves[i] - rMoves[i];
		if (v) return v
	}
	return 0;
}

const push = function(list, moves, position) {
	if (64 > list.length + 1) {
		list.push(moves.slice(0))
	}
	else {
		if (64 === list.length + 1) sortList(list)
		let index = 0,
			st = 0,
			ed = list.length - 1;
		moves = sortMoves(new Array(moves.length), position);
		while (st <= ed) {
			const cur = ~~((ed - st) / 2) + st;
			const v = compareMoves(list[cur], moves);
			if (v === 0) return
			else if (v < 0) (st = cur + 1, index = cur + 1)
			else (ed = cur - 1, index = cur)
		}
		list.splice(index, 0, moves)
	}
}

const has = function(list, moves, position) {
	if (64 > list.length) {
		let i;
		for (i = list.length - 1; i >= 0; i--) {
			if (isRepeatMove(list[i], moves, position)) break;
		}
		return i >= 0;
	}
	else {
		let st = 0,
			ed = list.length - 1;
		moves = sortMoves(new Array(moves.length), position);
		while (st <= ed) {
			const cur = ~~((ed - st)/2) + st;
			const v = compareMoves(list[cur], moves);
			if (v === 0) return true
			else if(v < 0) st = cur + 1
			else ed = cur - 1
		}
		return false
	}
}

function xxhashKey(keyLen, keySum, keySum1) {
	return xxh4(0, [keyLen >>> 4 | keySum >>> 8, keySum & 0xFF, keyLen & 0xF | keySum1 >>> 8, keySum1 & 0xFF], 0) & 0xFFFFF
}

function movesPush(hashTable, keyLen, keySum, keySum1, moves, position) {
	const key = xxhashKey(keyLen, keySum, keySum1);
	!hashTable[key] && (hashTable[key] = []);
	push(hashTable[key], moves, position); // 保存已搜索分支
	vcfInfo.size += (moves.length + 8);
}

function movesHas(hashTable, keyLen, keySum, keySum1, moves, position) {
	const key = xxhashKey(keyLen, keySum, keySum1);
	if (!hashTable[key]) return false;
	return has(hashTable[key], moves, position);
}

function transTablePush(hashTable, keyLen, keySum, keySum1, moves, position) {
	movesPush(hashTable, keyLen, keySum, keySum1, moves, position);
}

function transTableHas(hashTable, keyLen, keySum, keySum1, moves, position) {
	return movesHas(hashTable, keyLen, keySum, keySum1, moves, position);
}

var hashTable = {
	table: {
		head: new Uint32Array(0x200000),
		pages: [new Uint8Array(0x400000)],
		idxPage: 0,
		idxBuffer: 1
	},
	clear() {
		this.table.head = new Uint32Array(0x200000);
		this.table.pages = [new Uint8Array(0x400000)];
		this.table.idxPage = 0;
		this.table.idxBuffer = 1;
	},
	addPage() {
		this.table.pages.push(new Uint8Array(0x400000));
		this.table.idxPage = this.table.pages.length - 1;
		this.table.idxBuffer = 1;
	},
	getBuffer(bytes) {
		(this.table.idxBuffer + bytes >= 0x400000) && this.addPage();
		const rt = this.table.idxPage << 24 | this.table.idxBuffer;
		this.table.idxBuffer += bytes;
		return rt;
	},
	has(keyLen, keySum, keySum1, moves, position) {
		
	},
	set(keyLen, keySum, keySum1, moves, position) {
		
	}
};
Object.freeze(hashTable);

//--------------------- VCF ------------------------

let vcfHashTable = [],
	vcfWinMoves = [];
var vcfInfo = {
		initArr: new Array(226),
		color: 0,
		maxVCF: 0,
		maxDepth: 0,
		maxNode: 0,
		vcfCount: 0,
		pushMoveCount: 0,
		pushPositionCount: 0,
		hasCount: 0,
		nodeCount: 0,
		winMoves: vcfWinMoves,
		continueInfo: [new Array(225), new Array(225), new Array(225), new Array(225)]
	},
	levelBInfo = {
		levelInfo: 0,
		winMoves: undefined
	};

function resetVCF(arr, color, maxVCF, maxDepth, maxNode) {
	vcfInfo.initArr = arr.slice(0);
	vcfInfo.color = color;
	vcfInfo.maxVCF = maxVCF;
	vcfInfo.maxDepth = maxDepth;
	vcfInfo.maxNode = maxNode;
	vcfInfo.vcfCount = 0;
	vcfInfo.pushMoveCount = 0;
	vcfInfo.pushPositionCount = 0;
	vcfInfo.hasCount = 0;
	vcfInfo.nodeCount = 0;
	vcfInfo.size = 0;
	vcfWinMoves.length = 0;
	vcfInfo.continueInfo = [new Array(225), new Array(225), new Array(225), new Array(225)];
	resetHashTable(vcfHashTable);
}

//---------------------- VCT ----------------------------

function continueFour(arr, color, maxVCF, maxDepth, maxNode) {
	findVCF(arr, color, maxVCF, maxDepth, maxNode);
	return vcfInfo.continueInfo;
}

function aroundPoint(arr, color, radius = 4, ctnInfo = [new Array(225), new Array(225), new Array(225), new Array(225)]) {
	let rtArr = new Array(225);

	for (let i = 0; i < 225; i++) {
		ctnInfo[0][i] = arr[i] | (ctnInfo[color][i] && color);
	}

	for (let direction = 0; direction < 4; direction++) {
		let listStart = 0,
			listEnd = IDX_LISTS[direction].length;
		for (let list = listStart; list < listEnd; list++) {
			let moveStart = 0,
				moveEnd = IDX_LISTS[direction][list].length,
				move = moveStart;
			while (move < moveEnd) {
				let idx = IDX_LISTS[direction][list][move],
					left,
					right;
				if (ctnInfo[0][idx] & color) {
					left = Math.max(moveStart, move - radius);
					right = Math.min(moveEnd, move + radius + 1);

					while (++move < moveEnd && move < (right + radius)) {
						idx = IDX_LISTS[direction][list][move];
						if (ctnInfo[0][idx] & color) right = Math.min(moveEnd, move + radius + 1);
					}

					for (let m = left; m < right; m++) {
						idx = IDX_LISTS[direction][list][m];
						arr[idx] == 0 && (rtArr[idx] = 1);
					}
				}
				else move++;
			}
		}
	}
	return rtArr;
}

function selectPoints(arr, color, radius = 4, maxVCF = 1, maxDepth = 3, maxNode = 100000) {
	let ctnArr = continueFour(arr, color, 255 || maxVCF, 3 || maxDepth, 100000 || maxNode);
	return aroundPoint(arr, color, radius, maxVCF ? ctnArr : undefined);
}

function selectPointsLevel(arr, color, radius = 4, maxVCF = 1, maxDepth = 10, maxNode = 100000, nMaxDepth) {
	let info = getLevelB(arr, INVERT_COLOR[color], maxVCF, nMaxDepth || maxDepth, maxNode),
		idx = info >> 8 & 0xff,
		level = info & FOUL_MAX,
		rtArr = new Array(225);
	switch (level) {
		case LEVEL_WIN:
			break;
		case LEVEL_NOFREEFOUR:
			rtArr[idx] = 1;
			break;
		case LEVEL_VCF:
			let winMoves = levelBInfo.winMoves;
			if (winMoves.length) {
				let points = getBlockVCF(arr, INVERT_COLOR[color], winMoves, true);
				points.map(idx => rtArr[idx] = 1)
			}
			break;
		default:
			rtArr = selectPoints(arr, color, radius, maxVCF, maxDepth, maxNode)
	}
	return rtArr;
}

function resetLevelBInfo() {
	levelBInfo.levelInfo = LEVEL_NONE;
	levelBInfo.winMoves = undefined;
}

function getLevelB(arr, color, maxVCF, maxDepth, maxNode) {
	let levelInfo = getLevel(arr, color);
	resetLevelBInfo();
	if (levelInfo) {
		levelBInfo.levelInfo = levelInfo;
		levelBInfo.winMoves = undefined;
		return levelInfo;
	}

	findVCF(arr, color, maxVCF, maxDepth, maxNode);
	let value = vcfInfo.nodeCount > 255 ? 255 : vcfInfo.nodeCount;
	if (vcfInfo.vcfCount) {
		levelBInfo.levelInfo = LEVEL_VCF | (value << 8);
		levelBInfo.winMoves = vcfInfo.winMoves[0].slice(0);
	}
	else if (vcfInfo.nodeCount > 2) {
		levelBInfo.levelInfo = LEVEL_VCT | (value << 8);
		levelBInfo.winMoves = undefined;
	}
	else {
		levelBInfo.levelInfo = LEVEL_NONE;
		levelBInfo.winMoves = undefined;
	}
	return levelBInfo.levelInfo;
}

function excludeBlockVCF(points, arr, color, maxVCF, maxDepth, maxNode) {
	let clone = points.slice(0),
		result = [];
	while (clone.length) {
		let i = clone.length - 1,
			idx = clone.splice(i, 1)[0];
		if (arr[idx] == 0) {
			let winMoves;
			arr[idx] = INVERT_COLOR[color];
			winMoves = findVCF(arr, color, maxVCF, maxDepth, maxNode);
			arr[idx] = 0;
			if (winMoves.length) {
				if (winMoves.length < 8) {
					for (i = i - 1; i >= 0; i--) {
						arr[clone[i]] = INVERT_COLOR[color];
						isVCF(color, arr, winMoves) && clone.splice(i, 1);
						arr[clone[i]] = 0;
					}
				}
			}
			else {
				result.unshift(idx);
			}
		}
	}
	return result;
}

// ❗color 是进攻方的颜色
function getBlockPoints(arr, color, radius = 4, maxVCF = 1, maxDepth = 10, maxNode = 100000) {
	let levelInfo = getLevelB(arr, color, maxVCF, maxDepth, maxNode),
		level = levelInfo & 0xff,
		result = [];
	switch (level) {
		case LEVEL_WIN:
		case LEVEL_FREEFOUR:
			break;
		case LEVEL_NOFREEFOUR:
			result.push(levelInfo >> 8 & 0xff);
			break;
		case LEVEL_DOUBLEFREETHREE:
		case LEVEL_DOUBLEVCF:
		case LEVEL_FREETHREE:
		case LEVEL_VCF:
			let winMoves = levelBInfo.winMoves;
			if (winMoves.length) {
				let points = getBlockVCF(arr, color, winMoves, true);
				result = excludeBlockVCF(points, arr, color, maxVCF, maxDepth, maxNode);
			}
			break;
		case LEVEL_VCT:
		case LEVEL_NONE:
			findVCF(arr, INVERT_COLOR[color], maxVCF, maxDepth, maxNode, vcfInfo.continueInfo);
			result = aroundPoint(arr, color, radius, vcfInfo.continueInfo).map((v, idx) => v > 0 ? idx : -1).filter(idx => idx > -1);
			break;
	}
	return result;
}

function getScore(idx, color, arr) {
	let infoArr = new Array(226),
		info,
		score = 2;
	/*
	testFour(arr, color, infoArr);
	for (let i = 0; i < 255; i++) {
	    info = infoArr[i] & FOUL_MAX_FREE;
	    if (info == FOUR_FREE || info == FOUR_NOFREE) arr[i] = color;
	}
	*/
	testThree(arr, color, infoArr);
	info = infoArr[idx] & FOUL_MAX_FREE;
	if (info <= FIVE) {
		for (let i = getAroundIdxCount(idx, 3); i > 0; i--) {
			info = infoArr[aroundIdx(idx, i)] & FOUL_MAX_FREE;
			switch (info) {
				case FIVE:
					score += 50;
					break;
				case FOUR_FREE:
					score += 30;
					break;
				case FOUR_NOFREE:
					score += 20;
					break;
				case THREE_FREE:
					score += 10;
					break;
				case THREE_NOFREE:
					score += 5;
					break;
			}
		}
	}
	return score < 0xFD ? score : 0xFD;
}

/** check game position. 
 * if side win return 1, 
 * else if side lose return -1, 
 * else if side foul return -2, 
 * else if board full return -3,
 * else return 0
 * @arr position
 * @side stone color
 * @idx the last move stone idx
 */
function getGameOver(arr, side, idx = -1) {
	let level;
	if (arr[idx] == side && arr[idx] == 1 && gameRules == RENJU_RULES && isFoul(idx, arr)) return -2;
	level = getLevel(arr, side)
	if (level == LEVEL_WIN) return 1;
	level = getLevel(arr, 3 - side)
	if (level == LEVEL_WIN) return -1;
	for (let i = 0; i < 225; i++) {
		if (arr[i] == 0) return 0;
	}
	return -3
}