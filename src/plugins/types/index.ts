/**
 * 权益信息
 */
export interface EquityItemInfo {
  /** 服务类型（monitor 监控面板 clean 文件搬家 vip 尊享会员） */
  type: string;
  /** 服务到期时间 */
  end_date: string;
  /** 服务剩余时长（单位秒）*/
  ttl: number;
  /**是否弹窗（监控面板用）*/
  popup: boolean;
  /** 是否付过费 */
  hasPaid: boolean;
  /** 当前支持的设备台数 */
  device_count: number;
  /** 是否是终身 */
  lifetime: boolean;
}
/**
 * 客户端接口返回
 */
export interface EquityItemInfoRes extends EquityItemInfo {
  /** 错误码 */
  err_code?: number;
}

export type Stat_paramsType = {
  [x: string]: any;
};

export type Report_paramsType = {
  [x: string]: any;
};

export enum TPayCenter {
  /** 鲁大师支付中心 */
  LU_DA_SHI_PAY_CENTER = 0,
  /** 联想支付中心 */
  LENOVO_PAY_CENTER = 1,
}

export enum VipStatus {
  /** 未到期 */
  kNotExpired = 0,
  /** 已过期 */
  kExpired = 1,
  /** 终身 */
  kLifetime = 2,
}

export const initVipInfo: EquityItemInfoRes = {
  ttl: -1,
  type: "",
  end_date: "",
  popup: false,
  hasPaid: false,
  device_count: 0,
  lifetime: false,
  err_code: 0,
};
