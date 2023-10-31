
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connect');


// Tabla order -> pedidos
class Order extends Model { }

Order.init({
    date: {
        type: DataTypes.DATE
    },
    methodpay: {
        type: DataTypes.ENUM,
        values: ['cash', 'card']
    },
    states: {
        type: DataTypes.ENUM,
        values: ['active', 'pending', 'cancelled']
    },
}, {
    sequelize,
    modelName: 'Order'
});

Order.sync({alter:true});

module.exports = Order;
