"use strict";

(async () => {
	window.SOURCE_FILES = (await loadJSON("Version/SOURCE_FILES.json")).files;

	window.appSources = [
		{
			progress: "50%",
			type: "scriptAll",
			isAsync: false,
			sources: [[SOURCE_FILES["CheckerBoard"]],
				[SOURCE_FILES["image2board"]]]
         },{
         	progress: "39%",
         	type: "scriptAll",
        	isAsync: false,
       		sources: [[SOURCE_FILES["TypeBuffer"]],
         		[SOURCE_FILES["TextCoder"]],
       			[SOURCE_FILES["RenjuTree"]],
         		[SOURCE_FILES["EvaluatorWebassembly"]],
         		[SOURCE_FILES["EvaluatorJScript"]],
         		[SOURCE_FILES["Evaluator"]],
         		[SOURCE_FILES["engine"]]]
         },{
			progress: "60%",
			type: "scriptAll",
			isAsync: false,
			sources: [[SOURCE_FILES["pdfjs"]],
				[SOURCE_FILES["mypdfjs"]]]
		}, {
			progress: "80%",
			type: "scriptAll",
			isAsync: false,
			sources: [[SOURCE_FILES["jszip"]],
            	[SOURCE_FILES["myzip"]]]
        }, {
			progress: "99%",
			type: "scriptAll",
			isAsync: false,
			sources: [[SOURCE_FILES["saveFile_js"]],
				[SOURCE_FILES["puzzleCoder"]],
				[SOURCE_FILES["puzzleAI"]],
				[SOURCE_FILES["renjueditor"]],
				[SOURCE_FILES["renjueditorMain"]]]
        }
     ];
})()
    