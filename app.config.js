const stage = process.env.STAGE ?? "dev";
const pjson = require("./package.json");
const addendum = stage === "production" || stage === "prod" ? "" : stage;
const version = pjson.version;
const projectId = "7965451d-3d8a-4bf4-bce1-433776786161";
const bundleIdentifier = "com.probstein.app";
const appName = "Probstein";
const scheme = "probstein";
const buildNumber = 31;
const branchKey = "key_test_krlLOOeVVh6al5f4fUE9EnlgEvjWsmZM";
const googleApiKey = "";
const branchAltAppLink = "t79dl-alternate.test-app.link";
const branchAppLink = "t79dl.test-app.link";

const appUrl =
  stage === "production" || stage === "prod"
    ? "https://app.xxxxxxx.com/"
    : `https://app.${stage}.xxxxxxx.com/`;

export default ({ config }) => {
  return {
    ...config,
    version,
    name: appName + addendum,
    scheme: `${scheme}-${addendum}`,
    runtimeVersion: {
      policy: "sdkVersion",
    },
    android: {
      ...config.android,
      package: `${bundleIdentifier}.${addendum}`,
      versionCode: buildNumber,
      config: {
        branch: {
          apiKey: branchKey,
        },
        googleMaps: {
          apiKey: googleApiKey,
        },
      },
    },
    ios: {
      ...config.ios,
      bundleIdentifier: `${bundleIdentifier}.${addendum}`,
      buildNumber: buildNumber.toString(),
      infoPlist: {
        branch_key: {
          live: branchKey,
        },
      },
      config: {
        googleMapsApiKey: googleApiKey,
      },
      associatedDomains: [
        `applinks:${branchAppLink}`,
        `applinks:${branchAltAppLink}`,
      ],
    },
    updates: {
      ...config.updates,
      url: `https://u.expo.dev/${projectId}`,
    },
    extra: {
      eas: {
        projectId,
      },
    },
    plugins: [
      ...config.plugins,
      [
        "expo-router",
        {
          origin: appUrl,
        },
      ],
      [
        "@config-plugins/detox",
        {
          skipProguard: false,
          subdomains: ["10.0.2.2", "localhost"],
        },
      ],
      [
        "@config-plugins/react-native-branch",
        {
          apiKey: branchKey,
          iosAppDomain: branchAltAppLink,
        },
      ],
      [
        "@config-plugins/detox",
        {
          skipProguard: false,
          subdomains: ["10.0.2.2", "localhost"],
        },
      ],
      [
        "@stripe/stripe-react-native",
        {
          merchantIdentifier: "merchant.com.yourapp.identifier",
          enableGooglePay: false,
        },
      ],
    ],
  };
};
