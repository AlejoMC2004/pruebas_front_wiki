// app/settings/page.js — ruta protegida: solo rol "admin"
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { hasSession, getUserRole, getUserName } from "@/lib/authGuard";
import PageShell from "@/components/layout/PageShell";
import { THEME } from "@/styles/theme";

export default function SettingsPage() {
  const router  = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!hasSession()) {
      router.replace("/login");
      return;
    }
    if (getUserRole() !== "admin") {
      router.replace("/unauthorized");
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) return null; // evita flash de contenido mientras redirige

  return (
    <PageShell
      title="Configuración"
      subtitle="Administración de usuarios, permisos y ajustes del sitio."
    >
      <div style={s.grid}>
        {/* Tarjeta: Gestión de usuarios */}
        <div style={s.card}>
          <span style={s.cardIcon}>👥</span>
          <h2 style={s.cardTitle}>Gestión de usuarios</h2>
          <p style={s.cardText}>Crea, edita o desactiva cuentas de usuario.</p>
          <span style={s.badge}>En construcción</span>
        </div>

        {/* Tarjeta: Permisos */}
        <div style={s.card}>
          <span style={s.cardIcon}>🔑</span>
          <h2 style={s.cardTitle}>Roles y permisos</h2>
          <p style={s.cardText}>Asigna roles y controla el acceso por sección.</p>
          <span style={s.badge}>En construcción</span>
        </div>

        {/* Tarjeta: Configuración del sitio */}
        <div style={s.card}>
          <span style={s.cardIcon}>⚙️</span>
          <h2 style={s.cardTitle}>Configuración del sitio</h2>
          <p style={s.cardText}>Ajusta nombre, logo, idioma y preferencias globales.</p>
          <span style={s.badge}>En construcción</span>
        </div>
      </div>

      {/* Info de sesión actual */}
      <p style={s.sessionInfo}>
        Sesión activa como <strong>{getUserName()}</strong> · rol: <code>admin</code>
      </p>
    </PageShell>
  );
}

const s = {
  grid: {
    display:             "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap:                 "24px",
  },
  card: {
    background:   THEME.colors.card,
    border:       `1px solid ${THEME.colors.border}`,
    borderRadius: THEME.radius.md,
    padding:      "28px 24px",
    display:      "flex",
    flexDirection:"column",
    gap:          "10px",
    boxShadow:    THEME.shadow.card,
  },
  cardIcon:  { fontSize: "32px" },
  cardTitle: {
    fontFamily: THEME.fonts.display,
    fontWeight: 700,
    fontSize:   "17px",
    color:      THEME.colors.navy,
    margin:     0,
  },
  cardText: {
    fontSize:   "14px",
    color:      THEME.colors.muted,
    lineHeight: 1.6,
    margin:     0,
  },
  badge: {
    alignSelf:    "flex-start",
    padding:      "3px 10px",
    borderRadius: THEME.radius.full,
    background:   `${THEME.colors.gold}33`,
    color:        THEME.colors.gold,
    fontSize:     "11px",
    fontWeight:   700,
    letterSpacing:"0.04em",
    textTransform:"uppercase",
  },
  sessionInfo: {
    marginTop: "40px",
    fontSize:  "13px",
    color:     THEME.colors.muted,
  },
};
