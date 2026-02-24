// app/tags/[slug]/page.js
import PageShell from "@/components/layout/PageShell";
import PaperCard from "@/components/papers/PaperCard";
import ProjectCard from "@/components/projects/ProjectCard";
import { getContentByTag } from "@/lib/api";
import { slugToLabel } from "@/lib/tags";
import { THEME } from "@/styles/theme";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  return { title: `Tag: ${slugToLabel(params.slug)}` };
}

export default async function TagPage({ params }) {
  const data = await getContentByTag(params.slug);
  if (!data.tag) notFound();

  const { tag, papers, projects, news } = data;
  const totalItems = papers.length + projects.length + news.length;

  return (
    <PageShell
      title={`#${tag.label}`}
      subtitle={`${totalItems} elemento${totalItems !== 1 ? "s" : ""} etiquetado${totalItems !== 1 ? "s" : ""} con este tag`}
    >
      {/* Papers */}
      {papers.length > 0 && (
        <section style={s.section}>
          <h2 style={s.sectionTitle}>
            Papers <span style={s.count}>{papers.length}</span>
          </h2>
          <div style={s.paperGrid}>
            {papers.map((p) => <PaperCard key={p.id} paper={p} />)}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section style={s.section}>
          <h2 style={s.sectionTitle}>
            Proyectos <span style={s.count}>{projects.length}</span>
          </h2>
          <div style={s.projectGrid}>
            {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
          </div>
        </section>
      )}

      {/* News */}
      {news.length > 0 && (
        <section style={s.section}>
          <h2 style={s.sectionTitle}>
            Noticias <span style={s.count}>{news.length}</span>
          </h2>
          <div style={s.newsList}>
            {news.map((item) => (
              <div key={item.id} style={s.newsItem}>
                <time style={s.newsDate}>{item.date}</time>
                <p style={s.newsTitle}>{item.title}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {totalItems === 0 && (
        <p style={{ color: THEME.colors.muted }}>No hay contenido para este tag.</p>
      )}
    </PageShell>
  );
}

const s = {
  section: {
    marginBottom: "48px",
  },
  sectionTitle: {
    fontFamily:    THEME.fonts.display,
    fontWeight:    700,
    fontSize:      "22px",
    color:         THEME.colors.navy,
    borderBottom:  `2px solid ${THEME.colors.gold}`,
    paddingBottom: "10px",
    marginBottom:  "20px",
    display:       "flex",
    alignItems:    "center",
    gap:           "10px",
  },
  count: {
    fontFamily:  THEME.fonts.mono,
    fontSize:    "13px",
    color:       THEME.colors.teal,
    fontWeight:  600,
    background:  `${THEME.colors.teal}15`,
    padding:     "2px 8px",
    borderRadius:THEME.radius.full,
  },
  paperGrid: {
    display:             "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap:                 "20px",
  },
  projectGrid: {
    display:             "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap:                 "20px",
  },
  newsList: {
    display:       "flex",
    flexDirection: "column",
    gap:           "12px",
  },
  newsItem: {
    display:     "flex",
    gap:         "16px",
    alignItems:  "flex-start",
    padding:     "14px 20px",
    background:  THEME.colors.card,
    border:      `1px solid ${THEME.colors.border}`,
    borderRadius:THEME.radius.md,
  },
  newsDate: {
    fontFamily: THEME.fonts.mono,
    fontSize:   "12px",
    color:      THEME.colors.teal,
    whiteSpace: "nowrap",
    paddingTop: "2px",
  },
  newsTitle: {
    fontSize:   "14px",
    fontWeight: 600,
    color:      THEME.colors.navy,
    lineHeight: 1.45,
  },
};
