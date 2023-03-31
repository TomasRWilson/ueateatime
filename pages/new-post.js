import Head from 'next/head'
import axios from 'axios';
import React, { useState } from "react";
import Link from 'next/link';
import { useContext} from 'react';
import { UserContext } from 'lib/UserContext';

export default function Home() {
    //Used to store response for error feedback
    const [user, setUser] = useContext(UserContext);
    const [resp, setResp] = useState();
    const [formData, setFormData] = useState({
        title: "",
        summary: "",
        body: "",
        pass: false
    })
    
    const LinkStyle = {
        color: "black",
        textDecoration: "none",
        fontWeight: "bold",
        fontSize: "24px",
        float: "left",
        margin: "-60px 0 0 40px",
        display: "block"
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        //Construct data
        const data = {
            title: event.target.title.value.trim(),
            summary: event.target.summary.value.trim(),
            body: event.target.body.value,
            userid: user.user_id
        };
        //Send data to new post api
        axios.post('/api/create-post', data)
        .then((response) => {
            console.log(response)
            if(response.data == 200){
                //Send user home if post created
                router.push('/');
            }
        })
        .catch((e) => { console.log(e)}
        )
    }

    const handleValidation = (event) =>{
        event.preventDefault();
        switch(event.target.name){
            case "title":
                if(event.target.value.trim().length > 0){
                    if(formData.summary && formData.body && !formData.pass){
                        setFormData({...formData, pass: true});
                    }
                }else{
                    if(formData.pass){
                        setFormData({...formData, pass: false});
                    }
                }
                break;
            case "summary":
                if(event.target.value.trim().length > 0){
                    if(formData.title && formData.body && !formData.pass){
                        setFormData({...formData, pass: true});
                    }
                }else{
                    if(formData.pass){
                        setFormData({...formData, pass: false});
                    }
                }
                break;
            case "body":
                if(event.target.value.trim().length > 0){
                    if(formData.title && formData.summary && !formData.pass){
                        setFormData({...formData, pass: true});
                    }
                }else{
                    if(formData.pass){
                        setFormData({...formData, pass: false});
                    }
                }
                break;
            }
        console.log(formData)
                
    }

    return(
        <>
            <Head>
                <title>Tea Time Login</title>
            </Head>
            <main>
                <Link href='/' style={LinkStyle}>&lt; Back</Link>
                <form onSubmit={handleSubmit}>
                    <label for="title">Title</label>
                    <input id="title" name="title" placeholder="Name your post..." type="text" onChange={(e) => setFormData({...formData, title: e.target.value})} value={formData.title} onKeyUp={handleValidation}></input>
                    <label for="summary">Summary</label>
                    <input id="summary" name="summary" placeholder="Describe your post..." type="text" onChange={(e) => setFormData({...formData, summary: e.target.value})} value={formData.summary} onKeyUp={handleValidation}></input>
                    <label for="body">Content</label>
                    <input id="body" name="body" placeholder="Write your post..." type="textarea" onChange={(e) => setFormData({...formData, body: e.target.value})} value={formData.body} onKeyUp={handleValidation}></input>
                    <button disabled={!formData.pass}>Create Post</button>
                </form>
            </main>
        </>
    )
}