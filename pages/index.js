import React, { useEffect, useState, createContext } from 'react'
import Head from 'next/head'
import ComputerGeneration from '../components/ComputerGeneration'
import Stage1 from '../components/Stage1'
import Stage2 from '../components/Stage2'
import { RandomContext } from '../components/RandomContext'
import Stage3 from '../components/Stage3'

export default function Home() {
	// Human numbers
	const [humanGeneration, setHumanGeneration] = useState([])
	// How many numbers were given
	const [humanRandomCount, setHumanRandomCount] = useState(0)

	const [computerGeneration, setComputerGeneration] = useState('123')
	const [computerGenerationLarge, setComputerGenerationLarge] = useState('123')
	const large = 1
	const [largeCount, setLargeCount] = useState(10000)

	const [stage, setStage] = useState(1)
	const nextStage = () => {
		setStage((prev) => prev + 1)
	}
	const reroll = () => {
		// This refreshes the component and makes it retrieve new data
		let currentStage = stage
		setStage((prev) => prev + 9999)
		setComputerGeneration('123')
		setComputerGenerationLarge('123')
		setTimeout(() => {
			setStage(currentStage)
		}, 1)
	}

	switch (stage) {
		case 1:
			return (
				<Stage1
					humanRandomCount={humanRandomCount}
					setHumanRandomCount={setHumanRandomCount}
					humanGeneration={humanGeneration}
					setHumanGeneration={setHumanGeneration}
					computerGeneration={computerGeneration}
					nextStage={nextStage}
				></Stage1>
			)
		case 2:
			return (
				<RandomContext.Provider value={[computerGeneration, computerGenerationLarge]}>
					<ComputerGeneration
						setComputerGeneration={setComputerGeneration}
						humanRandomCount={humanRandomCount}
					></ComputerGeneration>
					<Stage2
						humanGeneration={humanGeneration}
						setLargeCount={setLargeCount}
						nextStage={nextStage}
					></Stage2>
				</RandomContext.Provider>
			)
		case 3:
			return (
				<>
					<ComputerGeneration
						setComputerGenerationLarge={setComputerGenerationLarge}
						large={large}
						largeCount={largeCount}
					></ComputerGeneration>
					<RandomContext.Provider value={[computerGeneration, computerGenerationLarge]}>
						<Stage3 largeCount={largeCount} reroll={reroll} setLargeCount={setLargeCount}></Stage3>
					</RandomContext.Provider>
				</>
			)
		default:
			return (
				<>
					<Head>
						<title>Loading...</title>
					</Head>
					<h1>Computing numbers...</h1>
				</>
			)
	}

	return <></>
}
