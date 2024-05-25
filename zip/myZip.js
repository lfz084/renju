(function(global, factory) {
    (global = global || self, factory(global));
}(this, (function(exports) {
    "use strict";

    let sourceZip = null,
        targetZip = null,
        files = [];
    
    function log(msg) {
        let elm = document.getElementById("log");
        elm && (elm.innerText = `${msg}\n`);
    }
    
    async function getArrBuf(file) {
        return new Promise(function(resolve) {
            try {
                let fr = new FileReader();
                fr.onload = function() {
                    resolve(fr.result)
                };
                fr.onerror = function() {
                    resolve(new ArrayBuffer(0))
                };
                fr.readAsArrayBuffer(file)
            } catch (e) { resolve(new ArrayBuffer(0)) }
        });
    }
    
    function resetZip() {
        sourceZip = new JSZip();
        targetZip = new JSZip();
        files = [];
    }
    
    async function openZipFile(file) {
        return sourceZip.loadAsync(getArrBuf(file), {
            checkCRC32: true
        })
    }
    
    function getFile(relativePath) {
        return sourceZip.file(relativePath);
    }
    
    async function getBuffer(file) {
        return file.async("uint8array");
    }
    
    async function loadFile(file) {
        resetZip();
        log("openZipFile")
        await openZipFile(file);
        sourceZip.forEach((relativePath, file) => {
            let path = relativePath,
                temp = relativePath.split("\/"),
                name = temp.pop() || temp.pop();
            if (!file.dir && /\.jpg$|\.png$/.exec(name)) {
                files.push({ path: path, name: name })
                log(`push file: "${name}"`)
            }
        })
    }
    
    async function getBase64Img(index) {
        const HEAD = {
            jpg: `data\:image\/jpg\;base64\,`,
            png: `data\:image\/png\;base64\,`
        }
        let file = sourceZip.file(files[index].path),
            buffer = await getBuffer(file),
            base64 = bufferToBase64String(buffer),
            head = files[index].name.indexOf("jpg") + 1 ? HEAD["jpg"] : HEAD["png"],
            base64Img = head + base64;
        return base64Img;
    }
    
    function addFile(name, data) {
        log(`addFile: name = "${name}"`)
        targetZip.file(name, data);
    }
    
    async function download(filename = "download") {
        let data = await targetZip.generateAsync({ type: "blob" }, function updateCallback(metadata) {
            log("progression: " + metadata.percent.toFixed(2) + " %");
            if (metadata.currentFile) {
                log("current file = " + metadata.currentFile);
            }
        });
        log("downloading...")
        save(data, filename);
    }
    
    async function addFiles(padding, quality) {
        for (let i = 0; i < files.length; i++) {
            let file = files[i],
                base64Img = await getBase64Img(i),
                rightName = ("0000" + (i << 1)).slice(-4) + "\.jpg",
                leftName = ("0000" + ((i << 1) + 1)).slice(-4) + "\.jpg",
                { leftBlob, rightBlob } = await splitImage(base64Img, padding, quality);
            i && addFile(rightName, rightBlob);
            addFile(leftName, leftBlob);
        }
    }
    
    const myZip = {
        loadFile: loadFile,
        download: download,
        addFile: addFile,
        addFiles: addFiles
    }
    exports.myZip = myZip;
})))
