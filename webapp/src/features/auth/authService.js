// src/features/auth/authService.js
import { apiClient } from "../../services/apiClient";

/**
 * ✅ Aquí van las llamadas reales al backend para auth.
 *
 * IMPORTANTÍSIMO:
 * - Ajusta los endpoints según tu backend real.
 * - Ajusta la forma del response (token/user) según lo que retorne tu API.
 */

export const authService = {
  async login({ email, password }) {
    // TODO: Cambia "/auth/login" por tu ruta real
    const { data } = await apiClient.post("/auth/login", { email, password });

    /**
     * Esperado:
     * data = { token: "...", user: { id, name, role, ... } }
     *
     * TODO: Si tu backend responde diferente, adapta aquí:
     *  - data.accessToken
     *  - data.usuario
     *  - etc.
     */
    return data;
  },
};
