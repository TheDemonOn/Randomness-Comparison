function InputSanitizing(e) {
	let numValue = parseInt(e.key, 10)
	if (Number.isInteger(numValue) && (numValue === 0 || numValue === 1)) {
		return true
	} else {
		return e.preventDefault()
	}
}

export default InputSanitizing
