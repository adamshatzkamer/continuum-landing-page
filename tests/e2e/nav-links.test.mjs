// B9: the desktop header nav items must be real links to the page sections.
import { test, run, openPage, assert, BASE, DESKTOP } from "./harness.mjs";

const NAV = [
  ["Waitlist", "landing-waitlist"],
  ["Features", "landing-features"],
  ["Overview", "landing-hero"],
];

test("nav items are links", async (browser) => {
  const { ctx, page } = await openPage(browser, { viewport: DESKTOP });
  try {
    await page.goto(`${BASE}/`);
    const items = page.locator("nav[aria-label='Page sections'] > *");
    await items.first().waitFor();
    const info = await items.evaluateAll((els) => els.map((e) => [e.tagName, e.textContent.trim(), e.getAttribute("href")]));
    const notLinks = info.filter(([tag, , href]) => tag !== "A" || !href);
    assert(notLinks.length === 0, `not links: ${JSON.stringify(notLinks)}`);
    const contact = info.find(([, text]) => text === "Contact");
    assert(contact && contact[2] === "mailto:info@continuityos.co.za", `Contact href: ${contact?.[2]}`);
  } finally {
    await ctx.close();
  }
});

test("nav links scroll to their sections", async (browser) => {
  const { ctx, page } = await openPage(browser, { viewport: DESKTOP });
  try {
    await page.goto(`${BASE}/`);
    await page.locator("form input[type=email]").first().waitFor();
    for (const [label, id] of NAV) {
      const link = page.locator("nav[aria-label='Page sections']").getByText(label, { exact: true });
      assert((await link.count()) === 1, `no "${label}" nav item`);
      await link.click();
      const ok = await page
        .waitForFunction(
          (tid) => {
            const r = document.getElementById(tid)?.getBoundingClientRect();
            return !!r && r.top >= -5 && r.top < window.innerHeight * 0.6;
          },
          id,
          { timeout: 5000 },
        )
        .then(() => true, () => false);
      assert(ok, `"${label}" did not bring #${id} into view (scrollY ${await page.evaluate(() => scrollY)})`);
    }
  } finally {
    await ctx.close();
  }
});

await run();
