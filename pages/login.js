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
        emailError: "",
        password: "",
        pass: false
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

    const handleValidation = (event) =>{
        const emailVerif = /\S+@\S+\.\S+/;
        if(event.target.name == "email"){
            if(event.target.value.length > 0){
                if(!emailVerif.test(event.target.value.trim())){
                    if(formData.emailError != "Email must be valid"){
                        setFormData({...formData, emailError: "Email must be valid"})
                    }
                }else{
                    if(formData.emailError != ""){
                        setFormData({...formData, emailError: ""})
                    }
                }
            }else{
                if(formData.emailError != ""){
                    setFormData({...formData, emailError: ""})
                }
            }
        }else if(event.target.name == "pass"){
            if(event.target.value.length > 0 && formData.email.length > 0 && !formData.emailError){
                if(!formData.pass){
                    setFormData({...formData, pass: true})
                }
            }else{
                if(formData.pass){
                    setFormData({...formData, pass: false})
                }
            }
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
                    <input id="email" name="email" placeholder="Email" type="email" onChange={(e) => setFormData({...formData, email: e.target.value})} value={formData.email} onKeyUp={handleValidation}></input><br/>
                    <p className="form-warning">{formData.emailError}</p>
                    <input id="pass" name="pass" placeholder="Password" type="password" onChange={(e) => setFormData({...formData, password: e.target.value})} value={formData.password} onKeyUp={handleValidation}></input><br/>
                    <Error ErrorCode = {resp}/>
                    <button disabled={!formData.pass}>Log In</button>
                </form>
                <Link href='/forgotpassword' style={FPStyle}>Forgotten Password?</Link>
            </main>
        </>
    )
}