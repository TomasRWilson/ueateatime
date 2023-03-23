import { useRouter } from 'next/router'
import axios from 'axios';
import React, { useState } from "react";
import Link from 'next/link';
import { useContext} from 'react';
import { UserContext } from 'lib/UserContext';

export default function Home() {
    //Import user context
    const [user, setUser] = useContext(UserContext);
    const [resp, setResp] = React.useState();
    //Read token from URL paramter
    const router = useRouter();
    const {token} = router.query;
    const data = {token: token};
    //Confirm if token is valid
    axios.post('/api/checktoken', data)
    .then((response) => {
        if(response.data != 205){
            //Log user in and send user to home if the token is valid
            setUser(response.data)
            router.push('/');
        }
        console.log(response)
        setResp(response.data)
    })
    .catch((e) => { console.log(e)}
    )

    //Display message if the token has expired or is not recognised
    const Token = ({ErrorCode}) => {
        if(ErrorCode == 205){
            return(
                <>
                    <p>Token has expired, please return to login to receive a new token.</p>
                    <Link href="/login">Log In</Link>
                </>
            
            )
        }
    }

    return(<>
        <div>
            <Token ErrorCode={resp}/>
        </div>
        
    </>)
}