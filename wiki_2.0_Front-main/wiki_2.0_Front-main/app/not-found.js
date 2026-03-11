// app/not-found.js
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { THEME } from "@/styles/theme";

export default function NotFound() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <main style={s.main}>
        <span style={s.code}>404</span>
        <h1 style={s.title}>Página no encontrada</h1>
        <p style={s.body}>
          La página que buscas no existe o fue movida.
        </p>
        <a href="/" style={s.link}>← Ir al inicio</a>
      </main>
      <Footer />
    </div>
  );
}

const s = {
  main: {
    flex:           1,
    display:        "flex",
    flexDirection:  "column",
    alignItems:     "center",
    justifyContent: "center",
    gap:            "16px",
    padding:        "60px 24px",
    textAlign:      "center",
  },
  code: {
    fontFamily: THEME.fonts.display,
    fontSize:   "96px",
    fontWeight: 700,
    color:      `${THEME.colors.navy}20`,
    lineHeight: 1,
  },
  title: {
    fontFamily: THEME.fonts.display,
    fontSize:   "28px",
    fontWeight: 700,
    color:      THEME.colors.navy,
    marginTop:  "-20px",
  },
  body: {
    fontSize:   "15px",
    color:      THEME.colors.muted,
    maxWidth:   "360px",
    lineHeight: 1.6,
  },
  link: {
    color:     THEME.colors.teal,
    fontWeight:700,
    fontSize:  "15px",
    marginTop: "8px",
  },
};
