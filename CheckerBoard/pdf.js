(function(global, factory) {
    (global = global || self, factory(global));
}(this, (function(exports) {
    'use strict';
	const fontName_normal = "PFSCMedium";
    const fontName_bold = "PFSCHeavy";
    
    //unloaded >> loading >> loaded >> error
    const fontScripts = {
    	"PFSCMedium": {
    		status: "unloaded",
    		url: window["SOURCE_FILES"] && window["SOURCE_FILES"]["PFSCMedium_js"] || "pdf/SourceHanSansCN-Medium_jsPdf.subset-normal.js"
    	},
		"PFSCHeavy": {
    		status: "unloaded",
			url: window["SOURCE_FILES"] && window["SOURCE_FILES"]["PFSCHeavy_js"] || "pdf/SourceHanSansCN-Heavy_jsPdf.subset-normal.js"
		}
    }
    
    async function isFinally(promise) {
    	let isF = true,
    		t = {};
    	await Promise.race([promise, t])
    		.then(v => v === t && (isF = false))
    	return isF;
    }
    
    async function removeFinallyPromise(promiseArray) {
    	for (let j = promiseArray.length - 1; j >= 0; j--) {
    		if (await isFinally(promiseArray[j])) {
    			promiseArray.splice(j, 1);
    		}
    	}
    }
        
    function hasWideCharacter(board) {
    	const str = board.P.map(p => p.text).join("");
    	return str.split("").map(char => char.codePointAt()).find(code => code > 0xFF) !== undefined;
    }
    
    async function waitCondition(condition = ()=>true, timeout = 500) {
    	return new Promise((resolve) => {
    		let timer = setInterval(() => {
    			if (condition()) {
    				clearInterval(timer);
    				resolve();
    			}
    		}, timeout)
    	})
    }
    
    async function waitAddFont(fontName) {
    	if (fontScripts[fontName]["status"] == "loaded") {
    		let count = 0;
    		await waitCondition(() => {
    			const doc = new jsPDF("p", "pt", "a4");
    			const _fontName = doc.getFont(fontName, "normal", "normal").fontName;
    			doc.close();
    			return _fontName == fontName || ++count > 5;
    		}, 500);
    		count > 5 && (fontScripts[fontName]["status"] = "error");
    		return count <= 5 ? fontName : undefined;
    	}
    	else return undefined;
    }
    
    async function loadFontScript(fontName) {
    	const url = new Request(fontScripts[fontName].url).url;
		const filename = url.split("/").pop();
    	return new Promise(resolve => {
    		try{
    		const oHead = document.getElementsByTagName('HEAD').item(0);
    		const oScript = document.createElement("script");
    		oHead.appendChild(oScript);
    		oScript.type = "text/javascript";
    		oScript.rel = "preload";
    		oScript.as = "script";
    		oScript.onload = () => {
    			fontScripts[fontName]["status"] = "loaded";
    			resolve()
    		}
    		oScript.onerror = (event) => {
    			fontScripts[fontName]["status"] = "error";
    			resolve()
    		}
    		fontScripts[fontName]["status"] = "loading";
    		oScript.src = url;
    		}catch(e){
    			fontScripts[fontName]["status"] = "error";
    			resolve()
    		}
    	})
    }
    
    async function loadFont(fontName) {
    	if (fontScripts[fontName]["status"] == "unloaded") {
    		await loadFontScript(fontName);
    	}
    	await waitCondition(() => fontScripts[fontName]["status"] == "loaded" || fontScripts[fontName]["status"] == "error");
    	return waitAddFont(fontName);
    }
    
    async function loadFonts() {
    	const ps = Object.keys(fontScripts).map(async (fontName) => {
        	if (fontScripts[fontName]["status"] == "unloaded") {
        		window["warn"] && warn(`加载pdf字体${fontName}......`);
        		const _fontName = await loadFont(fontName);
        		if (fontName != _fontName) await (window["msg"] && msg || alert)(`加载pdf字体${fontName}失败\npdf不能正常显示非英文字符`)
        		return _fontName;
        	}
        	else if (fontScripts[fontName]["status"] == "loading") {
        		return await loadFont(fontName)
        	}
        	else if (fontScripts[fontName]["status"] == "error") {
        		await (window["msg"] && msg || alert)(`加载pdf字体${fontName}失败\npdf不能正常显示非英文字符`)
        	}
        	else return fontName;
        })	
        while(ps.length) {
        	await Promise.race(ps);
        	await removeFinallyPromise(ps)
        }
    }
    
    //--------------------------------------------------------------------------------------

    CheckerBoard.prototype.printLinePDF = function({ x1, y1, x2, y2, color, lineWidth }, doc, scale) {
        doc.setLineWidth(~~(lineWidth * scale + 1));
        doc.setDrawColor(color);
        doc.line(~~(x1 * scale + this.pdfOriginPoint.x), ~~(y1 * scale + this.pdfOriginPoint.y), ~~(x2 * scale + this.pdfOriginPoint.x), ~~(y2 * scale + this.pdfOriginPoint.y));
    }
    
    CheckerBoard.prototype.printCirclePDF = function({ x, y, radius, color, lineWidth, fill }, doc, scale) {
        doc.setLineWidth(~~(lineWidth * scale + 1));
        doc.setDrawColor(color);
        doc.setFillColor(fill);
        doc.circle(~~(x * scale + this.pdfOriginPoint.x), ~~(y * scale + this.pdfOriginPoint.y), ~~(radius * scale), lineWidth ? "DF" : "F");
    }
    
    CheckerBoard.prototype.printTextPDF = function({ txt, x, y, color, weight, family, size }, doc, scale) {
        txt = txt.split("").map(char => char == EMOJI_FOUL ? "×" : char).join("")
        doc.setTextColor(color);
        doc.setFont(weight == "900" ? fontName_bold : fontName_normal, "normal", "normal");
        doc.setFontSize(~~(size * scale));
        doc.text(txt, ~~(x * scale + this.pdfOriginPoint.x), ~~(y * scale + this.pdfOriginPoint.y), { baseline: "middle", align: "center" });
    }
    
    CheckerBoard.prototype.printTrianglePDF = function({ points, color }, doc, scale) {
        let x1 = ~~(points[0].x * scale + this.pdfOriginPoint.x),
            y1 = ~~(points[0].y * scale + this.pdfOriginPoint.y),
            x2 = ~~(points[1].x * scale + this.pdfOriginPoint.x),
            y2 = ~~(points[1].y * scale + this.pdfOriginPoint.y),
            x3 = ~~(points[2].x * scale + this.pdfOriginPoint.x),
            y3 = ~~(points[2].y * scale + this.pdfOriginPoint.y);
        doc.setFillColor(color);
        doc.triangle(x1, y1, x2, y2, x3, y3, 'F');
    }
    
    CheckerBoard.prototype.printBoardPointsPDF = function(doc, scale) {
        for (let i = 0; i < 225; i++) {
            if (this.P[i].type != TYPE_EMPTY) {
                let pointInfo = this.getBoardPointInfo(i, this.isShowNum);
                this.printCirclePDF(pointInfo.circle, doc, scale);
                this.printTextPDF(pointInfo.text, doc, scale);
            }
        }
    }
    
    CheckerBoard.prototype.printMarkLinesPDF = function(doc, scale, lines = this.lines) {
        let x1, x2, y1, y2;
        for (let i = 0; i < lines.length; i++) {
            let points = this.getMarkLinePoints(lines[i]);
            x1 = points.line[0].x;
            x2 = points.line[1].x;
            y1 = points.line[0].y;
            y2 = points.line[1].y;
            this.printLinePDF({ x1: x1, y1: y1, x2: x2, y2: y2, color: lines[i].color, lineWidth: ~~this.getMarkLineWidth() }, doc, scale);
        }
    }
    
    CheckerBoard.prototype.printMarkArrowsPDF = function(doc, scale, arrows = this.arrows) {
        let x1, x2, y1, y2;
        for (let i = 0; i < arrows.length; i++) {
            let points = this.getMarkArrowPoints(arrows[i]);
            x1 = points.line[0].x;
            x2 = points.line[1].x;
            y1 = points.line[0].y;
            y2 = points.line[1].y;
            this.printLinePDF({ x1: x1, y1: y1, x2: x2, y2: y2, color: arrows[i].color, lineWidth: ~~this.getMarkLineWidth() }, doc, scale);
            this.printTrianglePDF({ points: points.arrow, color: arrows[i].color }, doc, scale);
        }
    }
    
    CheckerBoard.prototype.printEmptyCBoardPDF = function(doc, scale) {
        let boardLinesInfo = this.getBoardLinesInfo();
        boardLinesInfo.map(lineInfo => this.printLinePDF(lineInfo, doc, scale))
        let starPointsInfo = this.getStarPointsInfo();
        starPointsInfo.map(starPointInfo => this.printCirclePDF(starPointInfo, doc, scale))
        let coordinateTypeInfo = this.getCoordinateInfo();
        coordinateTypeInfo.map(textInfo => this.printTextPDF(textInfo, doc, scale))
    }
    
    CheckerBoard.prototype.refreshCheckerBoardPDF = function(doc, scale) {
        this.printEmptyCBoardPDF(doc, scale);
        this.printMarkLinesPDF(doc, scale);
        this.printBoardPointsPDF(doc, scale);
        this.printMarkArrowsPDF(doc, scale);
    }
    
    // 棋盘保存PDF文件
    CheckerBoard.prototype.saveAsPDF = async function(fontName) {
        if (!("jsPDF" in self) || typeof jsPDF != "function") {
            warn(`${EMOJI_FOUL_THREE}缺少 jsPDF 插件`);
            return;
        }
        const oldTheme = this.theme;
        this.loadTheme(this.defaultTheme);
        hasWideCharacter(this) && (await loadFonts());
        
        //新建文档
        let doc = new jsPDF("p", "pt", "a4"); // 594.3pt*840.51pt
        this.pdfOriginPoint = {
            x: 594 * 0.0252525,
            y: (840 - (594 - 594 * 0.0252525 * 2)) / 2
        };
        let scale = (594 - 594 * 0.0252525 * 2) / this.canvas.width;
        this.refreshCheckerBoardPDF(doc, scale);
        let filename = this.autoFileName();
        doc.save(filename + ".pdf"); //保存文档
        
        this.loadTheme(oldTheme);
    };
})))
