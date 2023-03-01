const { Router } = require('express');
const { postConfigService, getConfigService, getAllConfigService, deleteConfigService, putConfigService } = require('../controllers/configServiceController.js');

const configServiceOrderRouter = Router();

configServiceOrderRouter.post('/',postConfigService);
configServiceOrderRouter.get('/',getAllConfigService);
configServiceOrderRouter.get('/:doc',getConfigService);
configServiceOrderRouter.delete('/:doc',deleteConfigService);
configServiceOrderRouter.put('/',putConfigService);

module.exports = configServiceOrderRouter;