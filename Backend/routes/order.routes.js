// routes/order.routes.js
const express = require("express");
const router = express.Router();

const verificarToken = require("../middleware/auth");
const requireRole = require("../middleware/requireRole");

const {
  listarOrders,
  crearOrder,
} = require("../controllers/order.controller");

/**
 * ORDERS ROUTES (PRO)
 *
 * NOTAS:
 * - Cliente: puede crear y ver SUS órdenes
 * - Admin / staff: pueden ver TODAS
 *
 * Esto hace el sistema vendible:
 * - roles
 * - visibilidad controlada
 */

// GET /api/orders
router.get(
  "/",
  verificarToken,
  listarOrders
);

// POST /api/orders
router.post(
  "/",
  verificarToken,
  crearOrder
);

module.exports = router;
