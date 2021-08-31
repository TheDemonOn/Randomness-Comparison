import React, { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { Bar } from 'react-chartjs-2'
import { RandomContext } from './RandomContext'
import Button from './Button'
import InputSanitizing2 from './InputSanitizing2'

export default function Stage3({ largeCount, reroll, setLargeCount }) {
	console.log(useContext(RandomContext)[1])

	let loadSwitch = 1

	let trueRandomCount = [0, 0]
	let pseudoRandomCount = [0, 0]

	let computerLargeStreakData = [0]
	let pseudoLargeData = []
	let pseudoLargeStreakData = [0]

	let dynamicLabelsLarge = [-99]

	let computerLargeVisual = []
	let pseudoLargeVisual = []

	if (useContext(RandomContext)[1] === '123') {
		// wait
	} else {
		// True Random Large
		let computerLargeDataRaw = useContext(RandomContext)[1]

		computerLargeDataRaw.forEach((e) => {
			switch (e) {
				case 0:
					trueRandomCount[0] = trueRandomCount[0] + 1
					break
				case 1:
					trueRandomCount[1] = trueRandomCount[1] + 1
					break
			}
		})
		let computerLargeStreak = 0
		// ComputerLargeStreak is the index position not the count, so the actual count is 1 more
		let computerLargeStreakVisual = [0, 0]
		for (let i = 1; i <= computerLargeDataRaw.length; i++) {
			if (computerLargeDataRaw[i] === computerLargeDataRaw[i - 1]) {
				// Continue the streak
				computerLargeStreak++
			} else {
				if (computerLargeStreakVisual[0] < computerLargeStreak) {
					computerLargeStreakVisual[0] = computerLargeStreak + 1
					computerLargeStreakVisual[1] = computerLargeDataRaw[i - 1]
				}
				// Start a new streak
				if (computerLargeStreakData[computerLargeStreak]) {
					computerLargeStreakData[computerLargeStreak] =
						computerLargeStreakData[computerLargeStreak] + 1
				} else {
					computerLargeStreakData[computerLargeStreak] = 1
				}
				computerLargeStreak = 0
			}
		}
		if (computerLargeStreak) {
			if (computerLargeStreakData[computerLargeStreak]) {
				computerLargeStreakData[computerLargeStreak] =
					computerLargeStreakData[computerLargeStreak] + 1
			} else {
				computerLargeStreakData[computerLargeStreak] = 1
			}
		}

		// Pseudo-Random Large
		for (let i = 0; i < largeCount; i++) {
			let random = Math.floor(Math.random() * 2)
			pseudoLargeData.push(random)
		}

		pseudoLargeData.forEach((e) => {
			switch (e) {
				case 0:
					pseudoRandomCount[0] = pseudoRandomCount[0] + 1
					break
				case 1:
					pseudoRandomCount[1] = pseudoRandomCount[1] + 1
					break
			}
		})

		let pseudoLargeStreak = 0
		let pseudoLargeStreakVisual = [0, 0]
		for (let i = 1; i <= pseudoLargeData.length; i++) {
			console.log(pseudoLargeData[i], pseudoLargeData[i - 1])
			if (pseudoLargeData[i] === pseudoLargeData[i - 1]) {
				// Continue the streak
				pseudoLargeStreak++
			} else {
				// Start a new streak
				if (pseudoLargeStreakVisual[0] < pseudoLargeStreak) {
					pseudoLargeStreakVisual[0] = pseudoLargeStreak + 1
					pseudoLargeStreakVisual[1] = pseudoLargeData[i - 1]
				}
				if (pseudoLargeStreakData[pseudoLargeStreak]) {
					pseudoLargeStreakData[pseudoLargeStreak] = pseudoLargeStreakData[pseudoLargeStreak] + 1
				} else {
					pseudoLargeStreakData[pseudoLargeStreak] = 1
				}
				pseudoLargeStreak = 0
			}
		}
		if (pseudoLargeStreak) {
			if (pseudoLargeStreakData[pseudoLargeStreak]) {
				pseudoLargeStreakData[pseudoLargeStreak] = pseudoLargeStreakData[pseudoLargeStreak] + 1
			} else {
				pseudoLargeStreakData[pseudoLargeStreak] = 1
			}
		}

		let largestLengthLarge = Math.max(computerLargeStreakData.length, pseudoLargeStreakData.length)

		for (let i = 0; i < largestLengthLarge; i++) {
			dynamicLabelsLarge[i] = i + 1
		}

		computerLargeVisual.length = computerLargeStreakData.length
		computerLargeVisual.fill(computerLargeStreakVisual[1])

		pseudoLargeVisual.length = pseudoLargeStreakData.length
		pseudoLargeVisual.fill(pseudoLargeStreakVisual[1])

		// computerLargeVisual.length = computerLargeStreakVisual[0]
		// computerLargeVisual.fill(computerLargeStreakVisual[1])

		// pseudoLargeVisual.length = pseudoLargeStreakVisual[0]
		// pseudoLargeVisual.fill(pseudoLargeStreakVisual[1])

		loadSwitch = 0
	}

	const computerLargeCount = {
		labels: ['Zero', 'One'],
		datasets: [
			{
				label: '# of that number appearing',
				data: trueRandomCount,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
				],
				borderWidth: 1,
			},
		],
	}

	const computerLarge = {
		labels: dynamicLabelsLarge,
		datasets: [
			{
				label: 'Amount of times that streak appeared',
				data: computerLargeStreakData,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
				],
				borderWidth: 1,
			},
		],
	}

	const pseudoLargeCount = {
		labels: ['Zero', 'One'],
		datasets: [
			{
				label: '# of that number appearing',
				data: pseudoRandomCount,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
				],
				borderWidth: 1,
			},
		],
	}

	const pseudoLarge = {
		labels: dynamicLabelsLarge,
		datasets: [
			{
				label: '# of that number appearing',
				data: pseudoLargeStreakData,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
				],
				borderWidth: 1,
			},
		],
	}

	const options = {
		responsive: true,
		scales: {
			y: {
				grid: {
					display: false,
				},
			},
			x: {
				grid: {
					display: false,
				},
			},
		},
	}

	const EnterCheck = (e) => {
		if (e.key === 'Enter') {
			let num = document.getElementById('rerollInput').value
			let numValue = parseInt(num, 10)
			if (numValue > 0) {
				setLargeCount(numValue)
			}
			reroll()
		}
	}

	if (loadSwitch) {
		console.log('it got here')
		return (
			<>
				<Head>
					<title>Loading...</title>
				</Head>
				<h1>Computing numbers...</h1>
			</>
		)
	} else {
		return (
			<>
				<Head>
					<title>Large Results</title>
				</Head>
				<div>Hi</div>
				<div className="graphContainer">
					<div className="barGraph1">
						<h1>Distribution of 1's and 0's</h1>
						<h1>True Random</h1>
						<Bar data={computerLargeCount} options={options}></Bar>
						<h1>Pseudo-random</h1>
						<Bar data={pseudoLargeCount} options={options}></Bar>
					</div>
					<div className="barGraph2">
						<h1>Distributions with larger size</h1>
						<h1>True Random</h1>
						{/* <h1>Too large</h1> */}
						<Bar data={computerLarge} options={options}></Bar>
						<h1>Pseudo-random</h1>
						{/* <h1>Too large</h1> */}
						<Bar data={pseudoLarge} options={options}></Bar>
					</div>
					<div className="barGraph3">
						<h1>True Random</h1>
						<div>Longest Streak: {computerLargeVisual}</div>
						<h1>Pseudo-random</h1>
						<div>Longest Streak: {pseudoLargeVisual}</div>
					</div>
					<div className="barGraph3">
						<h1>Options</h1>
						<Button nextStage={reroll} text={'Reroll'}></Button>
						<input
							type="text"
							placeholder="How many?"
							maxLength="4"
							id="rerollInput"
							onKeyDown={(e) => {
								InputSanitizing2(e)
								EnterCheck(e)
							}}
						></input>
					</div>
				</div>
			</>
		)
	}
}
