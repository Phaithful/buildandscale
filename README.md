# Build & Scale 2026

> **"Building Men Who Build Society"**
> A one-day student conference — Saturday, 30th May 2026 · Peter Mbah Law Auditorium, Godfrey Okoye University, Enugu, Nigeria.

[![Live Site](https://img.shields.io/badge/Live%20Site-buildandscale2026.vercel.app-000080?style=flat-square&logo=vercel)](https://buildandscale2026.vercel.app)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://reactjs.org)
[![License](https://img.shields.io/badge/License-MIT-85754D?style=flat-square)](LICENSE)

---

## Overview

Build & Scale 2026 is the official conference website for a one-day student event focused on entrepreneurship, leadership, and personal development. The site handles everything from public-facing event information to attendee registration, QR-code-based check-in, and a password-protected admin dashboard — all backed by Google Sheets with no traditional server required.

**Lead Convener:** Azua Suurshater Stephen · 400 Level, Godfrey Okoye University
**Instagram:** [@buildandscale.ng](https://www.instagram.com/buildandscale.ng/)

---

## Features

- **Live countdown** to the conference date
- **Registration form** with validation, duplicate email detection, and a unique QR code issued per attendee
- **Automated confirmation emails** with branded HTML template and QR entry code
- **QR verification page** — scan a badge to confirm a registration on the spot
- **Admin dashboard** — password-protected, shows live stats, sortable registration table, search/filter, CSV export, and a bulk reminder email sender
- **Scroll animations**, orbital loading screen, and magnetic button interactions
- **Fully responsive** — mobile drawer nav, stacked layouts on small screens
- **Google Sheets backend** — zero server cost, managed entirely via Apps Script

---

## Tech Stack

| Layer | Choice |
|---|---|
| UI Framework | React 18 (Create React App) |
| Routing | React Router DOM v6 |
| Animations | Framer Motion + CSS keyframes |
| Icons | Lucide React |
| Styling | Plain CSS (BEM, co-located per component) |
| Backend | Google Sheets + Google Apps Script |
| Deployment | Vercel |

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — Hero, Countdown, Stats, Speakers, Programme, FAQ, Contact, Footer |
| `/register` | Registration form → Google Sheets → confirmation email with QR code |
| `/verify?id=BS2026-XXXX` | QR scan landing page — confirms a registration live |
| `/admin` | Password-protected dashboard (password: `Admin2357`) |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/your-username/BuildAndScale2026.git
cd BuildAndScale2026
npm install
npm start
```

The dev server runs at `http://localhost:3000`.

### Build for production

```bash
npm run build
```

The `/build` folder is a static site ready to deploy anywhere.

---

## Google Sheets Setup

The registration form, confirmation emails, and admin dashboard all route through a Google Apps Script web app.

1. Create a new Google Sheet with these column headers in row 1:

   ```
   Timestamp | Full Name | Email | Phone | Institution | Level | Referral | Registration ID
   ```

2. Open **Extensions → Apps Script**, delete any existing code, and paste the full script found in `src/utils/googleSheets.js` (the block at the top of the file).

3. Click **Deploy → New deployment**
   - Type: Web app
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Authorise and grant Mail permission when prompted

4. Copy the deployment URL and paste it as `SHEET_URL` in `src/utils/googleSheets.js`:

   ```js
   export const SHEET_URL = 'https://script.google.com/macros/s/YOUR_ID/exec';
   ```

5. Redeploy after any script changes (always use **New deployment**, not *Manage deployments*).

---

## Project Structure

```
public/
├── favicon.png              # Site favicon
├── logo.png                 # Horizontal logo (used in emails)
├── Logo.svg                 # Full SVG logo (used in the UI)
└── images/
    ├── speakers/            # Speaker portrait photos
    └── sponsors/            # Sponsor logo SVGs

src/
├── App.js                   # Router + orbital loader gate
├── index.css                # CSS variables, global styles, fonts
├── hooks/
│   └── useScrollReveal.js   # IntersectionObserver scroll animation hook
├── utils/
│   ├── data.js              # All conference content (speakers, programme, FAQs, stats)
│   └── googleSheets.js      # Sheets API + full Apps Script (copy-paste ready)
├── components/
│   ├── OrbitalLoader        # 3-ring animated loading screen
│   ├── Navbar               # Sticky nav, transparent → solid on scroll, mobile drawer
│   ├── Hero                 # Full-screen hero with sponsor marquee and seat counter
│   ├── Countdown            # Live flip countdown to 30 May 2026 09:00
│   ├── Stats                # Animated count-up stats bar
│   ├── About                # Mission, vision, and three core pillars
│   ├── Speakers             # Speaker grid with bio hover reveal
│   ├── Programme            # Alternating timeline for the day's schedule
│   ├── FAQ                  # Accordion with one-open-at-a-time behaviour
│   ├── Contact              # Info panel + message form
│   └── Footer               # Marquee ticker, nav pills, social links
└── pages/
    ├── HomePage             # Assembles all home sections
    ├── RegisterPage         # Registration form + success screen with QR code
    ├── VerifyPage           # QR scan confirmation page
    └── AdminPage            # Password-gated dashboard with reminder email sender
```

---

## Content Updates

All conference content lives in `src/utils/data.js`:

- **Speakers** — update the `SPEAKERS` array; set `image` to a path under `public/images/`
- **Programme** — update the `PROGRAMME` array with times and session titles
- **FAQs** — update the `FAQS` array
- **Stats** — update the `STATS` array

---

## License

MIT © 2026 Build & Scale / Azua Suurshater Stephen
