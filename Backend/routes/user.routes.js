// routes/user.routes.js
const express = require("express");
const router = express.Router();

const verificarToken = require("../middleware/auth");
const requireRole = require("../middleware/requireRole");

const {
  listarUsuarios,
  crearUsuarioAdmin,
} = require("../controllers/user.controller");

/**
 * USERS ROUTES (PRO)
 *
 * NOTAS:
 * - Todas estas rutas requieren token (verificarToken)
 * - Además requieren rol admin (requireRole("admin"))
 *
 * TODO (si vendo y escalo):
 * - Staff podría listar usuarios sin ver datos sensibles
 * - Cliente solo debería ver su propio perfil
 */

// GET /api/users  -> listar usuarios (solo admin)
router.get("/", verificarToken, requireRole("admin"), listarUsuarios);

// POST /api/users -> crear usuario (solo admin)
router.post("/", verificarToken, requireRole("admin"), crearUsuarioAdmin);

module.exports = router;
