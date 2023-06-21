'use strict';

const { Trainings_Employees, Training, Employees } = require('../db.js');
const { Op } = require('sequelize');
const  CryptoJS = require("crypto-js");


// con este ENDPOINT insertamos un nuevo empleado en la tabla de enlace, despues de hacer checado que no estaba;
const postTraining_Employee = async(req,res) => {
    const data = req.body;
    
    try {
        const response = await Trainings_Employees.create(data);
        res.send(response);
    } catch (error) {
        console.log(error.message);
        res.send(error);
    }
}

// Este EndPoint espera recibir el email y el codigo del curso en ese orden para buscarlo en la tabla de enlace
const getTraining_Employee = async(req,res)=> {
    const { employee_email, training_id } = JSON.parse(req.query.jsonData); // Convertir la cadena JSON en objeto

     try {
        const response = await Trainings_Employees.findOne(
             { 
                where: { 
                    [Op.and]: [
                        { EmployeeEmail: employee_email },
                        { TrainingId   : training_id}
                    ]
                }
            } 
         ); 
         
        return res.send(response);
    } catch (error) {
        console.log(error.message);
        res.send(error)
    } 
};


//con este ednpoint recibimos el id del training, y regresara todos los empleados registrados en este training
const getEmployees_Of_Training = async(req,res)=> {
    const idt = req.params.idt;

    try {
        /* const response = await Training.findAll(
            { where: {id:idt},
            
                include: [
                    {
                        model    : Employees,
                        throught : Trainings_Employees,
                    }
                ]
            } */
            
            
        /* ) */
        const response2 = await Trainings_Employees.findAll(
            {
                attributes: ['TrainingId', 'EmployeeEmail','CheckIn','CheckOut'],
                include: [
                    {
                    Employees,
                    Training,
                    }
                ]
            }
        )
        console.log(response2)
        return res.send(response2)
    } catch (error) {
        console.log(error)
    }

     /* try {
        const response = await Trainings_Employees.findAll(
             { 
                where: { 
                    [Op.and]: [
                        { TrainingId   : idt}
                    ]
                }
            } , {include: Employees}
         ); 
         
        return res.send(response);
    } catch (error) {
        console.log(error.message);
        res.send(error)
    }  */
};

module.exports = {
    postTraining_Employee,
    getTraining_Employee,
    getEmployees_Of_Training,
}