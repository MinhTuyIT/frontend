import { expect, test } from "@playwright/test";
import { testIDs } from "e2e/testIDs";

const email = process.env.EXPO_PUBLIC_TESTING_ACCOUNT_EMAIL as string;

test.describe("Forgot password", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test("5.1 Resend Verification Code with Incorrect  Email", async ({
    page,
  }) => {
    await page.goto("/sign-in");
    await page.getByText("Forgot Password?").click();
    const addressInput = page.getByTestId("emailInput").locator("input");
    await addressInput.fill("user@wrong.com");
    await page.getByTestId(testIDs.AUTH.SEND_RESET_LINK_BUTTON).click();
    const error = page.getByText("There has been an error, please try again");
    await expect(error).toBeVisible();
  });

  test("5.2 Resend Verification Code with Correct Email", async ({ page }) => {
    await page.goto("/sign-in");
    await page.getByText("Forgot Password?").click();
    const addressInput = page.getByTestId("emailInput").locator("input");
    await addressInput.fill(email);
    await page.getByTestId(testIDs.AUTH.SEND_RESET_LINK_BUTTON).click();

    const isVisible = await page
      .getByTestId(testIDs.AUTH.EMAIL_SENT_SCREEN)
      .isVisible();
    expect(isVisible).toBeTruthy();
  });
});
