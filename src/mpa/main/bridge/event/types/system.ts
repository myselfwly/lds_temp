import { EClientNotify } from "@/constants/events";

/**
 * 系统事件枚举（映射宿主事件名）
 */
export enum SystemEventKey {
  /** 主窗口创建完成 */
  onWndCreated = EClientNotify.MAIN_WEB_WND_CREATED,
  /** 会员信息更新 */
  onVipInfoUpdate = EClientNotify.NOTIFY_VIP_INFO_UPDATE,
  /** 窗口展现 */
  onShow = EClientNotify.DISPLAY,
  /** 主窗口关闭 */
  onClose = EClientNotify.MAIN_WEB_WND_CLOSE,
}
