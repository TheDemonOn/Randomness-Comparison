import React, { useState, useEffect } from 'react'
import InputSanitizing from './InputSanitizing'

function HumanCounter({
	humanGeneration,
	setHumanGeneration,
	humanRandomCount,
	setHumanRandomCount,
	deleteHuman,
}) {
	const updateHumanCount = (value) => {
		console.log(value)
		let numValue = parseInt(value, 10)
		if (Number.isInteger(numValue)) {
			setHumanGeneration((prev) => prev + value)
			console.log(humanGeneration)
			setHumanRandomCount((prev) => prev + 1)
			document.getElementById('humanInput').value = ''
		}
	}

	const deleteCheck = (e) => {
		if (e.key === 'Backspace') {
			setHumanGeneration(humanGeneration.slice(0, humanGeneration.length - 1))
			if (humanRandomCount > 0) {
				setHumanRandomCount((prev) => prev - 1)
			}
		}
	}

	useEffect(() => {
		document.getElementById('humanInput').addEventListener('keydown', InputSanitizing)
	}, [])

	return (
		<>
			<input
				type="text"
				maxLength="2"
				id="humanInput"
				onKeyDown={(e) => deleteCheck(e)}
				onChange={(e) => updateHumanCount(e.target.value)}
			></input>
		</>
	)
}

export default HumanCounter

// Use rf to shortcut components
