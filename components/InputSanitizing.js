function InputSanitizing(e) {
	let numValue = parseInt(e.key, 10)
	if (Number.isInteger(numValue)) {
		return true
	} else {
		return e.preventDefault()
	}
}

export default InputSanitizing
