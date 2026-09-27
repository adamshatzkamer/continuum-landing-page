// B4: a hung waitlist request must time out and release the form.
import { test, run, openPage, toastText, assert, BASE, DESKTOP } from "./harness.mjs";

test("hung API times out, shows an error and re-enables the form", async (browser) => {
  const { ctx, page } = await openPage(browser, {
    viewport: DESKTOP,
    onWaitlist: () => {
      /* never fulfilled: simulates a backend that hangs */
    },
  });
  try {
    await page.goto(`${BASE}/`);
    const input = page.locator("form input[type=email]").first();
    await input.fill("probe@example.com");
    await input.press("Enter");
    const toast = await toastText(page, 15000);
    const label = (await page.locator("form button[type=submit]").first().innerText()).trim();
    assert(toast !== null, "no error toast within 15 s");
    assert(!(await input.isDisabled()), "input still disabled");
    assert(label !== "Sending…", `button still reads ${label}`);
  } finally {
    await ctx.close();
  }
});

await run();
