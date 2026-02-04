# UI 文档

## UI规范
组件化 DOM AST 风格的 JSON 对象，同时遵循 React 组件设计思路、Flex/Grid 布局规范和 Tailwind CSS 命名习惯，图片 / Icon 类元素会统一预留空位并做好标识。
转换规则说明
组件化拆分：按 UI 视觉层级 / 功能模块拆分为嵌套的组件节点，根节点为顶级容器组件，子节点为各类功能子组件（如Header/Content/Card等）；
布局标识：节点的layout属性标注核心布局方案（flex/grid/block），同时补充 Tailwind 风格的布局类名（如flex items-center justify-between）；
资源预留：图片 / Icon 节点会设置type: "image"/type: "icon"，并通过src: "预留占位"/iconName: "预留占位"标识，同时预留宽高 / 容器适配属性；
DOM AST 结构：包含componentName（组件名）、props（属性，含类名 / 样式 / 自定义属性）、children（子节点）、type（节点类型）等核心字段，贴合 React 虚拟 DOM 思路；
样式规范：所有样式类名遵循 Tailwind CSS 命名规则（如w-full h-16 px-4 py-2 text-base font-medium），无自定义样式冗余。

## UI DOM AST

```json
{
  "componentName": "App",
  "props": {
    "className": "min-h-screen bg-gradient-to-b from-blue-100 to-white flex flex-col"
  },
  "children": [
    {
      "componentName": "Header",
      "props": {
        "className": "flex items-center justify-between px-4 py-3 bg-white shadow-sm"
      },
      "children": [
        {
          "type": "icon",
          "props": {
            "iconName": "预留占位（Windows图标）",
            "className": "w-6 h-6 mr-2"
          }
        },
        {
          "type": "text",
          "props": {
            "className": "text-lg font-semibold text-gray-800",
            "content": "Windows优化助手"
          }
        },
        {
          "componentName": "HeaderActions",
          "props": {
            "className": "flex space-x-2"
          },
          "children": [
            {
              "type": "icon",
              "props": {
                "iconName": "预留占位（扫码图标）",
                "className": "w-8 h-8 p-1 rounded bg-gray-100"
              }
            },
            {
              "type": "icon",
              "props": {
                "iconName": "预留占位（菜单图标）",
                "className": "w-8 h-8 p-1 rounded bg-gray-100"
              }
            },
            {
              "type": "icon",
              "props": {
                "iconName": "预留占位（更多图标）",
                "className": "w-8 h-8 p-1 rounded bg-gray-100"
              }
            }
          ]
        }
      ]
    },
    {
      "componentName": "HeroSection",
      "props": {
        "className": "flex flex-col items-center justify-center py-8 px-4"
      },
      "children": [
        {
          "type": "image",
          "props": {
            "src": "预留占位（盾牌图标）",
            "className": "w-24 h-24 mb-4"
          }
        },
        {
          "type": "text",
          "props": {
            "className": "text-base font-medium text-gray-800 mb-6 text-center",
            "content": "有19项电脑问题可优化"
          }
        },
        {
          "type": "button",
          "props": {
            "className": "w-full max-w-xs bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-full shadow-md",
            "content": "全面优化"
          }
        }
      ]
    },
    {
      "componentName": "OptimizationTools",
      "props": {
        "className": "grid grid-cols-2 gap-3 px-4 py-4"
      },
      "children": [
        {
          "componentName": "ToolCard",
          "props": {
            "className": "bg-white rounded-lg shadow-sm p-3 flex items-center"
          },
          "children": [
            {
              "type": "icon",
              "props": {
                "iconName": "预留占位（垃圾清理图标）",
                "className": "w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center mr-3"
              }
            },
            {
              "componentName": "ToolInfo",
              "props": {
                "className": "flex flex-col"
              },
              "children": [
                {
                  "type": "text",
                  "props": {
                    "className": "text-sm font-medium text-gray-800",
                    "content": "垃圾清理"
                  }
                },
                {
                  "type": "text",
                  "props": {
                    "className": "text-xs text-red-500",
                    "content": "36.87G 待清理"
                  }
                }
              ]
            }
          ]
        },
        {
          "componentName": "ToolCard",
          "props": {
            "className": "bg-white rounded-lg shadow-sm p-3 flex items-center"
          },
          "children": [
            {
              "type": "icon",
              "props": {
                "iconName": "预留占位（弹窗拦截图标）",
                "className": "w-10 h-10 bg-orange-100 rounded-md flex items-center justify-center mr-3"
              }
            },
            {
              "componentName": "ToolInfo",
              "props": {
                "className": "flex flex-col"
              },
              "children": [
                {
                  "type": "text",
                  "props": {
                    "className": "text-sm font-medium text-gray-800",
                    "content": "弹窗拦截"
                  }
                },
                {
                  "type": "text",
                  "props": {
                    "className": "text-xs text-red-500",
                    "content": "3个 可拦截"
                  }
                }
              ]
            }
          ]
        },
        {
          "componentName": "ToolCard",
          "props": {
            "className": "bg-white rounded-lg shadow-sm p-3 flex items-center"
          },
          "children": [
            {
              "type": "icon",
              "props": {
                "iconName": "预留占位（C盘瘦身图标）",
                "className": "w-10 h-10 bg-green-100 rounded-md flex items-center justify-center mr-3"
              }
            },
            {
              "componentName": "ToolInfo",
              "props": {
                "className": "flex flex-col"
              },
              "children": [
                {
                  "type": "text",
                  "props": {
                    "className": "text-sm font-medium text-gray-800",
                    "content": "C盘瘦身"
                  }
                },
                {
                  "type": "text",
                  "props": {
                    "className": "text-xs text-gray-500",
                    "content": "一键释放空间"
                  }
                }
              ]
            }
          ]
        },
        {
          "componentName": "ToolCard",
          "props": {
            "className": "bg-white rounded-lg shadow-sm p-3 flex items-center"
          },
          "children": [
            {
              "type": "icon",
              "props": {
                "iconName": "预留占位（电脑加速图标）",
                "className": "w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center mr-3"
              }
            },
            {
              "componentName": "ToolInfo",
              "props": {
                "className": "flex flex-col"
              },
              "children": [
                {
                  "type": "text",
                  "props": {
                    "className": "text-sm font-medium text-gray-800",
                    "content": "电脑加速"
                  }
                },
                {
                  "type": "text",
                  "props": {
                    "className": "text-xs text-red-500",
                    "content": "193项 可加速"
                  }
                }
              ]
            }
          ]
        },
        {
          "componentName": "ToolCard",
          "props": {
            "className": "bg-white rounded-lg shadow-sm p-3 flex items-center"
          },
          "children": [
            {
              "type": "icon",
              "props": {
                "iconName": "预留占位（隐私清理图标）",
                "className": "w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center mr-3"
              }
            },
            {
              "componentName": "ToolInfo",
              "props": {
                "className": "flex flex-col"
              },
              "children": [
                {
                  "type": "text",
                  "props": {
                    "className": "text-sm font-medium text-gray-800",
                    "content": "隐私清理"
                  }
                },
                {
                  "type": "text",
                  "props": {
                    "className": "text-xs text-red-500",
                    "content": "20510条 可清理"
                  }
                }
              ]
            }
          ]
        },
        {
          "componentName": "ToolCard",
          "props": {
            "className": "bg-white rounded-lg shadow-sm p-3 flex items-center"
          },
          "children": [
            {
              "type": "icon",
              "props": {
                "iconName": "预留占位（碎片清理图标）",
                "className": "w-10 h-10 bg-purple-100 rounded-md flex items-center justify-center mr-3"
              }
            },
            {
              "componentName": "ToolInfo",
              "props": {
                "className": "flex flex-col"
              },
              "children": [
                {
                  "type": "text",
                  "props": {
                    "className": "text-sm font-medium text-gray-800",
                    "content": "碎片清理"
                  }
                },
                {
                  "type": "text",
                  "props": {
                    "className": "text-xs text-gray-500",
                    "content": "延长磁盘寿命"
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "componentName": "Section",
      "props": {
        "className": "px-4 py-2"
      },
      "children": [
        {
          "componentName": "SectionHeader",
          "props": {
            "className": "flex items-center justify-between mb-3"
          },
          "children": [
            {
              "type": "text",
              "props": {
                "className": "text-sm font-medium text-gray-800 border-l-2 border-blue-500 pl-2",
                "content": "我用过的"
              }
            },
            {
              "type": "button",
              "props": {
                "className": "text-xs text-gray-500 flex items-center",
                "content": "收起 ×"
              }
            }
          ]
        },
        {
          "componentName": "ToolGrid",
          "props": {
            "className": "grid grid-cols-5 gap-2"
          },
          "children": [
            {
              "componentName": "ToolIcon",
              "props": {
                "className": "flex flex-col items-center"
              },
              "children": [
                {
                  "type": "icon",
                  "props": {
                    "iconName": "预留占位（启动项图标）",
                    "className": "w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-1"
                  }
                },
                {
                  "type": "text",
                  "props": {
                    "className": "text-xs text-gray-600",
                    "content": "启动项"
                  }
                }
              ]
            },
            {
              "componentName": "ToolIcon",
              "props": {
                "className": "flex flex-col items-center"
              },
              "children": [
                {
                  "type": "icon",
                  "props": {
                    "iconName": "预留占位（服务管理图标）",
                    "className": "w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-1"
                  }
                },
                {
                  "type": "text",
                  "props": {
                    "className": "text-xs text-gray-600",
                    "content": "服务管理"
                  }
                }
              ]
            },
            {
              "componentName": "ToolIcon",
              "props": {
                "className": "flex flex-col items-center"
              },
              "children": [
                {
                  "type": "icon",
                  "props": {
                    "iconName": "预留占位（计划任务图标）",
                    "className": "w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-1"
                  }
                },
                {
                  "type": "text",
                  "props": {
                    "className": "text-xs text-gray-600",
                    "content": "计划任务"
                  }
                }
              ]
            },
            {
              "componentName": "ToolIcon",
              "props": {
                "className": "flex flex-col items-center"
              },
              "children": [
                {
                  "type": "icon",
                  "props": {
                    "iconName": "预留占位（硬件控图标）",
                    "className": "w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-1"
                  }
                },
                {
                  "type": "text",
                  "props": {
                    "className": "text-xs text-gray-600",
                    "content": "硬件控"
                  }
                }
              ]
            },
            {
              "componentName": "ToolIcon",
              "props": {
                "className": "flex flex-col items-center"
              },
              "children": [
                {
                  "type": "icon",
                  "props": {
                    "iconName": "预留占位（截图图标）",
                    "className": "w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-1"
                  }
                },
                {
                  "type": "text",
                  "props": {
                    "className": "text-xs text-gray-600",
                    "content": "截图"
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "componentName": "Section",
      "props": {
        "className": "px-4 py-2"
      },
      "children": [
        {
          "componentName": "SectionHeader",
          "props": {
            "className": "flex items-center justify-between mb-3"
          },
          "children": [
            {
              "type": "text",
              "props": {
                "className": "text-sm font-medium text-gray-800 border-l-2 border-blue-500 pl-2",
                "content": "系统维护"
              }
            },
            {
              "type": "button",
              "props": {
                "className": "text-xs text-gray-500 flex items-center",
                "content": "收起 ×"
              }
            }
          ]
        },
        {
          "componentName": "ToolGrid",
          "props": {
            "className": "grid grid-cols-4 gap-2"
          },
          "children": [
            {
              "componentName": "ToolIcon",
              "props": {
                "className": "flex flex-col items-center relative"
              },
              "children": [
                {
                  "type": "badge",
                  "props": {
                    "className": "absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center",
                    "content": "12"
                  }
                },
                {
                  "type": "icon",
                  "props": {
                    "iconName": "预留占位（启动项图标）",
                    "className": "w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-1"
                  }
                },
                {
                  "type": "text",
                  "props": {
                    "className": "text-xs text-gray-600",
                    "content": "启动项"
                  }
                }
              ]
            },
            {
              "componentName": "ToolIcon",
              "props": {
                "className": "flex flex-col items-center relative"
              },
              "children": [
                {
                  "type": "badge",
                  "props": {
                    "className": "absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center",
                    "content": "8"
                  }
                },
                {
                  "type": "icon",
                  "props": {
                    "iconName": "预留占位（服务管理图标）",
                    "className": "w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-1"
                  }
                },
                {
                  "type": "text",
                  "props": {
                    "className": "text-xs text-gray-600",
                    "content": "服务管理"
                  }
                }
              ]
            },
            {
              "componentName": "ToolIcon",
              "props": {
                "className": "flex flex-col items-center"
              },
              "children": [
                {
                  "type": "icon",
                  "props": {
                    "iconName": "预留占位（计划任务图标）",
                    "className": "w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-1"
                  }
                },
                {
                  "type": "text",
                  "props": {
                    "className": "text-xs text-gray-600",
                    "content": "计划任务"
                  }
                }
              ]
            },
            {
              "componentName": "ToolIcon",
              "props": {
                "className": "flex flex-col items-center"
              },
              "children": [
                {
                  "type": "icon",
                  "props": {
                    "iconName": "预留占位（进程管理图标）",
                    "className": "w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-1"
                  }
                },
                {
                  "type": "text",
                  "props": {
                    "className": "text-xs text-gray-600",
                    "content": "进程管理"
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "componentName": "Section",
      "props": {
        "className": "px-4 py-2 pb-8"
      },
      "children": [
        {
          "componentName": "SectionHeader",
          "props": {
            "className": "flex items-center justify-between mb-3"
          },
          "children": [
            {
              "type": "text",
              "props": {
                "className": "text-sm font-medium text-gray-800 border-l-2 border-blue-500 pl-2",
                "content": "实用工具"
              }
            },
            {
              "type": "button",
              "props": {
                "className": "text-xs text-gray-500 flex items-center",
                "content": "收起 ×"
              }
            }
          ]
        },
        {
          "componentName": "ToolGrid",
          "props": {
            "className": "grid grid-cols-4 gap-2"
          },
          "children": [
            {
              "componentName": "ToolIcon",
              "props": {
                "className": "flex flex-col items-center"
              },
              "children": [
                {
                  "type": "icon",
                  "props": {
                    "iconName": "预留占位（截图图标）",
                    "className": "w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-1"
                  }
                },
                {
                  "type": "text",
                  "props": {
                    "className": "text-xs text-gray-600",
                    "content": "截图"
                  }
                }
              ]
            },
            {
              "componentName": "ToolIcon",
              "props": {
                "className": "flex flex-col items-center"
              },
              "children": [
                {
                  "type": "icon",
                  "props": {
                    "iconName": "预留占位（记事本图标）",
                    "className": "w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-1"
                  }
                },
                {
                  "type": "text",
                  "props": {
                    "className": "text-xs text-gray-600",
                    "content": "记事本"
                  }
                }
              ]
            },
            {
              "componentName": "ToolIcon",
              "props": {
                "className": "flex flex-col items-center"
              },
              "children": [
                {
                  "type": "icon",
                  "props": {
                    "iconName": "预留占位（计算器图标）",
                    "className": "w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-1"
                  }
                },
                {
                  "type": "text",
                  "props": {
                    "className": "text-xs text-gray-600",
                    "content": "计算器"
                  }
                }
              ]
            },
            {
              "componentName": "ToolIcon",
              "props": {
                "className": "flex flex-col items-center"
              },
              "children": [
                {
                  "type": "icon",
                  "props": {
                    "iconName": "预留占位（搜索图标）",
                    "className": "w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-1"
                  }
                },
                {
                  "type": "text",
                  "props": {
                    "className": "text-xs text-gray-600",
                    "content": "搜索"
                  }
                }
              ]
            },
            {
              "componentName": "ToolIcon",
              "props": {
                "className": "flex flex-col items-center"
              },
              "children": [
                {
                  "type": "icon",
                  "props": {
                    "iconName": "预留占位（AI工具图标）",
                    "className": "w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-1"
                  }
                },
                {
                  "type": "text",
                  "props": {
                    "className": "text-xs text-gray-600",
                    "content": "AI工具"
                  }
                }
              ]
            },
            {
              "componentName": "ToolIcon",
              "props": {
                "className": "flex flex-col items-center"
              },
              "children": [
                {
                  "type": "icon",
                  "props": {
                    "iconName": "预留占位（翻译图标）",
                    "className": "w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-1"
                  }
                },
                {
                  "type": "text",
                  "props": {
                    "className": "text-xs text-gray-600",
                    "content": "翻译"
                  }
                }
              ]
            },
            {
              "componentName": "ToolIcon",
              "props": {
                "className": "flex flex-col items-center"
              },
              "children": [
                {
                  "type": "icon",
                  "props": {
                    "iconName": "预留占位（我的电脑图标）",
                    "className": "w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-1"
                  }
                },
                {
                  "type": "text",
                  "props": {
                    "className": "text-xs text-gray-600",
                    "content": "我的电脑"
                  }
                }
              ]
            },
            {
              "componentName": "ToolIcon",
              "props": {
                "className": "flex flex-col items-center"
              },
              "children": [
                {
                  "type": "icon",
                  "props": {
                    "iconName": "预留占位（控制面板图标）",
                    "className": "w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-1"
                  }
                },
                {
                  "type": "text",
                  "props": {
                    "className": "text-xs text-gray-600",
                    "content": "控制面板"
                  }
                }
              ]
            },
            {
              "componentName": "AddToolButton",
              "props": {
                "className": "flex flex-col items-center justify-center w-12 h-12 border-2 border-dashed border-gray-300 rounded-full text-gray-400"
              },
              "children": [
                {
                  "type": "icon",
                  "props": {
                    "iconName": "预留占位（添加图标）",
                    "className": "w-6 h-6 mb-1"
                  }
                },
                {
                  "type": "text",
                  "props": {
                    "className": "text-xs text-gray-500",
                    "content": "添加"
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```
