import Head from 'next/head'
import { useRouter } from 'next/router'
import axios from 'axios';
const web3 = require('web3');
import React, { useState } from "react";
import Link from 'next/link';

export default function Home() {
    //Used to store response for error feedback
    const [resp, setResp] = useState();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const router = useRouter()
    
    const LinkStyle = {
        color: "black",
        textDecoration: "none",
        fontWeight: "bold",
        fontSize: "24px",
        float: "left",
        margin: "-60px 0 0 40px",
        display: "block"
    }

    const FPStyle = {
        color: "black",
        textDecoration: "none",
        display: "inline-block",
        margin: "30px"
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormData({email: "", password: ""});
        //Construct data and hash and salt password before it is sent to db
        const data = {
            email: event.target.email.value,
            password: web3.utils.sha3(process.env.HASH_SALT + event.target.pass.value)
        };
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
                <Link href='/' style={LinkStyle}>&lt; Back</Link>
                <form onSubmit={handleSubmit}>
                    <input id="email" name="email" placeholder="Email" type="email" onChange={(e) => setFormData({...formData, email: e.target.value})} value={formData.email}></input><br/>
                    <input id="pass" name="pass" placeholder="Password" type="password" onChange={(e) => setFormData({...formData, password: e.target.value})} value={formData.password}></input><br/>
                    <Error ErrorCode = {resp}/>
                    <button>Log In</button>
                </form>
                <Link href='/forgotpassword' style={FPStyle}>Forgotten Password?</Link>
            </main>
        </>
    )
}