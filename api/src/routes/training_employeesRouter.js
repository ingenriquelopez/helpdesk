const {Router } = require('express');
const training_employeesRouter = Router();

const { postTraining_Employee, getTraining_Employee, getEmployees_Of_Training } = require('../controllers/training_employees_Controller.js');
const { createToken, verifyToken } = require('../auth/auth.js');


/* employeesRouter.use( verifyToken ); */

training_employeesRouter.post('/',postTraining_Employee);
training_employeesRouter.get('/',getTraining_Employee);
training_employeesRouter.get('/:idt',getEmployees_Of_Training);

module.exports = training_employeesRouter;