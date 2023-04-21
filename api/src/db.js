require('dotenv').config();
const { DB_DIALECT, DB_NAME, DB_USER, DB_PASSWORD, DB_HOST,DB_PORT} = process.env;

const {Sequelize }            = require('sequelize');
const modelTask               = require('./models/Task.js');
const modelUser               = require('./models/User.js');
const modelClassRoom          = require('./models/ClassRoom.js');
const modelService            = require('./models/Service');
const modelInventory          = require('./models/Inventory.js');
const modelConfigServiceOrder = require('./models/ConfigServiceOrder');


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
const { Task, User, ClassRoom, Service , Inventory, ConfigServiceOrder } = sequelize.models;
//-*-*-*-*-*-*-*-*-*-*-*-*-**-*-*-*----*


module.exports = {
  Task,User,ClassRoom,Service, Inventory, ConfigServiceOrder,
  db: sequelize,
}