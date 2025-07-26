window.hiddenFeatures = (function() {
	const radix = 36;
	const time = Date.now();
	
	function checkValue(num) {
		let count = 0;
		for (let i = 0; i < 31; i++) {
			((1 << i) & num) && count++
		}
		return count == 1;
	}
	
	function getValue(evalStr) {
		const num = parseInt(evalStr, radix) - time;
		const value = ~num & 0x7FFFFFFF;
		return value;
	}
	
	function setValue(value) {
		const aValue = localStorage.getItem("egg") * 1 || 0;
		localStorage.setItem("egg", aValue | value);
		alert(`${(localStorage.getItem("egg") * 1).toString(2)}`)
	}
	
	function eval(str, value) {
		const _time = parseInt(str, radix);
		const num = ~value & 0x7FFFFFFF;
		return (_time + num).toString(radix);
	}
	
	function setkey() {
		const inputStr = window.top.prompt("", time.toString(radix))
		const value = getValue(inputStr.replace(/\s/g, ""));
		console.log(`value = 0b${value.toString(2)}`)
		if (checkValue(value)) {
			setValue(value)
		}
	}

	return {
		setkey,
		eval
	}
})()