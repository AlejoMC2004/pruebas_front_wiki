// components/layout/Footer.jsx
import { THEME } from "@/styles/theme";
import { GROUP_INFO } from "@/lib/constants";

export default function Footer() {
  return (
    <footer style={s.footer}>
      <span>© {new Date().getFullYear()} {GROUP_INFO.name}</span>
      <span style={{ color: THEME.colors.tealLight }}>·</span>
      <span>{GROUP_INFO.institution}</span>
      <span style={{ color: THEME.colors.tealLight }}>·</span>
      <a href={`mailto:${GROUP_INFO.email}`} style={s.link}>
        {GROUP_INFO.email}
      </a>
    </footer>
  );
}

const s = {
  footer: {
    background:    `${THEME.colors.navy}f0`,
    color:         "rgba(255,255,255,0.4)",
    fontSize:      "12px",
    padding:       "16px 32px",
    display:       "flex",
    gap:           "10px",
    justifyContent:"center",
    alignItems:    "center",
    flexWrap:      "wrap",
    letterSpacing: "0.03em",
  },
  link: {
    color:      THEME.colors.tealLight,
    transition: "opacity 0.15s",
  },
};
