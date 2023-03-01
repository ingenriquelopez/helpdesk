const { User } = require('../db.js');
const { op } = require('sequelize');

const postUser = async (req,res) => {
    const newUser = { 
        userName,
        email,
        password,
        typeUser,
        level,
    } = req.body;
    
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
    postUser, 
    getUsers,
    deleteUser,
    putUser,
    getUserByEmail,
}
