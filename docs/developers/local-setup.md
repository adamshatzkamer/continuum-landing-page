---
title: Local setup
audience: developers
status: current
owner: TBD
last_reviewed: 2026-10-09
---

# Local setup

## Requirements

- Node.js 20+
- Access to a Continuum backend (local or remote) if you want to test waitlist submissions

## Install

```bash
npm install
```

## Start the dev server

```bash
npm run dev
```

- Vite serves the site on [http://localhost:5175](http://localhost:5175).
- The site calls the API at `VITE_API_BASE_URL` when it is set. Otherwise it calls `/api/v1` on the dev server, and the dev proxy forwards `/api` to `http://localhost:8001`. You can change that target with `VITE_PROXY_TARGET` (see `vite.config.ts`).
- Run the Continuum backend locally to test waitlist signups end to end.

Copy `.env.example` to `.env.local` to set either variable. For details, see [Environment variables](../operators/env-vars.md).

## Build and preview

```bash
npm run build     # tsc -b (type check), then vite build
npm run preview   # serve the production build locally
```

## Lint

```bash
npm run lint      # eslint .
```

Type checking runs as part of `npm run build`, not `npm run lint`.

## Tests

The repo has no unit-test runner. A Playwright regression suite lives in `tests/e2e/`. See [Testing](testing.md).

_Split from the root README.md on 2026-10-09._
