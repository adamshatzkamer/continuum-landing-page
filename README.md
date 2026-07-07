# Continuum Landing Page

![CI status](https://img.shields.io/badge/CI-Not_Set_Up-lightgrey)
![Vite](https://img.shields.io/badge/Vite-6.3.5-646cff?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-Private-blueviolet)

![Continuum landing hero](public/landing/hero-wip-center.webp)

## Overview

Continuum’s marketing landing page is a high-performance single-page application built to introduce prospects to the product, surface differentiating features, and capture waitlist signups. The site shares branding, messaging, and API integrations with the main Continuum platform so that leads enter the same growth funnel.

## Key Features

- **Waitlist funnel** – Submits to `POST /api/v1/auth/waitlist` with rate limiting feedback and toast notifications.
- **Responsive storytelling** – Tailored layouts for desktop and mobile, including animated hero modules and feature sections.
- **Production-ready assets** – Optimised webp imagery, structured metadata, and favicons prepared for deployment.
- **Developer ergonomics** – Modern tooling (React, Vite, Tailwind CSS, TypeScript) with strict linting for consistent contributions.

## Technology Stack

- **Framework:** React 19 with React DOM Suspense and lazy loading.
- **Tooling:** Vite 6 for local dev/build, TypeScript project references, and vite-plugin-compression.
- **Styling:** Tailwind CSS 4 with custom utilities via `clsx`, `tailwind-merge`, and shadcn UI components.
- **UI & motion:** Radix UI primitives, lucide-react icons, and motion for animation.
- **Data & APIs:** Axios-based client for the Continuum waitlist endpoint.
- **Quality:** ESLint (React hooks, refresh) to enforce code quality and consistency.

## Getting Started

### Prerequisites

- Node.js **18.x or newer** (Vite 6 requirement).
- npm **10.x or newer** (bundled with Node 20+, or install separately).

### Installation

```bash
npm install
```

### Configure Environment Variables

Copy the provided example file and adjust for your environment:

```bash
cp .env.example .env.local
```

`VITE_API_BASE_URL` must include `/api/v1` when building or running against a remote backend. Leaving it undefined during development enables the Vite proxy (`/api/v1` → `http://localhost:8001` by default). Override the proxy target with `VITE_PROXY_TARGET` when your backend runs elsewhere (e.g., Docker).

### Run the Development Server

```bash
npm run dev
```

The server starts on [http://localhost:5175](http://localhost:5175) with hot module replacement. Make sure the Continuum backend is running locally so waitlist submissions succeed.

To expose the site on your network, pass Vite flags directly: `npm run dev -- --host`.

### Build for Production

```bash
npm run build
```

Before building, ensure `VITE_API_BASE_URL` points at the production API origin, including the `/api/v1` suffix. The build output writes to `dist/`.

### Preview the Production Build

```bash
npm run preview
```

This serves the contents of `dist/` locally (defaults to port 4173) so you can validate asset integrity, animations, and API calls before deploying.

### Linting

```bash
npm run lint
```

The lint step runs ESLint with the configured React, hooks, and TypeScript rules.

## Usage Tips

- **Content updates:** Most copy and layout live in `src/pages/LandingPage.tsx` and `src/pages/LandingPageMobile.tsx`. Shared UI atoms dwell in `src/components/`.
- **Assets:** Hero imagery and marketing illustrations reside in `public/landing/`; favicons and SEO files are in `public/`.
- **Animations:** Motion-based effects are defined in components such as `src/components/ui/hover-border-gradient.tsx`.
- **Sounds:** Waitlist confirmation audio lives under `public/sounds/` and is triggered via `src/lib/playWaitlistSuccessSound.ts`.

## Deployment Checklist

- Configure production CORS to include the landing page origin so waitlist requests are accepted.
- Supply `VITE_API_BASE_URL` to the hosting provider (Vercel, Netlify, etc.).
- Cache-bust static assets if you update imagery (`npm run build` handles hashing automatically).

## Contributing

We welcome collaboration from the Continuum team:

1. Create a feature or fix branch from the latest `main` or task branch.
2. Install dependencies and run `npm run dev` to reproduce the issue or try the change.
3. Add or update tests/UI snapshots where relevant, and ensure `npm run lint` passes.
4. Open a pull request describing the change, screenshots for UI tweaks, and any required backend coordination.

## Code of Conduct

A formal code of conduct is currently being finalised for this project. Until it is published, please follow Continuum’s internal collaboration guidelines and treat teammates with respect. Direct any concerns to the project maintainers.

## License

This repository is private and proprietary to Continuum. Usage is restricted to the Continuum team and authorised partners.
