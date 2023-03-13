const {Router } = require('express');
const { validateToken,loginByEmail,postUser, getUsers, deleteUser, putUser, getUserByEmail } = require('../controllers/userController.js');

const userRouter = Router();

userRouter.get('/login/:email',loginByEmail);
userRouter.post('/',validateToken,postUser);
userRouter.delete('/:email',validateToken,deleteUser)
userRouter.put('/',validateToken,putUser);
userRouter.get('/',validateToken,getUsers);
userRouter.get('/:email',validateToken,getUserByEmail);

module.exports = userRouter;