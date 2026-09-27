// Minimal Playwright regression harness (the repo has no unit-test runner).
//
// Run against a production preview build with ALL network mocked:
//   npx vite build --outDir /tmp/lp-e2e
//   npx vite preview --outDir /tmp/lp-e2e --port 4179 &
//   node tests/e2e/<name>.test.mjs
//
// Env:
//   E2E_BASE_URL  preview URL (default http://localhost:4179)
//   PLAYWRIGHT    path to a `playwright` package if it is not resolvable from here
//
// Every request to a non-local host is aborted (fonts, CDNs, analytics) and every
// /auth/waitlist request is answered by the test's mock, so nothing reaches a real
// service. Aborted external URLs are recorded in `external` for assertions.
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT || "playwright");

export const BASE = (process.env.E2E_BASE_URL || "http://localhost:4179").replace(/\/$/, "");
export const DESKTOP = { width: 1440, height: 900 };
export const MOBILE = { width: 390, height: 844 };

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]"]);

/**
 * Open a page with mocked network.
 * @param {import('playwright').Browser} browser
 * @param {{ viewport?: object, onWaitlist?: (route: any) => any }} [opts]
 */
export async function openPage(browser, { viewport = DESKTOP, onWaitlist } = {}) {
  const ctx = await browser.newContext({ viewport });
  const page = await ctx.newPage();
  const pageErrors = [];
  const waitlistBodies = [];
  const external = [];
  page.on("pageerror", (e) => pageErrors.push(String(e?.message || e)));
  await page.route("**/*", async (route) => {
    const req = route.request();
    const url = new URL(req.url());
    if (url.pathname.endsWith("/auth/waitlist")) {
      waitlistBodies.push(req.postData());
      if (onWaitlist) return onWaitlist(route);
      return route.fulfill({ status: 200, contentType: "application/json", body: '{"message":"ok"}' });
    }
    if (!LOCAL_HOSTS.has(url.hostname)) {
      external.push(req.url());
      return route.abort();
    }
    return route.continue();
  });
  return { ctx, page, pageErrors, waitlistBodies, external };
}

export async function toastText(page, timeout = 4000) {
  const t = page.locator("[data-sonner-toast]").first();
  try {
    await t.waitFor({ timeout });
    return (await t.innerText()).replace(/\s+/g, " ").trim();
  } catch {
    return null;
  }
}

export function assert(cond, message) {
  if (!cond) throw new Error(message);
}

const cases = [];
export function test(name, fn) {
  cases.push({ name, fn });
}

/** Run registered cases sequentially; exit non-zero on any failure. */
export async function run() {
  const browser = await chromium.launch();
  let failed = 0;
  for (const { name, fn } of cases) {
    try {
      await fn(browser);
      console.log(`PASS ${name}`);
    } catch (e) {
      failed++;
      console.log(`FAIL ${name}\n     ${String(e?.message || e).split("\n").join("\n     ")}`);
    }
  }
  await browser.close();
  console.log(`\n${cases.length - failed}/${cases.length} passed`);
  process.exit(failed ? 1 : 0);
}
