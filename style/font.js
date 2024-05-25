// javaScript load fonts

const fonts = [{
            family: "Roboto",
            url: "style/font/NotoSans-Medium.subset.ttf",
            descriptors: { weight: "normal" }
        }, {
            family: "Roboto",
            url: "style/font/NotoSans-Bold.subset.ttf",
            descriptors: { weight: "bold" }
        }, {
            family: "Roboto",
            url: "style/font/NotoSans-Black.subset.ttf",
            descriptors: { weight: "900" }
        }, {
        	family: "mHeiTi",
        	url: "style/font/NotoSansSC-Medium.subset.ttf",
        	descriptors: { weight: "normal" }
        }, {
        	family: "mHeiTi",
        	url: "style/font/NotoSansSC-Bold.subset.ttf",
        	descriptors: { weight: "bold" }
        }, {
        	family: "mHeiTi",
        	url: "style/font/NotoSansSC-Black.subset.ttf",
        	descriptors: { weight: "900" }
        },{
            family: "emjFont",
            url:  "style/font/SourceHanSansCN-Medium.subset.ttf",
            descriptors: { weight: "normal" }
        }, {
            family: "emjFont",
            url: "style/font/SourceHanSansCN-Bold.subset.ttf",
            descriptors: { weight: "bold" }
        }, {
            family: "emjFont",
            url: "style/font/SourceHanSansCN-Heavy.subset.ttf",
            descriptors: { weight: "900" }
    }];
    
    async function loadFont({family, url, descriptors}) {
        const font = new FontFace(family, `url(${url})`, descriptors);
        // wait for font to be loaded
        await font.load();
        // add font to document
        document.fonts.add(font);
        // enable font with CSS class
        document.body.classList.add("fonts-loaded");
    }
    
    async function getDocumentFont(font) {
        const fontFaces = [... await document.fonts.ready];
        for(let i = fontFaces.length-1; i >= 0; i--) {
            const fontFace = fontFaces[i];
            if (font.family == fontFace.family && font.descriptors.weight == fontFace.weight) {
                log(`family: ${fontFace.family}\n weight:${fontFace.weight}\n status: ${fontFace.status}`)
                return fontFace;
            }
        }
        return null;
    }
    
    async function loadFonts() {
        let count = 0;
        while(count++ < 50 && fonts.length) {
            const font = fonts.shift();
            const fontFace = await getDocumentFont(font);
            if (fontFace) {
                log(`>>> family: ${fontFace.family}\n weight:${fontFace.weight}\n status: ${fontFace.status}`)
            }
            else {
                log(`loadFont: \n family: ${font.family}\n weight:${font.weight}\n url: ${font.url}`)
                await loadFont(font);
            }
        }
    }
