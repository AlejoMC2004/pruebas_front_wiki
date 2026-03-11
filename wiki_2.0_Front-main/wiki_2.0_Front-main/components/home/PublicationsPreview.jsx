// components/home/PublicationsPreview.jsx
import { THEME } from "@/styles/theme";
import SectionHeader from "@/components/ui/SectionHeader";
import TagBadge from "@/components/ui/TagBadge";
import { formatAuthors } from "@/lib/utils";

function PaperCard({ paper }) {
  return (
    <a href={`/papers/${paper.id}`} style={s.card}>
      <div style={s.venue}>{paper.venue}</div>
      <h3 style={s.title}>{paper.title}</h3>
      <p style={s.authors}>{formatAuthors(paper.authors)}</p>
      <div style={s.tagRow}>
        {paper.tags.slice(0, 3).map((tag) => (
          <TagBadge key={tag} slug={tag} label={tag.replace(/-/g, " ")} size="sm" />
        ))}
      </div>
    </a>
  );
}

export default function PublicationsPreview({ papers }) {
  return (
    <section style={s.section}>
      <div style={s.inner}>
        <SectionHeader title="Publicaciones" linkLabel="Ver todas →" linkHref="/papers" />
        <div style={s.grid}>
          {papers.map((p) => <PaperCard key={p.id} paper={p} />)}
        </div>
      </div>
    </section>
  );
}

const s = {
  section: { padding: "60px 0" },
  inner: {
    maxWidth: THEME.maxWidth,
    margin:   "0 auto",
    padding:  "0 32px",
  },
  grid: {
    display:               "grid",
    gridTemplateColumns:   "repeat(auto-fill, minmax(300px, 1fr))",
    gap:                   "20px",
  },
  card: {
    display:       "flex",
    flexDirection: "column",
    gap:           "10px",
    background:    THEME.colors.card,
    borderRadius:  THEME.radius.lg,
    padding:       "24px",
    border:        `1px solid ${THEME.colors.border}`,
    boxShadow:     THEME.shadow.card,
    cursor:        "pointer",
    transition:    "transform 0.2s, box-shadow 0.2s",
    color:         "inherit",
  },
  venue: {
    fontFamily:    THEME.fonts.mono,
    fontSize:      "11px",
    fontWeight:    700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color:         THEME.colors.teal,
    background:    `${THEME.colors.teal}15`,
    padding:       "3px 8px",
    borderRadius:  THEME.radius.sm,
    alignSelf:     "flex-start",
  },
  title: {
    fontFamily:  THEME.fonts.display,
    fontWeight:  600,
    fontSize:    "16px",
    lineHeight:  1.4,
    color:       THEME.colors.navy,
  },
  authors: {
    fontSize:   "13px",
    color:      THEME.colors.muted,
    lineHeight: 1.5,
  },
  tagRow: {
    display:  "flex",
    flexWrap: "wrap",
    gap:      "6px",
    marginTop:"4px",
  },
};
