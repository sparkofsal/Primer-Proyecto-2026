// routes/user.routes.js
const express = require('express');
const router = express.Router();

const verificarToken = require('../middleware/auth');
const { obtenerMiPerfil } = require('../controllers/user.controller');

// Ruta de prueba (puedes borrarla luego)
router.get('/ping', (req, res) => {
  res.json({ ok: true });
});

// Perfil del usuario autenticado
router.get('/me', verificarToken, obtenerMiPerfil);

module.exports = router;
