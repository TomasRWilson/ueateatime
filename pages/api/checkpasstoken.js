import conn from '../../lib/db'


export default async function Login(req, res) {
    var query = req.body.token;
    var value = [query]
    var current = new Date();
    //Check if token exists and retrieve relevant user and expiry
    const result = await conn.query('SELECT user_id, expiry FROM users WHERE pass_token = $1', value);
    console.log(result);
    //If rowCount = 0 then token does not exist
    if(result.rowCount > 0){
        const expiry = new Date(result.rows[0].expiry);
        //Check if token has expired
        if (expiry > current){
            current.setMinutes(current.getMinutes() + 10);
            value = [current, result.rows[0].user_id];
            //Remove token and expiry from database so token cannot be used again
            const update = await conn.query("UPDATE users SET expiry = $1 WHERE user_id = $2", value);
            console.log(update.command);
            //Return username to log user in
            res.send(result.rows[0].user_id);
        }
    }
    //Return error token is invalid for either reason
    else{
        res.send(205);
        console.log("Token has expired")
    }
    
}