// components/layout/Navbar.jsx
"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { THEME } from "@/styles/theme";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar({ user = "Pauline Lenoir" }) {
  const pathname = usePathname();

  return (
    <nav style={s.nav}>
      {/* Línea de acento en la parte superior */}
      <div style={s.topAccent} />

      {/* Brand */}
      <a href="/" style={s.brand}>
        <span style={s.brandIcon}>◈</span>
        <span style={s.brandText}>Wiki</span>
      </a>

      {/* Links de navegación */}
      <ul style={s.links}>
        {NAV_LINKS.map((link) => {
          const isActive =
            link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return (
            <li key={link.label}>
              <a
                href={link.href}
                style={{
                  ...s.link,
                  ...(isActive ? s.linkActive : {}),
                }}
              >
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>

      {/* Buscador */}
      <div style={s.searchWrap}>
        <span style={s.searchIcon}>⌕</span>
        <input
          type="search"
          placeholder="Search..."
          style={s.searchInput}
          onFocus={(e) => {
            e.target.style.borderColor = THEME.colors.tealLight;
            e.target.style.background  = "rgba(255,255,255,0.15)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "rgba(255,255,255,0.15)";
            e.target.style.background  = "rgba(255,255,255,0.08)";
          }}
        />
      </div>

      {/* Usuario */}
      <div style={s.user}>
        <div style={s.avatar}>{user.charAt(0)}</div>
        <span style={s.userName}>{user}</span>
      </div>
    </nav>
  );
}

const s = {
  nav: {
    display:    "flex",
    alignItems: "center",
    gap:        "6px",
    background: THEME.colors.navy,
    padding:    "0 32px",
    height:     "60px",
    position:   "sticky",
    top:        0,
    zIndex:     100,
    boxShadow:  THEME.shadow.nav,
    flexShrink: 0,
  },
  topAccent: {
    position:   "absolute",
    top:        0,
    left:       0,
    right:      0,
    height:     "3px",
    background: `linear-gradient(90deg, ${THEME.colors.gold}, ${THEME.colors.tealLight})`,
  },
  brand: {
    display:     "flex",
    alignItems:  "center",
    gap:         "8px",
    marginRight: "20px",
  },
  brandIcon: {
    fontSize: "20px",
    color:    THEME.colors.gold,
  },
  brandText: {
    fontFamily:  THEME.fonts.display,
    fontWeight:  700,
    fontSize:    "18px",
    color:       "#fff",
    letterSpacing: "0.02em",
  },
  links: {
    display:  "flex",
    listStyle:"none",
    gap:      "2px",
    flex:     1,
  },
  link: {
    display:  "block",
    padding:  "6px 13px",
    borderRadius: THEME.radius.sm,
    color:    "rgba(255,255,255,0.7)",
    fontSize: "14px",
    fontWeight: 600,
    transition: "all 0.15s",
  },
  linkActive: {
    background: THEME.colors.gold,
    color:      THEME.colors.navy,
  },
  searchWrap: {
    position:    "relative",
    marginRight: "12px",
  },
  searchIcon: {
    position:  "absolute",
    left:      "10px",
    top:       "50%",
    transform: "translateY(-50%)",
    color:     "rgba(255,255,255,0.4)",
    fontSize:  "16px",
    pointerEvents: "none",
  },
  searchInput: {
    background:   "rgba(255,255,255,0.08)",
    border:       `1px solid rgba(255,255,255,0.15)`,
    borderRadius: THEME.radius.sm,
    padding:      "6px 12px 6px 30px",
    color:        "#fff",
    fontSize:     "13px",
    width:        "180px",
    transition:   "all 0.2s",
    outline:      "none",
  },
  user: {
    display:    "flex",
    alignItems: "center",
    gap:        "8px",
    marginLeft: "auto",
    flexShrink: 0,
  },
  avatar: {
    width:          "32px",
    height:         "32px",
    borderRadius:   "50%",
    background:     THEME.colors.teal,
    color:          "#fff",
    display:        "flex",
    alignItems:     "center",
    justifyContent: "center",
    fontWeight:     700,
    fontSize:       "14px",
  },
  userName: {
    color:     "rgba(255,255,255,0.82)",
    fontSize:  "13px",
    fontWeight:600,
  },
};
