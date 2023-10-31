
const express = require('express');
const app = express.Router();
const sequelize = require('../connect');
const Offer = require('../model/offer.model');
const Product = require('../model/product.model');


app.get('/offer', async function (req, res) {
    let offers = await Offer.findAll({
        include:[
            {
                model: Product
            }]
    });

    res.send(offers);
});

app.post('/offer', async function (req, res) {
    let name = req.body.name;
    let description = req.body.description;
    let states = req.body.states;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    let productId = req.body.productId;

    let offer = await Offer.create({ name: name, description: description, states: states, startDate: startDate, endDate: endDate, ProductId: productId});
    await offer.save();
    res.send('Oferta creada..');
});

app.patch('/offer/:id', async function (req, res) {
    let id = req.params.id;
    let name = req.body.name;
    /*let description = req.body.description;
    let states = req.body.states;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    let productId = req.body.product;*/
    await Offer.upsert({id: id, name: name })
    res.send('Oferta actualizada');
});

module.exports = app;