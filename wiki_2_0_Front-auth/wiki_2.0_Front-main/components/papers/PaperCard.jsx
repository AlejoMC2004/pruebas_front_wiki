// components/papers/PaperCard.jsx
// Props:
//   paper — objeto con id, title, authors, venue, year, tags, abstract

import { THEME } from "@/styles/theme";
import TagBadge from "@/components/ui/TagBadge";
import { formatAuthors, truncate } from "@/lib/utils";

export default function PaperCard({ paper }) {
  return (
    <article style={s.card}>
      {/* Header */}
      <div style={s.header}>
        <span style={s.venue}>{paper.venue}</span>
        <span style={s.year}>{paper.year}</span>
      </div>

      {/* Título */}
      <a href={`/papers/${paper.id}`} style={s.titleLink}>
        <h2 style={s.title}>{paper.title}</h2>
      </a>

      {/* Autores */}
      <p style={s.authors}>{formatAuthors(paper.authors)}</p>

      {/* Abstract */}
      {paper.abstract && (
        <p style={s.abstract}>{truncate(paper.abstract, 140)}</p>
      )}

      {/* Footer */}
      <div style={s.footer}>
        <div style={s.tagRow}>
          {paper.tags.map((tag) => (
            <TagBadge
              key={tag}
              slug={tag}
              label={tag.replace(/-/g, " ")}
              size="sm"
            />
          ))}
        </div>
        {paper.pdf_url && paper.pdf_url !== "#" && (
          <a href={paper.pdf_url} style={s.pdfLink} target="_blank" rel="noreferrer">
            PDF ↗
          </a>
        )}
      </div>
    </article>
  );
}

const s = {
  card: {
    background:    THEME.colors.card,
    borderRadius:  THEME.radius.lg,
    padding:       "24px",
    border:        `1px solid ${THEME.colors.border}`,
    boxShadow:     THEME.shadow.card,
    display:       "flex",
    flexDirection: "column",
    gap:           "10px",
    transition:    "box-shadow 0.2s, transform 0.2s",
  },
  header: {
    display:        "flex",
    justifyContent: "space-between",
    alignItems:     "center",
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
  },
  year: {
    fontFamily: THEME.fonts.mono,
    fontSize:   "12px",
    color:      THEME.colors.muted,
  },
  titleLink: { color: "inherit" },
  title: {
    fontFamily:  THEME.fonts.display,
    fontWeight:  600,
    fontSize:    "17px",
    lineHeight:  1.4,
    color:       THEME.colors.navy,
  },
  authors: {
    fontSize:   "13px",
    color:      THEME.colors.muted,
    lineHeight: 1.5,
  },
  abstract: {
    fontSize:   "13px",
    lineHeight: 1.65,
    color:      "#4a5568",
  },
  footer: {
    display:        "flex",
    justifyContent: "space-between",
    alignItems:     "flex-end",
    marginTop:      "4px",
  },
  tagRow: {
    display:  "flex",
    flexWrap: "wrap",
    gap:      "6px",
    flex:     1,
  },
  pdfLink: {
    fontFamily: THEME.fonts.mono,
    fontSize:   "12px",
    fontWeight: 700,
    color:      THEME.colors.teal,
    whiteSpace: "nowrap",
    marginLeft: "12px",
  },
};
