import React, { useContext, useEffect, useState } from 'react'
import Head from 'next/head'

export default function Stage4({ generationControl, sideTrackChoice }) {
	// Search for the sideTrackChoice[1] and create 3 different elements: before, streak, after

	let raw = sideTrackChoice[0].map((x) => x.toString()).reduce((x, y) => x + y)
	let searchTerm = sideTrackChoice[1].map((x) => x.toString()).reduce((x, y) => x + y)

	let index = raw.indexOf(searchTerm)
	// console.log(sideTrackChoice[0], sideTrackChoice[1])
	// console.log(index)
	let term = raw.slice(index, index + searchTerm.length)
	let before = raw.slice(0, index)
	let after = raw.slice(index + searchTerm.length)
	// console.log(term)

	return (
		<>
			<Head>
				<title>Visualization</title>
			</Head>

			<div className="sideTrack">
				<div>
					<p>
						{before}
						<b>{term}</b>
						{after}
					</p>
				</div>
			</div>
		</>
	)
}
