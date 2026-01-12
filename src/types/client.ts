/** */
export type TokenType = string | null;
/**
 * 鲁大师傅各功能模块
 * 服务类型（monitor 监控面板 clean 文件搬家 vip 尊享会员）
 */
export type LDSModule =
  | "monitor"
  | "clean"
  | "vip"
  | "desk_aide"
  | "stars"
  | "unst_mod"
  | "wxclean"
  | "qclean";

/** 打点参数 */
export interface StatParam {
  /** 应用 */
  app: string;
  /** 主版本号 */
  appver: string;
  /** 设备值 */
  mid: string;
  /** 设备值 */
  mid2: string;
  /** 模块版本 */
  modver: string;
  /** 操作系统 */
  osver: string;
  /** 杀软 */
  sr: string;
  hardware_dll_ver: string;
  /** 产品 */
  pid: string;
}

/** 基础数据 */
export interface BaseData {
  ProductID: string;
  ProductType: string;
  OsBit: number;
  Mid: string;
  Mid2: string;
  ProductDir: string;
  InstallDate: string;
}

/**
 * 用户信息
 * {"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hY2NvdW50Lmx1ZGFzaGkuY29tXC9hcGlcL3BjXC9Mb2dpblwvbG9naW4iLCJpYXQiOjE2NjMxNDI2NjcsImV4cCI6MTgxODY2MjY2NywibmJmIjoxNjYzMTQyNjY3LCJqdGkiOiJIRE8zWG9BUjJ6SHljc28wIiwic3ViIjozNzY0MSwicHJ2IjoiYTRjNDg4YTkwNzBkMzA1MWVjODJlYWJjOWJhNmNkZjIxZWQ2NTUzYyJ9.A112OjzrzmpWHKvGny_3AsNy5sA8PRVXL2jm8gGarfo","userInfo":{"id":37641,"username":"15008476806","nickname":"大师hRUzNk","telephone":"15008476806","mail":"","avatar":"https://cdn-img.ludashi.com/pc/ucenter/avatar/default.png","signature":"","age":0,"gender":3,"birth":"0000-00-00","register_date":"2022-01-11","display_id":"3597786810","user_channel_info":[2]}}
 */
export interface UserInfo {
  id: number;
  username: string;
  nickname: string;
  telephone: string;
  mail: string;
  avatar: string;
  signature: string;
  age: number;
  gender: number;
  birth: string;
  register_date: string;
  display_id: string;
  user_channel_info: Array<number>;
}

/**
 * 个人信息
 * {"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hY2NvdW50Lmx1ZGFzaGkuY29tXC9hcGlcL3BjXC9Mb2dpblwvbG9naW4iLCJpYXQiOjE2NjMxNDI2NjcsImV4cCI6MTgxODY2MjY2NywibmJmIjoxNjYzMTQyNjY3LCJqdGkiOiJIRE8zWG9BUjJ6SHljc28wIiwic3ViIjozNzY0MSwicHJ2IjoiYTRjNDg4YTkwNzBkMzA1MWVjODJlYWJjOWJhNmNkZjIxZWQ2NTUzYyJ9.A112OjzrzmpWHKvGny_3AsNy5sA8PRVXL2jm8gGarfo","userInfo":{"id":37641,"username":"15008476806","nickname":"大师hRUzNk","telephone":"15008476806","mail":"","avatar":"https://cdn-img.ludashi.com/pc/ucenter/avatar/default.png","signature":"","age":0,"gender":3,"birth":"0000-00-00","register_date":"2022-01-11","display_id":"3597786810","user_channel_info":[2]}}
 */
export interface UserInfoRes {
  token: string;
  visitor_token: string;
  userInfo: UserInfo;
}

/**
 * 权益信息
 */
export interface EquityItemInfo {
  /** 服务类型（monitor 监控面板 clean 文件搬家 vip 尊享会员） */
  type: LDSModule;
  /** 服务到期时间 */
  end_date: string;
  /** 服务剩余时长（单位秒）*/
  ttl: number;
  /**是否弹窗（监控面板用）*/
  popup: boolean;
  /** 是否付过费 */
  hasPaid: boolean;
  /** 当前支持的设备台数 */
  device_count: number;
  /** 是否是终身 */
  lifetime: boolean;
}

/**
 * 客户端接口返回
 */
export interface EquityItemInfoRes extends EquityItemInfo {
  /** 错误码 */
  err_code?: number;
}

/**
 * 登录来源
 */
export enum LoginSourceType {
  kLoginNone = 0, // 未登录
  kAutologin, // 自动登录
  kLoginFromUnknow, // 未知
  kLoginFromMain, // 登录来源于主界面
  kLoginFromExam, // 登录来源于体检页面
  kLoginFromBench, // 登录来源于评测页面
  kLoginFromParams, // 登录来源于硬件参数页面
  kLoginFromProtect, // 登录来源于硬件防护页面
  kLoginFromClean, // 登录来源于垃圾清理页面
  kLoginFromSupperApp, // 登录来源于超级工具页面
  kLoginFromSoftmgr, // 登录来源于装机必备页面
  kLoginFromRanking, // 登录来源于排行榜页面
  kLoginFromMonitor, // 登录来源于监控面板页面
  kLoginFromPayment, // 登录来源于充值页面
}

export interface GetPathFileVerRes {
  /** 错误码 0:成功 1:参数错误 2:获取失败 3:路径不存在 */
  code: 0 | 1 | 2 | 3;
  /** 版本号结果，失败则为空字符串 */
  ver: string;
}
