export const isDev = process.env.NODE_ENV === "development";

export function throttle(fn: any) {
  let valid = true;
  return function (...arg: any[]) {
    if (valid) {
      valid = false;
      fn(...arg);
      setTimeout(
        () => {
          valid = true;
        },
        100 + Math.round(200 * Math.random()),
      );
    }
  };
}

export function batch<T>(fn: any, delay: number) {
  let valid = true;
  let memo: T[] = [];
  let first = true;
  return function (arg: T) {
    memo.push(arg);
    if (valid) {
      valid = false;
      // 首次进入时立即执行
      if (first) {
        fn(memo);
        memo = [];
        first = false;
      }

      // 后续延迟执行，避免最后一次执行后再进入的消息被忽略
      setTimeout(() => {
        valid = true;
        fn(memo);
        memo = [];
      }, delay);
    }
  };
}

export function formatSizeUnits(bytes: number) {
  let result = "";
  if (bytes >= 1073741824) {
    result = (bytes / 1073741824).toFixed(1) + " GB";
  } else if (bytes >= 1048576) {
    result = (bytes / 1048576).toFixed(1) + " MB";
  } else if (bytes >= 1024) {
    result = (bytes / 1024).toFixed(1) + " KB";
  } else if (bytes >= 1) {
    result = bytes + " B";
  } else {
    result = "0";
  }
  return result;
}
