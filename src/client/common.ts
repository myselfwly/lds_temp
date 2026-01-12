/**
 * 这里是各项目都可以调用的客户端公共方法
 */

import {
  CefDragWnd,
  CefGetDesktopWorkArea,
  CefRunExe,
  CefSetWndRect,
  CefShowWnd,
  CefWriteLog,
  Execute,
  RegisterFunction,
} from "@lds/cef-bridge";
import { throttle } from "lodash-es";
// import { setBaseData, useCommonStore } from "store/common/index";
import { EquityItemInfo, EquityItemInfoRes, UserInfoRes } from "types/client";
/**
 * 拖拽窗口
 * @param e
 */
export function handleWndDrag(
  e: React.MouseEvent<HTMLElement>,
  handler?: string,
) {
  // 必须是鼠标左键
  if (
    e.button === 0 &&
    !matchesSelectorAndParentsTo(
      e.target as HTMLElement,
      ".cancel-drag",
      e.currentTarget,
    )
  ) {
    return CefDragWnd(handler || "");
  }
}
/**
 * 从指定元素开始向上查找匹配选择器的元素，直到找到基准节点为止
 * @param {Element} el - 开始查找的元素
 * @param {string} selector - 需要匹配的CSS选择器
 * @param {Element} baseNode - 查找的基准节点(终止节点)
 * @returns {boolean} 如果找到匹配的元素返回true，否则返回false
 * @description 用于判断事件目标元素或其父元素是否匹配指定的选择器，主要用于拖拽功能中判断是否可以拖拽
 */
export function matchesSelectorAndParentsTo(
  el: Element,
  selector: string,
  baseNode: Element,
): boolean {
  let node: Element | null = el;
  do {
    if (node.matches(selector)) return true;
    if (node === baseNode) return false;
    node = node.parentNode as Element;
  } while (node);
  return false;
}

/**
 * 调起登录
 */
export async function AccountLogin(type?: number) {
  try {
    const res = await Execute(
      "AccountLogin",
      false,
      JSON.stringify({ login_from_type: type }),
    );
    return res;
  } catch (error) {
    console.log(error, "AccountLogin error");
    return null;
  }
}

/**
 * 获取用户信息
 * @returns
 */
export async function GetUserInfo() {
  try {
    return await Execute<UserInfoRes>("GetUserInfo");
  } catch (error) {
    return null;
  }
}

/**
 * 获取登录调起来源
 */
export async function GetLoginFrom() {
  try {
    return await Execute<{ type: number }>("GetLoginFromType", true);
  } catch (error) {
    return Promise.reject(error);
  }
}

/**
 * 获取指定模块的权益信息
 * @param module 模块名
 */
export async function GetModuleEquityInfo(
  module: string,
): Promise<EquityItemInfo | null> {
  try {
    return await Execute<EquityItemInfoRes>(
      "GetModuleVipInfo",
      true,
      module ?? "",
    );
  } catch (error) {
    console.log("GetModuleEquityInfo", error);
    return null;
  }
}

/**
 * 获取所有模块的权益信息
 * @param module 模块名
 */
export async function GetAllModuleEquityInfo(): Promise<Array<EquityItemInfo> | null> {
  try {
    return await Execute<Array<EquityItemInfoRes>>(
      "GetModuleVipInfo",
      true,
      "",
    );
  } catch (error) {
    console.log("GetModuleEquityInfo", error);
    return null;
  }
}

/**
 * 主动更新当前模块的会员信息
 * @param module 模块名
 */
export async function UpdateVipInfo(): Promise<Array<EquityItemInfo> | null> {
  try {
    return await Execute("UpdateVipInfo", true, "");
  } catch (error) {
    console.log("UpdateVipInfo", error);
    return null;
  }
}

/**
 * 打开问题反馈，现在通知不到主程序，所以要单独封装一个方法
 * @param path 安装目录
 * @param from 来源
 * @returns
 */
export async function OpenFeedBack(path: string, from: string) {
  try {
    return await CefRunExe({
      path: `${path}\\ComputerZTray.exe`,
      param: `--feedback_zcn=${from}`,
      show: "1",
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

/**
 * 置顶窗口再恢复默认
 * @param handle 窗口句柄
 */
export const highlightShow = (handle?: string) => {
  CefShowWnd("3", handle);
  setTimeout(() => {
    // 300ms 后正常展示
    CefShowWnd("1", handle);
  }, 300);
};

export const setWndCenter = async ({
  wndWidth,
  wndHeight,
  handle,
}: {
  wndWidth: number;
  wndHeight: number;
  handle?: string;
}) => {
  // 先获取电脑工作区
  const { x, y, width, height } = await CefGetDesktopWorkArea();
  // 计算居中
  const maxX = Math.max(0, Number(width) - wndWidth);
  const maxY = Math.max(0, Number(height) - wndHeight);
  const centerX = maxX / 2;
  const centerY = maxY / 2;
  CefWriteLog("开始设置窗口");
  // 设置窗口位置
  CefSetWndRect(
    {
      width: wndWidth,
      height: wndHeight,
      x: Number(x) + centerX,
      y: Number(y) + centerY,
    },
    handle,
  );
};

/**
 * 窗口失焦事件管理器
 * 用于管理窗口失焦时的回调函数
 */
const createWndBlurManager = () => {
  // 存储回调函数的集合
  const listeners = new Set<() => void>();

  // 添加回调函数
  const addListener = (callback: () => void) => {
    listeners.add(callback);
  };

  // 移除回调函数
  const removeListener = (callback: () => void) => {
    listeners.delete(callback);
  };

  // 注册窗口失焦事件处理
  RegisterFunction(
    throttle(
      (eventName: string) => {
        if (eventName === "window_deactive") {
          listeners.forEach((callback) => callback());
        }
      },
      100,
      { trailing: false },
    ),
    "OnWinEventHandler",
  );

  return {
    addListener,
    removeListener,
  };
};

// 导出窗口失焦事件监听器
export const {
  addListener: addWndBlurListener,
  removeListener: removeWndBlurListener,
} = createWndBlurManager();
