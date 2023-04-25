const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        "Inventory",
        {
            device: {
                type: DataTypes.STRING,
            },
            internalCode: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            serial: {
                type: DataTypes.STRING,
            },
            trade: {
                type: DataTypes.STRING,
            },
            model: {
                type: DataTypes.STRING,
            },
            color: {
                type: DataTypes.STRING,
            },
            room: {
                type: DataTypes.STRING,
            },
            userDevice: {
                type: DataTypes.STRING
            },
            docRes: {
                type: DataTypes.STRING
            },
            docCom: {
                type: DataTypes.STRING
            },
            status: {
                type: DataTypes.ENUM(['Operating','loaned','Review','Repair','Cancel'])
            },
            note: {
                type: DataTypes.STRING
            },
            checkedBy: {
                type: DataTypes.STRING
            },
            lastRevision: {
                type: DataTypes.DATE
            },
            
        }, {timestamps: true},
    )
}
