// lib/authService.js
// Servicio de autenticación — mock inicial preparado para integración con backend real.

const MOCK_USERS = [
  { email: "admin@wikicv.com", password: "123456", role: "admin", name: "Administrador" },
  { email: "user@wikicv.com",  password: "123456", role: "user",  name: "Usuario"       },
];

/**
 * Autentica al usuario y guarda la sesión en localStorage.
 * Retorna el objeto de sesión o null si las credenciales son incorrectas.
 *
 * Para conectar el backend, reemplaza la lógica mock por:
 *   const res  = await fetch("/api/auth/login", { method: "POST", ... });
 *   const data = await res.json();
 */
export async function login(email, password) {
  // ── MOCK ──────────────────────────────────────────────────────────────────
  const match = MOCK_USERS.find(
    (u) => u.email === email && u.password === password
  );

  if (!match) return null;

  const session = {
    user:  match.email,
    name:  match.name,
    token: `fake-jwt-token-${match.role}`,
    role:  match.role,
  };
  // ──────────────────────────────────────────────────────────────────────────

  if (typeof window !== "undefined") {
    localStorage.setItem("session", JSON.stringify(session));
  }
  return session;
}

/** Devuelve la sesión almacenada o null. */
export function getSession() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("session");
  return raw ? JSON.parse(raw) : null;
}

/** Elimina la sesión activa. */
export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("session");
  }
}
