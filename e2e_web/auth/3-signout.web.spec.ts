import { expect, test } from "@playwright/test";
import { testIDs } from "e2e/testIDs";

const authFile = "playwright/.auth/user.json";
test.describe("Sign out", () => {
  test.use({ storageState: authFile });
  test("3.1 Click on Cancel button, the modal is closed.", async ({ page }) => {
    await page.goto("/");
    await page.waitForURL("/");
    await page.getByTestId(testIDs.HEADER.DROPDOWN_ICON).nth(0).click();

    await page.getByTestId(testIDs.MENU_LIST.SIGN_OUT_ITEM).click();
    await page.getByText("Cancel").click();
    const isVisible = await page
      .getByTestId(testIDs.AUTH.LOGOUT_VIEW)
      .isVisible();
    expect(isVisible).toBeFalsy();
  });

  test("3.2 You’ve successfully logged out.", async ({ page }) => {
    await page.context().storageState({ path: authFile });
    await page.goto("/");
    await page.waitForURL("/");
    await page.getByTestId(testIDs.HEADER.DROPDOWN_ICON).nth(0).click();
    await page.getByTestId(testIDs.MENU_LIST.SIGN_OUT_ITEM).click();
    await page.getByText("Sign Out").nth(1).click();
    const msgToast = page.getByText("You’ve successfully logged out");
    await expect(msgToast).toBeVisible();
  });
});
