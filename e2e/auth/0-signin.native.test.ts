import { by, element, waitFor } from "detox";

import { openApp } from "../utils/openApp.native";

const email = process.env.EXPO_PUBLIC_TESTING_ACCOUNT_EMAIL as string;
const password = process.env.EXPO_PUBLIC_TESTING_ACCOUNT_PASSWORD as string;

describe("Signin", () => {
  beforeAll(async () => {
    await openApp();
  });

  it("Home screen", async () => {
    await waitFor(element(by.text("Probstein Auctions")))
      .toBeVisible()
      .withTimeout(20000);
  });

  it("Signin with wrong email", async () => {
    await element(by.id("menuIcon")).tap();
    await element(by.label("Sign in")).tap();
    await element(by.id("emailInput")).typeText("test@wrong.com");
    await element(by.id("passwordInput")).typeText(password);
    await element(by.id("signinSubmit")).tap();
    await element(by.id("signinSubmit")).tap();
    await waitFor(element(by.text("Email is incorrect. Please try again")))
      .toBeVisible()
      .withTimeout(5000);
  });

  it("Signin with missing email", async () => {
    await element(by.id("emailInput")).replaceText("");
    await element(by.id("passwordInput")).replaceText(password);
    await waitFor(element(by.text("Email is required"))).toExist();
  });

  it("Signin with missing password", async () => {
    await element(by.id("emailInput")).replaceText("");
    await element(by.id("emailInput")).replaceText("test@example@com");
    await element(by.id("passwordInput")).replaceText("");
    await waitFor(element(by.text("Password is required"))).toExist();
  });

  it("Signin with wrong email format", async () => {
    await element(by.id("emailInput")).replaceText("");
    await element(by.id("emailInput")).replaceText("test@example@com");
    await element(by.id("passwordInput")).replaceText(password);
    await waitFor(
      element(by.text("Please enter a valid email address"))
    ).toExist();
  });

  it("Signin successfully", async () => {
    await element(by.id("emailInput")).replaceText("");
    await element(by.id("emailInput")).replaceText(email);
    await element(by.id("passwordInput")).replaceText(password);
    await element(by.id("signinSubmit")).tap();
    await waitFor(element(by.text("Probstein Auctions")))
      .toBeVisible()
      .withTimeout(5000);
  });
});
