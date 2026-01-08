// src/features/roomservice/roomserviceService.js
import { apiClient } from "../../services/apiClient";

/**
 * TODO: Ajusta estos endpoints a tu backend real de órdenes:
 * - GET /orders
 * - POST /orders
 * - PATCH /orders/:id/status
 */
export const roomserviceService = {
  async listOrders() {
    const { data } = await apiClient.get("/orders");
    return data;
  },
};
