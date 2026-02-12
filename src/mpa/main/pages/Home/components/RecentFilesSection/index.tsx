/**
 * RecentFilesSection 最近文件区组件
 */

import { Clock } from "lucide-react";
import React from "react";

import { useRecentFiles } from "../../../../hooks/useRecentFiles";
import FileCard from "./FileCard";

export const RecentFilesSection: React.FC = () => {
  const { recentFiles, loadingFiles, handleFileClick } = useRecentFiles();

  // 最多显示4个文件
  const displayFiles = recentFiles.slice(0, 4);

  return (
    <div className="recent-files-section w-full">
      {/* 区域标题 */}
      <div className="recent-files-section__header mb-[16px] flex items-center gap-[6px]">
        <Clock className="h-4 w-4 text-white opacity-60" />
        <h2 className="recent-files-section__title text-[16px] font-bold leading-[16px] text-white">
          最近打开
        </h2>
      </div>

      {/* 文件列表 */}
      {loadingFiles ? (
        <div className="recent-files-section__loading flex h-[60px] items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-600 border-t-blue-500"></div>
        </div>
      ) : displayFiles.length === 0 ? (
        /* 空状态 */
        <div className="recent-files-section__empty flex h-[60px] flex-col items-center justify-center rounded-[10px] border border-dashed border-white/20">
          <p className="text-[14px] text-white/50">暂无最近打开的文件</p>
        </div>
      ) : (
        <div className="recent-files-section__list grid h-[60px] grid-cols-4 gap-[15px]">
          {displayFiles.map((file) => (
            <FileCard
              key={file.fileId}
              file={file}
              onClick={() => handleFileClick(file)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentFilesSection;
