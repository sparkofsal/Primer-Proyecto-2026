// src/layouts/AppLayout.jsx
import { Link, Outlet } from "react-router-dom";
import { APP_CONFIG } from "../config/appConfig";
import { authStore } from "../features/auth/authStore";

/**
 * Layout principal para usuarios logueados.
 * ✅ Sidebar simple + contenido.
 * TODO: cuando metas UI library, este layout se vuelve tu "shell" pro.
 */
export default function AppLayout() {
  const session = authStore.getSession();

  const logout = () => {
    authStore.clearSession();
    window.location.href = "/login";
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", minHeight: "100vh" }}>
      <aside style={{ borderRight: "1px solid #eee", padding: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              border: "1px solid #ddd",
              display: "grid",
              placeItems: "center",
              fontWeight: 700,
            }}
          >
            {APP_CONFIG.brand.logoText}
          </div>
          <div>
            <div style={{ fontWeight: 700 }}>{APP_CONFIG.brand.appName}</div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>
              {session.user?.name || session.user?.email || "Usuario"}
            </div>
          </div>
        </div>

        <nav style={{ marginTop: 18, display: "grid", gap: 10 }}>
          <Link to="/dashboard">Dashboard</Link>

          {APP_CONFIG.features.users ? <Link to="/users">Usuarios</Link> : null}

          {APP_CONFIG.features.roomserviceOrders ? (
            <Link to="/orders">Órdenes</Link>
          ) : null}
        </nav>

        <div style={{ marginTop: 18 }}>
          <button onClick={logout} style={{ padding: 10, width: "100%" }}>
            Salir
          </button>
        </div>
      </aside>

      <main style={{ padding: 20 }}>
        <Outlet />
      </main>
    </div>
  );
}
