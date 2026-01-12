/**
 * 用于检测客户端注入的方法是否存在
 * @param fn 客户端注入的方法名
 * @returns {boolean} true/false
 */
function checkFunc(fn: string): boolean {
  //@ts-ignore
  return typeof external?.[fn] === 'function';
}

/**
 * WebView2环境的external对象
 */
// @ts-ignore
const webview2External = () => chrome?.webview?.hostObjects?.external as Record<string, any>;
const isWebView2Environment = () => typeof webview2External()?.Execute === 'function';

/**
 * InternalExecute 封装
 * 执行 webview 内置方法
 * @param fn 方法名
 * @param deserialized 是否需要反序列化，即将json字符串转成js对象，如果转换失败将直接 reject
 * @param args 通过 webview2_internal_asyn 调用客户端方法需要传的参数
 */
export function InternalExecute<T = any>(
  fn: string,
  deserialized: boolean = true,
  ...args: string[]
) {
  return new Promise<T>((resolve, reject) => {
    if (isWebView2Environment()) {
      webview2External().webview2_internal_asyn(
        fn,
        (_: string, strErrorCode: string, strResult: string) => {
          if (+strErrorCode === 0) {
            // 反序列化，将json字符串转成对象
            if (deserialized) {
              try {
                const res: T = JSON.parse(strResult);
                resolve(res);
              } catch (error) {
                reject(`数据解析失败！错误信息：${JSON.stringify(error)}，调用方法：${fn}`);
              }
            } else {
              // 保持原样输出
              resolve(strResult as any);
            }
          } else {
            // 执行失败
            reject(`InternalExecute 执行失败！错误码：${strErrorCode}，调用的方法：${fn}`);
          }
        },
        ...args
      );
    } else {
      reject(`当前不是WebView2环境`);
    }
  });
}

/**
 * Execute 封装
 * @param fn 方法名
 * @param deserialized 是否需要反序列化，即将json字符串转成js对象，如果转换失败将直接 reject
 * @param args 通过 Execute 调用客户端方法需要传的参数
 */
function CefExecute<T = any>(fn: string, deserialized: boolean = true, ...args: string[]) {
  return new Promise<T>((resolve, reject) => {
    if (checkFunc('Execute')) {
      //@ts-ignore
      external['Execute'](
        fn,
        (_: string, strErrorCode: string, strResult: string) => {
          if (+strErrorCode === 0) {
            // 反序列化，将json字符串转成对象
            if (deserialized) {
              try {
                const res: T = JSON.parse(strResult);
                resolve(res);
              } catch (error) {
                reject(`数据解析失败！错误信息：${JSON.stringify(error)}，调用方法：${fn}`);
              }
            } else {
              // 保持原样输出
              resolve(strResult as any);
            }
          } else {
            // 执行失败
            reject(`Execute 执行失败！错误码：${strErrorCode}，调用的方法：${fn}`);
          }
        },
        ...args
      );
    } else {
      reject(`当前环境不存在或不支持 Execute 方法`);
    }
  });
}

(function () { 
  const PENDING = "pending" as const;
  const FULFILLED = "fulfilled" as const;
  const REJECTED = "rejected" as const;
  Promise.withResolvers = function <T>() {
    let resolve!: (value: T) => void;
    let reject!: (reason?: any) => void;
    let status: typeof PENDING | typeof FULFILLED | typeof REJECTED = PENDING;

    const promise: Promise<T> = new Promise<T>((res, rej) => {
      resolve = (value: T) => {
        status = FULFILLED;
        res(value);
      }
      reject = (reason?: any) => {
        status = REJECTED;
        rej(reason);
      };
    });

    const result: {
      promise: Promise<T>;
      resolve: (value: T) => void;
      reject: (reason?: any) => void;
      status: typeof PENDING | typeof FULFILLED | typeof REJECTED;
      getStatus: () => typeof PENDING | typeof FULFILLED | typeof REJECTED;
    } = {
      promise,
      resolve,
      reject,
      get status() {
        return status as typeof PENDING | typeof FULFILLED | typeof REJECTED;
      },
      getStatus: () => status as typeof PENDING | typeof FULFILLED | typeof REJECTED,
    };

    return result;
  };
})()

function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
// function isValidIPv4(ip:string) {
//   const ipv4Pattern = /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/;
//   return ipv4Pattern.test(ip);
// }
function CefWriteLog(content: string) {
  if (isWebView2Environment()) {
    InternalExecute('BasicWriteLog', false, JSON.stringify({ content }));
  } else {
    CefExecute('BasicWriteLog', false, JSON.stringify({ content }));
  }
}
// 错误日志
const oldConsoleError = window.console.error;
window.console.error = function (...args: any[]) {
  oldConsoleError.apply(window.console, args);
  let error = "\njs error: \n";
  for (let i = 0; i < args.length; i++) {
    if (typeof args[i] === 'object') {
      error += JSON.stringify(args[i]) + "\n";
    } else {
      error += args[i].toString() + "\n";
    }
  }
  CefWriteLog(error);
};
window.console.write = function (...args: any[]) { 
  // const isDev = isValidIPv4(location.host)
  // window.console.log(...args);
  const date = formatTimestamp(Date.now())
  const href = location.href
  let log = `\n================ console.write start =============== \n${date} | ${href} \n`
  for (let i = 0; i < args.length; i++) {
    if (typeof args[i] === 'object') {
      log += JSON.stringify(args[i]) + "\n";
    } else if(typeof args[i] === "undefined") {
      log += "undefined" + "\n";
    } else if(args[i] === null) {
      log += "null" + "\n";
    } else {
      log += args[i].toString() + "\n";
    }
  }
  log += "================ console.write end==============="
  CefWriteLog(log)
}

//Object.hasOwn
declare global {
  interface ObjectConstructor {
    hasOwn(obj: object, prop: PropertyKey): boolean;
  }
}
Object.hasOwn = Object.hasOwn || function (obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}