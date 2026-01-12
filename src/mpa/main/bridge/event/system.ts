import type { TEvent } from "@lds/bridge-modal";
import { CefSetWndTitle } from "@lds/cef-bridge";

import { closeWnd, setWndRect, showWnd } from "~/client";
import { constants } from "~/lib/constantsInstance";
import { TShowWnd } from "~/types/wnd";

import { bridgeModal, getWndInfo } from "../../bridge";
import { SystemEventKey } from "./types/system";

/** 主窗口创建完成：初始化数据与标题，展示窗口 */
const onWndCreate: TEvent = {
  eventName: SystemEventKey.onWndCreated,
  callback: async () => {
    console.write(SystemEventKey.onWndCreated);
    const productName = await constants.getProductName();
    CefSetWndTitle(productName);
    setWndRect("", {
      width: 460,
      height: 700,
      middle: true,
    }).then(() => {
      bridgeModal.sendMessage(SystemEventKey.onShow, "");
    });
  },
};

/** 会员信息更新：重新获取权益 */
const onVipInfoUpdate: TEvent = {
  eventName: SystemEventKey.onVipInfoUpdate,
  callback: async (json = "") => {},
};

/** 窗口展现 */
const onShow: TEvent = {
  eventName: SystemEventKey.onShow,
  callback: (json = "") => {
    console.write(SystemEventKey.onShow, json);
    showWnd("", TShowWnd.SHOW);
  },
};

/** 主窗口关闭 */
const onClose: TEvent = {
  eventName: SystemEventKey.onClose,
  callback: () => {
    console.write(SystemEventKey.onClose);
    closeWnd();
  },
};

/** 触发推广 */
const NotifyPop: TEvent = {
  eventName: "NotifyPop",
  callback: (json = "") => {
    console.write("NotifyPop", json);
    const promotionWndInfo = getWndInfo("promotion");
    if (!promotionWndInfo) {
      // create promotion wnd
    } else {
      // show promotion wnd
    }
  },
};
export const systemEventList: TEvent[] = [
  onWndCreate,
  onVipInfoUpdate,
  onShow,
  onClose,
  NotifyPop,
];
