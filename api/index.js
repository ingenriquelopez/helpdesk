require('dotenv').config();
const {PORT}= process.env;


const server    = require('./src/app.js');
const { db } = require('./src/db.js');

db.sync({ force: false })
  .then(()=>{    
    console.log("DataBase sync");
  });

server.listen(PORT,()=> {
    console.log(`Listening on port. ${PORT} `);
});
