const {
    getAllEntradasDB,
    getEntradaByIdDB,
    createEntradaDB,
    deleteEntradaDB,
    updateEntradaDB
} = require('../usecases/entradaUseCases');

const getAllEntradas = async (req, res) => {
    try {
        const entradas = await getAllEntradasDB(req.usuario.id);
        res.status(200).json(entradas);
    } catch (err) {
        res.status(400).json({ status: 'error', message: err });
    }
};

const getEntradaById = async (req, res) => {
    try {
        const entrada = await getEntradaByIdDB(parseInt(req.params.id), req.usuario.id);
        res.status(200).json(entrada);
    } catch (err) {
        res.status(404).json({ status: 'error', message: err });
    }
};

const createEntrada = async (req, res) => {
    try {
        const entrada = req.body;
        entrada.id_usuario = req.usuario.id;
        const novaEntrada = await createEntradaDB(entrada);
        res.status(201).json(novaEntrada);
    } catch (err) {
        res.status(400).json({ status: 'error', message: err });
    }
};

const deleteEntrada = async (req, res) => {
    try {
        await deleteEntradaDB(parseInt(req.params.id), req.usuario.id);
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ status: 'error', message: err });
    }
};

const updateEntrada = async (req, res) => {
    try {
        const entrada = req.body;
        entrada.id_usuario = req.usuario.id;
        entrada.id_entrada = parseInt(req.params.id);

        const entradaAtualizada = await updateEntradaDB(entrada);
        res.status(200).json(entradaAtualizada);
    } catch (err) {
        res.status(400).json({ status: 'error', message: err });
    }
};

module.exports = {
    getAllEntradas,
    getEntradaById,
    createEntrada,
    deleteEntrada,
    updateEntrada
};