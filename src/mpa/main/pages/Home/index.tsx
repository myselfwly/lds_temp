/**
 * HomePage 首页容器组件
 */

import React from "react";

import BrandSection from "./components/BrandSection";
import FileUploadSection from "./components/FileUploadSection";
import Header from "./components/Header";
import RecentFilesSection from "./components/RecentFilesSection";
import UrlPreviewSection from "./components/UrlPreviewSection";

export const HomePage: React.FC = () => {
  return (
    <div className="home-page relative flex min-h-screen w-full min-w-[1200px] flex-col bg-[#131313]">
      {/* 顶部导航栏 */}
      <Header />

      {/* 主内容区 */}
      <main className="home-page__main flex flex-1 flex-col px-[10px] py-[10px] pt-[84px]">
        {/* 主内容卡片 */}
        <div className="home-page__content flex flex-1 flex-col rounded-[12px] bg-[#191919] p-[10px]">
          {/* 品牌展示区 */}
          <div className="home-page__brand mb-[30px] mt-[30px] flex-shrink-0">
            <BrandSection />
          </div>

          {/* 文件上传区 - 占满剩余空间 */}
          <div className="home-page__upload mb-[26px] flex flex-1 flex-shrink-0 flex-col">
            <FileUploadSection />
          </div>

          {/* 网络文件预览区 */}
          <div className="home-page__url-preview mb-[26px] flex-shrink-0">
            <UrlPreviewSection />
          </div>

          {/* 最近文件区 - 高度固定 */}
          <div className="home-page__recent-files flex-shrink-0 pb-[30px]">
            <RecentFilesSection />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
