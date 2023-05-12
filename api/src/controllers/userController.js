'use strict';


const { User } = require('../db.js');
const  CryptoJS = require("crypto-js");


const { 
        REACT_APP_EMAIL_SUPER_ADMIN, 
        REACT_APP_PASSWORD_SUPER_ADMIN, KEY_CRYPTO_SECRET,
     } = process.env;


const loginByEmail = async(req,res)=> {
    const email_user = req.params.email;
    
    try {
        const response = await User.findOne( { 
            where: { email : email_user}
        });
        if (response)  return  res.status(200).send(response);
        else 
            res.send('Email not found');
    } catch(error) { res.send( { message: error.message })}
}


const postUser = async (req,res) => {
    const newUser = {};
    let cryptoPass = CryptoJS.AES.encrypt(JSON.stringify(req.body.password.trim()), KEY_CRYPTO_SECRET).toString();
    
    newUser.userName = req.body.userName;
    newUser.email    = req.body.email;
    newUser.password = cryptoPass;
    newUser.typeUser = req.body.typeUser;
    newUser.level    = req.body.level; 
    

     try {
        let user = await User.create( newUser);
        if (user) {
            return res.status(200).send('successfull:');
        }
        return user;
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
    let cryptoPass = CryptoJS.AES.encrypt(JSON.stringify(req.body.password.trim()), KEY_CRYPTO_SECRET).toString();
    try {
        const response = await User.update( {
            userName,
            email,
            password:cryptoPass,
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


module.exports = {
    loginByEmail,
    postUser, 
    getUsers,
    deleteUser,
    putUser,
    getUserByEmail,
}
