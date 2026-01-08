// middleware/auth.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/jwt');

/**
 * AUTH MIDDLEWARE
 * ✅ Verifica JWT enviado como: Authorization: Bearer <token>
 *
 * NOTAS (para mi yo del futuro):
 * - Este middleware protege rutas privadas (users, orders, admin, etc.)
 * - Inyecta el usuario decodificado en req.usuario
 *
 * TODO (si el proyecto crece):
 * - Implementar refresh tokens
 * - Cambiar a cookies httpOnly para mayor seguridad
 */
function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;

  // 1️⃣ Verificar que venga el header Authorization
  if (!authHeader) {
    return res.status(401).json({
      mensaje: 'No se proporcionó el token de autorización',
    });
  }

  // 2️⃣ Esperamos formato: Bearer <token>
  const [tipo, token] = authHeader.split(' ');

  if (tipo !== 'Bearer' || !token) {
    return res.status(401).json({
      mensaje: 'Formato de token inválido. Use: Bearer <token>',
    });
  }

  try {
    // 3️⃣ Verificar token
    const decoded = jwt.verify(token, JWT_SECRET);

    /**
     * decoded contiene:
     * {
     *   id,
     *   email,
     *   rol,
     *   iat,
     *   exp
     * }
     *
     * NOTA:
     * - Guardamos esto en req.usuario para usarlo en controllers
     */
    req.usuario = decoded;

    next();
  } catch (error) {
    console.error('Error al verificar token:', error.message);
    return res.status(401).json({
      mensaje: 'Token inválido o expirado',
    });
  }
}

module.exports = verificarToken;
