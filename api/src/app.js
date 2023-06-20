const cors         = require('cors');
const express      = require('express');
const fileUpload   = require('express-fileupload')

const taskRouter                = require('./routes/tasksRouter');
const userRouter                = require('./routes/usersRouter');
const classRoomRouter           = require('./routes/classRoomsRouter');
const configServiceOrderRouter  = require('./routes/configServiceOrderRouter');
const servicesRouter            = require('./routes/servicesRouter');
const filesRouter               = require('./routes/filesRouter');
const inventoryRouter           = require('./routes/inventoryRouter');
const trainingRouter            = require('./routes/trainingRouter');
const employeesRouter           = require('./routes/employeesRouter');
const training_employeesRouter  = require('./routes/training_employeesRouter');

const server = express();

server.use(cors());
server.use(express.json());
server.use(fileUpload( {
  createParentPath:true  
}));

server.use('/inventory',inventoryRouter); 
server.use('/task',taskRouter);
server.use('/user',userRouter);
server.use('/classRoom',classRoomRouter);
server.use('/services',servicesRouter);
server.use('/configServiceOrder',configServiceOrderRouter);
server.use('/serviceUpload',filesRouter);
server.use('/trainings',trainingRouter);
server.use('/employees',employeesRouter);
server.use('/trainingEmployee',training_employeesRouter);

module.exports = server;