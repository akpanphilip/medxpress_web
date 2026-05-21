# MEDXPRESS — Web App (web2)

The desktop-first, animation-rich web version of MEDXPRESS. While `mobile/`
feels like a native mobile app (bottom tabs, FAB), this build is designed for
the web: a marketing landing page, sidebar dashboards, multi-column layouts,
scroll animations and image-rich sections.

Built with **Next.js 16 (App Router)**, **Tailwind CSS v4**, **Redux Toolkit**,
**Motion** (Framer Motion) for animations, and **next-themes** for light/dark
mode. Frontend only, running on mock data in `src/lib/data.ts`.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## What is inside

- **Landing page (`/`)** — animated hero with aurora gradients and floating
  cards, stat counters, feature bento grid, specialties, how-it-works,
  doctor showcase, testimonials, FAQ accordion and a CTA band.
- **Auth (`/login`, `/register`)** — split-screen layout with a brand panel,
  role selector and inline validation.
- **Patient app** — `/dashboard`, `/discover`, `/doctors/[id]` (two-column
  profile with a sticky booking card), `/booking/[id]`, `/appointments`,
  `/prescriptions`, `/profile`.
- **Consultation (`/consultation/[id]`)** — full-screen video/chat room with a
  prescription notepad.
- **Doctor workspace** — `/doctor`, `/doctor/schedule`, `/doctor/patients`,
  `/doctor/profile`.
- **Admin panel** — `/admin`, `/admin/doctors`, `/admin/users`,
  `/admin/analytics`.

Logged-in areas use a collapsible sidebar shell; the landing uses a scroll-aware
top navbar. Light and dark mode supported throughout.

## Demo accounts

The login screen has one-tap Patient / Doctor / Admin demo buttons, or sign in
with any valid email and a 6+ character password after choosing a role.

## Design tokens

Brand colours are defined in `src/app/globals.css`: Sky Blue `#38B6FF`, Medical
Red `#E84040`, Navy `#0D1B2A`, plus a Violet accent `#7C6CFF` for the richer
web visuals.
