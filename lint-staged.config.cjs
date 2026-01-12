module.exports = {
  "**/*.ts?(x)": () => "tsc -p tsconfig.json --noEmit",
  "src/**/*.{js,jsx,ts,tsx}": [
    "prettier --write",
    "eslint .eslintrc.cjs --fix",
  ],
  "src/**/*.{json,css,scss,less,md}": ["prettier --write"],
};
