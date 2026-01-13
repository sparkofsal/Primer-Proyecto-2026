// src/features/auth/authStore.js
import { storage } from "../../utils/storage";

/**
 * AUTH STORE (simple y profesional)
 *
 * ✅ Guarda token + user en localStorage.
 * ✅ Permite que la sesión sobreviva si cierro/abro el navegador.
 *
 * NOTA (para mi yo del futuro):
 * - Si luego cambio a cookies httpOnly, aquí dejo de guardar token.
 */

export const authStore = {
  getSession() {
    return {
      token: storage.getToken(),
      user: storage.getUser(),
    };
  },

  setSession({ token, user }) {
    // NOTA: guardamos token siempre que exista
    if (token) storage.setToken(token);

    // NOTA: user puede ser null en algunos pasos (ej: antes de /me)
    if (user) storage.setUser(user);
  },

  clearSession() {
    storage.clearAll();
  },
};
