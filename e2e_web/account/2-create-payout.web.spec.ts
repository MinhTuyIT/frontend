import { expect, test } from "@playwright/test";
import { testIDs } from "e2e/testIDs";
import { getRandomText } from "e2e/utils";
import { getRandomNumber } from "e2e_web/utils";

import { MessageError } from "@/utils/validation";

const baseURL =
  process.env.EXPO_PUBLIC_ENV === "dev" ? "http://localhost:8081/" : "";
const authFile = "playwright/.auth/user.json";

test.describe("2. Create payout method", () => {
  test.use({ storageState: authFile });
  test.setTimeout(60000);
  test("2.1 Prevent create payout method with none type", async ({ page }) => {
    await page.context().storageState({ path: authFile });
    await page.goto(`${baseURL}account/profile`);
    await page.getByText("Add New").click();
    const modalTitle = await page.getByText("ADD PAYOUT METHOD");
    await expect(modalTitle).toBeVisible();
    const saveBtn = await page.getByRole("button", { name: "Save" });
    await expect(saveBtn).toBeDisabled();
  });

  test("2.2.1 Create payout with wrong email format of Paypal field", async ({
    page,
  }) => {
    await page.context().storageState({ path: authFile });
    await page.goto(`${baseURL}account/profile`);
    await page.getByText("Add New").click();
    const modalTitle = await page.getByText("ADD PAYOUT METHOD");
    await expect(modalTitle).toBeVisible();
    const saveBtn = await page.getByRole("button", { name: "Save" });
    await expect(saveBtn).toBeDisabled();

    await page.getByTestId(testIDs.PAYOUT.SELECT_TYPE).click();
    await page.getByTestId("PayPal").click();
    const paypalEmail = await page
      .getByTestId(testIDs.PAYOUT.EMAIL)
      .locator("input");
    await paypalEmail.fill("test@");
    await page.getByRole("button", { name: "Save" }).click();
    const errMsg = await page.getByText(MessageError.invalidEmail).count();
    expect(errMsg).toBeGreaterThanOrEqual(1);
  });

  test("2.2.2 Create payout with Paypal type", async ({ page }) => {
    await page.context().storageState({ path: authFile });
    await page.goto(`${baseURL}account/profile`);
    await page.getByText("Add New").click();
    const modalTitle = await page.getByText("ADD PAYOUT METHOD");
    await expect(modalTitle).toBeVisible();
    const saveBtn = await page.getByRole("button", { name: "Save" });
    await expect(saveBtn).toBeDisabled();

    await page.getByTestId(testIDs.PAYOUT.SELECT_TYPE).click();
    await page.getByTestId("PayPal").click();
    const paypalEmail = await page
      .getByTestId(testIDs.PAYOUT.EMAIL)
      .locator("input");
    const randomEmail = `${getRandomText(5)}@yopmail.com`;
    await paypalEmail.fill(randomEmail);
    await page.getByRole("button", { name: "Save" }).click();

    const response = await page.waitForResponse(async res => {
      const request = await res.request();
      const postData = await request.postDataJSON();
      return postData?.operationName === "AccountManagementCreatePayoutMethod";
    });
    const {
      data: { createPayoutMethod },
    } = await response.json();
    await expect(createPayoutMethod?.type).toEqual("PAYPAL");
    await expect(createPayoutMethod?.detail?.email).toEqual(randomEmail);
  });

  test("2.3 Create payout with 'CHECK' type", async ({ page }) => {
    await page.context().storageState({ path: authFile });
    await page.goto(`${baseURL}account/profile`);
    await page.getByText("Add New").click();
    const modalTitle = await page.getByText("ADD PAYOUT METHOD");
    await expect(modalTitle).toBeVisible();
    const saveBtn = await page.getByRole("button", { name: "Save" });
    await expect(saveBtn).toBeDisabled();

    await page.getByTestId(testIDs.PAYOUT.SELECT_TYPE).click();
    await page.getByTestId("Check").click();

    await page.getByRole("button", { name: "Save" }).click();

    const response = await page.waitForResponse(async res => {
      const request = await res.request();
      const postData = await request.postDataJSON();
      return postData?.operationName === "AccountManagementCreatePayoutMethod";
    });

    const { data, errors } = await response.json();
    if (!data) {
      expect(errors?.[0]?.message).toEqual(
        "You have already saved this payout method. Please choose a different one."
      );
    } else await expect(data?.createPayoutMethod?.type).toEqual("CHECK");
  });

  test("2.4.1 One of Bank Name, Account Number, Routing Number and Bank Address is missed then Save button disabled", async ({
    page,
  }) => {
    await page.context().storageState({ path: authFile });
    await page.goto(`${baseURL}account/profile`);
    await page.getByText("Add New").click();
    const modalTitle = await page.getByText("ADD PAYOUT METHOD");
    await expect(modalTitle).toBeVisible();

    await page.getByTestId(testIDs.PAYOUT.SELECT_TYPE).click();
    await page.getByTestId("Wire").click();

    const saveBtn = await page.getByRole("button", { name: "Save" });
    await expect(saveBtn).toBeDisabled();
  });

  test("2.4.2 All Bank Name, Account Number, Routing Number and Bank Address is filled then Save button enabled and create successfully.", async ({
    page,
  }) => {
    await page.context().storageState({ path: authFile });
    await page.goto(`${baseURL}account/profile`);
    await page.getByText("Add New").click();
    const modalTitle = await page.getByText("ADD PAYOUT METHOD");
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

    const response = await page.waitForResponse(async res => {
      const request = await res.request();
      const postData = await request.postDataJSON();
      return postData?.operationName === "AccountManagementCreatePayoutMethod";
    });
    const {
      data: { createPayoutMethod },
    } = await response.json();
    await expect(createPayoutMethod?.type).toEqual("WIRE");
    await expect(createPayoutMethod?.detail?.bankName).toEqual(text);
    await expect(createPayoutMethod?.detail?.accountNumber).toEqual(number);
    await expect(createPayoutMethod?.detail?.bankAddress).toEqual(text);
    await expect(createPayoutMethod?.detail?.routingNumber).toEqual(number);
  });
});
