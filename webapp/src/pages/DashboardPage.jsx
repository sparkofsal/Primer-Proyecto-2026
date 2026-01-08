// src/pages/DashboardPage.jsx
import { APP_CONFIG } from "../config/appConfig";

export default function DashboardPage() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <h2 style={{ margin: 0 }}>Dashboard</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
        <KpiCard title="Órdenes hoy" value="—" note="TODO: conectar a /orders/today" />
        <KpiCard title="Pendientes" value="—" note="TODO: conectar a /orders?status=pending" />
        <KpiCard title="Tiempo promedio" value="—" note="TODO: analytics simple" />
      </div>

      <div style={{ padding: 16, border: "1px solid #eee", borderRadius: 14 }}>
        <h3 style={{ marginTop: 0 }}>Siguiente paso</h3>
        <p style={{ marginBottom: 0, opacity: 0.8 }}>
          Esta app está lista para crecer por módulos. Si cambias <b>APP_CONFIG</b>, la conviertes en restaurante o tienda
          sin romper arquitectura.
        </p>
      </div>

      <div style={{ fontSize: 12, opacity: 0.65 }}>
        Branding actual: <b>{APP_CONFIG.brand.appName}</b>
      </div>
    </div>
  );
}

function KpiCard({ title, value, note }) {
  return (
    <div style={{ padding: 16, border: "1px solid #eee", borderRadius: 14 }}>
      <div style={{ fontSize: 12, opacity: 0.7 }}>{title}</div>
      <div style={{ fontSize: 28, fontWeight: 800, marginTop: 6 }}>{value}</div>
      <div style={{ fontSize: 12, opacity: 0.7, marginTop: 6 }}>{note}</div>
    </div>
  );
}
