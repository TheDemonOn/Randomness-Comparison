import React, { useState, useEffect } from 'react'
import InputSanitizing from './InputSanitizing'

function HumanCount() {
	const [humanGeneration, setHumanGeneration] = useState([])
	const [humanRandomCount, setHumanRandomCount] = useState(0)

	const updateHumanCount = (value) => {
		let numValue = parseInt(value, 10)
		if (Number.isInteger(numValue)) {
			humanGeneration.push(value)
			setHumanRandomCount((prev) => prev + 1)
			document.getElementById('humanInput').value = ''
		}
	}
	useEffect(() => {
		document.getElementById('humanInput').addEventListener('keydown', InputSanitizing)
	}, [])

	return (
		<div>
			<h1>{humanGeneration}</h1>
			<h2>{humanRandomCount}</h2>
			<input
				type="text"
				maxLength="2"
				id="humanInput"
				onChange={(e) => updateHumanCount(e.target.value)}
			></input>
		</div>
	)
}

export default HumanCount

// Use rf to shortcut components
