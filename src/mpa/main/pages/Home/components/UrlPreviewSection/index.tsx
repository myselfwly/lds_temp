/**
 * UrlPreviewSection 网络文件预览区组件
 */

import { Link } from "lucide-react";
import React from "react";

import { usePreviewUrl } from "../../../../hooks/usePreviewUrl";

export const UrlPreviewSection: React.FC = () => {
  const { url, error, handleUrlChange, handleUrlSubmit } = usePreviewUrl();

  return (
    <div className="url-preview-section flex h-[58px] w-full items-center gap-4 rounded-[10px] border border-[rgba(204,204,204,0.3)] bg-[#191919] px-4">
      {/* 链接图标 */}
      <div className="url-preview-section__icon flex h-[40px] w-[40px] flex-shrink-0 items-center justify-center">
        <Link className="h-5 w-5 text-[#D2D2D2]" />
      </div>

      {/* URL输入框 */}
      <input
        type="text"
        value={url}
        onChange={(e) => handleUrlChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleUrlSubmit();
          }
        }}
        placeholder="输入网络文件链接（URL）直接查看..."
        className="url-preview-section__input flex-1 bg-transparent text-[16px] leading-[16px] text-white/60 placeholder:text-white/60 focus:text-white focus:outline-none"
      />

      {/* 打开链接按钮 */}
      <button
        onClick={handleUrlSubmit}
        className="url-preview-section__button h-[46px] w-[120px] flex-shrink-0 rounded-[6px] border border-[#3A3B3E] bg-[#242528] text-[18px] font-medium leading-[18px] text-white transition-colors hover:bg-[#2A2B2E]"
      >
        打开链接
      </button>

      {/* 错误提示（如果有） */}
      {error && (
        <div className="url-preview-section__error absolute bottom-[-24px] left-0 text-sm text-red-500">
          {error}
        </div>
      )}
    </div>
  );
};

export default UrlPreviewSection;
