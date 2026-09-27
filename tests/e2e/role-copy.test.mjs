// B7: public role claims (rendered FAQ + access-control copy, FAQPage JSON-LD, the
// crawlable fallback in index.html, llms.txt) must match the backend's packaged
// project roles: Owner, Project Manager, Developer, Client, View Only, Finance,
// Sales, Marketing. No "Contractor", no per-project "Admin", no "three roles".
import { test, run, openPage, assert, BASE, DESKTOP } from "./harness.mjs";

const FULL_LIST = /Owner, Project Manager, Developer, Client, View Only, Finance, Sales,? (and )?Marketing/;
const WRONG = [/Contractor/, /\bAdmins?\b/, /three (core )?roles/i];

function check(label, text, { needsFullList }) {
  const bad = WRONG.filter((re) => re.test(text)).map(String);
  assert(bad.length === 0, `${label} still contains ${bad.join(", ")}`);
  if (needsFullList) assert(FULL_LIST.test(text), `${label} lacks the packaged role list`);
}

test("index.html JSON-LD and crawlable fallback", async (browser) => {
  const { ctx, page } = await openPage(browser, { viewport: DESKTOP });
  try {
    const html = await (await page.request.get(`${BASE}/`)).text();
    const ldBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
    const faqLd = ldBlocks.find((b) => b.includes('"FAQPage"'));
    assert(faqLd, "FAQPage JSON-LD missing");
    check("FAQPage JSON-LD", faqLd, { needsFullList: true });
    const fallback = html.slice(html.indexOf('<div id="seo-fallback"'));
    check("static fallback", fallback.replace(/<[^>]+>/g, "").replace(/\s+/g, " "), { needsFullList: true });
  } finally {
    await ctx.close();
  }
});

test("llms.txt", async (browser) => {
  const { ctx, page } = await openPage(browser, { viewport: DESKTOP });
  try {
    const txt = await (await page.request.get(`${BASE}/llms.txt`)).text();
    check("llms.txt", txt, { needsFullList: true });
  } finally {
    await ctx.close();
  }
});

test("rendered access-control section and FAQ answers", async (browser) => {
  const { ctx, page } = await openPage(browser, { viewport: DESKTOP });
  try {
    await page.goto(`${BASE}/`);
    const access = page.locator("section[data-name='Access control']");
    await access.waitFor();
    check("access-control section", await access.innerText(), { needsFullList: false });

    const faq = page.locator("section[data-name='FAQ']");
    const answers = [];
    const tabs = faq.locator("button:not([aria-expanded])");
    for (let t = 0; t < (await tabs.count()); t++) {
      await tabs.nth(t).click();
      const qs = faq.locator("button[aria-expanded]");
      for (let q = 0; q < (await qs.count()); q++) {
        await qs.nth(q).click();
        answers.push(await qs.nth(q).evaluate((b) => b.nextElementSibling?.textContent || ""));
      }
    }
    const all = answers.join("\n");
    check("FAQ answers", all, { needsFullList: true });
  } finally {
    await ctx.close();
  }
});

await run();
