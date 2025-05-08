const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { rotasPrivadas } = require('./routes/rotasPrivadas');
const { rotasPublicas }  = require('./routes/rotasPublicas');

const app = express();
const PORT = process.env.PORT || 3002;

// Lista de origens permitidas
const allowedOrigins = [
  'http://localhost:3000',
  'https://trabalho1-pw1-frontend-react-l6is.vercel.app'
];

// Middleware de log para debug de CORS
app.use((req, res, next) => {
  console.log('Origem da requisição:', req.headers.origin);
  next();
});

// Middleware de CORS mais robusto
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origem não permitida pelo CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// Suporte a pré-flight para todas as rotas
app.options('*', cors());

// Middleware para JSON
app.use(express.json());

// Rota pública inicial
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Bem-vindo à API do Diário Emocional' });
});

// Rotas
app.use(rotasPublicas);  // não precisa de token
app.use(rotasPrivadas);  // precisa de token

// Rota 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

// Tratamento de erros gerais
app.use((err, req, res, next) => {
  console.error('Erro interno:', err.stack);
  res.status(500).json({ message: 'Erro interno no servidor' });
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
