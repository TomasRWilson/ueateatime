import Head from 'next/head'
import styles from 'styles/Home.module.css'
import axios from 'axios';
import React from "react";
import Link from 'next/link';

export default function Home() {
    //Used to store response for error feedback
    const [send, setSend] = React.useState();
    const handleSubmit = async (event) => {
        event.preventDefault()
        //Construct data and hash and salt password before it is sent to db
        const data = {
            email: event.target.email.value
        }
        //Send data to login api
        axios.post('/api/forgotpassword', data)
        .then((response) => {
            console.log(response)
            if(response.data == 200){
                //Send user to login-wait if email has been sent
                setSend(true);
            }
        })
        .catch((e) => { console.log(e)}
        )}
    //Update user that email is sent
    const Sent = ({send}) => {
        if (send){
            return(
                <>
                    <p>If an account matches the email provided an email has been sent. Follow the link in the email to reset your password.</p>
                </>
            )
        }
    }

    //Form for password reset request
    return(
        <>
            <Head>
                <title>Forgotten Password</title>
            </Head>
            <main>
                <Link href='/login'>Back</Link>
                <form onSubmit={handleSubmit}>
                    <input id="email" name="email" placeholder="Email" type="email"></input><br/>
                    <button type="submit">Reset Password</button>
                </form>
                <Sent send={send}/>
            </main>
        </>
    )
}