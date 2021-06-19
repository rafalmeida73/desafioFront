import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Busca CEP</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Busque um CEP desejado" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp