const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        "Training",
        {
            id : {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            training: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            speaker: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            dateTraining: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            level: {
                type: DataTypes.ENUM(['PreSchool','Elementary','HighSchool','College', 'Global'])                
            },
            mode: {
                type: DataTypes.ENUM( ['FaceToFace','OnLine'])
            }
        }
    )
}
