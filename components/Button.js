import React from 'react'

export default function Button({ humanRandomCount, stageControl, text }) {
	if (Number.isInteger(humanRandomCount)) {
		return humanRandomCount <= 9 ? <></> : <button onClick={stageControl}>{text}</button>
	} else {
		return <button onClick={stageControl}>{text}</button>
	}
}
