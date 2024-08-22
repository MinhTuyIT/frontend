import { expect, test } from "@playwright/test";
import { testIDs } from "e2e/testIDs";

const password = process.env.EXPO_PUBLIC_TESTING_ACCOUNT_PASSWORD as string;
test.use({
  storageState: "playwright/.auth/user.json",
});

test.describe("Change password", () => {
  test("Change password with wrong confirm password", async ({ page }) => {
    await page.goto("/account/profile");
    await page.getByRole("button", { name: "Change password" }).click();

    await page
      .getByTestId(testIDs.ACCOUNT.CHANGE_PW_CURRENT_PW_INPUT)
      .locator("input")
      .click();
    await page
      .getByTestId(testIDs.ACCOUNT.CHANGE_PW_CURRENT_PW_INPUT)
      .locator("input")
      .fill(password);
    await page
      .getByTestId(testIDs.ACCOUNT.CHANGE_PW_NEW_PW_INPUT)
      .locator("input")
      .click();
    await page
      .getByTestId(testIDs.ACCOUNT.CHANGE_PW_NEW_PW_INPUT)
      .locator("input")
      .fill(password);
    await page
      .getByTestId(testIDs.ACCOUNT.CHANGE_PW_CONFIRM_PW_INPUT)
      .locator("input")
      .click();
    await page
      .getByTestId(testIDs.ACCOUNT.CHANGE_PW_CONFIRM_PW_INPUT)
      .locator("input")
      .fill("test");
    await page.getByRole("button", { name: "Change Password" }).nth(1).click();
    const error = page.getByText(
      "The passwords you entered do not match. Please ensure that both password fields are the same"
    );
    await expect(error).toBeVisible();
  });

  test("Change password with wrong old password", async ({ page }) => {
    await page.goto("/account/profile");
    await page.getByRole("button", { name: "Change password" }).click();

    await page
      .getByTestId(testIDs.ACCOUNT.CHANGE_PW_CURRENT_PW_INPUT)
      .locator("input")
      .click();
    await page
      .getByTestId(testIDs.ACCOUNT.CHANGE_PW_CURRENT_PW_INPUT)
      .locator("input")
      .fill("test");
    await page
      .getByTestId(testIDs.ACCOUNT.CHANGE_PW_NEW_PW_INPUT)
      .locator("input")
      .click();
    await page
      .getByTestId(testIDs.ACCOUNT.CHANGE_PW_NEW_PW_INPUT)
      .locator("input")
      .fill(password);
    await page
      .getByTestId(testIDs.ACCOUNT.CHANGE_PW_CONFIRM_PW_INPUT)
      .locator("input")
      .click();
    await page
      .getByTestId(testIDs.ACCOUNT.CHANGE_PW_CONFIRM_PW_INPUT)
      .locator("input")
      .fill(password);
    await page.getByRole("button", { name: "Change Password" }).nth(1).click();
    const error = page.getByText(
      "Current password is incorrect. Please try again"
    );
    await expect(error).toBeVisible();
  });

  test("Change password successfully", async ({ page }) => {
    await page.goto("/account/profile");
    await page.getByRole("button", { name: "Change password" }).click();

    await page
      .getByTestId(testIDs.ACCOUNT.CHANGE_PW_CURRENT_PW_INPUT)
      .locator("input")
      .click();
    await page
      .getByTestId(testIDs.ACCOUNT.CHANGE_PW_CURRENT_PW_INPUT)
      .locator("input")
      .fill(password);
    await page
      .getByTestId(testIDs.ACCOUNT.CHANGE_PW_NEW_PW_INPUT)
      .locator("input")
      .click();
    await page
      .getByTestId(testIDs.ACCOUNT.CHANGE_PW_NEW_PW_INPUT)
      .locator("input")
      .fill(password);
    await page
      .getByTestId(testIDs.ACCOUNT.CHANGE_PW_CONFIRM_PW_INPUT)
      .locator("input")
      .click();
    await page
      .getByTestId(testIDs.ACCOUNT.CHANGE_PW_CONFIRM_PW_INPUT)
      .locator("input")
      .fill(password);
    await page.getByRole("button", { name: "Change Password" }).nth(1).click();
    const resule = page.getByText("Password changed successfully");
    await expect(resule).toBeVisible();
  });
});
