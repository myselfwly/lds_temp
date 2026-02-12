/**
 * PreviewHeader 预览页工具栏组件
 */

import { ArrowLeft } from "lucide-react";
import React from "react";

interface PreviewHeaderProps {
  fileName: string;
  onBack: () => void;
}

export const PreviewHeader: React.FC<PreviewHeaderProps> = ({
  fileName,
  onBack,
}) => {
  return (
    <header className="preview-header fixed left-0 top-0 z-50 flex h-[74px] w-full items-center gap-4 bg-[#131313] px-[30px]">
      {/* 返回按钮 */}
      <button
        onClick={onBack}
        className="preview-header__back flex h-[40px] w-[40px] items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10"
        aria-label="返回"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>

      {/* 文件名 */}
      <h1 className="preview-header__title flex-1 truncate text-[20px] font-bold leading-[20px] text-white">
        {fileName || "预览"}
      </h1>
    </header>
  );
};

export default PreviewHeader;
