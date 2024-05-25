//if (self.SCRIPT_VERSIONS) self.SCRIPT_VERSIONS["appData"] = "2024.23206";
 window.appData = (() => {
    "use strict";
    let timerSave = null; // 保存,定时器

    let renjuSave = () => {
        if (timerSave) { // 如果之前的保存计划还没开始 取消计划。
            clearTimeout(timerSave);
        }
        // 预定保存点击，
        timerSave = setTimeout(() => { 
            let moves = cBoard.getCodeType(TYPE_NUMBER),
                whiteMoves = cBoard.getCodeType(TYPE_WHITE),
                blackMoves = cBoard.getCodeType(TYPE_BLACK),
                firstColor = cBoard.firstColor,
                resetNum = cBoard.resetNum,
                cBoardSize = cBoard.size,
                coordinateType = cBoard.coordinateType;
            saveData({
                moves: moves,
                whiteMoves: whiteMoves,
                blackMoves: blackMoves,
                firstColor: firstColor,
                resetNum: resetNum,
                cBoardSize: cBoardSize,
                coordinateType: coordinateType,
            });
            timerSave = null;
        }, 5000);
    };

    let renjuLoad = (data) => {
        setTimeout(() => { 
            if (data.cBoardSize != "undefined" && data.cBoardSize)
                cBoard.setSize(parseInt(data.cBoardSize));
            if (data.coordinateType != "undefined" && data.coordinateType)
                cBoard.setCoordinate(parseInt(data.coordinateType));
            if (typeof data.renjuCmdSettings == "object")
                control.loadCmdSettings("renjuCmdSettings", data.renjuCmdSettings);
            if (data.firstColor != "undefined" && data.firstColor) cBoard.firstColor = data.firstColor;
            if (parseInt(data.resetNum) > 0) cBoard.resetNum = parseInt(data.resetNum);
            if (data.moves) cBoard.unpackCodeType(data.moves, TYPE_NUMBER, TYPE_NUMBER, true);
            if (data.whiteMoves) cBoard.unpackCodeType(data.whiteMoves, TYPE_WHITE, TYPE_WHITE, true);
            if (data.blackMoves) cBoard.unpackCodeType(data.blackMoves, TYPE_BLACK, TYPE_BLACK, true);
        }, 300);
    };

    let saveData = (data) => {
        //console.log("saveData");
        if (data.moves != "" || data.whiteMoves != "" || data.blackMoves != "") {
            localStorage.setItem("moves", data.moves);
            localStorage.setItem("whiteMoves", data.whiteMoves);
            localStorage.setItem("blackMoves", data.blackMoves);
            localStorage.setItem("resetNum", data.resetNum);
            localStorage.setItem("firstColor", data.firstColor);
            localStorage.setItem("cBoardSize", data.cBoardSize);
            localStorage.setItem("coordinateType", data.coordinateType);
            //log("保存棋谱:" + moves);
        }
    };

    let loadData = () => {
        //console.log("loadData");
        let firstColor = localStorage.getItem("firstColor"),
            resetNum = localStorage.getItem("resetNum"),
            moves = localStorage.getItem("moves"),
            whiteMoves = localStorage.getItem("whiteMoves"),
            blackMoves = localStorage.getItem("blackMoves"),
            cBoardSize = localStorage.getItem("cBoardSize"),
            coordinateType = localStorage.getItem("coordinateType"),
            renjuCmdSettings = getObject("renjuCmdSettings");
        
        return {
            firstColor: firstColor,
            resetNum: resetNum,
            moves: moves,
            whiteMoves: whiteMoves,
            blackMoves: blackMoves,
            cBoardSize: cBoardSize,
            coordinateType: coordinateType,
            renjuCmdSettings: renjuCmdSettings
        }
    };

    let getKey = key => {
        return localStorage.getItem(key);
    };
    
    let setKey = (key, value) => {
        return localStorage.setItem(key, value);
    };
    
    let removeKey = key => {
        return localStorage.removeItem(key);
    };
    
    let getObject = key => {
        return JSON.parse(getKey(key));
    };
    
    let setObject = (key, obj) => {
        return setKey(key, JSON.stringify(obj));
    };

    return {
        "renjuSave": renjuSave,
        "renjuLoad": renjuLoad,
        "saveData": saveData,
        "loadData": loadData,
        "getKey": getKey,
        "setKey": setKey,
        "getObject": getObject,
        "setObject": setObject,
        "removeKey": removeKey,
    };
})();
