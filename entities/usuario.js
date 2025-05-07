class Usuario {
    constructor(id, nome, email, passwd_hash)
    {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.passwd_hash = passwd_hash;
    }
}

module.exports = Usuario;