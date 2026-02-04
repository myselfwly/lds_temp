import AIToolColorfulIcon from "~/assets/images/home/appIcon/colorful/ai_tool.png";
import AutoRunColorfulIcon from "~/assets/images/home/appIcon/colorful/auto_run.png";
import BaseOptColorfulIcon from "~/assets/images/home/appIcon/colorful/base_opt.png";
import CalcColorfulIcon from "~/assets/images/home/appIcon/colorful/calc.png";
import CtrMgrColorfulIcon from "~/assets/images/home/appIcon/colorful/ctr_mgr.png";
import DriverUpdateColorfulIcon from "~/assets/images/home/appIcon/colorful/driver_update.png";
import GameModeColorfulIcon from "~/assets/images/home/appIcon/colorful/game_mode.png";
import GameMonitorColorfulIcon from "~/assets/images/home/appIcon/colorful/game_monitor.png";
import GameOptColorfulIcon from "~/assets/images/home/appIcon/colorful/game_opt.png";
import GarbageCleanColorfulIcon from "~/assets/images/home/appIcon/colorful/garbage_clean.png";
import GpuSettingColorfulIcon from "~/assets/images/home/appIcon/colorful/gpu_setting.png";
import HomeProtectionColorfulIcon from "~/assets/images/home/appIcon/colorful/home_protection.png";
import InterceptBsColorfulIcon from "~/assets/images/home/appIcon/colorful/intercept_bs.png";
import MemoryCleanColorfulIcon from "~/assets/images/home/appIcon/colorful/memory_clean.png";
import PcColorfulIcon from "~/assets/images/home/appIcon/colorful/pc.png";
import PluginCleanColorfulIcon from "~/assets/images/home/appIcon/colorful/plugin_clean.png";
import PrivacyCleanColorfulIcon from "~/assets/images/home/appIcon/colorful/privacy_clean.png";
import PrivacyProtectionColorfulIcon from "~/assets/images/home/appIcon/colorful/privacy_protection.png";
import QqCleanColorfulIcon from "~/assets/images/home/appIcon/colorful/qq_clean.png";
import RegisterCleanColorfulIcon from "~/assets/images/home/appIcon/colorful/register_clean.png";
import RunAccelerationColorfulIcon from "~/assets/images/home/appIcon/colorful/run_acceleration.png";
import ScreenshotColorfulIcon from "~/assets/images/home/appIcon/colorful/screenshot.png";
import SearchColorfulIcon from "~/assets/images/home/appIcon/colorful/search.png";
import ServiceMgrColorfulIcon from "~/assets/images/home/appIcon/colorful/service_mgr.png";
import SoftwarePmColorfulIcon from "~/assets/images/home/appIcon/colorful/software_pm.png";
import SysFixColorfulIcon from "~/assets/images/home/appIcon/colorful/sys_fix.png";
import SysMonitorColorfulIcon from "~/assets/images/home/appIcon/colorful/sys_monitor.png";
import SysOptColorfulIcon from "~/assets/images/home/appIcon/colorful/sys_opt.png";
import TaskbarTransparentColorfulIcon from "~/assets/images/home/appIcon/colorful/taskbar_transparent.png";
import TranslationColorfulIcon from "~/assets/images/home/appIcon/colorful/translation.png";
import UninstallSoftwareColorfulIcon from "~/assets/images/home/appIcon/colorful/uninstall_software.png";
import UwpMgrColorfulIcon from "~/assets/images/home/appIcon/colorful/uwp_mgr.png";
import WxCleanColorfulIcon from "~/assets/images/home/appIcon/colorful/wx_clean.png";
import AIToolIcon from "~/assets/images/home/appIcon/normal/ai_tool.png";
import AutoRunIcon from "~/assets/images/home/appIcon/normal/auto_run.png";
import BaseOptIcon from "~/assets/images/home/appIcon/normal/base_opt.png";
import CalcIcon from "~/assets/images/home/appIcon/normal/calc.png";
import CtrMgrIcon from "~/assets/images/home/appIcon/normal/ctr_mgr.png";
import DriverUpdateIcon from "~/assets/images/home/appIcon/normal/driver_update.png";
import GameModeIcon from "~/assets/images/home/appIcon/normal/game_mode.png";
import GameMonitorIcon from "~/assets/images/home/appIcon/normal/game_monitor.png";
import GameOptIcon from "~/assets/images/home/appIcon/normal/game_opt.png";
import GarbageCleanIcon from "~/assets/images/home/appIcon/normal/garbage_clean.png";
import GpuSettingIcon from "~/assets/images/home/appIcon/normal/gpu_setting.png";
import HomeProtectionIcon from "~/assets/images/home/appIcon/normal/home_protection.png";
import InterceptBsIcon from "~/assets/images/home/appIcon/normal/intercept_bs.png";
import MemoryCleanIcon from "~/assets/images/home/appIcon/normal/memory_clean.png";
import PcIcon from "~/assets/images/home/appIcon/normal/pc.png";
import PluginCleanIcon from "~/assets/images/home/appIcon/normal/plugin_clean.png";
import PrivacyCleanIcon from "~/assets/images/home/appIcon/normal/privacy_clean.png";
import PrivacyProtectionIcon from "~/assets/images/home/appIcon/normal/privacy_protection.png";
import QqCleanIcon from "~/assets/images/home/appIcon/normal/qq_clean.png";
import RegisterCleanIcon from "~/assets/images/home/appIcon/normal/register_clean.png";
import RunAccelerationIcon from "~/assets/images/home/appIcon/normal/run_acceleration.png";
import ScreenshotIcon from "~/assets/images/home/appIcon/normal/screenshot.png";
import SearchIcon from "~/assets/images/home/appIcon/normal/search.png";
import ServiceMgrIcon from "~/assets/images/home/appIcon/normal/service_mgr.png";
import SoftwarePmIcon from "~/assets/images/home/appIcon/normal/software_pm.png";
import SysFixIcon from "~/assets/images/home/appIcon/normal/sys_fix.png";
import SysMonitorIcon from "~/assets/images/home/appIcon/normal/sys_monitor.png";
import SysOptIcon from "~/assets/images/home/appIcon/normal/sys_opt.png";
import TaskbarTransparentIcon from "~/assets/images/home/appIcon/normal/taskbar_transparent.png";
import TranslationIcon from "~/assets/images/home/appIcon/normal/translation.png";
import UninstallSoftwareIcon from "~/assets/images/home/appIcon/normal/uninstall_software.png";
import UwpMgrIcon from "~/assets/images/home/appIcon/normal/uwp_mgr.png";
import WxCleanIcon from "~/assets/images/home/appIcon/normal/wx_clean.png";
import {
  EClickFeatureKeyType,
  FeatureType,
  TCloudData,
} from "~/types/business";
import { oneGB, oneMB } from "~/utils/commonUtils";
const cloudData: TCloudData = {
  unit_type: {
    size: "byte",
    speed: "byte/s",
    quantity: "个",
    number: "条",
    item: "项",
    percent: "%",
    tip: "",
  },
  product_dir: {
    sys_boost: "\\SuperApp\\sys_boost\\sys_boost_ui.exe",
    pc_optimizer: "\\SuperApp\\pc_optimizer\\pc_optimizer_ui.exe",
    privacy_clean: "\\SuperApp\\privacy_clean\\privacy_clean.exe",
    wxclean: "\\Utils\\WxClean.exe",
    qclean: "\\Utils\\QClean.exe",
    gpu_opt: "\\SuperApp\\gpu_opt\\gpu_opt_ui.exe",
    software_pm: "\\SuperApp\\software_pm\\software_pm_ui.exe",
    intercept_bs: "\\SuperApp\\intercept_bs\\intercept_bs_ui.exe",
    monitor_pro: "\\SuperApp\\monitor_pro\\monitor_pro.exe",
    game_monitor: "\\SuperApp\\game_monitor\\game_monitor_app.exe",
    ai_search: "\\SuperApp\\ai_search\\ai_search_ui.exe",
    taskbar_transparent: "\\SuperApp\\taskbar_transparent\\taskbar_ui.exe",
    browser_guard: "",
    uninstall_software: "control.exe",
    screenshot: "snippingtool.exe",
    ai_tool: "http://www.ludashi.com/cms/service/jump.php?key=winopt_ai",
    calc: "calc.exe",
    translation:
      "http://www.ludashi.com/cms/service/jump.php?key=winopt_translate",
    pc: "::{20D04FE0-3AEA-1069-A2D8-08002B30309D}",
    ctr_mgr: "::{26EE0668-A00A-44D7-9371-BEB064C98683}",
    proc_opt: "\\SuperApp\\proc_opt\\proc_opt_ui.exe",
  },
  feature_type: [
    {
      key: "main_btn",
      main_title: "",
      desc_txt: "",
      unit_type: "",
      need_vip: "1",
      invalid_txt: "",
      product_key: "sys_boost",
      show_corner: "0",
      app: "lds",
      icon: "",
      cmd: `--op_type=2  --from=winopt_assistant  --show_main_transparent={}`,
    },
    {
      key: "garbage_clean",
      main_title: "垃圾清理",
      desc_txt: "<color=red>{value}</color> 待清理",
      unit_type: "size",
      need_vip: "0",
      invalid_txt: "清理系统临时垃圾",
      product_key: "sys_boost",
      show_corner: "0",
      icon: GarbageCleanIcon,
      colorful_icon: GarbageCleanColorfulIcon,
      app: "lds",
      limit: [
        // {
        //   min: 100 * oneMB,
        // },
        {
          script: "value > 100 * 1024 * 1024",
        },
      ],
      cmd: `--op_type=2  --from=winopt_assistant  --show_main_transparent={}`,
    },
    {
      key: "memory_clean",
      main_title: "内存优化",
      desc_txt: "<color=red>{value}</color> 可释放",
      unit_type: "size",
      need_vip: "0",
      invalid_txt: "释放更多内存空间",
      product_key: "sys_boost",
      show_corner: "0",
      icon: MemoryCleanIcon,
      colorful_icon: MemoryCleanColorfulIcon,
      app: "lds",
      limit: [
        {
          min: 1 * oneGB,
        },
      ],
      cmd: `--op_type=2  --from=winopt_assistant  --show_main_transparent={}`,
    },
    {
      key: "auto_run",
      main_title: "开机启动",
      desc_txt: "<color=red>{value}</color> 可关闭",
      unit_type: "quantity",
      need_vip: "1",
      invalid_txt: "提升开机速度",
      product_key: "sys_boost",
      show_corner: "0",
      icon: AutoRunIcon,
      colorful_icon: AutoRunColorfulIcon,
      app: "lds",
      limit: [
        {
          min: 0,
        },
      ],
      cmd: `--op_type=2  --from=winopt_assistant  --show_main_transparent={}`,
    },
    {
      key: "sys_opt",
      main_title: "系统优化",
      desc_txt: "优化程度<color=red>{value}</color> ",
      unit_type: "percent",
      need_vip: "1",
      invalid_txt: "一键优化系统设置",
      product_key: "sys_boost",
      show_corner: "0",
      icon: SysOptIcon,
      colorful_icon: SysOptColorfulIcon,
      app: "lds",
      limit: [
        {
          max: 90,
        },
      ],
      cmd: `--op_type=2  --from=winopt_assistant  --show_main_transparent={}`,
    },
    {
      key: "privacy_clean",
      main_title: "隐私清理",
      desc_txt: "<color=red>{value}</color> 可清理",
      unit_type: "number",
      need_vip: "1",
      invalid_txt: "防止隐私信息泄露",
      product_key: "privacy_clean",
      show_corner: "1",
      icon: PrivacyCleanIcon,
      colorful_icon: PrivacyCleanColorfulIcon,
      app: "lds",
      limit: [
        {
          min: 1000,
        },
      ],
      cmd: `--op_type=2  --from=winopt_assistant  --show_main_transparent={}`,
    },
    {
      key: "wx_clean",
      main_title: "微信专清",
      desc_txt: "<color=red>{value}</color> 待清理",
      unit_type: "size",
      need_vip: "1",
      invalid_txt: "安全清理微信垃圾",
      product_key: "wxclean",
      show_corner: "0",
      icon: WxCleanIcon,
      colorful_icon: WxCleanColorfulIcon,
      app: "lds",
      limit: [
        {
          min: 100 * oneMB,
        },
      ],
      cmd: `--op_type=2  --from=winopt_assistant  --show_main_transparent={}`,
    },
    {
      key: "game_acceleration",
      main_title: "游戏加速",
      desc_txt: "",
      unit_type: "",
      need_vip: "1",
      invalid_txt: "",
      product_key: "proc_opt",
      show_corner: "0",
      icon: GameModeIcon,
      colorful_icon: GameModeColorfulIcon,
      app: "lds",
      limit: [
        {
          min: 0,
        },
      ],
      cmd: `--op_type=2  --from=winopt_assistant  --show_main_transparent={}`,
    },
    {
      key: "run_acceleration",
      main_title: "运行加速",
      desc_txt: "",
      unit_type: "",
      need_vip: "1",
      invalid_txt: "",
      product_key: "proc_opt",
      show_corner: "0",
      icon: RunAccelerationIcon,
      colorful_icon: RunAccelerationColorfulIcon,
      app: "lds",
      limit: [
        {
          min: 0,
        },
      ],
      cmd: `--op_type=2  --from=winopt_assistant  --show_main_transparent={}`,
    },
    {
      key: "base_opt",
      main_title: "基本优化",
      desc_txt: "",
      unit_type: "item",
      need_vip: "1",
      invalid_txt: "",
      product_key: "sys_boost",
      show_corner: "1",
      icon: BaseOptIcon,
      colorful_icon: BaseOptColorfulIcon,
      app: "lds",
      limit: [
        {
          min: 0,
        },
      ],
      cmd: `--op_type=2  --from=winopt_assistant  --show_main_transparent={}`,
    },
    {
      key: "uwp_mgr",
      main_title: "UWP应用卸载",
      desc_txt: "",
      unit_type: "quantity",
      need_vip: "1",
      invalid_txt: "",
      product_key: "sys_boost",
      show_corner: "1",
      icon: UwpMgrIcon,
      colorful_icon: UwpMgrColorfulIcon,
      app: "lds",
      limit: [
        {
          min: 0,
        },
      ],
      cmd: `--op_type=2  --from=winopt_assistant  --show_main_transparent={}`,
    },
    {
      key: "service_mgr",
      main_title: "服务管理",
      desc_txt: "",
      unit_type: "quantity",
      need_vip: "1",
      invalid_txt: "",
      product_key: "sys_boost",
      show_corner: "1",
      icon: ServiceMgrIcon,
      colorful_icon: ServiceMgrColorfulIcon,
      app: "lds",
      limit: [
        {
          min: 0,
        },
      ],
      cmd: `--op_type=2  --from=winopt_assistant  --show_main_transparent={}`,
    },
    {
      key: "register_clean",
      main_title: "注册表清理",
      desc_txt: "",
      unit_type: "number",
      need_vip: "0",
      invalid_txt: "",
      product_key: "sys_boost",
      show_corner: "1",
      icon: RegisterCleanIcon,
      colorful_icon: RegisterCleanColorfulIcon,
      app: "lds",
      limit: [
        {
          min: 0,
        },
      ],
      cmd: `--op_type=2  --from=winopt_assistant  --show_main_transparent={}`,
    },
    {
      key: "privacy_protection",
      main_title: "隐私保护",
      desc_txt: "",
      unit_type: "item",
      need_vip: "1",
      invalid_txt: "",
      product_key: "sys_boost",
      show_corner: "1",
      icon: PrivacyProtectionIcon,
      colorful_icon: PrivacyProtectionColorfulIcon,
      app: "lds",
      limit: [
        {
          min: 0,
        },
      ],
      cmd: `--op_type=2  --from=winopt_assistant  --show_main_transparent={}`,
    },
    {
      key: "sys_fix",
      main_title: "系统修复",
      desc_txt: "",
      unit_type: "quantity",
      need_vip: "1",
      invalid_txt: "",
      product_key: "sys_boost",
      show_corner: "1",
      icon: SysFixIcon,
      colorful_icon: SysFixColorfulIcon,
      app: "lds",
      limit: [
        {
          min: 0,
        },
      ],
      cmd: `--op_type=2  --from=winopt_assistant  --show_main_transparent={}`,
    },
    {
      key: "game_mode",
      main_title: "游戏模式",
      desc_txt: "",
      unit_type: "",
      need_vip: "1",
      invalid_txt: "",
      product_key: "pc_optimizer",
      show_corner: "0",
      icon: GameModeIcon,
      colorful_icon: GameModeColorfulIcon,
      app: "lds",
      cmd: `--op_type=2  --from=winopt_assistant  --show_main_transparent={}`,
    },
    {
      key: "game_opt",
      main_title: "游戏优化",
      desc_txt: "",
      unit_type: "",
      need_vip: "1",
      invalid_txt: "",
      product_key: "pc_optimizer",
      show_corner: "0",
      icon: GameOptIcon,
      colorful_icon: GameOptColorfulIcon,
      app: "lds",
      cmd: `--op_type=2  --from=winopt_assistant  --show_main_transparent={}`,
    },
    {
      key: "qq_clean",
      main_title: "QQ专清",
      desc_txt: "",
      unit_type: "size",
      need_vip: "1",
      invalid_txt: "",
      product_key: "qclean",
      show_corner: "1",
      icon: QqCleanIcon,
      colorful_icon: QqCleanColorfulIcon,
      app: "lds",
      limit: [
        {
          min: 100 * oneMB,
        },
      ],
      cmd: `--op_type=2  --from=winopt_assistant  --show_main_transparent={}`,
    },
    {
      key: "gpu_setting",
      main_title: "显卡设置",
      desc_txt: "",
      unit_type: "",
      need_vip: "1",
      invalid_txt: "",
      product_key: "gpu_opt",
      show_corner: "0",
      icon: GpuSettingIcon,
      colorful_icon: GpuSettingColorfulIcon,
      app: "lds",
      cmd: `--op_type=2  --from=winopt_assistant  --show_main_transparent={}`,
    },
    {
      key: "software_pm",
      main_title: "软件权限",
      desc_txt: "",
      unit_type: "tip",
      need_vip: "1",
      invalid_txt: "",
      product_key: "software_pm",
      show_corner: "1",
      icon: SoftwarePmIcon,
      colorful_icon: SoftwarePmColorfulIcon,
      app: "lds",
      limit: [
        {
          min: 0,
        },
      ],
      cmd: `--op_type=2  --from=winopt_assistant  --show_main_transparent={}`,
    },
    {
      key: "intercept_bs",
      main_title: "捆绑软件拦截",
      desc_txt: "",
      unit_type: "tip",
      need_vip: "1",
      invalid_txt: "",
      product_key: "intercept_bs",
      show_corner: "1",
      icon: InterceptBsIcon,
      colorful_icon: InterceptBsColorfulIcon,
      app: "lds",
      limit: [
        {
          min: 0,
        },
      ],
      cmd: `--op_type=2  --from=winopt_assistant  --show_main_transparent={}`,
    },
    {
      key: "plugin_clean",
      main_title: "插件清理",
      desc_txt: "",
      unit_type: "size",
      need_vip: "1",
      invalid_txt: "",
      product_key: "browser_guard",
      show_corner: "1",
      icon: PluginCleanIcon,
      colorful_icon: PluginCleanColorfulIcon,
      app: "browser_guard",
      limit: [
        {
          min: 100 * oneMB,
        },
      ],
      cmd: `--op_type=2  --from=winopt_assistant  --show_main_transparent={}`,
    },
    {
      key: "home_protection",
      main_title: "主页保护",
      desc_txt: "",
      unit_type: "",
      need_vip: "1",
      invalid_txt: "",
      product_key: "browser_guard",
      show_corner: "0",
      icon: HomeProtectionIcon,
      colorful_icon: HomeProtectionColorfulIcon,
      app: "browser_guard",
      cmd: `--op_type=2  --from=winopt_assistant  --show_main_transparent={}`,
    },
    {
      key: "sys_monitor",
      main_title: "系统性能监控",
      desc_txt: "",
      unit_type: "",
      need_vip: "1",
      invalid_txt: "",
      product_key: "monitor_pro",
      show_corner: "0",
      icon: SysMonitorIcon,
      colorful_icon: SysMonitorColorfulIcon,
      app: "lds",
      cmd: `--op_type=2  --from=winopt_assistant  --show_main_transparent={}`,
    },
    {
      key: "driver_update",
      main_title: "驱动更新",
      desc_txt: "",
      unit_type: "tip",
      need_vip: "0",
      invalid_txt: "",
      product_key: "gpu_opt",
      show_corner: "1",
      icon: DriverUpdateIcon,
      colorful_icon: DriverUpdateColorfulIcon,
      app: "lds",
      limit: [
        {
          min: 0,
        },
      ],
      cmd: `--op_type=2  --from=winopt_assistant  --show_main_transparent={}`,
    },
    {
      key: "game_monitor",
      main_title: "游戏内监控",
      desc_txt: "",
      unit_type: "",
      need_vip: "1",
      invalid_txt: "",
      product_key: "game_monitor",
      show_corner: "0",
      icon: GameMonitorIcon,
      colorful_icon: GameMonitorColorfulIcon,
      app: "lds",
      cmd: `--op_type=2  --from=winopt_assistant  --show_main_transparent={}`,
    },
    {
      key: "screenshot",
      main_title: "截图",
      desc_txt: "",
      unit_type: "",
      need_vip: "0",
      invalid_txt: "",
      product_key: "screenshot",
      show_corner: "0",
      icon: ScreenshotIcon,
      colorful_icon: ScreenshotColorfulIcon,
      app: "sys",
      cmd: ``,
    },
    {
      key: "calc",
      main_title: "计算器",
      desc_txt: "",
      unit_type: "",
      need_vip: "0",
      invalid_txt: "",
      product_key: "calc",
      show_corner: "0",
      icon: CalcIcon,
      colorful_icon: CalcColorfulIcon,
      app: "sys",
      cmd: ``,
    },
    {
      key: "search",
      main_title: "搜索",
      desc_txt: "",
      unit_type: "",
      need_vip: "1",
      invalid_txt: "",
      product_key: "ai_search",
      show_corner: "0",
      icon: SearchIcon,
      colorful_icon: SearchColorfulIcon,
      app: "lds",
      cmd: `--op_type=2  --from=winopt_assistant  --show_main_transparent={}`,
    },
    {
      key: "ai_tool",
      main_title: "AI 工具",
      desc_txt: "",
      unit_type: "",
      need_vip: "0",
      invalid_txt: "",
      product_key: "ai_tool",
      show_corner: "0",
      icon: AIToolIcon,
      colorful_icon: AIToolColorfulIcon,
      app: "web",
      cmd: ``,
    },
    {
      key: "translation",
      main_title: "翻译",
      desc_txt: "",
      unit_type: "",
      need_vip: "0",
      invalid_txt: "",
      product_key: "translation",
      show_corner: "0",
      icon: TranslationIcon,
      colorful_icon: TranslationColorfulIcon,
      app: "web",
      cmd: ``,
    },
    {
      key: "pc",
      main_title: "我的电脑",
      desc_txt: "",
      unit_type: "",
      need_vip: "0",
      invalid_txt: "",
      product_key: "pc",
      show_corner: "0",
      icon: PcIcon,
      colorful_icon: PcColorfulIcon,
      app: "sys",
      cmd: ``,
    },
    {
      key: "ctr_mgr",
      main_title: "控制面板",
      desc_txt: "",
      unit_type: "",
      need_vip: "0",
      invalid_txt: "",
      product_key: "ctr_mgr",
      show_corner: "0",
      icon: CtrMgrIcon,
      colorful_icon: CtrMgrColorfulIcon,
      app: "sys",
      cmd: ``,
    },
    {
      key: "taskbar_transparent",
      main_title: "透明任务栏",
      desc_txt: "",
      unit_type: "",
      need_vip: "1",
      invalid_txt: "",
      product_key: "taskbar_transparent",
      show_corner: "0",
      icon: TaskbarTransparentIcon,
      colorful_icon: TaskbarTransparentColorfulIcon,
      app: "lds",
      cmd: ``,
    },
    {
      key: "uninstall_software",
      main_title: "软件卸载",
      desc_txt: "",
      unit_type: "",
      need_vip: "0",
      invalid_txt: "",
      product_key: "uninstall_software",
      show_corner: "0",
      icon: UninstallSoftwareIcon,
      colorful_icon: UninstallSoftwareColorfulIcon,
      app: "sys",
      cmd: `appwiz.cpl`,
    },
  ],
  group_type: {
    main_g: [
      "garbage_clean",
      "memory_clean",
      "auto_run",
      "sys_opt",
      "wx_clean",
      "privacy_clean",
    ],
    recommend_g: [
      "game_acceleration",
      "run_acceleration",
      "base_opt",
      "uwp_mgr",
      "service_mgr",
      "register_clean",
      "privacy_protection",
      "sys_fix",
      "game_mode",
      "game_opt",
      "qq_clean",
      "gpu_setting",
      "software_pm",
      "intercept_bs",
      "plugin_clean",
      "home_protection",
      "sys_monitor",
      "driver_update",
      "game_monitor",
    ],
    tool_g: [
      "screenshot",
      "calc",
      "search",
      "ai_tool",
      "translation",
      "pc",
      "ctr_mgr",
      "taskbar_transparent",
      "uninstall_software",
    ],
  },
};

export const getCloudData = async () => {
  return cloudData;
};

export const getRelativePath = (data: TCloudData, productKey: string) => {
  return data.product_dir[productKey];
};

export const getClickFeatureType = (feature: FeatureType) => {
  if (feature.app === "lds") {
    return EClickFeatureKeyType.LDS_APP;
  } else if (feature.app === "sys") {
    return EClickFeatureKeyType.SYS_TOOL;
  } else if (feature.app === "web") {
    return EClickFeatureKeyType.WEB;
  } else {
    return EClickFeatureKeyType.OTHERS;
  }
};
