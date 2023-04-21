'use strict';

const { Inventory } = require('../db.js');

const postDeviceInventory = async (req,res) => {
    
    res.send('holi1')
}

const putDeviceInventory = async (req,res) => {
    return res.send('holi2')
}

const getOneInventory = async (req,res) => {
    return res.send('holi3')
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