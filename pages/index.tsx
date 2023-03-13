import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Next Auth Template</title>
        <meta name="description" content="Next Auth Template" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='text-center bg-black pt-8'>
        <div className='flex gap-8'>
          <p className='text-white'>Landing page</p>
        </div>
      </main>
    </>
  )
}

// TODO: aleart
// TODO: dashboard
// TODO: role based route