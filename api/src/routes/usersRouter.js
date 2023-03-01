const {Router } = require('express');
const { postUser, getUsers, deleteUser, putUser, getUserByEmail } = require('../controllers/userController.js');

const userRouter = Router();

userRouter.post('/',postUser);
userRouter.delete('/:email',deleteUser)
userRouter.put('/',putUser);
userRouter.get('/',getUsers);
userRouter.get('/:email',getUserByEmail);

module.exports = userRouter;