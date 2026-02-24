// components/ui/EmptyState.jsx
// Se muestra cuando una lista no tiene resultados.
// Props:
//   icon     — emoji o string (default "🔍")
//   title    — título del estado vacío
//   message  — descripción opcional
//   action   — { label, href } botón opcional

import Button from "./Button";

export default function EmptyState({
  icon = "🔍",
  title = "Sin resultados",
  message,
  action,
}) {
  return (
    <div
      style={{
        textAlign:  "center",
        padding:    "64px 24px",
        color:      "#8a96a8",
        display:    "flex",
        flexDirection: "column",
        alignItems: "center",
        gap:        "12px",
      }}
    >
      <span style={{ fontSize: "40px" }}>{icon}</span>
      <p style={{ fontWeight: 700, fontSize: "18px", color: "#1a2235" }}>{title}</p>
      {message && <p style={{ maxWidth: "360px", lineHeight: 1.6 }}>{message}</p>}
      {action && (
        <Button href={action.href} variant="outline" size="sm" style={{ marginTop: "8px" }}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
