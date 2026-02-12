/**
 * 全局状态管理 - Zustand Store
 */

import { create } from "zustand";

import { generatePreviewUrl, getFileList, uploadFile } from "../services";

/**
 * 最近文件类型
 */
export interface RecentFile {
  fileId: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  uploadTime: string;
  fileType?: "doc" | "pdf" | "dwg" | "dxf" | "other";
}

/**
 * 应用状态接口
 */
interface AppState {
  // 文件上传状态
  uploading: boolean;
  uploadProgress: number;
  uploadError: string | null;

  // 最近文件列表
  recentFiles: RecentFile[];
  loadingFiles: boolean;

  // 操作方法
  setUploading: (uploading: boolean) => void;
  setUploadProgress: (progress: number) => void;
  setUploadError: (error: string | null) => void;
  setRecentFiles: (files: RecentFile[]) => void;

  // 业务方法
  uploadFileAndNavigate: (file: File) => Promise<void>;
  fetchRecentFiles: () => Promise<void>;
  openUrlPreview: (url: string) => void;
}

/**
 * 从文件名推断文件类型
 */
const getFileTypeFromName = (fileName: string): RecentFile["fileType"] => {
  const ext = fileName.split(".").pop()?.toLowerCase();

  if (["doc", "docx"].includes(ext || "")) return "doc";
  if (ext === "pdf") return "pdf";
  if (ext === "dwg") return "dwg";
  if (ext === "dxf") return "dxf";

  return "other";
};

/**
 * 创建全局Store
 */
export const useAppStore = create<AppState>((set, get) => ({
  // 初始状态
  uploading: false,
  uploadProgress: 0,
  uploadError: null,
  recentFiles: [],
  loadingFiles: false,

  // 设置方法
  setUploading: (uploading) => set({ uploading }),
  setUploadProgress: (progress) => set({ uploadProgress: progress }),
  setUploadError: (error) => set({ uploadError: error }),
  setRecentFiles: (files) => set({ recentFiles: files }),

  // 上传文件并跳转到预览页
  uploadFileAndNavigate: async (file: File) => {
    try {
      set({ uploading: true, uploadProgress: 0, uploadError: null });

      // 上传文件
      const uploadResponse = await uploadFile(file);

      if (uploadResponse.code !== 0 || !uploadResponse.success) {
        throw new Error(uploadResponse.msg || "上传失败");
      }

      // 直接使用文件名拼接URL
      const fileName = `demo/${file.name}`;
      const previewUrl = generatePreviewUrl(fileName);

      // 跳转到预览页
      window.location.hash = `#/preview?url=${encodeURIComponent(
        previewUrl,
      )}&name=${encodeURIComponent(file.name)}`;

      set({ uploading: false, uploadProgress: 100 });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "上传失败";
      console.error("Upload error:", errorMessage);
      set({ uploading: false, uploadError: errorMessage });
    }
  },

  // 获取最近文件列表
  fetchRecentFiles: async () => {
    try {
      set({ loadingFiles: true });

      const fileList = await getFileList("desc");

      if (!fileList) {
        throw new Error("获取文件列表失败");
      }

      // 转换文件列表，添加文件类型
      const files: RecentFile[] = fileList.map((file) => {
        // 提取文件名（去掉路径前缀）
        const displayName = file.fileName.split("/").pop() || file.fileName;

        return {
          fileId: file.fileName, // 使用完整路径作为ID
          fileName: displayName,
          filePath: file.fileName,
          fileSize: 0, // 接口未返回，设为0
          uploadTime: new Date().toISOString(), // 接口未返回，使用当前时间
          fileType: getFileTypeFromName(displayName),
        };
      });

      set({ recentFiles: files, loadingFiles: false });
    } catch (error) {
      console.error("Fetch files error:", error);
      set({ loadingFiles: false });
    }
  },

  // 打开网络文件预览
  openUrlPreview: (url: string) => {
    window.location.hash = `#/preview?url=${encodeURIComponent(
      url,
    )}&name=网络文件`;
  },
}));
