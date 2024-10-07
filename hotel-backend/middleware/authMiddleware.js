const jwt = require('jsonwebtoken'); // Importa el paquete para manejar JWT

// Middleware para verificar el token
exports.verificarToken = (req, res, next) => {
  // Extrae el token de la cabecera 'Authorization' (formato "Bearer token")
  const token = req.headers['authorization']?.split(' ')[1]; 

  if (!token) {
    return res.status(403).send('Token no proporcionado.');
  }

  // Verifica si el token es válido
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send('Token no válido.');
    }

    // Si es válido, almacena los datos del usuario en la petición
    req.user = decoded; 
    next();
  });
};