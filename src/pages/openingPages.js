import Layout from '@/layout'
import dynamic from 'next/dynamic';
import Head from 'next/head';

const OpeningSection = dynamic(() => import("@/Sections/OpeningSection"));


export default function OpeningPages() {
  if (typeof window !== "undefined")
    return (
      <>
        <Head>
          <title>Fama One</title>
          <link rel="icon" href="/logo.svg" />
        </Head>
        <main>
          <Layout>
            <OpeningSection />
          </Layout>
        </main>
      </>
    )
}
