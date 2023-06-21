const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define (
        "Trainings_Employees",
        {   
            id: {
                type: DataTypes.INTEGER,
                autoIncrement : true,
                primaryKey    : true,
                allowNull     : false,
            },
            CheckIn: {
                type          : DataTypes.TIME,
                allowNull     : false,
            },
            CheckOut: {
                type          : DataTypes.TIME,
                allowNull     : false,
            },
        }
    )
}
