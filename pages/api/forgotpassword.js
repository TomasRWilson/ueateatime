import conn from '../../lib/db'
const web3 = require('web3');
var BN = web3.utils.BN;
import axios from 'axios';

export default async (req, res) => {


    try {
        console.log("req nom", req.body)
        //Create expiry time for 10 mins from now
        var expiry = new Date();
        expiry.setMinutes(expiry.getMinutes() + 10);
        //Create token between 10000000 and 99999999 and hash it
        var token = Math.floor(Math.random() * (9000000) + 1000000);
        token = web3.utils.sha3(new BN(token.toString()));
        const values1 = [token, expiry, req.body.email];
        const values2 = [req.body.email];
        //Add new token and expiry to users account
        const insert = await conn.query('UPDATE users SET pass_token = $1, expiry = $2 WHERE email = $3', values1);
        console.log(insert);
        //If rowCount = 0 user does not exist
        if(insert.rowCount == 0){
            res.send(205);
        }else{
            //Retrieve firstname of user to add to email
            const result = await conn.query('SELECT firstname FROM users WHERE email = $1', values2);
            console.log( result );
            //Construct email information
            const data = {
                email: req.body.email,
                subject: "Tea Time password reset request",
                name: result.rows[0].firstname,
                token: token,
                type: 'pass'
            }
            console.log(result.rows);
            //Send Email
            axios.post('http://localhost:3000/api/send-email', data)
            .then((response) => {
                console.log(response)
                res.send(200);
            })
        }
  } catch ( error ) {
        console.log( error );
  }
  
  };