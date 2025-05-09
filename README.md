# Api Journal

Este projeto é uma API desenvolvida como parte do Trabalho 1 da disciplina de Programação para Web (PW1).
A aplicação permite que usuários registrem suas emoções e entradas em um diário pessoal, com autenticação, persistência e organização de dados.

## Tecnologias Utilizadas

* Node.js
* Express
* JavaScript
* PostgreSQL

## 📁 Estrutura do Projeto

* **`controllers/`**: Lógica para lidar com requisições e respostas da API.
* **`entities/`**: Definição das entidades do sistema.
* **`middleware/`**: Middlewares personalizados.
* **`routes/`**: Declaração e organização das rotas.
* **`usecases/`**: Camada de lógica de negócio.
* **`config.js`**: Configuração da aplicação.
* **`index.js`**: Ponto de entrada principal.
* **`package.json`**: Gerenciamento de dependências e scripts.

## 🚀 Como Executar o Projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/FelipeFontanaSeganfredo/trabalho1-pw1-journal.git
   ```

2. Acesse o diretório:

   ```bash
   cd trabalho1-pw1-journal
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Configure a conexão com o banco de dados PostgreSQL no arquivo `.env` ou `config.js`.

5. Execute o script SQL abaixo para criar as tabelas no seu banco de dados PostgreSQL:

## 🗃️ Estrutura do Banco de Dados

```sql
-- Tabela de usuários
CREATE TABLE tb_usuario (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    passwd_hash VARCHAR(255) NOT NULL
);

-- Tabela de emoções fixas
CREATE TABLE tb_emocao (
    id_emocao SERIAL PRIMARY KEY,
    descricao VARCHAR(100) UNIQUE NOT NULL
);

-- Tabela de entradas do diário
CREATE TABLE tb_entrada (
    id_entrada SERIAL PRIMARY KEY,
    titulo_entrada VARCHAR(255) NOT NULL,
    texto_entrada TEXT NOT NULL,
    timestamp_entrada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_usuario INTEGER NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES tb_usuario(id_usuario) ON DELETE CASCADE
);

-- Tabela intermediária: relação N:N entre entrada e emoção
CREATE TABLE tb_entrada_emocao (
    id_entrada INTEGER NOT NULL,
    id_emocao INTEGER NOT NULL,
    PRIMARY KEY (id_entrada, id_emocao),
    FOREIGN KEY (id_entrada) REFERENCES tb_entrada(id_entrada) ON DELETE CASCADE,
    FOREIGN KEY (id_emocao) REFERENCES tb_emocao(id_emocao) ON DELETE CASCADE
);

-- Tabela de objetivos pessoais do usuário
CREATE TABLE tb_objetivo (
    id_objetivo SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL,
    concluido BOOLEAN DEFAULT FALSE,
    id_usuario INTEGER NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES tb_usuario(id_usuario) ON DELETE CASCADE
);

-- Emoções pré-definidas
INSERT INTO tb_emocao (descricao) VALUES
('Feliz'),
('Triste'),
('Ansioso'),
('Calmo'),
('Raiva'),
('Gratidão'),
('Cansaço'),
('Esperança'),
('Medo'),
('Orgulho'),
('Vergonha'),
('Alívio'),
('Entediado'),
('Confuso'),
('Motivado'),
('Amado'),
('Frustrado'),
('Alegria'),
('Saudade'),
('Paz');
```

6. Inicie a aplicação:

   ```bash
   node index.js
   ```

A aplicação estará disponível em `http://localhost:3000`.

Atualmente a aplicação está disponível no render, em: `https://trabalho1-pw1-journal.onrender.com`.
