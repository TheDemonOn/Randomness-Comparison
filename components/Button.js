import React from 'react'

export default function Button({ humanRandomCount }) {
	return humanRandomCount < 20 ? <></> : <button></button>
}
