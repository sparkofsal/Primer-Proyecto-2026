// middleware/auth.js
const jwt = require('jsonwebtoken'); //con esta linea importo el paquete jsonwebtoken para manejar tokens JWT
const { JWT_SECRET } = require('../config/jwt');

function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) { //esta linea me sirve para verificar si el encabezado de autorizacion esta presente
    return res
      .status(401)
      .json({ mensaje: 'No se proporcionó el token de autorización' });
  }

  // Este lo he utilizado para extraer el token del encabezado "Bearer <token>"
  const [tipo, token] = authHeader.split(' ');

  if (tipo !== 'Bearer' || !token) { //el bearer me sirve para verificar que el formato del token sea correcto, se usa para seguiridad y autenticacion
    return res
      .status(401)
      .json({ mensaje: 'Formato de token inválido. Use: Bearer <token>' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Guardamos los datos del usuario en la request para usarlos en las rutas protegidas
    req.usuario = decoded;

    next();
  } catch (error) {
    console.error('Error al verificar token:', error.message);
    return res.status(401).json({ mensaje: 'Token inválido o expirado' });
  }
}

module.exports = verificarToken;
