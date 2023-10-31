
const express = require('express');
const app = express.Router();
const sequelize = require('../connect');
const Product = require('../model/product.model');
const Categories = require('../model/categories.model');
//const multer = require('multer');

app.get('/product', async function (req, res) {
    let products = await Product.findAll({
        include: {
            model: Categories
        }
    });

    res.send(products);
});

app.get('/product/:id', async function (req, res) {
    let productId = req.params.id;

    try{
        let product = await Product.findOne({
            where: {id: productId},
            include: {
                model: Categories
            }
        });
        
        if (!product) {
            res.status(404).json({ error: 'Producto no encontrado'});
        } else {
            //Trae el detalle del producto.
            res.json(product);
        }
    }catch(error) {
        console.error('Erro al byuscar el producto: ', error);
        res.status(500).json({ error: 'Erro al buscar el producto' });
    }
});

app.post('/product', async function (req, res) {
    let name = req.body.name;
    let description = req.body.description;
    let price = req.body.price;
    let categoryId = req.body.categoryId;

    let product = await Product.create({ name: name, description: description, price: price, CategoryId: categoryId });
    await product.save();
    res.send('Producto creado..');
});

app.put('/product/:id', async (req, res) => {
    try {
        let productId = req.params.id;
        let updatedData = req.body;

        //Actualiza el producto en la base de datos
        await sequelize.models.Producto.update(updatedData, {where: { id: productId} });

        res.json({ message: 'Producto actualizado con exito.'});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

app.delete('/product/:id', async (req, res) => {
    try{
        let productId = req.params.id;
        //findbypk toma el argumento de la clave primary key que se busca y lo devuelve.
        let product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado en las rutas'});
        }
        //si el producto lo cuentra en la bd pasa a eliminarlo:
        await product.destroy();
        res.status(204).json({ message: 'Producto eliminado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el producto'});
    }
});

module.exports = app;