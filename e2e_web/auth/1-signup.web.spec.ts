import { expect, test } from "@playwright/test";

import { getRandomText } from "../utils";

const email = process.env.EXPO_PUBLIC_TESTING_ACCOUNT_EMAIL as string;
const password = process.env.EXPO_PUBLIC_TESTING_ACCOUNT_PASSWORD as string;

test.describe("Sign up", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test("Signup with missing email", async ({ page }) => {
    await page.goto("/sign-up");
    await page.getByPlaceholder("Enter your email").click();
    await page.getByPlaceholder("Enter your email").fill("");
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').fill(password);
    await page.getByRole("button", { name: "Create Account" }).click();
    const error = page.getByText("Email is required");
    await expect(error).toBeVisible();
  });

  test("Signup with missing password", async ({ page }) => {
    await page.goto("/sign-up");
    await page.getByPlaceholder("Enter your email").click();
    await page.getByPlaceholder("Enter your email").fill(email);
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').fill("");
    await page.getByRole("button", { name: "Create Account" }).click();
    const error = page.getByText("Password is required");
    await expect(error).toBeVisible();
  });

  test("Signup with wrong email format", async ({ page }) => {
    await page.goto("/sign-up");
    await page.getByPlaceholder("Enter your email").click();
    await page.getByPlaceholder("Enter your email").fill(`${email}@test`);
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').fill(password);
    await page.getByRole("button", { name: "Create Account" }).click();
    const error = page.getByText("Please enter a valid email address");
    await expect(error).toBeVisible();
  });

  test("Signup with existed email", async ({ page }) => {
    await page.goto("/sign-up");
    await page.getByPlaceholder("Enter your email").click();
    await page.getByPlaceholder("Enter your email").fill(email);
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').fill(password);
    await page.getByRole("button", { name: "Create Account" }).click();
    const error = page.getByText(
      "Email already exists. Please log in or sign up with a different email"
    );
    await expect(error).toBeVisible();
  });

  test("Signup successfully", async ({ page }) => {
    await page.goto("/sign-up");
    await page.getByPlaceholder("Enter your email").click();
    await page
      .getByPlaceholder("Enter your email")
      .fill(`${getRandomText(5)}${email}`);
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').fill(password);
    await page.getByRole("button", { name: "Create Account" }).click();
    const resule = page.getByText("Probstein Auctions");
    await expect(resule).toBeVisible();
  });
});
