
const express = require('express');
const app = express.Router();
const sequelize = require('../connect');
const CarProduct = require('../model/car_product.model');
const Car = require('../model/car.model');
const Product = require('../model/product.model');
const auth = require('../autorizacion');
const User = require('../model/user.model');


app.get('/carproduct', async function (req, res) {
    let carproducts = await CarProduct.findAll({
        include: {
            model: Car,
            model: Product
        }
    });

    res.send(carproducts);
});

app.post('/carproduct', auth, async function (req, res) {
    let carId = req.body.car;
    let productId = req.body.productId;
    let amount = req.body.amount;
    let car = await Car.findOne({ where: {UserId:req.user.id, status:"active"}});
    
    if (!car) {
        car = await Car.create({UserId:req.user.id, status:"active"})
        car.save();
    }


    let carproduct = await CarProduct.create({ CarId:car.id, ProductId: productId, amount: amount });
    await carproduct.save();
    res.send(' creado la cantidad e producto..');
});

// actualizar uupdate cantidad producto
app.patch('/carproduct/:id', async function(req, res) {
    let id = req.params.id;
    let amount = req.body.amount;

    await CarProduct.upsert({id: id, amount: amount});

    res.send("La actualización fue exitosa");
});

app.delete('/carproduct/:id', async function(req, res) {
    let productId = req.params.id;
    try{
        await CarProduct.destroy({where: {id: productId} });
        res.send('Producto elimindado del carrito');
    }catch (error) {
        res.status(500).send('Error al eliminar el producto del carrito');
    }
})

module.exports = app;