import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import ComputerGeneration from '../components/ComputerGeneration'
import HumanCounter from '../components/HumanCounter'
// import HumanCount from '../components/HumanCount'
import Button from '../components/Button'

export default function Home() {
	const [humanGeneration] = useState([])
	const [humanRandomCount, setHumanRandomCount] = useState(0)
	const [computerGeneration, setComputerGeneration] = useState([])

	return (
		<div>
			<Head>
				<title>Rhyme Test</title>
			</Head>
			<h1>Hullo! Type random numbers!</h1>
			<h6>and only numbers you son of a...</h6>
			<h3>Go ahead and type at least 30, more if you want.</h3>
			<HumanCounter
				humanGeneration={humanGeneration}
				humanRandomCount={humanRandomCount}
				setHumanRandomCount={setHumanRandomCount}
			></HumanCounter>
			{/* <ComputerGeneration
				setComputerGeneration={setComputerGeneration}
				humanRandomCount={humanRandomCount}
			></ComputerGeneration> */}
			<h1>{computerGeneration}</h1>

			<Button humanRandomCount={humanRandomCount}></Button>
		</div>
	)
}
