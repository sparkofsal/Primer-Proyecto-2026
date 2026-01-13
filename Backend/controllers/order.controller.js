// controllers/order.controller.js
const db = require("../config/db");

/**
 * ORDER CONTROLLER (PRO)
 *
 * NOTAS:
 * - cliente: solo ve sus órdenes
 * - admin/staff: ven todas
 *
 * Esto permite:
 * - dashboard por rol
 * - escalabilidad
 */

async function listarOrders(req, res) {
  try {
    const { rol, id: userId } = req.usuario;

    let rows;

    if (rol === "admin" || rol === "staff") {
      // Admin / staff: todas las órdenes
      [rows] = await db.query(
        `
        SELECT o.*, u.nombre AS user_nombre, u.email AS user_email
        FROM orders o
        JOIN users u ON u.id = o.user_id
        ORDER BY o.id DESC
        `
      );
    } else {
      // Cliente: solo sus órdenes
      [rows] = await db.query(
        `
        SELECT o.*
        FROM orders o
        WHERE o.user_id = ?
        ORDER BY o.id DESC
        `,
        [userId]
      );
    }

    return res.json({ items: rows });
  } catch (error) {
    console.error("Error en listarOrders:", error);
    return res.status(500).json({ mensaje: "Error en el servidor" });
  }
}

async function crearOrder(req, res) {
  try {
    const { title, description, total } = req.body;
    const userId = req.usuario.id;

    if (!title) {
      return res.status(400).json({
        mensaje: "title es requerido",
      });
    }

    const [result] = await db.query(
      `
      INSERT INTO orders (user_id, title, description, total)
      VALUES (?, ?, ?, ?)
      `,
      [userId, title, description || "", total || 0]
    );

    return res.status(201).json({
      mensaje: "Orden creada",
      order: {
        id: result.insertId,
        title,
        description,
        total,
        status: "pending",
      },
    });
  } catch (error) {
    console.error("Error en crearOrder:", error);
    return res.status(500).json({ mensaje: "Error en el servidor" });
  }
}

module.exports = {
  listarOrders,
  crearOrder,
};
