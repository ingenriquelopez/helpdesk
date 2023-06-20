const {Router } = require('express');
const training_employeesRouter = Router();

const { getTraining_Employee } = require('../controllers/training_employees_Controller.js');
const { createToken, verifyToken } = require('../auth/auth.js');


/* employeesRouter.use( verifyToken ); */

training_employeesRouter.get('/',getTraining_Employee);

module.exports = training_employeesRouter;