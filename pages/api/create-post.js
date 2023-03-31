import conn from '../../lib/db'
import axios from 'axios';

export default async (req, res) => {

    try {
        console.log("req nom", req.body)
        //Get current date for date created
        var created = new Date();
        const values = [req.body.title, req.body.summary, req.body.body, created, req.body.userid];
        //Add new token and expiry to users account
        const result = await conn.query('INSERT INTO posts (title, summary, body, created_at, modified_at, user_id) VALUES ($1, $2, $3, $4, $4, $5)', values);
        console.log(result);
        //Construct email information
  } catch ( error ) {
        console.log( error.detail );
  }
  
  };