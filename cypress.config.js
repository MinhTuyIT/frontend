/* eslint-disable */
const { defineConfig } = require("cypress");
const { takeSnapshots, findLeaks } = require("@memlab/api");

module.exports = defineConfig({
  // setupNodeEvents can be defined in either
  // the e2e or component configuration
  projectId: "h6t3ks", //TODO: Move to environment variable
  defaultCommandTimeout: 30000,
  chromeWebSecurity: false,
  experimentalMemoryManagement: true,
  numTestsKeptInMemory: 0,
  experimentalInteractiveRunEvents: true,
  viewportWidth: 1500,
  viewportHeight: 1200,
  e2e: {
    setupNodeEvents(on, config) {
      require("@cypress/code-coverage/task")(on, config);
      // include any other plugin code...

      // It's IMPORTANT to return the config object
      // with any changed environment variables
      on("task", {
        checkMemory(url) {
          (async () => {
            const scenario = {
              url: () => url,
            };

            const result = await takeSnapshots({ scenario });

            findLeaks(result);
          })();

          return null;
        },
      });
      return config;
    },
    baseUrl: "http://localhost:3000",
  },
  env: {
    apiUrl: "https://api-dev.whatshouldido.com",
    baseUrl: "http://localhost:3000",
  },
  retries: {
    runMode: 2,
    openMode: 1,
  },
});
/* eslint-enable */
