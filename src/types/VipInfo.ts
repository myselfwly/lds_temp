import { EquityItemInfoRes } from "@/plugins/types";

export enum EVipStatus {
  /** 试用 */
  kTrial = 0,
  /** 试用过期 */
  kTrialExpired = 1,
  /** 充值 */
  kRecharge = 2,
  /** 充值过期 */
  kRechargeExpired = 3,
  /** 终身 */
  kLifetime = 4,
}

export const hasVip = [
  EVipStatus.kRecharge,
  EVipStatus.kLifetime,
  EVipStatus.kTrial,
];

export type TVipInfo = EquityItemInfoRes & {
  vipStatus: EVipStatus;
  isVip: boolean;
  have_paid_v2: boolean;
  have_paid: boolean;
};
