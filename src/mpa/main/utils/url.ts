/**
 * URL 处理工具
 */

/**
 * 验证URL格式
 * @param url 待验证的URL
 * @returns 是否为有效的URL
 */
export const isValidUrl = (url: string): boolean => {
  if (!url || url.trim() === "") {
    return false;
  }

  // 验证是否以 http:// 或 https:// 开头
  const urlPattern = /^https?:\/\/.+/i;
  return urlPattern.test(url.trim());
};

/**
 * 从URL中提取文件名
 * @param url 文件URL
 * @returns 文件名
 */
export const getFileNameFromUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const fileName = pathname.substring(pathname.lastIndexOf("/") + 1);
    return decodeURIComponent(fileName) || "未命名文件";
  } catch {
    return "未命名文件";
  }
};

/**
 * 解析哈希路由参数
 * @returns 路由参数对象
 */
export const parseHashParams = (): Record<string, string> => {
  const hash = window.location.hash;
  const queryString = hash.includes("?") ? hash.split("?")[1] : "";

  if (!queryString) {
    return {};
  }

  const params: Record<string, string> = {};
  const pairs = queryString.split("&");

  pairs.forEach((pair) => {
    const [key, value] = pair.split("=");
    if (key) {
      params[key] = decodeURIComponent(value || "");
    }
  });

  return params;
};

/**
 * 获取当前哈希路由路径
 * @returns 路由路径（不含参数）
 */
export const getHashPath = (): string => {
  const hash = window.location.hash.slice(1); // 移除 #
  return hash.includes("?") ? hash.split("?")[0] : hash;
};
