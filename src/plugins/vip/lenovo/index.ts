import { Execute } from "@lds/cef-bridge";

import { constants } from "~/lib/constantsInstance";

import {
  EquityItemInfoRes,
  Report_paramsType,
  Stat_paramsType,
  TPayCenter,
} from "../../types";
import { openPayCenter } from "../tools";

console.log("lenovo VipMiddleware");

// 默认会员信息
const DEFAULT_VIP_INFO: EquityItemInfoRes = {
  type: "", // 会员类型
  end_date: "", // 到期时间
  ttl: -1, // 剩余时间
  popup: false, // 是否弹窗
  hasPaid: false, // 是否付费
  device_count: -1, // 设备数量
  lifetime: false, // 是否终身会员
};

class VipMiddleware {
  private static type: TPayCenter = TPayCenter.LENOVO_PAY_CENTER;
  private static eventKey: string = "NotifyThirdVipUpdated";
  /**
   * 打开支付中心
   * @param params 支付参数
   * @returns Promise
   */
  static async openPayCenter(params: {
    module: string; // 模块名
    fuc: string; // 功能名
    stat_params?: Stat_paramsType; // 统计参数
    report_params?: Report_paramsType; // 上报参数
    mode?: "single"; // 模式
  }) {
    try {
      return await Execute(
        "LaunchThirdPaymentWeb",
        true,
        JSON.stringify({
          channel: VipMiddleware.type,
          transparent_data: JSON.stringify(params),
        }),
      );
    } catch (error) {
      console.log("LaunchThirdPaymentWeb", error);
      return Promise.reject(error);
    }
  }

  /**强制刷新Vip信息 */
  static async refreshVipInfo() {
    console.log("UpdateThirdVipChange");
    const productKey = await constants.getProductKey();
    Execute("UpdateThirdVipChange", false, productKey);
  }

  static async openPayCenterFromExe() {
    return openPayCenter.open();
  }
  static openKey = openPayCenter.key;
  static statParam: Record<string, any> = {};
  // 当前会员信息
  vipInfo: EquityItemInfoRes;
  // 更新触发器集合
  updateTrigger: Set<
    (prev: EquityItemInfoRes, next: EquityItemInfoRes) => void
  >;
  // 桥接更新配置
  bridgeUpdate: {
    key: string;
    handler: (module: string) => Promise<EquityItemInfoRes>;
  };

  constructor() {
    this.vipInfo = DEFAULT_VIP_INFO;
    this.updateTrigger = new Set();
    this.bridgeUpdate = {
      key: VipMiddleware.eventKey,
      handler: this.getVipInfo.bind(this), // 需要绑定this
    };
  }

  /**
   * 获取会员信息
   * @param module 模块名
   * @returns 会员信息
   */
  async getVipInfo(_module: string) {
    const vipInfo = (await Execute("GetThirdVipInfo")) || DEFAULT_VIP_INFO;
    console.log("vipInfo", vipInfo);
    this.updateVipInfo(vipInfo);
    return vipInfo;
  }

  /**
   * 更新会员信息
   * @param module 模块名
   * @param vipInfo 会员信息
   */
  updateVipInfo(vipInfo: EquityItemInfoRes) {
    this.updateTrigger.forEach((trigger) => trigger(this.vipInfo, vipInfo));
    this.vipInfo = vipInfo;
  }

  /**
   * 添加更新触发器
   * @param trigger 触发器函数
   */
  onUpdate(
    trigger: (prev: EquityItemInfoRes, next: EquityItemInfoRes) => void,
  ) {
    this.updateTrigger.add(trigger);
  }

  /**
   * 移除更新触发器
   * @param trigger 触发器函数
   */
  offUpdate(
    trigger: (prev: EquityItemInfoRes, next: EquityItemInfoRes) => void,
  ) {
    this.updateTrigger.delete(trigger);
  }

  /**
   * 清空所有更新触发器
   */
  clearUpdate() {
    this.updateTrigger.clear();
  }
  async OpenPaymentCenterExMian() {
    return await VipMiddleware.openPayCenterFromExe();
  }
}

const vipInstance = new VipMiddleware();
export { vipInstance, VipMiddleware };
