// src/features/auth/authService.js
import { apiClient } from "../../services/apiClient";

/**
 * AUTH SERVICE (Frontend)
 * ✅ Aquí viven TODAS las llamadas al backend relacionadas a autenticación.
 *
 * NOTA IMPORTANTE (para mi yo del futuro):
 * - Mi backend actual (Node + MySQL) responde así en login:
 *   POST /api/auth/login  ->  { mensaje: "Login exitoso", token: "xxxxx" }
 *
 * - OJO: mi backend NO está regresando el usuario completo todavía,
 *   solo el token. Eso es normal en muchos proyectos.
 *
 * TODO (upgrade vendible / PRO):
 * - Agregar endpoint GET /api/auth/me en el backend para traer el usuario
 *   y así llenar user en frontend (rol, nombre, etc.)
 */

export const authService = {
  /**
   * Login
   * ✅ Envía email/password al backend y recibe token.
   *
   * @param {Object} params
   * @param {string} params.email
   * @param {string} params.password
   *
   * @returns {Object} session
   * @returns {string} session.token  - JWT para requests protegidos
   * @returns {Object|null} session.user - Por ahora null (hasta tener /auth/me)
   */
  async login({ email, password }) {
    /**
     * NOTA:
     * - En apiClient ya tengo baseURL + prefix (/api).
     * - Por eso aquí solo pongo "/auth/login".
     *
     * SI CAMBIO EL BACKEND:
     * - Si tu ruta cambiara a "/api/v1/auth/login", NO lo cambies aquí.
     * - Cambia el prefix en APP_CONFIG o .env del frontend.
     */
    const { data } = await apiClient.post("/auth/login", { email, password });

    /**
     * ✅ RESPUESTA REAL DE TU BACKEND (hoy):
     * data = { mensaje: "Login exitoso", token: "xxxxx" }
     *
     * ✅ LO QUE LA APP NECESITA:
     * - token para guardar sesión
     * - user (opcional) para mostrar nombre/rol
     *
     * COMO AÚN NO TENGO user:
     * - Regreso user: null
     * - Más adelante, con /auth/me lo llenamos.
     */

    return {
      token: data.token, // ✅ este es el token que manda tu backend
      user: null,        // ⛳ TODO: llenar con /auth/me cuando exista
      // NOTA: También podrías regresar data.mensaje si quieres mostrarlo en UI
    };
  },

  /**
   * (FUTURO PRO) Obtener usuario actual desde token
   * ✅ Cuando agregues GET /api/auth/me en el backend, activas esto.
   *
   * async me() {
   *   const { data } = await apiClient.get("/auth/me");
   *   // Ejemplo esperado: { usuario: { id, nombre, email, rol } }
   *   return data.usuario;
   * }
   */
};
