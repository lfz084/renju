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
                [SOURCE_FILES["markLine"]],
                [SOURCE_FILES["svg"]],
				[SOURCE_FILES["saveFile"]]]
         },{
			progress: "60%",
			type: "scriptAll",
			isAsync: false,
			sources: [[SOURCE_FILES["dbTypes"]],
				[SOURCE_FILES["dbclient"]]]
		},{
			progress: "63%",
			type: "scriptAll",
			isAsync: true,
			sources: [[SOURCE_FILES["TextCoder"]],
		    	[SOURCE_FILES["MoveList"]],
		        [SOURCE_FILES["Stack"]],
		        [SOURCE_FILES["RenjuLib"]]]
		}, {
			progress: "70%",
			type: "scriptAll",
			isAsync: false,
			sources: [[SOURCE_FILES["TypeBuffer"]],
				[SOURCE_FILES["RenjuTree"]]]
		}, {
			progress: "80%",
			type: "scriptAll",
			isAsync: false,
			sources: [[SOURCE_FILES["EvaluatorWebassembly"]],
                [SOURCE_FILES["EvaluatorJScript"]],
                [SOURCE_FILES["Evaluator"]],
                [SOURCE_FILES["engine"]]]
        }, {
        	progress: "80%",
        	type: "scriptAll",
        	isAsync: false,
        	sources: [[SOURCE_FILES["gomocalc"]]]
        }, {
        	progress: "80%",
        	type: "scriptAll",
        	isAsync: false,
        	sources: [[SOURCE_FILES["jszip"]]]
        },{
			progress: "99%",
			type: "scriptAll",
			isAsync: false,
			sources: [[SOURCE_FILES["saveFile_js"]],
                [SOURCE_FILES["puzzleCoder"]],
                [SOURCE_FILES["puzzleAI"]],
				[SOURCE_FILES["dbreadMain"]]]
        }
     ];
})()
