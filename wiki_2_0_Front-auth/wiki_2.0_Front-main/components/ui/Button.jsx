// components/ui/Button.jsx
// Props:
//   variant — "primary" | "outline" | "ghost"
//   size    — "sm" | "md" | "lg"
//   href    — si se pasa, renderiza como <a>
//   ...rest — cualquier prop HTML de button/a

import { THEME } from "@/styles/theme";

const VARIANTS = {
  primary: {
    background: THEME.colors.gold,
    color:      THEME.colors.navy,
    border:     "none",
  },
  outline: {
    background: "transparent",
    color:      THEME.colors.teal,
    border:     `1.5px solid ${THEME.colors.teal}`,
  },
  ghost: {
    background: "transparent",
    color:      THEME.colors.muted,
    border:     "none",
  },
};

const SIZES = {
  sm: { padding: "6px 14px",  fontSize: "13px" },
  md: { padding: "10px 22px", fontSize: "14px" },
  lg: { padding: "14px 28px", fontSize: "16px" },
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  style: extraStyle = {},
  ...rest
}) {
  const baseStyle = {
    display:      "inline-flex",
    alignItems:   "center",
    gap:          "8px",
    borderRadius: THEME.radius.sm,
    fontFamily:   THEME.fonts.body,
    fontWeight:   700,
    cursor:       "pointer",
    transition:   "opacity 0.15s, transform 0.15s",
    ...VARIANTS[variant],
    ...SIZES[size],
    ...extraStyle,
  };

  if (href) {
    return (
      <a href={href} style={baseStyle} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button style={baseStyle} {...rest}>
      {children}
    </button>
  );
}
