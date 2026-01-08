// routes/ejemplo.routes.js
const express = require('express'); //en esta linea importo el paquete express
const router = express.Router();

const {
  obtenerEjemplos,
  obtenerEjemploPorId,
  crearEjemplo,
  actualizarEjemplo,
  eliminarEjemplo,
} = require('../controllers/ejemplo.controller');

const verificarToken = require('../middleware/auth');

// Esta linea la utilizo para obtener todos los ejemplos (PROTEGIDA)
router.get('/', verificarToken, obtenerEjemplos);

// Esta linea la utilizo para obtener un ejemplo por id (PROTEGIDA)
router.get('/:id', verificarToken, obtenerEjemploPorId);

// Esta linea la utilizo para crear un nuevo ejemplo
router.post('/', verificarToken, crearEjemplo);

// Esta linea la utilizo para actualizar un ejemplo
router.put('/:id', verificarToken, actualizarEjemplo);

// Esta linea la utilizo para eliminar un ejemplo
router.delete('/:id', verificarToken, eliminarEjemplo);

module.exports = router;
