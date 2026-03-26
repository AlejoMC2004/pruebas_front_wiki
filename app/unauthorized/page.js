// app/unauthorized/page.js
import { THEME } from "@/styles/theme";

export const metadata = { title: "Unauthorized" };

export default function UnauthorizedPage() {
  return (
    <div style={s.page}>
      <div style={s.card}>
        <span style={s.icon}>🔒</span>
        <h1 style={s.title}>Unauthorized</h1>
        <p style={s.text}>
          You don't have permission to access this section.
          <br />
          Contact an administrator if you think this is a mistake.
        </p>
        <a href="/" style={s.btn}>← Back to home</a>
      </div>
    </div>
  );
}

const s = {
  page:  { minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:THEME.colors.surface,padding:"32px 16px" },
  card:  { background:THEME.colors.card,border:"1px solid " + THEME.colors.border,borderRadius:THEME.radius.lg,padding:"48px 40px",maxWidth:"420px",width:"100%",textAlign:"center",boxShadow:THEME.shadow.card,display:"flex",flexDirection:"column",alignItems:"center",gap:"16px" },
  icon:  { fontSize:"52px" },
  title: { fontFamily:THEME.fonts.display,fontWeight:700,fontSize:"24px",color:THEME.colors.navy,margin:0 },
  text:  { fontSize:"14px",color:THEME.colors.muted,lineHeight:1.7,margin:0 },
  btn:   { marginTop:"8px",padding:"10px 24px",borderRadius:THEME.radius.sm,background:THEME.colors.navy,color:"#fff",fontWeight:700,fontSize:"14px",textDecoration:"none" },
};
