import React, { useEffect, useState, createContext } from 'react'
import ComputerGeneration from '../components/ComputerGeneration'
import Stage1 from '../components/Stage1'
import Stage2 from '../components/Stage2'
import { RandomContext } from '../components/RandomContext'

export default function Home() {
	// Human numbers
	const [humanGeneration, setHumanGeneration] = useState([])
	// How many numbers were given
	const [humanRandomCount, setHumanRandomCount] = useState(0)

	const [computerGeneration, setComputerGeneration] = useState('123')

	const [stage, setStage] = useState(1)
	const nextStage = () => {
		setStage((prev) => prev + 1)
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
				<RandomContext.Provider value={computerGeneration}>
					<ComputerGeneration
						setComputerGeneration={setComputerGeneration}
						humanRandomCount={humanRandomCount}
					></ComputerGeneration>
					<Stage2 humanGeneration={humanGeneration} humanRandomCount={humanRandomCount}></Stage2>
				</RandomContext.Provider>
			)
	}

	return <></>
}
