const { Router } = require('express');
const trainingRouter = Router();
const { createToken, verifyToken } = require('../auth/auth.js');
const { postTraining, deleteTraining, getTraining, getTrainings, putTraining} = require('../controllers/trainingController.js');

trainingRouter.use( verifyToken );

trainingRouter.post('/',postTraining);
trainingRouter.put('/',putTraining);
trainingRouter.delete('/:id',deleteTraining);
trainingRouter.get('/:id', getTraining);
trainingRouter.get('/',getTrainings)

module.exports = trainingRouter;