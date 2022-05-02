import React, { useState, useEffect } from 'react'
import InputSanitizing from './InputSanitizing'

function HumanCounter({
	humanGeneration,
	setHumanGeneration,
	humanRandomCount,
	setHumanRandomCount,
	deleteHuman,
	nextStage,
}) {
	// Don't Allow Submit unless humanRandomCount > 0

	const updateHumanCount = (value) => {
		let numValue = parseInt(value, 10)
		if (Number.isInteger(numValue)) {
			setHumanGeneration((prev) => prev + value)
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

	const EnterCheck = (e) => {
		if (e.key === 'Enter') {
			if (humanRandomCount > 0) {
				nextStage()
			}
		}
	}

	const [placeHolder, setPlaceHolder] = useState()

	useEffect(() => {
		if (window.innerWidth <= 500) {
			setPlaceHolder('Type some ones and zeroes randomly!')
		} else {
			setPlaceHolder('See how random you are, type at least 10 ones and zeroes here.')
		}

		const updateWindowDimensions = () => {
			if (window.innerWidth <= 500) {
				setPlaceHolder('Type some ones and zeroes randomly!')
			} else {
				setPlaceHolder('See how random you are, type at least 10 ones and zeroes here.')
			}
		}

		window.addEventListener('resize', updateWindowDimensions)

		return () => window.removeEventListener('resize', updateWindowDimensions)
	}, [])

	return (
		<>
			<input
				maxLength="2"
				id="humanInput"
				className="stage1Input"
				placeholder={placeHolder}
				onKeyDown={(e) => {
					InputSanitizing(e)
					deleteCheck(e)
					EnterCheck(e)
				}}
				onChange={(e) => updateHumanCount(e.target.value)}
			></input>
		</>
	)
}

export default HumanCounter
