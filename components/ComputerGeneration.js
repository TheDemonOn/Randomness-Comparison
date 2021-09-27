import React, { useContext, useEffect } from 'react'
import { ConsistentResult } from '../context/ConsistentResult'

// ComputerGeneration takes in the function to send state to the parent and how many user nums were generated

function ComputerGeneration({
	setComputerGeneration,
	setComputerGenerationLarge,
	humanRandomCount = 100,
	large,
	largeCount = 10000,
	consistent = 0,
}) {
	let params = {
		jsonrpc: '2.0',
		method: 'generateIntegers',
		params: {
			apiKey: '968fe2bd-3631-45d9-aad2-df49e585b679',
			n: humanRandomCount,
			min: 0,
			max: 1,
		},
		id: 1,
	}

	if (large) {
		params = {
			jsonrpc: '2.0',
			method: 'generateIntegers',
			params: {
				apiKey: '968fe2bd-3631-45d9-aad2-df49e585b679',
				n: largeCount,
				min: 0,
				max: 1,
			},
			id: 1,
		}
	}

	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(params),
	}

	let consistencySwitch

	if (consistent === 1) {
		consistencySwitch = useContext(ConsistentResult)
	}

	// This works with the API
	useEffect(() => {
		if (consistent === 1) {
			console.log(consistencySwitch[0])
			// An adittional check to know if we might have to prevent requests
			if (consistencySwitch[0]) {
				fetch('https://api.random.org/json-rpc/4/invoke', options)
					.then((response) => response.json())
					.then((data) => {
						if (large) {
							setComputerGenerationLarge(data.result.random.data)
						} else {
							setComputerGeneration(data.result.random.data)
						}
					})
			}
		} else {
			fetch('https://api.random.org/json-rpc/4/invoke', options)
				.then((response) => response.json())
				.then((data) => {
					if (large) {
						setComputerGenerationLarge(data.result.random.data)
					} else {
						setComputerGeneration(data.result.random.data)
					}
				})
		}
	}, [])

	return <></>
}

export default ComputerGeneration
