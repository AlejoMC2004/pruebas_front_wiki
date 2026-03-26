// lib/calendarEvents.js
// ─────────────────────────────────────────────────────────────────────────────
// FUENTE ÚNICA de eventos del calendario.
// Tanto la página /calendar como el endpoint /api/calendar usan este array.
// Cuando conectes el backend, reemplaza este archivo por una llamada a la API.
// ─────────────────────────────────────────────────────────────────────────────

export const CALENDAR_EVENTS = [
  {
    date:        "2026-03-05",
    title:       "Seminario Interno — Estimación de Profundidad",
    type:        "seminar",
    description: "Presentación de avances en estimación de profundidad monocular",
  },
  {
    date:        "2026-03-12",
    title:       "Reunión Proyecto VisionAgro",
    type:        "meeting",
    description: "Revisión trimestral del proyecto",
  },
  {
    date:        "2026-03-20",
    title:       "Deadline — Envío ECCV 2026",
    type:        "deadline",
    description: "Fecha límite de envío de artículos",
  },
  {
    date:        "2026-04-01",
    title:       "Visita Académica — Prof. Martínez (UNAL)",
    type:        "visit",
    description: "Charla sobre redes neuronales convolucionales",
  },
  {
    date:        "2026-04-15",
    title:       "Workshop de Visión Computacional",
    type:        "event",
    description: "Taller sobre técnicas avanzadas de visión",
  },
];
