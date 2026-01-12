module.exports = {
  disableEmoji: false,
  format: "{type}{scope}: {emoji}{subject}",
  list: [
    "test",
    "feat",
    "fix",
    "chore",
    "docs",
    "refactor",
    "style",
    "ci",
    "perf",
    "typings",
  ],
  maxMessageLength: 64,
  minMessageLength: 3,
  questions: ["type", "scope", "subject", "body", "breaking"],
  scopes: [],
  types: {
    chore: {
      description: "构建过程或辅助的修改",
      emoji: "🤖",
      value: "chore",
    },
    ci: {
      description: "持续集成",
      emoji: "🎡",
      value: "ci",
    },
    docs: {
      description: "文档（documentation）",
      emoji: "✏️",
      value: "docs",
    },
    feat: {
      description: "新功能（feature）",
      emoji: "🎸",
      value: "feat",
    },
    fix: {
      description: "修补bug",
      emoji: "🐛",
      value: "fix",
    },
    perf: {
      description: "性能优化",
      emoji: "⚡️",
      value: "perf",
    },
    refactor: {
      description: "重构（既不是新增功能，也不是修改bug的代码变动）",
      emoji: "💡",
      value: "refactor",
    },
    release: {
      description: "发版（创建一个发布提交）",
      emoji: "🏹",
      value: "release",
    },
    style: {
      description: "格式（不影响代码运行的变动）",
      emoji: "💄",
      value: "style",
    },
    test: {
      description: "增加或修改测试用例",
      emoji: "💍",
      value: "test",
    },
    typings: {
      description: "Typescript 类型错误",
      emoji: "✍️",
      value: "typings",
    },
  },
};
