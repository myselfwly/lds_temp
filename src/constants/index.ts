export * from "./ComputerZ.set";
export * from "./events";
export * from "./wnd-config";

export const PRODUCT_MODULE_NAME = "temp_key";
export const devOrigin = window.location.origin;
// 替换，非对称加密
export const subWndUrlPrefix = "zip://rsa_0CA42E8A-E041-492E-B7C2-703494DED02F";

// exe的相对路径，用于打点和创建快捷方式，注意需要和客户端最终确认！！！
export const RelativeExePath = "\\SuperApp\\temp_key\\temp_key.exe";
export const RelativeDatPath = "\\SuperApp\\temp_key\\temp_key.dat";
// 配置文件路径（此处仅为示例，如果客户端有配置文件，也可以用）
export const RelativeConfigPath = "\\SuperApp\\temp_key\\temp_key.set";
export const ShortcutName = "模板项目.lnk";

/**
 * 通用配置加密 key
 */
export const COMMON_LIST_KEY = "45476F8083D74AC28A2DA8ED399737B7";
