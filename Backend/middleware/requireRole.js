// middleware/requireRole.js
function requireRole(rolPermitido) {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({ mensaje: 'No autenticado' });
    }

    if (req.usuario.rol !== rolPermitido) {
      return res.status(403).json({ mensaje: 'No tienes permisos suficientes' });
    }

    next();
  };
}

module.exports = requireRole;
