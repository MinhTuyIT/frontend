import { expect, test } from "@playwright/test";

const email = process.env.EXPO_PUBLIC_TESTING_ACCOUNT_EMAIL as string;
const baseURL =
  process.env.EXPO_PUBLIC_ENV === "dev" ? "http://localhost:8081/" : "";

test.describe("Forgot password", () => {
  test.use({ storageState: { cookies: [], origins: [] } });
  test.setTimeout(60000);
  test("Forgot password with missing email", async ({ page }) => {
    await page.goto(`${baseURL}sign-in`);
    await page.getByRole("link", { name: "Forgot Password" }).click();
    await page.getByRole("button", { name: "Send Reset Link" }).click();
    const error = page.getByText("Email is required");
    await expect(error).toBeVisible();
  });

  test("Forgot password with wrong email format", async ({ page }) => {
    await page.goto(`${baseURL}sign-in`);
    await page.getByRole("link", { name: "Forgot Password" }).click();
    const emailField = await page.getByPlaceholder("Enter your email");
    await emailField.fill(`${email}@test`);

    await page.getByRole("button", { name: "Send Reset Link" }).click();
    const error = page.getByText("Please enter a valid email address");
    await expect(error).toBeVisible();
  });

  test("Forgot password successfully", async ({ page }) => {
    await page.goto(`${baseURL}sign-in`);
    await page.getByRole("link", { name: "Forgot Password" }).click();
    await page.getByPlaceholder("Enter your email").click();
    await page.getByPlaceholder("Enter your email").fill(email);

    await page.getByRole("button", { name: "Send Reset Link" }).click();

    const sendSuccessPageText = page.getByText(
      "If your account is in our system you will receive an email to reset your password"
    );
    await expect(sendSuccessPageText).toBeVisible();
  });
});
