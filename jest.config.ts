import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./", // path to your Next.js app
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",
};

module.exports = createJestConfig(customJestConfig);
