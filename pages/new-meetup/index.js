import NewMeetupForm from '@/components/meetups/NewMeetupForm'
import Head from 'next/head'
import { Router, useRouter } from 'next/router'
import React, { Fragment } from 'react'

const NewMeetupPage = () => {
    const router = useRouter()
    const addMeetupHendler = async (enteredMeetupData) => {
        const response = await fetch("/api/new-meetup", {
            method: "POST",
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()
        console.log(data)
        router.push('/')
    }

    return (
        <>
            <Head>
                <title>Add a Meetups</title>
                <meta name="description" content="Add your own meetups and create amazing network opportunities." />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHendler} />
        </>
    )
}

export default NewMeetupPage
