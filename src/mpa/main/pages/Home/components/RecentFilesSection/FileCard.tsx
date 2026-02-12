/**
 * FileCard 文件卡片组件
 */

import React from "react";

import { RecentFile } from "../../../../store/useAppStore";

interface FileCardProps {
  file: RecentFile;
  onClick: () => void;
}

/**
 * 获取文件类型样式
 */
const getFileTypeStyle = (fileType: RecentFile["fileType"]) => {
  switch (fileType) {
    case "doc":
      return {
        bg: "rgba(0, 74, 255, 0.4)",
        text: "#96B5FF",
        label: "DOC",
      };
    case "pdf":
      return {
        bg: "rgba(255, 24, 0, 0.4)",
        text: "#FFBDBD",
        label: "PDF",
      };
    case "dwg":
      return {
        bg: "rgba(0, 200, 82, 0.4)",
        text: "#A7FFCB",
        label: "DWG",
      };
    case "dxf":
      return {
        bg: "rgba(129, 51, 255, 0.4)",
        text: "#D2B7FF",
        label: "DXF",
      };
    default:
      return {
        bg: "rgba(128, 128, 128, 0.4)",
        text: "#CCCCCC",
        label: "FILE",
      };
  }
};

/**
 * 格式化时间
 */
const formatTime = (uploadTime: string): string => {
  try {
    const date = new Date(uploadTime);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
    } else if (days === 1) {
      return "昨天";
    } else if (days < 7) {
      return `${days}天前`;
    } else if (days < 30) {
      const weeks = Math.floor(days / 7);
      return `${weeks}周前`;
    } else {
      return date.toLocaleDateString("zh-CN");
    }
  } catch {
    return uploadTime;
  }
};

export const FileCard: React.FC<FileCardProps> = ({ file, onClick }) => {
  const typeStyle = getFileTypeStyle(file.fileType);

  return (
    <div
      onClick={onClick}
      className="file-card flex h-[60px] w-[274px] cursor-pointer items-center gap-[8px] rounded-[10px] border border-transparent bg-[#4F4F4F] px-[15px] py-[15px] transition-all hover:border-white/20 hover:bg-[#5A5A5A]"
    >
      {/* 文件类型图标 */}
      <div
        className="file-card__icon flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded"
        style={{ backgroundColor: typeStyle.bg }}
      >
        <span
          className="file-card__icon-label text-[8px] font-bold"
          style={{ color: typeStyle.text }}
        >
          {typeStyle.label}
        </span>
      </div>

      {/* 文件信息 */}
      <div className="file-card__info flex flex-1 flex-col gap-[6px] overflow-hidden">
        {/* 文件名 */}
        <p className="file-card__name truncate text-[12px] font-bold leading-[12px] text-white/80">
          {file.fileName}
        </p>

        {/* 文件路径 */}
        <p className="file-card__path truncate text-[12px] leading-[12px] text-white/50">
          {file.filePath}
        </p>
      </div>

      {/* 时间 */}
      <div className="file-card__time flex-shrink-0 text-right text-[12px] leading-[12px] text-white/50">
        {formatTime(file.uploadTime)}
      </div>
    </div>
  );
};

export default FileCard;
