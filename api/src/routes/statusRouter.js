const { Router } = require('express');
const { putStatus, getStatus } = require('../controllers/statusController.js');

const statusRouter = Router();

statusRouter.put('/',putStatus);
statusRouter.get('/:number',getStatus);

module.exports = statusRouter;