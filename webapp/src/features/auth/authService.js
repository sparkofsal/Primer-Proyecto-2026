// src/features/auth/authService.js
import { apiClient } from "../../services/apiClient";

/**
 * AUTH SERVICE (PRO)
 *
 * Flujo:
 * 1) POST /auth/login -> { mensaje, token }
 * 2) GET  /auth/me    -> { usuario }
 *
 * NOTA (para mi yo del futuro):
 * - Este patrón es vendible porque separa token y user.
 * - Si mañana agrego multi-tenant, /me puede devolver tenantId, permisos, etc.
 */

export const authService = {
  // ✅ Login -> devuelve token
  async login({ email, password }) {
    const { data } = await apiClient.post("/auth/login", { email, password });

    return {
      token: data.token, // NOTA: tu backend lo llama "token"
    };
  },

  // ✅ Me -> devuelve usuario real
  async me() {
    const { data } = await apiClient.get("/auth/me");

    // data = { usuario: { id, nombre, email, rol } }
    return data.usuario;
  },
};
