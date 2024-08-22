// Learn more https://docs.expo.io/guides/customizing-metro
// const { getDefaultConfig } = require("expo/metro-config");
const { getSentryExpoConfig } = require("@sentry/react-native/metro");

// const config = getDefaultConfig(__dirname);
const config = getSentryExpoConfig(__dirname);
config.maxWorkers = 2;
config.resolver.sourceExts = [
  ...config.resolver.sourceExts,
  ...["cjs", "json", "mjs"],
];

module.exports = config;
