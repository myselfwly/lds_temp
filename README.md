# 鲁大师 PC 项目模板（单仓版）

## 技术栈
React + TypeScript + Vite + TailwindCSS

## 目录结构
```
.
├─ docs/                  # 业务/设计文档示例
├─ public/                # 静态资源（favicon、polyfill 等）
├─ src/
│  ├─ api/                # 接口封装
│  ├─ assets/             # 静态资源
│  ├─ bridge/             # 客户端桥接事件（multiEntry=true 时会迁移到 src/mpa/main/bridge）
│  ├─ client/             # 客户端调用封装（common/method/storage）
│  ├─ components/         # 复用组件
│  ├─ constants/          # 常量
│  ├─ services/           # 统计、上传等服务
│  ├─ pages/              # MPA Page 模板（multiEntry=true 时生效）
│  ├─ views/              # SPA 页面模板（根据 useRoutes 使用 withRoute/noRoute）
│  ├─ types/、utils/      # 类型声明与工具函数
│  └─ App.tsx / index.tsx # 入口
├─ encrypt-bundler.config.js
├─ lint-staged.config.cjs / lop.config.js
├─ package.json
├─ tsconfig*.json
└─ vite.config.ts
```

## 常用脚本
| 命令 | 说明 |
| --- | --- |
| `yarn dev` | 开发模式 |
| `yarn build` | 生产构建 |
| `yarn build_offline` | 构建 + `@lds/encrypt-bundler` 加密 |
| `yarn preview` | 预览构建产物 |
| `yarn lint` / `yarn lint-fix` | 代码规范（Biome 或 ESLint） |
| `yarn commit` | 使用 `git-cz` 规范化提交 |

## 发布流程
- **离线包**：`yarn build_offline`，确保 `encrypt-bundler.config.js` 中配置好输出名称与 key；必要时在 Jenkins 侧处理客户端离线加解密。
- **在线页面**：`yarn build` 后，通过 `@lds/upload` 根据 `lop.config.js` 上传到 OSS，并部署 HTML 到业务服务器。

## 客户端兼容 & 日志
- 当前客户端基线为 `CEF 69`（等效 Chrome 69），引入第三方脚本需关注兼容性，必要时自带 polyfill。
- 客户端日志位于：
  - 安装目录 `log/<app>.log`：记录客户端层面操作。
  - `%appdata%/JsBasic/log/<app>.js_basic.log`：记录 `JsBasic` 模块调用链，排查桥接问题时首选。

## 搭配 `pc-cli` 的可用命令
| 命令 | 作用 |
| --- | --- |
| `pc-cli create` | 依据 `cli-config.js` 重新渲染本模板。若 `multiEntry=true`，会把 `src/views` 拆分到 `src/mpa/main`。 |
| `pc-cli mpa --name foo` | `multiEntry=true` 时可用，在 `src/mpa/foo` 下生成新的入口结构，并把 `foo` 加到 `vite.config.ts` 的 `pages` 和 `historyApiFallback`。 |
| `pc-cli add --packageName name --title title` | 仅当 `cli-config.js.lerna=true` 时可用，会把当前模板作为基线复制到 Lerna Workspace 中。 |

> 执行 `pc-cli create` 会默认安装依赖并执行 `yarn lint-fix`，若需跳过请设置 `SKIP_INSTALL=1`。
