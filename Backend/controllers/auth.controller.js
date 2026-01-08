// controllers/auth.controller.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/jwt');
const db = require('../config/db');

// POST /api/auth/register
async function registrarUsuario(req, res) {
  try {
    const { nombre, email, password } = req.body; // ✅ ya no aceptamos "rol"

    if (!nombre || !email || !password) {
      return res.status(400).json({ mensaje: 'nombre, email y password son requeridos' });
    }

    const [existentes] = await db.query(
      'SELECT id FROM users WHERE email = ? LIMIT 1',
      [email]
    );

    if (existentes.length > 0) {
      return res.status(400).json({ mensaje: 'El email ya está registrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordEncriptado = await bcrypt.hash(password, salt);

    const rolFinal = 'cliente'; // ✅ siempre cliente al registrarse

    const [result] = await db.query(
      'INSERT INTO users (nombre, email, password, rol) VALUES (?, ?, ?, ?)',
      [nombre, email, passwordEncriptado, rolFinal]
    );

    res.status(201).json({
      mensaje: 'Usuario registrado correctamente',
      usuario: {
        id: result.insertId,
        nombre,
        email,
        rol: rolFinal,
      },
    });
  } catch (error) {
    console.error('Error en registrarUsuario:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
}

// POST /api/auth/login
async function loginUsuario(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ mensaje: 'email y password son requeridos' });
    }

    const [rows] = await db.query(
      'SELECT id, nombre, email, password, rol FROM users WHERE email = ? LIMIT 1',
      [email]
    );

    const usuario = rows[0];
    if (!usuario) {
      return res.status(400).json({ mensaje: 'Credenciales inválidas' });
    }

    const esValida = await bcrypt.compare(password, usuario.password);
    if (!esValida) {
      return res.status(400).json({ mensaje: 'Credenciales inválidas' });
    }

    const payload = {
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });

    res.json({ mensaje: 'Login exitoso', token });
  } catch (error) {
    console.error('Error en loginUsuario:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
}

module.exports = {
  registrarUsuario,
  loginUsuario,
};
