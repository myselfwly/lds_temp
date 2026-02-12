/**
 * FileUploadSection 文件上传区组件
 */

import { Plus, Upload } from "lucide-react";
import React from "react";

import { useFileUpload } from "../../../../hooks/useFileUpload";

export const FileUploadSection: React.FC = () => {
  const {
    isDragging,
    uploading,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleClickSelect,
  } = useFileUpload();

  return (
    <div
      className={`file-upload-section relative flex flex-1 min-h-[338px] w-full cursor-pointer flex-col items-center justify-center rounded-[10px] border-2 border-dashed transition-all ${
        isDragging
          ? "border-blue-500 bg-blue-500/10"
          : "border-white/30 hover:border-white/50"
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClickSelect}
    >
      {/* 文件图标占位 */}
      <div className="file-upload-section__icon mb-[20px] flex h-[88px] w-[97px] items-center justify-center">
        <Upload className="h-16 w-16 text-white/30" />
      </div>

      {/* 主文案 */}
      <h3 className="file-upload-section__title mb-[14px] text-center text-[24px] font-bold leading-[24px] text-white">
        拖拽文件到这里
      </h3>

      {/* 副文案 */}
      <p className="file-upload-section__subtitle mb-[26px] text-center text-[16px] leading-[16px] text-white/50">
        或点击选择本地文件
      </p>

      {/* 选择文件按钮 */}
      <button
        className="file-upload-section__button flex h-[52px] w-[220px] items-center justify-center gap-2 rounded-[8px] border border-[#3A3B3E] bg-[#242528] text-[18px] font-medium leading-[18px] text-white transition-colors hover:bg-[#2A2B2E]"
        onClick={(e) => {
          e.stopPropagation();
          handleClickSelect();
        }}
      >
        <Plus className="h-4 w-4" />
        选择文件
      </button>

      {/* 格式提示 */}
      <p className="file-upload-section__hint absolute bottom-[20px] text-center text-[14px] leading-[14px] text-white/50">
        支持 docx，xlsx，pptx，pdf，dwg，ofd，zip，rar...
      </p>

      {/* 上传中遮罩 */}
      {uploading && (
        <div className="file-upload-section__loading absolute inset-0 flex items-center justify-center rounded-[10px] bg-black/50">
          <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-600 border-t-blue-500"></div>
            <p className="text-sm text-white">正在解析文件</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadSection;
