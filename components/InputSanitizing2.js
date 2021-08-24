export default function InputSanitizing2(e) {
	let numValue = parseInt(e.key, 10)
	if (Number.isInteger(numValue)) {
		return true
	} else if (
		e.key === 'Backspace' ||
		e.key === 'Delete' ||
		e.key === 'ArrowLeft' ||
		e.key === 'ArrowRight'
	) {
		return true
	} else {
		return e.preventDefault()
	}
}
