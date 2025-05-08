const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { rotasPrivadas } = require('./routes/rotasPrivadas');
const { rotasPublicas }  = require('./routes/rotasPublicas');

const app = express();
const PORT = process.env.PORT || 3002;

// Middlewares
app.use(cors({
    origin: [
        'https://trabalho1-pw1-frontend-react-l6is.vercel.app',
        'http://localhost:3000'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));

app.options('*', cors());

app.use(express.json());

// Rota pública inicial
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Bem-vindo à API do Diário Emocional' });
});

// Rotas protegidas (incluem login, cadastro, entradas, emoções, objetivos)
app.use(rotasPublicas);  // não precisa de token
app.use(rotasPrivadas);  // precisa de token

// Rota de erro 404 para endpoints inexistentes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Rota não encontrada' });
});

// Rota de erro genérica
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Erro interno no servidor' });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
