// src/services/apiClient.js
import axios from "axios";
import { APP_CONFIG } from "../config/appConfig";
import { storage } from "../utils/storage";

/**
 * API CLIENT (PRO)
 *
 * ✅ Centraliza configuración de Axios:
 * - baseURL (backend)
 * - prefix (/api)
 * - token automático en Authorization
 * - manejo básico de 401 (sesión expirada)
 *
 * NOTA (para mi yo del futuro):
 * - Si cambio a /api/v1, solo cambio APP_CONFIG o .env
 * - Si cambio a cookies httpOnly, aquí se ajusta la auth
 */

const baseURL = `${APP_CONFIG.api.baseURL}${APP_CONFIG.api.prefix}`;

export const apiClient = axios.create({
  baseURL,
  timeout: 15000,
});

// ✅ Interceptor: antes de cada request, agregar token si existe
apiClient.interceptors.request.use((config) => {
  const token = storage.getToken();

  // NOTA: backend espera "Bearer <token>"
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ✅ Interceptor: si el token falla, limpiamos sesión
apiClient.interceptors.response.use(
  (resp) => resp,
  (err) => {
    const status = err?.response?.status;

    // NOTA: 401 = no autorizado (token inválido/expirado)
    if (status === 401) {
      storage.clearAll();

      // NOTA: Evitamos loop si ya estamos en login
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(err);
  }
);
