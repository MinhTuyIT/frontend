import { by, element, waitFor } from "detox";
import { getRandomText } from "../utils";

import { openApp } from "../utils/openApp.native";

const email = process.env.EXPO_PUBLIC_TESTING_ACCOUNT_EMAIL as string;
const password = process.env.EXPO_PUBLIC_TESTING_ACCOUNT_PASSWORD as string;

describe("Signup", () => {
  beforeAll(async () => {
    await openApp();
  });

  it("Home screen", async () => {
    await waitFor(element(by.text("Probstein Auctions")))
      .toBeVisible()
      .withTimeout(20000);
  });

  it("Signup with missing email", async () => {
    await element(by.id("menuIcon")).tap();
    await element(by.label("Sign in")).tap();
    await element(by.label("Sign up")).tap();
    await element(by.id("emailInput")).typeText("");
    await element(by.id("passwordInput")).typeText(password);
    await element(by.id("signupSubmit")).tap();
    await element(by.id("signupSubmit")).tap();
    await waitFor(element(by.text("Email is required"))).toExist();
  });

  it("Signup with missing password", async () => {
    await element(by.id("emailInput")).replaceText("");
    await element(by.id("emailInput")).replaceText("test@example@com");
    await element(by.id("passwordInput")).replaceText("");
    await waitFor(element(by.text("Password is required"))).toExist();
  });

  it("Signup with wrong email format", async () => {
    await element(by.id("emailInput")).replaceText("");
    await element(by.id("emailInput")).replaceText("test@example@com");
    await element(by.id("passwordInput")).replaceText(password);
    await waitFor(
      element(by.text("Please enter a valid email address"))
    ).toExist();
  });

  it("Signup with existed email", async () => {
    await element(by.id("emailInput")).replaceText("");
    await element(by.id("emailInput")).replaceText(email);
    await element(by.id("passwordInput")).replaceText(password);
    await waitFor(
      element(by.text("Email already exists. Please choose another"))
    ).toExist();
  });

  it("Signup successfully", async () => {
    await element(by.id("emailInput")).replaceText("");
    await element(by.id("emailInput")).replaceText(
      `${getRandomText(5)}${email}`
    );
    await element(by.id("passwordInput")).replaceText(password);
    await element(by.id("signupSubmit")).tap();
    await waitFor(element(by.text("Your account is created successfully")))
      .toBeVisible()
      .withTimeout(5000);
  });
});
