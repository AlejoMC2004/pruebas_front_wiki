// lib/api.js
// ─────────────────────────────────────────────────────────────────────────────
// Capa de acceso a datos.
// Por ahora devuelve mock data. Cuando tengas el backend listo,
// reemplaza cada función con un fetch real. La interfaz (parámetros y
// forma de los datos devueltos) NO cambia, así que los componentes no
// necesitan modificarse.
// ─────────────────────────────────────────────────────────────────────────────

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

// ── Datos mock ────────────────────────────────────────────────────────────────

const MOCK_PAPERS = [
  {
    id: "1",
    title: "Deep Learning for Real-Time Object Detection in Unstructured Environments",
    authors: ["García, M.", "Rodríguez, A.", "Fernández, C."],
    venue: "CVPR 2024",
    year: 2024,
    abstract: "We present a novel architecture for real-time object detection optimized for challenging outdoor environments with variable lighting conditions and occlusion.",
    doi: "10.1000/xyz123",
    pdf_url: "#",
    tags: ["object-detection", "deep-learning", "real-time"],
  },
  {
    id: "2",
    title: "Semantic Segmentation of Agricultural Fields Using Multispectral UAV Imagery",
    authors: ["López, R.", "Torres, S."],
    venue: "ICCV 2023",
    year: 2023,
    abstract: "This paper proposes a multispectral semantic segmentation pipeline for precision agriculture applications using UAV-collected imagery.",
    doi: "10.1000/abc456",
    pdf_url: "#",
    tags: ["segmentation", "remote-sensing", "agriculture", "uav"],
  },
  {
    id: "3",
    title: "Self-Supervised Contrastive Learning for Medical Image Analysis",
    authors: ["Martínez, J.", "Sánchez, P.", "García, M."],
    venue: "MICCAI 2023",
    year: 2023,
    abstract: "A self-supervised approach using contrastive learning to leverage large unlabeled medical image datasets for downstream classification tasks.",
    doi: "10.1000/def789",
    pdf_url: "#",
    tags: ["medical-imaging", "self-supervised", "contrastive-learning"],
  },
  {
    id: "4",
    title: "3D Scene Reconstruction from Monocular Video Sequences",
    authors: ["Rodríguez, A.", "Fernández, C."],
    venue: "ECCV 2023",
    year: 2023,
    abstract: "We propose a depth estimation and scene reconstruction pipeline that works with single-camera video input.",
    doi: "10.1000/ghi012",
    pdf_url: "#",
    tags: ["3d-reconstruction", "depth-estimation", "monocular"],
  },
  {
    id: "5",
    title: "Few-Shot Learning for Industrial Defect Detection",
    authors: ["Torres, S.", "García, M."],
    venue: "ICVS 2025",
    year: 2025,
    abstract: "A few-shot learning framework designed for quality control in manufacturing, requiring minimal labeled examples per defect class.",
    doi: "10.1000/jkl345",
    pdf_url: "#",
    tags: ["few-shot", "object-detection", "industrial"],
  },
];

const MOCK_PROJECTS = [
  {
    id: "1",
    title: "VisionAgro",
    description: "Sistema de análisis de cultivos mediante visión computacional y drones multiespectrales para optimización de recursos en agricultura de precisión.",
    status: "active",
    start_date: "2024-01",
    end_date: "2026-12",
    funding: "Minciencias",
    members: ["Torres, S.", "López, R."],
    tags: ["agriculture", "uav", "segmentation", "remote-sensing"],
    image_url: null,
  },
  {
    id: "2",
    title: "MedVision",
    description: "Plataforma de apoyo diagnóstico basada en análisis automático de imágenes médicas: radiografías, resonancias y biopsias digitales.",
    status: "active",
    start_date: "2023-06",
    end_date: "2025-12",
    funding: "MinSalud",
    members: ["Martínez, J.", "Sánchez, P."],
    tags: ["medical-imaging", "deep-learning", "self-supervised"],
    image_url: null,
  },
  {
    id: "3",
    title: "UrbanScan",
    description: "Monitoreo automático de infraestructura urbana mediante análisis de secuencias de video de cámaras de tráfico.",
    status: "completed",
    start_date: "2022-01",
    end_date: "2024-06",
    funding: "Alcaldía",
    members: ["García, M.", "Rodríguez, A."],
    tags: ["object-detection", "real-time", "3d-reconstruction"],
    image_url: null,
  },
];

const MOCK_NEWS = [
  {
    id: "1",
    date: "2025-02-14",
    title: "Best Paper Award en ICVS 2025",
    body: "Nuestro paper sobre few-shot learning para detección de defectos industriales recibió el Best Paper Award en el International Conference on Computer Vision Systems.",
    tags: ["award", "few-shot", "industrial"],
  },
  {
    id: "2",
    date: "2025-01-28",
    title: "Nueva beca de investigación aprobada",
    body: "El grupo recibió una beca de 3 años de Minciencias para desarrollar soluciones avanzadas de visión computacional para agricultura de precisión.",
    tags: ["funding", "agriculture"],
  },
  {
    id: "3",
    date: "2025-01-10",
    title: "Posición de Doctorado abierta",
    body: "Buscamos candidatos motivados con bases sólidas en machine learning y procesamiento de imágenes. Aplicaciones abiertas hasta marzo 2025.",
    tags: ["hiring"],
  },
];

const MOCK_TAGS = [
  { slug: "deep-learning",        label: "Deep Learning",         count: 3, category: "method" },
  { slug: "self-supervised",      label: "Self-Supervised",       count: 2, category: "method" },
  { slug: "contrastive-learning", label: "Contrastive Learning",  count: 1, category: "method" },
  { slug: "few-shot",             label: "Few-Shot",              count: 2, category: "method" },
  { slug: "real-time",            label: "Real-Time",             count: 2, category: "method" },
  { slug: "object-detection",     label: "Object Detection",      count: 3, category: "task" },
  { slug: "segmentation",         label: "Segmentation",          count: 2, category: "task" },
  { slug: "3d-reconstruction",    label: "3D Reconstruction",     count: 2, category: "task" },
  { slug: "depth-estimation",     label: "Depth Estimation",      count: 1, category: "task" },
  { slug: "medical-imaging",      label: "Medical Imaging",       count: 2, category: "application" },
  { slug: "agriculture",          label: "Agriculture",           count: 2, category: "application" },
  { slug: "remote-sensing",       label: "Remote Sensing",        count: 2, category: "application" },
  { slug: "industrial",           label: "Industrial",            count: 1, category: "application" },
  { slug: "uav",                  label: "UAV",                   count: 2, category: "application" },
  { slug: "monocular",            label: "Monocular",             count: 1, category: "application" },
];

const MOCK_LINES = [
  {
    id: "1",
    title: "Detección y Reconocimiento de Objetos",
    description: "Desarrollo de algoritmos eficientes para detección, clasificación y seguimiento de objetos en imágenes y video en tiempo real.",
    tags: ["object-detection", "deep-learning", "real-time"],
    papers_count: 12,
    projects_count: 3,
  },
  {
    id: "2",
    title: "Visión Médica",
    description: "Aplicaciones de visión computacional para apoyo diagnóstico, segmentación de estructuras anatómicas y análisis de imágenes clínicas.",
    tags: ["medical-imaging", "segmentation", "self-supervised"],
    papers_count: 8,
    projects_count: 2,
  },
  {
    id: "3",
    title: "Agricultura de Precisión",
    description: "Sistemas de monitoreo de cultivos, estimación de rendimiento y detección de enfermedades usando imágenes multiespectrales y RGB.",
    tags: ["agriculture", "remote-sensing", "segmentation", "uav"],
    papers_count: 7,
    projects_count: 2,
  },
  {
    id: "4",
    title: "Reconstrucción 3D y Estimación de Profundidad",
    description: "Técnicas de reconstrucción de escenas 3D, estimación monocular de profundidad y SLAM visual.",
    tags: ["3d-reconstruction", "depth-estimation", "monocular"],
    papers_count: 5,
    projects_count: 1,
  },
];

const MOCK_MEMBERS = [
  { id: "1", name: "Mario García",     role: "Director",            avatar: null },
  { id: "2", name: "Ana Rodríguez",    role: "PhD Candidate",       avatar: null },
  { id: "3", name: "Carlos Fernández", role: "PhD Candidate",       avatar: null },
  { id: "4", name: "Rosa López",       role: "MSc Student",         avatar: null },
  { id: "5", name: "Sergio Torres",    role: "Research Engineer",   avatar: null },
  { id: "6", name: "Juliana Martínez", role: "PhD Candidate",       avatar: null },
];

// ── Helper interno ─────────────────────────────────────────────────────────────

function filterByTags(items, tags) {
  if (!tags || tags.length === 0) return items;
  return items.filter((item) =>
    tags.every((tag) => item.tags?.includes(tag))
  );
}

// Simula latencia de red en desarrollo
function delay(ms = 100) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ── API pública ────────────────────────────────────────────────────────────────
// Cuando tengas backend, reemplaza el cuerpo de cada función con:
//   const res = await fetch(`${API_URL}/endpoint?...`)
//   return res.json()

export async function getPapers({ tags = [], page = 1, limit = 20 } = {}) {
  await delay();
  const filtered = filterByTags(MOCK_PAPERS, tags);
  return {
    data: filtered.slice((page - 1) * limit, page * limit),
    total: filtered.length,
    page,
    limit,
  };
}

export async function getPaperById(id) {
  await delay();
  return MOCK_PAPERS.find((p) => p.id === id) ?? null;
}

export async function getProjects({ tags = [], status } = {}) {
  await delay();
  let filtered = filterByTags(MOCK_PROJECTS, tags);
  if (status) filtered = filtered.filter((p) => p.status === status);
  return filtered;
}

export async function getProjectById(id) {
  await delay();
  return MOCK_PROJECTS.find((p) => p.id === id) ?? null;
}

export async function getNews({ tags = [], limit = 10 } = {}) {
  await delay();
  return filterByTags(MOCK_NEWS, tags).slice(0, limit);
}

export async function getAllTags() {
  await delay();
  return MOCK_TAGS;
}

export async function getContentByTag(slug) {
  await delay();
  const tag = MOCK_TAGS.find((t) => t.slug === slug);
  return {
    tag,
    papers:   MOCK_PAPERS.filter((p) => p.tags.includes(slug)),
    projects: MOCK_PROJECTS.filter((p) => p.tags.includes(slug)),
    news:     MOCK_NEWS.filter((n) => n.tags.includes(slug)),
  };
}

export async function getLines() {
  await delay();
  return MOCK_LINES;
}

export async function getMembers() {
  await delay();
  return MOCK_MEMBERS;
}

export async function getHomeSummary() {
  await delay();
  return {
    stats: {
      members:      MOCK_MEMBERS.length,
      publications: MOCK_PAPERS.length,
      projects:     MOCK_PROJECTS.length,
      lines:        MOCK_LINES.length,
    },
    latestPapers: MOCK_PAPERS.slice(0, 3),
    latestNews:   MOCK_NEWS.slice(0, 3),
    about: `El Grupo de Investigación en Visión Computacional desarrolla algoritmos y
sistemas para comprensión de imágenes, reconstrucción 3D e inteligencia visual.
Nuestro equipo interdisciplinario trabaja en investigación fundamental y aplicaciones
reales en agricultura, salud y sistemas autónomos, fomentando la colaboración
entre academia e industria.`,
  };
}
