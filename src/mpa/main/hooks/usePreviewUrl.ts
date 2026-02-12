/**
 * 预览URL Hook
 */

import { useCallback, useState } from "react";

import { useAppStore } from "../store/useAppStore";
import { isValidUrl } from "../utils/url";

export const usePreviewUrl = () => {
  const { openUrlPreview } = useAppStore();
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  /**
   * 处理URL输入变化
   */
  const handleUrlChange = useCallback((value: string) => {
    setUrl(value);
    setError("");
  }, []);

  /**
   * 处理URL提交
   */
  const handleUrlSubmit = useCallback(() => {
    const trimmedUrl = url.trim();

    // 验证URL是否为空
    if (!trimmedUrl) {
      console.log("URL不能为空");
      setError("URL不能为空");
      return;
    }

    // 验证URL格式
    if (!isValidUrl(trimmedUrl)) {
      console.log("URL格式错误，必须以 http:// 或 https:// 开头");
      setError("URL格式错误");
      return;
    }

    // 打开预览
    openUrlPreview(trimmedUrl);
  }, [url, openUrlPreview]);

  /**
   * 清空输入
   */
  const clearUrl = useCallback(() => {
    setUrl("");
    setError("");
  }, []);

  return {
    url,
    error,
    handleUrlChange,
    handleUrlSubmit,
    clearUrl,
  };
};
