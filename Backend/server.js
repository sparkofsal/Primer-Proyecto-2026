/**
 * server.js (Backend)
 * ✅ Objetivo: backend "vendible" (seguro, claro, fácil de mantener)
 *
 * NOTAS (para mi yo del futuro):
 * - Aquí se configuran middlewares globales (json, cors, seguridad, rutas).
 * - Si en el futuro separo app/server: muevo app a app.js y dejo aquí solo app.listen().
 * - Este archivo debe ser fácil de leer: por eso está seccionado (1..6).
 */

require("dotenv").config();
const express = require("express");

const app = express();

// ==========================
// 0) SETTINGS (para despliegue real)
// ==========================
/**
 * NOTA:
 * - Si algún día lo despliego en un servicio que usa proxy (Render/Heroku/Nginx),
 *   esto ayuda a que Express lea bien la IP real del cliente.
 * - En local NO te afecta.
 */
app.set("trust proxy", 1);

// ==========================
// 1) CONFIG BÁSICA
// ==========================

/**
 * ✅ Permite leer JSON en requests (POST/PUT)
 * NOTA: El limit evita que te manden un JSON gigante (seguridad + performance).
 * TODO (si algún día necesitas subir imágenes/base64): sube este límite, pero con cuidado.
 */
app.use(express.json({ limit: "1mb" }));

/**
 * ✅ PORT desde .env (si no existe, cae a 3000)
 * NOTA: En producción muchas veces el proveedor te asigna el puerto.
 */
const PORT = process.env.PORT || 3000;

// ==========================
// 2) CORS (MUY IMPORTANTE PARA REACT)
// ==========================
/**
 * NOTA:
 * - React (Vite) corre normalmente en http://localhost:5173
 * - Si no agrego CORS, el navegador bloqueará requests al backend.
 *
 * TODO (cuando venda y despliegue):
 * - Cambiar origin a dominio real (ej: https://cliente.com)
 * - O usar una lista blanca de dominios permitidos.
 */
const cors = require("cors");
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

// ==========================
// 3) SEGURIDAD BÁSICA (PRODUCTO REAL)
// ==========================
/**
 * Helmet agrega headers de seguridad.
 * NOTA: Esto NO cambia tus rutas, solo refuerza seguridad en headers.
 * TODO: Ajustar CSP si meto recursos externos (CDNs).
 */
const helmet = require("helmet");
app.use(helmet());

// ==========================
// 4) RUTAS
// ==========================
/**
 * NOTA:
 * - Mantener un prefijo consistente hace el proyecto más "enterprise".
 * - Por ahora uso /api, pero cuando sea versión vendible recomiendo /api/v1.
 *
 * TODO (para vender mejor): cambiar "/api" a "/api/v1" en TODO el proyecto.
 */

// ✅ Importo mis rutas (cada archivo debe tener sus endpoints bien definidos)
const ejemploRoutes = require("./routes/ejemplo.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const adminRoutes = require("./routes/admin.routes");

// ✅ Health check (para deploy/monitoreo)
/**
 * NOTA:
 * - Esto sirve para saber si el servidor está vivo.
 * - Ideal para monitoreo en producción.
 */
app.get("/health", (req, res) => {
  res.json({
    ok: true,
    service: "backend-node",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// ✅ Ruta raíz (simple)
/**
 * NOTA:
 * - Esta ruta solo confirma que el backend está arriba.
 * - No debería tener lógica de negocio.
 */
app.get("/", (req, res) => {
  res.send("El servidor funciona correctamente ✅");
});

// ✅ Prefijos API (aquí conecto cada módulo de rutas)
app.use("/api/ejemplos", ejemploRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

// ==========================
// 5) NOT FOUND + ERROR HANDLER
// ==========================

/**
 * ✅ 404 Not Found
 * Si llega aquí, no existe la ruta.
 * NOTA: mantener respuesta consistente ayuda al frontend.
 */
app.use((req, res) => {
  res.status(404).json({
    ok: false,
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
  });
});

/**
 * ✅ Error handler central
 * NOTA:
 * - Esto atrapa errores de toda la app y responde siempre igual.
 * - En producción NO mandamos stack (por seguridad).
 */
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err);

  const status = err.status || 500;

  res.status(status).json({
    ok: false,
    message: err.message || "Error interno del servidor",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// ==========================
// 6) START SERVER
// ==========================
app.listen(PORT, () => {
  console.log(`Servidor escucha en http://localhost:${PORT}`);
  console.log(`Health: http://localhost:${PORT}/health`);
});
