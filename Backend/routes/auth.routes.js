// routes/auth.routes.js
const express = require('express');
const router = express.Router();

const { registrarUsuario, loginUsuario } = require('../controllers/auth.controller');
const validarCampos = require('../middleware/validator');

// Registro de usuario
router.post(
  '/register',
  validarCampos(['nombre', 'email', 'password']),
  registrarUsuario
);

// Login de usuario
router.post(
  '/login',
  validarCampos(['email', 'password']),
  loginUsuario
);

module.exports = router;
