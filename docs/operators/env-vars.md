---
title: Environment variables and production build
audience: operators
status: current
owner: TBD
last_reviewed: 2026-10-09
---

# Environment variables and production build

| Variable | Used at | Purpose | Default |
| --- | --- | --- | --- |
| `VITE_API_BASE_URL` | build time | Full API base URL, **including** `/api/v1`, that the browser sends waitlist signups to. | Unset: the site calls `/api/v1` on its own origin |
| `VITE_PROXY_TARGET` | dev server only | Backend URL that the Vite dev proxy forwards `/api` to. | `http://localhost:8001` |

For local work, copy [`.env.example`](../../.env.example) to `.env.local` and adjust the values.

## Production build

`VITE_API_BASE_URL` is baked into the bundle when the site is built, so set it on the build:

```bash
VITE_API_BASE_URL=https://api.example.com/api/v1 npm run build
```

If it is unset, the site sends signups to `/api/v1` on its own domain. That only works if the host forwards `/api` to the backend. There is no warning when it is missing. The repo has no deploy config, so check the hosting environment ([#5](https://github.com/continuum-zar/continuum-landing-page/issues/5)).

The backend's `CORS_ORIGINS` must include the landing page's origin. The canonical domain is still being decided ([#6](https://github.com/continuum-zar/continuum-landing-page/issues/6)).

_Split from the root README.md on 2026-10-09._
