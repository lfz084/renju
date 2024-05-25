"use strict";
(async () => {
	window.SOURCE_FILES = (await loadJSON("Version/SOURCE_FILES.json")).files;

	window.appSources = [
		{
			progress: "28%",
			type: "scriptAll",
			isAsync: false,
			sources: [[SOURCE_FILES["CheckerBoard"]],
                [SOURCE_FILES["image2board"]],
                [SOURCE_FILES["markLine"]],
                [SOURCE_FILES["tree"]],
                [SOURCE_FILES["saveFile"]],
                [SOURCE_FILES["share"]],
                [SOURCE_FILES["helpWindow"]],
                [SOURCE_FILES["InputButton"]]]
        }, {
			progress: "39%",
			type: "scriptAll",
			isAsync: false,
			sources: [[SOURCE_FILES["TypeBuffer"]],
				[SOURCE_FILES["TextCoder"]],
				[SOURCE_FILES["RenjuTree"]]]
		}, {
			progress: "60%",
			type: "scriptAll",
			isAsync: false,
			sources: [[SOURCE_FILES["EvaluatorWebassembly"]],
				[SOURCE_FILES["EvaluatorJScript"]],
				[SOURCE_FILES["Evaluator"]],
				[SOURCE_FILES["engine"]]]
		},{
			progress: "80%",
			type: "scriptAll",
			isAsync: false,
			sources: [[SOURCE_FILES["gomocalc"]]]
		}, {
			progress: "99%",
			type: "scriptAll",
			isAsync: false,
			sources: [[SOURCE_FILES["saveFile_js"]],
				[SOURCE_FILES["puzzleData"]],
                [SOURCE_FILES["puzzleCoder"]],
				[SOURCE_FILES["puzzleAI"]],
				[SOURCE_FILES["puzzleMain"]]]
        }
     ];
})()