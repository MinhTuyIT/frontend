import { expect, test } from "@playwright/test";
const email = process.env.EXPO_PUBLIC_TESTING_ACCOUNT_EMAIL as string;
const password = process.env.EXPO_PUBLIC_TESTING_ACCOUNT_PASSWORD as string;

test.describe("Sign in", () => {
  test.use({ storageState: { cookies: [], origins: [] } });
  test("0.1 Signin with wrong email", async ({ page }) => {
    await page.goto("/sign-in");
    await page.getByPlaceholder("Enter your email").click();
    await page.getByPlaceholder("Enter your email").fill("test@wrong.com");
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').fill(password);
    await page.getByRole("button", { name: "Sign in" }).click();
    const error = page.getByText(
      "The email or password is incorrect. Please try again"
    );
    await expect(error).toBeVisible();
  });

  test("0.2 Signin with missing email", async ({ page }) => {
    await page.goto("/sign-in");
    await page.getByPlaceholder("Enter your email").click();
    await page.getByPlaceholder("Enter your email").fill("");
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').fill(password);
    await page.getByRole("button", { name: "Sign in" }).click();
    const error = page.getByText("Email is required");
    await expect(error).toBeVisible();
  });

  test("0.3 Signin with missing password", async ({ page }) => {
    await page.goto("/sign-in");
    await page.getByPlaceholder("Enter your email").click();
    await page.getByPlaceholder("Enter your email").fill(email);
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').fill("");
    await page.getByRole("button", { name: "Sign in" }).click();
    const error = page.getByText("Password is required");
    await expect(error).toBeVisible();
  });

  test("0.4 Signin with wrong email format", async ({ page }) => {
    await page.goto("/sign-in");
    await page.getByPlaceholder("Enter your email").click();
    await page.getByPlaceholder("Enter your email").fill(`${email}@test`);
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').fill(password);
    await page.getByRole("button", { name: "Sign in" }).click();
    const error = page.getByText("Please enter a valid email address");
    await expect(error).toBeVisible();
  });

  test("0.5 Signin successfully", async ({ page }) => {
    await page.goto("/sign-in");
    await page.getByPlaceholder("Enter your email").click();
    await page.getByPlaceholder("Enter your email").fill(email);
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').fill(password);
    await page.getByRole("button", { name: "Sign in" }).click();
    const resule = page.getByText("Probstein Auctions");
    await expect(resule).toBeVisible();
  });
});
