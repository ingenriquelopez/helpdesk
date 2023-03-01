const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        "ConfigServiceOrder",
        {
            document: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
            },
            requester: {
                type: DataTypes.STRING,
            },

            vobo: {
                type: DataTypes.STRING
            },
            responsable: {
                type: DataTypes.STRING
            },
        }, {timestamps: false},
    )
}
