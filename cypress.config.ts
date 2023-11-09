import { defineConfig } from "cypress";

export default defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/integration',
    overwrite: false,
    html: true,
    json: true,
  },
  e2e: {
    "chromeWebSecurity": false,
    baseUrl: "https://www.sapfioneer.com/",
    },
});
