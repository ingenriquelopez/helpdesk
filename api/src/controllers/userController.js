'use strict';
const express  = require('express');
const moment   = require('moment');
const SECRET   = process.env.SECRET;
const { User } = require('../db.js');
const jwt      = require('jsonwebtoken');
const secret   = process.env.SECRET;


const { 
        REACT_APP_EMAIL_SUPER_ADMIN, 
        REACT_APP_PASSWORD_SUPER_ADMIN, 
     } = process.env;


const loginByEmail = async(req,res)=> {
    const email_user = req.params.email;
    try {
        const response = await User.findOne( { 
            where: { email : email_user}
        } , (error,user)=> {
            if  (error) return res.status(500).send( {message: error})
        });

        if (response)  return  res.status(201).send(response);
        else 
            res.send('Email not found');
    } catch(error) { res.send( { message: error.message })}
}


const postUser = async (req,res) => {
     const newUser = {};

    newUser.userName = req.body.userName;
    newUser.email    = req.body.email;
    newUser.password = req.body.password;
    newUser.typeUser = req.body.typeUser;
    newUser.level    = req.body.level; 

     try {
        let user = await User.create( newUser);
        return res.status(200).send('successfull:');
    } catch (error) {
        return res.send(error.message);
    } 
}



const getUsers = async(req,res)=> {
    
    try {
        const users = await User.findAll(); 
        return res.status(200).send(users);
    } catch (error) {
        return res.send(error.message);
    }
}

const deleteUser = async(req,res)=> {
    const email_user = req.params.email;
    try {
        const response = await User.destroy( {
            where: {email: email_user}, force: true
        });
        return res.status(200).send('UserDeleted');
    } catch (error) {
        return res.send(error.message);
    }
}
const putUser = async(req, res)=> {
    const { userName,email,password,typeUser,level } = req.body;
    try {
        const response = await User.update( {
            userName,
            email,
            password,
            typeUser,
            level,
        }, { 
            where: { email }
            }
        );
        if (response) {
            return res.status(200).send("Update-Successful");
        }
    } catch (error) {
        return res.send(error.message);
    }
}

const getUserByEmail = async(req,res)=> {
    const email_user = req.params.email;
    
    try {
        const response = await User.findOne( { 
            where: { email : email_user}
        });
        if (response) return res.status(200).send(response)
            else res.send('User not found');
        
    } catch (error) 
        { 
            return res.send(error.message);
        }
}

const createToken =async (req,res)=> {
    const email_user = req.params.email;

    if (email_user === REACT_APP_EMAIL_SUPER_ADMIN ) {
        const newToken = jwt.sign({ email_user },SECRET ,{expiresIn: '7d' });
        return  res.status(201).send(newToken);
    } 

    try {
        const response = await User.findOne( { 
            where: { email : email_user}
        } , (error,user)=> {
            if  (error) return res.status(500).send( {message: error})
        });
        
        if (response) {
            const newToken = jwt.sign( {email_user },SECRET,{expiresIn: '7d' });
            return  res.status(201).send(newToken);
        }
        else res.send(response);
    } catch(error) { res.send( { message: error.message })}
}

const verification  = express.Router()

verification.use( (req, res, next)=> {
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
    
});

module.exports = {
    loginByEmail,
    postUser, 
    getUsers,
    deleteUser,
    putUser,
    getUserByEmail,
    createToken,
    verification,
}
