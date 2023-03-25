import conn from '../../lib/db'


export default async function Login(req, res) {
    var query = req.body.token;
    var value = [query];
    var current = new Date();
    //Check if token exists and retrieve expiry
    const result = await conn.query('SELECT expiry FROM users WHERE pass_token = $1', value);
    console.log(result);
    //If rowCount = 0 then token does not exist
    if(result.rowCount > 0){
        const expiry = new Date(result.rows[0].expiry);
        //Check if token has expired
        if (expiry > current){
            value = [req.body.password, req.body.user_id];
            //Remove token and expiry from database so token cannot be used again and change password
            const update = await conn.query("UPDATE users SET password = $1, pass_token = null, expiry = null WHERE user_id = $2", value);
            console.log(update.command);
            //Return status
            console.log('user: '+req.body.user_id+"'s password has been changed");
            res.send(200);
        }
    }else{
        //Return error token is invalid for either reason
        res.send(205);
    }
    
}