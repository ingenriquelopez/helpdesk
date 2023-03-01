const {Router } = require('express');
const { postService, getServices, deleteService, putService, getService } = require('../controllers/serviceController.js');

const serviceRouter = Router();

serviceRouter.post('/',postService);
serviceRouter.get('/number/:number',getService);
serviceRouter.get('/level/:levelReq',getServices);
serviceRouter.delete('/:id',deleteService)
serviceRouter.put('/',putService);

module.exports = serviceRouter;