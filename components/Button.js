import React from 'react'

export default function Button({ humanRandomCount, nextStage }) {
	if (humanRandomCount) {
		return humanRandomCount < 20 ? <></> : <button onClick={nextStage}></button>
	} else {
		return <button onClick={nextStage}></button>
	}
}
