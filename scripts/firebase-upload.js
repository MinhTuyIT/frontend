const { execSync } = require("child_process");

// Adjust paths and app id according to your needs
const androidApkPath = "./path-to-your-apk-file.apk";
const iosIpaPath =
  "./builds/application-643081df-8f46-4494-8b7d-13fa48e4d3c5.ipa";
const appId = "1:880999565759:android:9ac7e2d290eb343f9f790a";

const testers = "emails-of-testers"; // Separate multiple emails with commas
const groups = "qc-probstien"; // Specify your tester group

try {
  console.log("Uploading APK to Firebase App Distribution...");
  //   execSync(
  //     `firebase appdistribution:distribute ${androidApkPath} --app ${appId} --groups ${groups} `
  //   );

  console.log("Uploading IPA to Firebase App Distribution...");
  execSync(
    `firebase appdistribution:distribute ${iosIpaPath} --app ${appId} --groups ${groups}`
  );

  console.log("Upload successful!");
} catch (error) {
  console.error("Failed to upload to Firebase App Distribution:", error);
}
