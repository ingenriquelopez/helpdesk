const { Router } = require('express');
const filesRouter = Router();
const {fileToUpload} = require('../controllers/filesServiceController');

filesRouter.post('/',fileToUpload);

module.exports = filesRouter;