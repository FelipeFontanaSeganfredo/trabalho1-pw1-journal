const { pool } = require('../config');
const Usuario = require('../entities/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Criptografia e inserção
const registerUsuarioDB = async (body) => {
    const { nome, email, senha } = body;
    const hash = await bcrypt.hash(senha, 10);
    const { rows } = await pool.query(
        `INSERT INTO tb_usuario (nome, email, passwd_hash) VALUES ($1, $2, $3) RETURNING id_usuario, nome, email`,
        [nome, email, hash]
    );
    return new Usuario(rows[0].id_usuario, rows[0].nome, rows[0].email);
};

// Autenticação
const loginUsuarioDB = async (body) => {
    const { email, senha } = body;
    const { rows } = await pool.query(`SELECT * FROM tb_usuario WHERE email = $1`, [email]);
    
    if (rows.length === 0) throw "Usuário não encontrado";

    const usuario = rows[0];
    const senhaValida = await bcrypt.compare(senha, usuario.passwd_hash);
    
    if (!senhaValida) throw "Senha inválida";

    const token = jwt.sign(
        { id_usuario: usuario.id_usuario, email: usuario.email },
        process.env.JWT_SECRET || 'segredo_supersecreto',
        { expiresIn: '1h' }
    );

    return { token, usuario: new Usuario(usuario.id_usuario, usuario.nome, usuario.email) };
};

const deleteUsuarioDB = async (id_usuario) => {
    try {
        const { rowCount } = await pool.query(
            'DELETE FROM tb_usuario WHERE id_usuario = $1',
            [id_usuario]
        );
        if (rowCount === 0) {
            throw `Objetivo com id ${id_usuario} não encontrado para exclusão.`;
        }
        return true;
    } catch (err) {
        throw "Erro ao excluir objetivo: " + err;
    }
}

const updateUsuarioDB = async (id_usuario, nome, email) => {
    try {
        const { rows, rowCount } = await pool.query(
            `UPDATE tb_usuario
             SET nome = $1, email = $2
             WHERE id_usuario = $3
             RETURNING *`,
            [nome, email, id_usuario]
        );
        if (rowCount === 0) {
            throw `Usuario não encontrado para atualização com id ${id_usuario}.`;
        }
        const user = rows[0];
        return new Usuario(user.id_usuario, user.nome, user.email);
    } catch (err) {
        throw "Erro ao atualizar usuário: " + err;
    }
}

const updateSenhaDB = async (id_usuario, novaSenha) => {
    try {
        const hash = await bcrypt.hash(novaSenha, 10);
        const { rowCount } = await pool.query(
            `UPDATE tb_usuario
             SET passwd_hash = $1
             WHERE id_usuario = $2`,
            [hash, id_usuario]
        );

        if (rowCount === 0) {
            throw `Usuário não encontrado para atualização de senha com id ${id_usuario}.`;
        }

        return true;
    } catch (err) {
        throw "Erro ao atualizar a senha: " + err;
    }
};


module.exports = {
    registerUsuarioDB,
    loginUsuarioDB,
    deleteUsuarioDB,
    updateUsuarioDB,
    updateSenhaDB
};
