import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
const web3 = require('web3');
import React, { useState } from "react";
import Link from 'next/link';

export default function Home() {
    
    const [resp, setResp] = useState();

    const [errors, setErrors] = useState({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        passwordC: "",
        clean: false
    });

    const [formData, setFormData] = useState({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        passwordC: ""
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
        switch(event.target.name){
            case "username":
                if(event.target.value.length == 0){
                    if(errors.passwordC.length > 1 && !errors.passwordC && errors.username != "Field cannot be empty"){
                        setErrors({...errors, username: "Field cannot be empty"})
                    }else{
                        if(errors.username != ""){
                            setErrors({...errors, username: ""})
                        }
                    }
                }else{
                    const userCheck = /^[A-Za-z0-9]+$/;
                    if(!event.target.value.trim().match(userCheck)){
                        if(errors.username != "Field must only contain alphanumeric characters"){
                            setErrors({...errors, username: "Field must only contain alphanumeric characters"})
                        }
                    }else{
                        if(errors.username != ""){
                            setErrors({...errors, username: ""})
                        }
                    }
                }
                break;
            case "firstname":
                if(event.target.value.length == 0){
                    if(errors.passwordC.length > 1 && !errors.passwordC && errors.firstname != "Field cannot be empty"){
                        setErrors({...errors, firstname: "Field cannot be empty"})
                    }else{
                        if(errors.firstname != ""){
                            setErrors({...errors, firstname: ""})
                        }
                    }
                }else{
                    const nameCheck = /^[A-Za-z]+$/;
                    if(!event.target.value.trim().match(nameCheck)){
                        if(errors.firstname != "Field must only contain letters"){
                            setErrors({...errors, firstname: "Field must only contain letters"})
                        }
                    }else{
                        if(errors.firstname != ""){
                            setErrors({...errors, firstname: ""})
                        }
                    }
                }
                break;
            case "lastname":
                if(event.target.value.length == 0){
                    if(errors.passwordC.length > 1 && !errors.passwordC && errors.lastname != "Field cannot be empty"){
                        setErrors({...errors, lastname: "Field cannot be empty"})
                    }else{
                        if(errors.lastname != ""){
                            setErrors({...errors, lastname: ""})
                        }
                    }
                }else{
                    const nameCheck = /^[A-Za-z]+$/;
                    if(!event.target.value.trim().match(nameCheck)){
                        if(errors.lastname != "Field must only contain letters"){
                            setErrors({...errors, lastname: "Field must only contain letters"})
                        }
                    }else{
                        if(errors.lastname != ""){
                            setErrors({...errors, lastname: ""})
                        }
                    }
                }
                break;
            case "email":
                const emailVerif = /\S+@\S+\.\S+/;
                if(event.target.value.length > 0){
                    if(emailVerif.test(event.target.value)){
                        if(errors.email != ""){
                            setErrors({...errors, email: ""});
                        }
                    }else{
                        if(errors.email != "Email must be valid"){
                            setErrors({...errors, email: "Email must be valid"});
                        }
                    }
                }else if(errors.passwordC.length > 1 && !errors.passwordC){
                    if(errors.email != "Field cannot be empty"){
                        setErrors({...errors, email: "Field cannot be empty"});
                    }
                }else{
                    if(errors.email != ""){
                        setErrors({...errors, email: ""});
                    }
                }
                
        }
    }

    const handlePasswordValidation = (event) => {
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
            setErrors({...errors, password: errMsg});
            }
        // for confirm password
        if(passwordType === "passwordC" || (passwordType === "password" && formData.passwordC.length > 0) ){
                
            if(formData.passwordC !== formData.password)
            {
                setErrors({...errors, passwordC: "Passwords do not match", clean: false});
            }else{
                setErrors({...errors, passwordC: ""});
            }
            
        }
    }

    function isClean(){
        if(formData.username && formData.firstname && formData.lastname && formData.email && formData.password == formData.passwordC && !errors.password && !errors.passwordC && !errors.email){
            if(!errors.clean){
                setErrors({...errors, clean: true});
            }
        }else{
            if(errors.clean){
                setErrors({...errors, clean: false});
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

    function DisplayError({msg}){
        return(<p className="form-warning">{msg}</p>)
    }

    isClean();

    return(
        <>
            <Head>
                <title>Tea Time Signup</title>
            </Head>
            <Link href='/' style={LinkStyle}>&lt; Back</Link>
            <form onSubmit={handleSubmit}>
                <input id="usern" name="username" placeholder="Username" type="text" onChange={handleChange} onKeyUp={handleValidation} value={formData.username}/>
                <DisplayError msg={errors.username} />
                <ErrorUser ErrorCode={resp}/>
                <input id="firstn" name="firstname" placeholder="First Name" type="text" onChange={handleChange} onKeyUp={handleValidation} value={formData.firstname}/>
                <DisplayError msg={errors.firstname} />
                <input id="lastn" name="lastname" placeholder="Last Name" type="text" onChange={handleChange} onKeyUp={handleValidation} value={formData.lastname}/>
                <DisplayError msg={errors.lastname} />
                <input id="email" name="email" placeholder="Email" type="email" onChange={handleChange} onKeyUp={handleValidation} value={formData.email}/>
                <DisplayError msg={errors.email} />
                <ErrorEmail ErrorCode={resp}/>
                <input id ="pass" type="password" value={formData.password}  onChange={handleChange} onKeyUp={handlePasswordValidation} name="password" placeholder="Password"/>
                <DisplayError msg={errors.password} />
                <input type="password" value={formData.passwordC}  onChange={handleChange} onKeyUp={handlePasswordValidation} name="passwordC" placeholder="Confirm Password"/>
                <DisplayError msg={errors.passwordC} />
                <button type="submit" disabled={!errors.clean}>Sign Up</button>
            </form>
        </>
    )

    };