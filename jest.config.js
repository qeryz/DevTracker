/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transformIgnorePatterns: ["node_modules/(?!(react-query|@heroicons)/)"],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": [
      "ts-jest",
      {
        isolatedModules: true,
      },
    ],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
};
