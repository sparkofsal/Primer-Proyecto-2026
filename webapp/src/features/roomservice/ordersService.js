// src/features/roomservice/ordersService.js
import { apiClient } from "../../services/apiClient";

/**
 * ORDERS SERVICE (GENÉRICO)
 *
 * NOTAS:
 * - Este service habla con /api/orders
 * - Backend SIEMPRE devuelve: { items: [...] }
 *
 * SI CAMBIAS EL BACKEND:
 * - Si cambias la ruta -> cambia "/orders" aquí
 * - Si cambias la forma del response -> ajusta data.items
 */

export const ordersService = {
  // Obtener órdenes
  async list() {
    const { data } = await apiClient.get("/orders");

    // NOTA:
    // El backend ya devuelve { items }, así que aquí normalizamos
    return data.items || [];
  },

  // Crear orden (opcional, para más adelante)
  async create(payload) {
    /**
     * payload puede ser:
     * - roomservice: { title, description, roomNumber }
     * - restaurant: { title, tableNumber }
     * - store: { title, sku }
     */
    const { data } = await apiClient.post("/orders", payload);
    return data;
  },
};
