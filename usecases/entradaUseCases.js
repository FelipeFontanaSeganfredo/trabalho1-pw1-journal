const { pool } = require('../config');
const Entrada = require('../entities/entrada');

const getAllEntradasDB = async (id_usuario) => {
    const query = `SELECT e.*, array_agg(ee.id_emocao) AS emocoes
                   FROM tb_entrada e
                   LEFT JOIN tb_entrada_emocao ee ON e.id_entrada = ee.id_entrada
                   WHERE e.id_usuario = $1
                   GROUP BY e.id_entrada`;
    const { rows } = await pool.query(query, [id_usuario]);
    return rows.map(e => new Entrada(e.id_entrada, e.titulo_entrada, e.texto_entrada, e.timestamp_entrada, e.id_usuario, e.emocoes));
};

const getEntradaByIdDB = async (id_entrada, id_usuario) => {
    const query = `SELECT e.*, array_agg(ee.id_emocao) AS emocoes
                   FROM tb_entrada e
                   LEFT JOIN tb_entrada_emocao ee ON e.id_entrada = ee.id_entrada
                   WHERE e.id_entrada = $1 AND e.id_usuario = $2
                   GROUP BY e.id_entrada`;
    const { rows } = await pool.query(query, [id_entrada, id_usuario]);
    if (rows.length === 0) throw 'Entrada não encontrada';
    const e = rows[0];
    return new Entrada(e.id_entrada, e.titulo_entrada, e.texto_entrada, e.timestamp_entrada, e.id_usuario, e.emocoes);
};

const createEntradaDB = async (entrada) => {
    const client = await pool.connect();
    console.log('Dados recebidos no use case:', entrada);
    try {
        await client.query('BEGIN');

        const insertEntrada = `INSERT INTO tb_entrada (titulo_entrada, texto_entrada, id_usuario)
                                VALUES ($1, $2, $3) RETURNING *`;
        const { rows } = await client.query(insertEntrada, [entrada.titulo, entrada.texto, entrada.id_usuario]);
        const novaEntrada = rows[0];

        for (const id_emocao of entrada.emocoes) {
            await client.query('INSERT INTO tb_entrada_emocao (id_entrada, id_emocao) VALUES ($1, $2)', [novaEntrada.id_entrada, id_emocao]);
        
        }

        await client.query('COMMIT');

        return new Entrada(novaEntrada.id_entrada, novaEntrada.titulo_entrada, novaEntrada.texto_entrada, novaEntrada.timestamp_entrada, novaEntrada.id_usuario, entrada.emocoes);
    } catch (err) {
        await client.query('ROLLBACK');
        throw 'Erro ao criar entrada: ' + err;
    } finally {
        client.release();
    }
};

const deleteEntradaDB = async (id_entrada, id_usuario) => {
    const query = 'DELETE FROM tb_entrada WHERE id_entrada = $1 AND id_usuario = $2';
    const result = await pool.query(query, [id_entrada, id_usuario]);
    if (result.rowCount === 0) throw 'Entrada não encontrada ou não pertence ao usuário';
    return true;
};

const updateEntradaDB = async (entrada) => {
    const client = await pool.connect();

    console.log('Tentando atualizar entrada com:');
    console.log('ID entrada:', entrada.id_entrada);
    console.log('ID usuário:', entrada.id_usuario);
    console.log('Título:', entrada.titulo);
    console.log('Texto:', entrada.texto);
    
    try {
        await client.query('BEGIN');

        // Atualiza os dados da entrada
        const updateQuery = `UPDATE tb_entrada 
                             SET titulo_entrada = $1, texto_entrada = $2 
                             WHERE id_entrada = $3 AND id_usuario = $4 
                             RETURNING *`;
        const { rows } = await client.query(updateQuery, [
            entrada.titulo,
            entrada.texto,
            entrada.id_entrada,
            entrada.id_usuario
        ]);

        if (rows.length === 0) throw 'Entrada não encontrada ou não pertence ao usuário';

        // Remove emoções antigas
        await client.query('DELETE FROM tb_entrada_emocao WHERE id_entrada = $1', [entrada.id_entrada]);

        // Insere novas emoções
        for (const id_emocao of entrada.emocoes) {
            await client.query('INSERT INTO tb_entrada_emocao (id_entrada, id_emocao) VALUES ($1, $2)', [entrada.id_entrada, id_emocao]);
        }

        await client.query('COMMIT');

        const entradaAtualizada = rows[0];
        return new Entrada(
            entradaAtualizada.id_entrada,
            entradaAtualizada.titulo_entrada,
            entradaAtualizada.texto_entrada,
            entradaAtualizada.timestamp_entrada,
            entradaAtualizada.id_usuario,
            entrada.emocoes
        );

    } catch (err) {
        await client.query('ROLLBACK');
        throw 'Erro ao atualizar entrada: ' + err;
    } finally {
        client.release();
    }
};


module.exports = {
    getAllEntradasDB,
    getEntradaByIdDB,
    createEntradaDB,
    deleteEntradaDB,
    updateEntradaDB
};