var rule = {
  meta: {
    type: "problem",
    docs: {
      description: "禁止跨 MPA 子目录引用",
      category: "Best Practices",
    },
    messages: {
      noCrossMpaImports:
        "不允许引用其他 MPA 子目录 ({{ importPath }}) 的内容，当前目录: {{ currentDir }}",
    },
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        const importPath = node.source.value;
        const currentFilePath = context.getFilename();
        // 检查是否是 mpa 相关的导入
        if (!importPath.includes("/mpa/")) {
          return;
        }

        // 获取当前文件的 mpa 子目录
        const currentMpaMatch = currentFilePath.match(/[/\\]mpa[/\\]([^/\\]+)/);
        if (!currentMpaMatch) {
          context.report({
            node,
            messageId: "noCrossMpaImports",
            data: {
              importPath: importPath,
              currentDir: currentFilePath,
            },
          });
          return;
        }
        const currentMpaDir = currentMpaMatch[1];

        // 获取导入路径的 mpa 子目录
        const importMpaMatch = importPath.match(/[/\\]mpa[/\\]([^/\\]+)/);
        if (!importMpaMatch) {
          return;
        }
        const importMpaDir = importMpaMatch[1];

        // 如果不是同一个子目录，报错
        if (currentMpaDir !== importMpaDir) {
          context.report({
            node,
            messageId: "noCrossMpaImports",
            data: {
              importPath: importPath,
              currentDir: currentMpaDir,
            },
          });
        }
      },
    };
  },
};
module.exports = {
  configs: {
    recommended: {
      plugins: ["mpa"],
      rules: {
        "mpa/no-cross-mpa-imports": "error",
      },
    },
  },
  rules: {
    "no-cross-mpa-imports": rule,
  },
};
