const {Router } = require('express');
const { loginByEmail,createToken, postUser, getUsers, deleteUser, putUser, getUserByEmail } = require('../controllers/userController.js');
const userRouter = Router();


userRouter.get('/login/:email',loginByEmail);
userRouter.get('/login/gettoken/:email',createToken);
userRouter.post('/',postUser);
userRouter.delete('/:email',deleteUser)
userRouter.put('/',putUser);
userRouter.get('/',getUsers);
userRouter.get('/:email',getUserByEmail);

module.exports = userRouter;