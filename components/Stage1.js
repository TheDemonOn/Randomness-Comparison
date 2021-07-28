import React from 'react'
import Head from 'next/head'
import HumanCounter from '../components/HumanCounter'
import Button from '../components/Button'
import ComputerGeneration from '../components/ComputerGeneration'

export default function Stage1({
	humanRandomCount,
	setHumanRandomCount,
	humanGeneration,
	setHumanGeneration,
	computerGeneration,
	nextStage,
	setComputerGeneration,
}) {
	return (
		<>
			<Head>
				<title>Rhyme Test</title>
			</Head>
			<h1>Hullo! Type random numbers!</h1>
			<h6>and only numbers you son of a...</h6>
			<h3>To see how random you are type at least 20 numbers!</h3>
			<h2>{humanGeneration}</h2>
			<h2>{humanRandomCount}</h2>
			<HumanCounter
				humanGeneration={humanGeneration}
				setHumanGeneration={setHumanGeneration}
				humanRandomCount={humanRandomCount}
				setHumanRandomCount={setHumanRandomCount}
			></HumanCounter>
			{/* <h1>{computerGeneration}</h1> */}
			{/* <ComputerGeneration setComputerGeneration={setComputerGeneration}></ComputerGeneration> */}

			<Button humanRandomCount={humanRandomCount} nextStage={nextStage}></Button>
		</>
	)
}
