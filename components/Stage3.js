import React, { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import Chart from 'react-chartjs-2'
import { Bar } from 'react-chartjs-2'
import { RandomContext } from '../context/RandomContext'
import Button from './Button'
import InputSanitizing2 from './InputSanitizing2'
import { ConsistentResult } from '../context/ConsistentResult'
import Loading from './Loading'

export default function Stage3({
	largeCount,
	reroll,
	setLargeCount,
	nextStage,
	setSideTrackChoice,
	setPreviousPseudo,
}) {
	let generationController = useContext(ConsistentResult)
	let computerRandomContextRaw = useContext(RandomContext)[1]

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

		let pseudoLargeStreak = 0
		var pseudoLargeStreakVisual = [0, 0]

		if (generationController[0] === 1) {
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

			for (let i = 1; i <= pseudoLargeData.length; i++) {
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
		} else {
			pseudoRandomCount = generationController[1][0]
			pseudoLargeStreakData = generationController[1][1]
			pseudoLargeStreakVisual = generationController[1][2]
			computerRandomContextRaw = generationController[1][3]
			pseudoLargeData = generationController[1][4]
		}
		let largestLengthLarge = Math.max(computerLargeStreakData.length, pseudoLargeStreakData.length)

		for (let i = 0; i < largestLengthLarge; i++) {
			dynamicLabelsLarge[i] = i + 1
		}
		computerLargeVisual.length = computerLargeStreakData.length
		computerLargeVisual.fill(computerLargeStreakVisual[1])
		pseudoLargeVisual.length = pseudoLargeStreakData.length
		pseudoLargeVisual.fill(pseudoLargeStreakVisual[1])

		loadSwitch = 0
	}

	const computerLargeCount = {
		labels: ['Zero', 'One'],
		datasets: [
			{
				label: '# of that number appearing',
				data: trueRandomCount,
				backgroundColor: ['#DA4127', '#F0CA1C'],
			},
		],
	}

	const computerLarge = {
		labels: dynamicLabelsLarge,
		datasets: [
			{
				label: 'Amount of times that streak appeared',
				data: computerLargeStreakData,
				backgroundColor: ['#DA4127', '#F0CA1C'],
				order: 2,
			},
			{
				label: 'Amount of times that streak appeared',
				data: computerLargeStreakData,
				backgroundColor: ['#DA4127', '#F0CA1C'],
				type: 'line',
				order: 1,
			},
		],
	}

	const pseudoLargeCount = {
		labels: ['Zero', 'One'],
		datasets: [
			{
				label: '# of that number appearing',
				data: pseudoRandomCount,
				backgroundColor: ['#DA4127', '#F0CA1C'],
			},
		],
	}

	const pseudoLarge = {
		labels: dynamicLabelsLarge,
		datasets: [
			{
				label: 'Amount of times that streak appeared',
				data: pseudoLargeStreakData,
				backgroundColor: ['#DA4127', '#F0CA1C'],
				order: 2,
			},
			{
				label: 'Amount of times that streak appeared',
				data: pseudoLargeStreakData,
				backgroundColor: ['#DA4127', '#F0CA1C'],
				type: 'line',
				order: 1,
			},
		],
	}

	const options = {
		elements: {
			line: {
				borderWidth: 0,
			},
		},
		responsive: true,
		scales: {
			y: {
				grid: {
					display: false,
					borderColor: '#26225D',
					borderWidth: 1,
				},
				ticks: {
					beginAtZero: true,
					color: '#26225D',
				},
			},
			x: {
				grid: {
					display: false,
					borderColor: '#26225D',
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
			let num = document.getElementById('rerollInput').value
			let numValue = parseInt(num, 10)
			if (numValue > 1) {
				setLargeCount(numValue)
			}
			reroll()
		}
	}

	const computerLargeStreakFunc = () => {
		setPreviousPseudo([
			pseudoRandomCount,
			pseudoLargeStreakData,
			pseudoLargeStreakVisual,
			computerRandomContextRaw,
			pseudoLargeData,
		])
		setSideTrackChoice([computerRandomContextRaw, computerLargeVisual])
		nextStage()
	}

	const pseudoLargeStreakFunc = () => {
		setPreviousPseudo([
			pseudoRandomCount,
			pseudoLargeStreakData,
			pseudoLargeStreakVisual,
			computerRandomContextRaw,
			pseudoLargeData,
		])
		setSideTrackChoice([pseudoLargeData, pseudoLargeVisual])
		nextStage()
	}

	if (loadSwitch) {
		return <Loading />
	} else {
		return (
			<>
				<Head>
					<title>Large Results</title>
				</Head>
				<main className="stage3Main">
					<div className="graphContainer">
						<div className="barGraph1">
							<div className="space more">
								<h1>Distribution of 1's and 0's</h1>
								<p>How many times each number appeared.</p>
							</div>
							<h2 className="space">True Random</h2>
							<Bar data={computerLargeCount} options={options}></Bar>
							<h2 className="space">Pseudo-random</h2>
							<Bar data={pseudoLargeCount} options={options}></Bar>
						</div>
						<div className="barGraph2">
							<div className="space more">
								<h1>Distributions of streaks</h1>
								<p>How many streaks of a certain amount that appeared.</p>
							</div>
							<h2 className="space">True Random</h2>
							<div>
								<Chart type="bar" data={computerLarge} options={options} />
							</div>
							<h2 className="space">Pseudo-random</h2>
							<div>
								<Chart type="bar" data={pseudoLarge} options={options} />
							</div>
						</div>
						<div className="barGraph3">
							<div className="space more">
								<h1>Longest Streak</h1>
								<p>The highest consecutive string in a row.</p>
								<p>Click on the streak below to visualize it!</p>
							</div>
							<div className="space more">
								<h2>True Random</h2>
								<button
									className="altButton"
									onClick={computerLargeStreakFunc}
									id="computerLargeStreak"
								>
									<p className="hoverNums">
										{computerLargeVisual.length}: {computerLargeVisual}
									</p>
								</button>
							</div>
							<div className="space more">
								<h2>Pseudo-random</h2>
								<button
									className="altButton"
									onClick={pseudoLargeStreakFunc}
									id="pseudoLargeStreak"
								>
									<p className="hoverNums">
										{pseudoLargeVisual.length}: {pseudoLargeVisual}
									</p>
								</button>
							</div>
							<div className="generateBox ">
								<h1>True vs Pseudo-random</h1>
								<p>Generate some more here.</p>
								<input
									type="text"
									placeholder="Type any number up to 9999"
									className="stage2Input"
									maxLength="4"
									id="rerollInput"
									onKeyDown={(e) => {
										InputSanitizing2(e)
										EnterCheck(e)
									}}
								></input>
								<Button stageControl={reroll} className="stage2Button" text={'Generate'}></Button>
							</div>
						</div>
					</div>
				</main>
			</>
		)
	}
}
