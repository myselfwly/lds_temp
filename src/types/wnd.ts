import { CefCreateWebView } from "@lds/cef-bridge";

/**
 * 窗口选项
 * @description 创建cef窗口的配置选项，所有参数都是可选的
 */
export type TWndOption = {
  not_force_set_parent?: 1;
  owner_hwnd?: string;
} & Parameters<typeof CefCreateWebView>[0];
/**
 * 窗口显示类型
 * @description 控制窗口的显示状态
 */
export enum TShowWnd {
  /** 隐藏窗口 */
  HIDE = "0",
  /** 显示窗口 */
  SHOW = "1",
  /** 贴桌面显示 */
  TO_DESKTOP = "2",
  /** 置顶显示 */
  TOP = "3",
}

export type TWndRect = {
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
  /** 左坐标 */
  left?: number;
  /** 上坐标 */
  top?: number;
  /** 右坐标 */
  right?: number;
  /** 下坐标 */
  bottom?: number;
  /** 是否居中 */
  middle?: boolean;
  /** 阴影宽度 */
  boxShadow?: number;
};

export type TBaseRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};
