// lib/tags.js
// ─────────────────────────────────────────────────────────────────────────────
// Todo lo relacionado con tags: categorías, helpers, lógica de filtrado.
// ─────────────────────────────────────────────────────────────────────────────

import { THEME } from "@/styles/theme";

// Categorías de tags — define cómo se agrupan visualmente en el filtro
export const TAG_CATEGORIES = {
  method: {
    label: "Método",
    color: THEME.colors.teal,
    slugs: ["deep-learning", "self-supervised", "contrastive-learning", "few-shot", "real-time"],
  },
  task: {
    label: "Tarea",
    color: THEME.colors.navy,
    slugs: ["object-detection", "segmentation", "3d-reconstruction", "depth-estimation", "tracking"],
  },
  application: {
    label: "Aplicación",
    color: "#8a6a2a",  // marrón académico para aplicaciones
    slugs: ["medical-imaging", "agriculture", "remote-sensing", "industrial", "uav", "monocular"],
  },
};

// Convierte "object-detection" → "Object Detection"
export function slugToLabel(slug) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Dado un array de items y tags activos, filtra con lógica AND
export function filterItemsByTags(items, activeTags) {
  if (!activeTags || activeTags.length === 0) return items;
  return items.filter((item) =>
    activeTags.every((tag) => item.tags?.includes(tag))
  );
}

// Lee tags activos desde los searchParams de Next.js
export function getActiveTagsFromParams(searchParams) {
  const raw = searchParams?.tag;
  if (!raw) return [];
  return Array.isArray(raw) ? raw : [raw];
}

// Construye un URLSearchParams con los tags dados
export function buildTagSearchParams(tags) {
  const params = new URLSearchParams();
  tags.forEach((t) => params.append("tag", t));
  return params.toString();
}

// Alterna un tag en el array de activos (para el filtro)
export function toggleTag(activeTags, slug) {
  return activeTags.includes(slug)
    ? activeTags.filter((t) => t !== slug)
    : [...activeTags, slug];
}

// Devuelve la categoría de un tag dado su slug
export function getTagCategory(slug) {
  for (const [key, cat] of Object.entries(TAG_CATEGORIES)) {
    if (cat.slugs.includes(slug)) return { key, ...cat };
  }
  return null;
}
