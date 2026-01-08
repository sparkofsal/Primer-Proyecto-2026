// src/features/roomservice/OrdersPage.jsx
import { useEffect, useState } from "react";
import { roomserviceService } from "./roomserviceService";

export default function OrdersPage() {
  const [items, setItems] = useState([]);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setBusy(true);
    setError("");
    try {
      const data = await roomserviceService.listOrders();
      setItems(Array.isArray(data) ? data : data.items || []);
    } catch (err) {
      setError(err?.response?.data?.message || "No pude cargar órdenes. Revisa endpoint /orders.");
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <h2 style={{ margin: 0 }}>Órdenes</h2>

      {error ? <div style={{ background: "#ffe5e5", padding: 10, borderRadius: 10 }}>{error}</div> : null}

      <div style={{ border: "1px solid #eee", borderRadius: 14, padding: 12 }}>
        {busy ? (
          "Cargando..."
        ) : (
          <table width="100%">
            <thead>
              <tr style={{ textAlign: "left" }}>
                <th>ID</th>
                <th>Habitación</th>
                <th>Status</th>
                <th>Creada</th>
              </tr>
            </thead>
            <tbody>
              {items.map((o) => (
                <tr key={o.id || o._id}>
                  <td>{o.id || o._id || "—"}</td>
                  {/* TODO: si en otro nicho NO hay habitación, cambia el header y campo */}
                  <td>{o.roomNumber || o.room || "—"}</td>
                  <td>{o.status || "—"}</td>
                  <td>{o.createdAt ? new Date(o.createdAt).toLocaleString() : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* TODO (función diferencial):
          - Botones para cambiar status: Pending -> Preparing -> Delivered
          - Notificaciones en tiempo real (más adelante con WebSocket)
      */}
    </div>
  );
}
