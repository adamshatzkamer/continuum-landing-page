// B10: the FAQ section needs its own heading, not a copy of the Security section's.
import { test, run, openPage, assert, BASE, DESKTOP, MOBILE } from "./harness.mjs";

for (const [vpName, viewport] of [["desktop", DESKTOP], ["mobile", MOBILE]]) {
  test(`${vpName}: FAQ heading is its own and no H2 is duplicated`, async (browser) => {
    const { ctx, page } = await openPage(browser, { viewport });
    try {
      await page.goto(`${BASE}/`);
      const faq = page.locator("section[data-name='FAQ']");
      await faq.waitFor();
      const faqH2 = (await faq.locator("h2").first().innerText()).replace(/\s+/g, " ").trim();
      assert(/frequently asked questions/i.test(faqH2), `FAQ h2 is "${faqH2}"`);
      const h2s = await page.locator("h2").evaluateAll((els) => els.map((e) => e.textContent.replace(/\s+/g, " ").trim()));
      const dupes = h2s.filter((t, i) => t && h2s.indexOf(t) !== i);
      assert(dupes.length === 0, `duplicate h2: ${JSON.stringify(dupes)}`);
    } finally {
      await ctx.close();
    }
  });
}

await run();
