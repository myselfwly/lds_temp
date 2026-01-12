/**
 * ComputerZ.set 文件相关的枚举值
 */

/**
 * ComputerZ 文件名
 */
export const COMPUTERZ_FILE_NAME = "ComputerZ.set";

/**
 * ComputerZ 下面的 section
 */
export enum EComputerZSection {
  BROWSER_GUARD = "BrowserGuard",
  GENERAL = "general",
}

/**
 * general 节点下的 key
 */
export enum EComputerZGeneralKey {
  /** 是否弹窗询问，默认弹窗 */
  EXTENSION_PARAMS = "extension_params",
}
