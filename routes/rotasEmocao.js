const { Router } = require('express');
const { getAllEmocoes, getEmocaoById } = require('../controllers/emocaoController');

const rotasEmocao = new Router();

rotasEmocao.get('/emocao/', getAllEmocoes);
rotasEmocao.get('/emocao/:id', getEmocaoById);

module.exports = { rotasEmocao };
