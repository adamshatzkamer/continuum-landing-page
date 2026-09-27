// B8 (interim until a privacy policy exists): the FAQ must not point at a Privacy Policy
// that doesn't exist, and each waitlist form must say how the email is used.
import { test, run, openPage, assert, BASE, DESKTOP, MOBILE } from "./harness.mjs";

const NOTE = "We only use your email to contact you about Continuum.";
const CONTACT = "info@continuityos.co.za";

test("static index.html (fallback + JSON-LD) has no Privacy Policy reference", async () => {
  const html = await (await fetch(`${BASE}/`)).text();
  assert(!/privacy policy/i.test(html), "index.html still references a Privacy Policy");
  assert(html.includes(CONTACT), `index.html does not direct people to ${CONTACT}`);
});

for (const [vpName, viewport] of [["desktop", DESKTOP], ["mobile", MOBILE]]) {
  test(`${vpName}: FAQ POPIA answer directs to ${CONTACT}, no Privacy Policy`, async (browser) => {
    const { ctx, page } = await openPage(browser, { viewport });
    try {
      await page.goto(`${BASE}/`);
      const q = page.getByRole("button", { name: "Is Continuum POPIA compliant?" }).first();
      await q.waitFor();
      await q.click();
      const answer = (await q.locator("xpath=ancestor::*[.//*[contains(., 'POPIA) in mind')]][1]").innerText());
      assert(!/privacy policy/i.test(answer), `answer still mentions a Privacy Policy: ${answer}`);
      assert(answer.includes(CONTACT), `answer does not mention ${CONTACT}: ${answer}`);
    } finally {
      await ctx.close();
    }
  });

  test(`${vpName}: waitlist form has the email-use note, linked to the input`, async (browser) => {
    const { ctx, page } = await openPage(browser, { viewport });
    try {
      await page.goto(`${BASE}/`);
      const form = page.locator("form:visible", { has: page.locator("input[type=email]") }).first();
      await form.waitFor();
      const note = form.getByText(NOTE, { exact: true });
      assert((await note.count()) === 1, `no "${NOTE}" under the ${vpName} waitlist form`);
      assert(await note.isVisible(), "note not visible");
      const input = form.locator("input[type=email]");
      const describedBy = (await input.getAttribute("aria-describedby")) || "";
      const noteId = await note.getAttribute("id");
      assert(noteId && describedBy.split(/\s+/).includes(noteId), `input aria-describedby="${describedBy}" does not reference the note (id=${noteId})`);
    } finally {
      await ctx.close();
    }
  });
}

await run();
