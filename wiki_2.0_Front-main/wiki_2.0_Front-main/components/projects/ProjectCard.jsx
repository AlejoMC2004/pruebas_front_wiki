// components/projects/ProjectCard.jsx
import { THEME } from "@/styles/theme";
import TagBadge from "@/components/ui/TagBadge";
import { PROJECT_STATUS, formatMonth, truncate } from "@/lib/utils";

export default function ProjectCard({ project }) {
  const status = PROJECT_STATUS[project.status] || PROJECT_STATUS.active;

  return (
    <article style={s.card}>
      {/* Imagen / placeholder */}
      <div style={s.imageWrap}>
        {project.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.image_url} alt={project.title} style={s.image} />
        ) : (
          <div style={s.imagePlaceholder}>
            <span style={s.imagePlaceholderIcon}>▣</span>
          </div>
        )}
        <span style={{ ...s.statusBadge, background: status.color }}>
          {status.label}
        </span>
      </div>

      {/* Contenido */}
      <div style={s.body}>
        <a href={`/projects/${project.id}`} style={s.titleLink}>
          <h2 style={s.title}>{project.title}</h2>
        </a>
        <p style={s.description}>{truncate(project.description, 130)}</p>

        <div style={s.meta}>
          {project.funding && (
            <span style={s.funding}>🏛 {project.funding}</span>
          )}
          <span style={s.dates}>
            {formatMonth(project.start_date)} → {project.end_date ? formatMonth(project.end_date) : "En curso"}
          </span>
        </div>

        <div style={s.tagRow}>
          {project.tags.slice(0, 4).map((tag) => (
            <TagBadge key={tag} slug={tag} label={tag.replace(/-/g, " ")} size="sm" />
          ))}
        </div>
      </div>
    </article>
  );
}

const s = {
  card: {
    background:    THEME.colors.card,
    borderRadius:  THEME.radius.lg,
    border:        `1px solid ${THEME.colors.border}`,
    boxShadow:     THEME.shadow.card,
    overflow:      "hidden",
    display:       "flex",
    flexDirection: "column",
    transition:    "box-shadow 0.2s, transform 0.2s",
  },
  imageWrap: {
    position: "relative",
    height:   "140px",
  },
  image: {
    width:      "100%",
    height:     "100%",
    objectFit:  "cover",
  },
  imagePlaceholder: {
    width:          "100%",
    height:         "100%",
    background:     `linear-gradient(135deg, ${THEME.colors.navy}22, ${THEME.colors.teal}22)`,
    display:        "flex",
    alignItems:     "center",
    justifyContent: "center",
  },
  imagePlaceholderIcon: {
    fontSize: "40px",
    color:    `${THEME.colors.teal}60`,
  },
  statusBadge: {
    position:     "absolute",
    top:          "12px",
    right:        "12px",
    color:        "#fff",
    fontSize:     "11px",
    fontWeight:   700,
    padding:      "3px 10px",
    borderRadius: THEME.radius.full,
    letterSpacing:"0.04em",
  },
  body: {
    padding:       "20px",
    display:       "flex",
    flexDirection: "column",
    gap:           "10px",
    flex:          1,
  },
  titleLink: { color: "inherit" },
  title: {
    fontFamily: THEME.fonts.display,
    fontWeight: 600,
    fontSize:   "18px",
    lineHeight: 1.3,
    color:      THEME.colors.navy,
  },
  description: {
    fontSize:   "13px",
    lineHeight: 1.6,
    color:      "#4a5568",
    flex:       1,
  },
  meta: {
    display:   "flex",
    flexWrap:  "wrap",
    gap:       "8px",
    marginTop: "4px",
  },
  funding: {
    fontSize:  "12px",
    color:     THEME.colors.muted,
    fontWeight:600,
  },
  dates: {
    fontSize:   "12px",
    color:      THEME.colors.muted,
    fontFamily: THEME.fonts.mono,
  },
  tagRow: {
    display:  "flex",
    flexWrap: "wrap",
    gap:      "6px",
  },
};
