const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define (
        "User",
        {
            userName: {
                type: DataTypes.STRING,
            },
            email: {
                type: DataTypes.STRING(50),
                allowNull: false,
                primaryKey: true,
                validate: {
                    isEmail: { msg : 'Agrega un correo valido'},
                    // notEmpty: { msg : 'Correo Obligatorio'},
                }
            },
            password: {
                type: DataTypes.STRING(15)
            },
            typeUser: {
                type: DataTypes.ENUM(['User','superUser','Admin','superAdmin'])
            },
            level: {
                type: DataTypes.ENUM(['PreSchool','Elementary','HighSchool','College', 'Global','Absolute'])                
            }
        }, {timestamps: false},
        )
    }
    
