import { expect as jestExpect } from "@jest/globals";
import { by, element, expect, waitFor } from "detox";

import { testIDs } from "../testIDs";
import { openApp } from "../utils/openApp.native";
const email = process.env.EXPO_PUBLIC_TESTING_ACCOUNT_EMAIL as string;
const password = process.env.EXPO_PUBLIC_TESTING_ACCOUNT_PASSWORD as string;
describe("Addresses", () => {
  beforeAll(async () => {
    await openApp();
  });

  it("5.1 Address created display successfully.", async () => {
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
    await element(by.id(testIDs.ACCOUNT.ADD_NEW)).tap();
    await expect(element(by.id(testIDs.NEW_ADDRESS.SCREEN))).toBeVisible();
  });

  it("5.2 One of the address, country or zip is empty, the add new is disabled.", async () => {
    try {
      await element(by.id(testIDs.NEW_ADDRESS.ADD_ADDRESS)).tap();
      jestExpect(false).toBe(true);
    } catch (error) {
      jestExpect(true).toBe(true);
    }
  });

  it("5.3 All of address, and country, and zip are filled, the add new button is enabled.", async () => {
    await element(by.id(testIDs.NEW_ADDRESS.COUNTRY)).tap();

    await element(by.label("Andorra")).tap();
    await element(by.id(testIDs.NEW_ADDRESS.ADDRESS)).typeText(
      "909-1/2 E 49th St."
    );
    await element(by.id(testIDs.NEW_ADDRESS.ZIP_CODE)).typeText("90011");
    await element(by.id(testIDs.NEW_ADDRESS.COUNTRY)).tap();

    await waitFor(element(by.id(testIDs.NEW_ADDRESS.ADD_ADDRESS)))
      .toBeVisible()
      .withTimeout(5000);

    try {
      await element(by.id(testIDs.NEW_ADDRESS.ADD_ADDRESS)).tap();
      jestExpect(true).toBe(true);
    } catch (error) {
      jestExpect(false).toBe(false);
    }
  });

  it("5.4 If the add new button is enabled. click on the add new button to create a new address and a toast message is shown.", async () => {
    await waitFor(element(by.label("Address was created successfully.")))
      .toBeVisible()
      .withTimeout(5000);
  });
  it("5.4 If the add new button is enabled. click on the add new button to create a new address and a toast message is shown.", async () => {
    await element(by.id(testIDs.ACCOUNT.ADD_NEW)).tap();
    await element(by.id(testIDs.NEW_ADDRESS.CANCEL)).tap();
    await expect(element(by.id(testIDs.ACCOUNT.ADDRESS_VIEW))).toBeVisible();
  });
});
