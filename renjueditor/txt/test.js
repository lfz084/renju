
function toKaiBaoCode() {
    let code = [];
    cBoard.MS.map((idx, i) => {
        code.push(`${idxToName(idx)},${(i & 1) + 1}`)
    })
    return code;
}

function autoRotate(index) {
    let i = 0;
    while (i++ < 4) {
        if(index==100) alert(i)
        let arr = cBoard.getArray();
        if (arr.slice(0, 15).filter(v => v > 0).length)
            cBoard.rotate90();
        else
            return true;
    }
    alert(`第${index}题在棋盘第15行上面，不可避免的出现了棋子。这题在开宝五子棋里面会缺少第15行的棋子（这是开宝五子棋的bug）`)
}

async function ctn() {
try{
    let codes = [];
    for(let j= 0; j < codeArr.length; j++) {
        //cBoard.cle();
        cBoard.unpackCode(codeArr[j])
        await engine.wait(0)
        autoRotate(j) && codes.push(toKaiBaoCode())
    }
    msg(JSON.stringify(codes),"input")
}catch(e){alert(e.stack)}
}

ctn()
