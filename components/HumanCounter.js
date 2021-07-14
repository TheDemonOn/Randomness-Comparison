import React, { useState, useEffect, useContext, createContext } from 'react'
import InputSanitizing from './InputSanitizing'
// import HumanCount from './HumanCount'

function HumanCounter({ humanGeneration, humanRandomCount, setHumanRandomCount }) {
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
			{/* <HumanCount humanGeneration={humanGeneration}></HumanCount> */}
		</div>
	)
}

export default HumanCounter

// Use rf to shortcut components
