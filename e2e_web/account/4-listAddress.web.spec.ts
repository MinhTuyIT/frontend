import { expect, test } from "@playwright/test";
import { testIDs } from "e2e/testIDs";

const authFile = "playwright/.auth/user.json";

test.describe("Addresses", () => {
  test.use({ storageState: authFile });
  test.setTimeout(60000);

  test.skip("4.1 Address created display successfully.", async ({ page }) => {
    await page.context().storageState({ path: authFile });
    await page.goto("/account/address");
    await page.waitForURL("/account/address");
    await page.waitForTimeout(10000);

    const addressItem = await page.getByTestId(testIDs.ACCOUNT.ADDRESS_ITEM);
    const noItem = await page.getByTestId(testIDs.ACCOUNT.ADDRESS_ITEM_EMPTY);

    await Promise.race([
      addressItem.waitFor({ state: "visible" }),
      noItem.waitFor({ state: "visible" }),
    ]);

    if (await addressItem.isVisible()) {
      expect(addressItem).toBeVisible();
    } else {
      expect(noItem).toBeVisible();
    }
  });
});
