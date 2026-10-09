# Bug hunt - continuum-landing-page @ a6a07ec - 2026-09-26

Checks run: typecheck ✔ (`tsc -b`, 0 errors; `--noUncheckedIndexedAccess` probe: 4, all benign) · lint ✘ (`eslint .`: 3 errors, 1 warning) · tests: none exist (0/0) · build ✔ (`vite build` to a scratch outDir) · audit ✘ (16 vulns: 1 low, 5 moderate, 10 high; only `axios` ships to the browser) · e2e: none in repo, ad-hoc Playwright probes written (see below)

Skipped: semgrep (not run, would need a network install), `gh issue list` / `gh run list` (gh not authenticated).

Working tree note: `.gitignore` already had an uncommitted change (adds `.claude/`) before the hunt started. It was left alone. Nothing tracked was modified; no branch, no commits.

Hotspots (20 commits total, small repo):
1. `src/pages/LandingPage.tsx` (904 lines, 15 changes in 6 months, holds the desktop waitlist form)
2. `src/pages/LandingPageMobile.tsx` (1198 lines, 14 changes, copy-pasted mobile form)
3. `src/App.tsx` (hash/deep-link handling, layout switch)
4. `src/api/waitlist.ts` (the only network boundary)
5. `index.html` + `public/llms.txt` (crawler content, JSON-LD, 4 changes)

## Confirmed bugs

| ID | Sev | Where | What goes wrong | Evidence | Root cause | Proposed fix |
|---|---|---|---|---|---|---|
| B1 | HIGH | src/App.tsx:13 | Any URL whose hash is not a valid CSS selector (`/#1`, `/#/`, `/#faq?x=1`) renders a **blank page**. The React tree unmounts and the SEO fallback is already gone. | `browser.probe.mjs` case A: pageerror `Failed to execute 'querySelector' on 'Document': '#1' is not a valid selector.`, `#root` has 0 children, no form rendered. Same for `#/` and `#faq?x=1`. | `document.querySelector(window.location.hash)` throws inside a `useEffect`, and there is no error boundary. | Use `document.getElementById(decodeURIComponent(hash.slice(1)))` inside a try/catch (or `CSS.escape`). Optionally add a top-level error boundary. |
| B2 | MEDIUM | src/App.tsx:11-16; index.html:160-165, 173-248 | Deep links never scroll. `/#landing-waitlist` stays at the top and the hash is stripped. The anchors the crawlable fallback and its nav use (`#features`, `#waitlist`, `#faq`, `#security`, `#migration`, `#access-control`) don't exist in the React app at all. | Probe case B: `/#landing-waitlist` gives `scrollY: 0`, target exists after load, URL rewritten to `/`. `/#features` gives `scrollY: 0`, target missing. `#waitlist`/`#faq` only "scroll" because the browser jumped to the static fallback node before React replaced it, so the scroll position is arbitrary. | The effect runs on first commit, while the lazy `LandingPage` chunk is still behind `Suspense`, so the element is null. `replaceState` then drops the hash anyway. The fallback ids and the app ids were never aligned. | Run the scroll after the lazy page mounts (for example from the page's own effect, or retry on `requestAnimationFrame` until found), and only strip the hash once scrolled. Add matching ids (or map `waitlist` to `landing-waitlist`, etc.). |
| B3 | MEDIUM | src/pages/LandingPage.tsx:40 (`noValidate`), :25, :30-31; src/pages/LandingPageMobile.tsx:44, :29, :34-35 | Empty, whitespace-only and malformed emails are POSTed to the API. Every failure (422 invalid email, 429 rate limit, network) shows the same "Something went wrong. Please try again in a moment.", which tells users with a typo to retry the same bad input. | Probe case D (desktop and mobile, API mocked): `""` and `"   "` both send `{"email":""}`, and `"not-an-email"` is sent as-is. 422 and 429 both give the generic toast. | `noValidate` disables the `required`/`type=email` constraints, there is no client-side check, and the `catch {}` ignores the error status. | Drop `noValidate` or validate before submit (non-empty and email-shaped after trim). Map 422 to "Please enter a valid email address" and 429 to "Too many attempts, try again in a minute". |
| B4 | MEDIUM | src/api/waitlist.ts:6-9 | If the API hangs, the form sticks on "Sending…" with the input disabled forever. There is no timeout and no error. | `waitlist-timeout.probe.mjs`: after 20 s the button still reads `Sending…`, the input is disabled and no toast appears. | `axios.create` has no `timeout`, so the promise never settles. | Add `timeout: 10000` (or an AbortController) so it falls into the existing error path. |
| B5 | MEDIUM | src/styles/fonts.css:9-44 vs every `font-['Satoshi:Bold' / 'Satoshi:Medium' / 'Satoshi:Regular' / 'Sathu:Regular',sans-serif]` class (e.g. src/components/PrimaryButton.tsx:36, src/components/FaqSection.tsx:144) | The brand font Satoshi never renders anywhere. Text falls back to generic `sans-serif`, and "Bold" labels render at weight 400. | `browser.probe.mjs` F/G: all four `Satoshi` faces report `unloaded` (never requested). The mobile CTA computes `font-family: "Satoshi:Bold", sans-serif; font-weight: 400`. | The Figma-export family names (`Satoshi:Bold`) don't match the `@font-face` family `Satoshi`. The weight is encoded in the name, not in `font-weight`. | Replace with `font-['Satoshi',sans-serif] font-bold/medium/normal` (or define Tailwind utilities). There is no `Sathu` face at all. |
| B6 | MEDIUM | src/components/FaqSection.tsx:60-65, :176 | The whole "Scaleability & Pricing" FAQ tab is dead. Its 4 questions have no answers, so clicking one sets `aria-expanded="true"` but reveals nothing. That's misleading for screen readers and looks broken. | Probe case H: after the click, `aria-expanded: "true"` and no answer node follows the button. | The data entries have `question` only, and the render hides the panel when `answer` is falsy while the button stays interactive. | Write the answers, or hide the tab/questions until they exist (or render "Pricing will be announced at launch"). |
| B7 | MEDIUM | src/components/FaqSection.tsx:20, :30, :85; src/components/AccessControlSection.tsx:183; index.html:126 (FAQPage JSON-LD), :194; public/llms.txt:11 | Public product claims about roles contradict each other and the backend: "Admin, Project Manager, Developer, View Only, and Contractor" vs "Admin, Project Manager, Developer, Client…" vs "Three roles" vs "three core roles… Admins, Members, Continuum AI". The backend packaged defaults are Owner/PM/Developer/Client/View Only (+Finance/Sales/Marketing), and Contractor is explicitly no longer a default (continuum-backend/backend/app/rbac/catalog.py:777-851). | Cross-reading the sources listed. The wrong claim also ships in structured data and `llms.txt`, so search and AI answer engines repeat it. | Copy drifted from the RBAC model. | Pick one accurate description and use it in the FAQ, the AccessControl body, the JSON-LD, the fallback HTML and llms.txt. |
| B8 | MEDIUM | src/components/FaqSection.tsx:20; src/pages/LandingPage.tsx:37-69 (form), :851-866 (nav) | The page collects email addresses and says "Our Privacy Policy explains…", but no Privacy Policy or contact link exists anywhere in the rendered app (the email address only appears inside FAQ text). That's a POPIA-notice gap at the point of collection. | `grep -rn -i "privacy\|mailto" src` shows only the FAQ sentence. The rendered nav "Contact" is a non-link `<span>` (probe F/G: `SPAN Contact href=null`). | Dead reference; no policy page or route exists. | Add a privacy policy page/link next to the waitlist form and footer, plus a `mailto:` contact link. |
| B9 | LOW | src/pages/LandingPage.tsx:851-866 | The desktop header nav (Overview / Waitlist / Features / Contact) looks like navigation but is plain `<span>`s wired to nothing. Mobile has no nav at all. | Probe F/G `navItems`: all `SPAN … href=null`. | Static Figma export never wired up. | Make them `<a href="#landing-…">` (needs B2 fixed) or remove them. |
| B10 | LOW | src/components/FaqSection.tsx:116-127 | The FAQ section has no FAQ heading. It repeats the Security section's label, H2 and body word for word, so the page has two identical H2s ("Built for teams that can't afford to get security wrong."). | Probe F/G `headings`: that H2 appears twice. | Copy-paste from SecuritySection.tsx:72-83. | Give FAQ its own label/heading ("Frequently asked questions"). |
| B11 | LOW | src/pages/LandingPage.tsx:528, :640; src/pages/LandingPageMobile.tsx:424, :674; src/components/AccessControlSection.tsx:114 | Decorative mock-UI controls ("Stop timer", "Log Time", "Copy link") are real, focusable `<button>`s with a pointer cursor (global rule in src/index.css:17) that do nothing. Keyboard and screen-reader users land on dead controls. | Static: no `onClick`. They're reachable by Tab and announced as buttons. | Figma export uses `<button>` for illustration. | Render as `<div aria-hidden>` / add `tabIndex={-1}` + `aria-hidden`, or wrap the mock in `inert`. |
| B12 | LOW | src/components/SecuritySection.tsx:82, src/components/FaqSection.tsx:127, src/components/MigrationSection.tsx:161 (stray `”` mid-sentence: `manages your data” so…`, `configuration tax” your…`); src/components/FaqSection.tsx:9 (`Scaleability`); src/pages/LandingPage.tsx:380 (`invoicing-but`) | Visible typos in body copy. | Static read. | A smart-quote was used where an em dash was meant. | Replace with `—` and fix the spellings. |

## Suspicious, unverified

| ID | Where | Why it looks wrong | How to verify |
|---|---|---|---|
| S1 | continuum-backend/backend/app/api/v1/routes/auth.py:218-230 (cross-repo) | `join_waitlist` only queues a confirmation email. It doesn't persist the address anywhere, so signups exist only in the email provider's logs. The landing toast also says "check your email to confirm" but there's no confirm step. | Check whether anything records waitlist emails (admin_waitlist.py only has `/send-invite`). Submit to a local backend with the email sender stubbed and inspect the DB. |
| S2 | src/api/waitlist.ts:4; dist/assets/FaqSection-*.js | The local `dist/` (Jul 3) was built with `baseURL:"/api/v1"`, meaning `VITE_API_BASE_URL` was unset. If a build like that is deployed on a static host with no `/api` proxy, every signup fails with the generic error. There's no deploy config in the repo to confirm either way. | Check the hosting env for `VITE_API_BASE_URL`, or do a harmless `OPTIONS`/`GET` to `https://joincontinuum.co.za/api/v1/auth/waitlist` and see whether it returns the SPA HTML or a 405 (not done here, to avoid touching production). |
| S3 | index.html:20 vs continuum-backend/backend/app/utils/email_service.py:182 | Two domains: the landing canonical is `joincontinuum.co.za`, while the default invite sign-up URL is `continuumapp.co.za`. | Confirm which domains are live. Check CORS_ORIGINS includes the landing origin. |
| S4 | src/App.tsx:23-31 | Crossing the 768px breakpoint (rotation, resize) swaps the whole page tree, which drops a typed email and FAQ state. | Type an email, resize past 768px, and see whether the input clears. |
| S5 | index.html:32, :42 | `og:image`/`twitter:image` are `.webp`. Some link-preview scrapers still ignore WebP. | Run the URL through the LinkedIn Post Inspector / Facebook Sharing Debugger. |
| S6 | package.json:16 | `shadcn` (a CLI) is a runtime dependency. It accounts for most of the 16 `npm audit` findings (hono, undici, ip-address…), none of which ship to the browser. `axios` (direct, high) does ship, but its advisories are Node-side (NO_PROXY/SSRF, form-data). | Move `shadcn` to devDependencies and bump axios, then re-run `npm audit --omit=dev`. |
| S7 | src/components/ui/hover-border-gradient.tsx:51-58 | The effect ignores `duration`/`clockwise` changes (exhaustive-deps warning). That's harmless today because callers pass constants. | Only matters if these props become dynamic. |

## Check failures that are not bugs

- `eslint .` fails, which blocks any CI that runs `npm run lint`:
  - `react-hooks/set-state-in-effect` at src/hooks/useInView.ts:35 and src/hooks/useScrollProgress.ts:39. This is a one-shot reduced-motion shortcut and the behaviour is correct, but the rule flags it.
  - `react-refresh/only-export-components` at src/components/InvoiceCardCarousel.tsx:160 (dev HMR only).
  - `react-hooks/exhaustive-deps` warning at hover-border-gradient.tsx:58 (see S7).
- The `--noUncheckedIndexedAccess` probe (reverted, command-line flag only) found 4 hits: IO callback `entry`/`e` possibly undefined, and `directions[nextIndex]`. All are safe in practice.
- `npm audit`: see S6. The dev-only chain (vite/postcss/babel/etc.) doesn't affect the shipped site.
- Double submit: rapid `requestSubmit()` twice in one tick sends 2 requests, but a real mouse double-click sends 1 (`waitlist-dblclick.probe.mjs`). The disabled state is enough for real users, so this is not a bug.
- No secrets in client code or in git history (only `.env.example` was ever committed). The built bundle contains no keys.
- No broken asset requests (probe F/G: 0 failed requests, 0 page errors on normal load). No horizontal overflow at 1440px or 390px. All `<img>` have `alt`, and all buttons have an accessible name.

## Flows traced (hop list per flow)

1. **Waitlist signup**: `<input type=email>` (LandingPage.tsx:50 / LandingPageMobile.tsx:54) → `handleSubmit` trims (LandingPage.tsx:21-34) → `postWaitlistSignup` (api/waitlist.ts:10-13, baseURL from `VITE_API_BASE_URL` at build time, :4) → dev proxy `/api` to `VITE_PROXY_TARGET` (vite.config.ts:31-36) → backend `POST /api/v1/auth/waitlist` (`EmailStr` → 422; per-email 5/min → 429; 200 queues email only, see S1) → sonner toast + sound (lib/playWaitlistSuccessSound.ts). Bugs: B3, B4, S1, S2.
2. **Deep link / hash**: URL hash → App.tsx:11-17 `querySelector` → `scrollIntoView` → `replaceState`. Bugs: B1, B2.
3. **CTA scroll**: every "Join Waitlist" / "Start building" button → lib/scrollToWaitlist.ts:3 → `#landing-waitlist` (exists on both layouts). OK.
4. **Crawler/AEO content**: index.html static fallback + 4 JSON-LD blocks, robots.txt, sitemap.xml, llms.txt. Bugs: B2 (anchors), B7 (role claims).
5. **Config/env**: `.env.example` → `VITE_API_BASE_URL` (build-time, no runtime guard or warning when unset in prod). See S2.

## Probe files (untracked, kept)

- `bug-hunt-probes/browser.probe.mjs`: hash crash, deep links, form validation/error mapping (API mocked), fonts, a11y, failed requests, FAQ pricing tab.
- `bug-hunt-probes/waitlist-timeout.probe.mjs`: hung API and same-tick double submit.
- `bug-hunt-probes/waitlist-dblclick.probe.mjs`: real mouse double-click.

Run against a preview build: `npx vite build --outDir /tmp/lp && npx vite preview --outDir /tmp/lp --port 4179 &` then `PLAYWRIGHT=~/.npm/_npx/e41f203b7505f1fb/node_modules/playwright node bug-hunt-probes/<file>`. Every `/auth/waitlist` request is intercepted and mocked, and no real form is submitted.

## Next step

Pick which bugs to fix. Suggested default: B1–B6 (small, local changes). B7/B8 need copy/legal decisions.
