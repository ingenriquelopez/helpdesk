const {Router } = require('express');
const { postTask, getTasks, deleteTask, putTask, getTask } = require('../controllers/taskController.js');

const taskRouter = Router();

taskRouter.post('/',postTask);
taskRouter.get('/:levelReq',getTasks);
taskRouter.get('/:number',getTask);
taskRouter.delete('/:id',deleteTask)
taskRouter.put('/',putTask);

module.exports = taskRouter;

//cel de claudia para monze = 833 15062 31