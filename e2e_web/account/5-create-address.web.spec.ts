import { expect, test } from "@playwright/test";
import { testIDs } from "e2e/testIDs";

const authFile = "playwright/.auth/user.json";

test.describe("Addresses", () => {
  test.use({ storageState: authFile });

  test("5.1 Address created display successfully.", async ({ page }) => {
    await page.context().storageState({ path: authFile });
    await page.goto("/account/address");
    await page.waitForURL("/account/address");
    await page.getByTestId(testIDs.ACCOUNT.ADD_NEW).click();
    await expect(page.getByTestId(testIDs.NEW_ADDRESS.SCREEN)).toBeVisible();
  });

  test("5.2 One of the address, country or zip is empty, the add new is disabled", async ({
    page,
  }) => {
    await page.context().storageState({ path: authFile });
    await page.goto("/account/address");
    await page.waitForURL("/account/address");
    await page.getByTestId(testIDs.ACCOUNT.ADD_NEW).click();
    try {
      const addAddressButton = await page.getByTestId(
        testIDs.NEW_ADDRESS.ADD_ADDRESS
      );

      const isDisabled = !(await addAddressButton.isEnabled());
      expect(isDisabled).toBeTruthy();
    } catch (error) {
      expect(false).toBe(true);
    }
  });

  test("5.3 All of address, and country, and zip are filled, the add new button is enabled", async ({
    page,
  }) => {
    await page.context().storageState({ path: authFile });
    await page.goto("/account/address");
    await page.waitForURL("/account/address");

    await page.getByTestId(testIDs.ACCOUNT.ADD_NEW).click();
    const addressInput = page
      .getByTestId(testIDs.NEW_ADDRESS.ADDRESS)
      .locator("input");
    await addressInput.fill("909-1/2 E 49th St.");

    const zipInput = page
      .getByTestId(testIDs.NEW_ADDRESS.ZIP_CODE)
      .locator("input");
    await zipInput.fill("90011");
    const cityInput = page
      .getByTestId(testIDs.NEW_ADDRESS.CITY)
      .locator("input");
    await cityInput.fill("La Margineda");
    const stateInput = page
      .getByTestId(testIDs.NEW_ADDRESS.STATE)
      .locator("input");
    await stateInput.fill("State");

    try {
      const addAddressButton = await page.getByTestId(
        testIDs.NEW_ADDRESS.ADD_ADDRESS
      );
      expect(addAddressButton).toBeDisabled();
    } catch (error) {
      expect(false).toBe(true);
    }
  });

  test("5.4 If the add new button is enabled. click on the add new button to create a new address and a toast message is shown.", async ({
    page,
  }) => {
    await page.context().storageState({ path: authFile });
    await page.goto("/account/address");
    await page.waitForURL("/account/address");
    await page.getByTestId(testIDs.ACCOUNT.ADD_NEW).click();
    const addressInput = page
      .getByTestId(testIDs.NEW_ADDRESS.ADDRESS)
      .locator("input");
    await addressInput.fill("909-1/2 E 49th St.");

    const zipInput = page
      .getByTestId(testIDs.NEW_ADDRESS.ZIP_CODE)
      .locator("input");
    await zipInput.fill("90011");

    const cityInput = page
      .getByTestId(testIDs.NEW_ADDRESS.CITY)
      .locator("input");
    await cityInput.fill("La Margineda");
    const stateInput = page
      .getByTestId(testIDs.NEW_ADDRESS.STATE)
      .locator("input");
    await stateInput.fill("State");

    await page.getByTestId(testIDs.NEW_ADDRESS.COUNTRY).click();
    await page.locator('text="Andorra"').nth(0).click();
    await page.getByTestId(testIDs.NEW_ADDRESS.ADD_ADDRESS)?.click();
    const msgToast = page.getByText("Address was created successfully.");
    await expect(msgToast).toBeVisible();
  });

  test("5.4 Click on the cancel button, the form is closed..", async ({
    page,
  }) => {
    await page.context().storageState({ path: authFile });
    await page.goto("/account/address");
    await page.waitForURL("/account/address");
    await page.getByTestId(testIDs.ACCOUNT.ADD_NEW).click();
    await page.getByTestId(testIDs.NEW_ADDRESS.CANCEL).click();
    const isVisible = await page
      .getByTestId(testIDs.ACCOUNT.ADDRESS_VIEW)
      .isVisible();
    expect(isVisible).toBeFalsy();
  });
});
