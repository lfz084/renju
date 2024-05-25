try {
	let loadTheme = function() {
		const defaultThemes = {
			"light": {
				"body": {
					"color": "#333333",
					"backgroundColor": "white"
				}
			},
			"grey": {
				"body": {
					"color": "#333333",
					"backgroundColor": "white"
				}
			},
			"green": {
				"body": {
					"color": "#333333",
					"backgroundColor": "#118800"
				}
			},
			"dark": {
				"body": {
					"color": "#d0d0d0",
					"backgroundColor": "#333333"
				}
			}
		}
		const themeKey = localStorage.getItem("theme") || "light";
		let themes;
		try{
			themes = JSON.parse(localStorage.getItem("themes"));
			if (!themes[themeKey]) throw new Error("themes error");
		}
		catch(e){
			themes = defaultThemes;
		}
		themes && themes[themeKey] && themes[themeKey]["body"] && Object.assign(document.body.style, themes[themeKey]["body"]);
	}

	loadTheme();
	
	/** iphone safari gitee链接，图标不兼容， 改为 GitHub 链接*/
	if (navigator.userAgent.indexOf("iPhone") + 1) {
		const links = document.getElementsByTagName("link");
		for (let i = 0; i < links.length; i++) {
			const link = links[i];
			const url = link.href.replace(/^https\:\/\/lfz084\.gitee\.io\/renju\-beta\/|^https\:\/\/lfz084\.gitee\.io\/renju\//, "https://lfz084.github.io/");
			if (/\.png$|\.ico$/.test(url)) {
				link.href = url;
			}
			console.info(link.href)
		}
	}

} catch (e) { console.error(e.stack) }