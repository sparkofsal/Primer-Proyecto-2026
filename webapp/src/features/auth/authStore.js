// src/features/auth/authStore.js
import { storage } from "../../utils/storage";

/**
 * Store MUY simple (sin Redux).
 * ✅ Mantiene token + user en memoria y storage.
 * TODO: Si crece mucho, migras a Zustand/Redux sin romper el resto.
 */

export const authStore = {
  getSession() {
    return {
      token: storage.getToken(),
      user: storage.getUser(),
    };
  },
  setSession({ token, user }) {
    storage.setToken(token);
    storage.setUser(user);
  },
  clearSession() {
    storage.clearAll();
  },
};
