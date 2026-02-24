// app/papers/[id]/page.js
import PageShell from "@/components/layout/PageShell";
import TagBadge from "@/components/ui/TagBadge";
import { getPaperById } from "@/lib/api";
import { formatAuthors } from "@/lib/utils";
import { THEME } from "@/styles/theme";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const paper = await getPaperById(params.id);
  return { title: paper?.title || "Paper" };
}

export default async function PaperPage({ params }) {
  const paper = await getPaperById(params.id);
  if (!paper) notFound();

  return (
    <PageShell title={paper.title} subtitle={`${paper.venue} · ${paper.year}`}>
      <article style={s.article}>
        {/* Meta */}
        <div style={s.meta}>
          <div style={s.metaRow}>
            <span style={s.metaLabel}>Autores</span>
            <span style={s.metaValue}>{formatAuthors(paper.authors)}</span>
          </div>
          <div style={s.metaRow}>
            <span style={s.metaLabel}>Publicado en</span>
            <span style={s.metaValue}>{paper.venue} — {paper.year}</span>
          </div>
          {paper.doi && (
            <div style={s.metaRow}>
              <span style={s.metaLabel}>DOI</span>
              <a
                href={`https://doi.org/${paper.doi}`}
                style={s.doiLink}
                target="_blank"
                rel="noreferrer"
              >
                {paper.doi} ↗
              </a>
            </div>
          )}
        </div>

        {/* Tags */}
        <div style={s.tagRow}>
          {paper.tags.map((tag) => (
            <TagBadge key={tag} slug={tag} label={tag.replace(/-/g, " ")} />
          ))}
        </div>

        {/* Abstract */}
        <section style={s.section}>
          <h2 style={s.sectionTitle}>Abstract</h2>
          <p style={s.abstract}>{paper.abstract}</p>
        </section>

        {/* Acciones */}
        <div style={s.actions}>
          {paper.pdf_url && paper.pdf_url !== "#" && (
            <a href={paper.pdf_url} style={s.btnPrimary} target="_blank" rel="noreferrer">
              Descargar PDF
            </a>
          )}
          <a href="/papers" style={s.btnBack}>← Volver a Papers</a>
        </div>
      </article>
    </PageShell>
  );
}

const s = {
  article: {
    display:       "flex",
    flexDirection: "column",
    gap:           "28px",
    maxWidth:      "720px",
  },
  meta: {
    background:   THEME.colors.card,
    border:       `1px solid ${THEME.colors.border}`,
    borderRadius: THEME.radius.lg,
    padding:      "20px 24px",
    display:      "flex",
    flexDirection:"column",
    gap:          "12px",
  },
  metaRow: {
    display:   "flex",
    gap:       "12px",
    alignItems:"flex-start",
  },
  metaLabel: {
    fontWeight:    700,
    fontSize:      "12px",
    color:         THEME.colors.muted,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    minWidth:      "100px",
    paddingTop:    "2px",
  },
  metaValue: {
    fontSize:   "14px",
    color:      THEME.colors.text,
    lineHeight: 1.5,
  },
  doiLink: {
    fontSize:  "14px",
    color:     THEME.colors.teal,
    fontFamily:THEME.fonts.mono,
  },
  tagRow: {
    display:  "flex",
    flexWrap: "wrap",
    gap:      "8px",
  },
  section: {
    display:       "flex",
    flexDirection: "column",
    gap:           "12px",
  },
  sectionTitle: {
    fontFamily:  THEME.fonts.display,
    fontWeight:  700,
    fontSize:    "20px",
    color:       THEME.colors.navy,
    borderBottom:`2px solid ${THEME.colors.gold}`,
    paddingBottom:"8px",
  },
  abstract: {
    fontSize:   "15px",
    lineHeight: 1.8,
    color:      "#4a5568",
  },
  actions: {
    display: "flex",
    gap:     "12px",
    flexWrap:"wrap",
  },
  btnPrimary: {
    background:   THEME.colors.gold,
    color:        THEME.colors.navy,
    padding:      "10px 22px",
    borderRadius: THEME.radius.sm,
    fontWeight:   700,
    fontSize:     "14px",
  },
  btnBack: {
    color:     THEME.colors.teal,
    fontSize:  "14px",
    fontWeight:600,
    padding:   "10px 0",
  },
};
