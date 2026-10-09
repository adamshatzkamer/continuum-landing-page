# Continuum Landing Experience

<p align="center">
  <img src="public/favicon.svg" alt="Continuum logo" width="96" height="96" />
</p>

<p align="center">
  <strong>Marketing site for Continuum, built with Vite, React and Tailwind CSS.</strong><br />
  Drives waitlist signups and product awareness.
</p>

<p align="center">
  <img src="public/landing/hero-wip-center.webp" alt="Continuum landing page hero" width="720" />
</p>

## What it is

- A responsive landing page with separate desktop and mobile layouts, an animated hero and FAQ.
- A waitlist form that posts to the Continuum backend at `POST /api/v1/auth/waitlist`. The backend allows 5 requests per minute per email.
- Stack: Vite 6, React 19, Tailwind CSS 4, Radix UI, motion and TypeScript.

## Quickstart

Requires Node.js 20+.

```bash
npm install
npm run dev        # http://localhost:5175, proxies /api to http://localhost:8001
```

Before opening a PR, run `npm run lint` and `npm run build`.

## Documentation

All docs are indexed in [docs/README.md](docs/README.md). The most used:

- [Local setup](docs/developers/local-setup.md): dev server, API proxy, build and preview
- [Testing](docs/developers/testing.md): Playwright e2e suite in `tests/e2e/`
- [Environment variables](docs/operators/env-vars.md): `VITE_API_BASE_URL` and production builds
- [Contributing](CONTRIBUTING.md): branches and pre-PR checks

## License

This repository is proprietary and intended for internal Continuum use. Do not distribute it without prior approval from the Continuum legal team.

## Contact

For questions or support, contact the Continuum Web Experience team in the internal Slack channel `#continuum-web-experience`, or mention `@continuum/web` on GitHub.
