// lib/authGuard.js
// Utilidades para validar sesión y rol en componentes cliente.

function _getSession() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("session");
  return raw ? JSON.parse(raw) : null;
}

/** ¿Existe una sesión activa? */
export function hasSession() {
  return !!_getSession();
}

/** Devuelve el rol del usuario autenticado, o null. */
export function getUserRole() {
  return _getSession()?.role ?? null;
}

/** Alias: ¿es administrador? */
export function isAdmin() {
  return getUserRole() === "admin";
}

/** Devuelve nombre visible del usuario activo. */
export function getUserName() {
  return _getSession()?.name ?? null;
}
