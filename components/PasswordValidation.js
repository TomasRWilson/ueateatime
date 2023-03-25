import { useState } from "react";

function PasswordValidation(){

    const [passwordError, setPasswordErr] = useState("");
    const [passwordCError, setPasswordCError] = useState("");
    const [passwordInput, setPasswordInput]= useState({
        password: "",
        passwordC: ""
    })


    const handlePasswordChange = (event) => {
        event.preventDefault();
        const passwordInputValue = event.target.value.trim();
        const passwordType = event.target.name;
        setPasswordInput({...passwordInput,[passwordType]:passwordInputValue});
        
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
                    errMsg = "Password must contain at least one Uppercase";
            }else if(!lowerCheck){
                    errMsg = "Password must contain at least one Lowercase";
            }else if(!numberCheck){
                    errMsg = "Password must contain at least one digit";
            }else if(!specialCheck){
                    errMsg = "Password must contain at least one Special Characters";
            }else if(!lengthCheck){
                    errMsg = "Password must contain at least minumum 8 characters";
            }else{
                errMsg = "";
            }
            setPasswordErr(errMsg);
            }
        // for confirm password
        if(passwordType === "passwordC" || (passwordType === "password" && passwordInput.passwordC.length > 0) ){
                
            if(passwordInput.passwordC !== passwordInput.password)
            {
            setPasswordCError("Passwords do not match");
            }else{
            setPasswordCError("");
            }
            
        }
    }

    function PasswordInputField({handleValidation, handlePasswordChange, passwordValue, passwordError}){
        return (
            <>
                <div>
                    <input type="password" value={passwordValue}  onChange={handlePasswordChange} onKeyUp={handleValidation} name="password" placeholder="Password"/>
                    <p className="text-danger">{passwordError}</p>
                </div>
            
            </>
        )
    }

    function PasswordCInputField({handleValidation, handlePasswordChange, passwordCValue, passwordCError}){
        return (
            <>
                <div>
                    <input type="password" value={passwordCValue}  onChange={handlePasswordChange} onKeyUp={handleValidation} name="passwordC" placeholder="Confirm Password"/>
                    <p className="text-danger">{passwordCError}</p>
                </div>
            </>
        )
    }

    return(
    <div>
     <div>
        <PasswordInputField
        handleValidation={handleValidation}
        handlePasswordChange={handlePasswordChange} 
        passwordValue={passwordInput.password} 
        passwordError={passwordError}/>
        <PasswordCInputField 
        handleValidation={handleValidation}
        handlePasswordChange={handlePasswordChange} 
        passwordCValue={passwordInput.passwordC} 
        PasswordCError={passwordCError}/>
     </div>
    </div>
    )
}

export default PasswordValidation;