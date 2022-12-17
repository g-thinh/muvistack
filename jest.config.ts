import nextJest from "next/jest";
import type { Config } from "jest";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig: Config = {
  moduleDirectories: ["node_modules", "src"],
  testEnvironment: "jest-environment-jsdom",
  rootDir: "./",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
  },
  verbose: true,
  clearMocks: true,
};
export default createJestConfig(customJestConfig);
