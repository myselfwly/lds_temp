/**
 * 文件相关API
 */

import { base64Encode } from "../utils/base64";

// 开发环境使用代理，生产环境使用实际地址
const API_BASE_URL = import.meta.env.DEV ? "/api" : "http://192.168.20.59:8012";

/**
 * 文件上传响应
 */
export interface UploadResponse {
  code: number;
  msg: string;
  content: null;
  failure: boolean;
  success: boolean;
}

/**
 * 文件列表项
 */
export interface FileItem {
  fileName: string;
}

/**
 * 文件列表响应
 */
export type FileListResponse = FileItem[];

/**
 * 上传文件
 * @param file 文件对象
 * @returns 上传响应
 */
export const uploadFile = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/fileUpload`, {
    method: "POST",
    headers: {
      accept: "application/json, text/javascript, */*; q=0.01",
      "x-requested-with": "XMLHttpRequest",
    },
    body: formData,
    mode: "cors",
    credentials: "omit",
  });

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.statusText}`);
  }

  return response.json();
};

/**
 * 获取文件列表
 * @param order 排序方式 (asc: 升序, desc: 降序)
 * @returns 文件列表响应
 */
export const getFileList = async (
  order: "asc" | "desc" = "asc",
): Promise<FileListResponse> => {
  const response = await fetch(`${API_BASE_URL}/listFiles?order=${order}`, {
    method: "GET",
    headers: {
      accept: "application/json, text/javascript, */*; q=0.01",
      "content-type": "application/json",
      "x-requested-with": "XMLHttpRequest",
    },
    mode: "cors",
    credentials: "omit",
  });

  if (!response.ok) {
    throw new Error(`Get file list failed: ${response.statusText}`);
  }

  return response.json();
};

/**
 * 生成预览URL
 * @param fileName 文件名
 * @returns 预览URL
 */
export const generatePreviewUrl = (fileName: string): string => {
  const fileUrl = `http://192.168.20.59:8012/${fileName}`;
  const base64Url = base64Encode(fileUrl);
  return `http://192.168.20.59:8012/onlinePreview?url=${encodeURIComponent(
    base64Url,
  )}`;
};
