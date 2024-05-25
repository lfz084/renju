window.saveFile = (() => {
	function text2blob(text, options = {type: "application/octet-stream"}) {
		return new Blob([text], options)
	}
	
	function bufferToBlob(buf, options = {type: "application/octet-stream"}) {
		return new Blob([buf], options)
	}
	
	
	
	function saveBlob(blob, filename = "download") {
		if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
			navigator.msSaveOrOpenBlob(blob, filename);
			console.log("msSaveOrOpenBlob...");
		}
		else {
			// if iphone open file;
			if (navigator.userAgent.indexOf("iPhone") + 1) {
				let url = URL.createObjectURL(blob);
				window.open(url, "download");
				setTimeout(() => {
					URL.revokeObjectURL(url);
				}, 1000 * 60);
				console.log("open downloading...");
			}
			else { // download file;
				let save_link = document.createElement("a");
				save_link.href = URL.createObjectURL(blob);
				save_link.download = filename;
				save_link.target = "download";
				document.body.appendChild(save_link);
				save_link.click();
				save_link.parentNode.removeChild(save_link);
				save_link.remove();
				setTimeout(() => { URL.revokeObjectURL(save_link.href); }, 1000 * 60);
				console.log("click downloading...");
			}
		}
	}
	
	function save(data, filename, type) {
		if (!data) return;
		if (data.constructor && data.constructor.name == "Blob") {
			saveBlob(data, filename);
		}
		else if (data.constructor && data.constructor.name == "String") {
			saveBlob(text2blob(data, type), filename);
		}
		else if(data.buffer && data.buffer.constructor.name == "ArrayBuffer") {
			saveBlob(bufferToBlob(data.buffer, type), filename);
		}
		else if(data.constructor.name == "ArrayBuffer") {
			saveBlob(bufferToBlob(data, type), filename);
		}
	}
	
	return {save}
})()