/**
 * PreviewContent 预览内容区组件
 */

import React from "react";

interface PreviewContentProps {
  url: string;
}

export const PreviewContent: React.FC<PreviewContentProps> = ({ url }) => {
  return (
    <div className="preview-content h-full w-full">
      <iframe
        src={url}
        className="preview-content__iframe h-full w-full border-0"
        title="文件预览"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      />
    </div>
  );
};

export default PreviewContent;
