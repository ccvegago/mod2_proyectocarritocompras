
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connect');
const Product = require('./product.model');


class Offer extends Model { }

Offer.init({
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    states: {
        type: DataTypes.ENUM,
        values: ['active', 'inactive']
    },
    startDate: {
        type: DataTypes.DATE
    },
    endDate: {
        type: DataTypes.DATE
    }
}, {
    sequelize,
    modelName: 'Offer'
});
// priemro la relación luego sync
Offer.belongsTo(Product);


// alter:true -> actualiza/modifica la tabla sin necesidad de eliminar la tabla en la db..
Offer.sync({alter:true});

module.exports = Offer;