import { CefDecrypt } from "@lds/cef-bridge";
import axios from "axios";

const request = axios.create({
  timeout: 5000,
  baseURL: import.meta.env.DEV ? "/" : "https://example.ludashi.com/",
});

/**
 * 响应拦截
 */
request.interceptors.response.use(
  async (res) => {
    let data = res.data;
    // 字符串尝试解密
    if (typeof data === "string") {
      const dataStr = await CefDecrypt(data);
      data = JSON.parse(dataStr);
    }

    if (data?.errno === 0) {
      // 请求成功
      return data;
    } else {
      return Promise.reject({
        code: data?.errno || -1,
        msg: data?.msg || "请求失败",
      });
    }
  },
  (err) => {
    let msg = err?.message ?? "请求失败";
    let code = err?.response?.status || -1;
    // 超时处理
    if (
      err?.code === "ECONNABORTED" &&
      (err?.message ?? "").indexOf("timeout") !== -1
    ) {
      msg = "请求超时";
      code = -2;
    }

    return Promise.reject({
      code,
      msg,
    });
  },
);

export default request;
