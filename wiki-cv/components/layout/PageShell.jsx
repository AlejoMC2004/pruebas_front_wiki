// components/layout/PageShell.jsx
// Wrapper para todas las páginas internas (excepto Home que tiene su propio hero).
// Props:
//   title      — título de la sección (h1)
//   subtitle   — descripción opcional bajo el título
//   children   — contenido de la página

import Navbar from "./Navbar";
import Footer from "./Footer";
import { THEME } from "@/styles/theme";

export default function PageShell({ title, subtitle, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />

      {/* Mini hero de sección */}
      <div style={s.hero}>
        <div style={s.accent} />
        <div style={s.heroInner}>
          <h1 style={s.title}>{title}</h1>
          {subtitle && <p style={s.subtitle}>{subtitle}</p>}
        </div>
      </div>

      {/* Contenido */}
      <main style={s.main}>{children}</main>

      <Footer />
    </div>
  );
}

const s = {
  hero: {
    background: `linear-gradient(135deg, ${THEME.colors.navy} 0%, #1a4a8a 100%)`,
    padding:    "40px 0 36px",
    position:   "relative",
    overflow:   "hidden",
  },
  accent: {
    position:   "absolute",
    top:        0,
    left:       0,
    right:      0,
    height:     "3px",
    background: `linear-gradient(90deg, ${THEME.colors.gold}, ${THEME.colors.tealLight})`,
  },
  heroInner: {
    maxWidth: THEME.maxWidth,
    margin:   "0 auto",
    padding:  "0 32px",
  },
  title: {
    fontFamily: THEME.fonts.display,
    fontWeight: 700,
    fontSize:   "clamp(26px, 4vw, 36px)",
    color:      "#fff",
  },
  subtitle: {
    marginTop:  "8px",
    fontSize:   "15px",
    color:      "rgba(255,255,255,0.6)",
    maxWidth:   "560px",
    lineHeight: 1.6,
  },
  main: {
    flex:      1,
    maxWidth:  THEME.maxWidth,
    margin:    "0 auto",
    width:     "100%",
    padding:   "40px 32px",
  },
};
