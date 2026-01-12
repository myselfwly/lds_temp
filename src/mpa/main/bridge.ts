import {
  BridgeModal,
  getShowPromisePlugin,
  getWndHandleModalPlugin,
} from "@lds/bridge-modal";

import { systemEventList } from "./bridge/event/system";
import { vipInit } from "./store/vip";

/**
 * BridgeModal 集成与事件注册
 */

const { plugins: wndControlPlugins, getWndInfo } = getWndHandleModalPlugin();
const { plugins: showPromisePlugins, getShowPromise } = getShowPromisePlugin();
const bridgeModal = BridgeModal.getInstance({
  name: "main",
  plugins: [
    ...wndControlPlugins,
    ...showPromisePlugins,
    {
      hook: "afterInit",
      fn: (bridge) => {
        bridge.registerEvents(...systemEventList);
        vipInit(bridge.registerEvents);
      },
    },
  ],
});

const { registerEvents, sendMessage, unRegisterEvents, getWndHandle, init } =
  bridgeModal;
export {
  init as bridgeInit,
  bridgeModal,
  getShowPromise,
  getWndHandle,
  getWndInfo,
  registerEvents,
  sendMessage,
  unRegisterEvents,
};
