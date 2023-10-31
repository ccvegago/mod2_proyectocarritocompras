const express = require('express');
const app = express.Router();
const sequelize = require('../connect');
const Order = require('../model/order.model');

app.get('/order', async function (req, res) {
    let orders = await Order.findAll();

    res.send(orders);
});

app.post('/order', async function (req, res) {
    let date = req.body.date;
    let methodpay = req.body.methodpay;
    let states = req.body.states;

    let order = await Order.create({ date: date,  methodpay: methodpay, states: states});
    await order.save();
    res.send('Pedido en proceso..');
});

module.exports = app;