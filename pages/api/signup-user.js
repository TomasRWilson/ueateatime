import conn from '../../lib/db'
const web3 = require('web3');
var BN = web3.utils.BN;
import axios from 'axios';
import { useRouter } from 'next/router';

export default async (req, res) => {

    try {
        console.log("req nom", req.body)
        var token = Math.floor(Math.random() * (9000000) + 1000000);
        token = web3.utils.sha3(new BN(token.toString()));
        var expiry = new Date();
        expiry.setMinutes(expiry.getMinutes() + 10);
        const values = [req.body.email, req.body.username, req.body.firstname, req.body.lastname, req.body.email, req.body.password, token, expiry]
        const result = await conn.query('INSERT INTO users (user_id, username, firstname, lastname, email, password, token, expiry) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', values);
        console.log(result);
        const data = {
            email: req.body.email,
            name: req.body.firstname,
            token: token
        }
        axios.post('http://localhost:3000/api/send-email', data)
        .then((response) => {
            console.log(response)
            res.send(200);
        })
  } catch ( error ) {
        console.log( error.detail );
        var cleanError = error.detail.match(/\(.*?\)/g);
        switch(cleanError[0]){
            case '(user_id)':
                console.log('Email already in use');
                res.send(205);
                break;
            case '(username)':
                console.log('Username already in use');
                res.send(206);
                break;
            default:
                break;
        }
  }
  
  };
