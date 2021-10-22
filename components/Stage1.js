import React from 'react'
import Head from 'next/head'
import HumanCounter from '../components/HumanCounter'
import Button from '../components/Button'

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
				<title>How random are you?</title>
			</Head>
			<h1>Hullo! Type random Zeros and Ones!</h1>
			<h6>and only numbers you son of a...</h6>
			<h3>To see how random you are type at least twenty ones and zeros!</h3>
			<h2>{humanGeneration}</h2>
			<h2>{humanRandomCount}</h2>
			<HumanCounter
				humanGeneration={humanGeneration}
				setHumanGeneration={setHumanGeneration}
				humanRandomCount={humanRandomCount}
				setHumanRandomCount={setHumanRandomCount}
				nextStage={nextStage}
			></HumanCounter>

			<Button
				humanRandomCount={humanRandomCount}
				stageControl={nextStage}
				text={'Continue'}
			></Button>
		</>
	)
}
