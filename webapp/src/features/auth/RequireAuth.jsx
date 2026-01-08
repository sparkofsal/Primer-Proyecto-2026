// src/features/auth/RequireAuth.jsx
import { Navigate } from "react-router-dom";
import { authStore } from "./authStore";

/**
 * Componente para proteger rutas.
 * - Si no hay token => redirige a /login
 * - Si necesitas roles, aquí lo agregas.
 */
export function RequireAuth({ children }) {
  const { token } = authStore.getSession();

  if (!token) return <Navigate to="/login" replace />;

  return children;
}
