const { Router } = require('express');
const filesRouter = Router();
const {fileUpload} = require('../controllers/filesServiceController');

filesRouter.post('/',fileUpload);

module.exports = filesRouter;