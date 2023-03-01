const {Router } = require('express');
const { postClassRoom, getClassRooms, getAllClassRooms, deleteClassRoom, putClassRoom, getClassRoom } = require('../controllers/classRoomController.js');

const classRoomRouter = Router();

classRoomRouter.post('/',postClassRoom);
classRoomRouter.get('/:level',getClassRooms);
classRoomRouter.get('/:classRoom',getClassRoom);
classRoomRouter.get('/',getAllClassRooms);
classRoomRouter.delete('/:classRoom',deleteClassRoom)
classRoomRouter.put('/',putClassRoom);


module.exports = classRoomRouter;