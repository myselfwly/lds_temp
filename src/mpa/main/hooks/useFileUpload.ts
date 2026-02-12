/**
 * 文件上传 Hook
 */

import { useCallback, useState } from "react";

import { useAppStore } from "../store/useAppStore";

export const useFileUpload = () => {
  const { uploadFileAndNavigate, uploading, uploadError } = useAppStore();
  const [isDragging, setIsDragging] = useState(false);

  /**
   * 处理文件选择
   */
  const handleFileSelect = useCallback(
    async (file: File) => {
      if (!file) return;
      await uploadFileAndNavigate(file);
    },
    [uploadFileAndNavigate],
  );

  /**
   * 处理拖拽进入
   */
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  /**
   * 处理拖拽离开
   */
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  /**
   * 处理拖拽悬停
   */
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  /**
   * 处理文件拖放
   */
  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        await handleFileSelect(files[0]);
      }
    },
    [handleFileSelect],
  );

  /**
   * 处理点击选择文件
   */
  const handleClickSelect = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "*/*";
    input.onchange = async (e) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        await handleFileSelect(file);
      }
    };
    input.click();
  }, [handleFileSelect]);

  return {
    isDragging,
    uploading,
    uploadError,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleClickSelect,
  };
};
