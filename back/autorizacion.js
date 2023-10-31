const userModel = require('./model/user.model');
const jwt = require("jsonwebtoken");

// Validamos que el usuario exista
async function auth(req, res, next) {
    let token = req.headers['authorization'];
    //verify verifica que si sea el token del usuario.
    let resultadoToken = jwt.verify(token, '12345');

    let usuario = await userModel.findOne({id: resultadoToken.id});
    if(!usuario) {
        throw new Error('usuario no existe');
    }

    req.user = usuario;

    next();
}

module.exports = auth;