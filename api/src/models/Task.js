const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        "Task",
        {
            id: {
                type: DataTypes.STRING,
            },
            number: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            dateTask: {
                type: DataTypes.DATE,
            },
            level: {
                type: DataTypes.ENUM(['PreSchool','Elementary','HighSchool','College', 'Global'])
            },
            classRoom: {
                type: DataTypes.STRING,
            },
            gyg: {
                type: DataTypes.STRING
            },
            teacher: {
                type: DataTypes.STRING
            },
            device: {
                type: DataTypes.STRING
            },
            problem: {
                type: DataTypes.STRING
            },
            statusTask: {
                type: DataTypes.ENUM( ['Required','Process','Completed','Rejected'])
            },
            notes: {
                type: DataTypes.TEXT
            },
            dateReview: {
                type: DataTypes.DATE
            },
            solution: {
                type: DataTypes.STRING
            },
            dateRejected: {
                type: DataTypes.DATE
            },
            reasonRejected: {
                type: DataTypes.TEXT
            },
            dateSolution: {
                type: DataTypes.DATE
            },
            orderService : {
                type: DataTypes.STRING
            },
          /*   orderMaterial: {
                type: DataTypes.STRING
            }, */
            
        }, {timestamps: false},
    )
}
