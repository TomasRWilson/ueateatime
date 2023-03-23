import Head from 'next/head'
import styles from 'styles/Home.module.css'
import { useRouter } from 'next/router'
import axios from 'axios';
const web3 = require('web3');
import React, { useState } from "react";
import Link from 'next/link';

export default function Home() {
    //Used to store response for error feedback
    const [resp, setResp] = React.useState();

    const router = useRouter()
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        //Construct data and hash and salt password before it is sent to db
        const data = {
            email: event.target.email.value,
            password: web3.utils.sha3(process.env.HASH_SALT + event.target.pass.value)
        }
        //Send data to login api
        axios.post('/api/login-user', data)
        .then((response) => {
            console.log(response)
            if(response.data == 205){
                //Change value of resp to tell user what is wrong
                setResp(205);
            }
            if(response.data == 200){
                //Send user to login-wait if email has been sent
                router.push('/login-wait');
            }
        })
        .catch((e) => { console.log(e)}
        )}
    
    function Error({ErrorCode}){
        //Tell user error based on code
        switch(ErrorCode){
            case 205:
                return(<p style={{ color: 'red' }}>Email or password invalid.</p>)
            default:
                return(<></>)

        }
    }
    //Form for login request
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