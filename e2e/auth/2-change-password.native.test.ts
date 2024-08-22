import { by, element, waitFor } from "detox";

import { testIDs } from "../testIDs";
import { openApp } from "../utils/openApp.native";

const email = process.env.EXPO_PUBLIC_TESTING_ACCOUNT_EMAIL as string;
const password = process.env.EXPO_PUBLIC_TESTING_ACCOUNT_PASSWORD as string;

describe("Change password", () => {
  beforeAll(async () => {
    await openApp();
  });

  it("Home screen", async () => {
    await waitFor(element(by.text("Probstein Auctions")))
      .toBeVisible()
      .withTimeout(20000);
  });

  it("Signin successfully", async () => {
    await element(by.id("menuIcon")).tap();
    await element(by.label("Sign in")).tap();
    await element(by.id("emailInput")).typeText(email);
    await element(by.id("passwordInput")).typeText(password);
    await element(by.id("signinSubmit")).tap();
    await element(by.id("signinSubmit")).tap();
    await waitFor(element(by.text("Probstein Auctions")))
      .toBeVisible()
      .withTimeout(5000);
  });

  it("Change password with wrong confirm password", async () => {
    await waitFor(element(by.id("menuIcon")))
      .toBeVisible()
      .withTimeout(10000);
    await element(by.id("menuIcon")).tap();
    await element(by.id("accountSelection")).tap();
    await element(by.label("Account")).tap();
    await waitFor(element(by.label("Change password")))
      .toBeVisible()
      .whileElement(by.id(testIDs.DRAWER.SCROLLVIEW))
      .scroll(100, "down", 0.5, 0.5);
    await element(by.label("Change password")).tap();

    await element(by.id(testIDs.ACCOUNT.CHANGE_PW_CURRENT_PW_INPUT)).typeText(
      password
    );
    await element(by.id(testIDs.ACCOUNT.CHANGE_PW_NEW_PW_INPUT)).typeText(
      password
    );
    await element(by.id(testIDs.ACCOUNT.CHANGE_PW_CONFIRM_PW_INPUT)).typeText(
      "test"
    );
    await element(by.label("Change Password")).tap();
    await waitFor(
      element(
        by.label(
          "The passwords you entered do not match. Please ensure that both password fields are the same."
        )
      )
    )
      .toBeVisible()
      .withTimeout(10000);
  });

  it("Change password with wrong old password", async () => {
    await element(by.id(testIDs.ACCOUNT.CHANGE_PW_CURRENT_PW_INPUT)).typeText(
      "test"
    );
    await element(by.id(testIDs.ACCOUNT.CHANGE_PW_NEW_PW_INPUT)).typeText(
      password
    );
    await element(by.id(testIDs.ACCOUNT.CHANGE_PW_CONFIRM_PW_INPUT)).typeText(
      password
    );
    await element(by.label("Change Password")).tap();
    await waitFor(
      element(by.label("Current password is incorrect. Please try again"))
    )
      .toBeVisible()
      .withTimeout(5000);
  });

  it("Change password successfully", async () => {
    await element(by.id(testIDs.ACCOUNT.CHANGE_PW_CURRENT_PW_INPUT)).typeText(
      password
    );
    await element(by.id(testIDs.ACCOUNT.CHANGE_PW_NEW_PW_INPUT)).typeText(
      password
    );
    await element(by.id(testIDs.ACCOUNT.CHANGE_PW_CONFIRM_PW_INPUT)).typeText(
      password
    );
    await element(by.label("Change Password")).tap();
    await waitFor(element(by.text("Password changed successfully.")))
      .toBeVisible()
      .withTimeout(5000);
  });
});
