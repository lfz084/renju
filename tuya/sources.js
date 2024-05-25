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
                [SOURCE_FILES["saveFile"]],
                [SOURCE_FILES["share"]],
                [SOURCE_FILES["helpWindow"]]]
        }, {
			progress: "99%",
			type: "scriptAll",
			isAsync: false,
			sources: [[SOURCE_FILES["tuyaMain"]]]
        }
     ];
})()