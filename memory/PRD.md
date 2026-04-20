# HumanisKind (HIK) Website — Product Requirements Document

## Original Problem Statement
Investigate the website https://humaniskind.com/ and create a significantly improved, fully functional pixel-perfect replica. Maintain the original content but feature a highly professional design. Requirements: multi-page frontend (Home, Technology, Origins, Roadmap, Manifesto, Executive Summary), dark graphite and orange color scheme, modern animations (parallax, hover effects, scroll reveals), responsive design, specific logo placement for dark/light backgrounds, multi-language support (ES, EN, PT) with a language selector.

## User / Audience
- Enterprise prospects & regulators evaluating AI-governance tooling
- Founders/technologists reviewing the Sacred Trace™ protocol
- Spanish-speaking user base (primary) with English and Portuguese audiences

## Core Requirements
| Area | Status |
| --- | --- |
| Pages: Home / Technology / Origins / Roadmap / Manifesto / Executive Summary | ✅ Done |
| Graphite (#2D2D2D, #1C1C1C) + orange (#E8761D) design system | ✅ Done |
| Parallax hero, scroll-reveal animations, hover micro-interactions | ✅ Done |
| Responsive (mobile-first, lg breakpoints) | ✅ Done |
| Correct HIK logo swap for dark/light backgrounds | ✅ Done |
| Multi-language (EN / ES / PT) with navbar switcher, browser auto-detect + `localStorage` persistence | ✅ Done |
| Backend integration (Mongo + FastAPI) replacing mock.js | ⏳ Not started (awaiting user go-ahead) |

## Architecture
```
/app
├── frontend/
│   ├── src/
│   │   ├── components/Layout.jsx    # Navbar + LanguageSwitcher + Footer
│   │   ├── i18n/
│   │   │   ├── LanguageContext.jsx  # Provider, useTranslation, browser detect
│   │   │   ├── en.js  es.js  pt.js  # Translation dictionaries
│   │   ├── pages/                   # 6 routed pages consuming useTranslation
│   │   ├── data/mock.js             # Legacy seed (kept only as editable reference)
│   │   ├── App.js                   # <LanguageProvider> wraps router
│   │   └── App.css / index.css      # Design system + animations
└── backend/
    └── server.py                    # FastAPI skeleton, not yet connected
```

## Implementation Changelog
- **2026-02 (session 1)** Initial frontend build with mock data, graphite/orange design, parallax, scroll reveals, responsive layouts, logo swapping.
- **2026-02 (session 2)** i18n integration (EN/ES/PT):
  - `LanguageContext` with browser language auto-detect, `localStorage` persistence (`hik-lang`), fallback to English.
  - Navbar & mobile menu language switcher (flag + code, full name in dropdown).
  - All 6 pages + Navbar + Footer consume `useTranslation`; no hard-coded user-facing strings remain.
  - Shipped full translations of hero, problem/solution, Trinity Protocol, Sacred Trace, roadmap phases, origins, manifesto sections, team bios, footer, and UI labels.
  - Verified by testing agent: 59/59 assertions passing (desktop + mobile).

## Translation Files (editable by user)
- `/app/frontend/src/i18n/en.js`
- `/app/frontend/src/i18n/es.js`
- `/app/frontend/src/i18n/pt.js`

## Backlog / Roadmap
### P1 — Next up (requires user approval)
- **Backend integration**: create `/app/contracts.md`, define Mongo schemas (contact form submissions, waitlist, roadmap CMS if needed), expose `/api/*` CRUD endpoints, migrate frontend away from `mock.js`/lock translations as content source.
- **Contact form**: replace `mailto:` with a backend-posted form (+ reCAPTCHA if needed).

### P2 — Refinements
- Stakeholder review of translation dictionaries (user plans to refine copy).
- Optional: decide PT variant — currently uses 🇧🇷 Brazilian flag. Switch to 🇵🇹 if the target audience is European Portuguese.
- SEO: per-language `<meta>` (title, description) + `hreflang` alternates.
- Optional: transitions between language swaps (fade) to polish switcher UX.

### P3 — Future
- CMS/admin panel for non-technical edits to roadmap phases and team bios.
- Analytics & consent banner.
- Blog / Archive page linking to `https://martinriotorto.blogspot.com/`.

## Known Limitations
- Site is still frontend-only. Contact flow is `mailto:` links.
- `mock.js` remains in the repo as reference but is no longer consumed by any page component.
