import Head from 'next/head'
import styles from 'styles/Home.module.css'
import { useRouter } from 'next/router'
import axios from 'axios';
const web3 = require('web3');
import React, { useState } from "react";
import Link from 'next/link';

export default function Home() {
    
    const [resp, setResp] = React.useState();

    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {
            username: event.target.usern.value,
            firstname: event.target.firstn.value,
            lastname: event.target.lastn.value,
            email: event.target.email.value,
            password: web3.utils.sha3(process.env.HASH_SALT + event.target.pass.value)
        }
        axios.post('/api/signup-user', data)
        .then((response) => {
            console.log(response)
            setResp(response.data);
            if(response.data == 200){
                router.push('/login-wait');
            }
        })
        .catch((e) => { console.log(e)}
        )}

        function ErrorUser({ErrorCode}){
            if(ErrorCode == 206){
                return(<p style={{ color: 'red' }}>Username is unavailable</p>);
            }else{
                return(<></>);
            }
        }

        function ErrorEmail({ErrorCode}){
            if(ErrorCode == 205){
                return(<p style={{ color: 'red' }}>Email is unavailable</p>);
            }else{
                return(<></>);
            }

        }

    return(
        <>
            <Head>
                <title>Tea Time Signup</title>
            </Head>
            <main>
                <Link href='/'>Back</Link>
                <form onSubmit={handleSubmit}>
                    <input id="usern" name="usern" placeholder="Username" type="text"></input><br/>
                    <ErrorUser ErrorCode={resp}/>
                    <input id="firstn" name="firstn" placeholder="First Name" type="text"></input><br/>
                    <input id="lastn" name="lastn" placeholder="Last Name" type="text"></input><br/>
                    <input id="email" name="email" placeholder="Email" type="email"></input><br/>
                    <ErrorEmail ErrorCode={resp}/>
                    <input id="pass" name="pass" placeholder="Password" type="password"></input><br/>
                    <button type="submit">Sign Up</button>
                </form>
            </main>
        </>
    )
}