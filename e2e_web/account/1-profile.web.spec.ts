import { expect, test } from "@playwright/test";
import { testIDs } from "e2e/testIDs";
import { getRandomText } from "e2e/utils";

const baseURL =
  process.env.EXPO_PUBLIC_ENV === "dev" ? "http://localhost:8081/" : "";
const authFile = "playwright/.auth/user.json";

test.describe("1. Profile detail and update", () => {
  test.use({ storageState: authFile });
  test.setTimeout(60000);
  const email = process.env.EXPO_PUBLIC_TESTING_ACCOUNT_EMAIL as string;
  test("1.1 Load profile page successfully.", async ({ page }) => {
    await page.context().storageState({ path: authFile });
    await page.goto(`${baseURL}account/profile`);
    await page.waitForURL(`${baseURL}account/profile`);
    await page.waitForSelector(
      `[data-testid="${testIDs.PROFILE.PRIMARY_EMAIL}"]`
    );
    const primaryEmailField = await page.getByTestId(
      testIDs.PROFILE.PRIMARY_EMAIL
    );
    expect(primaryEmailField).toBeVisible();
  });

  test("1.3 Edit profile with secondary email same as primaryEmail", async ({
    page,
  }) => {
    await page.context().storageState({ path: authFile });
    await page.goto(`${baseURL}account/profile`);

    const response = await page.waitForResponse(async res => {
      const request = await res.request();
      const postData = await request.postDataJSON();
      return postData?.operationName === "AuthMe";
    });
    const {
      data: { me },
    } = await response.json();
    await page.waitForSelector(
      `[data-testid="${testIDs.PROFILE.PRIMARY_EMAIL}"]`
    );
    await page.waitForTimeout(5000);
    const seEmailField = await page
      .getByTestId(testIDs.PROFILE.SECONDARY_EMAIL)
      .locator("input");
    await seEmailField.clear();
    await seEmailField.fill(me?.email);
    const saveBtn = await page.getByTestId(testIDs.PROFILE.SAVE_BUTTON);
    await saveBtn.click();
    const errorMessage = await page.getByText(
      "The secondary email must be different from the primary email."
    );
    expect(errorMessage).toBeVisible();
  });

  test("1.4 Update profile successfully", async ({ page }) => {
    await page.context().storageState({ path: authFile });
    await page.goto(`${baseURL}account/profile`);
    await page.waitForSelector(
      `[data-testid="${testIDs.PROFILE.PRIMARY_EMAIL}"]`
    );
    await page.waitForTimeout(5000);

    const seEmail = `${getRandomText(5)}@yopmail.com`;
    const name = `${getRandomText(5)}`;

    const seEmailField = await page
      .getByTestId(testIDs.PROFILE.SECONDARY_EMAIL)
      .locator("input");
    await seEmailField.clear();
    await seEmailField.fill(seEmail);

    const fnField = await page
      .getByTestId(testIDs.PROFILE.FIRST_NAME)
      .locator("input");
    await fnField.clear();
    await fnField.fill(name);

    const lnField = await page
      .getByTestId(testIDs.PROFILE.LAST_NAME)
      .locator("input");
    await lnField.clear();
    await lnField.fill(name);

    const saveBtn = await page.getByTestId(testIDs.PROFILE.SAVE_BUTTON);
    await saveBtn.click();
    const response = await page.waitForResponse(async res => {
      const request = await res.request();
      const postData = await request.postDataJSON();
      return postData?.operationName === "AccountManagementUpdateMe";
    });
    const {
      data: { updateMe },
    } = await response.json();
    expect(updateMe?.consignor?.secondaryEmail).toEqual(seEmail);
    expect(updateMe?.email).toEqual(email);
    expect(updateMe?.firstName).toEqual(name);
    expect(updateMe?.lastName).toEqual(name);
  });
});
