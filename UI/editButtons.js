'use strict';
function createEditButtons(cBoard) {
    const VIEW = document.createElement("div"),
        IFRAME = document.createElement("div"),
        TITLE = document.createElement("div"),
        CLOSE_BUTTON = document.createElement("img");

    let p = { x: 0, y: 0 },
        settingsKey = "settingsKey",
        pSettings,
        cBdLeft = 0,
        cBdTop = 0,
        pButtonsIdx = [],
        newButtonsIdx = [],
        Positions = [],
        DefaultButtons = [];

    p = { x: cBoard.viewBox.offsetLeft, y: cBoard.viewBox.offsetTop };
    xyObjToPage(p, cBoard.viewBox);
    cBdLeft = p.x;
    cBdTop = p.y;

    let s = VIEW.style;
    s.position = "absolute";
    s.left = p.x + "px";
    s.top = p.y + "px";
    s.width = cBoard.viewBox.style.width;
    s.height = cBoard.viewBox.style.height;
    s.zIndex = 9999;
    //s.background = "green";

    IFRAME.setAttribute("id", "exWindow");
    s = IFRAME.style;
    s.position = "absolute";
    s.left = 0;
    s.top = 0;
    s.width = cBoard.viewBox.style.width;
    s.height = cBoard.viewBox.style.height;
    s.border = `${cBoard.width/260}px solid black`;
    s.background = "white";
    VIEW.appendChild(IFRAME);

    s = TITLE.style;
    s.color = "black";
    s.background = "white";
    s.left = "0px";
    s.top = "0px";
    s.width = "100%";
    s.textAlign = "center";
    s.fontSize = ~~(cBoard.width / 25) + "px";
    s.lineHeight = ~~(cBoard.width / 10) + "px";
    IFRAME.appendChild(TITLE);
    TITLE.innerHTML = "点击添加按键";

    CLOSE_BUTTON.src = "./pic/close.svg";
    CLOSE_BUTTON.oncontextmenu = (event) => {
        event.preventDefault();
    };
    setButtonClick(CLOSE_BUTTON, close);
    s = CLOSE_BUTTON.style;
    let sz = cBoard.width / 10 + "px";
    s.position = "absolute";
    s.left = cBoard.width - parseInt(sz) + "px";
    s.top = "0px";
    s.width = sz;
    s.height = sz;
    s.opacity = "0.5";
    s.backgroundColor = "#c0c0c0";
    VIEW.appendChild(CLOSE_BUTTON);

    let divs = [];
    for (let i = 0; i < 50; i++) {
        divs[i] = document.createElement("div");
    }

    function close() {
        VIEW.setAttribute("class", "hideEXWindow");
        VIEW.parentNode && setTimeout(() => VIEW.parentNode.removeChild(VIEW), 350);
        msgbox("是否保存更改?", "保存", undefined, "取消", undefined)
            .then(function({ butCode }) {
                if (butCode == window.MSG_ENTER) { // save change
                    pButtonsIdx.length = 0;
                    for (let i = 0; i < newButtonsIdx.length; i++) {
                        pButtonsIdx[i] = newButtonsIdx[i];
                    }
                }
                saveCmdSettings(settingsKey, pSettings);
                loadCmdSettings(settingsKey, pSettings);
                //showButtons(pButtonsIdx, Positions, DefaultButtons);
            })
            .then(function() {
                let checkSettingButton = false
                for (let i = 0; i < pButtonsIdx.length; i++) {
                    if (DefaultButtons[pButtonsIdx[i]] == cShownumTop) {
                        checkSettingButton = true;
                        break;
                    }
                }!checkSettingButton && msgbox("你隐藏了设置按钮，还能长按棋盘弹出设置");
            })
    }

    function showDiv(left, top, div, but) {
        let divStyle = div.style,
            buttonStyle = but.button.style,
            buttonDivStyle = but.div.style;
        divStyle.position = buttonStyle.position;
        divStyle.padding = buttonStyle.padding;
        divStyle.zIndex = buttonStyle.zIndex;
        divStyle.margin = buttonStyle.margin;
        divStyle.borderRadius = buttonStyle.borderRadius;
        divStyle.outline = buttonStyle.outline;
        divStyle.textAlign = buttonStyle.textAlign;
        divStyle.lineHeight = buttonStyle.lineHeight;
        divStyle.backgroundColor = buttonStyle.backgroundColor;
        divStyle.fontSize = buttonStyle.fontSize;
        divStyle.color = buttonStyle.color;
        divStyle.opacity = buttonStyle.opacity;

        divStyle.top = top + "px";
        divStyle.left = left + "px";
        divStyle.width = buttonDivStyle.width;
        divStyle.height = buttonDivStyle.height;
        divStyle.borderStyle = buttonDivStyle.borderStyle;
        divStyle.borderWidth = buttonDivStyle.borderWidth;
        divStyle.borderColor = buttonDivStyle.borderColor;

        div.innerHTML = but.text;
        //log(`${divStyle.left}, ${divStyle.top}`)
        IFRAME.appendChild(div);
    }

    function hideDiv(div) {
        div.parentNode && div.parentNode.removeChild(div);
    }

    function hideAllDiv() {
        for (let i = 0; i < divs.length; i++) {
            hideDiv(divs[i]);
        }
    }

    function showButton(position, button) {
        button.move(position.left, position.top);
    }

    function hideAllButton(buttons) {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].hide();
        }
    }

    return function(p, key, settings) {
        let positions = settings.positions,
            defaultButtons = settings.defaultButtons,
            buttonsIdx = settings.ButtonsIdx[settings.idx];
        let paddingLeft = p.x - cBdLeft,
            paddingTop = ~~(CLOSE_BUTTON.offsetTop + parseInt(CLOSE_BUTTON.style.height) * 1.5);
        settingsKey = key;
        pSettings = settings;
        pButtonsIdx = buttonsIdx;
        newButtonsIdx = [];
        Positions = positions;
        DefaultButtons = defaultButtons;
        hideAllButton(defaultButtons);
        hideAllDiv();
        VIEW.setAttribute("class", "showEXWindow");
        document.body.appendChild(VIEW);
        for (let i = 0; i < defaultButtons.length; i++) {
            let left = paddingLeft + parseInt(positions[i].left),
                top = paddingTop + ~~(i / 4) * parseInt(defaultButtons[i].height) * 1.5;
            showDiv(left, top, divs[i], defaultButtons[i]);
            setButtonClick(divs[i], function() {
                hideDiv(divs[i]);
                showButton(positions[newButtonsIdx.length], defaultButtons[i]);
                newButtonsIdx.push(i);
            });
        }
    }
}
