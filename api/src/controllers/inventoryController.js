'use strict';

const { Inventory } = require('../db.js');

const postDeviceInventory = async (req,res) => {
    const newDeviceToInventory = {
        internalCode: req.body.internalCode ,
        serial      : req.body.serial,
        device      : req.body.device,
        trade       : req.body.trade,
        model       : req.body.model,
        color       : req.body.color,
        room        : req.body.room,
        userDevice  : req.body.userDevice,
        docRes      : req.body.docRes,
        docCom      : req.body.docCom,
        lastRevision: req.body.lastRevision,
        note        : req.body.note,
        checkedBy   : req.body.checkedBy,
        status      : req.body.status,
    }
    try {
        const response = await Inventory.create ( newDeviceToInventory );
        return res.satus(200).send(response);
    } catch (error) {
        return res.send(error.message)
    }
}

const putDeviceInventory = async (req,res) => {
    return res.send('holi2')
}

const getOneInventory = async (req,res) => {
    const codeToSearch = req.params.internalCode;
    try {
        const response = await Inventory.findByPk(codeToSearch);
        return res.send(response)
    }  catch(error) {
        console.log(error.message);
        return res.send(error.message);
    }
}

const getDeviceInventory = async (req,res) => {
    return res.send('holi4')
}

const getAllInventory = async (req,res) => {
    try {
        const allInventory = await Inventory.findAll();   
        return res.status(200).send(allInventory);
    } catch (error) {
        return res.send(error.message);
    }
}

const deleteDeviceInventory = async (req,res) => {
    return res.send('holi5')
}

const putStatusDeviceInventory = async (req,res) => {
    return res.send('holi6')
}

const getStatusDeviceInventory = async (req,res) => {
    return res.send('holi7')
}



module.exports = {
   postDeviceInventory,
   putDeviceInventory,
   getOneInventory,
   getDeviceInventory,
   getAllInventory,
   deleteDeviceInventory,
   putStatusDeviceInventory,
   getStatusDeviceInventory,
}