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
			// humanGeneration = humanGeneration + value
			console.log(humanGeneration)
			setHumanRandomCount((prev) => prev + 1)
			document.getElementById('humanInput').value = ''
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
				onChange={(e) => updateHumanCount(e.target.value)}
			></input>
			{/* <HumanCount humanGeneration={humanGeneration}></HumanCount> */}
		</>
	)
}

export default HumanCounter

// Use rf to shortcut components
