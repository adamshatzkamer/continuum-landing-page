// B2: deep links (in-app ids and the anchors used by the static SEO fallback /
// llms.txt) must scroll to the matching section once the lazy page has mounted.
import { test, run, openPage, assert, BASE, DESKTOP, MOBILE } from "./harness.mjs";

const DESKTOP_LINKS = {
  "#landing-waitlist": "landing-waitlist",
  "#waitlist": "landing-waitlist",
  "#features": "landing-features",
  "#access-control": "access-control",
  "#security": "security",
  "#migration": "migration",
  "#faq": "faq",
};
const MOBILE_LINKS = {
  "#waitlist": "landing-waitlist",
  "#features": "landing-features",
  "#security": "security",
  "#faq": "faq",
};

for (const [vpName, viewport, links] of [
  ["desktop", DESKTOP, DESKTOP_LINKS],
  ["mobile", MOBILE, MOBILE_LINKS],
]) {
  for (const [hash, targetId] of Object.entries(links)) {
    test(`${vpName}: ${hash} scrolls to #${targetId}`, async (browser) => {
      const { ctx, page, pageErrors } = await openPage(browser, { viewport });
      try {
        await page.goto(`${BASE}/${hash}`);
        const ok = await page
          .waitForFunction(
            (id) => {
              const el = document.getElementById(id);
              if (!el || !document.querySelector("form input[type=email]")) return false;
              const r = el.getBoundingClientRect();
              return window.scrollY > 0 && r.top < window.innerHeight * 0.6 && r.bottom > 0;
            },
            targetId,
            { timeout: 8000 },
          )
          .then(() => true, () => false);
        const state = await page.evaluate((id) => {
          const el = document.getElementById(id);
          return { exists: !!el, top: el ? Math.round(el.getBoundingClientRect().top) : null, scrollY: window.scrollY };
        }, targetId);
        assert(pageErrors.length === 0, `page errors: ${pageErrors.join(" | ")}`);
        assert(ok, `target not scrolled into view: ${JSON.stringify(state)}`);
      } finally {
        await ctx.close();
      }
    });
  }
}

await run();
