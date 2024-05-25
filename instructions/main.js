//------------------- load -------------------------

mainUI.loadTheme().then(()=>mainUI.viewport.resize()).then(() => {
	const home = document.createElement("div");
	document.body.appendChild(home);
	home.innerHTML = "返回首页";
	Object.assign(home.style, {
		position: "fixed",
		left: "50%",
		top: "38%",
		transform: "translate(-50%,-50%)",
		fontSize: "38px",
		padding: "5px 15px 5px 15px",
		border: `2px solid ${document.body.style.color}`,
		borderRadius: "25px"
	})
	home.addEventListener("click", () => window.open("index.html", "_self"));
	/*setTimeout 保证 iframe.document 下的CSSStyleSheet能正常工作*/
	setTimeout(()=>window.open("./help/renjuhelp/instructions.html", "helpWindow"),300)
})