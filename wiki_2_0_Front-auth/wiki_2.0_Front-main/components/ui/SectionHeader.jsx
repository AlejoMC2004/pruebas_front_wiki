// components/ui/SectionHeader.jsx
// Props:
//   title      — texto del título
//   linkLabel  — texto del link derecho (opcional)
//   linkHref   — destino del link derecho (opcional)
//   dark       — true si está sobre fondo oscuro

import { THEME } from "@/styles/theme";

export default function SectionHeader({ title, linkLabel, linkHref, dark = false }) {
  return (
    <div
      style={{
        display:       "flex",
        alignItems:    "baseline",
        justifyContent:"space-between",
        borderBottom:  `2px solid ${THEME.colors.gold}`,
        paddingBottom: "12px",
        marginBottom:  "32px",
      }}
    >
      <h2
        style={{
          fontFamily: THEME.fonts.display,
          fontWeight: 700,
          fontSize:   "clamp(22px, 3vw, 28px)",
          color:      dark ? "#fff" : THEME.colors.navy,
        }}
      >
        {title}
      </h2>

      {linkLabel && linkHref && (
        <a
          href={linkHref}
          style={{
            fontSize:      "13px",
            fontWeight:    600,
            color:         dark ? THEME.colors.tealLight : THEME.colors.teal,
            letterSpacing: "0.04em",
            whiteSpace:    "nowrap",
          }}
        >
          {linkLabel}
        </a>
      )}
    </div>
  );
}
