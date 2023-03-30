const cors         = require('cors');
const express      = require('express');
const fileUpload   = require('express-fileupload')


const taskRouter                = require('./routes/tasksRouter');
const userRouter                = require('./routes/usersRouter');
const classRoomRouter           = require('./routes/classRoomsRouter');
const configServiceOrderRouter  = require('./routes/configServiceOrderRouter');
const servicesRouter            = require('./routes/servicesRouter');
const filesRouter               = require('./routes/filesRouter');

const server = express();
server.use(cors());
server.use(express.json());
server.use(fileUpload( {
  createParentPath:true  
}));

server.use('/task',taskRouter);
server.use('/user',userRouter);
server.use('/classRoom',classRoomRouter);
server.use('/configServiceOrder',configServiceOrderRouter);
server.use('/services',servicesRouter);
server.use('/serviceUpload',filesRouter);

module.exports = server;