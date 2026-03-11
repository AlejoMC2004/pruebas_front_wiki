// components/auth/LoginForm.jsx
"use client";

import { useState } from "react";
import { login } from "@/lib/authService";
import { useRouter } from "next/navigation";
import { THEME } from "@/styles/theme";

export default function LoginForm() {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const session = await login(email.trim(), password);
      if (session) {
        router.push("/");
      } else {
        setError("Correo o contraseña incorrectos.");
      }
    } catch {
      setError("Error al iniciar sesión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={s.form}>
      {/* Email */}
      <div style={s.field}>
        <label style={s.label}>Correo electrónico</label>
        <input
          type="email"
          required
          autoComplete="email"
          placeholder="usuario@wikicv.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={s.input}
          onFocus={(e)  => (e.target.style.borderColor = THEME.colors.tealLight)}
          onBlur={(e)   => (e.target.style.borderColor = THEME.colors.border)}
        />
      </div>

      {/* Password */}
      <div style={s.field}>
        <label style={s.label}>Contraseña</label>
        <input
          type="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={s.input}
          onFocus={(e)  => (e.target.style.borderColor = THEME.colors.tealLight)}
          onBlur={(e)   => (e.target.style.borderColor = THEME.colors.border)}
        />
      </div>

      {/* Error */}
      {error && <p style={s.error}>{error}</p>}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        style={{ ...s.btn, ...(loading ? s.btnDisabled : {}) }}
      >
        {loading ? "Iniciando sesión…" : "Iniciar sesión"}
      </button>

      {/* Hint de cuentas demo */}
      <p style={s.hint}>
        Demo — admin@wikicv.com / user@wikicv.com · contraseña: <code>123456</code>
      </p>
    </form>
  );
}

const s = {
  form: {
    display:       "flex",
    flexDirection: "column",
    gap:           "20px",
  },
  field: {
    display:       "flex",
    flexDirection: "column",
    gap:           "6px",
  },
  label: {
    fontSize:   "13px",
    fontWeight: 600,
    color:      THEME.colors.text,
  },
  input: {
    padding:      "10px 14px",
    borderRadius: THEME.radius.sm,
    border:       `1px solid ${THEME.colors.border}`,
    fontSize:     "14px",
    color:        THEME.colors.text,
    background:   "#fff",
    outline:      "none",
    transition:   "border-color 0.15s",
  },
  error: {
    background:   "#fff3f3",
    border:       "1px solid #f5c6cb",
    borderRadius: THEME.radius.sm,
    padding:      "10px 14px",
    fontSize:     "13px",
    color:        "#c0392b",
    margin:       0,
  },
  btn: {
    padding:      "11px",
    borderRadius: THEME.radius.sm,
    background:   THEME.colors.navy,
    color:        "#fff",
    fontWeight:   700,
    fontSize:     "15px",
    border:       "none",
    cursor:       "pointer",
    transition:   "opacity 0.15s",
  },
  btnDisabled: {
    opacity: 0.6,
    cursor:  "not-allowed",
  },
  hint: {
    textAlign:  "center",
    fontSize:   "12px",
    color:      THEME.colors.muted,
    margin:     0,
  },
};
