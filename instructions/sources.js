"use strict";
(async () => {
	window.SOURCE_FILES = (await loadJSON("Version/SOURCE_FILES.json")).files;

	window.appSources = [
		{
			progress: "50%",
			type: "scriptAll",
			isAsync: true,
			sources: [[SOURCE_FILES["helpWindow"]]]
	     }, {
			progress: "99%",
			type: "scriptAll",
			isAsync: false,
			sources: [[SOURCE_FILES["instructionsMain"]]]
	        }
	     ];
})()