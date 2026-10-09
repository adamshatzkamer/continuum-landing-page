// Bug-hunt probe (untracked, throwaway). Drives the built site in headless Chromium.
// All /auth/waitlist calls are intercepted and mocked; no request reaches a real backend,
// and any non-GET request to a non-local host is aborted.
//
// Usage:
//   npx vite build --outDir /tmp/lp-build && npx vite preview --outDir /tmp/lp-build --port 4179 &
//   PLAYWRIGHT=<path to playwright pkg> node bug-hunt-probes/browser.probe.mjs [baseUrl]
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT || "playwright");

const BASE = process.argv[2] || "http://localhost:4179";
const results = {};

async function newPage(browser, viewport, onWaitlist) {
  const ctx = await browser.newContext({ viewport });
  const page = await ctx.newPage();
  const errors = [];
  const bad = [];
  const waitlistBodies = [];
  page.on("pageerror", (e) => errors.push(String(e.message || e)));
  page.on("response", (r) => {
    if (r.status() >= 400 && !r.url().includes("/auth/waitlist")) bad.push(`${r.status()} ${r.url()}`);
  });
  await page.route("**/*", async (route) => {
    const req = route.request();
    const url = new URL(req.url());
    if (url.pathname.endsWith("/auth/waitlist")) {
      waitlistBodies.push(req.postData());
      return onWaitlist ? onWaitlist(route) : route.fulfill({ status: 200, contentType: "application/json", body: '{"message":"ok"}' });
    }
    if (req.method() !== "GET" && !["localhost", "127.0.0.1"].includes(url.hostname)) return route.abort();
    return route.continue();
  });
  return { ctx, page, errors, bad, waitlistBodies };
}

async function toastText(page) {
  const t = page.locator("[data-sonner-toast]").first();
  try {
    await t.waitFor({ timeout: 4000 });
    return (await t.innerText()).replace(/\s+/g, " ").trim();
  } catch {
    return null;
  }
}

const browser = await chromium.launch();
const desktop = { width: 1440, height: 900 };
const mobile = { width: 390, height: 844 };

// A. Hash values that are not valid CSS selectors
for (const hash of ["#1", "#/", "#faq?x=1"]) {
  const { ctx, page, errors } = await newPage(browser, desktop);
  await page.goto(BASE + "/" + hash);
  await page.waitForTimeout(2500);
  const rootChildren = await page.evaluate(() => document.getElementById("root")?.children.length ?? -1);
  const hasForm = await page.locator("form input[type=email]").count();
  results[`A hash ${hash}`] = { pageErrors: errors, rootChildren, waitlistFormRendered: hasForm > 0 };
  await ctx.close();
}

// B. Deep link to a real in-app anchor + anchors used by the SEO fallback / llms content
for (const hash of ["#landing-waitlist", "#waitlist", "#features", "#faq"]) {
  const { ctx, page } = await newPage(browser, desktop);
  await page.goto(BASE + "/" + hash);
  await page.waitForTimeout(3000);
  const r = await page.evaluate((h) => ({
    scrollY: window.scrollY,
    targetExists: !!document.getElementById(h.slice(1)),
    urlAfter: location.href,
  }), hash);
  results[`B deeplink ${hash}`] = r;
  await ctx.close();
}

// D. Waitlist form behaviour (desktop + mobile)
const scenarios = [
  { name: "empty email", input: "", status: 422, body: '{"detail":[{"msg":"value is not a valid email address"}]}' },
  { name: "whitespace email", input: "   ", status: 422, body: '{"detail":[{"msg":"value is not a valid email address"}]}' },
  { name: "invalid email", input: "not-an-email", status: 422, body: '{"detail":[{"msg":"value is not a valid email address"}]}' },
  { name: "rate limited", input: "probe@example.com", status: 429, body: '{"detail":"Rate limit exceeded"}' },
  { name: "success", input: "probe@example.com", status: 200, body: '{"message":"Thanks — check your inbox."}' },
];
for (const [vpName, vp] of [["desktop", desktop], ["mobile", mobile]]) {
  for (const s of scenarios) {
    const { ctx, page, waitlistBodies, errors } = await newPage(browser, vp, (route) =>
      route.fulfill({ status: s.status, contentType: "application/json", body: s.body }),
    );
    await page.goto(BASE + "/");
    const input = page.locator("form input[type=email]").first();
    await input.waitFor();
    await input.fill(s.input);
    await input.press("Enter");
    const toast = await toastText(page);
    results[`D ${vpName} ${s.name}`] = { requestsSent: waitlistBodies, toast, pageErrors: errors };
    await ctx.close();
  }
}

// F/G. Fonts, a11y, broken assets, overflow
for (const [vpName, vp] of [["desktop", desktop], ["mobile", mobile]]) {
  const { ctx, page, bad, errors } = await newPage(browser, vp);
  await page.goto(BASE + "/");
  await page.waitForTimeout(2500);
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
  });
  await page.waitForTimeout(1500);
  const info = await page.evaluate(async () => {
    await document.fonts.ready;
    const btn = [...document.querySelectorAll("button")].find((b) => /Join Waitlist/.test(b.textContent || ""));
    const faceStatus = [...document.fonts].map((f) => `${f.family} ${f.weight} ${f.status}`);
    const inner = btn?.querySelector("div") || btn;
    const noName = [...document.querySelectorAll("button, a[href], [role=button]")].filter((el) => {
      const name = (el.getAttribute("aria-label") || el.textContent || "").trim();
      const labelled = el.getAttribute("aria-labelledby");
      return !name && !labelled && !el.querySelector("img[alt]:not([alt=''])");
    }).map((el) => el.outerHTML.slice(0, 120));
    const imgsNoAlt = [...document.querySelectorAll("img")].filter((i) => !i.hasAttribute("alt")).map((i) => i.src);
    const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => h.tagName + ":" + (h.textContent || "").trim().slice(0, 40));
    const navItems = [...document.querySelectorAll("nav[aria-label='Page sections'] > *")].map((n) => `${n.tagName} ${n.textContent.trim()} href=${n.getAttribute("href")}`);
    const ids = [...document.querySelectorAll("[id]")].map((e) => e.id).filter((id) => id.startsWith("landing") || ["waitlist", "features", "faq", "security", "migration", "access-control"].includes(id));
    return {
      joinButtonFontFamily: inner ? getComputedStyle(inner).fontFamily : null,
      joinButtonFontWeight: inner ? getComputedStyle(inner).fontWeight : null,
      satoshiUsedByAnyElement: document.fonts.check("14px Satoshi") && faceStatus.some((f) => f.startsWith("Satoshi") && f.endsWith("loaded")),
      faceStatus,
      buttonsWithoutName: noName,
      imgsWithoutAlt: imgsNoAlt,
      headings,
      navItems,
      anchorIds: ids,
      horizontalOverflow: document.documentElement.scrollWidth - window.innerWidth,
    };
  });
  results[`F/G ${vpName}`] = { ...info, failedRequests: bad, pageErrors: errors };
  await ctx.close();
}

// H. FAQ "Scaleability & Pricing" tab: do the questions have answers?
{
  const { ctx, page } = await newPage(browser, desktop);
  await page.goto(BASE + "/");
  const tab = page.getByRole("button", { name: /Scaleability & Pricing/ });
  await tab.scrollIntoViewIfNeeded();
  await tab.click();
  const q = page.getByRole("button", { name: "How does Continuum pricing work?" });
  await q.click();
  await page.waitForTimeout(300);
  const r = await q.evaluate((b) => ({
    ariaExpanded: b.getAttribute("aria-expanded"),
    answerNodeAfterButton: b.nextElementSibling ? b.nextElementSibling.textContent : null,
  }));
  results["H faq pricing tab"] = r;
  await ctx.close();
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
