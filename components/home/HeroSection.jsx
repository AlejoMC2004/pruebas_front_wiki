// components/home/HeroSection.jsx
import { THEME } from "@/styles/theme";
import Button from "@/components/ui/Button";

export default function HeroSection({ about, stats }) {
  return (
    <section style={s.hero}>
      <div style={s.accentTop} />

      <div style={s.content}>
        {/* Texto */}
        <div style={s.textBlock}>
          <p style={s.eyebrow}>Research Group · Computer Vision</p>
          <h1 style={s.title}>
            CVAIL
            <br />
            <span style={s.titleAccent}>Computer Vision and Artificial Intelligence Laboratory</span>
          </h1>
          <p style={s.body}>{about}</p>
          <div style={s.actions}>
            <Button href="/projects" variant="primary" size="md">Explorar Proyectos</Button>
            <Button href="/papers" variant="outline" size="md" style={{ borderColor: "rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.85)" }}>
              Ver Papers
            </Button>
          </div>
        </div>

        <div style={s.imagePlaceholder}>
          <img
            src="/images/logo_HOCV.png"
            alt="Logo temporal"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>

      {/* Strip de estadísticas */}
      {stats && (
        <div style={s.statStrip}>
          {[
            { value: `${stats.members}+`, label: "Investigadores" },
            { value: `${stats.publications}+`, label: "Publicaciones" },
            { value: stats.projects, label: "Proyectos" },
            { value: stats.lines, label: "Líneas" },
          ].map((stat) => (
            <div key={stat.label} style={s.statItem}>
              <span style={s.statValue}>{stat.value}</span>
              <span style={s.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

const s = {
  hero: {
    background: `linear-gradient(135deg, ${THEME.colors.navy} 0%, #1a4a8a 100%)`,
    position: "relative",
    overflow: "hidden",
  },
  accentTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: `linear-gradient(90deg, ${THEME.colors.gold}, ${THEME.colors.tealLight})`,
  },
  content: {
    maxWidth: THEME.maxWidth,
    margin: "0 auto",
    padding: "60px 32px 48px",
    display: "grid",
    gridTemplateColumns: "1fr 320px",
    gap: "60px",
    alignItems: "center",
  },
  textBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  eyebrow: {
    fontFamily: THEME.fonts.mono,
    fontSize: "12px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: THEME.colors.tealLight,
  },
  title: {
    fontFamily: THEME.fonts.display,
    fontWeight: 700,
    fontSize: "clamp(28px, 4vw, 44px)",
    lineHeight: 1.15,
    color: "#fff",
  },
  titleAccent: {
    color: THEME.colors.gold,
  },
  body: {
    fontSize: "15px",
    lineHeight: 1.75,
    color: "rgba(255,255,255,0.7)",
    maxWidth: "500px",
  },
  actions: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  imageWrap: {
    position: "relative",
  },
  imageFrame: {
    position: "relative",
    zIndex: 1,
    borderRadius: THEME.radius.lg,
    overflow: "hidden",
    border: "2px solid rgba(255,255,255,0.12)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
  },
  imagePlaceholder: {
    aspectRatio: "4/3",
    background: "rgba(255,255,255,0.06)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  imagePlaceholderText: {
    color: "rgba(255,255,255,0.25)",
    fontSize: "13px",
    fontFamily: THEME.fonts.mono,
    zIndex: 1,
  },
  imageOverlaySvg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    opacity: 0.15,
  },
  imageDeco: {
    position: "absolute",
    bottom: "-12px",
    right: "-12px",
    width: "75%",
    height: "75%",
    border: `2px solid ${THEME.colors.tealLight}`,
    borderRadius: THEME.radius.lg,
    opacity: 0.3,
  },
  statStrip: {
    borderTop: `1px solid rgba(255,255,255,0.1)`,
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    maxWidth: THEME.maxWidth,
    margin: "0 auto",
    width: "100%",
    padding: "0 32px",
  },
  statItem: {
    padding: "20px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2px",
    borderRight: "1px solid rgba(255,255,255,0.08)",
  },
  statValue: {
    fontFamily: THEME.fonts.display,
    fontSize: "28px",
    fontWeight: 700,
    color: THEME.colors.gold,
  },
  statLabel: {
    fontSize: "11px",
    color: "rgba(255,255,255,0.45)",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  },
};
