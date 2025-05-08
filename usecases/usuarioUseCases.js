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
    
    const token = jwt.sign(
        { id_usuario: usuario.id, email: usuario.email },
        process.env.JWT_SECRET || 'segredo_supersecreto',
        { expiresIn: '1h' }
    );

    return { token, usuario: usuario = new Usuario(rows[0].id_usuario, rows[0].nome, rows[0].email)};
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

module.exports = {
    registerUsuarioDB,
    loginUsuarioDB
};
