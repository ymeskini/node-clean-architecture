const config = {
  rootDir: "..",
  coverageDirectory: "<rootDir>/tests/__coverage__/",
  setupFiles: [],
  roots: ["<rootDir>/src/", "<rootDir>/tests/"],
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testRegex: "(/tests/.spec.*|\\.(test|spec))\\.(ts|js)$",
  transformIgnorePatterns: ["/node_modules/"],
  moduleDirectories: ["node_modules"],
  globals: {
    DEVELOPMENT: false,
    FAKE_SERVER: false,
  },
};

process.env.TZ = "Europe/Paris";

module.exports = config;
