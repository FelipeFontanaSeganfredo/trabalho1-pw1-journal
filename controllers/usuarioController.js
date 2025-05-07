const { registerUsuarioDB, loginUsuarioDB } = require('../usecases/usuarioUseCases');

const registerUsuario = async (req, res) => {
    try {
        const usuario = await registerUsuarioDB(req.body);
        res.status(201).json({ status: 'success', message: 'Usuário registrado', usuario });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err });
    }
};

const loginUsuario = async (req, res) => {
    try {
        const resultado = await loginUsuarioDB(req.body);
        res.status(200).json({ status: 'success', token: resultado.token, usuario: resultado.usuario });
    } catch (err) {
        res.status(401).json({ status: 'error', message: err });
    }
};

module.exports = { registerUsuario, loginUsuario };
