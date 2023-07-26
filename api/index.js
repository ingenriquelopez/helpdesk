require('dotenv').config();
const {PORT}= process.env;

const server    = require('./src/app.js');
const { db } = require('./src/db.js');


db.sync({ force: true })
  .then(()=>{    
    console.log("DataBase sync");
  });

server.listen(3001,()=> {
    console.log(`Listening on port. ${3001} `);
});
