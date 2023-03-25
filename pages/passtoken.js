import { useRouter } from 'next/router'
import axios from 'axios';
import React from "react";
import Link from 'next/link';
const web3 = require('web3');

//Current Issues: post is sent multiple times on page load, Page is not updating on successful password change

export default function Home() {
    //Import user context
    const [resp, setResp] = React.useState();
    const [user_id, setUser_Id] = React.useState();
    const [passed, setPassed] = React.useState();
    //Read token from URL paramter
    const router = useRouter();
    const {token} = router.query;
    const data = {token: token};
    
    //Confirm if token is valid
    axios.post('/api/checkpasstoken', data)
    .then((response) => {
        if(response.data == 205){
            setResp(205);
        }else{
            setUser_Id(response.data);
            setPassed(true);
        }
        console.log(response.data);
    })
    .catch((e) => { console.log(e)}
    )
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        //Construct data and hash and salt password before it is sent to db
        const data = {
            token: token,
            user_id: user_id,
            password: web3.utils.sha3(process.env.HASH_SALT + event.target.pass.value)
        }
        //Send data to password  reset
        axios.post('/api/pass-reset', data)
        .then((response) => {
            console.log(response)
            if(resp.data == 200){
                //Update state
                setResp(200);
                console.log(resp)
            }
        })
        .catch((e) => { console.log(e)}
        )}

    //Display message if the token has expired or is not recognised
    const Token = ({ErrorCode}) => {
        if(ErrorCode == 205){
            return(
                <>
                    <p>Password change link has expired, please return to login and press forgotten password again for a new link.</p>
                    <Link href="/login">Log In</Link>
                </>
            
            )
        }
    }
    //Present form if token if valid
    const PassForm = ({pass}) => {
        if (pass){
            return(
                <>
                    <form onSubmit={handleSubmit}>
                        <input id="pass" name="pass" placeholder="New Password" type="password"></input><br/>
                        <button type="submit">Change Password</button>
                    </form>
                </>
            )
        }
    }
    //Return message if password has been changed
    const Changed = ({Code}) => {
        if (Code == 200){
            return(
                <>
                    <p>Password has been successfully changed. Follow the link below to login.</p>
                    <Link href="/login">Log In</Link>
                </>
            )
        }
    }

    //Changed is not working currently
    return(<>
        <div>
            <Token ErrorCode={resp}/>
            <PassForm pass={passed}/>
            <Changed Code={resp}/>
        </div>
        
    </>)
}