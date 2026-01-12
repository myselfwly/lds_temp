/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
interface PromiseConstructor {
  withResolvers<T = any>(): {
    promise: Promise<T>;
    resolve: (value: T) => void;
    reject: (reason?: any) => void;
    status: "pending" | "fulfilled" | "rejected";
    getStatus: () => "pending" | "fulfilled" | "rejected";
  };
}
interface Console {
  write(...args: any[]): void;
}
interface Window {
  __dat_cache__?: Record<string, any>;
}
