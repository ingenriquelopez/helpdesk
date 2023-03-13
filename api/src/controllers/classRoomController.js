const { ClassRoom } = require('../db.js');
const { op } = require('sequelize');

const postClassRoom = async (req,res) => {
    
    const newClassRoom = { 
        classRoom,
        level,
        gyg,
        campus,
        floor,
    } = req.body;

    try {
        let classRoom = await ClassRoom.create( newClassRoom);
        return res.status(200).send('successfull:');
    } catch (error) {
        return res.send(error.message);
    }
}

const getClassRooms = async(req,res)=> {
    const level = req.params.level;
  
    try {
        const classRooms = await ClassRoom.findAll( { 
            where: {level}
        }); 
        console.log("GETCLASSROOMS.. LINEA 25:", classRooms)
        return res.status(200).send(classRooms);
    } catch (error) {
        return res.send(error.message);
    }
}

const getAllClassRooms = async(req,res)=> {
    try {
        const classRooms = await ClassRoom.findAll(); 
        return res.status(200).send(classRooms);
    } catch (error) {
        return res.send(error.message);
    }
}
const getClassRoom = async(req,res)=> {
    const classRoom = req.params.classRoom;
    try {
        const response = await ClassRoom.findByPk( classRoom );
        return res.status(200).send(response);
    } catch (error) {
        return res.send(error.message);
    }
}


const deleteClassRoom = async(req,res)=> {
    const classRoom = req.params.classRoom;
    try {
        const response = await ClassRoom.destroy( {
            where: {classRoom}, force: true
        });

        return res.status(200).send('ClassRoomDeleted');
    } catch (error) {
        return res.send(error.message);
    }
}
const putClassRoom = async(req, res)=> {
    const { classRoom, gyg, level, campus, floor  } = req.body;
    try {
        const response = await ClassRoom.update( {
            gyg,
            level,
            campus, 
            floor,
        }, { 
            where: {classRoom}
            }
        );
        if (response) {
            return res.status(200).send("Update-Successful");
        }
    } catch (error) {
        return res.send(error.message);
    }
}


module.exports = {
    postClassRoom, 
    getClassRooms,
    getAllClassRooms,
    deleteClassRoom,
    putClassRoom,
    getClassRoom,
}