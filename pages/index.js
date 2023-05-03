import { Inter } from 'next/font/google'
import MeetupList from '@/components/meetups/MeetupList'
import { useEffect, useState } from 'react'
import { MongoClient } from 'mongodb'
import Head from 'next/head'

const DUMMY_MEETUPS = [{
  id: 'm1',
  title: 'A First Meetup',
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tennis_Courts_IMG_Academy_-_Bradenton.jpg/1280px-Tennis_Courts_IMG_Academy_-_Bradenton.jpg",
  address: "Bradenton,_Florida, 245162",
  description: "nothing"
}, {
  id: 'm2',
  title: 'A second Meetup',
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Volc%C3%A1n_Mi%C3%B1iques%2C_Chile%2C_2016-02-08%2C_DD_52-55_PAN.jpg/1920px-Volc%C3%A1n_Mi%C3%B1iques%2C_Chile%2C_2016-02-08%2C_DD_52-55_PAN.jpg",
  address: "Bradenton,_Florida, 245162",
  description: "second meetup description"
}]

// const inter = Inter({ subsets: ['latin'] })

function HomePage(props) {
  // const [loadedMeetup, setLoadedMeetup] = useState([])
  // useEffect(() => {
  //   //Send http request and fetch data
  //   setLoadedMeetup(DUMMY_MEETUPS)
  // }, [])

  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge list of highly active meetups!" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  )
}

// export async function getServerSideProps(context) {
//   const req = context.req
//   const res = context.res
//   //fetch data from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

export async function getStaticProps() {
  //fetch data from an API
  const client = await MongoClient.connect(process.env.DB)
  const db = client.db()
  const meetupCollection = db.collection('meetups')
  const meetups = await meetupCollection.find().toArray();

  client.close()
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
        id: meetup._id.toString()
      }))
      // meetups: DUMMY_MEETUPS
    },
    revalidate: 1
  };
}

export default HomePage;