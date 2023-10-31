
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connect');

class Categories extends Model { }

Categories.init({
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    states: {
        type: DataTypes.ENUM,
        values: ['electrodomestico']
    },
}, {
    sequelize,
    modelName: 'Categories'
});
// priemro la relación luego sync

// alter:true -> actualiza/modifica la tabla sin necesidad de eliminar la tabla en la db..
Categories.sync({alter:true});

module.exports = Categories;