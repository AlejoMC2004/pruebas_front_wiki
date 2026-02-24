// lib/constants.js

export const NAV_LINKS = [
  { label: "Home",       href: "/",          icon: "⌂"  },
  { label: "Projects",   href: "/projects",  icon: "▣"  },
  { label: "Calendar",   href: "/calendar",  icon: "◷"  },
  { label: "Lines",      href: "/lines",     icon: "◈"  },
  { label: "Papers",     href: "/papers",    icon: "⊞"  },
  { label: "Settings",   href: "/settings",  icon: "⚙"  },
];

export const GROUP_INFO = {
  name:        "Grupo de Investigación en Visión Computacional",
  shortName:   "Wiki CV",
  institution: process.env.NEXT_PUBLIC_INSTITUTION || "Universidad",
  founded:     2015,
  email:       "cvgroup@universidad.edu",
};
