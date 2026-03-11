// app/lines/page.js
import PageShell from "@/components/layout/PageShell";
import TagBadge from "@/components/ui/TagBadge";
import { getLines } from "@/lib/api";
import { THEME } from "@/styles/theme";

export const metadata = { title: "Líneas de Investigación" };

export default async function LinesPage() {
  const lines = await getLines();

  return (
    <PageShell
      title="Líneas de Investigación"
      subtitle="Áreas temáticas que articulan los proyectos y publicaciones del grupo."
    >
      <div style={s.grid}>
        {lines.map((line, i) => (
          <article key={line.id} style={s.card}>
            {/* Número decorativo */}
            <div style={s.number}>0{i + 1}</div>

            <h2 style={s.title}>{line.title}</h2>
            <p style={s.description}>{line.description}</p>

            <div style={s.stats}>
              <span style={s.stat}>📄 {line.papers_count} papers</span>
              <span style={s.stat}>▣ {line.projects_count} proyectos</span>
            </div>

            <div style={s.tagRow}>
              {line.tags.map((tag) => (
                <TagBadge key={tag} slug={tag} label={tag.replace(/-/g, " ")} size="sm" />
              ))}
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

const s = {
  grid: {
    display:             "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap:                 "24px",
  },
  card: {
    background:    THEME.colors.card,
    borderRadius:  THEME.radius.lg,
    border:        `1px solid ${THEME.colors.border}`,
    boxShadow:     THEME.shadow.card,
    padding:       "28px",
    display:       "flex",
    flexDirection: "column",
    gap:           "14px",
    position:      "relative",
    overflow:      "hidden",
  },
  number: {
    position:   "absolute",
    top:        "16px",
    right:      "20px",
    fontFamily: THEME.fonts.display,
    fontWeight: 700,
    fontSize:   "36px",
    color:      `${THEME.colors.navy}12`,
    lineHeight: 1,
  },
  title: {
    fontFamily:  THEME.fonts.display,
    fontWeight:  700,
    fontSize:    "20px",
    lineHeight:  1.3,
    color:       THEME.colors.navy,
    paddingRight:"36px",
  },
  description: {
    fontSize:   "14px",
    lineHeight: 1.7,
    color:      "#4a5568",
    flex:       1,
  },
  stats: {
    display: "flex",
    gap:     "16px",
  },
  stat: {
    fontSize:   "13px",
    color:      THEME.colors.muted,
    fontWeight: 600,
  },
  tagRow: {
    display:  "flex",
    flexWrap: "wrap",
    gap:      "6px",
  },
};
