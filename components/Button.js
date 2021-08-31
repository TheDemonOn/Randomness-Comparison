import React from 'react'

export default function Button({ humanRandomCount, nextStage, text }) {
	if (Number.isInteger(humanRandomCount)) {
		return humanRandomCount < 20 ? <></> : <button onClick={nextStage}>{text}</button>
	} else {
		return <button onClick={nextStage}>{text}</button>
	}
}
