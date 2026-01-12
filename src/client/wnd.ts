import {
  CefAsync,
  CefCloseWnd,
  CefDragWnd,
  CefGetDesktopWorkArea,
  CefGetWndRect,
  CefSetWndRect,
  CefShowWnd,
} from "@lds/cef-bridge";

import { constants } from "~/lib/constantsInstance";
import { TBaseRect, TShowWnd, TWndOption, TWndRect } from "~/types/wnd";

import { matchesSelectorAndParentsTo } from "./common";
const cacheMap: Record<string, any> = {};

export const avoidDragClassName = "avoid-drag";

/**
 * 创建窗口
 * @static
 * @param {string} name - 窗口名称,用于标识窗口,必须唯一
 * @param {TWndOption} [option] - 窗口选项,包含窗口的各种配置参数
 * @returns {Promise<string>} 窗口句柄
 * @description 创建一个新窗口。在开发环境和生产环境下使用不同的URL构建方式。
 */
export const createWnd = async (
  name: string,
  option: TWndOption = {},
): Promise<string> => {
  const { promise: urlPromise, resolve } = Promise.withResolvers<string>();
  const { promise: handlePromise, resolve: handleResolve } =
    Promise.withResolvers<string>();
  if (import.meta.env.DEV) {
    resolve(`${window.location.origin}/${name}`);
  } else {
    const subWndUrlPrefix = await constants.getSubWndUrlPrefix();
    const datPath = await constants.getDatPath();
    resolve(`${subWndUrlPrefix}|${datPath}|/build/${name}.html`); // 需要核对路径
  }
  urlPromise.then((url) => {
    const params = {
      parent_handle: option.parentHandler ?? "",
      force_parent_handle: option.force_parent_handle,
      wnd_type: option.wndType ?? "1",
      trans_to_child: option.trans_to_child,
      transparency: option.transparent ?? "1",
      inherit_func: option.inherit ?? "0",
      url: url ?? "",
      is_tool_wnd: option.toolWnd ?? "0",
      class_name: option.name ?? "",
      ie_engine: option.engine ?? "0",
      sync_parent_wnd: option.sync ?? "1",
      enable_wab_full_screen: option.fullscreen ?? "1",
      rect: option.rect ?? {
        x: 0,
        y: 0,
        width: 1,
        height: 1,
      },
      workarea: option.workarea,
      fail_url: option.failUrl ?? "",
      timeout_sec: option.timeout,
      special_command: option.command ?? "",
      is_shadow_edge: option.shadow ?? "0",
      not_force_set_parent: option.not_force_set_parent,
    };
    CefAsync("BasicCreateWebView", JSON.stringify(params)).then((res) => {
      if (+res.code !== 1) {
        throw new Error(res);
      } else {
        handleResolve(res.handle);
      }
    });
  });
  return handlePromise;
};

/**
 * 显示窗口
 * @param {string} handle - 窗口句柄
 * @param {TShowWnd} type - 窗口显示类型
 */
export const showWnd = (handle: string, type: TShowWnd) => {
  const { promise, resolve } = Promise.withResolvers<void>();
  if (type === TShowWnd.SHOW) {
    CefShowWnd(TShowWnd.TOP, handle);
    setTimeout(() => {
      CefShowWnd(type, handle);
      resolve();
    }, 300);
  } else {
    CefShowWnd(type, handle);
    resolve();
  }
  return promise;
};
/**
 * 关闭窗口
 * @static
 * @param {string} handle - 窗口句柄
 * @returns {Promise<void>} 关闭窗口的promise
 * @description 关闭一个窗口。
 */
export const closeWnd = async (handle: string = "") => {
  return Promise.resolve(CefCloseWnd(handle));
};

/**
 * 窗口关闭前执行
 * @static
 * @param {object} option - 窗口选项
 * @param {string} option.handle - 窗口句柄
 * @param {function} option.callback - 关闭窗口前的回调函数，支持返回Promise
 * @param {number} option.timeout - 关闭窗口前的超时时间（毫秒）
 * @returns {Promise<void>} 关闭窗口前的promise
 * @description 窗口关闭前执行回调函数。支持多个回调排队执行，每个回调完成后从队列移除，队列为空时关闭窗口。
 */
export const beforeCloseWnd = async (option: {
  handle: string;
  callback: () => void | Promise<void>;
  timeout?: number;
}) => {
  // 获取超时时间，默认1000ms
  const timeout = option.timeout ?? 1000;

  // 初始化或获取缓存数据，用于管理窗口关闭前的回调队列
  const cacheKey = `beforeCloseWnd_${option.handle}`;
  cacheMap[cacheKey] = cacheMap[cacheKey] || {
    queue: [], // 回调队列
    timeout: 1000, // 超时时间
    timer: null, // 超时定时器
    isClosing: false, // 是否正在关闭，防止重复关闭
    isHidden: false, // 是否已经隐藏
  };

  const cacheData = cacheMap[cacheKey];

  // 更新超时时间
  cacheData.timeout = timeout;

  // 检查是否已经在关闭流程中
  if (cacheData.isClosing) {
    return;
  }
  // 隐藏窗口
  if (!cacheData.isHidden) {
    showWnd(option.handle, TShowWnd.HIDE);
    cacheData.isHidden = true;
  }
  // 将回调函数包装成Promise并加入队列
  const callbackPromise = Promise.resolve(option.callback()).catch((err) => {
    // 即使回调失败也继续执行，只记录错误
    console.error("beforeCloseWnd callback error:", err);
  });

  cacheData.queue.push(callbackPromise);

  // 当回调完成时（无论成功还是失败），从队列中移除并检查是否关闭
  callbackPromise.finally(() => {
    // 从队列中移除已完成的回调
    const index = cacheData.queue.indexOf(callbackPromise);
    if (index > -1) {
      cacheData.queue.splice(index, 1);
    }

    // 检查队列是否为空
    checkAndClose(cacheKey, option.handle);
  });

  // 设置或更新超时定时器
  if (cacheData.timer) {
    // 如果已有定时器，先清除再重新设置（重置超时时间）
    clearTimeout(cacheData.timer);
  }

  // 创建新的超时定时器
  cacheData.timer = setTimeout(() => {
    // 超时后检查队列是否为空，如果为空则关闭
    checkAndClose(cacheKey, option.handle);
  }, cacheData.timeout);

  // 检查队列并关闭窗口的辅助函数
  function checkAndClose(key: string, handle: string) {
    const data = cacheMap[key];
    if (!data) return;

    // 如果队列为空且未在关闭流程中，则关闭窗口
    if (data.queue.length === 0 && !data.isClosing) {
      data.isClosing = true;
      // 清除超时定时器
      if (data.timer) {
        clearTimeout(data.timer);
        data.timer = null;
      }
      // 执行窗口关闭
      CefCloseWnd(handle);
      // 清理缓存
      delete cacheMap[key];
    }
  }
};

/**
 * 设置窗口位置和大小
 * @param {string} handle - 窗口句柄
 * @param {Object} rect - 窗口位置和大小
 * @param {number} rect.width - 宽度
 * @param {number} rect.height - 高度
 * @param {number} rect.left - 左坐标
 * @param {number} rect.top - 上坐标
 * @param {number} rect.right - 右坐标
 * @param {number} rect.bottom - 下坐标
 * @param {boolean} rect.middle - 是否居中
 * @param {number} [rect.boxShadow] - 窗口阴影，默认0
 */
export const setWndRect = async (
  handle: string,
  rect: TWndRect,
  parentRect?: TBaseRect,
) => {
  let { width, height, left, top, right, bottom, middle, boxShadow = 0 } = rect;
  width += boxShadow * 2;
  height += boxShadow * 2;
  // 先获取电脑工作区
  const {
    x,
    y,
    width: desktopWidth,
    height: desktopHeight,
  } = parentRect || (await CefGetDesktopWorkArea());
  if (middle) {
    left = Number(x) + (Number(desktopWidth) - width) / 2;
    top = Number(y) + (Number(desktopHeight) - height) / 2;
    return CefSetWndRect({ width, height, x: left, y: top }, handle);
  }
  if (left === undefined) {
    if (right === undefined) {
      left = 0;
    } else {
      left = Number(x) + Number(desktopWidth) - width - Number(right);
    }
  }
  if (top === undefined) {
    if (bottom === undefined) {
      top = 0;
    } else {
      top = Number(y) + Number(desktopHeight) - height - Number(bottom);
    }
  }

  return CefSetWndRect({ width, height, x: left, y: top }, handle);
};

/**
 * 获取窗口位置和大小
 * @param {string} handle - 窗口句柄
 * @returns {Promise<{x: number, y: number, width: number, height: number}>} 窗口位置和大小
 */
export const getWndRect = (handle: string) => {
  return CefGetWndRect(handle);
};

/**
 * 拖动窗口
 * @param {string} handle - 窗口句柄
 * @param {React.MouseEvent<HTMLElement, MouseEvent>} e - 鼠标事件
 */
export const dragWnd = (
  handle: string,
  e: React.MouseEvent<HTMLElement, MouseEvent>,
) => {
  // 必须是鼠标左键
  if (
    e.button === 0 &&
    !matchesSelectorAndParentsTo(
      e.target as HTMLElement,
      `.${avoidDragClassName}`,
      e.currentTarget,
    )
  ) {
    CefDragWnd(handle || "");
  }
};
