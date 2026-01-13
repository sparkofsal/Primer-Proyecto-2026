// src/features/roomservice/OrdersPage.jsx
import { useEffect, useState } from "react";
import { ordersService } from "./ordersService";

/**
 * ORDERS PAGE (GENÉRICA)
 *
 * NOTAS IMPORTANTES:
 * - Esta vista NO asume que siempre es roomservice
 * - Los campos visibles se adaptan por nicho
 *
 * PARA OTROS NICHOS:
 * - Hotel  -> mostrar roomNumber
 * - Restaurante -> mostrar tableNumber
 * - Soporte -> mostrar ticketId
 */

export default function OrdersPage() {
  const [items, setItems] = useState([]);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setBusy(true);
    setError("");

    try {
      const orders = await ordersService.list();
      setItems(orders);
    } catch (err) {
      setError(
        err?.response?.data?.mensaje ||
        err?.response?.data?.message ||
        "No pude cargar órdenes. Revisa /api/orders."
      );
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

      {error ? (
        <div style={{ background: "#ffe5e5", padding: 10, borderRadius: 10 }}>
          {error}
        </div>
      ) : null}

      <div style={{ border: "1px solid #eee", borderRadius: 14, padding: 12 }}>
        {busy ? (
          "Cargando..."
        ) : (
          <table width="100%">
            <thead>
              <tr style={{ textAlign: "left" }}>
                <th>ID</th>
                <th>Título</th>
                <th>Status</th>
                <th>Creada</th>
              </tr>
            </thead>
            <tbody>
              {items.map((o) => (
                <tr key={o.id}>
                  <td>{o.id}</td>

                  {/* 
                    NOTA:
                    - Para roomservice: title = "Sandwich / Burger"
                    - Para restaurante: title = "Orden mesa 4"
                    - Para soporte: title = "Ticket impresora"
                  */}
                  <td>{o.title || "—"}</td>

                  <td>{o.status || "pending"}</td>

                  <td>
                    {o.created_at
                      ? new Date(o.created_at).toLocaleString()
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* 
        IDEAS DIFERENCIALES (para vender):
        - Cambiar status desde aquí (admin/staff)
        - Filtros por status
        - Vista por rol
      */}
    </div>
  );
}
