const SECRET   = process.env.SECRET;
const {REACT_APP_EMAIL_SUPER_ADMIN }= process.env;
const { User } = require('../db.js');
const jwt      = require('jsonwebtoken');

const createToken =async (req,res)=> {
    const email_user = req.params.email;
  
    if (email_user === REACT_APP_EMAIL_SUPER_ADMIN ) {
        const newToken = jwt.sign({ email_user },SECRET ,{expiresIn: '7d' });
        return  res.status(201).send(newToken);
    } 
    try {
        const response = await User.findOne( { 
            where: { email : email_user}
        });
        
        if (response) {
            const newToken = jwt.sign( {email_user },SECRET,{expiresIn: '7d' });
            return  res.status(201).send(newToken);
        }
        else res.send(response);
    } catch(error) { res.send( { message: error.message })}
}


const verifyToken =async(req, res, next)=> {
    let tokenR = req.headers['x-access-token'] || req.headers['authorization']
    
    if (!tokenR) {
        res.status(401).send( {
            error: "Es necesario un tokencito"
        })
        return;
    }
    if (tokenR.startsWith('Bearer ')) {
        let token = tokenR.split(" ")[1]
        if (token) {
            jwt.verify(token,SECRET,(error, decoded)=> {
                if (error) {
                    return res.json( 
                        { message:"El token NO es valido!" }
                    )
                } else {
                    req.decoded = decoded;
                    next();
                }
            })
        }
        
    }
}


module.exports = {
    createToken,
    verifyToken,
}