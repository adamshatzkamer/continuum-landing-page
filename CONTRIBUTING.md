# Contributing

This describes how changes are made in this repo today.

## Branches

- `main` is the default branch on GitHub.
- `QA` is the integration branch. Recent fixes were made on `fix/<id>-<slug>` branches (for example `fix/B4-waitlist-request-timeout`) and merged into `QA`.

## Before you open a pull request

The repo has no CI, so run these checks yourself:

```bash
npm run lint
npm run build
```

If your change affects behaviour covered by `tests/e2e/`, run the relevant tests too. See [Testing](docs/developers/testing.md).

Keep each pull request focused on one change, and include screenshots for UI changes.

## Docs

Docs live in [`docs/`](docs/README.md), with one folder per audience. Add new docs to the index in `docs/README.md`.
