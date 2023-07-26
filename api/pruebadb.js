const DB_DIALECT  = "postgres";
const DB_NAME     = "helpdesk";
const DB_USER     = "postgres";
const DB_PASSWORD = "AWS-admin";
const DB_HOST     = "rds-helpdesk.c5772bzr3ccq.us-east-1.rds.amazonaws.com";
const DB_PORT     = 5432;
const PORT = 3001;

const cors         = require('cors');
const express      = require('express');
const server = express();

const {Sequelize }            = require('sequelize');


server.use(cors());

const sequelize = new Sequelize(`${DB_DIALECT}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, 
  { 
    logging: false,
    native:false,
  }
  )

sequelize.sync({ force: true })
  .then(()=>{    
    console.log("DataBase sync");
  }); 

server.listen(PORT,()=> {
    console.log(`Listening on port. ${PORT} `);
});


