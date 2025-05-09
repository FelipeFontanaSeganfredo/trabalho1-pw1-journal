const { registerUsuarioDB, loginUsuarioDB, updateUsuarioDB, updateSenhaDB, deleteUsuarioDB } = require('../usecases/usuarioUseCases');

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

const updateUsuario = async (req, res) => {
    const id_usuario = parseInt(req.params.id);
    const { nome, email } = req.body;

    try {
        const usuarioAtualizado = await updateUsuarioDB(id_usuario, nome, email);
        res.status(200).json({ status: 'success', message: 'Usuário atualizado com sucesso', usuario: usuarioAtualizado });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err });
    }
};


const updateSenha = async (req, res) => {
    const id_usuario = parseInt(req.params.id);
    const { novaSenha } = req.body;

    if (!novaSenha) {
        return res.status(400).json({ status: 'error', message: 'Nova senha é obrigatória' });
    }

    try {
        await updateSenhaDB(id_usuario, novaSenha);
        res.status(200).json({ status: 'success', message: 'Senha atualizada com sucesso' });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err });
    }
};

const deleteUsuario = async (req, res) => {
    const id = parseInt(req.params.id);
    await deleteUsuarioDB(id, req.usuario.id)
        .then(() => res.status(200).json({ message: "Usuario excluído com sucesso." }))
        .catch(err => res.status(400).json({
            status: 'error',
            message: 'Erro ao excluir usuario: ' + err
        }));
}


module.exports = { registerUsuario, loginUsuario, updateUsuario, updateSenha, deleteUsuario};
