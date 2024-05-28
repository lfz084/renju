"use strict";
(async () => {
	window.SOURCE_FILES = (await loadJSON("Version/SOURCE_FILES.json")).files;

	window.appSources = [
		{
			progress: "28%",
			type: "scriptAll",
			isAsync: false,
			sources: [[SOURCE_FILES["EvaluatorWebassembly"]],
                [SOURCE_FILES["EvaluatorJScript"]],
                [SOURCE_FILES["TypeBuffer"]],
                [SOURCE_FILES["CheckerBoard"]],
                [SOURCE_FILES["image2board"]],
                [SOURCE_FILES["markLine"]],
                [SOURCE_FILES["pdf"]],
                [SOURCE_FILES["saveFile"]],
                [SOURCE_FILES["svg"]],
                [SOURCE_FILES["tree"]],
                [SOURCE_FILES["share"]],
                [SOURCE_FILES["exWindow"]],
                [SOURCE_FILES["editButtons"]],
                [SOURCE_FILES["helpWindow"]]]
        }, {
			progress: "30%",
			type: "scriptAll",
			isAsync: true,
			sources: [[SOURCE_FILES["Evaluator"]],
                [SOURCE_FILES["RenjuTree"]]]
        }, {
			progress: "35%",
			type: "scriptAll",
			isAsync: true,
			sources: [[SOURCE_FILES["appData"]],
                [SOURCE_FILES["engine"]],
                [SOURCE_FILES["NoSleep"]],
                [SOURCE_FILES["jspdf"]]]
        }, {
			progress: "63%",
			type: "scriptAll",
			isAsync: true,
			sources: [[SOURCE_FILES["TextCoder"]],
                [SOURCE_FILES["MoveList"]],
                [SOURCE_FILES["Stack"]],
                [SOURCE_FILES["RenjuLib"]],
                [SOURCE_FILES["gif"]],
                [SOURCE_FILES["gifFile"]],
                [SOURCE_FILES["CheckerBoardGIF"]]]
        }, {
        	progress: "99%",
			type: "scriptAll",
			isAsync: false,
			sources: [[SOURCE_FILES["control"]]]
        }
     ];
})()