
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connect');
const Categories = require('./categories.model');

class Product extends Model { }

Product.init({
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.INTEGER
    },
    /*img: {
        // type Blob para datos binarios
        type: DataTypes.BLOB('long'),
    },*/
}, {
    sequelize,
    modelName: 'Product'
});
// priemro la relación luego sync
Product.belongsTo(Categories);

// alter:true -> actualiza/modifica la tabla sin necesidad de eliminar la tabla en la db..
Product.sync({alter:true});

module.exports = Product;