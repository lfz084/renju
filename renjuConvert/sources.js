"use strict";
		
(async () => {
	window.SOURCE_FILES = (await loadJSON("Version/SOURCE_FILES.json")).files;

	window.appSources = [
		{
			progress: "50%",
			type: "scriptAll",
			isAsync: false,
			sources: [[SOURCE_FILES["CheckerBoard"]]]
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
			progress: "99%",
			type: "scriptAll",
			isAsync: false,
			sources: [[SOURCE_FILES["saveFile_js"]],
				[SOURCE_FILES["renjuConvertMain"]]]
        }
     ];
})()
