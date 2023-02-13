const jwt = require('jsonwebtoken');

function verifyToken(req, res, next){

    const token = req.headers['x-access-token'];

    if (!token) return res.status(401).json({ auth: false, message: 'Sem token' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) return res.status(500).json({ auth: false, message: 'Falha em autenticar token' });
        req.userId = decoded.id;
        next();
    });
}

module.exports = verifyToken