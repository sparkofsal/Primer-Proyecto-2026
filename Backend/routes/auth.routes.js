// routes/auth.routes.js
const express = require("express");
const router = express.Router();

const {
  registrarUsuario,
  loginUsuario,
  meUsuario, // ✅ NUEVO (PRO)
} = require("../controllers/auth.controller");

const validarCampos = require("../middleware/validator");
const verificarToken = require("../middleware/auth"); // ✅ TU middleware actual

/**
 * AUTH ROUTES (PRO)
 *
 * NOTAS (para mi yo del futuro):
 * - /register y /login son rutas públicas (NO requieren token)
 * - /me es ruta privada (SÍ requiere token)
 *
 * ¿Por qué /me?
 * - Para que el frontend obtenga el usuario REAL (nombre, rol, etc.)
 * - Login devuelve token, y luego /me devuelve usuario.
 * - Este es el patrón "enterprise" típico.
 */

// ==============================
// REGISTRO (PÚBLICO)
// ==============================
router.post(
  "/register",
  validarCampos(["nombre", "email", "password"]),
  registrarUsuario
);

// ==============================
// LOGIN (PÚBLICO)
// ==============================
router.post(
  "/login",
  validarCampos(["email", "password"]),
  loginUsuario
);

// ==============================
// ME (PRIVADO / PRO)
// ==============================
/**
 * GET /api/auth/me
 *
 * REQUIERE:
 * Header: Authorization: Bearer <token>
 *
 * - verificarToken valida el JWT
 * - y deja payload en req.usuario (así lo definiste tú en middleware/auth.js)
 */
router.get("/me", verificarToken, meUsuario);

module.exports = router;
