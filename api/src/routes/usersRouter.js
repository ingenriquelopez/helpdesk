const {Router } = require('express');
const { loginByEmail,createToken, postUser, getUsers, deleteUser, putUser, getUserByEmail, verification } = require('../controllers/userController.js');
const userRouter = Router();


userRouter.get('/login/:email',loginByEmail);
userRouter.get('/login/gettoken/:email',createToken);
userRouter.post('/',verification,postUser);
userRouter.delete('/:email',verification,deleteUser)
userRouter.put('/',verification,putUser);
userRouter.get('/',verification,getUsers);
userRouter.get('/:email',verification,getUserByEmail);

module.exports = userRouter;