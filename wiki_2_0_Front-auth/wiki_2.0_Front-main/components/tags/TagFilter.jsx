// components/tags/TagFilter.jsx
// Panel de filtros por tags. Guarda el estado en la URL.
// Props:
//   availableTags — array de { slug, label, count, category }
//   basePath      — ruta base sin query params, ej: "/papers"
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { THEME } from "@/styles/theme";
import { TAG_CATEGORIES, toggleTag } from "@/lib/tags";

export default function TagFilter({ availableTags, basePath }) {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const activeTags   = searchParams.getAll("tag");

  function handleToggle(slug) {
    const next = toggleTag(activeTags, slug);
    const params = new URLSearchParams();
    next.forEach((t) => params.append("tag", t));
    const qs = params.toString();
    router.push(qs ? `${basePath}?${qs}` : basePath);
  }

  function clearAll() {
    router.push(basePath);
  }

  // Agrupa los tags disponibles por categoría
  const grouped = Object.entries(TAG_CATEGORIES).map(([key, cat]) => ({
    key,
    ...cat,
    tags: availableTags.filter((t) => t.category === key),
  }));

  return (
    <aside style={s.panel}>
      <div style={s.panelHeader}>
        <span style={s.panelTitle}>Filtrar por tag</span>
        {activeTags.length > 0 && (
          <button onClick={clearAll} style={s.clearBtn}>
            Limpiar ({activeTags.length})
          </button>
        )}
      </div>

      {grouped.map(({ key, label, color, tags }) => {
        if (!tags.length) return null;
        return (
          <div key={key} style={s.group}>
            <p style={{ ...s.groupLabel, color }}>{label}</p>
            <div style={s.chips}>
              {tags.map((tag) => {
                const isActive = activeTags.includes(tag.slug);
                return (
                  <button
                    key={tag.slug}
                    onClick={() => handleToggle(tag.slug)}
                    style={{
                      ...s.chip,
                      ...(isActive
                        ? { background: color, color: "#fff", borderColor: color }
                        : {}),
                    }}
                  >
                    {tag.label}
                    <span style={s.count}>{tag.count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </aside>
  );
}

const s = {
  panel: {
    background:   THEME.colors.card,
    border:       `1px solid ${THEME.colors.border}`,
    borderRadius: THEME.radius.lg,
    padding:      "20px",
    display:      "flex",
    flexDirection:"column",
    gap:          "20px",
    alignSelf:    "flex-start",
    position:     "sticky",
    top:          "76px",
  },
  panelHeader: {
    display:        "flex",
    justifyContent: "space-between",
    alignItems:     "center",
  },
  panelTitle: {
    fontWeight:    700,
    fontSize:      "13px",
    color:         THEME.colors.navy,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },
  clearBtn: {
    fontSize:  "12px",
    color:     THEME.colors.teal,
    fontWeight:700,
    cursor:    "pointer",
  },
  group: {
    display:       "flex",
    flexDirection: "column",
    gap:           "8px",
  },
  groupLabel: {
    fontSize:      "11px",
    fontWeight:    700,
    textTransform: "uppercase",
    letterSpacing: "0.07em",
  },
  chips: {
    display:  "flex",
    flexWrap: "wrap",
    gap:      "6px",
  },
  chip: {
    display:      "inline-flex",
    alignItems:   "center",
    gap:          "5px",
    padding:      "4px 10px",
    borderRadius: THEME.radius.full,
    fontSize:     "12px",
    fontWeight:   600,
    border:       `1.5px solid ${THEME.colors.border}`,
    color:        THEME.colors.text,
    background:   "transparent",
    cursor:       "pointer",
    transition:   "all 0.15s",
  },
  count: {
    fontSize:   "10px",
    opacity:    0.65,
  },
};
