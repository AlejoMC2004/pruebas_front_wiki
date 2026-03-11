// app/login/page.js
import LoginForm from "@/components/auth/LoginForm";
import { THEME } from "@/styles/theme";

export const metadata = { title: "Iniciar sesión" };

export default function LoginPage() {
  return (
    <div style={s.page}>
      <div style={s.card}>
        {/* Header */}
        <div style={s.header}>
          <span style={s.logo}>◈</span>
          <h1 style={s.title}>Wiki CVAIL</h1>
          <p style={s.sub}>Inicia sesión para continuar</p>
        </div>

        {/* Divider */}
        <div style={s.divider} />

        {/* Form */}
        <LoginForm />
      </div>
    </div>
  );
}

const s = {
  page: {
    minHeight:      "100vh",
    display:        "flex",
    alignItems:     "center",
    justifyContent: "center",
    background:     THEME.colors.surface,
    padding:        "32px 16px",
  },
  card: {
    background:   THEME.colors.card,
    border:       `1px solid ${THEME.colors.border}`,
    borderRadius: THEME.radius.lg,
    padding:      "40px 36px",
    width:        "100%",
    maxWidth:     "420px",
    boxShadow:    THEME.shadow.card,
  },
  header: {
    textAlign: "center",
    marginBottom: "24px",
  },
  logo: {
    fontSize: "40px",
    color:    THEME.colors.gold,
    display:  "block",
    lineHeight: 1.2,
  },
  title: {
    fontFamily: THEME.fonts.display,
    fontWeight: 700,
    fontSize:   "24px",
    color:      THEME.colors.navy,
    margin:     "8px 0 4px",
  },
  sub: {
    fontSize: "14px",
    color:    THEME.colors.muted,
    margin:   0,
  },
  divider: {
    height:       "1px",
    background:   THEME.colors.border,
    margin:       "0 0 24px",
  },
};
