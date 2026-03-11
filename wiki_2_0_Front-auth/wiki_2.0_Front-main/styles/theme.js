// styles/theme.js
// ─────────────────────────────────────────────────────────────────────────────
// FUENTE ÚNICA DE VERDAD para todos los valores de diseño.
// Cambia aquí y se propaga a toda la aplicación.
// ─────────────────────────────────────────────────────────────────────────────

export const THEME = {
  colors: {
    navy: "#3b4a2f",
    gold: "#c9a84c",
    teal: "#5f7a4a",
    tealLight: "#8fab72",
    surface: "#f5f0e8",
    card: "#fdfaf4",
    text: "#2a2a1e",
    muted: "#8a876e",
    border: "#ddd8c4",
  },

  fonts: {
    display: "'Playfair Display', Georgia, serif",
    body: "'Source Sans 3', 'Source Sans Pro', system-ui, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },

  // Espaciado base (multiplica por estos valores)
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "64px",
  },

  // Radios de borde
  radius: {
    sm: "6px",
    md: "10px",
    lg: "14px",
    full: "9999px",
  },

  // Sombras
  shadow: {
    card: "0 2px 12px rgba(19,55,103,0.08)",
    cardHover: "0 8px 32px rgba(19,55,103,0.14)",
    nav: "0 2px 16px rgba(0,0,0,0.22)",
  },

  // Ancho máximo del contenido
  maxWidth: "1100px",
};

// ─────────────────────────────────────────────────────────────────────────────
// PALETAS ALTERNATIVAS — descomenta y reemplaza THEME.colors para cambiar tema
// ─────────────────────────────────────────────────────────────────────────────

// Verde Militar + Beige (identidad clásica del grupo)
// export const ALT_MILITARY = {
//   navy:      "#3b4a2f",
//   gold:      "#c9a84c",
//   teal:      "#5f7a4a",
//   tealLight: "#8fab72",
//   surface:   "#f5f0e8",
//   card:      "#fdfaf4",
//   text:      "#2a2a1e",
//   muted:     "#8a876e",
//   border:    "#ddd8c4",
// };

// Dark / Carbon + Amber
// export const ALT_DARK = {
//   navy:      "#18181b",
//   gold:      "#f59e0b",
//   teal:      "#0d9488",
//   tealLight: "#14b8a6",
//   surface:   "#0f0f11",
//   card:      "#1e1e24",
//   text:      "#e4e4e7",
//   muted:     "#71717a",
//   border:    "#27272a",
// };

// Paleta principal
//    navy:       "#133767",   // Fondo nav, hero, secciones oscuras
//    gold:       "#fcbf6c",   // Acento principal — activos, highlights
//    teal:       "#278285",   // Acento secundario — links, badges, iconos
//    tealLight:  "#35acac",   // Hover, bordes suaves, gradientes

//    // Superficies
//    surface:    "#f7f8fa",   // Fondo de página
//    card:       "#ffffff",   // Fondo de cards
//    cardDark:   "rgba(255,255,255,0.05)", // Cards sobre fondo oscuro

//    // Texto
//    text:       "#1a2235",   // Cuerpo principal
//    textLight:  "rgba(255,255,255,0.82)", // Texto sobre fondo oscuro
//    textMuted:  "rgba(255,255,255,0.5)",  // Texto secundario sobre oscuro
//    muted:      "#8a96a8",   // Texto secundario sobre claro

// UI
//    border:     "#e2e8f0",
//    borderDark: "rgba(255,255,255,0.1)",


