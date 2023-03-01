const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        "ClassRoom",
        {
            classRoom: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            level: {
                type: DataTypes.ENUM(['PreSchool','Elementary','HighSchool','College', 'Global'])                
            },
            gyg: {
                type: DataTypes.STRING
            },
            campus: {
                type: DataTypes.ENUM(['Francita','Poza Rica'])                
            },
            floor: {
                type:DataTypes.STRING
              //  type: DataTypes.ENUM(['Parking lot ','Floor 1','Floor 2','Floor 3', 'Floor 4', 'Floor 5'])                
            }
        }, {timestamps: false},
    )
}
