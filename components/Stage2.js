import React, { useContext, useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { RandomContext } from './RandomContext'

export default function Stage2(humanGeneration, humanRandomCount) {
	let computerData = [0, 0, 0]
	let humanData = [0, 0, 0]
	if (useContext(RandomContext) === '123') {
		// wait
	} else {
		computerData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		humanData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		let unprocessedData = useContext(RandomContext)
		console.log(humanGeneration, humanGeneration.humanGeneration)
		let unprocessedHumanData = humanGeneration.humanGeneration

		unprocessedData.forEach((e) => {
			switch (e) {
				case 0:
					computerData[0] = computerData[0] + 1
					break
				case 1:
					computerData[1] = computerData[1] + 1
					break
				case 2:
					computerData[2] = computerData[2] + 1
					break
				case 3:
					computerData[3] = computerData[3] + 1
					break
				case 4:
					computerData[4] = computerData[4] + 1
					break
				case 5:
					computerData[5] = computerData[5] + 1
					break
				case 6:
					computerData[6] = computerData[6] + 1
					break
				case 7:
					computerData[7] = computerData[7] + 1
					break
				case 8:
					computerData[8] = computerData[8] + 1
					break
				case 9:
					computerData[9] = computerData[9] + 1
					break
			}
		})

		for (let i = 0; i < unprocessedHumanData.length; i++) {
			switch (unprocessedHumanData[i]) {
				case '0':
					humanData[0] = humanData[0] + 1
					break
				case '1':
					humanData[1] = humanData[1] + 1
					break
				case '2':
					humanData[2] = humanData[2] + 1
					break
				case '3':
					humanData[3] = humanData[3] + 1
					break
				case '4':
					humanData[4] = humanData[4] + 1
					break
				case '5':
					humanData[5] = humanData[5] + 1
					break
				case '6':
					humanData[6] = humanData[6] + 1
					break
				case '7':
					humanData[7] = humanData[7] + 1
					break
				case '8':
					humanData[8] = humanData[8] + 1
					break
				case '9':
					humanData[9] = humanData[9] + 1
					break
			}
		}
	}

	const computerBarData = {
		labels: ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'],
		datasets: [
			{
				label: '# of that number appearing',
				data: computerData,
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

	const humanBarData = {
		labels: ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'],
		datasets: [
			{
				label: '# of that number appearing',
				data: humanData,
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

	if (useContext(RandomContext) === '123') {
		// Waiting for random numbers from API
		return (
			<>
				<h1>Computing numbers...</h1>
			</>
		)
	} else {
		return (
			<>
				<h1>Let's see how you did</h1>
				<h1>{humanRandomCount.humanRandomCount}</h1>
				<h1>{useContext(RandomContext)}</h1>
				<div className="barGraph1">
					<Bar data={computerBarData} options={options}></Bar>
					<h1>{humanGeneration.humanGeneration}</h1>
					<Bar data={humanBarData} options={options}></Bar>
				</div>
			</>
		)
	}
}
