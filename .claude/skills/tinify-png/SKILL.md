---
name: tinify-png
description: 使用 TinyPNG API 压缩和优化图片（支持 AVIF, WebP, JPEG 和 PNG 格式），当用户需要压缩图片时使用。
---

# tinify-png

使用 TinyPNG Developer API 自动压缩和优化图片文件。支持 AVIF, WebP, JPEG 和 PNG 格式。

## API 配置

### API Key
API_KEY=0Wj6C763Mn4TNLV0tCllWSWWT37NJdMD

### API 端点
- 压缩端点：`https://api.tinify.com/shrink`
- 获取压缩结果：从响应头 `Location` 字段获取

## 使用限制

- **免费额度**：每月 500 次免费压缩
- **最大文件大小**：500MB
- **最大画布尺寸**：256MP（32000 像素宽或高）

## 使用方法

### 基本压缩流程

1. **上传图片进行压缩**
   ```bash
   curl --user api:API_KEY \
        --data-binary @unoptimized.png \
        -i https://api.tinify.com/shrink
   ```

2. **从响应头获取压缩结果 URL**
   - 响应头 `Location` 字段包含压缩后的图片 URL
   - 状态码 `201 Created` 表示压缩成功

3. **下载压缩后的图片**
   ```bash
   # 从 Location 头获取的 URL 下载
   curl -o optimized.png "COMPRESSED_IMAGE_URL"
   ```

### 完整示例（Node.js）

```javascript
const fs = require('fs');
const https = require('https');

const API_KEY = '0Wj6C763Mn4TNLV0tCllWSWWT37NJdMD';
const inputFile = 'unoptimized.png';
const outputFile = 'optimized.png';

// 读取图片文件
const imageData = fs.readFileSync(inputFile);

// 压缩请求
const options = {
  hostname: 'api.tinify.com',
  path: '/shrink',
  method: 'POST',
  auth: `api:${API_KEY}`,
  headers: {
    'Content-Type': 'application/octet-stream',
    'Content-Length': imageData.length
  }
};

const req = https.request(options, (res) => {
  if (res.statusCode === 201) {
    const compressedUrl = res.headers.location;
    console.log('压缩成功，下载地址:', compressedUrl);
    
    // 下载压缩后的图片
    https.get(compressedUrl, (downloadRes) => {
      const fileStream = fs.createWriteStream(outputFile);
      downloadRes.pipe(fileStream);
      fileStream.on('finish', () => {
        console.log('图片已保存到:', outputFile);
      });
    });
  } else {
    console.error('压缩失败，状态码:', res.statusCode);
  }
});

req.on('error', (error) => {
  console.error('请求错误:', error);
});

req.write(imageData);
req.end();
```

### 使用 curl 的完整流程

```bash
# 1. 压缩图片并获取 Location 头
RESPONSE=$(curl -s -i --user api:API_KEY \
                --data-binary @unoptimized.png \
                https://api.tinify.com/shrink)

# 2. 提取 Location URL
COMPRESSED_URL=$(echo "$RESPONSE" | grep -i "Location:" | cut -d' ' -f2 | tr -d '\r')

# 3. 下载压缩后的图片
curl -o optimized.png "$COMPRESSED_URL"
```

## 使用场景

- 压缩项目中的 PNG/JPEG 图片以减小文件大小
- 批量优化图片资源
- 自动化构建流程中的图片优化
- 减少前端资源体积，提升加载速度

## 注意事项

1. **API Key 安全**：不要将 API Key 提交到公共代码仓库
2. **配额管理**：注意每月无限制免费额度限制
3. **文件大小**：确保文件不超过 500MB
4. **隐私保护**：TinyPNG 无法查看图片内容，隐私安全
5. **响应处理**：成功响应状态码为 `201 Created`，失败可能是 `400 Bad Request` 或 `401 Unauthorized`

## 错误处理

- **401 Unauthorized**：API Key 无效或未提供
- **400 Bad Request**：文件格式不支持、文件过大或画布尺寸超限
- **429 Too Many Requests**：超过每月配额限制

## 官方资源

- API 文档：https://tinify.com/developers
- API Dashboard：https://tinify.com/dashboard/api
- 支持格式：AVIF, WebP, JPEG, PNG
