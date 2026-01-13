// src/features/users/UsersPage.jsx
import { useEffect, useState } from "react";
import { usersService } from "./usersService";

/**
 * USERS PAGE (PRO)
 *
 * NOTAS:
 * - Este panel es para admin.
 * - Si un cliente entra aquí, backend lo bloqueará con 403.
 *
 * TODO (vendible):
 * - Agregar filtro/búsqueda
 * - Agregar edición de rol
 * - Agregar desactivar usuario
 */

export default function UsersPage() {
  const [items, setItems] = useState([]);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");

  // Form
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("cliente");

  const load = async () => {
    setBusy(true);
    setError("");

    try {
      const users = await usersService.list();
      setItems(users);
    } catch (err) {
      const msg =
        err?.response?.data?.mensaje ||
        err?.response?.data?.message ||
        "No pude cargar usuarios. (¿Tu usuario es admin?)";
      setError(msg);
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
      await usersService.create({ nombre, email, password, rol });

      // Limpio form
      setNombre("");
      setEmail("");
      setPassword("");
      setRol("cliente");

      await load();
    } catch (err) {
      const msg =
        err?.response?.data?.mensaje ||
        err?.response?.data?.message ||
        "No pude crear el usuario.";
      setError(msg);
    }
  };

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <h2 style={{ margin: 0 }}>Usuarios (Admin)</h2>

      <form
        onSubmit={onCreate}
        style={{
          display: "grid",
          gap: 10,
          maxWidth: 680,
          padding: 12,
          border: "1px solid #eee",
          borderRadius: 14,
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
          />

          <select value={rol} onChange={(e) => setRol(e.target.value)}>
            <option value="cliente">cliente</option>
            <option value="staff">staff</option>
            <option value="admin">admin</option>
          </select>
        </div>

        <button type="submit">Crear usuario</button>

        {/* NOTA:
            Si quieres que "register" permita staff/admin, NO lo recomiendo.
            Mejor mantener register como cliente y crear staff/admin desde aquí.
        */}
      </form>

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
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Creado</th>
              </tr>
            </thead>
            <tbody>
              {items.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.nombre}</td>
                  <td>{u.email}</td>
                  <td>{u.rol}</td>
                  <td>{u.created_at ? new Date(u.created_at).toLocaleString() : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
