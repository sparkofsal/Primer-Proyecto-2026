// src/features/auth/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "./authService";
import { authStore } from "./authStore";
import { APP_CONFIG } from "../../config/appConfig";

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
      const data = await authService.login({ email, password });

      // ✅ NOTA: si tu backend devuelve otras keys, cámbialo aquí.
      authStore.setSession({
        token: data.token,
        user: data.user,
      });

      navigate(APP_CONFIG.routing.afterLogin, { replace: true });
    } catch (err) {
      // ✅ Mensaje “humano”
      const msg =
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
