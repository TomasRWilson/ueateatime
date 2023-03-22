import React, { useState } from "react";
import Head from 'next/head'
import styles from 'styles/Home.module.css'
import axios from 'axios';

export default function Home() {
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {content: event.target.query.value}
        axios.post('/api/sendpost', data)
        .then((response) => {
            console.log(response)
        })
        .catch((e) => { console.log(e)}
        )}

    return(
        <>
            <Head>
                <title>Search DB</title>
            </Head>
            <main className={styles.main}>
                <form onSubmit={handleSubmit}>
                    <input id="query" name="query" placeholder="Query" type="text"></input>
                    <button type="submit">Search</button>
                </form>
            </main>
        </>
    )
}