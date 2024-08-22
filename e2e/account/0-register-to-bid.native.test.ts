import { by, element, waitFor } from "detox";

import { openApp } from "../utils/openApp.native";

const email = process.env.EXPO_PUBLIC_TESTING_ACCOUNT_EMAIL as string;
const password = process.env.EXPO_PUBLIC_TESTING_ACCOUNT_PASSWORD as string;

describe("Register to bid", () => {
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

  it.skip("Register to bid when no payment method is added", async () => {
    await waitFor(element(by.id("menuIcon")))
      .toBeVisible()
      .withTimeout(10000);
    await element(by.id("menuIcon")).tap();
    await element(by.id("accountSelection")).tap();
    await element(by.label("Account")).tap();
    await element(by.label("Register To Bid")).tap();
    await element(by.label("MM / YY")).typeText("1234");
    await element(by.label("CVC")).atIndex(0).typeText("1234");
    await element(by.label("ZIP")).atIndex(0).typeText("12345");
    await element(by.label("Card number"))
      .atIndex(0)
      .typeText("4242424242424242");
    await element(by.label("Add Card")).tap();
    await waitFor(element(by.label("Credit card was added")))
      .toBeVisible()
      .withTimeout(5000);
  });

  it("Register to bid when at least one payment method is added", async () => {
    await waitFor(element(by.id("menuIcon")))
      .toBeVisible()
      .withTimeout(10000);
    await element(by.id("menuIcon")).tap();
    await element(by.id("accountSelection")).tap();
    await element(by.label("Account")).tap();
    await element(by.label("Register To Bid")).tap();
    await element(by.id("firstNameInput")).typeText("test");
    await element(by.id("lastNameInput")).typeText("test");
    await element(by.id("modalRegisterToBid")).scrollTo("bottom");
    await element(by.id("phoneNumberInput")).typeText("231231231231");
    await element(by.label("Register To Bid")).tap();
    await waitFor(element(by.label("Successfully registered to bid")))
      .toBeVisible()
      .withTimeout(5000);
  });
});
