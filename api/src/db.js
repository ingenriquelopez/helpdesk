require('dotenv').config();
const { DB_DIALECT, DB_NAME, DB_USER, DB_PASSWORD, DB_HOST,DB_PORT} = process.env;

const {Sequelize }            = require('sequelize');
const modelTask               = require('./models/Task.js');
const modelUser               = require('./models/User.js');
const modelClassRoom          = require('./models/ClassRoom.js');
const modelService            = require('./models/Service');
const modelInventory          = require('./models/Inventory.js');
const modelConfigServiceOrder = require('./models/ConfigServiceOrder');
const modelTraning            = require('./models/Training.js');
const modelEmployees          = require('./models/Employees.js');
const modelTrainingsEmployees = require('./models/ManyToMany/TraningsEmployees.js');


const sequelize = new Sequelize(`${DB_DIALECT}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, 
  { 
    logging: false,
    native:false
  }
  )

const authentication =  async()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
};
authentication();

//*-*-*-*-*-*-*-*-*-*-*-*-**-**-*-*--*-**
modelTask(sequelize);
modelUser(sequelize);
modelClassRoom(sequelize);
modelService(sequelize);
modelInventory(sequelize);
modelConfigServiceOrder(sequelize);
modelTraning(sequelize);
modelEmployees(sequelize);
modelTrainingsEmployees(sequelize);
const { Task, User, ClassRoom, Service , Inventory, ConfigServiceOrder , Training, Employees, TrainingsEmployees} = sequelize.models;
//-*-*-*-*-*-*-*-*-*-*-*-*-**-*-*-*----*
Training.belongsToMany( (Employee),{ through:{TrainingsEmployees}});
Employees.belongsToMany( Training),{ through:{TrainingsEmployees}});

module.exports = {
  Task,User,ClassRoom,Service, Inventory, ConfigServiceOrder,Training,Employees,
  db: sequelize,
}