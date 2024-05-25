"use strict";

CheckerBoard.prototype.toGIF = function(start = -1, end = this.MSindex, delay = 500, width = this.width, height = this.height, workerScript = "gif/gif.worker.js") {
    let gFile = new gifFile({
        workers: 2,
        quality: 10,
        workerScript: workerScript,
        width: width - 1,
        height: height - 1
    }),
    oldMSindex = this.MSindex;
    start = start > this.MSindex ? this.MSindex : start;
    start = start < -1 ? -1 : start;
    end = end > this.MSindex ? this.MSindex : end;
    end = end < start ? start : end;
    
    while(this.MSindex > start) {this.toPrevious(this.isShowNum)}
    gFile.addFrame(this.canvas, { copy: true, delay: delay })
    while(this.MSindex < end) {
        this.toNext(this.isShowNum);
        gFile.addFrame(this.canvas, { copy: true, delay: delay })
    }
    
    this.toStart(this.isShowNum);
    while(this.MSindex < oldMSindex) {this.toNext(this.isShowNum)}
    return gFile;
}

CheckerBoard.prototype.showGIF = async function(start, end) {
    let exWindow = window.exWindow,
        base64Img = await this.toGIF(start, end).toBase64(),
        innerHTML = `<image src="${base64Img}"></image>`;
    exWindow.innerHTML(innerHTML);
    if (innerHTML) exWindow.open();
    
}
