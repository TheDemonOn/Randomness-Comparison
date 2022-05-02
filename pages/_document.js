import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<meta name="description" content="Antonio's project: Random Test!" />
					<meta name="author" content="Antonio Zamora" />
					<meta name="keywords" content="Antonio, portfolio, front end development, random, api" />
					<meta name="language" content="English" />
					<link rel="stylesheet" href="https://use.typekit.net/eua5kgz.css" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
