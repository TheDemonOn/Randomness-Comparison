import React, { useState, useEffect } from 'react'

// ComputerGeneration takes in the function to send state to the parent and how many user nums were generated

function ComputerGeneration({ setComputerGeneration, humanRandomCount = 30 }) {
	const params = {
		jsonrpc: '2.0',
		method: 'generateIntegers',
		params: {
			apiKey: '968fe2bd-3631-45d9-aad2-df49e585b679',
			n: 30,
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

	let computerData = ''

	// This works with the API
	useEffect(() => {
		fetch('https://api.random.org/json-rpc/4/invoke', options)
			.then((response) => response.json())
			.then((data) => {
				data.result.random.data.forEach((e) => {
					// This turns each number from the returned array into one string
					computerData += `${e}`
				})
				setComputerGeneration(computerData)
			})
	}, [])

	return <></>
}

export default ComputerGeneration
