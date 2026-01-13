// controllers/user.controller.js
const bcrypt = require("bcryptjs");
const db = require("../config/db");

/**
 * USER CONTROLLER (PRO)
 *
 * NOTAS:
 * - listarUsuarios: devuelve usuarios SIN password (importante)
 * - crearUsuarioAdmin: permite a admin crear usuarios (staff/admin/cliente)
 *
 * TIP VENDIBLE:
 * - Esto te permite vender un "admin panel" real.
 */

// GET /api/users
async function listarUsuarios(req, res) {
  try {
    // ✅ NUNCA regreses password
    const [rows] = await db.query(
      "SELECT id, nombre, email, rol, created_at FROM users ORDER BY id DESC"
    );

    return res.json({ items: rows });
  } catch (error) {
    console.error("Error en listarUsuarios:", error);
    return res.status(500).json({ mensaje: "Error en el servidor" });
  }
}

// POST /api/users
async function crearUsuarioAdmin(req, res) {
  try {
    const { nombre, email, password, rol } = req.body;

    // ✅ Validación mínima
    if (!nombre || !email || !password || !rol) {
      return res.status(400).json({
        mensaje: "nombre, email, password y rol son requeridos",
      });
    }

    // ✅ Roles permitidos (evita basura)
    const rolesPermitidos = ["cliente", "staff", "admin"];
    if (!rolesPermitidos.includes(rol)) {
      return res.status(400).json({
        mensaje: `Rol inválido. Usa: ${rolesPermitidos.join(", ")}`,
      });
    }

    const [existentes] = await db.query(
      "SELECT id FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (existentes.length > 0) {
      return res.status(400).json({ mensaje: "El email ya está registrado" });
    }

    // ✅ Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordEncriptado = await bcrypt.hash(password, salt);

    const [result] = await db.query(
      "INSERT INTO users (nombre, email, password, rol) VALUES (?, ?, ?, ?)",
      [nombre, email, passwordEncriptado, rol]
    );

    return res.status(201).json({
      mensaje: "Usuario creado correctamente",
      usuario: {
        id: result.insertId,
        nombre,
        email,
        rol,
      },
    });
  } catch (error) {
    console.error("Error en crearUsuarioAdmin:", error);
    return res.status(500).json({ mensaje: "Error en el servidor" });
  }
}

module.exports = {
  listarUsuarios,
  crearUsuarioAdmin,
};
