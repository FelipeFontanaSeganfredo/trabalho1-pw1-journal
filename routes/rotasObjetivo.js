const { Router } = require('express');
const {
    getAllObjetivos,
    getObjetivoById,
    createObjetivo,
    updateObjetivo,
    deleteObjetivo
} = require('../controllers/objetivoController');

const rotasObjetivo = new Router();


rotasObjetivo.get('/objetivos', getAllObjetivos);
rotasObjetivo.get('/objetivos/:id', getObjetivoById);
rotasObjetivo.post('/objetivos', createObjetivo);
rotasObjetivo.put('/objetivos/:id', updateObjetivo);
rotasObjetivo.delete('/objetivos/:id', deleteObjetivo);

module.exports = { rotasObjetivo };
