// components/ui/Avatar.jsx
// Props:
//   name      — nombre completo (para inicial)
//   src       — URL de imagen (opcional)
//   size      — número de píxeles (default 36)

import { THEME } from "@/styles/theme";

export default function Avatar({ name = "?", src, size = 36 }) {
  const initial = name.charAt(0).toUpperCase();

  const base = {
    width:          `${size}px`,
    height:         `${size}px`,
    borderRadius:   "50%",
    overflow:       "hidden",
    background:     THEME.colors.teal,
    color:          "#fff",
    display:        "flex",
    alignItems:     "center",
    justifyContent: "center",
    fontWeight:     700,
    fontSize:       `${Math.round(size * 0.4)}px`,
    flexShrink:     0,
  };

  if (src) {
    return (
      <div style={base}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
    );
  }

  return <div style={base}>{initial}</div>;
}
