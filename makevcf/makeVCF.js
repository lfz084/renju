window.makeVCF = (function() {
	"use strict";
	const IDXLIST = [[[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29], [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44], [45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59], [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74], [75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89], [90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104], [105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119], [120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134], [135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149], [150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164], [165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179], [180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194], [195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209], [210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224]], [[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210], [1, 16, 31, 46, 61, 76, 91, 106, 121, 136, 151, 166, 181, 196, 211], [2, 17, 32, 47, 62, 77, 92, 107, 122, 137, 152, 167, 182, 197, 212], [3, 18, 33, 48, 63, 78, 93, 108, 123, 138, 153, 168, 183, 198, 213], [4, 19, 34, 49, 64, 79, 94, 109, 124, 139, 154, 169, 184, 199, 214], [5, 20, 35, 50, 65, 80, 95, 110, 125, 140, 155, 170, 185, 200, 215], [6, 21, 36, 51, 66, 81, 96, 111, 126, 141, 156, 171, 186, 201, 216], [7, 22, 37, 52, 67, 82, 97, 112, 127, 142, 157, 172, 187, 202, 217], [8, 23, 38, 53, 68, 83, 98, 113, 128, 143, 158, 173, 188, 203, 218], [9, 24, 39, 54, 69, 84, 99, 114, 129, 144, 159, 174, 189, 204, 219], [10, 25, 40, 55, 70, 85, 100, 115, 130, 145, 160, 175, 190, 205, 220], [11, 26, 41, 56, 71, 86, 101, 116, 131, 146, 161, 176, 191, 206, 221], [12, 27, 42, 57, 72, 87, 102, 117, 132, 147, 162, 177, 192, 207, 222], [13, 28, 43, 58, 73, 88, 103, 118, 133, 148, 163, 178, 193, 208, 223], [14, 29, 44, 59, 74, 89, 104, 119, 134, 149, 164, 179, 194, 209, 224]], [[150, 166, 182, 198, 214], [135, 151, 167, 183, 199, 215], [120, 136, 152, 168, 184, 200, 216], [105, 121, 137, 153, 169, 185, 201, 217], [90, 106, 122, 138, 154, 170, 186, 202, 218], [75, 91, 107, 123, 139, 155, 171, 187, 203, 219], [60, 76, 92, 108, 124, 140, 156, 172, 188, 204, 220], [45, 61, 77, 93, 109, 125, 141, 157, 173, 189, 205, 221], [30, 46, 62, 78, 94, 110, 126, 142, 158, 174, 190, 206, 222], [15, 31, 47, 63, 79, 95, 111, 127, 143, 159, 175, 191, 207, 223], [0, 16, 32, 48, 64, 80, 96, 112, 128, 144, 160, 176, 192, 208, 224], [1, 17, 33, 49, 65, 81, 97, 113, 129, 145, 161, 177, 193, 209], [2, 18, 34, 50, 66, 82, 98, 114, 130, 146, 162, 178, 194], [3, 19, 35, 51, 67, 83, 99, 115, 131, 147, 163, 179], [4, 20, 36, 52, 68, 84, 100, 116, 132, 148, 164], [5, 21, 37, 53, 69, 85, 101, 117, 133, 149], [6, 22, 38, 54, 70, 86, 102, 118, 134], [7, 23, 39, 55, 71, 87, 103, 119], [8, 24, 40, 56, 72, 88, 104], [9, 25, 41, 57, 73, 89], [10, 26, 42, 58, 74]], [[4, 18, 32, 46, 60], [5, 19, 33, 47, 61, 75], [6, 20, 34, 48, 62, 76, 90], [7, 21, 35, 49, 63, 77, 91, 105], [8, 22, 36, 50, 64, 78, 92, 106, 120], [9, 23, 37, 51, 65, 79, 93, 107, 121, 135], [10, 24, 38, 52, 66, 80, 94, 108, 122, 136, 150], [11, 25, 39, 53, 67, 81, 95, 109, 123, 137, 151, 165], [12, 26, 40, 54, 68, 82, 96, 110, 124, 138, 152, 166, 180], [13, 27, 41, 55, 69, 83, 97, 111, 125, 139, 153, 167, 181, 195], [14, 28, 42, 56, 70, 84, 98, 112, 126, 140, 154, 168, 182, 196, 210], [29, 43, 57, 71, 85, 99, 113, 127, 141, 155, 169, 183, 197, 211], [44, 58, 72, 86, 100, 114, 128, 142, 156, 170, 184, 198, 212], [59, 73, 87, 101, 115, 129, 143, 157, 171, 185, 199, 213], [74, 88, 102, 116, 130, 144, 158, 172, 186, 200, 214], [89, 103, 117, 131, 145, 159, 173, 187, 201, 215], [104, 118, 132, 146, 160, 174, 188, 202, 216], [119, 133, 147, 161, 175, 189, 203, 217], [134, 148, 162, 176, 190, 204, 218], [149, 163, 177, 191, 205, 219], [164, 178, 192, 206, 220]]];
	const STATE_DONE = 0,
		STATE_EMPTY = 1,
		STATE_WAITING = 2,
		STATE_SEARCHING = 3,
		STATE_STOPPING = 5,
		STATE_SAVING = 6;
	let saveData = async (...args) => {};
	let maxNum = 0,
		minNum = 0,
		minLen = 0,
		state = STATE_EMPTY,
		gameCount = 0,
		depth = 0,
		path = [],
		searchCode = [],
		stones = [0, 0, 0],
		stoneCount = 0,
		color = 1;

	const vcfGames = (() => {
		const games = [];
		let minLen = 0;
		let maxLen = 200;
		let filterArr = [];
		let filterIdx = -1;

		function isEq(markArr, arr1, arr2) {
			if (arr1.length == arr2.length) {
				let i;
				for (i = arr2.length - 1; i >= 0; i--)
					if (markArr[arr2[i]] != i % 2 + 1) break;
				return i < 0;
			}
			return false;
		}

		function hasWinMove(game) {
			const markArr = new Array(225);
			game.winMove.map((v, i) => markArr[v] = i % 2 + 1)
			for (let i = games.length - 1; i >= 0; i--) {
				if (isEq(markArr, game.winMove, games[i].winMove)) return true
			}
			return false;
		}

		function reset() {
			games.length = 0;
			minLen = 0;
			maxLen = 200;
			filterArr.length = 0;
			filterIdx = -1;
		}

		function pushGame(game) {
			// 判断是否重复
			if (hasWinMove(game)) return;
			games.push(game);
			if (minLen <= game.winMove.length && game.winMove.length <= maxLen) {
				filterArr.push(games.length - 1)
			}
		}

		function filter(min, max) {
			minLen = min;
			maxLen = max;
			filterArr.length = 0;
			filterIdx = -1;
			games.map((game, i) => {
				const len = game.winMove.length;
				if (minLen <= len && len <= maxLen) filterArr.push(i);
			})
		}

		function getGame(idx) {
			if (idx >= 0 && idx < filterArr.length) {
				filterIdx = idx;
				const game = games[filterArr[idx]];
				return { array: game.arr, winMove: game.winMove, firstColor: game.firstColor }
			}
		}

		function nextGame() {
			if (filterIdx < filterArr.length - 1) {
				return getGame(++filterIdx);
			}
		}

		function preGame() {
			if (filterIdx > 0) {
				return getGame(--filterIdx);
			}
		}

		return {
			get reset() { return reset },
			get pushGame() { return pushGame },
			get filter() { return filter },
			get getGame() { return getGame },
			get nextGame() { return nextGame },
			get preGame() { return preGame },
			get filterArr() { return filterArr },
			get filterIdx() { return filterIdx }
		}
	})()

	async function wait(time) {
		return new Promise(resolve => {
			setTimeout(resolve, time);
		})
	}

	function copyParam(param) {
		let nParam = {};
		Object.keys(param).map(key => nParam[key] = param[key])
		return nParam;
	}

	function nextColor(array) {
		let numStones = 0;
		for (let i = 0; i < 225; i++) {
			if (array[i] > 0) numStones++;
		}
		return numStones % 2 + 1;
	}

	function code2Number(code) { // searchCode || gameCode
		let rt = 0,
			len = stoneCount,
			end = Math.min(len, 31);
		for (let i = 0; i < end; i++) rt = rt << 1 | (code[i] - 1)
		return rt;
	}

	function randomPoints() {
		let points = [];

		function loopPush(x, y) {
			while (x < 15 && y < 15) {
				points.push(x + y * 15)
				x += 2;
				y++;
			}
		}
		for (let i = 0; i < 15; i++) {
			loopPush(i, 0);
		}
		for (let i = 1; i < 15; i++) {
			loopPush(0, i);
		}
		for (let i = 1; i < 15; i++) {
			loopPush(1, i);
		}
		return points;
	}

	function boardArr2Path(boardArr) {
		//let random = randomPoints();
		let path = [];
		for (let i = 0; i < 225; i++) {
			//if (boardArr[random[i]]) path.push(random[i]);
			if (boardArr[i]) path.push(i);
		}
		return path;
	}

	function code2BoardArr(gameCode, path) {
		let boardArr = new Array(226).fill(0);
		boardArr[225] = -1;
		for (let i = gameCode.length - 1; i >= 0; i--)
			boardArr[path[i]] = gameCode[i];
		return boardArr;
	}
	
	function boardArr2Code(boardArr, path) {
		const gameCode = new Array(path.length);
		for(let i = 0; i < 225; i++) {
			if (boardArr[i] > 0) {
				const idx = path.indexOf(i);
				gameCode[idx] = boardArr[i];
			}
		}
		return gameCode;
	}

	function putMax() {
		let end1 = stones[2],
			end2 = stones[1] + stones[2];
		for (let i = 0; i < end1; i++) searchCode[i] = 2
		for (let i = end1; i < end2; i++) searchCode[i] = 1
	}

	function putMin() {
		let end1 = stones[1],
			end2 = stones[1] + stones[2];
		for (let i = 0; i < end1; i++) searchCode[i] = 1
		for (let i = end1; i < end2; i++) searchCode[i] = 2
	}

	function putStone() {
		let color = searchCode[depth] + 1;
		if (color >= 1 && color <= 2) {
			stones[color] == 0 && (color = 3 - color);
			if (color > searchCode[depth]) {
				stones[color]--;
				searchCode[depth++] = color;
				return color;
			}
			else return 0;
		}
		else return 0;
	}

	function takeStone() {
		let color = searchCode[--depth];
		stones[color]++;
		searchCode[depth + 1] = 0;
		return color;
	}

	function filter(min, max) {
		vcfGames.filter(min, max);
	}

	function getVCF(idx) {
		return vcfGames.getGame(idx);
	}

	function nextVCF() {
		return vcfGames.nextGame();
	}

	function preVCF() {
		return vcfGames.preGame();
	}

	function progress() {
		let num = code2Number(searchCode),
			rt = (num - minNum) / (maxNum - minNum);
		rt = rt || 0; // if (maxNum - minNum == 0) rt = 0
		return Math.max(0, rt);
	}

	function resetMakeVCF(boardArr, bStoneCount, wStoneCount, callback=()=>{}) {
		if (state > STATE_WAITING) return;
		gameCount = 0;
		depth = 0;
		path = boardArr2Path(boardArr);
		if (path.length == 0) {callback("请在棋盘上摆好棋型"); return}
		searchCode = new Array(bStoneCount + wStoneCount);
		stones = [0, bStoneCount, wStoneCount];
		stoneCount = bStoneCount + wStoneCount;
		color = bStoneCount == wStoneCount ? 1 : 2;
		minLen = Math.max(~~(stoneCount >> 1), 3) | 1;
		vcfGames.reset();
		putMin();
		minNum = code2Number(searchCode);
		putMax();
		maxNum = code2Number(searchCode);
		searchCode.fill(0);
		state = STATE_WAITING;
	}

	function countStone(list, boardArr, color) {
		let emptyCount = 0,
			colorCount = 0,
			len = list.length,
			result = 0xffff;
		for (let move = 0; move < len; move++) {
			let idx = list[move],
				v = boardArr[idx];
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
				if (colorCount >= 4) {
					if (colorCount == 5 || color == 2 || (boardArr[list[move + 1]] != 1 && boardArr[list[move - 5]] != 1)) {
						for (let i = 0; i < 5; i++) {
							if (boardArr[list[move - i]]) {
								result = list[move - i];
								break;
							}
						}
						break;
					}
				}
				v = boardArr[list[move - 4]];
				if (v == 0) {
					emptyCount--;
				}
				else {
					colorCount--;
				}
			}
		}
		return result;
	}

	function _nextGameCode() {
		while (true) {
			const col = putStone();
			const isBack = (col != 1 && col != 2) || depth == stoneCount;
			if (isBack) {
				takeStone();
				if (depth == stoneCount - 1) {
					gameCount++;
					return searchCode.slice(0, stoneCount);
				}
				if (depth < 0) {
					putMax();
					state = STATE_DONE;
					return null;
				}
			}
		}
	}

	function filterGameOver(gameCode) {
		while (gameCode) { //过滤 五连，长连...
			let dp = -1;
			const boardArr = code2BoardArr(gameCode, path);
			for (let direction = 0; direction < 4; direction++) {
				let listEnd = IDXLIST[direction].length;
				for (let list = 0; list < listEnd; list++) {
					let idx = countStone(IDXLIST[direction][list], boardArr, 1),
						idx2 = countStone(IDXLIST[direction][list], boardArr, 2);
					idx = Math.min(idx, idx2);
					if (idx < 225)
						for (let d = path.length - 1; d >= 0; d--) {
							if (path[d] == idx) {
								dp = d;
								d = -1;
								list = 225;
								direction = 5;
							}
						}
				}
			}
			if (dp > -1) {
				while (dp < depth) { takeStone() }
				gameCode = _nextGameCode();
			}
			else break;
		}
		return gameCode;
	}

	function filterVCF(gameCode, shortVCF) {
		let count = 0;
		while (shortVCF.length && gameCode && ++count < 0xFF) { ///过滤短VCF
			let boardArr = code2BoardArr(gameCode, path);
			if (isVCF(color, boardArr, shortVCF)) {
				//count > 99 && alert(`(${++count})\n[${shortVCF}]\n${gameCode}`)
				const markArr = new Array(226);
				shortVCF.map((idx, i) => {
					const _color = i % 2 ? 3 - color : color;
					for (let direction = 0; direction < 4; direction++) {
						let emptyCount = 0;
						for (let move = 1; move < 6; move++) {
							const _idx = moveIdx(idx, move, direction);
							if (boardArr[_idx] > 0) markArr[_idx] = true;
							else if (boardArr[_idx] == 0)
								if (++emptyCount > 1) break
							else break
						}
						emptyCount = 0;
						for (let move = 1; move < 6; move++) {
							const _idx = moveIdx(idx, -move, direction);
							if (boardArr[_idx] > 0) markArr[_idx] = true;
							else if (boardArr[_idx] == 0)
								if (++emptyCount > 1) break
							else break
						}
					}
				})
				for (let idx = 224; idx >= 0; idx--) {
					if (markArr[idx])
						for (let d = path.length - 1; d >= 0; d--) {
							if (path[d] == idx) {
								while (d < depth) { takeStone() }
								gameCode = filterGameOver(_nextGameCode());
								idx = -1;
								break;
							}
						}
				}
			}
			else break;
		}
		shortVCF.length = 0;
		return gameCode;
	}

	function filterGameCode(gameCode, shortVCF) {
		gameCode = filterGameOver(gameCode);
		shortVCF.length && (gameCode = filterVCF(gameCode, shortVCF));
		return gameCode;
	}

	function nextGameCode(shortVCF) {
		return filterGameCode(_nextGameCode(), shortVCF); //如果有(五连，冲四, VCF...)局面就跳过所有子局面
	}

	function nextParam(param, shortVCF) {
		let gameCode = nextGameCode(shortVCF);
		if (gameCode) {
			param.arr = code2BoardArr(gameCode, path);
			param.color = color;
			param.maxVCF = 1;
			param.maxDepth = 180;
			param.maxNode = 2560000;
		}
		return !!gameCode;
	}

	function stop() {
		if (state > STATE_WAITING) state = STATE_STOPPING;
	}

	function getStateInfo() {
		return {
			progress: progress(),
			filterArr: vcfGames.filterArr,
			filterIdx: vcfGames.filterIdx,
			gameCount: gameCount,
			state: state
		}
	}

	async function continueMakeVCF(callback = ()=>{}, callbackDone = ()=>{}) {
		//try {
		const shortVCF = [];
		while (true) {
			let ps = [];
			let count = 0;
			let param = {};
			if (state != STATE_WAITING) return;
			state = STATE_SEARCHING;
			while (true) {
				while (state == STATE_SEARCHING && count < 5000 && ps.length < 6 && nextParam(param, shortVCF)) {
					let code = searchCode.slice(0, stoneCount);
					if (!(count & 0xfff)) callback(param.arr);
					ps.push((async () => {
						const nParam = copyParam(param);
						let info = await window.engine.findVCF(nParam);
						if (!info.winMoves[0] || info.winMoves[0].length <= minLen) {
							info.winMoves[0] && shortVCF.length == 0 && shortVCF.push(...info.winMoves[0]);
							return;
						}
						const winMove = info.winMoves[0].slice(0);
						nParam.maxDepth = minLen - 2;
						info = await window.engine.findVCF(nParam);
						if (info.winMoves[0]) {
							shortVCF.length == 0 && shortVCF.push(...info.winMoves[0]);
							return;
						}
						nParam.maxDepth = 225;
						nParam.maxVCF = 2;
						info = await window.engine.findVCF(nParam);
						if (info.winMoves.length > 1) {
							info.winMoves[0].length <= minLen && shortVCF.length == 0 && shortVCF.push(...info.winMoves[0]);
							return;
						}
						shortVCF.length == 0 && shortVCF.push(...winMove);
						vcfGames.pushGame({ arr: code2BoardArr(code, path), winMove: winMove, firstColor: nParam.color });
					})())
					count++;
				}
				if (ps.length == 0) break;
				await Promise.race(ps);
				await window.engine.removeFinallyPromise(ps);
			}
			//await saveData();
			if (state == STATE_DONE) {
				callbackDone();
				return;
			}
			if (state == STATE_STOPPING) { state = STATE_WAITING; return; }
			state = STATE_WAITING;
		}
		//}catch (e) { alert(e.stack) }
	}
	
	async function pushGames(info, callback = ()=>{}) {
		if (info.length) {
			for (let i = 0; i < info.length; i++) {
				if (info[i].winMoves.length == 1) {
					vcfGames.pushGame({ arr: info[i].arr, winMove: info[i].winMoves[0], firstColor: info[i].color });
					callback(info[i].arr);
					await wait(0);
				}
			}
		}
	}

	async function testGames(games, callback = ()=>{}) {
		const log = [];
		const error = [];
		const warn = [];
		const param = {
			maxVCF: 2,
			maxDepth: 225,
			maxNode: 2560000
		}
		for (let i = 0; i < games.length; i++) {
			param.arr = games[i];
			param.color = nextColor(param.arr);
			callback(param.arr, i);
			const info = await window.engine.findVCF(param);
			log.push({
				idx: i,
				arr: param.arr,
				color: param.color,
				winMoves: info.winMoves
			})
			if (info.winMoves.length == 0) {
				error.push({
					idx: i,
					arr: param.arr,
					color: param.color,
					winMoves: info.winMoves
				});
			}
			if (info.winMoves.length > 1) {
				warn.push({
					idx: i,
					arr: param.arr,
					color: param.color,
					winMoves: info.winMoves
				});
			}
		}
		return {log, error, warn};
	}

	function games() {
		const info = getStateInfo();
		const games = [];
		for (let idx = 0; idx < info.filterArr.length; idx++) {
			games.push(getVCF(idx).array);
		}
		return games;
	}

	return {
		get wait() { return wait },
		get resetMakeVCF() { return resetMakeVCF },
		get stop() { return stop },
		get continueMakeVCF() { return continueMakeVCF },
		get pushGames() { return pushGames },
		get filter() { return filter },
		get getVCF() { return getVCF },
		get nextVCF() { return nextVCF },
		get preVCF() { return preVCF },
		get getStateInfo() { return getStateInfo },
		get testGames() { return testGames },
		get games() { return games }
	}
})()