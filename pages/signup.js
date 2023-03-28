import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
const web3 = require('web3');
import React, { useState } from "react";
import Link from 'next/link';

export default function Home() {
    
    const [resp, setResp] = React.useState();
    const [formData, setFormData] = useState({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        passwordError: "",
        passwordC: "",
        passwordCError: "",
        clean: false
    });

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
        )};

    const handleChange = (event) => {
        event.preventDefault();
        setFormData({...formData, [event.target.name]:event.target.value.trim()});
        }

    const handleValidation = (event) => {
        event.preventDefault();
        const passwordInputValue = event.target.value.trim();
        const passwordType = event.target.name;
            //for password 
        if(passwordType === 'password'){

            const upperCheck = /(?=.*?[A-Z])/.test(passwordInputValue);
            const lowerCheck = /(?=.*?[a-z])/.test(passwordInputValue);
            const numberCheck = /(?=.*?[0-9])/.test(passwordInputValue);
            const specialCheck = /(?=.*?[#?!@$%^&*-])/.test(passwordInputValue);
            const lengthCheck = /.{8,}/.test(passwordInputValue);


            let errMsg = "";
            if(passwordInputValue.length === 0){
                    errMsg = "";
            }else if(!upperCheck){
                    errMsg = "Password must contain at least one uppercase character";
            }else if(!lowerCheck){
                    errMsg = "Password must contain at least one lowercase character";
            }else if(!numberCheck){
                    errMsg = "Password must contain at least one number";
            }else if(!specialCheck){
                    errMsg = "Password must contain at least one special character";
            }else if(!lengthCheck){
                    errMsg = "Password must contain at least minumum 8 characters";
            }else{
                errMsg = "";
            }
            setFormData({...formData, passwordError: errMsg});
            }
        // for confirm password
        if(passwordType === "passwordC" || (passwordType === "password" && formData.passwordC.length > 0) ){
                
            if(formData.passwordC !== formData.password)
            {
                setFormData({...formData, passwordCError: "Passwords do not match", clean: false});
            }else{
                setFormData({...formData, passwordCError: ""});
            }
            
        }
    }

    function isClean(){
        if(formData.username && formData.firstname && formData.lastname && formData.email && formData.password == formData.passwordC && !formData.passwordError && !formData.passwordCError){
            if(!formData.clean){
                setFormData({...formData, clean: true});
            }
        }else{
            if(formData.clean){
                setFormData({...formData, clean: false});
            }
            
        }
        console.log(formData);
    }

    function ErrorUser({ErrorCode}){
        let msg = "";
        if(ErrorCode == 206){
            msg = "Username is unavailable";
        }
        return(<p className="form-warning">{msg}</p>);
    };

    function ErrorEmail({ErrorCode}){
        let msg = "";
        if(ErrorCode == 205){
            msg = "Email is unavailable";
        }
        return(<p className="form-warning">{msg}</p>);

    };

    function PasswordError(){
        return(
            <p className="form-warning">{formData.passwordError}</p>
        )
    }

    function PasswordCError(){
        return(
            <p className="form-warning">{formData.passwordCError}</p>
        )
    }

    isClean();

    return(
        <>
            <Head>
                <title>Tea Time Signup</title>
            </Head>
            <Link href='/'>Back</Link>
            <form onSubmit={handleSubmit}>
                <input id="usern" name="username" placeholder="Username" type="text" onChange={handleChange} value={formData.username} required/>
                <ErrorUser ErrorCode={resp}/>
                <input id="firstn" name="firstname" placeholder="First Name" type="text" onChange={handleChange} value={formData.firstname} required/>
                <input id="lastn" name="lastname" placeholder="Last Name" type="text" onChange={handleChange} value={formData.lastname} required/>
                <input id="email" name="email" placeholder="Email" type="email" onChange={handleChange} value={formData.email} required/>
                <ErrorEmail ErrorCode={resp}/>
                <input id = "pass" type="password" value={formData.password}  onChange={handleChange} onKeyUp={handleValidation} name="password" placeholder="Password"/>
                <PasswordError />
                <input type="password" value={formData.passwordC}  onChange={handleChange} onKeyUp={handleValidation} name="passwordC" placeholder="Confirm Password"/>
                <PasswordCError />
                <button type="submit" disabled={!formData.clean}>Sign Up</button>
            </form>
        </>
    )

    };