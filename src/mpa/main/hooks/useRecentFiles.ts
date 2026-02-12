/**
 * 最近文件 Hook
 */

import { useEffect } from "react";

import { useAppStore } from "../store/useAppStore";
import { base64Encode } from "../utils/base64";

export const useRecentFiles = () => {
  const { recentFiles, loadingFiles, fetchRecentFiles } = useAppStore();

  /**
   * 组件挂载时获取最近文件列表
   */
  useEffect(() => {
    fetchRecentFiles();
  }, [fetchRecentFiles]);

  /**
   * 处理文件点击
   */
  const handleFileClick = (file: any) => {
    const fileUrl = `http://192.168.20.59:8012/${file.filePath}`;
    const base64Url = base64Encode(fileUrl);
    const previewUrl = `http://192.168.20.59:8012/onlinePreview?url=${encodeURIComponent(
      base64Url,
    )}`;
    window.location.hash = `#/preview?url=${encodeURIComponent(
      previewUrl,
    )}&name=${encodeURIComponent(file.fileName)}`;
  };

  return {
    recentFiles,
    loadingFiles,
    handleFileClick,
    refreshFiles: fetchRecentFiles,
  };
};
