// components/ui/TagBadge.jsx
// Chip de tag clickeable o estático.
// Props:
//   slug     — identificador del tag
//   label    — texto a mostrar
//   active   — si está seleccionado
//   onClick  — callback; si no se pasa, el badge es solo decorativo
//   size     — "sm" | "md"

import { THEME } from "@/styles/theme";

export default function TagBadge({ slug, label, active = false, onClick, size = "md" }) {
  const isClickable = typeof onClick === "function";

  const base = {
    display:       "inline-flex",
    alignItems:    "center",
    gap:           "4px",
    padding:       size === "sm" ? "2px 8px" : "4px 12px",
    borderRadius:  THEME.radius.full,
    fontSize:      size === "sm" ? "11px" : "12px",
    fontWeight:    600,
    letterSpacing: "0.03em",
    border:        `1.5px solid ${active ? THEME.colors.teal : THEME.colors.border}`,
    background:    active ? `${THEME.colors.teal}18` : "transparent",
    color:         active ? THEME.colors.teal : THEME.colors.muted,
    cursor:        isClickable ? "pointer" : "default",
    transition:    "all 0.15s ease",
    userSelect:    "none",
    whiteSpace:    "nowrap",
  };

  if (isClickable) {
    return (
      <button
        onClick={() => onClick(slug)}
        style={base}
        title={active ? `Quitar filtro: ${label}` : `Filtrar por: ${label}`}
      >
        {label}
        {active && <span style={{ fontSize: "10px", opacity: 0.7 }}>✕</span>}
      </button>
    );
  }

  return (
    <a href={`/tags/${slug}`} style={base}>
      {label}
    </a>
  );
}
