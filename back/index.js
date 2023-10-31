const sequelize = require('./connect');
const express = require('express');

const userRouter = require('./routes/user');
const cityRouter = require('./routes/city');
const carRouter = require('./routes/car');
const orderRouter = require('./routes/order');
const categoriesRouter = require('./routes/categories');
const productRouter = require('./routes/product');
const carproductRouter = require('./routes/car_product');
const offerRouter = require('./routes/offer');

const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

app.use(cors({
    origin: '*'
}));

app.use(bodyParser.json());

app.use(userRouter);
app.use(cityRouter);
app.use(carRouter);
app.use(orderRouter);
app.use(categoriesRouter);
app.use(productRouter);
app.use(carproductRouter);
app.use(offerRouter);


app.listen(3000, () => {
    console.log(`Example app listening on port ${3000}`)
});