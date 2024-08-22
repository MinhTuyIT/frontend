import { by, element, expect, waitFor } from "detox";
import { testIDs } from "../testIDs";
import { openApp } from "../utils/openApp.native";
const email = process.env.EXPO_PUBLIC_TESTING_ACCOUNT_EMAIL as string;
const password = process.env.EXPO_PUBLIC_TESTING_ACCOUNT_PASSWORD as string;
describe("Addresses", () => {
  beforeAll(async () => {
    await openApp();
  });

  it.skip("4.1 The address list is displayed", async () => {
    await element(by.id("menuIcon")).tap();
    await element(by.label("Sign in")).tap();
    await element(by.id("emailInput")).typeText(email);
    await element(by.id("passwordInput")).typeText(password);
    await element(by.id("signinSubmit")).tap();
    await element(by.id("signinSubmit")).tap();
    await waitFor(element(by.id(testIDs.HOME.SCREEN)))
      .toBeVisible()
      .withTimeout(5000);
    await element(by.id(testIDs.TOAST.CLOSE)).tap();
    await element(by.id("menuIcon")).tap();
    await element(by.id(testIDs.DRAWER.ICON_DROPDOWN)).tap();
    await element(by.label("Account")).tap();
    await element(by.id(testIDs.ACCOUNT.DRAWER)).tap();
    await element(by.label("ADDRESSES")).tap();
    await expect(element(by.id(testIDs.ACCOUNT.ADDRESS_ITEM))).toBeVisible();
  });
});
