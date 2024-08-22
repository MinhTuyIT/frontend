const stage = process.env.STAGE ?? "dev";
const pjson = require("./package.json");
const addendum = stage === "production" || stage === "prod" ? "" : stage;
const version = pjson.version;
const projectId = "a74010ee-6edd-42d7-b79d-412886613917";
const bundleIdentifier = "com.probstein.app";
const appName = "Probstein";
const scheme = "probstein";
let buildNumber = parseInt(version.replace(/\./g, ""), 10);
const branchKey = "key_test_krlLOOeVVh6al5f4fUE9EnlgEvjWsmZM";
const googleApiKey = "";
const branchAltAppLink = "t79dl-alternate.test-app.link";
const branchAppLink = "t79dl.test-app.link";

const appUrl =
  stage === "production" || stage === "prod"
    ? "https://app.xxxxxxx.com/"
    : `https://app.${stage}.xxxxxxx.com/`;

if (buildNumber < 1000) {
  buildNumber = parseInt(`${buildNumber.toString()}00`, 10);
}

if (buildNumber < 10000) {
  buildNumber = parseInt(`${buildNumber.toString()}0`, 10);
}

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
        "@stripe/stripe-react-native",
        {
          merchantIdentifier: "merchant.com.yourapp.identifier",
          enableGooglePay: false,
        },
      ],
    ],
  };
};
