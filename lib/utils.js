// lib/utils.js

// Formatea "2024-01-15" → "15 ene 2024"
export function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Formatea "2024-01" → "Ene 2024"
export function formatMonth(monthStr) {
  if (!monthStr) return "";
  const [year, month] = monthStr.split("-");
  return new Date(year, month - 1).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
  });
}

// Trunca texto a n caracteres
export function truncate(str, n = 160) {
  if (!str || str.length <= n) return str;
  return str.slice(0, n).trimEnd() + "…";
}

// Convierte array de autores a string legible
// ["García, M.", "López, R."] → "García, M. · López, R."
export function formatAuthors(authors = []) {
  return authors.join(" · ");
}

// Mapa de estado de proyecto a etiqueta y color
export const PROJECT_STATUS = {
  active: { label: "Activo", color: "#278285" },
  completed: { label: "Completado", color: "#8a96a8" },
  paused: { label: "Pausado", color: "#fcbf6c" },
};
