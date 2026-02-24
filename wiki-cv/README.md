# Wiki — Grupo de Investigación en Visión Computacional

Frontend en Next.js 14 (App Router) + React. Listo para correr en local.

---

## 🚀 Arrancar en local

```bash
# 1. Instalar dependencias
npm install

# 2. Correr en modo desarrollo
npm run dev

# Abre http://localhost:3000
```

---

## 📁 Estructura del proyecto

```
wiki-cv/
├── app/                        # Páginas (Next.js App Router)
│   ├── layout.js               # Layout raíz
│   ├── page.js                 # Home
│   ├── globals.css             # Reset + estilos globales
│   ├── not-found.js            # Página 404
│   ├── papers/
│   │   ├── page.js             # Lista de papers con filtro por tags
│   │   └── [id]/page.js        # Detalle de un paper
│   ├── projects/
│   │   └── page.js             # Lista de proyectos
│   ├── tags/
│   │   ├── page.js             # Índice de todos los tags
│   │   └── [slug]/page.js      # Contenido de un tag específico
│   ├── lines/page.js           # Líneas de investigación
│   ├── calendar/page.js        # Calendario de eventos
│   └── settings/page.js        # Configuración (placeholder)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx          # Barra de navegación
│   │   ├── Footer.jsx          # Footer
│   │   └── PageShell.jsx       # Wrapper para páginas internas
│   ├── home/
│   │   ├── HeroSection.jsx     # Hero de la home
│   │   ├── PublicationsPreview.jsx
│   │   └── NewsPreview.jsx
│   ├── papers/
│   │   └── PaperCard.jsx       # Card de publicación
│   ├── projects/
│   │   └── ProjectCard.jsx     # Card de proyecto
│   ├── tags/
│   │   ├── TagFilter.jsx       # Panel de filtros (client component)
│   │   └── TagCloud.jsx        # Nube de tags
│   └── ui/                     # Átomos reutilizables
│       ├── TagBadge.jsx
│       ├── Button.jsx
│       ├── SectionHeader.jsx
│       ├── Avatar.jsx
│       └── EmptyState.jsx
│
├── lib/
│   ├── api.js                  # Capa de datos (mock → reemplazar con fetch real)
│   ├── tags.js                 # Lógica y helpers de tags
│   ├── utils.js                # Helpers generales (formatDate, truncate...)
│   └── constants.js            # NAV_LINKS, GROUP_INFO
│
└── styles/
    └── theme.js                # 🎨 Tokens de diseño (colores, fuentes, espaciado)
```

---

## 🎨 Cambiar colores

Edita `styles/theme.js` — todos los componentes los importan de ahí:

```js
export const THEME = {
  colors: {
    navy:      "#133767",  // Nav, hero
    gold:      "#fcbf6c",  // Acentos, activos
    teal:      "#278285",  // Links, badges
    tealLight: "#35acac",  // Hover, bordes
    ...
  }
}
```

---

## 🔌 Conectar el backend

Abre `lib/api.js`. Cada función tiene comentarios indicando cómo reemplazar el mock:

```js
// Reemplaza el contenido de esta función con:
export async function getPapers({ tags = [] } = {}) {
  const qs = tags.map(t => `tag=${t}`).join("&");
  const res = await fetch(`${API_URL}/papers?${qs}`, {
    next: { revalidate: 60 }  // ISR — revalida cada 60s
  });
  return res.json();
}
```

Configura la URL del backend en `.env.local`:

```
NEXT_PUBLIC_API_URL=http://tu-backend.com/api
```

---

## 🏷️ Agregar categorías de tags

Edita `lib/tags.js`:

```js
export const TAG_CATEGORIES = {
  method: {
    label: "Método",
    color: "#278285",
    slugs: ["deep-learning", "transformer", ...],
  },
  // Agrega aquí nuevas categorías
};
```

---

## 📦 Dependencias

Solo Next.js + React. Sin librerías de UI externas.
Fuentes: Google Fonts (Playfair Display + Source Sans 3 + JetBrains Mono).
