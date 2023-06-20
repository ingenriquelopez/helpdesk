'use strict';

const { Training_Employees } = require('../db.js');
const  CryptoJS = require("crypto-js");


// con este ENDPOINT insertamos un nuevo empleado en la tabla de enlace, despues de hacer checado que no estaba;



// Este EndPoint espera recibir el email y el codigo del curso en ese orden para buscarlo en la tabla de enlace
const getTraining_Employee = async(req,res)=> {
    const { employee_email, training_id } = JSON.parse(req.query.jsonData); // Convertir la cadena JSON en objeto
    
    console.log(employee_email);

     try {
        const response = await Training_Employees.findAll( 
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
    } 
};

module.exports = {
    getTraining_Employee,
}