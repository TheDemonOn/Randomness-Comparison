export default function ZeroOne({ input }) {
	if (input.length >= 33) {
		let string = input.slice(0, 34)
		return <p>{string}...</p>
	} else {
		return <p>{input}</p>
	}
}
