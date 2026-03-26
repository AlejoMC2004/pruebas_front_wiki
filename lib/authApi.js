// lib/authApi.js
// ─────────────────────────────────────────────────────────────────────────────
// Capa de abstracción para todas las llamadas de autenticación al backend.
// Cuando conectes el backend, solo necesitas cambiar BASE_URL y adaptar
// los endpoints. El resto de la app no necesita cambios.
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// Cabeceras comunes
const jsonHeaders = () => ({
  "Content-Type": "application/json",
});

// Agrega el token JWT si existe
const authHeaders = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
  return {
    ...jsonHeaders(),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// ── Helpers internos ──────────────────────────────────────────────────────────

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || data.error || "Error en la solicitud");
  }
  return data;
}

// ── Endpoints públicos ────────────────────────────────────────────────────────

/**
 * Login con email + contraseña.
 * Espera respuesta: { token: string, user: { id, name, email, role } }
 */
export async function login({ email, password }) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(res);
}

/**
 * Registro de nuevo usuario.
 * Espera respuesta: { token: string, user: { id, name, email, role } }
 */
export async function register({ name, email, password }) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify({ name, email, password }),
  });
  return handleResponse(res);
}

/**
 * Cierre de sesión (invalida el token en el servidor).
 */
export async function logout() {
  try {
    await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: authHeaders(),
    });
  } catch {
    // Si falla el servidor igual limpiamos el estado local
  }
}

/**
 * Verifica si el token almacenado sigue siendo válido.
 * Espera respuesta: { user: { id, name, email, role } }
 */
export async function verifyToken() {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    headers: authHeaders(),
  });
  return handleResponse(res);
}
