'use strict';

const moment = require('moment');
const SECRET  = process.env.SECRET;

const { User } = require('../db.js');

const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;




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

const createToken =async (req,res)=> {
    const email_user = req.params.email;
    try {
        const response = await User.findOne( { 
            where: { email : email_user}
        } , (error,user)=> {
            if  (error) return res.status(500).send( {message: error})
        });
        
        if (response) {
            const newToken = jwt.sign(email_user,SECRET);
            return  res.status(201).send(newToken);
        }
        else res.send(response);
    } catch(error) { res.send( { message: error.message })}
}

//response.token = service.createToken(response)

const postUser = async (req,res) => {
    console.log(req.body)
     const newUser = {};

    newUser.userName = req.body.userName;
    newUser.email    = req.body.email;
    newUser.password = req.body.password;
    newUser.typeUser = req.body.typeUser;
    newUser.level    = req.body.level; 


    /* const newUser = { 
        userName,
        email,
        password,
        typeUser,
        level,
    } = req.body;
     */

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
        return res.status(200).send('UsertDeleted');
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

module.exports = {
    loginByEmail,
    createToken,
    postUser, 
    getUsers,
    deleteUser,
    putUser,
    getUserByEmail,
}
