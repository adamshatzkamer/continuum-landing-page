// B12: visible copy must not contain stray closing smart quotes used as dashes
// ("your data” so"), "Scaleability", or "invoicing-but".
import { test, run, openPage, assert, BASE, DESKTOP, MOBILE } from "./harness.mjs";

const TYPOS = [/\w” \w/, /Scaleability/i, /invoicing-but/];

for (const [vpName, viewport] of [["desktop", DESKTOP], ["mobile", MOBILE]]) {
  test(`${vpName}: no known typos in rendered copy`, async (browser) => {
    const { ctx, page } = await openPage(browser, { viewport });
    try {
      await page.goto(`${BASE}/`);
      await page.locator("section[data-name='FAQ']").waitFor();
      const text = await page.evaluate(() => document.body.textContent || "");
      const hits = TYPOS.flatMap((re) => {
        const m = text.match(new RegExp(`.{0,30}(?:${re.source}).{0,20}`, re.flags.replace("g", "") + "g"));
        return m || [];
      });
      assert(hits.length === 0, `typos: ${JSON.stringify(hits)}`);
    } finally {
      await ctx.close();
    }
  });
}

await run();
