/**
 * PreviewPage 预览页组件
 */

import React, { useEffect, useState } from "react";

import { parseHashParams } from "../../utils/url";
import PreviewContent from "./components/PreviewContent";
import PreviewHeader from "./components/PreviewHeader";

export const PreviewPage: React.FC = () => {
  const [previewUrl, setPreviewUrl] = useState("");
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    // 从URL参数中获取预览URL和文件名
    const params = parseHashParams();
    setPreviewUrl(params.url || "");
    setFileName(params.name || "预览");
  }, []);

  /**
   * 返回首页
   */
  const handleBack = () => {
    window.location.hash = "#/";
  };

  if (!previewUrl) {
    return (
      <div className="preview-page preview-page--error flex h-screen items-center justify-center bg-[#131313]">
        <p className="text-white/50">无效的预览链接</p>
      </div>
    );
  }

  return (
    <div className="preview-page relative h-screen w-full bg-[#131313]">
      {/* 预览页工具栏 */}
      <PreviewHeader fileName={fileName} onBack={handleBack} />

      {/* 预览内容区 */}
      <div className="preview-page__content h-full w-full pt-[74px]">
        <PreviewContent url={previewUrl} />
      </div>
    </div>
  );
};

export default PreviewPage;
