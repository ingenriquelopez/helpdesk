const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        "Service",
        {
            id: {
                type: DataTypes.STRING,
            },
            number: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            document: {
                type: DataTypes.STRING,
            },
            title: {
                type: DataTypes.STRING,
            },
            date: {
                type: DataTypes.DATE,
            },
            requester: {
                type: DataTypes.STRING
            },
            position: {
                type: DataTypes.STRING
            },
            
            department: {
                type: DataTypes.STRING
            },
            serviceReq: {
                type: DataTypes.STRING
            },
            observations: {
                type: DataTypes.STRING
            },
            vobo: {
                type: DataTypes.STRING,
            },
            responsable: {
                type: DataTypes.STRING,
            },
            accordance: {
                type: DataTypes.STRING,
            },
            serviceStatus: {
                type: DataTypes.ENUM( ['Required','Done','Rejected', 'Canceled'])
            },
            dateDone: {
                type: DataTypes.DATE,   
            },
            dateCancel: {
                type: DataTypes.DATE,   
            },
            level: {
                type: DataTypes.ENUM(['PreSchool','Elementary','HighSchool','College', 'Global'])
            },
            numberTask: {
                type: DataTypes.INTEGER,
            }
        }, {timestamps: false},
    )
}
