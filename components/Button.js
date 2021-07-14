import React from 'react'

export default function Button({ humanRandomCount }) {
	return humanRandomCount < 30 ? <div></div> : <button></button>
}
