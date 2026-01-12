import { StatModal } from "@lds/bridge-modal";
import { CefDecodeWithKey, CefWriteLog } from "@lds/cef-bridge";
import { TStatAction } from "types/stat";

import { baseInfo } from "./constantsInstance";
import { readLocalConfig } from "./utils";

const key = "{BACECEC5-FBE0-4691-9D63-11E29F5087DA}";
const cacheMap: Record<string, any> = {
  url: null,
};
const getUrl = async () => {
  if (cacheMap.url) return cacheMap.url;
  const configPath_encrypt = await readLocalConfig("stat", "url");
  CefWriteLog("configPath_encrypt：" + configPath_encrypt);

  const configPath = await CefDecodeWithKey(
    configPath_encrypt ?? "",
    false,
    key,
  );
  const url = new URL(configPath);

  CefWriteLog("configPath：" + url.origin + url.pathname);

  cacheMap.url = url.origin + url.pathname;
  return cacheMap.url;
};
export const stat = new StatModal<TStatAction>({ url: getUrl(), ...baseInfo });
