// controllers/auth.controller.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/jwt");
const db = require("../config/db");

/**
 * AUTH CONTROLLER (PRO)
 *
 * NOTAS (para mi yo del futuro):
 * - registrarUsuario: siempre crea rol "cliente"
 * - loginUsuario: valida credenciales y devuelve token
 * - meUsuario: devuelve el usuario real usando el token (patrón enterprise)
 */

// POST /api/auth/register
async function registrarUsuario(req, res) {
  try {
    const { nombre, email, password } = req.body; // ✅ no aceptamos "rol"

    if (!nombre || !email || !password) {
      return res
        .status(400)
        .json({ mensaje: "nombre, email y password son requeridos" });
    }

    const [existentes] = await db.query(
      "SELECT id FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (existentes.length > 0) {
      return res.status(400).json({ mensaje: "El email ya está registrado" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordEncriptado = await bcrypt.hash(password, salt);

    const rolFinal = "cliente"; // ✅ siempre cliente al registrarse

    const [result] = await db.query(
      "INSERT INTO users (nombre, email, password, rol) VALUES (?, ?, ?, ?)",
      [nombre, email, passwordEncriptado, rolFinal]
    );

    res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      usuario: {
        id: result.insertId,
        nombre,
        email,
        rol: rolFinal,
      },
    });
  } catch (error) {
    console.error("Error en registrarUsuario:", error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
}

// POST /api/auth/login
async function loginUsuario(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ mensaje: "email y password son requeridos" });
    }

    const [rows] = await db.query(
      "SELECT id, nombre, email, password, rol FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    const usuario = rows[0];
    if (!usuario) {
      return res.status(400).json({ mensaje: "Credenciales inválidas" });
    }

    const esValida = await bcrypt.compare(password, usuario.password);
    if (!esValida) {
      return res.status(400).json({ mensaje: "Credenciales inválidas" });
    }

    const payload = {
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
      // NOTA: no meto nombre aquí para que /me sea la fuente real del usuario
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" });

    res.json({ mensaje: "Login exitoso", token });
  } catch (error) {
    console.error("Error en loginUsuario:", error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
}

/**
 * GET /api/auth/me  ✅ (PRO)
 *
 * NOTA:
 * - Tu middleware/auth.js guarda el payload en req.usuario
 * - Aquí usamos req.usuario.id para buscar el usuario real en DB
 *
 * ¿Por qué esto es pro?
 * - Frontend puede obtener nombre/rol real sin meterlo todo en el token
 * - Facilita venderlo y escalarlo (roles, dashboards, multi-tenant, etc.)
 */
async function meUsuario(req, res) {
  try {
    const userId = req.usuario?.id;

    if (!userId) {
      return res.status(401).json({ mensaje: "No autorizado" });
    }

    const [rows] = await db.query(
      "SELECT id, nombre, email, rol FROM users WHERE id = ? LIMIT 1",
      [userId]
    );

    const usuario = rows[0];

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // ✅ Respuesta clara para frontend
    return res.json({ usuario });
  } catch (error) {
    console.error("Error en meUsuario:", error);
    return res.status(500).json({ mensaje: "Error en el servidor" });
  }
}

module.exports = {
  registrarUsuario,
  loginUsuario,
  meUsuario, // ✅ MUY IMPORTANTE exportarlo
};
