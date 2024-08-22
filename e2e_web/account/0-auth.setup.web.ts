import { test as setup } from "@playwright/test";
const authFile = "playwright/.auth/user.json";

setup("Authenticate as User", async ({ page }) => {
  const email = process.env.EXPO_PUBLIC_TESTING_ACCOUNT_EMAIL as string;
  const password = process.env.EXPO_PUBLIC_TESTING_ACCOUNT_PASSWORD as string;
  await page.goto("/sign-in");
  await page.getByPlaceholder("Enter your email").click();
  await page.getByPlaceholder("Enter your email").fill(email);
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill(password);
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.waitForURL("/");
  await page.context().storageState({ path: authFile });
});
