
const express = require('express');
const app = express.Router();
const sequelize = require('../connect');
const Categories = require('../model/categories.model')

app.get('/categories', async function (req, res) {
    let category = await Categories.findAll();

    res.send(category);
});

app.post('/categories', async function (req, res) {
    let name = req.body.name;
    let description = req.body.description;
    let states = req.body.states;

    let categories = await Categories.create({ name: name, description: description, states: states });
    await categories.save();
    res.send('Categoria creada..');
});

module.exports = app;