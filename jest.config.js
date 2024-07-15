const nextJest = require("next/jest");

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    // ...
    "^@/components/(.*)$": "<rootDir>/components/$1",
    "^antd/es/(.*)$": "<rootDir>/node_modules/antd/lib/$1",
    "^rc-util/es/(.*)$":
      "<rootDir>/node_modules/@ant-design/pro-layout/node_modules/rc-util/lib/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config);
