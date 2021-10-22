import React, { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import Button from './Button'

export default function Stage4({ generationControl, sideTrackChoice, backStage, stopGeneration }) {
	// Search for the sideTrackChoice[1] and create 3 different elements: before, streak, after
	console.log(sideTrackChoice)
	let raw = sideTrackChoice[0].map((x) => x.toString()).reduce((x, y) => x + y)
	let searchTerm = sideTrackChoice[1].map((x) => x.toString()).reduce((x, y) => x + y)

	let index = raw.indexOf(searchTerm)
	let term = raw.slice(index, index + searchTerm.length)
	let before = raw.slice(0, index)
	let after = raw.slice(index + searchTerm.length)
	console.log(generationControl)
	stopGeneration()
	console.log(generationControl)
	console.log('Hopefully it will be stopped')

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
						<b>{term}</b>
						{after}
					</p>
				</div>
				<Button stageControl={backStage} text={'Back'}></Button>
			</div>
		</>
	)
}
