module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    "eslint:recommended",
    "plugin:react/jsx-runtime",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "simple-import-sort", "prettier", "mpa"],
  rules: {
    "mpa/no-cross-mpa-imports": ["error"],
    "react-refresh/only-export-components": "off",
    "react-hooks/exhaustive-deps": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    semi: ["error", "always"],
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "prefer-const": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",
    "prettier/prettier": "warn",
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: ["**/plugins/vip/**"],
            message:
              "请使用 @vip 别名来引用 vip 插件，例如: import VipMiddleware from '@vip'",
          },
        ],
      },
    ],
    "mpa/no-cross-mpa-imports": "error",
  },
};
