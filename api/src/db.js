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
const modelTrainings_Employees = require('./models/ManyToMany/Trainings_Employees.js');


console.log(DB_DIALECT)
/* const sequelize = new Sequelize(`${DB_DIALECT}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,  */
const sequelize = new Sequelize(`postgres://postgres:AWS-admin@$rds-helpdesk.c5772bzr3ccq.us-east-1.rds.amazonaws.com:5432/helpdesk`, 
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
modelTrainings_Employees(sequelize);

const { Task, User, ClassRoom, Service , Inventory, ConfigServiceOrder , Training, Employees, Trainings_Employees} = sequelize.models;

//-*-*-*-*-*-*-*-*-*-*-*-*-**-*-*-*----*
Training.belongsToMany( Employees,{ through:Trainings_Employees } ); 
Employees.belongsToMany( Training,{ through:Trainings_Employees } ); 
Training.hasOne(Trainings_Employees) ;
Trainings_Employees.belongsTo(Training);

module.exports = {
    Task,
    User,
    ClassRoom,
    Service, 
    Inventory, 
    ConfigServiceOrder,
    Training,
    Employees,
    Trainings_Employees,
  db: sequelize,
}