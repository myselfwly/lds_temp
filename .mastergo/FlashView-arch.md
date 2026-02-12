
# FlashView 首页组件架构文档

> 生成时间：2026-02-12
> 设计稿来源：MasterGo (fileId: 183847265910079, layerId: 5:05834)

---

## 一、组件概述

FlashView 首页是一个文件预览应用的主界面，包含品牌展示、文件上传、网络文件预览和最近文件列表功能。

### 技术栈
- React 18+
- TypeScript
- TailwindCSS
- 哈希路由

---

## 二、组件结构

### 2.1 组件层级

```
HomePage (首页容器)
├── Header (顶部导航栏)
│   ├── Logo (Logo图标)
│   ├── Title (标题文字)
│   ├── TabNav (导航切换器) - 暂不开发
│   ├── SettingsButton (设置按钮) - 预留
│   └── WindowControls (窗口控制) - 预留
│       ├── MinimizeButton
│       ├── MaximizeButton
│       └── CloseButton
├── BrandSection (品牌展示区)
│   ├── MainTitle (主标题)
│   └── SubTitle (副标题)
├── FileUploadSection (文件上传区)
│   ├── UploadArea (上传区域)
│   │   ├── FileIcon (文件图标)
│   │   ├── MainText (主文案)
│   │   ├── SubText (副文案)
│   │   └── SelectButton (选择文件按钮)
│   └── FormatHint (格式提示)
├── UrlPreviewSection (网络文件预览区)
│   ├── LinkIcon (链接图标)
│   ├── UrlInput (URL输入框)
│   └── OpenButton (打开链接按钮)
└── RecentFilesSection (最近文件区)
    ├── SectionTitle (区域标题)
    └── FileList (文件列表)
        └── FileCard (文件卡片) × N
            ├── FileTypeIcon (文件类型图标)
            ├── FileInfo (文件信息)
            │   ├── FileName (文件名)
            │   ├── FilePath (文件路径)
            │   └── FileTime (时间)
```

---

## 三、组件属性定义

### 3.1 HomePage

```typescript
interface HomePageProps {
  // 无props，所有状态内部管理
}
```

### 3.2 Header

```typescript
interface HeaderProps {
  onSettingsClick?: () => void;  // 设置按钮点击（预留）
  onMinimize?: () => void;       // 最小化（预留）
  onMaximize?: () => void;       // 最大化（预留）
  onClose?: () => void;          // 关闭（预留）
}
```

### 3.3 FileUploadSection

```typescript
interface FileUploadSectionProps {
  onFileSelect: (file: File) => void;
  loading?: boolean;
  loadingText?: string;
}
```

### 3.4 UrlPreviewSection

```typescript
interface UrlPreviewSectionProps {
  onUrlSubmit: (url: string) => void;
}
```

### 3.5 RecentFilesSection

```typescript
interface RecentFile {
  fileId: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  uploadTime: string;
  fileType: 'doc' | 'pdf' | 'dwg' | 'dxf' | 'other';
}

interface RecentFilesSectionProps {
  files: RecentFile[];
  onFileClick: (file: RecentFile) => void;
}
```

### 3.6 FileCard

```typescriptFileCardProps {
  file: RecentFile;
  onClick: () => void;
}
```

---

## 四、状态管理

### 4.1 全局状态 (Zustand)

```typescript
interface AppState {
  // 文件上传状态
  uploading: boolean;
  uploadProgress: number;

  // 最近文件列表
  recentFiles: RecentFile[];

  // 操作方法
  setUploading: (uploading: boolean) => void;
  setRecentFiles: (files: RecentFile[]) => void;
  uploadFile: (file: File) => Promise<void>;
  openUrlPreview: (url: string) => void;
}
```

### 4.2 组件内部状态

**FileUploadSection:**
```typescript
const [isDragging, setIsDragging] = useState(false);
```

**UrlPreviewSection:**
```typescript
const [url, setUrl] = useState('');
const [error, setError] = useState('');
```

---

## 五、样式规范

### 5.1 CSS变量定义

```css
:root {
  /* 渐变 */
  --gradient-primary: linear-gradient(117deg, #267BF9 17%, #26F4E4 99%);
  --gradient-secondary: linear-gradient(151deg, #267BF9 70%, #26D9F4 99%);

  /* 背景色 */
  --bg-primary: #131313;
  --bg-secondary: #191919;
  --bg-card: #161616;
  --bg-input: #242528;
  --bg-border: #3A3B3E;

  /* 边框色 */
  --border-dashed: rgba(255, 255, 255, 0.3);
  --border-solid: rgba(204, 204, 204, 0.3);

  /* 文字色 */
  --text-primary: #FFFFFF;
  --text-secondary: rgba(255, 255, 255, 0.5);
  --text-tertiary: #9F9EA3;

  /* 文件类型色 */
  --file-doc-bg: rgba(0, 74, 255, 0.4);
  --file-doc-text: #96B5FF;
  --file-pdf-bg: rgba(255, 24, 0, 0.4);
  --file-pdf-text: #FFBDBD;
  --file-dwg-bg: rgba(0, 200, 82, 0.4);
  --file-dwg-text: #A7FFCB;
  --file-dxf-bg: rgba(129, 51, 255, 0.4);
  --file-dxf-text: #D2B7FF;
}
```

### 5.2 TailwindCSS配置扩展

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#131313',
        secondary: '#191919',
        card: '#161616',
        input: '#242528',
        border: '#3A3B3E',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(117deg, #267BF9 17%, #26F4E4 99%)',
        'gradient-secondary': 'linear-gradient(151deg, #267BF9 70%, #26D9F4 99%)',
      },
      fontFamily: {
        sans: ['Source Han Sans', 'sans-serif'],
      },
    },
  },
}
```

---

## 六、图片资源

### 6.1 资源清单（预留位置）

| 图标描述 | 原始路径 | 目标路径 | 状态 |
|---------|---------|---------|------|
| Logo图标 | `.mastergo/images/5:07109-0.svg` | `src/assets/icons/logo.svg` | 🔲 预留 |
| 最小化图标 | `.mastergo/images/10:3849-0.svg` | `src/assets/icons/minimize.svg` | 🔲 预留 |
| 菜单图标 | `.mastergo/images/10:3846-0.svg` | `src/assets/icons/menu.svg` | 🔲 预留 |
| 关闭图标 | `.mastergo/images/10:3842-0.svg` | `src/assets/icons/close.svg` | 🔲 预留 |
| 最大化图标 | `.mastergo/images/10:3839-0.svg` | `src/assets/icons/maximize.svg` | 🔲 预留 |
| 首页图标 | `.mastergo/images/5:05966-0.svg` | `src/assets/icons/home.svg` | 🔲 预留 |
| 工具箱图标 | `.mastergo/images/5:05955-0.svg` | `src/assets/icons/toolbox.svg` | 🔲 预留 |
| 文件上传图标 | `.mastergo/images/5:06014-0.svg` | `src/assets/icons/file-upload.svg` | 🔲 预留 |
| 添加文件图标 | `.mastergo/images/5:06028-0.svg` | `src/assets/icons/add-file.svg` | 🔲 预留 |
| 链接图标 | `.mastergo/images/5:05910-0.svg` | `src/assets/icons/link.svg` | 🔲 预留 |
| 时钟图标 | `.mastergo/images/5:05913-0.svg` | `src/assets/icons/clock.svg` | 🔲 预留 |
| DOC文件图标 | `.mastergo/images/5:05858-0.svg` | `src/assets/icons/file-doc.svg` | 🔲 预留 |
| PDF文件图标 | `.mastergo/images/5:05929-0.svg` | `src/assets/icons/file-pdf.svg` | 🔲 预留 |
| DWG文件图标 | `.mastergo/images/5:05992-0.svg` | `src/assets/icons/file-dwg.svg` | 🔲 预留 |
| DXF文件图标 | `.mastergo/images/5:05854-0.svg` | `src/assets/icons/file-dxf.svg` | 🔲 预留 |

### 6.2 临时占位方案

在图标资源未准备好之前，使用以下方案：

**方案1：使用占位div**
```tsx
// 临时占位组件
const IconPlaceholder = ({ size = 24, color = '#9F9EA3' }) => (
  <div
    className="inline-block rounded"
    style={{
      width: size,
      height: size,
      backgroundColor: color,
      opacity: 0.3
    }}
  />
);
```

**方案2：使用Unicode字符**
```tsx
// Logo: 📄
// 关闭: ✕
// 最小化: −
// 最大化: □
// 链接: 🔗
// 时钟: 🕐
```

**方案3：使用Lucide React图标库**
```bash
npm install lucide-react
```

```tsx
import { X, Minus, Square, Menu, Home, Wrench, Upload, Link, Clock, FileText } from 'lucide-react';

// 使用
<X className="w-4 h-4 text-gray-400" />
```

---

## 七、交互行为

### 7.1 文件上传区

**拖拽交互：**
- `onDragEnter`: 边框高亮，背景色变化
- `onDragLeave`: 恢复默认样式
- `onDrop`: 触发文件上传

**点击交互：**
- 点击整个上传区域或"选择文件"按钮触发文件选择对话框
- 文件类型：`*.*` (不限制)

**加载状态：**
- 显示文案："正在解析文件"
- 上传完成后自动跳转到预览页

预览区

**输入验证：**
- 验证URL格式（http/https开头）
- 空值提示：console.log
- 格式错误提示：console.log

**提交行为：**
- 点击"打开链接"按钮
- 直接iframe展示URL页面

### 7.3 最近文件区

**点击行为：**
- 点击文件卡片跳转到预览页
- 传递文件信息到预览页

**空状态：**
- 无最近文件时不显示该区域（或显示空状态占位）

---

## 八、路由设计

### 8.1 哈希路由

```typescript
// 首页
/#/

// 预览页
/#/preview?url={previewUrl}&name={fileName}
```

### 8.2 路由跳转逻辑

```typescript
// 文件上传成功后
const navigateToPreview = (fileUrl: string, fileName: string) => {
  const previewUrl = `http://192.168.20.154:8012/onlinePreview?url=${encodeURIComponent(base64Encode(fileUrl))}`;
  window.location.hash = `#/preview?url=${encodeURIComponUrl)}&name=${encodeURIComponent(fileName)}`;
};

// 网络文件预览
const openUrlPreview = (url: string) => {
  window.location.hash = `#/preview?url=${encodeURIComponent(url)}&name=网络文件`;
};
```

---

## 九、API接口

### 9.1 文件上传接口

```typescript
interface UploadResponse {
  code: number;
  message: string;
  data: {
    fileId: string;
    fileName: string;
    filePath: string;
    fileSize: number;
    uploadTime: string;
  };
}

const uploadFile = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('http://192.168.20.154:8012/fileUpload', {
    method: 'POST',
    body: formData,
  });

  return response.json();
};
```

### 9.2 文件列表接口

```typescript
interface FileListResponse {
  code: number;
  message: string;
  data: {
    files: Array<{
      fileId: string;
      fileName: string;
      filePath: string;
      fileSize: number;
      uploadTime: string;
    }>;
  };
}

const getFileList = async (): Promise<FileListResponse> => {
  const response = await fetch('http://192.168.20.154:8012/listFiles?order=asc');
  return response.json();
};
```

---

## 十、开发优先级

### P0 - 核心功能（本期开发）

1. **Header组件** - Logo + 标题 + 窗口控制按钮（预留）
2. **BrandSection组件** - 品牌展示区
3. **FileUploadSection组件** - 文件上传区（拖拽+点击）
4. **UrlPreviewSection组件** - 网络文件预览区
5. **RecentFilesSection组件** - 最近文件列表
6. **哈希路由** - 首页和预览页切换

### P1 - 预留功能（后续开发）

- Tab导航切换（首页/工具箱）
- 设置按钮功能
- 窗口控制功能（最小化/最大化/关闭）
- 会员功能
- 支付中心

---

## 十一、目录结构

```
src/mpa/main/
├── App.tsx                          # 根组件（哈希路由）
├── pages/
│   ├── Home/
│   │   ├── index.tsx                # 首页容器
│   │   ├── components/
│   │   │   ├── Header/
│   │   │   │   ├── index.tsx
│   │   │   │   └── styles.ts
│   │   │   ├── BrandSection/
│   │   │   │   ├── index.tsx
│   │   │   │   └── styles.ts
│   │   │   ├── FileUploadSection/
│   │   │   │   ├── index.tsx
│   │   │   │   └── styles.ts
│   │   │   ├── UrlPreviewSection/
│   │   │   │   ├── index.tsx
│   │   │   │   └── styles.ts
│   │   │   └── RecentFilesSection/
│   │   │       ├── index.tsx
│   │   │       ├── FileCard.tsx
│   │   │       └── styles.ts
│   └── Preview/
│       ├── index.tsx                # 预览页
│       └── components/
│           ├── PreviewHeader/
│           │   ├── index.tsx
│           │   └── styles.ts
│           └── PreviewContent/
│               ├── index.tsx
│               └── styles.ts
├── components/
│   └── Loading/
│       ├── index.tsx
│       └── styles.ts
├── hooks/
│   ├── useFileUpload.ts
│   ├── useRecentFiles.ts
│   └── usePreviewUrl.ts
├── services/
│   ├── fileApi.ts
│   └── index.ts
├── utils/
│   ├── base64.ts
│   └── url.ts
├── store/
│   └── useAppStore.ts
└── assets/
    └── icons/
        ├── logo.svg
        ├── close.svg
        ├── minimize.svg
        ├── maximize.svg
        ├── menu.svg
        ├── home.svg
        ├── toolbox.svg
        ├── file-upload.svg
        ├── add-file.svg
        ├── link.svg
        ├── clock.svg
        ├── file-doc.svg
        ├── file-pdf.svg
        ├── file-dwg.svg
        └── file-dxf.svg
```

---

## 十二、确认清单

请确认以下架构设计是否正确：

- [ ] 组件层级结构
- [ ] 组件属性定义
- [ ] 状态管理方案
- [ ] 样式规范和CSS变量
- [ ] 图片资源清单和路径
- [ ] 交互行为定义
- [ ] 路由设计
- [ ] API接口定义
- [ ] 开发优先级
- [ ] 目录结构

**如有需要调整的地方，请告知！确认无误后，我将继续进行组件开发。**
