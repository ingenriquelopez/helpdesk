const {Router } = require('express');
const taskRouter = Router();

const { postTask, getTasks, deleteTask, putTask, getTask , putStatus, getStatus} = require('../controllers/taskController.js');
const { createToken, verifyToken } = require('../auth/auth.js');


taskRouter.get('/:levelReq',getTasks);

taskRouter.use( verifyToken );

taskRouter.post('/',postTask);
taskRouter.get('/:number',getTask);
taskRouter.delete('/:id',deleteTask)
taskRouter.put('/',putTask);
taskRouter.put('/status',putStatus);
taskRouter.get('/status/:number',getStatus);

module.exports = taskRouter;