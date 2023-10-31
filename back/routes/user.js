
const express = require('express');
//const sequelize = require('./connect');
const app = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const User = require('../model/user.model');
const City = require('../model/city.model');

// Validamos que el usuario exista
async function auth(req, res, next) {
    let token = req.headers['authorization'];
    //verify verifica que si sea el token del usuario.
    let resultadoToken = jwt.verify(token, '12345');

    let usuario = await User.findOne({id: resultadoToken.id});
    if(!usuario) {
        throw new Error('usuario no existe');
    }

    req.user = usuario;

    next();
}
// se valida si el token es el original y el usuario existe.
app.get('/user', auth, async function (req, res) {
    let users = await User.findAll();

    res.send(users);
})



app.get('/user', async function (req, res) {
    let users = await User.findAll({
        include: {
            model: City
        }
    });
    res.send(users);
});

app.post('/user', async function (req, res) {
    let name = req.body.name;
    let cityId = req.body.city;
    let states = req.body.states;
    let addres = req.body.addres;
    let pass = req.body.pass;
    let email = req.body.email;
    let tel = req.body.tel;

    let user = await User.create({ name: name, states: states, addres: addres, pass: pass, email: email, tel: tel, CityId: cityId });

    await user.save();
    res.send('Usuario creados exitosamente..');
});

//Se registra y crea el usuario
app.post('/user/signup', async function (req, res) {
    let name = req.body.name;
    let email = req.body.email;
    let pass = req.body.pass;
    let cityId = req.body.cityId;
    let addres = req.body.addres;
    let tel = req.body.tel;

    let iv = bcrypt.genSaltSync(10);
    let passwordCrypt = bcrypt.hashSync(pass, iv);

    console.log(req.body);

    let user = await User.create({ name:name, email: email, pass: passwordCrypt, CityId: cityId, addres: addres, tel: tel,  iv });

    await user.save();

    const token = await jwt.sign({id: user.id}, '12345', { expiresIn: '180000s' });

    res.send({token});
});

//Inicia sesión, se logea.
app.post('/user/signin', async function (req, res) {
    let name = req.body.name;
    let email = req.body.email;
    let pass = req.body.pass;
    
    let user = await User.findOne({ where:{email} });

    let comp = bcrypt.compareSync(pass, user.pass );
    console.log(user);
    if(!comp){
        throw new Error ("Contraseña Incorrecta");
    }

    if(!user) {
        throw new Error("Usuario o contraseña no existe");
    }

    const token = await jwt.sign({id: user.id}, '12345', { expiresIn: '180000s' });

    res.send({token});
});

module.exports = app;