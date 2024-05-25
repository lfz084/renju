(function(global, factory) {
    (global = global || self, factory(global));
}(this, (function(exports) {
    'use strict';

    CheckerBoard.prototype.saveFile = function(blob, filename) {
        if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
            navigator.msSaveOrOpenBlob(blob, filename);
            console.log("msSaveOrOpenBlob...");
        }
        else {
            // if iphone open file;
            if (navigator.userAgent.indexOf("iPhone") + 1) {
                let url = URL.createObjectURL(blob);
                window.open(url, "helpWindow");
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

    CheckerBoard.prototype.autoFileName = function() {
        let d = new Date();
        let filename = `${d.getFullYear()}_${(f(d.getMonth() + 1))}${f(d.getDate())}_${f(d.getHours())}${f(d.getMinutes())}${f(d.getSeconds())}`;
        return filename;

        function f(s) {
            s = s < 10 ? `0${s}` : s;
            return s;
        }
    }
    
    CheckerBoard.prototype.saveAsImage = function(type = "png", canvas = this.cutViewBox()) {
        function toBlob(callback, type, quality) {
            function reqListener() {
                let blob = new Blob([oReq.response]);
                callback(blob);
            }
            let url = this.toDataURL(type, quality);
            let oReq = new XMLHttpRequest();
            oReq.addEventListener("load", reqListener);
            oReq.open("GET", url);
            oReq.responseType = "arraybuffer";
            oReq.send();
        }
    
        let filename = `${this.autoFileName()}.${type}`;
        //保存
        canvas.toBlob = canvas.toBlob || toBlob.bind(canvas);
        canvas.toBlob(blob => {
            this.saveFile(blob, filename);
        }, "image/" + type, 0.1);
    }

})))
