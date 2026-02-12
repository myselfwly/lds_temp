/**
 * Base64 编码工具
 */

/**
 * 将字符串编码为 Base64
 * @param str 待编码的字符串
 * @returns Base64 编码后的字符串
 */
export const base64Encode = (str: string): string => {
  try {
    return btoa(
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) => {
        return String.fromCharCode(parseInt(p1, 16));
      }),
    );
  } catch (error) {
    console.error("Base64 encode error:", error);
    return "";
  }
};

/**
 * 将 Base64 字符串解码
 * @param str Base64 编码的字符串
 * @returns 解码后的字符串
 */
export const base64Decode = (str: string): string => {
  try {
    return decodeURIComponent(
      atob(str)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
  } catch (error) {
    console.error("Base64 decode error:", error);
    return "";
  }
};
