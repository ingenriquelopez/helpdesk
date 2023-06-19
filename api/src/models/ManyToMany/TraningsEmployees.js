
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        "TrainingsEmployees",
        {   CheckIn: {
                type: DataTypes.TIME,
                allowNull: false,
            },
            CheckOut: {
                type: DataTypes.TIME,
                allowNull: false,
            },
        }
    )
}
