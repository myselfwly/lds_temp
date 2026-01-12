import { transformSync } from "@babel/core";
import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import { readFileSync } from "fs";
import { extname, posix, resolve } from "path";
import { defineConfig, HtmlTagDescriptor } from "vite";
import mpa from "vite-plugin-mpa-plus";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vitest-tsconfig-paths";

import logger from "./vite.logger";
// 预处理 polyfill
function processPolyfill(isDev: boolean) {
  const polyfillContent = readFileSync("./src/polyfills/index.ts", "utf-8");
  const polyfillClearCache = isDev
    ? readFileSync("./src/polyfills/clearCache.ts", "utf-8")
    : "";
  const origin_str = polyfillContent + "\n" + polyfillClearCache;
  const result = transformSync(origin_str, {
    presets: [
      ["@babel/preset-typescript"],
      [
        "@babel/preset-env",
        {
          targets: {
            chrome: "49",
            firefox: "52",
            ie: "11",
            edge: "17",
            safari: "11.1",
          },
          useBuiltIns: "entry",
          corejs: "3.32",
          modules: "umd",
        },
      ],
    ],
    filename: "index.ts",
  });
  return result.code;
}

// 创建通用的 inject 配置
function createInjectConfig(processedPolyfill: string): {
  tags: HtmlTagDescriptor[];
} {
  return {
    tags: [
      {
        tag: "script",
        children: processedPolyfill,
        injectTo: "head-prepend",
      },
    ],
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isLog = process.env.LOG === "true";
  const processedPolyfill = processPolyfill(command === "serve");
  const commonInject = createInjectConfig(processedPolyfill);
  // 定义浏览器目标，用于转译配置

  const plugins = [
    react({
      babel: {
        plugins: [
          "@babel/plugin-proposal-class-properties",
          "@babel/plugin-proposal-optional-chaining",
          "@babel/plugin-proposal-nullish-coalescing-operator",
        ],
      },
      // 确保 react-refresh 的运行时注入代码也被转译
      jsxRuntime: "automatic",
    }),
    svgr({
      include: "**/*.svg?react",
    }),
    mode === "wv"
      ? undefined
      : legacy({
          targets: ["chrome >= 49"],
          additionalLegacyPolyfills: ["core-js/proposals/global-this"],
          renderModernChunks: false,
        }),
    tsconfigPaths({ loose: true }),
    mpa({
      pages: {
        main: {
          entry: "src/mpa/main/index.tsx",
          filename: "/index.html",
          template: "src/mpa/main/index.html",
          inject: commonInject,
        },
      },
      historyApiFallback: {
        rewrites: [
          {
            from: /^\/$/,
            to: posix.join("/", "/src/mpa/main/index.html"),
          },
        ],
      },
    }),
  ].filter((item) => !!item);
  const base = command === "build" && mode === "wv" ? "/build" : "/";

  return {
    server: {
      host: "0.0.0.0",
      port: 5174,
      proxy: {
        "/example": {
          target: "https://example.ludashi.com",
          changeOrigin: true,
        },
      },
    },
    base, // 在线业务需要配置生产环境的 cdn 地址
    plugins,
    // 禁用原生 ESM 开发模式，强制转译所有代码

    build: {
      // 设置构建目标为 ES2015，确保兼容低版本浏览器
      target: "es2015",
      assetsDir: "static",
      outDir: "build",
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            const ext = extname(assetInfo?.name || "");
            if (ext === ".css") {
              return "static/css/[name]-[hash][extname]";
            }
            return "static/media/[name]-[hash][extname]";
          },
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
        },
      },
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
        "@vip": vipPlugins(mode),
      },
    },

    customLogger: isLog ? logger : undefined,
  };
});

const vipPlugins = (mode: string) => {
  return resolve(__dirname, "src/plugins/vip/lds");
};
