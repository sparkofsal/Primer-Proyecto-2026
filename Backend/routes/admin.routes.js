const express = require('express');
const router = express.Router();

const verificarToken = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');

router.get(
  '/ping',
  verificarToken,
  requireRole('admin'),
  (req, res) => {
    res.json({
      mensaje: 'Acceso permitido: eres admin',
      usuario: req.usuario,
    });
  }
);

module.exports = router;
