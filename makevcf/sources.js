"use strict";
		
(async () => {
	window.SOURCE_FILES = (await loadJSON("Version/SOURCE_FILES.json")).files;

	window.appSources = [
		{
			progress: "50%",
			type: "scriptAll",
			isAsync: false,
			sources: [[SOURCE_FILES["share"]],
				[SOURCE_FILES["CheckerBoard"]],
				[SOURCE_FILES["saveFile"]]]
         },{
			progress: "60%",
			type: "scriptAll",
			isAsync: false,
			sources: [[SOURCE_FILES["TypeBuffer"]],
				[SOURCE_FILES["RenjuTree"]],
				[SOURCE_FILES["makevcf"]],
				[SOURCE_FILES["saveFile_js"]],
				[SOURCE_FILES["puzzleCoder"]]]
		}, {
			progress: "80%",
			type: "scriptAll",
			isAsync: false,
			sources: [[SOURCE_FILES["EvaluatorWebassembly"]],
                [SOURCE_FILES["EvaluatorJScript"]],
                [SOURCE_FILES["Evaluator"]],
                [SOURCE_FILES["engine"]]]
        }, {
			progress: "99%",
			type: "scriptAll",
			isAsync: false,
			sources: [[SOURCE_FILES["makevcfMain"]]]
        }
     ];
})()
    