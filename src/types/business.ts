/**
 * FeatureType 表示主功能相关的特征信息结构。
 *
 * @property key            唯一标识功能项的键
 * @property main_title     功能主标题
 * @property desc_txt       描述文本（可能包含HTML标签或占位符）
 * @property unit_type      单位类型（如:size, num, 等）
 * @property need_vip       是否需要VIP权限("1"表示需要)
 * @property invalid_txt    无数据/数据无效时显示的文本
 * @property product_key    该功能所属产品键
 * @property show_corner    是否显示角标（"1"：显示）
 * @property icon           功能图标URL，可选
 * @property limit          限制条件，可选
 */
export interface FeatureType {
  /** 唯一标识功能项的键 */
  key: string;
  /** 功能主标题 */
  main_title: string;
  /** 描述文本（可能包含HTML标签或占位符） */
  desc_txt: string;
  /** 单位类型（如:size, num等） */
  unit_type: string;
  /** 是否需要VIP权限，"1"表示需要 */
  need_vip: string;
  /** 无数据/无效数据时显示的提示文本 */
  invalid_txt: string;
  /** 所属产品键 */
  product_key: string;
  /** 是否显示角标，"1"为显示 */
  show_corner: string;
  /** 功能图标URL，可选 */
  icon?: string;
  /** 多彩图标，可选 */
  colorful_icon?: string;
  /** 所属软件 */
  app: string;
  /** 限制条件，可选 */
  limit?: {
    /** 最小值，可选 */
    min?: number;
    /** 最大值，可选 */
    max?: number;
    /** 脚本，可选 */
    script?: string;
  }[];
  /** 命令行 */
  cmd: string;
}

export interface TUsageInfo {
  list: { key: string; last_time: number }[];
}
export interface TCloudData {
  unit_type: Record<string, string>;
  product_dir: Record<string, string>;
  feature_type: FeatureType[];
  group_type: {
    main_g: string[];
    recommend_g: string[];
    tool_g: string[];
  };
}
export interface TDataInfo {
  cloudData: TCloudData;
  dataMap: Record<string, string>;
  clickList: string[];
}

export enum EClickFeatureKeyType {
  /* LDS应用 */
  LDS_APP = 1,
  /* 系统工具 */
  SYS_TOOL = 2,
  /* 网页 */
  WEB = 3,
  /* 其他 */
  OTHERS = 4,
}
export interface TClickFeatureKeyParams {
  key: string;
  path: string;
  cmd: string;
  type: EClickFeatureKeyType;
}
