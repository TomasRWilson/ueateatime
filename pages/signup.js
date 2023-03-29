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
        emailError: true,
        clean: false
    });

    const router = useRouter();

    const LinkStyle = {
        color: "black",
        textDecoration: "none",
        fontWeight: "bold",
        fontSize: "24px",
        float: "left",
        margin: "-60px 0 0 40px",
        display: "block"
    }

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
        if(resp == 205 && event.target.name == "email"){
            setResp("");
        }
        if(resp == 206 && event.target.name == "username"){
            setResp("");
        }
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
        if(formData.username && formData.firstname && formData.lastname && formData.email && formData.password == formData.passwordC && !formData.passwordError && !formData.passwordCError && !formData.emailError){
            if(!formData.clean){
                setFormData({...formData, clean: true});
            }
        }else{
            if(formData.clean){
                setFormData({...formData, clean: false});
            }
        }
    }

    function ErrorUser({ErrorCode}){
        if(ErrorCode == 206){
            return(<p className="form-warning">Username is unavailable</p>);
        }
    };

    function ErrorEmail({ErrorCode}){
        if(ErrorCode == 205){
            return(<p className="form-warning">Email is unavailable</p>);
        }
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

    function EmptyError(Obj){
        let msg = "";
        if(formData.passwordC.length > 1 && !formData.passwordCError){
            if(Obj.Obj == ""){
                msg = "Field cannot be empty";
            }
        }
        return(<p className="form-warning">{msg}</p>)
    }

    function EmailError(){
        const emailVerif = /\S+@\S+\.\S+/;
        if(formData.email.length > 0 && !emailVerif.test(formData.email)){
            if(formData.emailError != "Email must be valid"){
                setFormData({...formData, emailError: "Email must be valid"});
            }
        }else if(formData.passwordC.length > 1 && !formData.passwordCError){
            if(formData.email == "" && formData.emailError != "Field cannot be empty"){
                setFormData({...formData, emailError: "Field cannot be empty"});
            }else{
                if(emailVerif.test(formData.email) && formData.emailError != ""){
                    setFormData({...formData, emailError: ""});
                }
        }
        }
    }

    isClean();

    return(
        <>
            <Head>
                <title>Tea Time Signup</title>
            </Head>
            <Link href='/' style={LinkStyle}>&lt; Back</Link>
            <form onSubmit={handleSubmit}>
                <input id="usern" name="username" placeholder="Username" type="text" onChange={handleChange} value={formData.username}/>
                <EmptyError Obj={formData.username} />
                <ErrorUser ErrorCode={resp}/>
                <input id="firstn" name="firstname" placeholder="First Name" type="text" onChange={handleChange} value={formData.firstname}/>
                <EmptyError Obj={formData.firstname} />
                <input id="lastn" name="lastname" placeholder="Last Name" type="text" onChange={handleChange} value={formData.lastname}/>
                <EmailError />
                <EmptyError Obj={formData.lastname} />
                <input id="email" name="email" placeholder="Email" type="email" onChange={handleChange} value={formData.email}/>
                <p className="form-warning">{formData.emailError}</p>
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