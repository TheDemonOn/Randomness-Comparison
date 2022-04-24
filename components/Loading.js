import React from 'react'
import Head from 'next/head'

export default function Loading() {
	return (
		<>
			<Head>
				<title>Loading...</title>
			</Head>

			<main className="loadingScreen">
				<div>
					<h1>Crunching the numbers...</h1>
				</div>
			</main>
		</>
	)
}
