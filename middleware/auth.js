const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(403).json({ message: 'Token não fornecido' });

    const tokenFormatado = token.startsWith('Bearer ') ? token.replace('Bearer ', '') : token;

    jwt.verify(tokenFormatado, process.env.JWT_SECRET || 'segredo_supersecreto', (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Token inválido' });

        req.usuario = {
            id: decoded.id_usuario, // Mapeia id_usuario para id
            email: decoded.email
        };

        //console.log('Token decodificado:', decoded);

        next();
    });
};

module.exports = verificarToken;
