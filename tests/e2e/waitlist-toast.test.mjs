// B14: there is no confirmation step, so the success toast must not tell people to
// "check your email to confirm"; it says they're on the list and will be emailed.
import { test, run, openPage, toastText, assert, BASE, DESKTOP, MOBILE } from "./harness.mjs";

const EXPECTED = "You're on the list — we'll email you when your spot opens.";

for (const [vpName, viewport] of [["desktop", DESKTOP], ["mobile", MOBILE]]) {
  test(`${vpName}: success toast has no confirmation step wording`, async (browser) => {
    const { ctx, page, waitlistBodies } = await openPage(browser, { viewport });
    try {
      await page.goto(`${BASE}/`);
      const form = page.locator("form:visible", { has: page.locator("input[type=email]") }).first();
      await form.waitFor();
      await form.locator("input[type=email]").fill("someone@example.com");
      await form.locator("button[type=submit]").click();
      const toast = await toastText(page);
      assert(waitlistBodies.length === 1, `expected one mocked waitlist request, got ${waitlistBodies.length}`);
      assert(toast && !/confirm/i.test(toast), `toast asks for confirmation: ${JSON.stringify(toast)}`);
      assert(toast === EXPECTED, `toast was ${JSON.stringify(toast)}`);
    } finally {
      await ctx.close();
    }
  });
}

await run();
