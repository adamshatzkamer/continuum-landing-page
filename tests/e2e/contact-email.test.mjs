// B13: every contact-email mention (rendered page, static fallback, JSON-LD, llms.txt)
// must use info@continuityos.co.za, not the old info@joincontinuum.co.za.
import { test, run, openPage, assert, BASE } from "./harness.mjs";

const OLD = "info@joincontinuum.co.za";
const NEW = "info@continuityos.co.za";

test("static index.html (fallback + JSON-LD) uses the new address", async () => {
  const html = await (await fetch(`${BASE}/`)).text();
  assert(!html.includes(OLD), `index.html still mentions ${OLD}`);
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]).join("\n");
  assert(ld.includes(`"email": "${NEW}"`), `JSON-LD has no ${NEW} email`);
});

test("llms.txt uses the new address", async () => {
  const txt = await (await fetch(`${BASE}/llms.txt`)).text();
  assert(!txt.includes(OLD), `llms.txt still mentions ${OLD}`);
  assert(txt.includes(NEW), `llms.txt has no ${NEW}`);
});

test("rendered FAQ answer uses the new address", async (browser) => {
  const { ctx, page } = await openPage(browser);
  try {
    await page.goto(`${BASE}/`);
    const q = page.getByRole("button", { name: "Is Continuum POPIA compliant?" });
    await q.waitFor();
    await q.click();
    const body = await page.evaluate(() => document.body.innerText);
    assert(!body.includes(OLD), `rendered page still mentions ${OLD}`);
    const faq = page.getByText(NEW).first();
    assert((await faq.count()) === 1, `rendered page has no ${NEW}`);
  } finally {
    await ctx.close();
  }
});

await run();
