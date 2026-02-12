/**
 * BrandSection 品牌展示区组件
 */

import React from "react";

export const BrandSection: React.FC = () => {
  return (
    <div className="brand-section flex flex-col items-center gap-[12px]">
      {/* 主标题 */}
      <h1 className="brand-section__title text-center text-[30px] font-bold leading-[30px] text-white">
        FlashView
      </h1>

      {/* 副标题 */}
      <p className="brand-section__subtitle text-center text-[20px] leading-[20px] text-white/50">
        极速打开Office，PDF，CAD，压缩包等 50+ 种格式
      </p>
    </div>
  );
};

export default BrandSection;
