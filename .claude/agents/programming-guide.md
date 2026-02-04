---
name: programming-guide
description: 项目编程指南
color: blue
---
# 项目 AI 编程指南

## 开发环境设置

### 技术栈

- vite 构建
- React 框架
- 包管理 yarn
- 样式 tailwindcss

### 常用命令

- 启动项目： `pm2 start ecosystem.config.cjs`
- 重启项目： `pm2 restart ecosystem.config.cjs`
- 提交代码： `yarn commit`
- 代码检查： `yarn lint-staged`

## 编码规范

### 文件组织

#### 根目录结构

 ```
 lds_temp/
 ├── .claude/                    # Claude Code 配置
 │   ├── agents/                 # 自定义 Agent
 │   └── skills/                 # 自定义技能
 │       ├── api-to-code/        # API 转代码技能
 │       ├── jenkins-build/      # Jenkins 打包技能
 │       ├── open-web/           # 打开网页技能
 │       ├── project-info/       # 项目信息技能
 │       └── tinify-png/         # 图片压缩技能
 ├── .husky/                     # Git hooks
 ├── eslint-plugin-mpa/          # 自定义 ESLint 插件
 ├── public/                     # 静态资源
 │   └── polyfill/               # Polyfill 文件
 ├── script/                     # 构建脚本
 │   ├── build_local/            # 本地构建脚本
 │   └── build_offline/          # 离线包构建脚本
 ├── src/                        # 源代码（详见下方）
 ├── .mcp.json                   # MCP 配置
 ├── CLAUDE.md                   # Claude Code 项目指南
 ├── README.md                   # 项目说明
 ├── cli-config.js               # CLI 配置
 ├── commitlint.config.js        # Commit 规范配置
 ├── encrypt-bundler.*.config.js # 加密打包配置（lds/lenovo/wv）
 ├── package.json                # 项目依赖
 ├── tailwind.config.js          # TailwindCSS 配置
 ├── tsconfig.json               # TypeScript 配置
 ├── tsconfig.node.json          # Node 环境 TS 配置
 ├── vite.config.ts              # Vite 配置
 └── vite.logger.ts              # Vite 日志配置
 ```

#### src/ 源代码结构

##### 核心目录

```
 src/
 ├── mpa/                        # 多页应用入口
 │   └── main/                   # 主入口页面
 │       ├── bridge/             # 客户端桥接
 │       │   └── event/          # 事件处理
 │       │       ├── system.ts   # 系统事件注册
 │       │       └── business.ts # 业务事件处理
 │       ├── store/              # 页面级状态管理
 │       ├── index.html          # HTML 模板
 │       ├── index.tsx           # React 入口
 │       ├── routes.tsx          # 路由配置
 │       └── bridge.ts           # Bridge 初始化
 │
 ├── client/                     # 客户端方法封装
 │   ├── common/                 # 通用方法
 │   ├── storage/                # 存储相关
 │   └── wnd/                    # 窗口控制
 │
 ├── types/                      # TypeScript 类型定义
 │   ├── clientApi.ts            # 客户端 API 类型（GET 请求）
 │   ├── businessEvent.ts        # 业务事件类型（POST 通知）
 │   └── ...                     # 其他类型定义
 │
 ├── utils/                      # 工具函数
 │   ├── clientApi.ts            # 客户端 API 实现
 │   └── ...                     # 其他工具
 │
 ├── plugins/                    # 插件系统
 │   ├── types/                  # 插件类型
 │   └── vip/                    # VIP 插件变体
 │       ├── lds/                # LDS 变体
 │       ├── lenovo/             # Lenovo 变体
 │       └── tools/              # 插件工具
 │
 ├── components/                 # React 组件
 │   └── ui/                     # UI 组件库
 │
 ├── store/                      # 全局状态管理（Zustand）
 │   ├── common/                 # 通用状态
 │   │   └── vip/                # VIP 状态
 │   └── middleware/             # 中间件
 │
 ├── services/                   # 业务服务层
 │
 ├── constants/                  # 常量定义
 │
 ├── lib/                        # 第三方库封装
 │
 ├── assets/                     # 资源文件
 │   └── images/                 # 图片资源
 │
 ├── polyfills/                  # Polyfills（兼容 CEF 69）
 │   └── index.ts                # Polyfill 入口
 │
 └── vite-env.d.ts               # Vite 环境类型
```

### 开发前阅读

#### eslint 配置 了解编码规范

包含.eslintrc.cjs 和 eslint-plugin-mpa

#### 阅读相关打包配置

包含 tsconfig.json 和 vite.config.ts 和 ecosystem.config.cjs 了解项目的配置，包含别名等信息和启动信息

## 编码流程

### 需求确认

#### 文档列表

- 需求文档（PRD文档：.claude/prd/PRD.md）
- 接口文档 （使用 skill: api-to-code， 获取并转化成代码）
- UI文档 (UI文档： .claude/prd/UI.md)

#### 项目初始化

1. 获取需求文档的标题和产品key
2. 用key替换项目中所有的`temp_key`
3. 用标题替换文档中所有的`模板项目`

#### 开发步骤

1. 阅读文档
2. 提出文档需求模糊的地方，让用户完善文档
3. 根据文档制定开发计划（按需求点），并和用户讨论
4. 计划确认，根据开发计划进行开发
5. 每个需求点开发完成，检查逻辑后，没有问题，寻找用户进行验收
6. 验收通过则该需求点完成开始下一个需求，若不通过沟通解决方案，并开发，再验收只到验收通过
7. 完成所有需求点后，我们一起夸赞自己：我真棒！
