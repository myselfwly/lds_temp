import { CefReadIniFile, CefWriteIniFile } from "@lds/cef-bridge";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { constants } from "./constantsInstance";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function readLocalConfig(sections: string, key: string) {
  try {
    const configPath = await constants.getConfigPath();

    const { code, value } = await CefReadIniFile({
      sections,
      key,
      path: configPath, // 每个项目定义一个单独的配置文件
    });

    if (code === "1" && value) {
      return value;
    }
  } catch (error) {
    console.log("readLocalConfig error", error);
  }
}

export async function writeLocalConfig(
  sections: string,
  key: string,
  value: string,
) {
  try {
    const configPath = await constants.getConfigPath();

    CefWriteIniFile({
      sections,
      key,
      value,
      path: configPath, // 每个项目定义一个单独的配置文件
    });
  } catch (error) {
    console.log("writeLocalConfig error", error);
  }
}
