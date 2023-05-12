'use strict';

const { Employees } = require('../db.js');
const  CryptoJS = require("crypto-js");

const { 
        REACT_APP_EMAIL_SUPER_ADMIN, 
        REACT_APP_PASSWORD_SUPER_ADMIN, KEY_CRYPTO_SECRET,
     } = process.env;


const loginByEmail = async(req,res)=> {
    const email_employee = req.params.email;
    
    try {
        const response = await Employees.findOne( { 
            where: { email : email_employee}
        });
        if (response)  return  res.status(200).send(response);
        else 
            res.send('Email not found');
    } catch(error) { res.send( { message: error.message })}
}


const postEmployees = async (req,res) => {
    const newEmployee = {};
    /* let cryptoPass = CryptoJS.AES.encrypt(JSON.stringify(req.body.password.trim()), KEY_CRYPTO_SECRET).toString(); */
    
    newEmployee.numEmployee  = parseInt(req.body.numEmployee);
    newEmployee.name         = req.body.name;
    newEmployee.genere       = req.body.genere;
    newEmployee.email        = req.body.email;
    /* newPersonal.password = cryptoPass; */
    newEmployee.level        = req.body.level; 
    newEmployee.department   = req.body.department; 
    
     try {
        let employee = await Employees.create( newEmployee);
        if (employee) {
            return res.status(200).send('successfull');
        }
    } catch (error) {
        console.log(error.message)
        return res.send(error.message);
    } 
}


const getEmployees = async(req,res)=> {
    try {
        const employee = await Employees.findAll(); 
        console.log(employee)

        return res.status(200).send(employee);
    } catch (error) {
        return res.send(error.message);
    }
}

const deleteEmployees = async(req,res)=> {
    const email_employee = req.params.email;
    try {
        const response = await Employees.destroy( {
            where: {email: email_employee}, force: true
        });
        return res.status(200).send('Employee Deleted');
    } catch (error) {
        return res.send(error.message);
    }
}

const putEmployees = async(req, res)=> {
    const { numEmployee, name, email, genere,level,department } = req.body;
    /* let cryptoPass = CryptoJS.AES.encrypt(JSON.stringify(req.body.password.trim()), KEY_CRYPTO_SECRET).toString(); */
    try {
        const employee = await Employees.update( {
            name,
            email,
            /* password:cryptoPass, */
            genere,
            email,
            level,
            department,
        }, { 
            where: { email }
            }
        );
        if (employee) {
            return res.status(200).send("Update-Successful");
        }
    } catch (error) {
        return res.send(error.message);
    }
}

const getEmployeeByEmail = async(req,res)=> {
    const email_employee = req.params.email;
    try {
        const employee = await Employees.findOne( { 
            where: { email : email_employee}
        });
        if (employee) return res.status(200).send(employee)
            else res.send('Employee not found');
        
    } catch (error) 
        { 
            return res.send(error.message);
        }
}


module.exports = {
    loginByEmail,
    postEmployees, 
    getEmployees,
    deleteEmployees,
    putEmployees,
    getEmployeeByEmail,
}
