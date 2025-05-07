const {getAllEmocoesDB, getEmocaoByIdDB} = require('../usecases/emocoesUseCases');

const getAllEmocoes = async (req, res) => {
    await getAllEmocoesDB()
        .then(data => res.status(200).json(data))  
        .catch(err => res.status(400).json({
            status: 'error',
            message: 'Erro ao consultar as emoções: ' + err
        }));
}

const getEmocaoById = async (req, res) => {
    await getEmocaoByIdDB(parseInt(req.params.id))  
        .then(data => res.status(200).json(data))  
        .catch(err => res.status(400).json({
            status: 'error',
            message: err
        }));
}


module.exports = {
    getEmocaoById,
    getAllEmocoes
}