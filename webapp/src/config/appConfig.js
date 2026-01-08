// src/config/appConfig.js
/**
 * ✅ WHITE-LABEL CONFIG (la magia de hacerlo mi side hustle)
 * Cambiando ESTE archivo, adaptas la app a:
 * - Hotel roomservice
 * - Restaurante
 * - Tienda / conveniencia
 * - etc.
 *
 * NOTA: Mantén esto simple; si lo vuelves enorme, luego se vuelve difícil de mantener.
 */

export const APP_CONFIG = {
  brand: {
    appName: "RoomService",
    tagline: "Pedidos rápidos, control total.",
    // TODO (para otro nicho): cambia el logo y nombre
    logoText: "RS",
  },

  // ✅ Ajusta esto a tu backend real
  api: {
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
    // TIP: Si tu backend usa prefijo tipo /api, ponlo aquí:
    prefix: import.meta.env.VITE_API_PREFIX || "/api",
  },

  // ✅ Flags para activar/desactivar módulos (white-label)
  features: {
    users: true,
    roomserviceOrders: true,
    // Ejemplos para futuro:
    inventory: false,
    reservations: false,
    payments: false,
  },

  // ✅ Rutas base (si luego haces multi-tenant por cliente)
  routing: {
    afterLogin: "/dashboard",
  },
};
