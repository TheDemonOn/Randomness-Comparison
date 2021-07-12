import React, { useState, useEffect } from 'react'

function ComputerGeneration() {
	const [apiThing, setApiThing] = useState()

	const params = {
		jsonrpc: '2.0',
		method: 'generateIntegers',
		params: {
			apiKey: '968fe2bd-3631-45d9-aad2-df49e585b679',
			n: 50,
			min: 1,
			max: 6,
		},
		id: 1,
	}

	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(params),
	}

	// This works with the API
	// useEffect(() => {
	// 	const request = fetch('https://api.random.org/json-rpc/4/invoke', options)
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			console.log('Success:', data)
	// 		})
	// }, [])

	// useEffect(() => {
	// 	console.log(apiThing)
	// }, [apiThing])

	return <div></div>
}

export default ComputerGeneration
