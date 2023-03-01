const { Task } = require('../db.js');
const { op } = require('sequelize');

const postTask = async (req,res) => {
    const newTask = { 
        classRoom,
        dateTask,
        level,
        gyg,
        problem,
        statusTask,
    } = req.body;
    try {
        let task = await Task.create( newTask);
        return res.status(200).send('successfull:');
    } catch (error) {
        return res.send(error.message);
    }
}

const getTasks = async(req,res)=> {
    let where = {};
    if (req.params.levelReq !=='Absolute') where.level = req.params.levelReq;

    try {
        const tasks = await Task.findAll(  {
            where
        }); 
        
        return res.status(200).send(tasks);
    } catch (error) {
        return res.send(error.message);
    }
}

const deleteTask = async(req,res)=> {
    const p_id = req.params.id;
    try {
        const response = await Task.destroy( {
            where: {id: p_id}, force: true
        });
        return res.status(200).send('RequestDeleted');
    } catch (error) {
        return res.send(error.message);
    }
}
const putTask = async(req, res)=> {
    
    const { id, number,classRoom,gyg,teacher,device,problem } = req.body;
    try {
        const response = await Task.update( {
            classRoom,
            gyg,
            level,
            teacher,
            device,
            problem    
        }, { 
            where: {number}
            }
        );
        if (response) {
            return res.status(200).send("Update-Successful");
        }
    } catch (error) {
        return res.send(error.message);
    }
}

const getTask = async(req,res)=> {
    const p_number = req.params.number;
    try {
        const response = await Task.findByPk( p_number );
        return res.status(200).send(response);
    } catch (error) {
        return res.send(error.message);
    }
}

module.exports = {
    postTask, 
    getTasks,
    deleteTask,
    putTask,
    getTask,
}