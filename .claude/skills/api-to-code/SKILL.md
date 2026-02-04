---
name: api-to-code
description: 通过 API 文档将API文档转化为代码。
---

# api-to-code
MCP Name: api_mcp_PROJECT_ID（PROJECT_ID为创建mcp是的变量）
使用 Apifox MCP 工具（api_mcp_PROJECT_ID）获取 API 信息，并将 API 转化为代码。

## 可用的 MCP 工具

### 1. 读取 OpenAPI 规范文件
```
mcp__api_mcp_PROJECT_ID__read_project_oas_271gff
```
读取"默认模块"的 OpenAPI Spec 文件内容，获取 API 接口列表和基本信息。

**参数：**
- `_`: 空字符串（必填但无实际作用）

**返回：**
- OpenAPI 3.1.0 规范的 JSON 对象
- 包含 `paths` 对象，列出所有接口路径
- 接口详情可能通过 `$ref` 引用外部文件

### 2. 读取引用的资源文件
```
mcp__api_mcp_PROJECT_ID__read_project_oas_ref_resources_271gff
```
读取 OpenAPI Spec 文件中 `$ref` 引用的外部文件内容，获取接口的完整定义。

**参数：**
- `path`: 字符串数组，包含要读取的 `$ref` 路径
  - 例如：`["paths/_ListFeatureStatus.json"]`
  - 可以同时获取多个文件：`["paths/_get_pet.json", "paths/_get_order.json"]`

**返回：**
- 对象，key 为文件路径，value 为文件内容（JSON 字符串）

### 3. 刷新 API 文档
```
mcp__api_mcp_PROJECT_ID__refresh_project_oas_271gff
```
从服务器重新下载最新的"默认模块"的 OpenAPI Spec 文件内容。

**参数：**
- `_`: 空字符串（必填但无实际作用）

**使用场景：**
- API 文档已更新，需要获取最新版本
- 本地缓存的文档可能过期

## 使用流程

### 步骤 1：读取 OpenAPI 规范
首先调用 `read_project_oas` 获取 API 接口列表：

```typescript
// 调用工具
mcp__api_mcp_PROJECT_ID__read_project_oas_271gff({ _: "" })

// 返回示例
{
  "openapi": "3.1.0",
  "info": {
    "title": "默认模块",
    "version": "1.0.0"
  },
  "paths": {
    "/ListFeatureStatus": {
      "$ref": "/paths/_ListFeatureStatus.json",
      "get": {
        "summary": "ListFeatureStatus"
      }
    }
  }
}
```

从返回结果中可以获取：
- 接口数量：统计 `paths` 对象中ey 数量
- 接口路径：`paths` 对象的 key（如 `/ListFeatureStatus`）
- HTTP 方法：每个路径下的方法（如 `get`、`post`）
- 接口摘要：`summary` 字段
- 引用文件：`$ref` 字段指向的外部文件路径

### 步骤 2：读取接口详细定义
如果接口使用了 `$ref` 引用外部文件，需要调用 `read_project_oas_ref_resources` 获取完整定义：

```typescript
// 调用工具
mcp__api_mcp_PROJECT_ID__read_project_oas_ref_resources_271gff({
  path: ["paths/_ListFeatureStatus.json"]
})

// 返回示例
{
  "paths/_ListFeatureStatus.json": "{
    \"get\": {
      \"summary\": \"ListFeatureStatus\",
      \"description\": \"列出功能是否已经点击过了的状态\",
      \"parameters\": [...],
      \"responses\": {...}
    }
  }"
}
```

从详细定义中可以获取：
- 接口描述：`description` 字段
- 请求参数：`parameters` 数组
  - 参数名称、位置（query/path/body）、类型、是否必填
- 响应定义：`responses` 对象
  - 状态码、响应体结构、字段类型和说明

### 步骤 3：分析接口信息
解析获取到的接口信息，提取关键数据：

1. **接口基本信息**
   - 路径：`/ListFeatureStatus`
   - 方法：`GET`
   - 描述：`列出功能是否已经点击过了的状态`

2. **请求参数**
   ```typescript
   {
     name: "key",
     in: "query",
     required: false,
     schema: {
       type: "array",
       items: { type: "string" }
     },
     description: "唯一功能key，不允许重复"
   }
   ```

3. **响应结构**
   ```typescript
   {
     "200": {
       content: {
         "application/json": {
           schema: {
             type: "object",
             properties: {
               clean_garbage: {
                 type: "object",
                 properties: {
                   clicked: { type: "number", enum: [0, 1] }
                 }
               }
             }
           }
         }
       }
     }
   }
   ```

## 使用示例

查看项目中有多少接口：

```bash
# 用户输入
使用 test_ai_mcp 查看有多少接口

# Claude 执行步骤
1. 调用 mcp__api_mcp_PROJECT_ID__read_project_oas_271gff 读取 OpenAPI 规范
2. 统计 paths 对象中的接口数量
3. 调用 mcp__api_mcp_PROJECT_ID__read_project_oas_ref_resources_271gff 读取详细定义
4. 展示接口列表和详细信息
```

## 注意事项

1. **$ref 引用**：OpenAPI 规范中的 `$ref` 字段指向外部文件，需要额外调用 `read_project_oas_ref_resources` 获取完整内容
2. **并行读取**：可以在一次调用中读取多个引用文件，提高效率
3. **文档更新**：如果 API 文档已更新，使用 `refresh_project_oas` 刷新本地缓存
4. **JSON 解析**：引用文件的内容是 JSON 字符串，需要解析后才能使用

## 下一步：生成代码

获取到 API 信息后，按照以下步骤生成代码。

### 步骤 4：生成 TypeScript 类型定义

在 `src/types/clientApi.ts` 中生成类型定义。

#### 4.1 生成请求参数类型

根据 OpenAPI 的 `parameters` 数组生成 `{接口名}Params` 接口：

```typescript
// ListFeatureStatus Type Start

export interface ListFeatureStatusParams {
  /** 唯一功能key，不允许重复 */
  key?: string[];  // required: false，所以添加 ?
}
```

**生成规则：**
1. 接口名使用 PascalCase：`{接口名}Params`
2. 遍历 `parameters` 数组，为每个参数生成字段
3. 字段名：参数的 `name` 字段
4. 字段类型：根据 `schema.type` 映射（见类型映射表）
5. 可选性：如果 `required: false` 或未定义，添加 `?`
6. 注释：使用 `/** */` 格式，内容来自 `description` 字段

**类型映射表：**
| OpenAPI Type | TypeScript Type |
|--------------|-----------------|
| `string` | `string` |
| `number` / `integer` | `number` |
| `boolean` | `boolean` |
| `array` | `type[]`（type 为 items.type） |
| `object` | `{ [key: string]: type }` 或嵌套接口 |

#### 4.2 生成响应数据类型

根据 `responses.200.content.application/json.schema` 生成 `{接口名}Response` 接口：

```typescript
export interface ListFeatureStatusResponse {
  /** 功能是否已经点击过了 */
  [key: string]: {
    /** 是否已经点击过了 */
    clicked: NUMBER_BOOLEAN;
  };
}

// ListFeatureStatus Type End
```

**生成规则：**
1. 接口名使用 PascalCase：`{接口名}Response`
2. 根据 schema 的 `type` 和 `properties` 生成字段
3. 如果是动态 key 的对象，使用索引签名 `[key: string]: type`
4. 如果是固定字段，直接定义字段
5. 嵌套对象可以内联定义或提取为独立接口
6. 如果字段是 `enum: [0, 1]` 且描述为布尔值，使用 `NUMBER_BOOLEAN` 枚举

**特殊类型处理：**
- **数字布尔值**：如果 `type: "number"` 且 `enum: [0, 1]`，使用 `NUMBER_BOOLEAN` 枚举
- **数组**：使用 `type[]` 格式
- **嵌套对象**：递归处理，可以内联或提取为独立接口

#### 4.3 添加类型区块标记

使用注释标记类型定义的开始和结束：

```typescript
// ListFeatureStatus Type Start
export interface ListFeatureStatusParams { ... }
export interface ListFeatureStatusResponse { ... }
// ListFeatureStatus Type End
```

这样便于后续维护和更新。

### 步骤 5：生成 API 请求函数

在 `src/utils/client.ts` 中生成 API 函数。

#### 5.1 生成函数代码

```typescript
import { Execute } from "@lds/cef-bridge";

import {
  ListFeatureStatusParams,
  ListFeatureStatusResponse,
} from "../types/clientApi";

/**
 * 列出功能是否已经点击过了的状态
 * @param params 请求参数
 * @param {string[]} params.key 唯一功能key，不允许重复
 * @returns 响应结果
 */
export const listFeatureStatus = async (params: ListFeatureStatusParams) => {
  try {
    const res = await Execute<ListFeatureStatusResponse>(
      "ListFeatureStatus",
      true,
      JSON.stringify(params) ?? "",
    );
    return res;
  } catch (error) {
    return Promise.reject(error as Error);
  }
};
```

**生成规则：**

1. **导入依赖**
   - 从 `@lds/cef-bridge` 导入 `Execute`
   - 从 `../types/clientApi` 导入对应的类型定义

2. **JSDoc 注释**
   - 第一行：接口功能描述（从 `description` 字段获取）
   - `@param params`：参数说明
   - `@param {type} params.xxx`：每个参数字段的详细说明（从 `parameters` 数组获取）
   - `@returns`：返回值说明

3. **函数签名**
   - 函数名：使用 camelCase（小驼峰），从接口名转换而来
     - 例如：`ListFeatureStatus` → `listFeatureStatus`
   - 参数类型：`params: {接口名}Params`
   - 返回类型：由 `Execute` 的泛型自动推断

4. **函数体**
   - 使用 `try-catch` 包裹
   - 调用 `Execute<ResponseType>` 方法：
     - 第一个参数：接口名称字符串（PascalCase，与后端接口名对应）
     - 第二个参数：`true`（固定值）
     - 第三个参数：`JSON.stringify(params) ?? ""`
   - 错误处理：`catch` 块中返回 `Promise.reject(error as Error)`

#### 5.2 函数命名转换

从 OpenAPI 接口名转换为函数名：

1. 优先使用 `operationId` 字段
2. 如果没有 `operationId`，使用 `summary` 字段
3. 如果都没有，从路径生成（如 `/list-feature-status` → `listFeatureStatus`）
4. 转换为 camelCase（小驼峰）

**示例：**
- `ListFeatureStatus` → `listFeatureStatus`
- `GetUserInfo` → `getUserInfo`
- `CreateOrder` → `createOrder`

### 步骤 6：代码格式化和验证

生成代码后，确保符合项目规范：

1. **ESLint 规则**
   - 使用双引号
   - 添加分号
   - 正确的缩进（2 空格）
   - 导入语句排序（使用 `simple-import-sort`）

2. **类型检查**
   - 确保所有类型定义正确
   - 参数和返回值类型匹配

3. **注释完整性**
   - 函数必须有 JSDoc 注释
   - 类型字段必须有注释

4. **浏览器兼容性**
   - 代码需要兼容 CEF 69（Chrome 69）
   - 使用 ES2015 语法

## 完整示例

### 输入：OpenAPI 接口定义

```json
{
  "get": {
    "summary": "ListFeatureStatus",
    "description": "列出功能是否已经点击过了的状态",
    "parameters": [
      {
        "name": "key",
        "in": "query",
        "description": "唯一功能key，不允许重复",
        "required": false,
        "schema": {
          "type": "array",
          "items": { "type": "string" }
        }
      }
    ],
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "clean_garbage": {
                  "type": "object",
                  "properties": {
                    "clicked": {
                      "type": "number",
                      "enum": [0, 1],
                      "description": "客户端的一个生命周期内0:没有点击过1:点击过了"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

### 输出：生成的代码

**src/types/clientApi.ts**

```typescript
export enum NUMBER_BOOLEAN {
  FALSE = 0,
  TRUE = 1,
}

// ListFeatureStatus Type Start

export interface ListFeatureStatusParams {
  /** 唯一功能key，不允许重复 */
  key?: string[];
}

export interface ListFeatureStatusResponse {
  /** 功能是否已经点击过 [key: string]: {
    /** 客户端的一个生命周期内0:没有点击过1:点击过了 */
    clicked: NUMBER_BOOLEAN;
  };
}

// ListFeatureStatus Type End
```

**src/utils/client.ts**

```typescript
import { Execute } from "@lds/cef-bridge";

import {
  ListFeatureStatusParams,
  ListFeatureStatusResponse,
} from "../types/clientApi";

/**
 * 列出功能是否已经点击过了的状态
 * @param params 请求参数
 * @param {string[]} params.key 唯一功能key，不允许重复
 * @returns 响应结果
 */
export const listFeatureStatus = async (params: ListFeatureStatusParams) => {
  try {
    const res = await Execute<ListFeatureStatusResponse>(
      "ListFeatureStatus",
      true,
      JSON.stringify(params) ?? "",
    );
    return res;
  } catch (error) {
    return Promise.reject(error as Error);
  }
};
```

## 使用技巧

### 批量生成

如果有多个接口需要生成，可以：

1. 一次性读取所有接口的 `$ref` 文件
2. 批量生成类型定义
3. 批量生成 API 函数
4. 统一格式化代码

### 增量更新

如果接口已存在但需要更新：

1. 使用类型区块标记（`// {接口名} Type Start/End`）定位现有代码
2. 替换整个区块的内容
3. 保留其他接口的代码不变

### 错误处理

生成代码时可能遇到的问题：

1. **缺少 description**：使用接口名或 summary 作为默认描述
2. **复杂的嵌套结构**：考虑提取为独立接口
3. **特殊字符**：字段名包含特殊字符时，使用引号包裹
4. **类型冲突**：检查是否有重名的类型定义

## 注意事项

1. **命名规范**
   - 函数名：camelCase（小驼峰）
   - 类型名：PascalCase（大驼峰）
   - 接口名字符串：PascalCase（传给后端）

2. **类型安全**
   - 确保参数类型和响应类型正确
   - 使用枚举类型代替魔法数字

3. **代码复用**
   - 相同的类型定义可以提取为公共类型
   - `NUMBER_BOOLEAN` 等通用枚举只需定义一次

4. **文档完整性**
   - 所有函数和类型都要有注释
   - 注释内容来自 OpenAPI 的 description 字段

5. **兼容性**
   - 代码需要兼容 CEF 69（Chrome 69）
   - 避免使用过新的 JavaScript 特性

## POST 请求支持

POST 或其他非 GET 请求在本项目中用于**客户端通知前端**，无需返回值。

### 实现位置

- **类型定义**：`src/types/businessEvent.ts`
- **事件处理**：`src/mpa/main/bridge/event/business.ts`
- **事件注册**：`src/mpa/main/bridge/event/system.ts`

### 实现步骤

#### 1. 定义类型（src/types/businessEvent.ts）

参考文件中的示例，定义事件参数类型：

```typescript
// {事件名} 类型定义 Start

export enum {事件名}SelfIdEnum {
  /** 类型1说明 */
  TYPE_1 = 1,
  /** 类型2说明 */
  TYPE_2 = 2,
}

export interface {事件名}Type1Params {
  selfId: {事件名}SelfIdEnum.TYPE_1;
  content: {
    field1: string;
  };
  pop_data: string;
}

export type {事件名}Params = {事件名}Type1Params | {事件名}Type2Params;

// {事件名} 类型定义 End
```

#### 2. 实现事件处理（src/mpa/main/bridge/event/business.ts）

参考文件中的示例，实现事件回调：

```typescript
import { TEvent } from "@lds/bridge-modal";
import { {事件名}Params, {事件名}SelfIdEnum } from "~/types/businessEvent";

/** 事件说明 */
export const ev名}: TEvent = {
  eventName: "{事件名}",
  callback: (json = "") => {
    const params: {事件名}Params = JSON.parse(json);
    switch (params.selfId) {
      case {事件名}SelfIdEnum.TYPE_1:
        //TODO: 处理类型1
        break;
      case {事件名}SelfIdEnum.TYPE_2:
        //TODO: 处理类型2
        break;
      default:
        break;
    }
  },
};

export const businessEventList: TEvent[] = [event{事件名}];
```

#### 3. 注册事件（src/mpa/main/bridge/event/system.ts）

检查 `businessEventList` 是否已合并到 `systemEventList`：

```typescript
export const systemEventList: TEvent[] = [
  // ... 其他系统事件
  ...businessEventList,  // 确保这行存在
];
```

### 关键点

1. **类型定义**：使用判别联合类型（Discriminated Union），通过 `selfId` 等字段区分不同类型
2. **事件命名**：变量名使用 `event{事件名}`，`eventName` 字段使用 PascalCase
3. **区块标记**：使用 `// {事件名} 类型定义 Start/End` 标记便于维护
4. **事件注册**：必须将 `businessEventList` 合并到 `systemEventList`，否则事件不会被监听

### 真实 OpenAPI 示例

#### 从 MCP 工具获取的 NotifyPop 接口定义

```json
{
  "post": {
    "summary": "NotifyPop",
    "description": "通知触发推广",
    "requestBody": {
      "content": {
        "application/json": {
          "schema": {
            "type": "object",
            "properties": {
              "self_pop_id": {
                "type": "number",
                "title": "弹窗程序ID",
                "description": "1-系统垃圾垃圾2-内存可优化3-微信垃圾"
              },
              "content": {
                "type": "object",
                "title": "弹窗携带信息"
              },
              "pop_data": {
                "typring"
              }
            },
            "required": ["self_pop_id", "content", "pop_data"]
          },
          "examples": {
            "1": {
              "value": {
                "self_pop_id": 1,
                "content": {
                  "garbage_clean": "763063453",
                  "privacy_clean": "58670",
                  "wx_clean": "20713684254"
                },
                "pop_data": "incididunt tempor"
              },
              "summary": "self_pop_id=1",
              "description": "garbage_c 系统垃圾，字节\nprivacy_clean: 隐私条数，个\nwx_clean: 微信垃圾"
            },
            "2": {
              "value": {
                "self_pop_id": 2,
                "content": {
                  "memory_clean": "63063453"
                },
                "pop_data": "esse occaecat nulla minim est"
              },
              "summary": "self_pop_id=2",
              "description": "memory_clean: 预计可清理内存，字节"
            },
            "3": {
              "value": {
                "self_pop_id": 3,
                "content": {
                  "wn": "20713684254"
                },
                "pop_data": "et fugiat sit tempor"
              },
              "summary": "self_pop_id=3",
              "description": "wx_clean: 微信垃圾"
            }
          }
        }
      }
    }
  }
}
```

#### 根据 OpenAPI 生成的完整代码

**src/types/businessEvent.ts**

```typescript
// NotifyPop 类型定义 Start

export enum NotifyPopSelfIdEnum {
  /** 系统垃圾 */
  SYSTEM_JUNK = 1,
  /** 内存可优化 */
  MEMORY_OPTIMIZATION = 2,
  /** 微信垃圾 */
  WECHAT_JUNK = 3,
}

/**
 * mock data
 * ```json
 * {
 *   "self_pop_id": 1,
 *   "content": {
 *     "garbage_clean": "763063453",
 *     "privacy_clean": "58670",
 *     "wx_clean": "20713684254"
 *   },
 *   "pop_data": "incididunt tempor"
 * }
 * ```
 */
export interface NotifyPopSystemJunkParams {
  /** 自定义弹窗ID */
  selfId: NotifyPopSelfIdEnum.SYSTEM_JUNK;
  /** 弹窗内容 */
  content: {
    /** 系统垃圾，字节 */
    garbage_clean: string;
    /** 隐私条数，个 */
    privacy_clean: string;
    /** 微信垃圾，字节 */
    wx_clean: string;
  };
  /** 弹窗数据 */
  pop_data: string;
}

/**
 * mock data
 * ```json
 * {
 *   "self_pop_id": 2,
 *   "content": {
 *     "memory_clean": "63063453"
 *   },
 *   "pop_data": "esse occaecat nulla minim est"
 * }
 * ```
 */
export interface NotifyPopMemoryOptimizationParams {
  selfId: NotifyPopSelfIdEnum.MEMORY_OPTIMIZATION;
  content: {
    /** 预计可清理内存，字节 */
    memory_clean: string;
  };
  pop_data: string;
}

/**
 * mock data
 * ```json
 * {
 *   "self_pop_id": 3,
 *   "content": {
 *     "wx_clean": "20713684254"
 *   },
 *   "pop_data": "et fugiat sit tempor"
 * }
 * ```
 */
export interface NotifyPopWechatJunkParams {
  selfId: NotifyPopSelfIdEnum.WECHAT_JUNK;
  content: {
    /** 微信垃圾，字节 */
    wx_clean: stn  };
  pop_data: string;
}

export type NotifyPopParams =
  | NotifyPopSystemJunkParams
  | NotifyPopMemoryOptimizationParams
  | NotifyPopWechatJunkParams;

// NotifyPop 类型定义 End
```

**src/mpa/main/bridge/event/business.ts**

```typescript
import { TEvent } from "@lds/bridge-modal";

import { NotifyPopParams, NotifyPopSelfIdEnum } from "~/types/businessEvent";

/** 通知推广触发 */
export const eventNotifyPop: TEvent = {
  eventName: "NotifyPop",
  callback: (json = "") => {
    const params: NotifyPopParams = JSON.parse(json);
    switch (params.selfId) {
      case NotifyPopSelfIdEnum.SYSTEM_JUNK:
        //TODO: 系统垃圾
        break;
      case NotifyPopSelfIdEnum.MEMORY_OPTIMIZATION:
        //TODO: 内存可优化
        break;
      case NotifyPopSelfIdEnum.WECHAT_JUNK:
        //TODO: 微信垃圾
        break;
      default:
        break;
    }
  },
};

export const businessEventList: TEvent[] = [eventNotifyPop];
```

#### 代码生成要点

1. **从 examples 提取类型**
   - OpenAPI 的 `examples` 包含了不同 `self_pop_id` 的完整数据结构
   - 为每个 example 生成独立的接口类型
   - 使用 `selfId` 作为判别字段

2. **字段名转换**
   - OpenAPI 使用 `self_pop_id`（snake_case）
   - TypeScript 类型使用 `selfId`（camelCase）
   - 保持 `content` 内部字段名不变（与后端保持一致）

3. **注释来源**
   - 枚举注释：从 `example.summary` 提取
   - 字段注释：从 `example.description` 提取
   - Mock data：使用 `example.value`

4. **类型安全**
   - 使用判别联合类型（Discriminated Union）
   - TypeScript 可以根据 `selfId` 自动推断 `content` 的类型

### 与 GET 请求的对比

| 特性 | GET 请求 | POST 请求 |
|------|---------|-----------|
| **用途** | 前端调用客户端获取数据 | 客户端通知前端事件 |
| **返回值** | 有（Response 类型） | 无 |
| **实现方式** | `Execute` 函数 | `TEvent` 事件监听 |
| **类型文件** | `src/types/clientApi.ts` | `src/types/businessEvent.ts` |
| **实现文件** | `src/utils/clientApi.ts` | `src/mpa/main/bridge/event/business.ts` |
| **参数来源** | `parameters` 数组 | `requestBody.content` |
| **响应定义** | `responses.200.content` | 无需定义 |