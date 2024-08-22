import { expect, test } from "@playwright/test";

import { MessageError } from "@/utils/validation";
const baseURL =
  process.env.EXPO_PUBLIC_ENV === "dev" ? "http://localhost:8081/" : "";

test.describe("Reset password", () => {
  test.use({ storageState: { cookies: [], origins: [] } });
  test.setTimeout(60000);
  test("Reset password with missing new password", async ({ page }) => {
    await page.goto(`${baseURL}change-password`);
    const resetBtn = await page.getByRole("button", { name: "Reset Password" });
    await expect(resetBtn).toBeDisabled();
  });

  test("Reset password with missing confirm new password", async ({ page }) => {
    await page.goto(`${baseURL}change-password`);

    const passwordField = await page.getByLabel("Input Field").nth(0);

    await passwordField.fill("some text");
    await expect(passwordField).toHaveValue("some text");
    const resetBtn = await page.getByRole("button", { name: "Reset Password" });
    await expect(resetBtn).toBeDisabled();
  });

  test("Reset password with simple pwd", async ({ page }) => {
    await page.goto(`${baseURL}change-password`);
    const passwordField = await page.getByLabel("Input Field").nth(0);
    const confirmPasswordField = await page.getByLabel("Input Field").nth(1);
    await passwordField.fill(`simplePwd`);
    await confirmPasswordField.fill(`simplePwd`);

    await page
      .getByRole("button", {
        name: "Reset Password",
      })
      .click();
    const error = page.getByText(MessageError.invalidPw);
    await expect(error).toBeVisible();
  });

  test("Reset password (confirm password not match)", async ({ page }) => {
    await page.goto(`${baseURL}change-password`);
    const passwordField = await page.getByLabel("Input Field").nth(0);
    const confirmPasswordField = await page.getByLabel("Input Field").nth(1);
    await passwordField.fill(`TrueFormat0@`);
    await confirmPasswordField.fill(`TrueFormat1@`);

    await page
      .getByRole("button", {
        name: "Reset Password",
      })
      .click();

    const errorMsg = page.getByText(
      "The passwords you entered do not match. Please ensure that both password fields are the same."
    );
    await expect(errorMsg).toBeVisible();
  });

  test("Reset password successfully", async ({ page }) => {
    await page.goto(`${baseURL}change-password`);
    const passwordField = await page.getByLabel("Input Field").nth(0);
    const confirmPasswordField = await page.getByLabel("Input Field").nth(1);
    await passwordField.fill("TrueFormat0@");
    await confirmPasswordField.fill("TrueFormat0@");

    await page
      .getByRole("button", {
        name: "Reset Password",
      })
      .click();
  });
});
