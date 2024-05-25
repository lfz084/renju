(function(global, factory) {
    (global = global || self, factory(global));
}(this, (function(exports) {
    "use strict";
    
    function bufferToBase64String(buffer) {
        let base64 = btoa(
            new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        return base64;
    }
    
    async function wait(time) {
        return new Promise(resolve => {
            setTimeout(resolve, time)
        })
    }
    
    async function toBlob(gif) {
        return new Promise(resolve => {
            function getBlob(blob) {
                resolve(blob)
            }
            gif.on('finished', getBlob);
            gif.render();
        })
    }
    
    async function toBase64(gif) {
        let blob = await toBlob(gif),
            buffer = await blob.arrayBuffer();
        return `data\:image\/gif\;base64\,` + bufferToBase64String(buffer);
    }

    class gifFile {
        constructor({ workers = 2, quality = 10, workerScript = "gif.worker.js", width = null, height = null }) {
            this.gif = new GIF({
                workers: workers,
                quality: quality,
                workerScript: workerScript,
                width: width,
                height: height
            });
        }
    }

    gifFile.prototype.addFrame = async function(image, options) {
        //await wait(0);
        this.gif.addFrame(image, options);
    }
    
    gifFile.prototype.toBlob = async function() {
        return toBlob(this.gif);
    }
    
    gifFile.prototype.toBase64 = async function() {
        return toBase64(this.gif);
    }

    exports.gifFile = gifFile;
})))
