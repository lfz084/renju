(async () => {
	try{
	const respon = await fetch('http://g.onegreen.net/wzq/HTML/168816.html', {
		method: 'GET',
		mode: 'cors',
		cache: 'default'
	});
	console.log(respon.ok)
	console.log(await respon.text(), "input")
	}catch(e){console.error(e.stack)}
})()

fetch('http://g.onegreen.net/wzq/HTML/168836.html').then(r=>r.text()).then(console.log)

http://g.onegreen.net/wzq/HTML/168816.html
http://g.onegreen.net/wzq/HTML/170793.html