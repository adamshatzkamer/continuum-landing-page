// B6: every FAQ question that is shown must reveal an answer when expanded.
// (Questions without answer copy are hidden until copy exists.)
import { test, run, openPage, assert, BASE, DESKTOP, MOBILE } from "./harness.mjs";

for (const [vpName, viewport] of [["desktop", DESKTOP], ["mobile", MOBILE]]) {
  test(`${vpName}: every visible FAQ question has an answer`, async (browser) => {
    const { ctx, page } = await openPage(browser, { viewport });
    try {
      await page.goto(`${BASE}/`);
      const faq = page.locator("section[data-name='FAQ']");
      await faq.waitFor();
      const tabs = faq.locator("button:not([aria-expanded])");
      const tabCount = await tabs.count();
      assert(tabCount > 0, "no FAQ tabs");
      const missing = [];
      for (let t = 0; t < tabCount; t++) {
        const tab = tabs.nth(t);
        await tab.scrollIntoViewIfNeeded();
        await tab.click();
        const questions = faq.locator("button[aria-expanded]");
        const qCount = await questions.count();
        if (qCount === 0) missing.push(`tab "${(await tab.innerText()).trim()}" has no questions`);
        for (let q = 0; q < qCount; q++) {
          const btn = questions.nth(q);
          await btn.click();
          const answer = await btn.evaluate((b) => b.nextElementSibling?.textContent?.trim() || "");
          if (!answer) missing.push(`"${(await btn.innerText()).trim()}"`);
          await btn.click();
        }
      }
      assert(missing.length === 0, `no answer for: ${missing.join(", ")}`);
    } finally {
      await ctx.close();
    }
  });
}

await run();
