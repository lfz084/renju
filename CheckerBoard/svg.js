(function(global, factory) {
    (global = global || self, factory(global));
}(this, (function(exports) {
    'use strict';
    
    CheckerBoard.prototype.printLineSVG = function({ x1, y1, x2, y2, color, lineWidth }, scale) {
        return `<line x1="${~~(x1*scale)}" y1="${~~(y1*scale)}" x2="${~~(x2*scale)}" y2="${~~(y2*scale)}" stroke="${color}" stroke-width="${~~(lineWidth*scale + 1)}"/>`;
    }
    
    CheckerBoard.prototype.printCircleSVG = function({ x, y, radius, color, lineWidth, fill }, scale) {
        return `<circle cx="${~~(x*scale)}" cy="${~~(y*scale)}" r="${~~(radius*scale)}" ${lineWidth ? `stroke="${color}" stroke-width="${~~(lineWidth*scale + 1)}"` : ""} fill="${fill}"/>`;
    }
    
    CheckerBoard.prototype.printTextSVG = function({ txt, x, y, color, weight, family, size }, scale) {
        family = "mHeiTi, Roboto, emjFont, Symbola, 黑体";
        return !txt ? "" : `<text x="${~~(x*scale)}" y="${~~(y*scale)}" stroke="${color}" fill="${color}" font-weight="${weight}" font-family="${family}" font-size="${~~(size*scale)}" text-anchor="middle" dominant-baseline="central">${txt}</text>`;
    }
    
    CheckerBoard.prototype.printTriangleSVG = function({ points, color }, scale) {
        let pointStr = points.reduce((pre, cur) => `${pre}${~~(cur.x*scale)}, ${~~(cur.y*scale)} `, "")
        return `<polygon points="${pointStr}" style="fill:${color}"/>`;
    }
    
    CheckerBoard.prototype.printBoardPointsSVG = function(scale) {
        let svgText = "";
        for (let i = 0; i < 225; i++) {
            if (this.P[i].type != TYPE_EMPTY) {
                let pointInfo = this.getBoardPointInfo(i, this.isShowNum);
                svgText += this.printCircleSVG(pointInfo.circle, scale);
                svgText += this.printTextSVG(pointInfo.text, scale);
            }
        }
        return svgText;
    }
    
    CheckerBoard.prototype.printMarkLinesSVG = function(scale, lines = this.lines) {
        let x1, x2, y1, y2, svgText = "";
        for (let i = 0; i < lines.length; i++) {
            let points = this.getMarkLinePoints(lines[i]);
            x1 = points.line[0].x;
            x2 = points.line[1].x;
            y1 = points.line[0].y;
            y2 = points.line[1].y;
            svgText += this.printLineSVG({ x1: x1, y1: y1, x2: x2, y2: y2, color: lines[i].color, lineWidth: ~~this.getMarkLineWidth() }, scale);
        }
        return svgText;
    }
    
    CheckerBoard.prototype.printMarkArrowsSVG = function(scale, arrows = this.arrows) {
        let x1, x2, y1, y2, svgText = "";
        for (let i = 0; i < arrows.length; i++) {
            let points = this.getMarkArrowPoints(arrows[i]);
            x1 = points.line[0].x;
            x2 = points.line[1].x;
            y1 = points.line[0].y;
            y2 = points.line[1].y;
            svgText += this.printLineSVG({ x1: x1, y1: y1, x2: x2, y2: y2, color: arrows[i].color, lineWidth: ~~this.getMarkLineWidth() }, scale);
            svgText += this.printTriangleSVG({ points: points.arrow, color: arrows[i].color }, scale);
        }
        return svgText;
    }
    
    
    CheckerBoard.prototype.printEmptyCBoardSVG = function(scale) {
        let svgText = "";
        let boardLinesInfo = this.getBoardLinesInfo();
        svgText += boardLinesInfo.map(lineInfo => this.printLineSVG(lineInfo, scale)).join("")
        let starPointsInfo = this.getStarPointsInfo();
        svgText += starPointsInfo.map(starPointInfo => this.printCircleSVG(starPointInfo, scale)).join("")
        let coordinateTypeInfo = this.getCoordinateInfo();
        svgText += coordinateTypeInfo.map(textInfo => this.printTextSVG(textInfo, scale)).join("")
        return svgText;
    }
    
    CheckerBoard.prototype.refreshCheckerBoardSVG = function(scale) {
        let svgText = "";
        svgText += this.printEmptyCBoardSVG(scale);
        svgText += this.printMarkLinesSVG(scale);
        svgText += this.printBoardPointsSVG(scale);
        svgText += this.printMarkArrowsSVG(scale);
        return svgText;
    }
    
    CheckerBoard.prototype.getSVG = function() {// 把棋盘图片转成SVG,返回SVG代码
        let svgSize = 800,
            scale = svgSize / this.canvas.width,
            viewBox = this.getViewBoxRect(scale),
            svgText = `<svg role="img" xmlns="http://www.w3.org/2000/svg" style ="width:100%;height:100%;background-color:#ffffff" viewBox="${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}" version="1.1"><clipPath id="clip"><rect x="${viewBox.x}" y="${viewBox.y}" width="${viewBox.width}" height="${viewBox.height}" /></clipPath><g style="clip-path: url(#clip);">`;
        svgText += this.refreshCheckerBoardSVG(scale);
        svgText += "</g></svg>";
        return svgText;
    }
    
    CheckerBoard.prototype.saveAsSVG = function(type) {
        const oldTheme = this.theme;
        this.loadTheme(this.defaultTheme);
        
        let filename = this.autoFileName();
        filename += type == "html" ? ".html" : ".svg";
        let mimetype = type == "html" ? "text/html" : "image/svg+xml";
        let blob = new Blob([this.getSVG()], { type: mimetype });
        this.saveFile(blob, filename);
        
        this.loadTheme(oldTheme);
    }
})))
