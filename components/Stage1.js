import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import HumanCounter from '../components/HumanCounter'
import Button from '../components/Button'
import styles from '../styles/Stage1.module.css'

export default function Stage1({
	humanRandomCount,
	setHumanRandomCount,
	humanGeneration,
	setHumanGeneration,
	nextStage,
}) {
	const [hiddenText, setHiddenText] = useState()
	useEffect(() => {
		if (humanRandomCount > 0) {
			setHiddenText(
				<div>
					<span>
						You have typed <h3 className={styles.positioning2}>{humanRandomCount}</h3> ones and
						zeroes.
					</span>
				</div>
			)
		}
	}, [humanRandomCount])

	return (
		<>
			<Head>
				<title>How random are you?</title>
			</Head>
			<main className={styles.main}>
				<div className={styles.stage1}>
					<h1>Random Test</h1>
					<h2 className={styles.spacing1}>Hello! Type random ones and zeroes!</h2>
					<HumanCounter
						humanGeneration={humanGeneration}
						setHumanGeneration={setHumanGeneration}
						humanRandomCount={humanRandomCount}
						setHumanRandomCount={setHumanRandomCount}
						nextStage={nextStage}
					></HumanCounter>
					<div className={styles.noCumulativeLayoutShift}>
						{hiddenText}
						<Button
							humanRandomCount={humanRandomCount}
							stageControl={nextStage}
							text={'Calculate'}
						></Button>
					</div>
				</div>
			</main>
		</>
	)
}
