// app/projects/page.js
import PageShell from "@/components/layout/PageShell";
import TagFilter from "@/components/tags/TagFilter";
import ProjectCard from "@/components/projects/ProjectCard";
import EmptyState from "@/components/ui/EmptyState";
import { getProjects, getAllTags } from "@/lib/api";
import { getActiveTagsFromParams } from "@/lib/tags";
import { THEME } from "@/styles/theme";

export const metadata = { title: "Proyectos" };

export default async function ProjectsPage({ searchParams }) {
  const activeTags = getActiveTagsFromParams(searchParams);
  const [projects, allTags] = await Promise.all([
    getProjects({ tags: activeTags }),
    getAllTags(),
  ]);

  return (
    <PageShell
      title="Proyectos"
      subtitle="Líneas activas, proyectos financiados y colaboraciones del grupo."
    >
      <div style={s.layout}>
        <TagFilter availableTags={allTags} basePath="/projects" />

        <div style={s.main}>
          {projects.length === 0 ? (
            <EmptyState
              icon="📁"
              title="Sin proyectos"
              message="No se encontraron proyectos con los filtros seleccionados."
              action={{ label: "Limpiar filtros", href: "/projects" }}
            />
          ) : (
            <div style={s.grid}>
              {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
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
  main: { flex: 1 },
  grid: {
    display:             "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap:                 "24px",
  },
};
