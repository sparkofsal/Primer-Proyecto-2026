// controllers/user.controller.js
const db = require('../config/db');

// GET /api/users/me
async function obtenerMiPerfil(req, res) {
  try {
    const userId = req.usuario.id;

    const [rows] = await db.query(
      'SELECT id, nombre, email, rol, created_at FROM users WHERE id = ? LIMIT 1',
      [userId]
    );

    const usuario = rows[0];
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    return res.json({ usuario });
  } catch (error) {
    console.error('Error en obtenerMiPerfil:', error);
    return res.status(500).json({ mensaje: 'Error en el servidor' });
  }
}

module.exports = { obtenerMiPerfil };
