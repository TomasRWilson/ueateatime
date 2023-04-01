import conn from '../../lib/db'
const web3 = require('web3');
var BN = web3.utils.BN;
import axios from 'axios';
import { useRouter } from 'next/router';

export default async (req, res) => {

    try {
        console.log("req nom", req.body)
        //Create token between 10000000 and 99999999 and hash it
        var token = Math.floor(Math.random() * (9000000) + 1000000);
        token = web3.utils.sha3(new BN(token.toString()));
        //Create expiry time for 10 mins from now for when token expires
        var expiry = new Date();
        expiry.setMinutes(expiry.getMinutes() + 10);
        const values = [req.body.username, req.body.firstname, req.body.lastname, req.body.email, req.body.password, token, expiry]
        //Add new user to db
        const result = await conn.query('INSERT INTO users (username, firstname, lastname, email, password, token, expiry) VALUES ($1, $2, $3, $4, $5, $6, $7)', values);
        console.log(result);
        //Construct email information
        const data = {
            email: req.body.email,
            subject: "Login to TeaTime with your magic link",
            name: req.body.firstname,
            token: token,
            type: 'welcome'
        }
        //Send Email
        axios.post('http://localhost:3000/api/send-email', data)
        .then((response) => {
            console.log(response)
            res.send(200);
        })
  } catch ( error ) {
        console.log( error.detail );
        //Clean error message
        var cleanError = error.detail.match(/\(.*?\)/g);
        //Depending on error return whether email or username is already in use
        switch(cleanError[0]){
            case '(user_id)':
                console.log('Email already invalid');
                res.send(205);
                break;
            case '(username)':
                console.log('Username already invalid');
                res.send(206);
                break;
            default:
                break;
        }
  }
  
  };
