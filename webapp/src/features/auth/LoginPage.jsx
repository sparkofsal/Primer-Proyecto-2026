// src/features/auth/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "./authService";
import { authStore } from "./authStore";
import { APP_CONFIG } from "../../config/appConfig";

/**
 * LOGIN PAGE (PRO)
 *
 * Flujo:
 * 1) Login -> token
 * 2) Guardar token (para que apiClient lo mande)
 * 3) /me -> usuario real
 * 4) Guardar user
 * 5) Navigate dashboard
 *
 * NOTA:
 * - Esto es vendible porque ya soporta roles con "user.rol"
 */

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);

    try {
      // 1) login: obtengo token
      const { token } = await authService.login({ email, password });

      // 2) guardo token primero (importante)
      authStore.setSession({ token, user: null });

      // 3) obtengo usuario real
      const user = await authService.me();

      // 4) guardo user
      authStore.setSession({ token, user });

      // 5) entro al dashboard
      navigate(APP_CONFIG.routing.afterLogin, { replace: true });
    } catch (err) {
      // NOTA: tu backend usa "mensaje", no "message"
      const msg =
        err?.response?.data?.mensaje ||
        err?.response?.data?.message ||
        "No pude iniciar sesión. Revisa tus credenciales o tu servidor.";
      setError(msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "80px auto", padding: 16 }}>
      <h1 style={{ marginBottom: 6 }}>{APP_CONFIG.brand.appName}</h1>
      <p style={{ marginTop: 0, opacity: 0.8 }}>{APP_CONFIG.brand.tagline}</p>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 10 }}>
        <label>
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            autoComplete="email"
            style={{ width: "100%", padding: 10, marginTop: 6 }}
          />
        </label>

        <label>
          Password
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="current-password"
            style={{ width: "100%", padding: 10, marginTop: 6 }}
          />
        </label>

        {error ? (
          <div style={{ background: "#ffe5e5", padding: 10, borderRadius: 8 }}>
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={busy}
          style={{
            padding: 12,
            borderRadius: 10,
            border: "1px solid #ddd",
            cursor: busy ? "not-allowed" : "pointer",
          }}
        >
          {busy ? "Entrando..." : "Entrar"}
        </button>

        {/* TODO (white-label): aquí puedes meter SSO, PIN por habitación, etc. */}
      </form>
    </div>
  );
}
