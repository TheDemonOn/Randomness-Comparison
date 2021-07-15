import React, { useEffect, useState } from 'react'
import Stage1 from '../components/Stage1'

export default function Home() {
	const [humanGeneration, setHumanGeneration] = useState('')
	const [humanRandomCount, setHumanRandomCount] = useState(0)
	const [computerGeneration, setComputerGeneration] = useState([])

	const [stage, setStage] = useState(1)

	switch (stage) {
		case 1:
			return (
				<Stage1
					humanRandomCount={humanRandomCount}
					setHumanRandomCount={setHumanRandomCount}
					humanGeneration={humanGeneration}
					setHumanGeneration={setHumanGeneration}
					computerGeneration={computerGeneration}
				></Stage1>
			)
	}

	return <></>
}
