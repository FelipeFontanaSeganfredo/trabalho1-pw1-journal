const { Router } = require('express');
const { registerUsuario, loginUsuario } = require('../controllers/usuarioController');

const rotasUsuario = new Router();

rotasUsuario.post('/usuario/register', registerUsuario);
rotasUsuario.post('/usuario/login', loginUsuario);

module.exports = { rotasUsuario };
