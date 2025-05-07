const { pool } = require('../config');
const Objetivo = require('../entities/objetivo');

const getAllObjetivosByUsuarioDB = async (id_usuario) => {
    try {
        const { rows } = await pool.query(
            'SELECT * FROM tb_objetivo WHERE id_usuario = $1 ORDER BY id_objetivo',
            [id_usuario]
        );
        return rows.map(obj => new Objetivo(obj.id_objetivo, obj.descricao, obj.concluido, obj.id_usuario));
    } catch (err) {
        throw "Erro ao buscar objetivos: " + err;
    }
}

const getObjetivoByIdDB = async (id_objetivo, id_usuario) => {
    try {
        const { rows, rowCount } = await pool.query(
            'SELECT * FROM tb_objetivo WHERE id_objetivo = $1 AND id_usuario = $2',
            [id_objetivo, id_usuario]
        );
        if (rowCount === 0) {
            throw `Objetivo não encontrado com id ${id_objetivo} para este usuário.`;
        }
        const obj = rows[0];
        return new Objetivo(obj.id_objetivo, obj.descricao, obj.concluido, obj.id_usuario);
    } catch (err) {
        throw "Erro ao recuperar objetivo: " + err;
    }
}

const createObjetivoDB = async (descricao, id_usuario) => {
    try {
        const { rows } = await pool.query(
            'INSERT INTO tb_objetivo (descricao, id_usuario) VALUES ($1, $2) RETURNING *',
            [descricao, id_usuario]
        );
        const obj = rows[0];
        return new Objetivo(obj.id_objetivo, obj.descricao, obj.concluido, obj.id_usuario);
    } catch (err) {
        throw "Erro ao criar objetivo: " + err;
    }
}

const updateObjetivoDB = async (id_objetivo, descricao, concluido, id_usuario) => {
    try {
        const { rows, rowCount } = await pool.query(
            `UPDATE tb_objetivo
             SET descricao = $1, concluido = $2
             WHERE id_objetivo = $3 AND id_usuario = $4
             RETURNING *`,
            [descricao, concluido, id_objetivo, id_usuario]
        );
        if (rowCount === 0) {
            throw `Objetivo não encontrado para atualização com id ${id_objetivo}.`;
        }
        const obj = rows[0];
        return new Objetivo(obj.id_objetivo, obj.descricao, obj.concluido, obj.id_usuario);
    } catch (err) {
        throw "Erro ao atualizar objetivo: " + err;
    }
}

const deleteObjetivoDB = async (id_objetivo, id_usuario) => {
    try {
        const { rowCount } = await pool.query(
            'DELETE FROM tb_objetivo WHERE id_objetivo = $1 AND id_usuario = $2',
            [id_objetivo, id_usuario]
        );
        if (rowCount === 0) {
            throw `Objetivo com id ${id_objetivo} não encontrado para exclusão.`;
        }
        return true;
    } catch (err) {
        throw "Erro ao excluir objetivo: " + err;
    }
}

module.exports = {
    getAllObjetivosByUsuarioDB,
    getObjetivoByIdDB,
    createObjetivoDB,
    updateObjetivoDB,
    deleteObjetivoDB
}
