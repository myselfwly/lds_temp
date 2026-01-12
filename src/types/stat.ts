/**
 * 业务打点类型
 */
export enum EStatBusinessAction {
  A = "A",
}

/**
 * 基础打点类型
 */
export enum EStatBaseAction {
  SHOW = "show",
  CLOSE = "close",
  A = "B",
}
/**
 * 打点类型
 */
export type TStatAction = EStatBusinessAction | EStatBaseAction;
