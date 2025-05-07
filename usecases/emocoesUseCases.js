const { pool } = require('../config')
const Emocao = require('../entities/emocao')

const getAllEmocoesDB = async () => {
    try {    
        const { rows } = await pool.query('SELECT * FROM tb_emocao ORDER BY descricao');
        return rows.map((emocao) => new Emocao(emocao.id_emocao, emocao.descricao));        
    } catch (err) {
        throw "Erro : " + err;
    }
}

const getEmocaoByIdDB = async (id) => {
    try {           
        const results = await pool.query(`SELECT * FROM tb_emocao where id_emocao = $1`,
        [id]);
        if (results.rowCount == 0){
            throw "Nenhuma emocao encontrada com o código: " + codigo;
        } else {
            const emocao = results.rows[0];
            return new Emocao(emocao.id_emocao, emocao.descricao); 
        }       
    } catch (err) {
        throw "Erro ao recuperar a emocao: " + err;
    }     
}

module.exports = {
    getAllEmocoesDB,
    getEmocaoByIdDB
}