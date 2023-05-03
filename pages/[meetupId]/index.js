import MeetupDetail from '@/components/meetups/MeetupDetail'
import { MongoClient, ObjectId } from 'mongodb'
import Head from 'next/head'
import React from 'react'

const MeetupDetails = (props) => {
    return (
        <>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name="description" content={props.meetupData.description} />
            </Head>
            <MeetupDetail
                id={props.meetupData.id}
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </>
    )
}

export async function getStaticPaths() {
    const client = await MongoClient.connect(process.env.DB)
    const db = client.db()
    const meetupCollection = db.collection('meetups')
    const meetups = await meetupCollection.find({}, { _id: 1 }).toArray()
    client.close()

    return {
        // fallback: false,
        fallback: "blocking",
        // paths: [
        //     {
        //         params: {
        //             meetupId: "m1"
        //         }
        //     },
        //     {
        //         params: {
        //             meetupId: "m2"
        //         }
        //     }
        // ]
        paths: meetups.map(item => ({
            params: { meetupId: item._id.toString() }
        }))
    }
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId
    const client = await MongoClient.connect(process.env.DB)
    const db = client.db()
    const meetupCollection = db.collection('meetups')
    const selectedMeetup = await meetupCollection.findOne({ _id: new ObjectId(meetupId), })

    client.close()
    //fetch data for single meetup
    return {
        props: {
            // meetupData: {
            //     id: meetupId,
            //     title: 'A First Meetup',
            //     image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tennis_Courts_IMG_Academy_-_Bradenton.jpg/1280px-Tennis_Courts_IMG_Academy_-_Bradenton.jpg",
            //     address: "Bradenton,_Florida, 245162",
            //     description: "nothing"
            // },
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                image: selectedMeetup.image,
                address: selectedMeetup.address,
                description: selectedMeetup.description
            },
        }
    }
}

export default MeetupDetails
