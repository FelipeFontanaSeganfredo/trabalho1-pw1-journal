const {
    getAllObjetivosByUsuarioDB,
    getObjetivoByIdDB,
    createObjetivoDB,
    updateObjetivoDB,
    deleteObjetivoDB
} = require('../usecases/objetivoUseCases');

const getAllObjetivos = async (req, res) => {
    await getAllObjetivosByUsuarioDB(req.usuario.id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json({
            status: 'error',
            message: 'Erro ao consultar os objetivos: ' + err
        }));
}

const getObjetivoById = async (req, res) => {
    await getObjetivoByIdDB(parseInt(req.params.id), req.usuario.id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json({
            status: 'error',
            message: err
        }));
}

const createObjetivo = async (req, res) => {
    const { descricao } = req.body;
    await createObjetivoDB(descricao, req.usuario.id)
        .then(data => res.status(201).json(data))
        .catch(err => res.status(400).json({
            status: 'error',
            message: 'Erro ao criar objetivo: ' + err
        }));
}

const updateObjetivo = async (req, res) => {
    const id = parseInt(req.params.id);
    const { descricao, concluido } = req.body;
    await updateObjetivoDB(id, descricao, concluido, req.usuario.id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json({
            status: 'error',
            message: 'Erro ao atualizar objetivo: ' + err
        }));
}

const deleteObjetivo = async (req, res) => {
    const id = parseInt(req.params.id);
    await deleteObjetivoDB(id, req.usuario.id)
        .then(() => res.status(200).json({ message: "Objetivo excluído com sucesso." }))
        .catch(err => res.status(400).json({
            status: 'error',
            message: 'Erro ao excluir objetivo: ' + err
        }));
}

module.exports = {
    getAllObjetivos,
    getObjetivoById,
    createObjetivo,
    updateObjetivo,
    deleteObjetivo
}
