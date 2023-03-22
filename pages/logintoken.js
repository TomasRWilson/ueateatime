import { useRouter } from 'next/router'
import axios from 'axios';
import React, { useState } from "react";
import Link from 'next/link';

export default function Home() {

    const [resp, setResp] = React.useState();

    const router = useRouter();
    const {token} = router.query;

    const data = {token: token};
    axios.post('/api/checktoken', data)
    .then((response) => {
        if(response.data == 200){
            router.push('/');
        }
        console.log(response)
        setResp(response.data)
    })
    .catch((e) => { console.log(e)}
    )

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