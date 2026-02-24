// components/home/NewsPreview.jsx
import { THEME } from "@/styles/theme";
import SectionHeader from "@/components/ui/SectionHeader";
import { formatDate } from "@/lib/utils";

function NewsCard({ item }) {
  return (
    <a href={`/news/${item.id}`} style={s.card}>
      <time style={s.date}>{formatDate(item.date)}</time>
      <h3 style={s.title}>{item.title}</h3>
      <p style={s.body}>{item.body}</p>
      <span style={s.readMore}>Leer más →</span>
    </a>
  );
}

export default function NewsPreview({ news }) {
  return (
    <section style={s.section}>
      <div style={s.inner}>
        <SectionHeader title="Noticias" linkLabel="Ver todas →" linkHref="/news" dark />
        <div style={s.grid}>
          {news.map((item) => <NewsCard key={item.id} item={item} />)}
        </div>
      </div>
    </section>
  );
}

const s = {
  section: {
    padding:    "60px 0",
    background: THEME.colors.navy,
  },
  inner: {
    maxWidth: THEME.maxWidth,
    margin:   "0 auto",
    padding:  "0 32px",
  },
  grid: {
    display:             "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap:                 "20px",
  },
  card: {
    display:       "flex",
    flexDirection: "column",
    gap:           "8px",
    background:    THEME.colors.cardDark,
    borderLeft:    `3px solid ${THEME.colors.teal}`,
    borderRadius:  "0 " + THEME.radius.lg + " " + THEME.radius.lg + " 0",
    padding:       "24px",
    cursor:        "pointer",
    transition:    "border-left-color 0.2s",
    color:         "inherit",
  },
  date: {
    fontFamily:    THEME.fonts.mono,
    fontSize:      "11px",
    color:         THEME.colors.gold,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  },
  title: {
    fontFamily:  THEME.fonts.display,
    fontWeight:  600,
    fontSize:    "17px",
    lineHeight:  1.35,
    color:       "#fff",
  },
  body: {
    fontSize:   "13px",
    lineHeight: 1.65,
    color:      "rgba(255,255,255,0.55)",
    flex:       1,
    display:    "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow:   "hidden",
  },
  readMore: {
    fontSize:   "13px",
    fontWeight: 700,
    color:      THEME.colors.tealLight,
    marginTop:  "8px",
    alignSelf:  "flex-start",
  },
};
