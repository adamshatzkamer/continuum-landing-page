// Bug-hunt probe (untracked, throwaway): real mouse double-click on the waitlist submit button.
// /auth/waitlist is intercepted; nothing reaches a real backend.
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT || "playwright");
const BASE = process.argv[2] || "http://localhost:4179";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
let hits = 0;
await page.route("**/auth/waitlist", async (r) => { hits++; await new Promise((res) => setTimeout(res, 500)); r.fulfill({ status: 200, contentType: "application/json", body: '{"message":"ok"}' }); });
await page.goto(BASE + "/");
await page.locator("form input[type=email]").first().fill("probe@example.com");
await page.locator("form button[type=submit]").first().dblclick();
await page.waitForTimeout(1500);
console.log(JSON.stringify({ dblclickRequests: hits }));
await browser.close();
