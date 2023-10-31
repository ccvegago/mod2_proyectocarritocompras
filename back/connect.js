const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:12345@localhost:5432/tienda2');


module.exports = sequelize;