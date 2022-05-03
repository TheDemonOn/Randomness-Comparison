import React, { useState } from 'react'
import ComputerGeneration from '../components/ComputerGeneration'
import Stage1 from '../components/Stage1'
import Stage2 from '../components/Stage2'
import Stage3 from '../components/Stage3'
import Stage4 from '../components/Stage4'
import { RandomContext } from '../context/RandomContext'
import { ConsistentResult } from '../context/ConsistentResult'
import Loading from '../components/Loading'

export default function Home({ hiddenKey = null }) {
	// Human numbers
	const [humanGeneration, setHumanGeneration] = useState([])
	// How many numbers were given
	let [humanRandomCount, setHumanRandomCount] = useState(0)

	const [computerGeneration, setComputerGeneration] = useState('123')
	const [computerGenerationLarge, setComputerGenerationLarge] = useState('123')
	const large = 1
	const [largeCount, setLargeCount] = useState(10000)

	const [stage, setStage] = useState(1)
	const nextStage = () => {
		setStage((prev) => prev + 1)
	}
	const backStage = () => {
		setStage((prev) => prev - 1)
	}

	const [sideTrackChoice, setSideTrackChoice] = useState(0)

	// This will determine which data set to use
	const [generationControl, setGenerationControl] = useState(1)
	const stopGeneration = () => {
		setGenerationControl(0)
	}
	const continueGeneration = () => {
		setGenerationControl(1)
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
		// Set for new generation to be available
		continueGeneration()
	}

	const [previousPseudo, setPreviousPseudo] = useState([0])

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
						hiddenKey={hiddenKey}
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
				// This context [0] prevents new data being fetched while we are sidestepping, [1] is psuedoLarge
				<ConsistentResult.Provider value={[generationControl, previousPseudo]}>
					<ComputerGeneration
						setComputerGenerationLarge={setComputerGenerationLarge}
						large={large}
						largeCount={largeCount}
						consistent={1}
						hiddenKey={hiddenKey}
					></ComputerGeneration>
					<RandomContext.Provider value={[computerGeneration, computerGenerationLarge]}>
						<Stage3
							largeCount={largeCount}
							reroll={reroll}
							setLargeCount={setLargeCount}
							nextStage={nextStage}
							setSideTrackChoice={setSideTrackChoice}
							setPreviousPseudo={setPreviousPseudo}
						></Stage3>
					</RandomContext.Provider>
				</ConsistentResult.Provider>
			)
		case 4:
			return (
				<RandomContext.Provider value={[computerGeneration, computerGenerationLarge]}>
					<Stage4
						generationControl={generationControl}
						sideTrackChoice={sideTrackChoice}
						backStage={backStage}
						stopGeneration={stopGeneration}
					></Stage4>
				</RandomContext.Provider>
			)
		default:
			return <Loading />
	}
}

export async function getStaticProps() {
	const KEY = process.env.DB_KEY
	return {
		props: {
			hiddenKey: KEY,
		},
	}
}
