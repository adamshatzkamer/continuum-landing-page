// B3: the waitlist form validates the email before sending, and maps the backend's
// 422 (invalid email) and 429 (rate limit) to distinct messages.
import { test, run, openPage, toastText, assert, BASE, DESKTOP, MOBILE } from "./harness.mjs";

const INVALID_MSG = /valid email/i;
const RATE_MSG = /too many/i;
const GENERIC_MSG = /something went wrong/i;

async function submit(page, value) {
  const input = page.locator("form input[type=email]").first();
  await input.waitFor();
  await input.fill(value);
  await input.press("Enter");
}

for (const [vpName, viewport] of [["desktop", DESKTOP], ["mobile", MOBILE]]) {
  for (const value of ["", "   ", "not-an-email", "a@b", "two@@example.com"]) {
    test(`${vpName}: "${value}" is rejected without a request`, async (browser) => {
      const { ctx, page, waitlistBodies } = await openPage(browser, { viewport });
      try {
        await page.goto(`${BASE}/`);
        await submit(page, value);
        const toast = await toastText(page);
        assert(waitlistBodies.length === 0, `request sent: ${JSON.stringify(waitlistBodies)}`);
        assert(INVALID_MSG.test(toast || ""), `toast was ${JSON.stringify(toast)}`);
      } finally {
        await ctx.close();
      }
    });
  }

  const responses = [
    ["422", 422, '{"code":"VALIDATION_ERROR","message":"body.email: value is not a valid email address"}', INVALID_MSG],
    ["429", 429, '{"code":"RATE_LIMIT_EXCEEDED","message":"Rate limit exceeded"}', RATE_MSG],
    ["500", 500, '{"code":"INTERNAL_ERROR"}', GENERIC_MSG],
  ];
  for (const [name, status, body, expected] of responses) {
    test(`${vpName}: server ${name} shows the matching message`, async (browser) => {
      const { ctx, page, waitlistBodies } = await openPage(browser, {
        viewport,
        onWaitlist: (route) => route.fulfill({ status, contentType: "application/json", body }),
      });
      try {
        await page.goto(`${BASE}/`);
        await submit(page, "  probe@example.com ");
        const toast = await toastText(page);
        assert(waitlistBodies.length === 1, `expected 1 request, got ${waitlistBodies.length}`);
        assert(JSON.parse(waitlistBodies[0]).email === "probe@example.com", `body ${waitlistBodies[0]}`);
        assert(expected.test(toast || ""), `toast was ${JSON.stringify(toast)}`);
      } finally {
        await ctx.close();
      }
    });
  }

  test(`${vpName}: valid email succeeds`, async (browser) => {
    const { ctx, page, waitlistBodies } = await openPage(browser, { viewport });
    try {
      await page.goto(`${BASE}/`);
      await submit(page, "probe@example.com");
      const toast = await toastText(page);
      assert(waitlistBodies.length === 1, `expected 1 request, got ${waitlistBodies.length}`);
      assert(/on the list/i.test(toast || ""), `toast was ${JSON.stringify(toast)}`);
    } finally {
      await ctx.close();
    }
  });
}

await run();
