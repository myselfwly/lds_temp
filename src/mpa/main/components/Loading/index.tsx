/**
 * Loading 加载组件
 */

import React from "react";

interface LoadingProps {
  text?: string;
}

export const Loading: React.FC<LoadingProps> = ({ text = "正在解析文件" }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center gap-4 rounded-lg bg-[#191919] px-8 py-6">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-600 border-t-blue-500"></div>
        <p className="text-sm text-white">{text}</p>
      </div>
    </div>
  );
};
