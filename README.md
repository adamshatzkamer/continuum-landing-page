# Continuum Landing Experience

<p align="center">
  <img src="public/favicon.svg" alt="Continuum logo" width="96" height="96" />
</p>

<p align="center">
  <strong>Delightful marketing site built with Vite, React, and Tailwind CSS.</strong><br />
  Drive waitlist signups and product awareness with a polished, performant landing page.
</p>

<p align="center">
  <a href="https://img.shields.io/badge/build-internal%E2%80%94vite-blue?logo=githubactions&logoColor=white"><img src="https://img.shields.io/badge/build-internal%E2%80%94vite-blue?logo=githubactions&logoColor=white" alt="Build status" /></a>
  <a href="https://img.shields.io/badge/license-proprietary-orange"><img src="https://img.shields.io/badge/license-proprietary-orange" alt="License: Proprietary" /></a>
  <a href="https://img.shields.io/badge/stack-react%20%2B%20tailwind-111827?logo=react"><img src="https://img.shields.io/badge/stack-react%20%2B%20tailwind-111827?logo=react" alt="Stack: React + Tailwind" /></a>
</p>

<p align="center">
  <img src="public/landing/hero-wip-center.webp" alt="Continuum landing page hero" width="720" />
</p>

---

## 📚 Table of Contents

- [✨ Features](#features)
- [🛠️ Installation](#installation)
- [▶️ Usage](#usage)
- [🧪 Development Workflow](#development-workflow)
- [⚙️ Environment Variables](#environment-variables)
- [🤝 Contributing](#contributing)
- [📄 License](#license)
- [📬 Contact](#contact)

---

<a id="features"></a>

## ✨ Features

- **Optimized landing experience** with animated hero, dynamic content, and responsive layouts tuned for desktop and mobile.
- **Waitlist form** connected to the core Continuum backend via `POST /api/v1/auth/waitlist` with built-in rate limiting (5 requests per minute per email).
- **Modern tooling**: Vite 6, React 19, Tailwind CSS 4, Radix UI, and motion-powered micro-interactions.
- **Production-ready pipeline** featuring TypeScript, ESLint, and compression-ready builds.

<a id="installation"></a>

## 🛠️ Installation

```bash
npm install
```

Requirements:

- Node.js 20+
- Access to the Continuum backend (local or remote) for waitlist submissions

<a id="usage"></a>

## ▶️ Usage

### Start the dev server

```bash
npm run dev
```

- Vite serves the site on [http://localhost:5175](http://localhost:5175).
- The dev proxy uses `VITE_API_BASE_URL` when set, otherwise it forwards `/api/v1` requests to `http://localhost:8001` (override with `VITE_PROXY_TARGET`).
- Run the Continuum backend locally to validate waitlist signups during development.

### Build & preview production output

```bash
npm run build
npm run preview
```

Set `VITE_API_BASE_URL` to your public API base **including** `/api/v1`, for example:

```bash
VITE_API_BASE_URL=https://api.example.com/api/v1 npm run build
```

<a id="development-workflow"></a>

## 🧪 Development Workflow

- `npm run lint` – static analysis via ESLint and TypeScript.
- `npm run build` – generates optimized assets with esbuild + Rollup and verifies type safety.
- Commit messages follow the Continuum conventions (see internal docs) and CI enforces quality gates.

<a id="environment-variables"></a>

## ⚙️ Environment Variables

| Variable | Purpose | Default |
| --- | --- | --- |
| `VITE_API_BASE_URL` | Full API base path including `/api/v1` used by the build. | Unset (uses dev proxy) |
| `VITE_PROXY_TARGET` | Backend URL for the dev proxy. | `http://localhost:8001` |

Copy `.env.example` to `.env.local`, then adjust values for your environment.

<a id="contributing"></a>

## 🤝 Contributing

- Create a feature branch from `main` (naming convention: `continuum/feature-<slug>`).
- Keep pull requests focused on one improvement with clear context and screenshots for UI changes.
- Run `npm run lint` and `npm run build` before opening a PR.
- Request review from the Web Experience maintainers and address all automated checks.

<a id="license"></a>

## 📄 License

This repository is proprietary and intended for internal Continuum use. Do not distribute without prior approval from the Continuum legal team.

<a id="contact"></a>

## 📬 Contact

For questions or support, reach out to the Continuum Web Experience team via the internal Slack channel `#continuum-web-experience` or mention `@continuum/web` in GitHub.

---

<p align="center">
  Built with ❤️ by the Continuum Web Experience team.
</p>
