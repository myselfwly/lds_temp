module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "ci",
        "feat",
        "fix",
        "style",
        "chore",
        "perf",
        "docs",
        "refactor",
        "test",
      ],
    ],
  },
};
