import type { Draft } from "immer";

export interface Res<T> {
  errno: number;
  msg: string;
  data: T;
}

export type WritableDraft<T> = {
  -readonly [K in keyof T]: Draft<T[K]>;
};

export type Stat_paramsType = Record<string, any>;
export type Report_paramsType = Record<string, any>;
