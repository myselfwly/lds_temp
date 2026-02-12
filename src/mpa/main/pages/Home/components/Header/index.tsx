/**
 * Header 顶部导航栏组件
 */

import { Minus, Square, X } from "lucide-react";
import React from "react";

interface HeaderProps {
  onSettingsClick?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSettingsClick,
  onMinimize,
  onMaximize,
  onClose,
}) => {
  return (
    <header className="header fixed left-0 top-0 z-50 flex h-[74px] w-full items-center justify-between bg-[#131313] px-[30px]">
      {/* 左侧：Logo + 标题 */}
      <div className="header__left flex items-center gap-[13px]">
        {/* Logo 占位 */}
        <div className="header__logo h-[34px] w-[33px] rounded bg-gradient-to-br from-[#267BF9] to-[#26F4E4] opacity-80"></div>

        {/* 标题 */}
        <h1 className="header__title text-[20px] font-bold leading-[20px] text-white">
          FlashView
        </h1>
      </div>

      {/* 右侧：设置 + 窗口控制 */}
      <div className="header__right flex items-center gap-[10px]">
        {/* 设置按钮（预留） */}
        <button
          onClick={onSettingsClick}
          className="header__settings flex h-[20px] w-[20px] items-center justify-center opacity-60 transition-opacity hover:opacity-100"
          aria-label="设置"
        >
          <div className="h-3 w-3 rounded bg-[#9F9EA3]"></div>
        </button>

        {/* 窗口控制按钮 */}
        <div className="header__window-controls flex items-center gap-[15px]">
          {/* 最小化 */}
          <button
            onClick={onMinimize}
            className="header__minimize flex h-[20px] w-[20px] items-center justify-center text-[#9F9EA3] transition-colors hover:text-white"
            aria-label="最小化"
          >
            <Minus className="h-4 w-4" />
          </button>

          {/* 最大化 */}
          <button
            onClick={onMaximize}
            className="header__maximize flex h-[20px] w-[20px] items-center justify-center text-[#9F9EA3] transition-colors hover:text-white"
            aria-label="最大化"
          >
            <Square className="h-3 w-3" />
          </button>

          {/* 关闭 */}
          <button
            onClick={onClose}
            className="header__close flex h-[20px] w-[20px] items-center justify-center text-[#9F9EA3] transition-colors hover:text-red-500"
            aria-label="关闭"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
