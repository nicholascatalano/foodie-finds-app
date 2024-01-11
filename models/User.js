const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt")

class User extends Model {}

User.init({
    
    username: {
         type: DataTypes.STRING,
         allowNull:false,
         unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[8]
        }
    }
},{
    hooks:{
        beforeCreate: async (userData) =>{
            userData.password = await bcrypt.hash(userData.password, 10)
            return userData
        }
    },
    sequelize,   
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
});

module.exports=User