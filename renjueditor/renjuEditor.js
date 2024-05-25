window.renjuEditor = (() => {
    "use strict";
    
    function log(msg) {
        let elm = document.getElementById("log");
        elm && (elm.innerText = `${msg}\n`);
    }

    //----------------------- open Image ------------------------
    
    let onloadPage = () => {};
    
    function readAsDataURL(file) {
        return new Promise(function(resolve) {
            try {
                let fr = new FileReader();
                fr.onload = function() {
                    resolve(fr.result)
                };
                fr.onerror = function() {
                    resolve("")
                };
                fr.readAsDataURL(file)
            } catch (e) {
                alert(e.stack);
                resolve("");
            }
        });
    }
    
    async function openImage(file) {
        setTimeout(onloadPage, 0, 1, 1, await readAsDataURL(file));
    }

    //------------------------ 
    
    const EMPTY = 0;
    const PDF = 1;
    const ZIP = 2;
    const IMAGE = 3;
    
    let mode = 0;
    
    function setnloadPage(callback) {
        myPDFJS.onloadPage = callback;
        myZip.onloadPage = callback;
        onloadPage = callback;
    }
    
    async function openFile(file, filename, callback = () => {}) {
    	filename = filename.toLowerCase();
        if(/\.pdf$/i.test(filename)) {
            await myPDFJS.openPDF(file);
            mode = PDF;
        }
        else if (/\.zip$/i.test(filename)) {
            await myZip.openZIP(file);
            mode = ZIP;
        }
        else if (/\.json$/i.test(filename)) {
        	return await puzzleCoder.loadJSON2Games(file, callback);
        }
        else {
            await openImage(file);
            mode = IMAGE;
        }
        return [];
    }
    
    async function loadPage(numPage) {
        if (mode == PDF) return myPDFJS.loadPage(numPage)
        else if (mode == ZIP) return myZip.loadPage(numPage)
    }
    
    async function nextPage() {
        if (mode == PDF) return myPDFJS.nextPage()
        else if (mode == ZIP) return myZip.nextPage()
    }
    
    async function prePage() {
        if (mode == PDF) return myPDFJS.prePage()
        else if (mode == ZIP) return myZip.prePage()
    }
    
    function getNumPage() {
        if (mode == PDF) return myPDFJS.numPages
        else if (mode == ZIP) return myZip.numPages
        else if (mode == IMAGE) return 1
        return 0;
    }
    
    //------------------------ 
    
    return {
        set onloadPage(callback) { setnloadPage(callback) },
        get openFile() { return openFile },
        get nextPage() { return nextPage },
        get prePage() { return prePage },
        get loadPage() { return loadPage },
        get numPages() { return getNumPage() }
    }
})()
