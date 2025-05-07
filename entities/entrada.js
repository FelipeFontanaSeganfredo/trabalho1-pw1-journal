class Entrada {
    constructor(id, titulo, texto, timestamp, id_usuario, emocoes = []) {
        this.id = id;
        this.titulo = titulo;
        this.texto = texto;
        this.timestamp = timestamp;
        this.id_usuario = id_usuario;
        this.emocoes = emocoes;
    }
}


module.exports = Entrada;