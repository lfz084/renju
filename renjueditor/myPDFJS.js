window.myPDFJS = (( )=> {
        "use strict";
        function $(id) { return document.getElementById(id) }

        const canvas = document.createElement("canvas");
        let pdfDocument = null,
            pageIndex = 0,
            onloadPage = () => {};

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

        async function loadPage(pageNum) {
            try {
                function getViewport(page) {
                    let scale = 1;
                    let viewport = page.getViewport({scale: scale});
                    if (viewport.width * viewport.height < 1000 * 1700) {
                        scale = scale * (1000 * 1700) / (viewport.width * viewport.height);
                        viewport = page.getViewport({scale: scale});
                    }
                    return viewport;
                }
                
                const page = await pdfDocument.getPage(pageNum);
                const viewport = getViewport(page);
                const ctx = canvas.getContext("2d");
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                canvas.style.width = viewport.width + "px";
                canvas.style.height = viewport.height + "px";
                const renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                }
                await page.render(renderContext).promise;
                pageIndex = pageNum;
                await onloadPage(pageIndex, pdfDocument.numPages, canvas.toDataURL("image/png"));
                return pageIndex;
            } catch (e) { alert(e.stack); return 0}
        }

        async function openPDF(file) {
            const url = await readAsDataURL(file);
            const doc = await pdfjsLib.getDocument(url).promise;
            URL.revokeObjectURL(url);
            pdfDocument = doc;
            pdfDocument && pdfDocument.numPages && await loadPage(1);
        }

        async function nextPage() {
            if (pdfDocument && pageIndex < pdfDocument.numPages) {
                return  await loadPage(++pageIndex)
            }
            else return 0
        }

        async function prePage() {
            if (pdfDocument && pageIndex > 1) {
                return await loadPage(--pageIndex)
            }
            else return 0;
        }
        
    return {
        set onloadPage(callback) { onloadPage = callback },
        get openPDF() { return openPDF },
        get nextPage() { return nextPage },
        get prePage() { return prePage },
        get loadPage() { return loadPage },
        get numPages() { return pdfDocument ? pdfDocument.numPages : 0 }
    }
})()
