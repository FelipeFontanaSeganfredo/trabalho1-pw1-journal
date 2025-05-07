const { Router } = require('express');
const { rotasUsuario } = require('./rotasUsuario')

const rotasPublicas = new Router();

rotasPublicas.use(rotasUsuario);


module.exports = { rotasPublicas };
