const {Router } = require('express');
const { loginByEmail,postUser, getUsers, deleteUser, putUser, getUserByEmail } = require('../controllers/userController.js');
const { createToken, verifyToken } = require('../auth/auth.js');
const userRouter = Router();


userRouter.get('/login/:email',loginByEmail);
userRouter.get('/login/gettoken/:email',createToken);

userRouter.use( verifyToken );

userRouter.post('/',postUser);
userRouter.delete('/:email',deleteUser)
userRouter.put('/',putUser);
userRouter.get('/',getUsers);
userRouter.get('/:email',getUserByEmail);

module.exports = userRouter;