# BUILD & SCALE 2026 — Project Context for Claude Code

## What This Project Is
A multi-page React web application for **Build & Scale 2026**, a one-day student conference
hosted at **Peter Mbah Law Auditorium, Godfrey Okoye University, Enugu, Nigeria**.
**Date:** Friday, 30th May 2026.
**Theme:** "Building Men Who Build Society"
**Lead Convener:** Azua Suurshater Stephen · 08146732800 · 400 Level, GO University

---

## Tech Stack
- React 18 (Create React App)
- React Router DOM v6 (three pages: `/`, `/register`, `/admin`)
- Lucide React (icons)
- Plain CSS (no Tailwind, no CSS-in-JS)
- Google Sheets via Apps Script (registration backend)

---

## Color Palette (Light Mode — STRICT)
| Name       | Hex       | Usage                            |
|------------|-----------|----------------------------------|
| Navy       | `#000080` | Primary brand, headings, buttons |
| Navy Dark  | `#00005a` | Hover states, deep backgrounds   |
| Navy Light | `#1a1a9e` | Hover gradients                  |
| Tan        | `#85754D` | Section labels, accents          |
| Gold       | `#E6BE8A` | Highlights, CTA accents          |
| Gold Light | `#FFF3DA` | Card backgrounds, soft fills     |
| Cream      | `#FAF9F6` | Page background                  |
| Slate      | `#708090` | Muted text, icons                |

All colors are defined as CSS variables in `src/index.css`. Always use variables, never hardcode hex values in component CSS.

---

## Typography
- **Display / Headings:** `Cormorant Garamond` (Google Font) — serif, elegant
- **Body / UI:** `DM Sans` (Google Font) — clean sans-serif
- Both are loaded in `src/index.css` via `@import url(...)`.
- Never use Inter, Roboto, Arial, or system fonts.

---

## File Structure
```
src/
├── App.js                        # Router setup, orbital loader gate
├── index.css                     # Global styles, CSS variables, utility classes
├── index.js                      # Entry point
├── hooks/
│   └── useScrollReveal.js        # IntersectionObserver scroll animation hook
├── utils/
│   ├── data.js                   # ALL conference content (speakers, programme, FAQs, stats)
│   └── googleSheets.js           # Google Sheets fetch/submit + setup instructions
├── components/
│   ├── OrbitalLoader.jsx/.css    # 3-ring animated loading screen (shows for 2.8s on load)
│   ├── Navbar.jsx/.css           # Sticky navbar, transparent→solid on scroll, mobile drawer
│   ├── Hero.jsx/.css             # Full-screen hero, glassmorphism trust bar, entrance animations
│   ├── Countdown.jsx/.css        # Live real-time flip countdown to 30 May 2026 09:00
│   ├── Stats.jsx/.css            # Count-up animated stats bar (triggers on scroll)
│   ├── About.jsx/.css            # Core message quote + 3 pillars + Mission/Vision cards
│   ├── Speakers.jsx/.css         # 6-speaker grid, progressive blur on hover, bio slide-up
│   ├── Programme.jsx/.css        # Alternating left/right timeline with wave SVG top/bottom
│   ├── FAQ.jsx/.css              # Accordion with HelpCircle icon + ChevronDown, 8 questions
│   ├── Contact.jsx/.css          # Info panel + message form on navy background
│   └── Footer.jsx/.css           # Marquee ticker + link columns + gold CTA block
└── pages/
    ├── HomePage.jsx/.css         # Assembles all components, triggers scroll reveal
    ├── RegisterPage.jsx/.css     # Registration form with validation + Google Sheets submit
    └── AdminPage.jsx/.css        # Password-protected dashboard (password: Admin2357)
```

---

## Pages

### `/` — Home Page
Order of sections: Hero → Countdown → Stats → About → Speakers → Programme → FAQ → Contact → Footer

### `/register` — Registration Page
- Separate page with its own header (navy background)
- Form fields: Full Name, Email, Phone, Institution, Level (grouped dropdown), Referral (radio grid)
- Submits to Google Sheets via `src/utils/googleSheets.js`
- Shows inline validation errors and a success screen on submit
- Includes a left-side sticky info panel listing what to expect

### `/admin` — Admin Dashboard
- Password gate: `Admin2357`
- Shows stats cards: Total Registrations, University Students, Institutions, Capacity
- Sortable table of all registrations
- Search by name/email/institution, filter by level
- Export to CSV button
- In demo mode (before Sheets is connected) shows 5 sample rows

---

## Google Sheets Integration
File: `src/utils/googleSheets.js`

The `SHEET_URL` constant must be replaced with the deployed Google Apps Script Web App URL.
Full Apps Script code and step-by-step setup instructions are inside that file as comments.

Sheet columns (Row 1 headers): `Timestamp | Full Name | Email | Phone | Institution | Level | Referral`

---

## Animation & Interaction Rules
- Scroll reveal: CSS classes `.reveal`, `.reveal-left`, `.reveal-right` + `.visible` toggled by `useScrollRevealAll()` hook
- Delay classes: `.delay-1` through `.delay-6` (transition-delay in 0.1s steps)
- All page entries use `.page-enter` class (fade + translateY from App.js)
- Countdown updates every 1 second via `setInterval`
- Stats count up using `requestAnimationFrame` easing when scrolled into view
- Speaker cards: progressive blur overlay (4 CSS layers) + bio max-height transition on hover
- Programme items: click to expand description (max-height toggle)
- FAQ accordion: one item open at a time, ChevronDown rotates 180deg when open
- Navbar: transparent by default, gets `.navbar--scrolled` class at `scrollY > 40`

---

## Content — Speakers (6 Placeholders)
Located in `src/utils/data.js` as `SPEAKERS` array.
Each speaker has: `id, name, title, organisation, session, bio, image (null = placeholder), initials`
**To add real photos:** set `image` to a URL string or `/images/speaker-name.jpg` (place files in `public/images/`)

## Content — Conference Programme (10 items)
Located in `src/utils/data.js` as `PROGRAMME` array.
Timeline runs 8:00 AM → 5:00 PM on 30th May 2026.

## Content — FAQs (8 questions)
Located in `src/utils/data.js` as `FAQS` array.

## Content — Stats (4 items)
Located in `src/utils/data.js` as `STATS` array: 100+ Attendees, 1 Day, 8+ Speakers, 4 Sessions

---

## Assets Needed (not yet added)
- `public/images/conference-hall.jpg` — venue photo for Hero background
  (Hero has an `<img>` with `onError` fallback so it degrades gracefully if missing)
- Speaker photos → `public/images/` → update `image` field in `src/utils/data.js`

---

## Key Design Rules — DO NOT VIOLATE
1. **Light mode only.** No dark mode. Background is `#FAF9F6`.
2. **Always use CSS variables** from `src/index.css`, never hardcode colors.
3. **Fonts are Cormorant Garamond + DM Sans only.** No substitutions.
4. **No Tailwind.** No CSS frameworks. Plain CSS in co-located `.css` files.
5. **No inline styles** except where dynamic values require it (e.g. `style={{ color: variable }}`).
6. **Each component has its own CSS file** with BEM-style class names (e.g. `.hero__title`, `.navbar__link`).
7. **Scroll animations** use the `.reveal` / `.visible` class pattern — do not add framer-motion.
8. **The admin password is `Admin2357`** — stored client-side in `AdminPage.jsx`. This is intentional for a student event; do not add backend auth unless asked.
9. **Google Sheets is the only backend.** No Express, no Firebase, no Supabase unless explicitly asked.
10. **Three routes only:** `/`, `/register`, `/admin`. The Navbar does not appear on `/admin`.

---

## Running the Project
```bash
npm install
npm start        # Development server at localhost:3000
npm run build    # Production build → /build folder
```

## Deployment
The `/build` folder is a static site. Deploy to:
- **Netlify** — drag and drop the `build/` folder
- **Vercel** — `vercel --prod` from project root
- **GitHub Pages** — add `"homepage": "https://yourusername.github.io/repo"` to package.json first