import { expect, test } from "@playwright/test";
import { testIDs } from "e2e/testIDs";

test.use({
  storageState: "playwright/.auth/user.json",
});

test.describe("Register to bid", () => {
  test.skip("Register to bid when no payment method is added", async ({
    page,
  }) => {
    await page.goto("/account/profile");
    await page.waitForURL("/account/profile");
    const graphqlResponse = await page.waitForResponse(async response => {
      if (response.url().includes("/graphql") && response.status() === 200) {
        const request = await response.request();
        const postData = request.postData();
        if (postData) {
          const jsonBody = JSON.parse(postData);
          console.log("jsonBody", jsonBody);
          return jsonBody.operationName === "AuthMe";
        }
      }
      return false;
    });
    await graphqlResponse.json();
    if (await page.isVisible("button:has-text('Registered To Bid')")) {
      return;
    } else {
      await page.getByRole("button", { name: "Register To Bid" }).click();

      const iframeCardNumber = await page
        .frameLocator("iFrame")
        .first()
        .getByLabel("Card number");
      await iframeCardNumber.click();
      await iframeCardNumber.fill("4242 4242 4242 4242");
      const iframeExpirationDate = await page
        .frameLocator("iFrame")
        .first()
        .getByLabel("Expiration date");
      await iframeExpirationDate.click();
      await iframeExpirationDate.fill("12 / 42");
      const iframeSecurityCode = await page
        .frameLocator("iFrame")
        .first()
        .getByLabel("Security code");
      await iframeSecurityCode.click();
      await iframeSecurityCode.fill("1221");
      const iframeZipCode = await page
        .frameLocator("iFrame")
        .first()
        .getByLabel("Zip code");
      await iframeZipCode.click();
      await iframeZipCode.fill("123123");

      await page
        .getByTestId(testIDs.REGISTER_TO_BID.FIRST_NAME)
        .getByLabel("Input Field")
        .click();
      await page
        .getByTestId(testIDs.REGISTER_TO_BID.FIRST_NAME)
        .getByLabel("Input Field")
        .fill("test");
      await page
        .getByTestId(testIDs.REGISTER_TO_BID.LAST_NAME)
        .getByLabel("Input Field")
        .click();
      await page
        .getByTestId(testIDs.REGISTER_TO_BID.LAST_NAME)
        .getByLabel("Input Field")
        .fill("test");
      await page
        .getByTestId("modalRegisterToBid")
        .getByTestId(testIDs.REGISTER_TO_BID.PHONE_NUMBER)
        .getByLabel("Input Field")
        .click();
      await page
        .getByTestId("modalRegisterToBid")
        .getByTestId(testIDs.REGISTER_TO_BID.PHONE_NUMBER)
        .getByLabel("Input Field")
        .fill("2124567890");
      await page
        .getByTestId("modalRegisterToBid")
        .getByRole("button", { name: "Register To Bid" })
        .click();
      const text = page.getByText("Successfully registered to bid");
      await expect(text).toBeVisible();
    }
  });

  test.skip("Register to bid when at least one payment method is added", async ({
    page,
  }) => {
    await page.goto("/account/profile");
    await page.waitForURL("/account/profile");
    const graphqlResponse = await page.waitForResponse(async response => {
      if (response.url().includes("/graphql") && response.status() === 200) {
        const request = await response.request();
        const postData = request.postData();
        if (postData) {
          const jsonBody = JSON.parse(postData);
          return jsonBody.operationName === "AuthMe";
        }
      }
      return false;
    });
    await graphqlResponse.json();
    if (await page.isVisible("button:has-text('Registered To Bid')")) {
      return;
    } else {
      await page.getByRole("button", { name: "Register To Bid" }).click();
      await page
        .getByTestId(testIDs.REGISTER_TO_BID.FIRST_NAME)
        .getByLabel("Input Field")
        .click();
      await page
        .getByTestId(testIDs.REGISTER_TO_BID.FIRST_NAME)
        .getByLabel("Input Field")
        .fill("test");
      await page
        .getByTestId(testIDs.REGISTER_TO_BID.LAST_NAME)
        .getByLabel("Input Field")
        .click();
      await page
        .getByTestId(testIDs.REGISTER_TO_BID.LAST_NAME)
        .getByLabel("Input Field")
        .fill("test");
      await page
        .getByTestId("modalRegisterToBid")
        .getByTestId(testIDs.REGISTER_TO_BID.PHONE_NUMBER)
        .getByLabel("Input Field")
        .click();
      await page
        .getByTestId("modalRegisterToBid")
        .getByTestId(testIDs.REGISTER_TO_BID.PHONE_NUMBER)
        .getByLabel("Input Field")
        .fill("2124567890");
      await page
        .getByTestId("modalRegisterToBid")
        .getByRole("button", { name: "Register To Bid" })
        .click();
      const text = page.getByText("Successfully registered to bid");
      await expect(text).toBeVisible();
    }
  });
});
