// context/AuthContext.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Proveedor global de autenticación. Expone:
//   useAuth() → { user, token, isLoading, loginUser, registerUser, logoutUser }
//
// El token JWT se persiste en localStorage bajo la clave "auth_token".
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import * as authApi from "@/lib/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);   // { id, name, email, role }
  const [token, setToken]     = useState(null);
  const [isLoading, setIsLoading] = useState(true); // comprobando token inicial

  // ── Al montar: restaurar sesión desde localStorage ──────────────────────────
  useEffect(() => {
    const stored = localStorage.getItem("auth_token");
    if (!stored) {
      setIsLoading(false);
      return;
    }
    setToken(stored);
    authApi
      .verifyToken()
      .then(({ user: u }) => setUser(u))
      .catch(() => {
        // Token expirado o inválido → limpiar
        localStorage.removeItem("auth_token");
        setToken(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  // ── Helpers ──────────────────────────────────────────────────────────────────

  const persist = ({ token: t, user: u }) => {
    localStorage.setItem("auth_token", t);
    setToken(t);
    setUser(u);
  };

  const loginUser = useCallback(async (credentials) => {
    const data = await authApi.login(credentials);
    persist(data);
    return data.user;
  }, []);

  const registerUser = useCallback(async (fields) => {
    const data = await authApi.register(fields);
    persist(data);
    return data.user;
  }, []);

  const logoutUser = useCallback(async () => {
    await authApi.logout();
    localStorage.removeItem("auth_token");
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, loginUser, registerUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}
