const { Router } = require('express');
const {
    updateUsuario,
    updateSenha,
    deleteUsuario
} = require('../controllers/usuarioController');

const rotasUsuarioPrivadas = new Router();

rotasUsuarioPrivadas.put('/usuario/:id', updateUsuario);
rotasUsuarioPrivadas.put('/usuario/:id/senha', updateSenha);
rotasUsuarioPrivadas.delete('/usuario/:id', deleteUsuario);

module.exports = { rotasUsuarioPrivadas };
