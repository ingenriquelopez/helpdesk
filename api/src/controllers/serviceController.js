const { Service } = require('../db.js');
const { op } = require('sequelize');

const postService = async (req,res) => {
    const newService = { 
        number   ,  title    ,  date,
        requester,  position ,  department,
        serviceReq,
        observations,
        vobo,
        responsable,
        accordance,
        serviceStatus,
        dateDone,
        level,
        numberTask,
    } = req.body;
    
    try {
        let ser = await Service.create( newService, {returning: number});
        return res.status(200).send(ser);
    } catch (error) {
        console.log(error.message)
        return res.send(error.message);
    }
}

const getServices = async(req,res)=> {
    let where = {};
    if (req.params.levelReq !=='Absolute') where.level = req.params.levelReq;

    try {
        const services = await Service.findAll(
            {
              where, order:[ ['number','ASC']]
            }
        ); 
        return res.status(200).send(services);
    } catch (error) {
        return res.send(error.message);
    }
}

const deleteService = async(req,res)=> {
    const p_id = req.params.id;
    try {
        const response = await Service.destroy( {
            where: {id: p_id}, force: true
        });
        return res.status(200).send('Service Deleted');
    } catch (error) {
        return res.send(error.message);
    }
}
const putService = async(req, res)=> {
    const { 
            number,
            serviceStatus,
            dateDone,
            dateCancel,
            } = req.body;
            
    try {
        const response = await Service.update( {
            serviceStatus,
            dateDone,
            dateCancel,
        }, { 
            where: {number}
            }
        );
        if (response) return res.status(200).send("Update-Successful");
    } catch (error) {
        return res.send(error.message);
    }
}

const getService = async(req,res)=> {
    const p_number = req.params.number;
    try {
        const response = await Service.findByPk( p_number );
        return res.status(200).send(response);
    } catch (error) {
        return res.send(error.message);
    }
}

module.exports = {
    postService, 
    getServices,
    deleteService,
    putService,
    getService,
}