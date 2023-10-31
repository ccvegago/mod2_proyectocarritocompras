
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connect');
const User = require('./user.model');
const Order = require('./order.model');

class Car extends Model { }

Car.init({
    status: {
        type: DataTypes.ENUM,
        values: ['active', 'pending', 'finish']
    },
}, {
    sequelize,
    modelName: 'Car'
});
// priemro la relación luego sync
Car.belongsTo(User);
Car.belongsTo(Order);

// alter:true -> actualiza/modifica la tabla sin necesidad de eliminar la tabla en la db..
Car.sync({alter:true});

module.exports = Car;