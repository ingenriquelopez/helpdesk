const { Router } = require('express');
const inventoryRouter = Router();

const { postDeviceInventory      , getOneInventory, 
        getDeviceInventory       , getAllInventory, 
        deleteDeviceInventory    , putDeviceInventory, 
        putStatusDeviceInventory , getStatusDeviceInventory } = require('../controllers/inventoryController.js');

const { createToken, verifyToken } = require('../auth/auth.js');

/* inventoryRouter.use( verifyToken );  */

inventoryRouter.post('/',postDeviceInventory);
inventoryRouter.put('/',putDeviceInventory);
inventoryRouter.get('/',getAllInventory);

inventoryRouter.get('/code/:internalCode',getOneInventory);
inventoryRouter.delete('/code/:internalCode',deleteDeviceInventory)

inventoryRouter.get('/device/:device',getDeviceInventory);

inventoryRouter.put('/status',putStatusDeviceInventory);
inventoryRouter.get('/status/',getStatusDeviceInventory);

module.exports = inventoryRouter;