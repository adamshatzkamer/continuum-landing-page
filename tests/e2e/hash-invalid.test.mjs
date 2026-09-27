// B1: a URL hash that is not a valid CSS selector must not crash the app.
import { test, run, openPage, assert, BASE, DESKTOP, MOBILE } from "./harness.mjs";

for (const [vpName, viewport] of [["desktop", DESKTOP], ["mobile", MOBILE]]) {
  for (const hash of ["#1", "#/", "#faq?x=1", "#%E0%A4%A"]) {
    test(`${vpName}: ${hash} still renders the page`, async (browser) => {
      const { ctx, page, pageErrors } = await openPage(browser, { viewport });
      try {
        await page.goto(`${BASE}/${hash}`);
        await page.locator("form input[type=email]").first().waitFor({ timeout: 8000 }).catch(() => {});
        await page.waitForTimeout(500);
        const forms = await page.locator("form input[type=email]").count();
        assert(pageErrors.length === 0, `page errors: ${pageErrors.join(" | ")}`);
        assert(forms > 0, "waitlist form not rendered (app unmounted)");
      } finally {
        await ctx.close();
      }
    });
  }
}


await run();
