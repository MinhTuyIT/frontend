import { by, element, waitFor } from "detox";
import { testIDs } from "../testIDs";
import { openApp } from "../utils/openApp.native";
const email = process.env.EXPO_PUBLIC_TESTING_ACCOUNT_EMAIL as string;
describe("Forgot password", () => {
  beforeAll(async () => {
    await openApp();
  });

  it("5.1 Resend Verification Code with Incorrect Correct Email", async () => {
    await element(by.id("menuIcon")).tap();
    await element(by.label("Sign in")).tap();
    await element(by.label("Forgot Password?")).tap();
    await element(by.id(testIDs.AUTH.EMAIL_RESET_INPUT)).typeText(
      "test@wrong.com"
    );
    await element(by.id(testIDs.AUTH.SEND_RESET_LINK_BUTTON)).tap();
    await element(by.id(testIDs.AUTH.SEND_RESET_LINK_BUTTON)).tap();

    await waitFor(
      element(by.label("There has been an error, please try again"))
    )
      .toBeVisible()
      .withTimeout(5000);
  });

  it("5.2 Resend Verification Code with Correct Email", async () => {
    await element(by.id(testIDs.AUTH.EMAIL_RESET_INPUT)).replaceText(email);
    await element(by.id(testIDs.AUTH.SEND_RESET_LINK_BUTTON)).tap();
    await waitFor(element(by.id(testIDs.AUTH.EMAIL_SENT_SCREEN)))
      .toBeVisible()
      .withTimeout(10000);
  });
});
