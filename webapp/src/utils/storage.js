// src/utils/storage.js
/**
 * Helpers para localStorage.
 * NOTA: Si en el futuro migras a cookies httpOnly, aquí cambias la estrategia.
 */

const TOKEN_KEY = "rs_token";
const USER_KEY = "rs_user";

export const storage = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },
  setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  },
  clearToken() {
    localStorage.removeItem(TOKEN_KEY);
  },
  getUser() {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  },
  setUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  clearUser() {
    localStorage.removeItem(USER_KEY);
  },
  clearAll() {
    this.clearToken();
    this.clearUser();
  },
};
