// app/settings/page.js
import PageShell from "@/components/layout/PageShell";
import { THEME } from "@/styles/theme";

export const metadata = { title: "Configuración" };

export default function SettingsPage() {
  return (
    <PageShell title="Configuración" subtitle="Preferencias y ajustes de la wiki.">
      <div style={s.placeholder}>
        <span style={s.icon}>⚙️</span>
        <p style={s.text}>Módulo de configuración en construcción.</p>
        <p style={s.sub}>
          Aquí irán las opciones de administración de usuarios, permisos y
          configuración del sitio.
        </p>
      </div>
    </PageShell>
  );
}

const s = {
  placeholder: {
    display:        "flex",
    flexDirection:  "column",
    alignItems:     "center",
    justifyContent: "center",
    padding:        "80px 24px",
    gap:            "12px",
    color:          THEME.colors.muted,
    textAlign:      "center",
  },
  icon: { fontSize: "48px" },
  text: { fontWeight: 700, fontSize: "18px", color: THEME.colors.navy },
  sub:  { maxWidth: "360px", lineHeight: 1.6, fontSize: "14px" },
};
