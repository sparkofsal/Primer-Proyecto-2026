// middleware/requireRole.js

/**
 * REQUIRE ROLE (PRO)
 *
 * ✅ Este middleware se usa DESPUÉS de verificarToken.
 * ✅ Sirve para restringir rutas por rol (admin, staff, etc.)
 *
 * NOTA (para mi yo del futuro):
 * - Si vendo esto, cada cliente querrá permisos.
 * - Este archivo hace esa parte fácil y repetible.
 *
 * EJEMPLO:
 * router.get("/users", verificarToken, requireRole("admin"), handler)
 */

function requireRole(...allowedRoles) {
  return (req, res, next) => {
    // NOTA: tu middleware auth guarda el payload en req.usuario
    const rol = req.usuario?.rol;

    if (!rol) {
      return res.status(401).json({ mensaje: "No autorizado: sin rol" });
    }

    if (!allowedRoles.includes(rol)) {
      return res.status(403).json({ mensaje: "No tienes permisos suficientes" });
    }

    next();
  };
}

module.exports = requireRole;
