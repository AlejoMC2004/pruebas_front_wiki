// app/tags/page.js
import PageShell from "@/components/layout/PageShell";
import TagCloud from "@/components/tags/TagCloud";
import { getAllTags } from "@/lib/api";
import { TAG_CATEGORIES } from "@/lib/tags";
import { THEME } from "@/styles/theme";

export const metadata = { title: "Tags" };

export default async function TagsPage() {
  const tags = await getAllTags();

  const grouped = Object.entries(TAG_CATEGORIES).map(([key, cat]) => ({
    key,
    ...cat,
    tags: tags.filter((t) => t.category === key),
  }));

  return (
    <PageShell
      title="Explorar por Tags"
      subtitle="Navega el contenido de la wiki filtrando por temáticas, métodos y aplicaciones."
    >
      {/* Nube general */}
      <section style={s.cloudSection}>
        <TagCloud tags={tags} />
      </section>

      {/* Por categoría */}
      <div style={s.categories}>
        {grouped.map(({ key, label, color, tags: catTags }) => {
          if (!catTags.length) return null;
          return (
            <section key={key} style={s.category}>
              <h2 style={{ ...s.catTitle, color }}>{label}</h2>
              <div style={s.catGrid}>
                {catTags.map((tag) => (
                  <a key={tag.slug} href={`/tags/${tag.slug}`} style={s.tagCard}>
                    <span style={s.tagLabel}>{tag.label}</span>
                    <span style={{ ...s.tagCount, color }}>{tag.count} items</span>
                  </a>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </PageShell>
  );
}

const s = {
  cloudSection: {
    background:   THEME.colors.card,
    border:       `1px solid ${THEME.colors.border}`,
    borderRadius: THEME.radius.lg,
    padding:      "28px",
    marginBottom: "40px",
  },
  categories: {
    display:       "flex",
    flexDirection: "column",
    gap:           "36px",
  },
  category: {},
  catTitle: {
    fontFamily:    THEME.fonts.display,
    fontWeight:    700,
    fontSize:      "20px",
    marginBottom:  "16px",
    borderBottom:  `2px solid currentColor`,
    paddingBottom: "8px",
    opacity:       0.85,
  },
  catGrid: {
    display:             "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap:                 "12px",
  },
  tagCard: {
    display:        "flex",
    justifyContent: "space-between",
    alignItems:     "center",
    background:     THEME.colors.card,
    border:         `1px solid ${THEME.colors.border}`,
    borderRadius:   THEME.radius.md,
    padding:        "12px 16px",
    transition:     "box-shadow 0.15s",
    color:          "inherit",
  },
  tagLabel: {
    fontWeight: 600,
    fontSize:   "14px",
    color:      THEME.colors.navy,
  },
  tagCount: {
    fontSize:   "12px",
    fontFamily: THEME.fonts.mono,
    opacity:    0.8,
  },
};
