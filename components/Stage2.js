import React, { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { Bar } from 'react-chartjs-2'
import { RandomContext } from '../context/RandomContext'
import InputSanitizing2 from './InputSanitizing2'
import Button from './Button'
import Loading from './Loading'
import ZeroOne from './ZeroOne'

export default function Stage2({ humanGeneration, setLargeCount, nextStage }) {
	let loadSwitch = 1

	let computerData = [0, 0]
	// Streak data follows the template: ["streak of 1", "streak of 2", "streak of 3"...]
	let computerStreakData = [0]
	let humanData = [0, 0]
	let humanStreakData = [0]
	let pseudoData = [0, 0]
	let pseudoStreakData = [0]
	let pseudoDataRaw = []

	let dynamicLabels = [-99]

	if (useContext(RandomContext)[0] === '123') {
		// wait
	} else {
		let unprocessedData = useContext(RandomContext)[0]
		let unprocessedHumanData = humanGeneration
		// True Random
		unprocessedData.forEach((e) => {
			switch (e) {
				case 0:
					computerData[0] = computerData[0] + 1
					break
				case 1:
					computerData[1] = computerData[1] + 1
					break
			}
		})

		let computerStreak = 0
		for (let i = 1; i <= unprocessedData.length; i++) {
			if (unprocessedData[i] === unprocessedData[i - 1]) {
				// Continue the streak
				computerStreak++
			} else {
				// Start a new streak
				if (computerStreakData[computerStreak]) {
					computerStreakData[computerStreak] = computerStreakData[computerStreak] + 1
				} else {
					computerStreakData[computerStreak] = 1
				}
				computerStreak = 0
			}
		}

		// Human Random
		for (let i = 0; i < unprocessedHumanData.length; i++) {
			switch (unprocessedHumanData[i]) {
				case '0':
					humanData[0] = humanData[0] + 1
					break
				case '1':
					humanData[1] = humanData[1] + 1
					break
			}
		}

		let humanStreak = 0
		for (let i = 1; i <= unprocessedHumanData.length; i++) {
			if (unprocessedHumanData[i] === unprocessedHumanData[i - 1]) {
				// Continue the streak
				humanStreak++
			} else {
				// Start a new streak
				if (humanStreakData[humanStreak]) {
					humanStreakData[humanStreak] = humanStreakData[humanStreak] + 1
				} else {
					humanStreakData[humanStreak] = 1
				}
				humanStreak = 0
			}
		}

		// Pseudo-random
		for (let i = 0; i < unprocessedHumanData.length; i++) {
			let random = Math.floor(Math.random() * 2)
			pseudoDataRaw.push(random)
			switch (random) {
				case 0:
					pseudoData[0] = pseudoData[0] + 1
					break
				case 1:
					pseudoData[1] = pseudoData[1] + 1
					break
			}
		}

		let pseudoStreak = 0
		for (let i = 1; i <= pseudoDataRaw.length; i++) {
			if (pseudoDataRaw[i] === pseudoDataRaw[i - 1]) {
				// Continue the streak
				pseudoStreak++
			} else {
				// Start a new streak
				if (pseudoStreakData[pseudoStreak]) {
					pseudoStreakData[pseudoStreak] = pseudoStreakData[pseudoStreak] + 1
				} else {
					pseudoStreakData[pseudoStreak] = 1
				}
				pseudoStreak = 0
			}
		}

		// Create labels
		let largestLength = Math.max(
			computerStreakData.length,
			humanStreakData.length,
			pseudoStreakData.length
		)

		for (let i = 0; i < largestLength; i++) {
			dynamicLabels[i] = i + 1
		}
		loadSwitch = 0
	}

	const computerBarData = {
		labels: ['Zero', 'One'],
		datasets: [
			{
				label: '# of that number appearing',
				data: computerData,
				backgroundColor: ['#DA4127', '#F0CA1C'],
			},
		],
	}

	const computerStreakBarData = {
		labels: dynamicLabels,
		datasets: [
			{
				label: 'Amount of times that streak appeared',
				data: computerStreakData,
				backgroundColor: ['#DA4127', '#F0CA1C'],
			},
		],
	}

	const humanBarData = {
		labels: ['Zero', 'One'],
		datasets: [
			{
				label: '# of that number appearing',
				data: humanData,
				backgroundColor: ['#DA4127', '#F0CA1C'],
			},
		],
	}

	const humanStreakBarData = {
		labels: dynamicLabels,
		datasets: [
			{
				label: 'Amount of times that streak appeared',
				data: humanStreakData,
				backgroundColor: ['#DA4127', '#F0CA1C'],
			},
		],
	}

	const pseudoBarData = {
		labels: ['Zero', 'One'],
		datasets: [
			{
				label: '# of that number appearing',
				data: pseudoData,
				backgroundColor: ['#DA4127', '#F0CA1C'],
			},
		],
	}

	const pseudoStreakBarData = {
		labels: dynamicLabels,
		datasets: [
			{
				label: 'Amount of times that streak appeared',
				data: pseudoStreakData,
				backgroundColor: ['#DA4127', '#F0CA1C'],
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
				ticks: {
					beginAtZero: true,
					stepSize: 1,
					color: '#26225D',
				},
			},
			x: {
				grid: {
					display: false,
				},
				ticks: {
					beginAtZero: true,
					stepSize: 1,
					color: '#26225D',
				},
			},
		},
		plugins: {
			legend: {
				display: false,
			},
		},
	}

	const EnterCheck = (e) => {
		if (e.key === 'Enter') {
			let num = document.getElementById('largeInput').value
			let numValue = parseInt(num, 10)
			if (numValue > 0) {
				setLargeCount(numValue)
				nextStage()
			}
		}
	}
	const NextButton = () => {
		let num = document.getElementById('largeInput').value
		let numValue = parseInt(num, 10)
		if (!numValue) {
			numValue = 1000
		}
		setLargeCount(numValue)
		nextStage()
	}

	if (loadSwitch) {
		// Waiting for random numbers from API
		return <Loading />
	} else {
		return (
			<>
				<Head>
					<title>Your Results</title>
				</Head>
				<main className="stage2Main">
					<div className="graphContainer">
						<div className="barGraph1">
							<div className="space more">
								<h1>Distribution of 1's and 0's</h1>
								<p>How many times each number appeared.</p>
							</div>
							<div className="space">
								<h2>Human Random</h2>
								<ZeroOne input={humanGeneration} />
							</div>
							<Bar data={humanBarData} options={options}></Bar>
							<div className="space">
								<h2>True Random</h2>
								<ZeroOne input={useContext(RandomContext)[0]} />
							</div>
							<Bar data={computerBarData} options={options}></Bar>
							<div className="space">
								<h2>Pseudo-random</h2>
								<ZeroOne input={pseudoDataRaw} />
							</div>
							<Bar data={pseudoBarData} options={options}></Bar>
						</div>
						<div className="barGraph2">
							<div className="space more">
								<h1>Distribution of streaks</h1>
								<p>How many streaks of a certain amount that appeared.</p>
							</div>
							<div className="space">
								<h2>Human Random</h2>
								<ZeroOne input={humanGeneration} />
							</div>
							<Bar data={humanStreakBarData} options={options}></Bar>
							<div className="space">
								<h2>True Random</h2>
								<ZeroOne input={useContext(RandomContext)[0]} />
							</div>
							<Bar data={computerStreakBarData} options={options}></Bar>
							<div className="space">
								<h2>Pseudo-random</h2>
								<ZeroOne input={pseudoDataRaw} />
							</div>
							<Bar data={pseudoStreakBarData} options={options}></Bar>
						</div>
						<div className="generateBox">
							<h1>True vs Pseudo-random</h1>
							<p>
								See how true random compares to pseudo-random at larger scales! Type how many
								numbers should be generated.
							</p>
							<input
								type="text"
								placeholder="Type any number up to 9999"
								maxLength="4"
								id="largeInput"
								className="stage2Input"
								onKeyDown={(e) => {
									InputSanitizing2(e)
									EnterCheck(e)
								}}
							></input>
							<Button
								stageControl={NextButton}
								text={'Generate'}
								className={'stage2Button'}
							></Button>
						</div>
					</div>
				</main>
			</>
		)
	}
}
