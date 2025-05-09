const { Router } = require('express');
const verificarToken = require('../middleware/auth');
const { rotasEmocao } = require('./rotasEmocao');
const { rotasEntrada } = require('./rotasEntrada');
const { rotasObjetivo } = require('./rotasObjetivo');
const { rotasUsuarioPrivadas } = require('./rotasUsuarioPrivadas')

const rotasPrivadas = new Router();

rotasPrivadas.use(verificarToken); // Protege tudo abaixo

rotasPrivadas.use(rotasEmocao);
rotasPrivadas.use(rotasEntrada);
rotasPrivadas.use(rotasObjetivo);
rotasPrivadas.use(rotasUsuarioPrivadas);

module.exports = { rotasPrivadas };
