const cors         = require('cors');
const express      = require('express');

const taskRouter                = require('./routes/tasksRouter');
const userRouter                = require('./routes/usersRouter');
const classRoomRouter           = require('./routes/classRoomsRouter');
const configServiceOrderRouter  = require('./routes/configServiceOrderRouter');
const servicesRouter            = require('./routes/servicesRouter');

const server = express();
server.use(cors());
server.use(express.json());

server.use('/task',taskRouter);
server.use('/user',userRouter);
server.use('/classRoom',classRoomRouter);
server.use('/configServiceOrder',configServiceOrderRouter);
server.use('/services',servicesRouter);

module.exports = server;