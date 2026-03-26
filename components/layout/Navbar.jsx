// components/layout/Navbar.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { THEME } from "@/styles/theme";
import { NAV_LINKS } from "@/lib/constants";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "@/components/auth/AuthModal";

export default function Navbar() {
  const pathname = usePathname();
  const { user, isLoading, logoutUser } = useAuth();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab,  setModalTab]  = useState("login");
  const [dropOpen,  setDropOpen]  = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const openLogin    = () => { setModalTab("login");    setModalOpen(true); };
  const openRegister = () => { setModalTab("register"); setModalOpen(true); };
  const handleLogout = async () => { setDropOpen(false); await logoutUser(); };

  return (
    <>
      <nav style={s.nav}>
        <div style={s.topAccent} />

        <a href="/" style={s.brand}>
          <span style={s.brandIcon}>◈</span>
          <span style={s.brandText}>Wiki</span>
        </a>

        <ul style={s.links}>
          {NAV_LINKS.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <li key={link.label}>
                <a href={link.href} style={{ ...s.link, ...(isActive ? s.linkActive : {}) }}>
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div style={s.searchWrap}>
          <span style={s.searchIcon}>⌕</span>
          <input
            type="search"
            placeholder="Search..."
            style={s.searchInput}
            onFocus={(e) => { e.target.style.borderColor = THEME.colors.tealLight; e.target.style.background = "rgba(255,255,255,0.15)"; }}
            onBlur={(e)  => { e.target.style.borderColor = "rgba(255,255,255,0.15)"; e.target.style.background = "rgba(255,255,255,0.08)"; }}
          />
        </div>

        {isLoading ? (
          <div style={s.authSkeleton} />
        ) : user ? (
          <div style={s.userZone} ref={dropRef}>
            <button style={s.userBtn} onClick={() => setDropOpen((p) => !p)}>
              <div style={s.avatar}>{user.name.charAt(0).toUpperCase()}</div>
              <span style={s.userName}>{user.name}</span>
              <span style={{ ...s.chevron, ...(dropOpen ? s.chevronOpen : {}) }}>▾</span>
            </button>
            {dropOpen && (
              <div style={s.dropdown}>
                <div style={s.dropHeader}>
                  <p style={s.dropName}>{user.name}</p>
                  <p style={s.dropEmail}>{user.email}</p>
                  {user.role && <span style={s.dropRole}>{user.role}</span>}
                </div>
                <div style={s.dropDivider} />
                <a href="/settings" style={s.dropItem} onClick={() => setDropOpen(false)}>⚙ Configuración</a>
                <button style={{ ...s.dropItem, ...s.dropLogout }} onClick={handleLogout}>⎋ Cerrar sesión</button>
              </div>
            )}
          </div>
        ) : (
          <div style={s.authBtns}>
            <button style={s.btnLogin} onClick={openLogin}>Iniciar sesión</button>
            <button style={s.btnRegister} onClick={openRegister}>Registrarse</button>
          </div>
        )}
      </nav>

      <AuthModal isOpen={modalOpen} onClose={() => setModalOpen(false)} initialTab={modalTab} />

      <style>{`
        @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity:0;transform:translateY(20px) } to { opacity:1;transform:translateY(0) } }
        @keyframes spin    { to { transform: rotate(360deg) } }
        input[type="search"]::-webkit-search-cancel-button { display:none }
        button:disabled { opacity:0.6;cursor:not-allowed }
      `}</style>
    </>
  );
}

const s = {
  nav: { display:"flex",alignItems:"center",gap:"6px",background:THEME.colors.navy,padding:"0 32px",height:"60px",position:"sticky",top:0,zIndex:100,boxShadow:THEME.shadow.nav,flexShrink:0 },
  topAccent: { position:"absolute",top:0,left:0,right:0,height:"3px",background:`linear-gradient(90deg, ${THEME.colors.gold}, ${THEME.colors.tealLight})` },
  brand: { display:"flex",alignItems:"center",gap:"8px",marginRight:"20px" },
  brandIcon: { fontSize:"20px",color:THEME.colors.gold },
  brandText: { fontFamily:THEME.fonts.display,fontWeight:700,fontSize:"18px",color:"#fff",letterSpacing:"0.02em" },
  links: { display:"flex",listStyle:"none",gap:"2px",flex:1 },
  link: { display:"block",padding:"6px 13px",borderRadius:THEME.radius.sm,color:"rgba(255,255,255,0.7)",fontSize:"14px",fontWeight:600,transition:"all 0.15s" },
  linkActive: { background:THEME.colors.gold,color:THEME.colors.navy },
  searchWrap: { position:"relative",marginRight:"12px" },
  searchIcon: { position:"absolute",left:"10px",top:"50%",transform:"translateY(-50%)",color:"rgba(255,255,255,0.4)",fontSize:"16px",pointerEvents:"none" },
  searchInput: { background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:THEME.radius.sm,padding:"6px 12px 6px 30px",color:"#fff",fontSize:"13px",width:"180px",transition:"all 0.2s",outline:"none" },
  authSkeleton: { marginLeft:"auto",width:"120px",height:"32px",borderRadius:THEME.radius.sm,background:"rgba(255,255,255,0.1)",flexShrink:0 },
  authBtns: { display:"flex",alignItems:"center",gap:"8px",marginLeft:"auto",flexShrink:0 },
  btnLogin: { background:"transparent",border:"1.5px solid rgba(255,255,255,0.35)",borderRadius:THEME.radius.sm,color:"rgba(255,255,255,0.85)",padding:"6px 14px",fontSize:"13px",fontWeight:600,cursor:"pointer",transition:"all 0.15s",fontFamily:THEME.fonts.body },
  btnRegister: { background:THEME.colors.gold,border:"none",borderRadius:THEME.radius.sm,color:THEME.colors.navy,padding:"6px 14px",fontSize:"13px",fontWeight:700,cursor:"pointer",transition:"opacity 0.15s",fontFamily:THEME.fonts.body },
  userZone: { position:"relative",marginLeft:"auto",flexShrink:0 },
  userBtn: { display:"flex",alignItems:"center",gap:"8px",background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:THEME.radius.sm,padding:"5px 10px 5px 5px",cursor:"pointer",transition:"background 0.15s",fontFamily:THEME.fonts.body },
  avatar: { width:"28px",height:"28px",borderRadius:"50%",background:THEME.colors.teal,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:"13px",flexShrink:0 },
  userName: { color:"rgba(255,255,255,0.85)",fontSize:"13px",fontWeight:600,maxWidth:"120px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" },
  chevron: { color:"rgba(255,255,255,0.5)",fontSize:"12px",transition:"transform 0.2s" },
  chevronOpen: { transform:"rotate(180deg)" },
  dropdown: { position:"absolute",top:"calc(100% + 8px)",right:0,background:THEME.colors.card,border:`1px solid ${THEME.colors.border}`,borderRadius:THEME.radius.md,boxShadow:"0 12px 40px rgba(0,0,0,0.18)",minWidth:"200px",overflow:"hidden",animation:"slideUp 0.15s ease",zIndex:200 },
  dropHeader: { padding:"14px 16px 12px" },
  dropName: { fontWeight:700,fontSize:"14px",color:THEME.colors.text,marginBottom:"2px" },
  dropEmail: { fontSize:"12px",color:THEME.colors.muted,marginBottom:"6px" },
  dropRole: { display:"inline-block",background:"rgba(201,168,76,0.15)",color:THEME.colors.gold,border:`1px solid ${THEME.colors.gold}`,borderRadius:THEME.radius.full,padding:"1px 8px",fontSize:"11px",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em" },
  dropDivider: { height:"1px",background:THEME.colors.border },
  dropItem: { display:"block",width:"100%",padding:"10px 16px",fontSize:"13px",color:THEME.colors.text,fontWeight:500,background:"none",border:"none",cursor:"pointer",textAlign:"left",fontFamily:THEME.fonts.body,transition:"background 0.12s" },
  dropLogout: { color:"#c53030",fontWeight:600 },
};
