
const express = require('express');
const app = express.Router();
const sequelize = require('../connect');
const Car = require('../model/car.model');
const User = require('../model/user.model');
const Order = require('../model/order.model');


app.get('/car', async function (req, res) {
    try{
        let cars = await Car.findAll({
            include:[
                {
                    model: User,
                    model: Order
                }]
        });
        res.send(cars);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
});

app.post('/car', async function (req, res) {
    try {
        // verifica si el usuario existe y si el pedido es valido antes de crear el carrito
        const { states, userId, orderId } = req.body;

        // verifica si el usuario y el pedido existen antes de continuar
        const user = await User.findByPk(userId);
        const order = await Order.findByPk(orderId);

        //Crea el carrito y asocia el usuario y el pedido
        const car = await Car.create({ states });
        await car.setUser(user);
        await car.setOrder(order);

        res.send('Carrito creado exitosamente');
    } catch (error){
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = app;