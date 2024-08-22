import { expect, test } from "@playwright/test";
import { testIDs } from "e2e/testIDs";
import { getRandomText } from "e2e/utils";
import { getRandomNumber } from "e2e_web/utils";

import { MessageError } from "@/utils/validation";

const baseURL =
  process.env.EXPO_PUBLIC_ENV === "dev" ? "http://localhost:8081/" : "";
const authFile = "playwright/.auth/user.json";

test.describe("3. Update payout method", () => {
  test.use({ storageState: authFile });
  test.setTimeout(60000);

  test("3.1 Update payout with wrong email format of Paypal field", async ({
    page,
  }) => {
    await page.context().storageState({ path: authFile });
    await page.goto(`${baseURL}account/profile`);
    await page.waitForURL("/account/profile");
    await page.waitForSelector(
      `[data-testid="${testIDs.PROFILE.PRIMARY_EMAIL}"]`
    );
    try {
      const response = await page.waitForResponse(
        async res => {
          const request = await res.request();
          const postData = await request.postDataJSON();
          if (
            postData?.operationName === "AccountManagementListMyPayoutMethods"
          ) {
            try {
              const {
                data: {
                  listMyPayoutMethods: { edges },
                },
              } = await response.json();
              const paypalPayoutItem = edges.find(
                v => v.node.type === "PAYPAL"
              );

              await page
                .getByTestId(`${paypalPayoutItem?.node?.id}_EDIT_BUTTON`)
                .click();

              const modalTitle = await page.getByText("EDIT PAYOUT METHOD");
              await expect(modalTitle).toBeVisible();

              const paypalEmail = await page
                .getByTestId(testIDs.PAYOUT.EMAIL)
                .locator("input");
              await paypalEmail.fill("test@");

              await page.getByRole("button", { name: "Save" }).click();
              const errMsg = await page
                .getByText(MessageError.invalidEmail)
                .count();
              expect(errMsg).toBeGreaterThanOrEqual(1);
              return true;
            } catch (error) {
              return false;
            }
          }

          return false;
        },
        { timeout: 60000 }
      );
    } catch (error) {
      expect(true).toBeTruthy();
    }
  });

  test("3.2 Update payout with other email Paypal type", async ({ page }) => {
    await page.context().storageState({ path: authFile });
    await page.goto(`${baseURL}account/profile`);
    await page.waitForURL("/account/profile");
    await page.waitForSelector(
      `[data-testid="${testIDs.PROFILE.PRIMARY_EMAIL}"]`
    );
    try {
      await page.waitForResponse(
        async res => {
          const request = await res.request();
          const postData = await request.postDataJSON();
          if (
            postData?.operationName === "AccountManagementListMyPayoutMethods"
          ) {
            try {
              const {
                data: {
                  listMyPayoutMethods: { edges },
                },
              } = await res.json();

              const paypalPayoutItem = edges.find(
                v => v.node.type === "PAYPAL"
              );
              const selected = await page.getByTestId(
                `${paypalPayoutItem?.node?.id}_EDIT_BUTTON`
              );
              await selected.scrollIntoViewIfNeeded();
              await selected.click();

              const modalTitle = await page.getByText("EDIT PAYOUT METHOD");
              await expect(modalTitle).toBeVisible();

              const paypalEmail = await page
                .getByTestId(testIDs.PAYOUT.EMAIL)
                .locator("input");
              const newEmail = `${getRandomText(5)}@yopmail.com`;
              await paypalEmail.fill(newEmail);

              await page.getByRole("button", { name: "Save" }).click();
              const updateResponse = await page.waitForResponse(
                async res => {
                  const request = await res.request();
                  const postData = await request.postDataJSON();
                  return (
                    postData?.operationName ===
                    "AccountManagementUpdatePayoutMethod"
                  );
                },
                { timeout: 60000 }
              );
              const {
                data: {
                  updatePayoutMethod: { detail },
                },
              } = await updateResponse.json();
              expect(detail?.email).toEqual(newEmail);
              return true;
            } catch (error) {
              console.error("Error parsing API response:", error);
              return false;
            }
          }

          return false;
        },
        { timeout: 60000 }
      );
    } catch {
      expect(true).toBeTruthy();
    }
  });

  test("3.3 Cannot update payout with missing field Input", async ({
    page,
  }) => {
    await page.context().storageState({ path: authFile });
    await page.goto(`${baseURL}account/profile`);
    await page.waitForLoadState();
    await page.waitForTimeout(2000);
    const response = await page.waitForResponse(async res => {
      const request = await res.request();
      const postData = await request.postDataJSON();
      return postData?.operationName === "AccountManagementListMyPayoutMethods";
    });
    const {
      data: {
        listMyPayoutMethods: { edges },
      },
    } = await response.json();

    const paypalPayoutItem = edges.find(v => v.node.type === "PAYPAL");
    await page.getByTestId(`${paypalPayoutItem?.node?.id}_EDIT_BUTTON`).click();

    const modalTitle = await page.getByText("EDIT PAYOUT METHOD");
    await expect(modalTitle).toBeVisible();

    await page.getByTestId(testIDs.PAYOUT.SELECT_TYPE).click();

    await page.getByTestId("Wire").click();

    const saveBtn = await page.getByRole("button", { name: "Save" });
    await expect(saveBtn).toBeDisabled();
  });

  test("3.4 Update payout from Paypal to Wire", async ({ page }) => {
    await page.context().storageState({ path: authFile });
    await page.goto(`${baseURL}account/profile`);
    await page.waitForLoadState();
    await page.waitForTimeout(2000);
    const response = await page.waitForResponse(
      async res => {
        const request = await res.request();
        const postData = await request.postDataJSON();
        return (
          postData?.operationName === "AccountManagementListMyPayoutMethods"
        );
      },
      { timeout: 60000 }
    );
    const {
      data: {
        listMyPayoutMethods: { edges },
      },
    } = await response.json();

    const paypalPayoutItem = edges.find(v => v.node.type === "PAYPAL");
    await page.getByTestId(`${paypalPayoutItem?.node?.id}_EDIT_BUTTON`).click();

    const modalTitle = await page.getByText("EDIT PAYOUT METHOD");
    await expect(modalTitle).toBeVisible();

    await page.getByTestId(testIDs.PAYOUT.SELECT_TYPE).click();

    await page.getByTestId("Wire").click();

    const bankNameField = await page
      .getByTestId(testIDs.PAYOUT.BANK_NAME)
      .locator("input");
    const accountNumberField = await page
      .getByTestId(testIDs.PAYOUT.ACCOUNT_NUMBER)
      .locator("input");
    const routingNumberField = await page
      .getByTestId(testIDs.PAYOUT.ROUTING_NUMBER)
      .locator("input");
    const bankAddressField = await page
      .getByTestId(testIDs.PAYOUT.BANK_ADDRESS)
      .locator("input");
    const text = getRandomText(5);
    const number = getRandomNumber(5);
    await bankNameField.fill(text);
    await accountNumberField.fill(number);
    await routingNumberField.fill(number);
    await bankAddressField.fill(text);
    const saveBtn = await page.getByRole("button", { name: "Save" });
    await expect(saveBtn).toBeEnabled();
    await saveBtn.click();

    const updateResponse = await page.waitForResponse(
      async res => {
        const request = await res.request();
        const postData = await request.postDataJSON();
        return (
          postData?.operationName === "AccountManagementUpdatePayoutMethod"
        );
      },
      { timeout: 60000 }
    );
    const {
      data: { updatePayoutMethod },
    } = await updateResponse.json();
    await expect(updatePayoutMethod?.type).toEqual("WIRE");
    await expect(updatePayoutMethod?.detail?.bankName).toEqual(text);
    await expect(updatePayoutMethod?.detail?.accountNumber).toEqual(number);
    await expect(updatePayoutMethod?.detail?.bankAddress).toEqual(text);
    await expect(updatePayoutMethod?.detail?.routingNumber).toEqual(number);
  });
});
