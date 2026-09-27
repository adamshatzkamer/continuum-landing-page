// B11: decorative mock-UI controls ("Stop timer", "Log Time", "Copy link") must not be
// focusable or exposed as buttons; keyboard users should only reach real controls.
import { test, run, openPage, assert, BASE, DESKTOP, MOBILE } from "./harness.mjs";

const DECORATIVE = /^(stop timer|log time|copy link)$/i;

for (const [vpName, viewport] of [["desktop", DESKTOP], ["mobile", MOBILE]]) {
  test(`${vpName}: mock controls are not buttons or tab stops`, async (browser) => {
    const { ctx, page } = await openPage(browser, { viewport });
    try {
      await page.goto(`${BASE}/`);
      await page.locator("form input[type=email]").first().waitFor();
      const buttons = await page.locator("button").evaluateAll((els) =>
        els.map((b) => (b.getAttribute("aria-label") || b.textContent || "").trim()),
      );
      const bad = buttons.filter((name) => DECORATIVE.test(name));
      assert(bad.length === 0, `decorative <button>s: ${JSON.stringify(bad)}`);

      const reached = [];
      for (let i = 0; i < 80; i++) {
        await page.keyboard.press("Tab");
        const name = await page.evaluate(() => {
          const el = document.activeElement;
          return el && el !== document.body ? (el.getAttribute("aria-label") || el.textContent || "").trim() : null;
        });
        if (name === null && i > 0) break;
        if (name) reached.push(name);
      }
      const badTab = reached.filter((name) => DECORATIVE.test(name));
      assert(badTab.length === 0, `tab reached decorative controls: ${JSON.stringify(badTab)}`);

      // still rendered as illustration
      const visible = await page.getByText("Log Time", { exact: true }).first().isVisible();
      assert(visible, "mock 'Log Time' label no longer rendered");
    } finally {
      await ctx.close();
    }
  });
}

await run();
