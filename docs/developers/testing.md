---
title: Testing
audience: developers
status: current
owner: TBD
last_reviewed: 2026-10-09
---

# Testing

The repo has no unit-test runner and no `npm test` script. Regression coverage is a small Playwright suite in `tests/e2e/`, one file per fixed bug (for example, `hash-invalid.test.mjs` covers B1). The shared setup is in [`tests/e2e/harness.mjs`](../../tests/e2e/harness.mjs).

## Run the e2e tests

Build the site, preview it on port 4179, then run a test file:

```bash
npx vite build --outDir /tmp/lp-e2e
npx vite preview --outDir /tmp/lp-e2e --port 4179 &
node tests/e2e/<name>.test.mjs
```

Environment variables:

| Variable | Purpose | Default |
| --- | --- | --- |
| `E2E_BASE_URL` | URL of the preview server | `http://localhost:4179` |
| `PLAYWRIGHT` | Path to a `playwright` package, if it can't be resolved from the repo | `playwright` |

Playwright is not in `package.json`, so you may need to install it yourself or point `PLAYWRIGHT` at an existing copy.

## What is mocked

The harness blocks every request to a host other than localhost (fonts, CDNs, analytics). Each test supplies its own response for `/auth/waitlist` requests, so tests never reach a real service.

## Bug hunt probes

`bug-hunt-probes/` holds the ad-hoc Playwright scripts used for the 2026-09-26 bug hunt. They are run the same way. See the [archived report](../archive/report-bug-hunt.md).

_Based on the header comment in tests/e2e/harness.mjs, 2026-10-09._
