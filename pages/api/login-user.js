import conn from '../../lib/db'
const web3 = require('web3');
var BN = web3.utils.BN;
import axios from 'axios';

export default async (req, res) => {


    try {
        console.log("req nom", req.body)
        var expiry = new Date();
        expiry.setMinutes(expiry.getMinutes() + 10);
        var token = Math.floor(Math.random() * (9000000) + 1000000);
        token = web3.utils.sha3(new BN(token.toString()));
        const values1 = [token, expiry, req.body.email, req.body.password];
        const values2 = [req.body.email, req.body.password];
        const insert = await conn.query('UPDATE users SET token = $1, expiry = $2 WHERE email = $3 AND password = $4', values1);
        console.log(insert);
        if(insert.rowCount == 0){
            res.send(205);
        }else{
            const result = await conn.query('SELECT firstname FROM users WHERE email = $1 AND password = $2', values2);
            console.log( result );

            const data = {
                email: req.body.email,
                name: result.rows[0].firstname,
                token: token
            }
            console.log(result.rows);
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