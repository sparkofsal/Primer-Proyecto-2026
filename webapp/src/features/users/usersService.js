// src/features/users/usersService.js
import { apiClient } from "../../services/apiClient";

/**
 * USERS SERVICE (Frontend)
 *
 * NOTAS:
 * - Backend: GET /api/users -> { items: [...] }
 * - Backend: POST /api/users -> crea usuario (solo admin)
 *
 * TODO (vendible):
 * - Agregar updateUser
 * - Agregar deactivateUser
 */

export const usersService = {
  async list() {
    const { data } = await apiClient.get("/users");
    return data.items; // ✅ ya viene como { items }
  },

  async create(payload) {
    const { data } = await apiClient.post("/users", payload);
    return data;
  },
};
