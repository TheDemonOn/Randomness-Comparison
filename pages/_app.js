import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<meta name="description" content="Antonio's project: Random Test!" />
				<meta name="author" content="Antonio Zamora" />
				<meta name="keywords" content="Antonio, portfolio, front end development, random, api" />
				<meta name="language" content="English" />
				<link rel="stylesheet" href="https://use.typekit.net/eua5kgz.css" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<Component {...pageProps} />
		</>
	)
}

export default MyApp
