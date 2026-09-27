// B5: every Satoshi family referenced by the Figma-export classes
// (font-['Satoshi:Bold' | 'Satoshi:Medium' | 'Satoshi:Regular', sans-serif]) must resolve
// to a declared @font-face that the browser actually requests, with the right weight file.
// Font CDN requests are aborted by the harness; we only check they were attempted.
import { test, run, openPage, assert, BASE, DESKTOP, MOBILE } from "./harness.mjs";

// Fontshare file ids from src/styles/fonts.css
const FILE_BY_FAMILY = {
  "Satoshi:Regular": "KFIAZD4RUMEZIYV6FQ3T3GP5PDBDB6JY", // 400
  "Satoshi:Medium": "7AHDUZ4A7LFLVFUIFSARGIWCRQJHISQP", // 500
  "Satoshi:Bold": "GHM6WVH6MILNYOOCXHXB5GTSGNTMGXZR", // 700
};

for (const [vpName, viewport] of [["desktop", DESKTOP], ["mobile", MOBILE]]) {
  test(`${vpName}: Satoshi faces used on the page are declared and requested`, async (browser) => {
    const { ctx, page, external } = await openPage(browser, { viewport });
    try {
      await page.goto(`${BASE}/`);
      await page.locator("form input[type=email]").first().waitFor();
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 700) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 30));
        }
      });
      await page.waitForTimeout(800);
      const { used, faces } = await page.evaluate(() => {
        const used = new Set();
        for (const el of document.querySelectorAll("body *")) {
          if (!el.textContent?.trim()) continue;
          const first = getComputedStyle(el).fontFamily.split(",")[0].trim().replace(/^["']|["']$/g, "");
          if (first.startsWith("Satoshi")) used.add(first);
        }
        const faces = [...document.fonts].map((f) => ({
          family: f.family.replace(/^["']|["']$/g, ""),
          status: f.status,
        }));
        return { used: [...used], faces };
      });
      assert(used.length > 0, "no element uses a Satoshi family");
      for (const fam of used) {
        const declared = faces.filter((f) => f.family === fam);
        assert(declared.length > 0, `no @font-face for "${fam}"`);
        assert(declared.some((f) => f.status !== "unloaded"), `"${fam}" face never requested`);
        const fileId = FILE_BY_FAMILY[fam];
        assert(fileId, `unexpected family "${fam}"`);
        assert(external.some((u) => u.includes(fileId)), `"${fam}" did not request its ${fileId} file`);
      }
    } finally {
      await ctx.close();
    }
  });

  test(`${vpName}: footer tagline uses the Satoshi Regular file`, async (browser) => {
    const { ctx, page, external } = await openPage(browser, { viewport });
    try {
      await page.goto(`${BASE}/`);
      const tagline = page.getByText("Time track with one click.", { exact: true }).first();
      await tagline.waitFor();
      await tagline.scrollIntoViewIfNeeded();
      const family = await tagline.evaluate((el) =>
        getComputedStyle(el).fontFamily.split(",")[0].trim().replace(/^["']|["']$/g, ""),
      );
      assert(family === "Satoshi:Regular", `tagline font-family is "${family}"`);
      const fileId = FILE_BY_FAMILY["Satoshi:Regular"];
      for (let i = 0; i < 30 && !external.some((u) => u.includes(fileId)); i++) await page.waitForTimeout(100);
      assert(external.some((u) => u.includes(fileId)), `tagline did not request the Satoshi Regular file ${fileId}`);
    } finally {
      await ctx.close();
    }
  });
}

await run();
