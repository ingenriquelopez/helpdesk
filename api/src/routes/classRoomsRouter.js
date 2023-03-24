const {Router } = require('express');
const { postClassRoom, getClassRooms, getAllClassRooms, deleteClassRoom, putClassRoom, getClassRoom } = require('../controllers/classRoomController.js');
const { verifyToken } = require('../auth/auth.js');
const classRoomRouter = Router();

classRoomRouter.get('/',getAllClassRooms);

classRoomRouter.use( verifyToken );

classRoomRouter.post('/',postClassRoom);
classRoomRouter.get('/:level',getClassRooms);
classRoomRouter.get('/:classRoom',getClassRoom);
classRoomRouter.delete('/:classRoom',deleteClassRoom)
classRoomRouter.put('/',putClassRoom);


module.exports = classRoomRouter;