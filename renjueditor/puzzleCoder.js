window.puzzleCoder = (() => {
	"use strict";
	async function wait(time) {
		return new Promise(resolve => {
			setTimeout(resolve, time);
		})
	}

	function code2Idx(code) {
		const x = code.charCodeAt(0) - 97;
		const y = 15 - code.slice(1);
		return y * 15 + x;
	}

	function gameToArr2D(game) {
		const arr2D = [];
		for (let i = 0; i < 15; i++) {
			arr2D[i] = game.slice(i * 15, (i + 1) * 15);
		}
		return arr2D;
	}

	//-------------------------------------------------------
	
	const cBoard = new CheckerBoard(document.createElement("div"), 0, 0, 13, 13);
	cBoard.showCheckerBoard();
	
	//------------------------ renju json ---------------------------
	/**
	 * json: {defaultSettings: {}, puzzles: [{puzzle1},{puzzle2}...]}
	 * defaultSettings: {title, size, rule, mode, comment, level} 
	 * puzzle: {stones, blackStones, whiteStones, side, ...}
	 * * @stones		{strings}			黑白顺序棋子代码, 例: "H8I9I7" 代表浦月开局
	 * * @blackStones	{string}			黑色棋子代码, 例: "H8I9I7" 代表三颗黑子在坐标上
	 * * @whiteStones	{string}			白色棋子代码, 例: "H8I9I7" 代表三颗白子在坐标上
	 * * @labels		{[code, label]...}  棋盘上面的文字标记, 例: ["E12,A","L12,B"] 
	 * * @options		{string}			选择题答案, 例: "D9E10G9"
	 * * @mark			{string}			选择题选中后显示的字符
	 * * @size			{number}			棋盘的大小 6 - 15
	 * * @side			1 | 2,				玩家棋子颜色, 1: 黑棋,2: 白棋
	 * * @rule			0 | 2,				游戏规则, 0: 无禁, 2: 有禁
	 * * @mode			{number}			解题模式
	 * * @title 		{string}			题目标题
	 * * @comment		{string}			题目注释
	 * * @level 		{number}			难度 1 - 5
	 * * @image			base64 image		封面插图
	 * * @rotate		{number}			选转方向
	 * * @randomRotate	true | false		出题时，是否随机翻转，有 rotate 时无效
	 * * @delayHelp		{number}			延时显示AI帮助按钮，单位分钟
	 * * @sequence		{number}			控制显示手顺，为0时不显示手顺序
	 * /
	mode	模式
	0		习题封面
	32		VCF
	64		VCT
	67		三手胜
	96		自由对弈
	160		限珠题模式
	163		三子五连模式
	164		四子五连模式
	165		五子五连模式
	192		点点题模式
	193		选择题
	194		找活三点
	195		找复活三点
	196		找眠三点
	197		找活四点
	198		找冲四点
	199		找禁手点
	200		找三三禁点
	201		找四四禁点
	202		找长连点
	203		找防冲四抓禁点
	204		找做V点
	205		找做43点
	206		找做44点
	207		找VCF防点
	208		找VCF反防点
	209		找狭义双杀点
	210		找狭义双防点
	211		找两手四三胜点
	 * 做冲四抓禁
	*/
	
	
	/**
	 * 找全一子双通点
	 * 找全一子三通点
	 * 找全活二点
	 * 找全特型三点
	 * 找全一子双眠三点
	 * 找全一手胜型点
	 * 找全白棋单冲四杀点
	 * 找全夏止防点
	 * 找全六腐防点
	 * 
	 * 找全活三点
	 * 找全复活三点
	 * 找全眠三点
	 * 找全活四点
	 * 找全冲四点
	 * 找全禁手点			✔ 
	 * 找全三三禁手			✔
	 * 找全四四禁手			✔
	 * 找全长连禁手			✔
	 * 防冲四抓禁手			✔
	 * 找全做43点			✔	
	 * 找全做44点			✔
	 * 找全43杀防点			
	 * 找全做V点			✔
	 * 找全VCF防点
	 * 找全VCF反防点
	 * 找全双杀点			✔
	 * 找全双防点
	 * 
	 */
	
	const PUZZLE_KEYS = [
		"stones",
		"blackStones",
		"whiteStones",
		"labels",
		"options",
		"mark",
		"size",
		"side",
		"rule",
		"mode",
		"title",
		"comment",
		"level",
		"image",
		"rotate",
		"randomRotate",
		"delayHelp",
		"sequence"
	];
	
	const DEFAULT_SETTINGS = {
		title: "",
		size: 15,
		rule: 2,
		mode: 3 << 5,
		level: 3,
		mark: "○",
		comment: "",
 		randomRotate: true,
 		delayHelp: 30,
 		sequence: 0
	}
	const demoRenjuJSON = `{
		"defaultSettings": {
 			"title": "例题",
 			"size": 15,
 			"rule": 2,
 			"mode": 32,
 			"level": 3,
 			"delayHelp": 0.25,
 			"comment": "",
 			"randomRotate": true
 		},
 		"puzzles": [{
 			"image": "data:image/jpeg;base64,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",
 			"side": 1,
 			"rule": 2,
 			"size": 15,
 			"mode": 0,
 			"level": 0,
 			"title": "例题合集",
 			"comment": "本题集搜集了各种类型的五子棋残局和五子茶馆点点题的例题，可以帮助你快速熟悉这些解题模式。<br><br><br><a href = './renjueditor.html' target='_black'> 点击前往 制作你的题集 </a>"
 		},
 		{
 			"blackStones": "B10B9B8B7C11C9C7D11D8D7F10F9F8F7G11G9G7H11H8H7",
 			"whiteStones": "A11B11B6B5D12D5E9F13F12F11F6F5F4H5I11I10I8J11K12K10",
 			"side": 1,
 			"rule": 2,
 			"size": 15,
 			"mode": 32,
 			"level": 3,
 			"title": "例题VCF"
 		},
 		{
 			"blackStones": "E7G8H8H6I6J10J8J6L5",
 			"whiteStones": "F7G9G6H7I9J7K10K6",
 			"side": 2,
 			"rule": 2,
 			"size": 15,
 			"mode": 32,
 			"level": 2,
 			"title": "例题VCF"
 		},
 		{
 			"blackStones": "G11G8G7H8H7I8I7J9J6",
 			"whiteStones": "F8G10G6H9I9I6J7K10K5",
 			"side": 1,
 			"rule": 2,
 			"size": 15,
 			"mode": 67,
 			"level": 1,
 			"title": "例题三手胜"
 		},
 		{
 			"blackStones": "F7G8G7H9H8H6I8J11J9K7",
 			"whiteStones": "F9F8G9H7I10I9I7I6J8",
 			"side": 2,
 			"rule": 2,
 			"size": 15,
 			"mode": 67,
 			"level": 1,
 			"title": "例题三手胜"
 		},
 		{
 			"blackStones": "G15G12G9H13H8I11I10I7I6K12",
 			"whiteStones": "G11H14H12H11H9H7I8J12J6K13",
 			"side": 1,
 			"rule": 2,
 			"size": 15,
 			"mode": 64,
 			"level": 3,
 			"title": "例题VCT"
 		},
 		{
 			"blackStones": "G8G7H8H6I9I6J7K8K7",
 			"whiteStones": "F7F6H9H5I10I8I7J10",
 			"side": 2,
 			"rule": 2,
 			"size": 15,
 			"mode": 64,
 			"level": 3,
 			"title": "例题VCT"
 		},
 		{
 			"blackStones": "G7H8I9",
 			"whiteStones": "H9I8J10",
 			"side": 1,
 			"rule": 2,
 			"size": 15,
 			"mode": 96,
 			"level": 3,
 			"title": "例题对弈"
 		},
 		{
 			"blackStones": "H8H7I7",
 			"whiteStones": "G9I9",
 			"side": 2,
 			"rule": 2,
 			"size": 15,
 			"mode": 96,
 			"level": 3,
 			"title": "例题对弈"
 		},
 		{
 			"blackStones": "D9F8F4G9G7H10H8I5J10K6K5K2L5M6",
 			"whiteStones": "D12D8E9E6F6I12I11J7J3K10K9L10M5N6",
 			"side": 1,
 			"rule": 2,
 			"size": 15,
 			"mode": 164,
 			"level": 3,
 			"title": "例题四子五连"
 		},
 		{
 			"blackStones": "B6C10C9C5D8D7D6D2E10E8E3F13F11G13G7G4G2H12H11H5H4I12I9I3I2J14J12J1K13K8K2L9L8M11M7N12N9N7N5O6",
 			"whiteStones": "A8B14B13B9B8B7B3B2C14C2D9D4F3F2F1G14G12G9G3H15H14H3I14J2L12M14M10M9M8M1N14N13N10N6N2N1O10O3O2",
 			"side": 2,
 			"rule": 2,
 			"size": 15,
 			"mode": 164,
 			"level": 3,
 			"title": "例题四子五连"
 		},
 		{
 			"blackStones": "F10G5H11H8H5I8K6",
 			"whiteStones": "E5F9G4H12H6I9I6",
 			"side": 1,
 			"rule": 2,
 			"size": 15,
 			"mode": 165,
 			"level": 3,
 			"title": "例题五子五连"
 		},
 		{
 			"blackStones": "C6C5E10E5F7H11H8H5I7J4",
 			"whiteStones": "D8E6G13G11H10H7H3I3K7",
 			"side": 2,
 			"rule": 2,
 			"size": 15,
 			"mode": 165,
 			"level": 3,
 			"title": "例题五子五连"
 		},
 		{
 			"blackStones": "A14C14C11D12E15E13E10F10",
 			"whiteStones": "A10",
 			"side": 1,
 			"rule": 2,
 			"size": 6,
 			"mode": 32,
 			"level": 2,
 			"title": "例题六路VCF"
 		},
 		{
 			"blackStones": "A11A10C14",
 			"whiteStones": "A12B11C11C10D12D11F14F10",
 			"side": 2,
 			"rule": 2,
 			"size": 6,
 			"mode": 32,
 			"level": 2,
 			"title": "例题六路VCF"
 		},
 		{
 			"blackStones": "A12A11B12B11C11E14",
 			"whiteStones": "A13C15C10D15E10F12F11",
 			"side": 1,
 			"rule": 2,
 			"size": 6,
 			"mode": 64,
 			"level": 3,
 			"title": "例题六路VCT"
 		},
 		{
 			"blackStones": "A15B10C10D12E13E12",
 			"whiteStones": "C14C12D14D13D11F12F11",
 			"side": 2,
 			"rule": 2,
 			"size": 6,
 			"mode": 64,
 			"level": 3,
 			"title": "例题六路VCT"
 		},
 		{
 			"blackStones": "B10D12E9G12",
 			"whiteStones": "C11E12",
 			"options": "D9E10G9",
 			"side": 1,
 			"rule": 2,
 			"size": 15,
 			"mode": 193,
 			"level": 1,
 			"title": "一子三通点",
 			"comment": "找全一子三通点\\r\\n一子三通，指一子落下能够形成活二或眠三的点，潜在冲四点形成的连接也算数，同时要考虑可能存在双防点"
 		},
 		{
 			"blackStones": "C13C12C8E13E10I10",
 			"whiteStones": "D11D9E15H13J10",
 			"options": "A13E9F10G13G10",
 			"side": 1,
 			"rule": 2,
 			"size": 15,
 			"mode": 193,
 			"level": 1,
 			"title": "特型三点",
 			"comment": "找全特型三点"
 		},
 		{
 			"blackStones": "A15B12C15D13D12E13G12",
 			"whiteStones": "F13",
 			"options": "D15C13E12F12",
 			"side": 1,
 			"rule": 2,
 			"size": 15,
 			"mode": 193,
 			"level": 1,
 			"title": "一子双眠三点",
 			"comment": "找全一子双眠三点"
 		},
 		{
 			"blackStones": "A12B12C14C12C11D14E14E13F11G13H13",
 			"whiteStones": "A15B14C13F12G12H12I13",
 			"options": "D13E12",
 			"side": 1,
 			"rule": 2,
 			"size": 15,
 			"mode": 193,
 			"level": 1,
 			"title": "一手胜型点",
 			"comment": "找全一手胜型点\\r\\n一手胜形：指一子落下能够形成成立的基本胜形（活四，四三，四四，三三，抓禁），注意VCF算多手棋"
 		},
 		{
 			"blackStones": "B14D11E15E14E13G13H14I15",
 			"whiteStones": "A12B12C15C14C13C10D12F14F13G12H12",
 			"options": "C12E12",
 			"side": 2,
 			"rule": 2,
 			"size": 15,
 			"mode": 193,
 			"level": 1,
 			"title": "一手胜型点",
 			"comment": "找全一手胜型点\\r\\n一手胜形：指一子落下能够形成成立的基本胜形（活四，四三，四四，三三，抓禁），注意VCF算多手棋"
 		},
 		{
 			"stones": "B5A0B4A0C14A0C12A0C6A0C5A0D15A0D14A0D13A0D10A0D4A0D3A0E13A0E4A0F12A0F4A0H3A0I9A0K12A0K3A0L3A0L2A0M13A0M7A0M5A0M2A0N14A0N12A0N4C13A0D6A0D5A0E14A0E3A0G11A0H4A0K2A0L4",
 			"labels": ["E12,A","L12,B","C4,C","M3,D"],
 			"options": "E12",
 			"side": 1,
 			"rule": 2,
 			"size": 15,
 			"mode": 193,
 			"level": 1,
 			"title": "三三禁手",
 			"comment": "ABCD选出三三禁手"
 		},
 		{
 			"blackStones": "A11B5C14C13C12C4D11D5D4D2E11E3F3I5J4J3K15K14K11K5K4K2L13M13M3N13",
 			"whiteStones": "B13C5D12E4J5L14L4M12N14",
 			"labels": ["F11,A", "K10,B", "A3,C", "O3,D"],
 			"options": "K10O3",
 			"side": 1,
 			"rule": 2,
 			"size": 15,
 			"mode": 193,
 			"level": 1,
 			"title": "复活三点",
 			"comment": "ABCD选出复活三点"
 		},
 		{
 			"blackStones": "C11D11D10E12E11E8F10G9I12",
 			"whiteStones": "B11D13D12D9E9E7G15G14H13H9H7J11K11",
 			"labels": ["F8,A", "G8,B", "G10,C", "F9,D", "F13,E", "G12,F", "F12,G"],
 			"side": 1,
 			"rule": 2,
 			"size": 15,
 			"mode": 211,
 			"level": 3,
 			"title": "两手43",
 			"comment": "下图字母是黑棋成立的两手43胜点的是"
 		},
 		
 		
 		{
 			"blackStones": "B14C13C11E13F14F10",
 			"side": 1,
 			"rule": 2,
 			"size": 15,
 			"mode": 195,
 			"level": 1,
 			"title": "复活三点"
 		},
 		{
 			"blackStones": "B12D12G12",
 			"side": 1,
 			"rule": 2,
 			"size": 15,
 			"mode": 196,
 			"level": 1,
 			"title": "眠三点"
 		},
 		{
 			"blackStones": "C12D12E14E13E9",
 			"whiteStones": "D13F14G12",
 			"side": 1,
 			"rule": 2,
 			"size": 15,
 			"mode": 194,
 			"level": 1,
 			"title": "活三点"
 		},
 		{
 			"blackStones": "A12B12B11C12C11E13E12E10F14F13F9",
 			"side": 1,
 			"rule": 2,
 			"size": 15,
 			"mode": 197,
 			"level": 1,
 			"title": "活四点"
 		},
 		{
 			"blackStones": "C12D14D13D11E12F12H12",
 			"whiteStones": "B12E14F11",
 			"side": 1,
 			"rule": 2,
 			"size": 15,
 			"mode": 198,
 			"level": 1,
 			"title": "冲四点"
 		},
 		{
 			"blackStones": "B13D14G15",
 			"whiteStones": "C13D13E13F15F14F12F10H13",
 			"side": 2,
 			"rule": 2,
 			"size": 15,
 			"mode": 198,
 			"level": 1,
 			"title": "冲四点"
 		},
 		{
 			"blackStones": "C12E14F13F12G14G13H12",
 			"whiteStones": "A10F14H14",
 			"side": 1,
 			"rule": 2,
 			"size": 15,
 			"mode": 200,
 			"level": 1,
 			"title": "三三禁手"
 		},
 		{
 			"blackStones": "C12D12E14E12F15F14F13F10H11J9",
 			"whiteStones": "B12D13E13",
 			"side": 1,
 			"rule": 2,
 			"size": 15,
 			"mode": 201,
 			"level": 1,
 			"title": "四四禁手"
 		},
 		{
 			"blackStones": "B12B10C15C12C11D15D14D13D11E13E12F14F12G15G12H10",
 			"side": 1,
 			"rule": 2,
 			"size": 15,
 			"mode": 202,
 			"level": 1,
 			"title": "长连禁手"
 		},
 		{
 			"blackStones": "C14C13D15D12D9F13F12F11G14",
 			"whiteStones": "E15E14E13F15F10H12",
 			"labels": ["E13,1","E12,❌"],
 			"side": 1,
 			"rule": 2,
 			"size": 15,
 			"mode": 203,
 			"level": 3,
 			"title": "防冲四抓禁手"
 		},
 		{
 			"blackStones": "D11E13E11F11I11",
 			"whiteStones": "B11E12",
 			"side": 1,
 			"rule": 2,
 			"size": 15,
 			"mode": 205,
 			"level": 2,
 			"title": "做43点"
 		},
 		{
 			"blackStones": "B12H13",
 			"whiteStones": "C12D12F12G14H15I12",
 			"side": 2,
 			"rule": 2,
 			"size": 15,
 			"mode": 206,
 			"level": 2,
 			"title": "做44点"
 		},
 		{
 			"blackStones": "C11D12E12G10H12H11",
 			"whiteStones": "D11F11G11H10",
 			"side": 1,
 			"rule": 2,
 			"size": 15,
 			"mode": 204,
 			"level": 3,
 			"title": "做V点"
 		},
 		{
 			"blackStones": "B11E14F14F12",
 			"whiteStones": "A13C11D15D12D11",
 			"side": 2,
 			"rule": 2,
 			"size": 15,
 			"mode": 204,
 			"level": 3,
 			"title": "做V点"
 		},
 		{
 			"stones": "A14C13",
 			"blackStones": "G14G11I15",
 			"whiteStones": "A13D14D13F12H14",
 			"labels": ["C13,1"],
 			"side": 1,
 			"rule": 2,
 			"size": 15,
 			"mode": 207,
 			"level": 2,
 			"title": "VCF防点"
 		},
 		{
 			"stones": "C14C15A14",
 			"blackStones": "D14D13D10E13",
 			"whiteStones": "B11C13D15E12F11",
 			"labels": ["A14,1"],
 			"side": 2,
 			"rule": 2,
 			"size": 15,
 			"mode": 207,
 			"level": 2,
 			"title": "VCF防点"
 		},
 		{
 			"stones": "F10F11G10E10H10J10E9G9F9H9D8E8F8I8G8C7H8F7G7H6F6E5",
 			"side": 1,
 			"rule": 2,
 			"size": 15,
 			"mode": 209,
 			"level": 3,
 			"title": "双杀点"
 		},
 		{
 			"stones": "D13A0D11A0D9A0E15A0F13A0J15A0K14A12A0B12A0D12A0E14A0E13A0J14A0J13A0K15A0K13",
 			"side": 2,
 			"rule": 2,
 			"size": 15,
 			"mode": 209,
 			"level": 3,
 			"title": "双杀点"
 		},
 		{
 			"stones": "L10",
 			"blackStones": "E9F10G11G8H10H8I9J10J7K11K10L7L6",
 			"whiteStones": "D8F12G9G7H9H7I11I10I8J9J8K9K7L12",
 			"labels": ["L10,1"],
 			"side": 2,
 			"rule": 2,
 			"size": 15,
 			"mode": 210,
 			"level": 3,
 			"title": "双防点"
 		},
 		{
 			"stones": "F13",
 			"blackStones": "D11D10D9E10F10G11G8H10H8I9",
 			"whiteStones": "D12E11E9F9F8G10G7H9I10J8",
 			"labels": ["F13,1"],
 			"side": 2,
 			"rule": 2,
 			"size": 15,
 			"mode": 210,
 			"level": 3,
 			"title": "双防点"
 		}]
 	}`;

	 
	const MODE_VALUE_NAME_TITLE_COMMENT = {
		COVER: { value: 0, name: "习题封面", title: "习题封面", comment: "习题封面" },
		
		VCF: { value: 1 << 5, name: "VCF模式", title: "VCF", comment: "VCF，连续冲四进攻，直到取胜" },
		VCT: { value: 2 << 5, name: "VCT模式", title: "VCT", comment: "利用活三，做43杀，做VCF，冲四等手段进攻取胜。" },
		VCT3: { value: 2 << 5 | 3, name: "三手胜模式", title: "三手胜", comment: "三手胜，利用活三，做43杀，做VCF，冲四等手段进攻取胜。限定在三手内取胜，连续冲四算一手。" },
		FREE: { value: 3 << 5, name: "自由对弈模式", title: "自由对弈", comment: "不限定手数，也不限定进攻手段。在游戏规则内取胜。" },
		
		STONES: { value: 5 << 5, name: "限珠题模式", title: "限珠题", comment: "出题者没有指定棋子数量" },
		STONES3: { value: 5 << 5 | 3, name: "三子五连模式", title: "三子五连", comment: "玩家只剩下三颗棋子，必须在三颗棋子内取胜。判断取胜的标准：1.玩家五连,2.对手（黑棋）禁手。" },
		STONES4: { value: 5 << 5 | 4, name: "四子五连模式", title: "四子五连", comment: "玩家只剩下四颗棋子，必须在四颗棋子内取胜。判断取胜的标准：1.玩家五连,2.对手（黑棋）禁手。" },
		STONES5: { value: 5 << 5 | 5, name: "五子五连模式", title: "五子五连", comment: "玩家只剩下五颗棋子，必须在五颗棋子内取胜。判断取胜的标准：1.玩家五连,2.对手（黑棋）禁手。" },
		
		BASE: { value: 6 << 5, name: "点点题模式", title: "点点题模式", comment: "出题者没有指定这题的点点题类型" },
		BASE_OPTION: { value: 6 << 5 | 1, name: "点点题模式", title: "选择题", comment: "出题者忘记写下解题要求了" },
		
		BASE_FREE_THREE: { value: 6 << 5 | 2, name: "点点题模式", title: "找活三点", comment: "找全活三点（有活四点的三）" },
		BASE_REVIVE_FREE_THREE: { value: 6 << 5 | 3, name: "点点题模式", title: "找复活三点", comment: "找全复活三点（这个点不是直接活三点，但是它可以让棋盘上面的某个禁手点变成活四点）" },
		BASE_NOTFREE_THREE: { value: 6 << 5 | 4, name: "点点题模式", title: "找眠三点", comment: "找全眠三点（只有冲四点，没有活四点的三）" },
		BASE_FREE_FOUR: { value: 6 << 5 | 5, name: "点点题模式", title: "找活四点", comment: "找全活四点（两边各有一个五连点的连四）" },
		BASE_NOTFREE_FOUR: { value: 6 << 5 | 6, name: "点点题模式", title: "找冲四点", comment: "找全冲四点（有且只有一个五连点的四）" },
		
		BASE_FOUL: { value: 6 << 5 | 7, name: "点点题模式", title: "找禁手点", comment: "找全所有的禁手点" },
		BASE_FOUL_33: { value: 6 << 5 | 8, name: "点点题模式", title: "找三三禁点", comment: "找全所有的三三禁手点\n注意：一个禁手点可能包括好几种禁手" },
		BASE_FOUL_44: { value: 6 << 5 | 9, name: "点点题模式", title: "找四四禁点", comment: "找全所有的四四禁手点\n注意：一个禁手点可能包括好几种禁手" },
		BASE_FOUL_6: { value: 6 << 5 | 10, name: "点点题模式", title: "找长连点", comment: "找全所有的长连禁手点\n注意：一个禁手点可能包括好几种禁手" },
		BASE_BLOCK_CATCH_FOUL: { value: 6 << 5 | 11, name: "点点题模式", title: "找防冲四抓禁点", comment: "防冲四抓禁手\r\n白棋准备冲四抓禁手,黑棋找出所有让冲4抓禁不成立的点" },
		
		BASE_MAKE_VCF: { value: 6 << 5 | 12, name: "点点题模式", title: "找做V点", comment: "找全做V点\r\n做V点：做一手棋，如果对手不防，下一手能够形成成立的VCF的点。茶馆点点题解题规则的VCF，必须要连续冲四两次以上(包括两次)，四三杀不算VCF" },
		BASE_MAKE_VCF_43: { value: 6 << 5 | 13, name: "点点题模式", title: "找做43点", comment: "找全做43点\r\n做43点：做一手棋，如果对手不防，下一手可以形成成立的四三杀的点" },
		BASE_MAKE_VCF_44: { value: 6 << 5 | 14, name: "点点题模式", title: "找做44点", comment: "找全做44点，白棋做四四杀" },
		BASE_BLOCK_VCF: { value: 6 << 5 | 15, name: "点点题模式", title: "找VCF防点", comment: "找全VCF防点" },
		BASE_BLOCK_VCF_4: { value: 6 << 5 | 16, name: "点点题模式", title: "找VCF反防点", comment: "找全VCF反防点，在防点里面选出可以形成反四的防点" },
		
		BASE_DOUBLE_VCF: { value: 6 << 5 | 17, name: "点点题模式", title: "找狭义双杀点", comment: "找全做一子双杀点\r\n一子双杀点， 指狭义的一子双杀， 即一子落下， 同时形成两个或以上的与冲四有关的杀（ 包括“ 做一步冲四杀” 和“ 做连续冲四杀， 即做V”）， 无论对手如何防守， 下一手都可冲四杀（ 特例： 复活三也视作“ 做冲四杀”； 白棋抓禁的情况， 看似做一个杀， 但无论如何防守， 依然还能冲四取胜）。\n常规可能有三种组合：\n（ 1） 做一步冲四杀 + 做一步冲四杀\n（ 2） 做一步冲四杀 + 做V\n（ 3） 做V + 做V" },
		BASE_BLOCK_DOUBLE_VCF: { value: 6 << 5 | 18, name: "点点题模式", title: "找狭义双防点", comment: "找全双杀防点\r\n双杀防点，可以是“一子双防”，也可以是“先手防”（如果是先手防，只标注第一手棋）" },
		
		BASE_DOUBLE_VCF_43: { value: 6 << 5 | 19, name: "点点题模式", title: "找两手四三胜点", comment: "玩家两颗棋子内形成成立的43杀，也就是四手五连" },
	}
	Object.freeze(MODE_VALUE_NAME_TITLE_COMMENT)
	
	const MODE = {}
	const MODE_NAME = {}
	const MODE_TITLE = {}
	const MODE_COMMENT = {}
	Object.keys(MODE_VALUE_NAME_TITLE_COMMENT).map(key => {
		MODE[key] = MODE_VALUE_NAME_TITLE_COMMENT[key]["value"];
		MODE_NAME[MODE[key]] = MODE_VALUE_NAME_TITLE_COMMENT[key]["name"];
		MODE_TITLE[MODE[key]] = MODE_VALUE_NAME_TITLE_COMMENT[key]["title"];
		MODE_COMMENT[MODE[key]] = MODE_VALUE_NAME_TITLE_COMMENT[key]["comment"];
	})
	Object.freeze(MODE)
	Object.freeze(MODE_NAME)
	Object.freeze(MODE_TITLE)
	Object.freeze(MODE_COMMENT)
	
	/**
	 * 输入 renjuJSON string 返回 Puzzles 对象
	 * @json
 	*/
	function renjuJSON2Puzzles(json = "{}") {
		const rt = {
			_index: 0,
			defaultSettings: {},
			puzzles: [{
				size: 15,
				side: undefined,
				rule: undefined,
				mode: undefined,
				level: undefined,
				title: "文件错误",
				comment: "JSON文件出错了"
			}],
			next() {
				if (this._index < this.puzzles.length - 1) {
					this._index++;
					return true;
				}
				return false;
			},
			previous() {
				if (this._index) {
					this._index--;
					return true;
				}
				return false;
			},
			setIndex(idx) {
				if (idx > -1 && idx < this.puzzles.length) {
					this._index = idx;
				}
				return this._index;
			},
			get index() { return this._index },
			set index(i) { return this.setIndex(i) },
			get length() { return this.puzzles.length },
			get currentPuzzle() { 
				const rt = {};
				Object.assign(rt, this.defaultSettings);
				Object.assign(rt, this.puzzles[this._index]);
				rt.comment = rt.comment || MODE_COMMENT[rt.mode] || "";
				return  rt;
			},
		}
		let obj = {};
		try{ obj = JSON.parse(json) }catch(e){console.error(e.stack)}
		const { defaultSettings, puzzles } = obj;
		Object.assign(rt.defaultSettings, DEFAULT_SETTINGS);
		Object.assign(rt.defaultSettings, (defaultSettings || {}));
		rt.puzzles = puzzles || rt.puzzles;
		return rt;
	}
	
	/**
	 * 传入一个 Puzzles 对象，返回 renjuJSON string
	 * @puzzles		Puzzles 对象
	 * @callback	回调函数，输出进度	
 	*/
	async function puzzles2RenjuJSON(puzzles, callback = () => {}) {
		const newPuzzles = {defaultSettings: {}, puzzles:[]};
		Object.assign(newPuzzles.defaultSettings, puzzles.defaultSettings || {});
		const _puzzles = puzzles.puzzles;
		console.log(`callback: ${callback}`)
		for (let i = 0; i < _puzzles.length; i++) {
			const puzzle = _puzzles[i];
			const newPuzzle = {};
			Object.keys(puzzle).map(key => {
				if (PUZZLE_KEYS.indexOf(key) + 1) {
					newPuzzle[key] = puzzle[key];
				}
			})
			const keys = ["stones", "blackStones", "whiteStones", "title", "comment"];
			keys.map(key => newPuzzle[key] = puzzle[key] || undefined);
			newPuzzle[`//第${("0000"+(i+1)).slice(-(_puzzles.length).toString().length)}题模式`] = MODE_TITLE[puzzle.mode];
			newPuzzles.puzzles.push(newPuzzle);
			await wait(0);
			try{callback(i/_puzzles.length)}catch(e){console.error(e.stack)}
		}
		
		const json = JSON.stringify(newPuzzles, null, 2);
		const link = `"link": "https://lfz084.github.io/renju/puzzle.html",`;
		const index = json.indexOf("{") + 1;
		return json.slice(0, index) + link + json.slice(index);
	}
	
	/**
	 * 传入一个 kaibaoJSON string， 返回一个 Puzzles 对象
	 * @json		kaibaoJSON string
	 * @callback	回调函数，输出进度
 	*/
	async function kaibaoJSON2Puzzles(json, callback = () => {}) {
		const games = await kaibaoJSON2Games(json, callback);
		cBoard.setSize(15);
		const puzzles = games.map(game => {
			cBoard.unpackArray(game);
			const codeArr = (cBoard.getCode() + "{}{}").split(/{|}/);
			const stones = codeArr[0].split("\n").join("");
			const blackStones = codeArr[1].split("\n").join("");
			const whiteStones = codeArr[3].split("\n").join("");
				
			let numBlackStones = 0, numWhiteStones = 0;
			game.map(v => { v == 1 && numBlackStones++; v == 2 && numWhiteStones++ });
			const side = numBlackStones <= numWhiteStones ? 1 : 2;
			return {
				stones: stones || undefined,
				blackStones: blackStones || undefined,
				whiteStones: whiteStones || undefined,
				side: side,
				rule: 2,
				size: 15,
				mode: MODE.FREE,
				randomRotate: true
			}
		})
        const renjujson  = await puzzles2RenjuJSON({puzzles}, callback)
		return renjuJSON2Puzzles(renjujson);
	}
	
	/**
	 * 传入一个 Puzzles 对象，返回一个 games
	 * @puzzles		Puzzles 对象
 	*/
	function puzzles2Games(puzzles) {
		const games = [];
		cBoard.setSize(15);
		for (let i = 0; i < puzzles.puzzles.length; i++) {
			puzzles.index = i;
			const puzzle = puzzles.currentPuzzle;
			if (puzzle.mode) {
				const code = `${puzzle.stones}{${puzzle.blackStones}}{${puzzle.whiteStones}}`;
				cBoard.unpackCode(code, undefined, true);
				const game = cBoard.getArray();
				const keys = ["stones", "blackStones", "whiteStones", "labels", "options", "title", "comment"];
				keys.map(key => puzzle[key] && (game[key] = puzzle[key]));
				games.push(game)
			}
		}
		return games;
	}
	
	/**
	 * 传入一个 renjuJSON string，返回一个 games
 	*/
	async function renjuJSON2Games(jsonText) {
		const puzzles = renjuJSON2Puzzles(jsonText)
		return puzzles2Games(puzzles);
	}

	//------------------------ kaibao json ---------------------------
	/**
	 * json: [["H8,1","H9,2"],[...]...]
	 */
	
	/**
	 * 把棋局转换成 对应的 kaibaoJSON string
 	*/
	function toKaiBaoCode() {
		let code = [],
			codeArray = cBoard.codeString2CodeArray(cBoard.getCodeType(TYPE_NUMBER)),
			idx = -1,
			len = codeArray.length;
		while (++idx < len) {
			code.push(`${codeArray[idx]},${(idx & 1) + 1}`)
		}

		codeArray = cBoard.codeString2CodeArray(cBoard.getCodeType(TYPE_BLACK));
		idx = -1;
		len = codeArray.length;
		while (++idx < len) {
			code.push(`${codeArray[idx]},1`)
		}

		codeArray = cBoard.codeString2CodeArray(cBoard.getCodeType(TYPE_WHITE));
		idx = -1;
		len = codeArray.length;
		while (++idx < len) {
			code.push(`${codeArray[idx]},2`)
		}

		return code;
	}
	
	/**
	 * 为了避开开宝的bug，自动旋转棋局，确保15行没有棋子
 	*/
	function autoRotate() {
		let i = 0;
		while (i++ < 4) {
			let arr = cBoard.getArray();
			if (arr.slice(0, 15).filter(v => v > 0).length)
				cBoard.rotate90();
			else
				return true;
		}
		return false;
	}
	
	/**
	 * 传入一个 games，返回开宝 kaibaoJSON string
	 * @games		是一个数组， 每个元素是一个 game
	 *				game 是一个代表棋盘局面的数组， cBoard.unpackArray(game) 可以摆入棋盘
	 * @callback	回调函数，输出进度
 	*/
	async function games2kaibaoJSON(games, callback = () => {}) {
		try {
			let codes = [];
			let logStr = [`题在棋盘第15行上面有棋子，而且不能旋转调整。这题在开宝五子棋里面会缺少第15行的棋子（这是开宝五子棋的bug)`];
			for (let j = 0; j < games.length; j++) {
				await wait(0);
				cBoard.unpackArray(games[j]);
				if (autoRotate()) codes.push(toKaiBaoCode());
				else logStr.splice(logStr.length - 1, 0, j + 1)
				try{callback(j/games.length)}catch(e){console.error(e.stack)}
			}
			logStr.length > 1 && msgbox({ title: logStr.join(","), btnNum: 1 })
			try{callback(1)}catch(e){console.error(e.stack)}
			return JSON.stringify(codes);
		} catch (e) { console.error(e.stack) }
	}
	
	/**
	 * 传入一个 JSON string，下载 JSON
	 * @jsonText		JSON string
	 * @filename		文件名
 	*/
	function downloadJSON(jsonText, filename = "新文件") {
		const mark = jsonText.indexOf("puzzles") + 1 ? "_puzzle" : "";
		saveFile.save(jsonText, filename + mark + ".json");
	}
	
	/**
	 * 传入一个 JSON string，返回一个 games。
	 * games 是一个数组，每个元素是一个 game
	 * game 是一个代表棋盘局面的数组， cBoard.unpackArray(game) 可以摆入棋盘
	 * @jsonText		JSON string
	 * @callback		回调函数，输出进度
 	*/
	async function kaibaoJSON2Games(jsonText, callback = () => {}) {
		const games = [];
		const json = JSON.parse(jsonText);
		for (let i = 0; i < json.length; i++) {
			const game = new Array(226).fill(0);
			const gameJSON = json[i];
			game[225] = -1;
			for (let j = 0; j < gameJSON.length; j++) {
				const stone = gameJSON[j].toLowerCase().split(",");
				const idx = code2Idx(stone[0]);
				const color = stone[1] * 1;
				game[idx] = color;
			}
			games.push(game);
			try{callback(i/json.length)}catch(e){console.error(e.stack)}
			await wait(0);
		}
		return games;
	}
	
	/**
	 * 传入一个 JSON 文件，返回一个 games。
	 * games 是一个数组，每个元素是一个 game
	 * game 是一个代表棋盘局面的数组， cBoard.unpackArray(game) 可以摆入棋盘
	 * @file		file 对象
	 * @callback	回调函数，输出进度
 	*/ 
	async function loadJSON2Games(file, callback = () => {}) {
		const json = await file.text();
		if (json.indexOf("puzzles") + 1) 
			return renjuJSON2Games(json);
		else
			return kaibaoJSON2Games(json, callback);
	}
	
	/**
	 * 传入一个 file 对象 或者 JSONString，返回一个 Puzzles 对象
	 * @fileOrJSONString		file 对象 || JSONString
	 * @callback	回调函数，输出进度
	 * @puzzleData	接收 puzzleData
 	*/
	async function loadJSON2Puzzles(fileOrJSONString, callback = () => {}, puzzleData = {}) {
		let puzzles;
		const json = "string" == typeof fileOrJSONString ? fileOrJSONString : await fileOrJSONString.text();
		if (json.indexOf("puzzles") + 1)
			puzzles  = renjuJSON2Puzzles(json);
		else {
			puzzles  = await kaibaoJSON2Puzzles(json, callback);
		}
		if ("string" != typeof fileOrJSONString) {
			puzzles.defaultSettings = puzzles.defaultSettings || {};
			puzzles.defaultSettings.title = puzzles.defaultSettings.title || fileOrJSONString.name.slice(0, fileOrJSONString.name.lastIndexOf("."));
		}
		return puzzles;
	}
	
	const exports =  {
		games2kaibaoJSON,
		puzzles2RenjuJSON,
		loadJSON2Games,
		loadJSON2Puzzles,
		renjuJSON2Puzzles,
		downloadJSON,
		wait,
		MODE,
		MODE_NAME,
		MODE_TITLE,
		MODE_COMMENT,
		get demoPuzzles() { return renjuJSON2Puzzles(demoRenjuJSON) }
	}
	Object.freeze(exports);
	return exports;
})()