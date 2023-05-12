const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define (
        "Employees",
        {
            numEmployee: {
                type: DataTypes.INTEGER,
                alloNull : false,
                unique   :true,
                validate : {
                    isInt: true,
                }
            },
            name: {
                type: DataTypes.STRING(48),
            },
            genere: {
                type: DataTypes.ENUM(['Female','Male']),
            },
            email: {
                type       : DataTypes.STRING(50),
                allowNull  : false,
                primaryKey : true,
                validate   : {
                    isEmail: { msg : 'Agrega un correo valido'},
                    // notEmpty: { msg : 'Correo Obligatorio'},
                }
            },
            level: {
                type: DataTypes.ENUM(['PreSchool','Elementary','HighSchool','College'])                
            },
            department: {
                type: DataTypes.ENUM(['Administrative','Academic','Direction','Support Assistance','Sports','General Services']),
            },
        }, {timestamps: false},
        )
    }
    
