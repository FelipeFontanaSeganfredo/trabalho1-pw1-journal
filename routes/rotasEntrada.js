const { Router } = require('express');
const {
    getAllEntradas,
    getEntradaById,
    createEntrada,
    deleteEntrada,
    updateEntrada
} = require('../controllers/entradaController');
const verificarToken = require('../middleware/auth'); 

const rotasEntrada = new Router();

rotasEntrada.get('/entradas', verificarToken, getAllEntradas);
rotasEntrada.get('/entradas/:id', verificarToken, getEntradaById);
rotasEntrada.post('/entradas', verificarToken, createEntrada);
rotasEntrada.delete('/entradas/:id', verificarToken, deleteEntrada);
rotasEntrada.put('/entradas/:id', updateEntrada);

module.exports = { rotasEntrada };
