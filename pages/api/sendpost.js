import conn from '../../lib/db'

export default async (req, res) => {
    try {
        console.log("req nom", req.body)
        const result = await conn.query(req.body.content);
        console.log( result );
  } catch ( error ) {
        console.log( error );
  }
  
  
  };
