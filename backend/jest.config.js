/** @type {import("ts-jest").JestConfigWithTsJest} */
const config = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["./src/__tests__"],
  transform: {},
  testRegex: "(__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  verbose: true,
};

export default config;
