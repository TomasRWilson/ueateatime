import conn from '../../lib/db'
import { useContext} from 'react';
import { UserContext } from 'lib/UserContext';

export default async function Login(req, res) {

    //const [user, setUser] = useContext(UserContext);

    var query = req.body.token;
    var value = [query]
    var current = new Date();
    const result = await conn.query('SELECT username, expiry FROM users WHERE token = $1', value);
    console.log(result);
    if(result.rowCount > 0){
        const expiry = new Date(result.rows[0].expiry);
        if (expiry > current){
            value = [result.rows[0].username];
            const update = await conn.query("UPDATE users SET token = null, expiry = null WHERE username = $1", value);
            console.log(update.command);
            //setUser(result.rows[0].username)
            res.send(200);
            console.log('user: '+result.rows[0].username+' is logged in');
        }
    }
    res.send(205);
    console.log("Token has expired")
    
}