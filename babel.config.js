const shouldInstrumentCode = "INSTRUMENT_CODE" in process.env;

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      shouldInstrumentCode && "istanbul",
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@/config": "./config",
            "@/providers": "./providers",
            "@/hooks": "./hooks",
            "@/features": "./features",
            "@/generated": "./generated",
            "@/components": "./components",
            "@/utils": "./utils",
            "@/assets": "./assets",
          },
        },
      ],
      "@babel/plugin-proposal-export-namespace-from",
      "react-native-reanimated/plugin",
    ].filter(i => !!i),
  };
};
