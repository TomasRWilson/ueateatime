import Head from 'next/head'
import styles from 'styles/Home.module.css'
import { useRouter } from 'next/router'
import axios from 'axios';
const web3 = require('web3');
import React, { useState } from "react";
import Link from 'next/link';

export default function Home() {

    const [resp, setResp] = React.useState();

    const router = useRouter()
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {
            email: event.target.email.value,
            password: web3.utils.sha3(process.env.HASH_SALT + event.target.pass.value)
        }
        axios.post('/api/login-user', data)
        .then((response) => {
            console.log(response)
            if(response.data == 205){
                setResp(205);
            }
            if(response.data == 200){
                router.push('/login-wait');
            }
        })
        .catch((e) => { console.log(e)}
        )}
    
    function Error({ErrorCode}){
        switch(ErrorCode){
            case 205:
                return(<p style={{ color: 'red' }}>Email or password invalid.</p>)
            default:
                return(<></>)

        }
    }

    return(
        <>
            <Head>
                <title>Tea Time Login</title>
            </Head>
            <main>
                <Link href='/'>Back</Link>
                <form onSubmit={handleSubmit}>
                    <input id="email" name="email" placeholder="Email" type="email"></input><br/>
                    <input id="pass" name="pass" placeholder="Password" type="text"></input><br/>
                    <Error ErrorCode = {resp}/>
                    <button type="submit">Log In</button>
                </form>
            </main>
        </>
    )
}