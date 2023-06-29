import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google'
import Head from 'next/head'

const SignIn = dynamic(() => import("@/Sections/SignIn"));

const inter = Inter({ subsets: ['latin'] })


export default function Home() {

  return (
    <>
      <Head>
        <title>Fama One</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <main>
        <div className='wrapper flex flex-col justify-center items-center'>
          <SignIn />
        </div>
      </main>
    </>
  )
}
