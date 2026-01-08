// src/services/apiClient.js
import axios from "axios";
import { APP_CONFIG } from "../config/appConfig";
import { storage } from "../utils/storage";

/**
 * Axios instance centralizada.
 * ✅ Aquí se maneja: baseURL, prefijo, token, errores comunes.
 * TODO: Si tu backend usa refresh tokens, este será el lugar para interceptores más avanzados.
 */

const baseURL = `${APP_CONFIG.api.baseURL}${APP_CONFIG.api.prefix}`;

export const apiClient = axios.create({
  baseURL,
  timeout: 15000,
});

apiClient.interceptors.request.use((config) => {
  const token = storage.getToken();

  // ✅ NOTA: Ajusta el header si tu backend usa otro esquema (ej. "Token xxx")
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

apiClient.interceptors.response.use(
  (resp) => resp,
  (err) => {
    // ✅ Manejo simple de expiración / inválido
    const status = err?.response?.status;

    // NOTA: Ajusta este status según tu backend (401 típico)
    if (status === 401) {
      storage.clearAll();
      // TIP: Evita loops: solo redirige si no estás ya en /login
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(err);
  }
);
