import { by, element, expect, waitFor } from "detox";
import testIDs from "../testIDs";
import { openApp } from "../utils/openApp.native";

const email = process.env.EXPO_PUBLIC_TESTING_ACCOUNT_EMAIL as string;
const password = process.env.EXPO_PUBLIC_TESTING_ACCOUNT_PASSWORD as string;

describe("Sign Out", () => {
  beforeAll(async () => {
    await openApp();
  });

  it("3.1 Click on Cancel button, the modal is closed.", async () => {
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
    await element(by.id(testIDs.HEADER.DROPDOWN_ICON)).tap();

    await element(by.id(testIDs.MENU_LIST.SIGN_OUT_ITEM)).tap();
    await element(by.id(testIDs.AUTH.CANCEL_BUTTON)).tap();
    await expect(element(by.id(testIDs.AUTH.LOGOUT_VIEW))).toNotExist();
  });

  it("3.2 You’ve successfully logged out.", async () => {
    await element(by.id(testIDs.MENU_LIST.SIGN_OUT_ITEM)).tap();
    await element(by.id(testIDs.AUTH.LOGOUT_BUTTON)).tap();
    await waitFor(element(by.text("You’ve successfully logged out"))).toExist();
  });
});
