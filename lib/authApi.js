// lib/authApi.js
// ─────────────────────────────────────────────────────────────────────────────
// Auth layer. Currently runs in MOCK mode — no backend required.
//
// To switch to a real backend:
//   1. Set NEXT_PUBLIC_API_URL in your .env
//   2. Set NEXT_PUBLIC_AUTH_MOCK=false
//   3. Make sure your backend returns:
//        login/register → { token: string, user: { id, name, email, role } }
//        /auth/me       → { user: { id, name, email, role } }
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL   = process.env.NEXT_PUBLIC_API_URL  || "http://localhost:4000";
const USE_MOCK   = process.env.NEXT_PUBLIC_AUTH_MOCK !== "false";

// ── Mock data ─────────────────────────────────────────────────────────────────

const MOCK_USERS = [
  { id: "1", email: "admin@wikicv.com", password: "123456", name: "Administrator", role: "admin" },
  { id: "2", email: "user@wikicv.com",  password: "123456", name: "User",          role: "user"  },
];

function mockDelay() {
  return new Promise((r) => setTimeout(r, 350));
}

// ── Real backend helpers ───────────────────────────────────────────────────────

const jsonHeaders = () => ({ "Content-Type": "application/json" });

const authHeaders = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
  return { ...jsonHeaders(), ...(token ? { Authorization: `Bearer ${token}` } : {}) };
};

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || data.error || "Request failed");
  return data;
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Login with email + password.
 * Returns: { token: string, user: { id, name, email, role } }
 */
export async function login({ email, password }) {
  if (USE_MOCK) {
    await mockDelay();
    const match = MOCK_USERS.find((u) => u.email === email && u.password === password);
    if (!match) throw new Error("Incorrect email or password.");
    const { password: _, ...user } = match;
    return { token: `mock-jwt-${user.role}-${user.id}`, user };
  }
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST", headers: jsonHeaders(), body: JSON.stringify({ email, password }),
  });
  return handleResponse(res);
}

/**
 * Register a new user.
 * Returns: { token: string, user: { id, name, email, role } }
 */
export async function register({ name, email, password }) {
  if (USE_MOCK) {
    await mockDelay();
    if (MOCK_USERS.find((u) => u.email === email)) {
      throw new Error("An account with this email already exists.");
    }
    const user = { id: String(Date.now()), name, email, role: "user" };
    return { token: `mock-jwt-user-${user.id}`, user };
  }
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST", headers: jsonHeaders(), body: JSON.stringify({ name, email, password }),
  });
  return handleResponse(res);
}

/**
 * Sign out (invalidates token on the server).
 */
export async function logout() {
  if (USE_MOCK) return;
  try {
    await fetch(`${BASE_URL}/auth/logout`, { method: "POST", headers: authHeaders() });
  } catch {
    // If server fails we still clear local state
  }
}

/**
 * Verify that the stored token is still valid.
 * Returns: { user: { id, name, email, role } }
 */
export async function verifyToken() {
  if (USE_MOCK) {
    await mockDelay();
    const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    if (!token) throw new Error("No token");
    // Extract role from mock token and find the matching user
    const roleMatch = token.match(/^mock-jwt-(admin|user)/);
    if (!roleMatch) throw new Error("Invalid token");
    const user = MOCK_USERS.find((u) => u.role === roleMatch[1]);
    if (!user) throw new Error("User not found");
    const { password: _, ...safeUser } = user;
    return { user: safeUser };
  }
  const res = await fetch(`${BASE_URL}/auth/me`, { headers: authHeaders() });
  return handleResponse(res);
}
