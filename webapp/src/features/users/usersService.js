// src/features/users/usersService.js
import { apiClient } from "../../services/apiClient";

/**
 * TODO: Ajusta endpoints a tu backend real:
 * - GET /users
 * - POST /users
 * - PUT /users/:id
 * - DELETE /users/:id (o desactivar)
 */
export const usersService = {
  async list() {
    const { data } = await apiClient.get("/users");
    return data;
  },
  async create(payload) {
    const { data } = await apiClient.post("/users", payload);
    return data;
  },
};
