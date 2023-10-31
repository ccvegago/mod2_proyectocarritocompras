
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connect');
const City = require('./city.model');

class User extends Model { }

User.init({
    name: {
        type: DataTypes.STRING
    },
    addres: {
        type: DataTypes.STRING
    },
    states: {
        type: DataTypes.ENUM,
        values: ['active', 'pending']
    },
    pass: {
        type: DataTypes.STRING
    },
    iv: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    tel: {
        type: DataTypes.STRING
    },
}, {
    sequelize,
    modelName: 'User'
});

User.belongsTo(City);
User.sync({alter:true});

module.exports = User;