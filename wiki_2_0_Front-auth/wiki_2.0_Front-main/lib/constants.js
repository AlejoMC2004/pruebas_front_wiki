// lib/constants.js

export const NAV_LINKS = [
  { label: "Home", href: "/", icon: "⌂" },
  { label: "Projects", href: "/projects", icon: "▣" },
  { label: "Calendar", href: "/calendar", icon: "◷" },
  { label: "Lines", href: "/lines", icon: "◈" },
  { label: "Papers", href: "/papers", icon: "⊞" },
  { label: "Settings", href: "/settings", icon: "⚙" },
];

export const GROUP_INFO = {
  name: "CVAIL Research Group",
  shortName: "Wiki CVAIL",
  institution: process.env.NEXT_PUBLIC_INSTITUTION || "Universidad Industrial de Santander",
  founded: 2015,
  email: "cvail@gmail.com",
};
