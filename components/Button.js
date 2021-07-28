import React from 'react'

export default function Button({ humanRandomCount, nextStage }) {
	return humanRandomCount < 20 ? <></> : <button onClick={nextStage}></button>
}
