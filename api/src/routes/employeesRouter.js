const {Router } = require('express');
const employeesRouter = Router();

const { loginByEmail,postEmployees, getEmployees, deleteEmployees, putEmployees, getEmployeeByEmail } = require('../controllers/employeesController.js');
const { createToken, verifyToken } = require('../auth/auth.js');


employeesRouter.get('/login/:email',loginByEmail);
employeesRouter.get('/login/gettoken/:email',createToken);

employeesRouter.use( verifyToken );

employeesRouter.post('/',postEmployees);
employeesRouter.delete('/:email',deleteEmployees)
employeesRouter.put('/',putEmployees);
employeesRouter.get('/',getEmployees);
employeesRouter.get('/:email',getEmployeeByEmail);

module.exports = employeesRouter;