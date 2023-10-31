const express = require('express');
const sequelize = require('../connect');

const app = express.Router();

const City = require('../model/city.model')


app.get('/city', async function (req, res) {
    let city = await City.findAll();
    res.send(city);
});

//post crea un dato nuevo
app.post('/city', async function (req, res) {
    let name = req.body.name;

    let city = await City.create({ name: name });

    await city.save();
    res.send('La ciudad fue creada exitosamente..');
});

module.exports = app;