import Head from 'next/head'
import LoginBox from './components/auth/loginBox'

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='text-center bg-black'>
        <p className='text-white'>Landing page</p>
        <LoginBox />
      </main>
    </>
  )
}
