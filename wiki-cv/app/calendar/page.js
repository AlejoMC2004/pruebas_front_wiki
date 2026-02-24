// app/calendar/page.js
import PageShell from "@/components/layout/PageShell";
import { THEME } from "@/styles/theme";

export const metadata = { title: "Calendario" };

export default function CalendarPage() {
  // TODO: integrar con Google Calendar API o similar
  const events = [
    { date: "2025-03-05", title: "Seminario interno — Depth Estimation",   type: "seminar" },
    { date: "2025-03-12", title: "Reunión de proyecto VisionAgro",          type: "meeting" },
    { date: "2025-03-20", title: "Deadline — ECCV 2025 submission",         type: "deadline" },
    { date: "2025-04-01", title: "Visita académica — Prof. Martínez (UNAL)",type: "visit"    },
    { date: "2025-04-15", title: "Workshop de Computer Vision",             type: "event"    },
  ];

  const typeColors = {
    seminar:  THEME.colors.teal,
    meeting:  THEME.colors.navy,
    deadline: "#e53e3e",
    visit:    "#805ad5",
    event:    THEME.colors.gold,
  };

  return (
    <PageShell
      title="Calendario"
      subtitle="Eventos, seminarios, reuniones y deadlines del grupo."
    >
      <div style={s.list}>
        {events.map((ev, i) => {
          const color = typeColors[ev.type] || THEME.colors.muted;
          const d = new Date(ev.date + "T00:00:00");
          return (
            <div key={i} style={s.row}>
              <div style={s.dateBlock}>
                <span style={s.day}>
                  {d.toLocaleDateString("es-ES", { day: "2-digit" })}
                </span>
                <span style={s.month}>
                  {d.toLocaleDateString("es-ES", { month: "short" }).toUpperCase()}
                </span>
              </div>
              <div style={{ ...s.indicator, background: color }} />
              <div style={s.eventBody}>
                <p style={s.eventTitle}>{ev.title}</p>
                <span style={{ ...s.eventType, color }}>
                  {ev.type.charAt(0).toUpperCase() + ev.type.slice(1)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </PageShell>
  );
}

const s = {
  list: {
    display:       "flex",
    flexDirection: "column",
    gap:           "12px",
    maxWidth:      "680px",
  },
  row: {
    display:    "flex",
    gap:        "16px",
    alignItems: "center",
    background: THEME.colors.card,
    border:     `1px solid ${THEME.colors.border}`,
    borderRadius:THEME.radius.md,
    padding:    "16px 20px",
  },
  dateBlock: {
    display:        "flex",
    flexDirection:  "column",
    alignItems:     "center",
    minWidth:       "44px",
  },
  day: {
    fontFamily:  THEME.fonts.display,
    fontWeight:  700,
    fontSize:    "24px",
    lineHeight:  1,
    color:       THEME.colors.navy,
  },
  month: {
    fontFamily:    THEME.fonts.mono,
    fontSize:      "10px",
    color:         THEME.colors.muted,
    letterSpacing: "0.06em",
  },
  indicator: {
    width:        "4px",
    height:       "36px",
    borderRadius: "2px",
    flexShrink:   0,
  },
  eventBody: {
    display:       "flex",
    flexDirection: "column",
    gap:           "2px",
  },
  eventTitle: {
    fontWeight: 600,
    fontSize:   "15px",
    color:      THEME.colors.navy,
  },
  eventType: {
    fontSize:      "12px",
    fontWeight:    600,
    textTransform: "capitalize",
    letterSpacing: "0.04em",
  },
};
