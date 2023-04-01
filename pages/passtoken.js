import { useRouter } from 'next/router'
import axios from 'axios';
import React,  { useState }  from "react";
import Link from 'next/link';
const web3 = require('web3');

//Current Issues: post is sent multiple times on page load, Page is not updating on successful password change

export default function Home() {
    //Import user context
    const [resp, setResp] = useState("");
    const [user_id, setUser_Id] = useState("");
    const [passed, setPassed] = useState(false);
    const [errors, setErrors] = useState({
        password: "",
        passwordC: "",
        clean: false
    })
    const [formData, setFormData] = useState({
        password: "",
        passwordC: ""
    });

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
        event.preventDefault();
        setFormData({password: "", passwordC: ""});
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
                setErrors({...errors, passwordC: "", clean: true});
            }

        }
    }

    const handleChange = (event) => {
        event.preventDefault();
        setFormData({...formData, [event.target.name]:event.target.value.trim()});
    }

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

    function DisplayError({msg}){
        return(<p className="form-warning">{msg}</p>)
    }

    //Present form if token if valid
    const PassForm = ({pass}) => {

        if (pass){
            return(
                <>
                    <form onSubmit={handleSubmit}>
                        <input id ="pass" type="password" value={formData.password}  onChange={handleChange} onKeyUp={handlePasswordValidation} name="password" placeholder="Password"/>
                        <DisplayError msg={errors.password} />
                        <input type="password" value={formData.passwordC}  onChange={handleChange} onKeyUp={handlePasswordValidation} name="passwordC" placeholder="Confirm Password"/>
                        <DisplayError msg={errors.passwordC} />
                        <button type="submit" display={errors.clean}>Change Password</button>
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