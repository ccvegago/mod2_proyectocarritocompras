
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connect');
const Car = require('./car.model');
const Product = require('./product.model');

class CarProduct extends Model { }

CarProduct.init({
    amount: {
        type: DataTypes.INTEGER
    },
}, {
    sequelize,
    modelName: 'CarProduct'
});
// priemro la relación luego sync
CarProduct.belongsTo(Car);
CarProduct.belongsTo(Product);

// alter:true -> actualiza/modifica la tabla sin necesidad de eliminar la tabla en la db..
CarProduct.sync({alter:true});

module.exports = CarProduct;