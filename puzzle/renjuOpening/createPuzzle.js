const data = [
"H8H9H10", "寒星",
"H8H9I10", "溪月",
"H8H9J10", "疏星",
"H8H9I9", "花月",
"H8H9J9", "残月",
"H8H9I8", "雨月",
"H8H9J8", "金星",
"H8H9H7", "松月",
"H8H9I7", "丘月",
"H8H9J7", "新月",
"H8H9H6", "瑞星",
"H8H9I6", "山月",
"H8H9J6", "游星",
"H8I9J10", "长星",
"H8I9J9", "峡月",
"H8I9I8", "云月",
"H8I9J8", "恒星",
"H8I9G7", "斜月",
"H8I9H7", "银月",
"H8I9I7", "浦月",
"H8I9J7", "水月",
"H8I9F6", "彗星",
"H8I9G6", "名月",
"H8I9H6", "明星",
"H8I9I6", "岚月",
"H8I9J6", "流星"];

const model = {
 	"side": 1,
 	"rule": 2,
 	"size": 15,
 	"mode": 193,
 	"level": 1,
 	"sequence": 3,
 	"delayHelp": 0.25,
 	"title": "开局速记",
 	"comment": "请选出正确的开局名称"
};

const puzzlesJSON = {defaultSettings:{title: "五子棋标准26开局速记"}},
puzzles = [
    {
      "stones": "H8H9",
      "labels": [
        "H8,1",
        "H9,2",
        "H10,寒",
        "I10,溪",
        "J10,疏",
        "I9,花",
        "J9,残",
        "I8,雨",
        "J8,金",
        "H7,松",
        "I7,丘",
        "J7,新",
        "H6,瑞",
        "I6,山",
        "J6,游"
      ],
      "size": 15,
      "mode": 0,
      "title": "直指开局-1/2",
      "comment": "直指开局口决：\r\n寒星溪月疏星首\r\n花残雨月金星走\r\n松月丘月新月局\r\n瑞星山月游星丢\r\n"
    },  
    {
      "stones": "H8I9",
      "labels": [
          "H8,1",
          "I9,2",
          "J10,长",
          "J9,峡",
          "I8,云",
          "J8,恒",
          "G7,斜",
          "H7,银",
          "I7,浦",
          "J7,水",
          "F6,彗",
          "G6,名",
          "H6,明",
          "I6,岚",
          "J6,流"
      ],
      "size": 15,
      "mode": 0,
      "title": "斜指开局-2/2",
      "comment": "斜指开局口决：\r\n星月长峡恒水流\r\n云月浦月岚月游\r\n银明斜名是正局\r\n只有彗星不能走\r\n"
    }],
tempPuzzles = [],
allNames = [];

for (let i=0; i < data.length; i++) {
    const stones = data[i++],
    name = data[i];
    tempPuzzles.push({stones, name});
    allNames.push(data[i]);
}

for (let i=0; i < tempPuzzles.length; i++) {
    const puzzle = tempPuzzles[i];
    const names = shuffle(allNames.filter(name => name!=puzzle.name));
    puzzle.names = names;
}

//console.log(JSON.stringify(tempPuzzles,null,2))

for(let j = 0; j < 4 ; j++) {
    for(let i = 0; i < tempPuzzles.length; i++) {
        puzzles.push(createPuzzle(tempPuzzles[i], model))
    }
}
delete model.sequence
for (let j = 0; j < 4; j++) {
    for (let i = 0; i < tempPuzzles.length; i++) {
        puzzles.push(createPuzzle(tempPuzzles[i], model))
    }
}

console.log(JSON.stringify(puzzles,null,2))

Object.assign(puzzlesJSON, {puzzles})

navigator.clipboard.writeText(JSON.stringify(puzzlesJSON,null,2))
.then(()=>alert("ok"))
.catch(e=>alert(e.message || e.toString()))

function shuffle(arr) {
    var random
    var newArr = []

    while (arr.length) {
        random = Math.floor(Math.random() * arr.length)
        newArr.push(arr[random])
        arr.splice(random, 1)
    }

    return newArr
}

function createPuzzle(puzzle, model) {
    const lbs = ["E4", "G4", "I4", "K4"];
    const index = Math.floor(Math.random() * lbs.length);
    const labels = [];
    for (let i = 0; i < lbs.length; i++) {
        labels.push(`${lbs[i]},${i==index?puzzle.name:puzzle.names.shift()}`);
    }
    const rt = {
        stones: puzzle.stones,
        labels,
        options: lbs[index]
    }
    Object.assign(rt, model);
    return rt;
}