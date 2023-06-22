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
         // Realiza la consulta *falta  el filtro de idt
        const response = await Training.findAll({
            where: {id: idt},
            include: [
                {
                     model: Employees,
                    through: { 
                        model: Trainings_Employees,
                        attributes: ['CheckIn', 'CheckOut'],
                     }, 
                },
            ],
        })
      return res.send(response);
    } catch (error) {
        console.log(error.message);
        return res.send(error);
    }

};


const putEmployees_Of_Training = async(req,res)=> {
    const {
            newCheckIn, 
            newCheckOut, 
            employee_email, 
            training_id,
        } = req.body;
    
        try {
            const response = await Trainings_Employees.update(
                {
                    CheckIn  : newCheckIn,
                    CheckOut : newCheckOut,
                },{
                    where: {
                        EmployeeEmail : employee_email,
                        TrainingId    : training_id,
                    }
                }
            );
            res.send(response);
        } catch (error) {
            console.log(error.message);
            res.send(error);
        }
}


module.exports = {
    postTraining_Employee,
    getTraining_Employee,
    getEmployees_Of_Training,
    putEmployees_Of_Training,
}