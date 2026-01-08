// src/features/users/UsersPage.jsx
import { useEffect, useState } from "react";
import { usersService } from "./usersService";

export default function UsersPage() {
  const [items, setItems] = useState([]);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");

  // form simple
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const load = async () => {
    setBusy(true);
    setError("");
    try {
      const data = await usersService.list();
      setItems(Array.isArray(data) ? data : data.items || []);
    } catch (err) {
      setError(err?.response?.data?.message || "No pude cargar usuarios. Revisa el endpoint /users.");
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onCreate = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // TODO: agrega campos necesarios según tu backend (password, role, etc.)
      await usersService.create({ name, email });
      setName("");
      setEmail("");
      await load();
    } catch (err) {
      setError(err?.response?.data?.message || "No pude crear el usuario (revisa payload y endpoint).");
    }
  };

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <h2 style={{ margin: 0 }}>Usuarios</h2>

      <form onSubmit={onCreate} style={{ display: "grid", gap: 10, maxWidth: 520 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        </div>

        <button type="submit">Crear usuario</button>

        {/* NOTA (para ti futuro):
            Si tu backend requiere password/role:
            - agrega inputs aquí
            - envía { name, email, password, role }
        */}
      </form>

      {error ? <div style={{ background: "#ffe5e5", padding: 10, borderRadius: 10 }}>{error}</div> : null}

      <div style={{ border: "1px solid #eee", borderRadius: 14, padding: 12 }}>
        {busy ? (
          "Cargando..."
        ) : (
          <table width="100%">
            <thead>
              <tr style={{ textAlign: "left" }}>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {items.map((u) => (
                <tr key={u.id || u._id}>
                  <td>{u.id || u._id || "—"}</td>
                  <td>{u.name || u.nombre || "—"}</td>
                  <td>{u.email || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
