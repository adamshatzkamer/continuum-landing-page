// Bug-hunt probe (untracked, throwaway): waitlist form when the API hangs, and double submit.
// /auth/waitlist is intercepted; nothing reaches a real backend.
// Usage: PLAYWRIGHT=<path to playwright pkg> node bug-hunt-probes/waitlist-timeout.probe.mjs [baseUrl]
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT || "playwright");
const BASE = process.argv[2] || "http://localhost:4179";

const browser = await chromium.launch();
const out = {};

// 1. API never answers
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.route("**/auth/waitlist", () => { /* never fulfil: simulates a hung backend */ });
  await page.goto(BASE + "/");
  const input = page.locator("form input[type=email]").first();
  await input.fill("probe@example.com");
  await input.press("Enter");
  await page.waitForTimeout(20000);
  out.hungBackendAfter20s = {
    submitLabel: (await page.locator("form button[type=submit]").first().innerText()).trim(),
    inputDisabled: await input.isDisabled(),
    anyToast: await page.locator("[data-sonner-toast]").count(),
  };
  await page.close();
}

// 2. Two submits in the same tick
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  let hits = 0;
  await page.route("**/auth/waitlist", async (r) => { hits++; await new Promise((res) => setTimeout(res, 500)); r.fulfill({ status: 200, contentType: "application/json", body: '{"message":"ok"}' }); });
  await page.goto(BASE + "/");
  const input = page.locator("form input[type=email]").first();
  await input.fill("probe@example.com");
  await page.evaluate(() => { const f = document.querySelector("form"); f.requestSubmit(); f.requestSubmit(); });
  await page.waitForTimeout(1500);
  out.doubleSubmitSameTick = { requests: hits };
  await page.close();
}

await browser.close();
console.log(JSON.stringify(out, null, 2));
