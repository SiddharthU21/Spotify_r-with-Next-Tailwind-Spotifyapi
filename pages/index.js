
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import DashBoard from '../components/DashBoard'

export default function Home() {
  return (
      <>
      <Head>
        <title>Spotify_r</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashBoard/>
      </>

  )
}

export async function getServerSideProps(context){
  const session = await getSession(context);

  return{
    props : {
      session,
    }
  };
}




