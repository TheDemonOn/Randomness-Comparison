import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import HumanCount from '../components/HumanCount'

export default function Home() {
	return (
		<div>
			<Head>
				<title>Rhyme Test</title>
			</Head>
			<h1>Hullo! Type random numbers!</h1>
			<h6>and only numbers you son of a...</h6>
			<HumanCount></HumanCount>
		</div>
	)
}
