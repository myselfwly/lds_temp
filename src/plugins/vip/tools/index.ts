import { CefWriteLog, Execute } from "@lds/cef-bridge";
import { VipMiddleware } from "@vip";

import { constants } from "~/lib/constantsInstance";

import { EquityItemInfo, EquityItemInfoRes } from "../../types";

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

const openPayCenter = {
  key: "open_recharge_center",
  async open() {
    const paramEx = VipMiddleware.statParam;
    // 获取产品key
    const appKey = await constants.getProductKey();
    // 获取web扩展参数
    let paramRes: Record<string, string | number> = {};
    try {
      const data = window.__dat_cache__ ?? {};
      if (typeof data?.pop_data === "string") {
        paramRes = JSON.parse(data.pop_data);
      } else {
        paramRes = data.pop_data;
      }
      CefWriteLog("GetWebExtParams: " + JSON.stringify(paramRes));
    } catch (error) {
      console.log("GetWebExtParams error", error);
    }
    // 获取统计参数
    const { pid, app, product_ver } = await constants.getStatisticParam();
    // 构建统计参数
    const stat_params = {
      from_app: app,
      app,
      pid,
      ...paramRes,
      ...paramEx,
      product_ver,
    };
    // 构建上报参数
    const report_params = {
      from_app: app,
      app,
      pid,
      ...paramRes,
      ...paramEx,
      product_ver,
    };
    /* 
    // 获取独立版运行状态
    const independent = await constants.independentRunning;
    // 判断是否来自鲁大师
    const isFromLds = app === "ludashi"; */
    // 打开支付中心
    VipMiddleware.openPayCenter({
      module: appKey,
      fuc: appKey,
      stat_params,
      report_params,
      // 独立版或非鲁大师版本使用single模式（某些产品不绑定尊享版会员直接传"single"）
      mode: "single",
    });
  },
};
export { openPayCenter };
