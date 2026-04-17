# Wiki — CVAIL Research Group

Frontend built with Next.js 14 (App Router) + React. No external UI libraries.

---

## 🚀 Getting started

```bash
# 1. Install dependencies
npm install

# 2. Run in development mode
npm run dev

# Open http://localhost:3000
```

---

## 📁 Project structure

```
wiki-cv/
├── app/                        # Pages (Next.js App Router)
│   ├── layout.js               # Root layout + AuthProvider
│   ├── page.js                 # Home
│   ├── globals.css             # Reset + global styles
│   ├── not-found.js            # 404 page
│   ├── unauthorized/page.js    # 403 page
│   ├── login/page.js           # Standalone login page
│   ├── papers/
│   │   ├── page.js             # Papers list with tag filtering
│   │   └── [id]/page.js        # Paper detail
│   ├── projects/page.js        # Projects list
│   ├── tags/
│   │   ├── page.js             # All tags index
│   │   └── [slug]/page.js      # Content for a specific tag
│   ├── lines/page.js           # Research lines
│   ├── calendar/page.js        # Events calendar
│   ├── settings/page.js        # Settings (admin only)
│   └── api/
│       └── calendar/route.js   # .ics endpoint for calendar subscription
│
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx          # Navigation bar (auth-aware)
│   │   ├── Footer.jsx
│   │   └── PageShell.jsx       # Wrapper for inner pages
│   ├── auth/
│   │   ├── AuthModal.jsx       # Sign in / Register modal
│   │   └── LoginForm.jsx       # Standalone login form
│   ├── home/
│   │   ├── HeroSection.jsx
│   │   ├── PublicationsPreview.jsx
│   │   └── NewsPreview.jsx
│   ├── papers/
│   │   └── PaperCard.jsx
│   ├── projects/
│   │   └── ProjectCard.jsx
│   ├── tags/
│   │   ├── TagFilter.jsx
│   │   └── TagCloud.jsx
│   └── ui/                     # Reusable atoms
│       ├── TagBadge.jsx
│       ├── Button.jsx
│       ├── SectionHeader.jsx
│       ├── Avatar.jsx
│       └── EmptyState.jsx
│
├── context/
│   └── AuthContext.jsx         # Global auth state (useAuth hook)
│
├── lib/
│   ├── api.js                  # Data layer (mock → replace with real fetch)
│   ├── authApi.js              # Auth calls (mock mode by default)
│   ├── calendarEvents.js       # Single source of truth for calendar events
│   ├── tags.js                 # Tag logic and helpers
│   ├── utils.js                # General helpers (formatDate, truncate…)
│   └── constants.js            # NAV_LINKS, GROUP_INFO
│
└── styles/
    └── theme.js                # 🎨 Design tokens (colors, fonts, spacing)
```

---

## 🔐 Authentication

Auth state is managed globally via `context/AuthContext.jsx`. Use the `useAuth()` hook anywhere in the app:

```js
const { user, isLoading, loginUser, registerUser, logoutUser } = useAuth();
```

`user` shape: `{ id, name, email, role }` — role is either `"admin"` or `"user"`.

The Settings page is restricted to `admin` users only and hidden from the nav for everyone else.

### Mock mode (default)

Auth works out of the box without a backend. Demo accounts:

| Email | Password | Role |
|---|---|---|
| admin@wikicv.com | 123456 | admin |
| user@wikicv.com | 123456 | user |

### Connecting a real backend

Set these variables in `.env.local`:

```
NEXT_PUBLIC_API_URL=https://your-backend.com
NEXT_PUBLIC_AUTH_MOCK=false
```

Your backend must implement:

| Endpoint | Method | Response |
|---|---|---|
| `/auth/login` | POST | `{ token, user: { id, name, email, role } }` |
| `/auth/register` | POST | `{ token, user: { id, name, email, role } }` |
| `/auth/logout` | POST | — |
| `/auth/me` | GET | `{ user: { id, name, email, role } }` |

---

## 🔌 Connecting the data backend

Open `lib/api.js`. Each function has comments showing how to replace the mock:

```js
export async function getPapers({ tags = [] } = {}) {
  const qs = tags.map(t => `tag=${t}`).join("&");
  const res = await fetch(`${API_URL}/papers?${qs}`, {
    next: { revalidate: 60 }  // ISR — revalidates every 60s
  });
  return res.json();
}
```

---

## 📅 Calendar

Events are defined once in `lib/calendarEvents.js` and used by both the calendar page and the `/api/calendar` endpoint.

External clients (Google Calendar, Outlook, Apple Calendar) can subscribe to:
```
http://localhost:3000/api/calendar
```

---

## 🎨 Changing the theme

Edit `styles/theme.js` — all components import from there:

```js
export const THEME = {
  colors: {
    navy:      "#3b4a2f",  // Nav, hero, dark sections
    gold:      "#c9a84c",  // Primary accent — actives, highlights
    teal:      "#5f7a4a",  // Secondary accent — links, badges
    tealLight: "#8fab72",  // Hover, soft borders, gradients
    ...
  }
}
```

Alternative palettes are available as comments at the bottom of `theme.js`.


