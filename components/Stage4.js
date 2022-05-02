import React, { useEffect } from 'react'
import Head from 'next/head'
import Button from './Button'

export default function Stage4({ sideTrackChoice, backStage, stopGeneration }) {
	// Search for the sideTrackChoice[1] and create 3 different elements: before, streak, after
	let raw = sideTrackChoice[0].map((x) => x.toString()).reduce((x, y) => x + y)
	let searchTerm = sideTrackChoice[1].map((x) => x.toString()).reduce((x, y) => x + y)

	let index = raw.indexOf(searchTerm)
	let term = raw.slice(index, index + searchTerm.length)
	let before = raw.slice(0, index)
	let after = raw.slice(index + searchTerm.length)
	stopGeneration()

	useEffect(() => {
		document.getElementById('focus').scrollIntoView({
			behavior: 'auto',
			block: 'center',
			inline: 'center',
		})
	}, [])

	return (
		<>
			<Head>
				<title>Visualization</title>
			</Head>

			<div className="sideTrack">
				<Button stageControl={backStage} text={'Back'}></Button>
				<div>
					<p>
						{before}
						<b id="focus" className="highlighted">
							{term}
						</b>
						{after}
					</p>
				</div>
				<Button stageControl={backStage} text={'Back'}></Button>
			</div>
		</>
	)
}
