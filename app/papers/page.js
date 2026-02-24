// app/papers/page.js
import PageShell from "@/components/layout/PageShell";
import TagFilter from "@/components/tags/TagFilter";
import PaperCard from "@/components/papers/PaperCard";
import EmptyState from "@/components/ui/EmptyState";
import { getPapers, getAllTags } from "@/lib/api";
import { getActiveTagsFromParams } from "@/lib/tags";
import { THEME } from "@/styles/theme";

export const metadata = { title: "Papers" };

export default async function PapersPage({ searchParams }) {
  const activeTags   = getActiveTagsFromParams(searchParams);
  const [{ data: papers }, allTags] = await Promise.all([
    getPapers({ tags: activeTags }),
    getAllTags(),
  ]);

  return (
    <PageShell
      title="Publicaciones"
      subtitle="Artículos, conferencias y revistas del grupo de investigación."
    >
      <div style={s.layout}>
        {/* Sidebar de filtros */}
        <TagFilter availableTags={allTags} basePath="/papers" />

        {/* Lista de papers */}
        <div style={s.main}>
          {activeTags.length > 0 && (
            <p style={s.resultCount}>
              {papers.length} resultado{papers.length !== 1 ? "s" : ""} para {activeTags.join(", ")}
            </p>
          )}

          {papers.length === 0 ? (
            <EmptyState
              icon="📄"
              title="Sin publicaciones"
              message="No se encontraron papers con los filtros seleccionados."
              action={{ label: "Limpiar filtros", href: "/papers" }}
            />
          ) : (
            <div style={s.grid}>
              {papers.map((p) => <PaperCard key={p.id} paper={p} />)}
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}

const s = {
  layout: {
    display:             "grid",
    gridTemplateColumns: "240px 1fr",
    gap:                 "32px",
    alignItems:          "flex-start",
  },
  main: {
    display:       "flex",
    flexDirection: "column",
    gap:           "20px",
  },
  resultCount: {
    fontSize:  "13px",
    color:     THEME.colors.muted,
    fontStyle: "italic",
  },
  grid: {
    display:             "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap:                 "20px",
  },
};
