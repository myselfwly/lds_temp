/**
 * 命令行参数解析与生成工具
 * 格式：--key=value，多个参数以空格分隔，value 支持数字、字符串、JSON 对象
 * @example
 * parseCmdArgs(`--op_type=2  --from=winopt_assistant  --show_main_transparent={"feature_key":"garbage_clean"}`)
 * // { op_type: 2, from: "winopt_assistant", show_main_transparent: { feature_key: "garbage_clean" } }
 *
 * generateCmdArgs({ op_type: 2, from: "winopt_assistant", show_main_transparent: { feature_key: "garbage_clean" } })
 * // "--op_type=2  --from=winopt_assistant  --show_main_transparent={"feature_key":"garbage_clean"}"
 */

const ARG_RE = /--([a-zA-Z_][a-zA-Z0-9_]*)=/g;
const SEP = "  ";

function findJsonEnd(s: string, start: number): number {
  let depth = 0;
  let i = start;
  const len = s.length;
  while (i < len) {
    const c = s[i];
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) return i;
    }
    i++;
  }
  return -1;
}

/**
 * 解析命令行参数字符串为键值对
 * @param cmd 如 `--op_type=2  --from=winopt_assistant  --show_main_transparent={"feature_key":"garbage_clean"}`
 * @returns 解析后的对象，空字符串返回 {}
 */
export function parseCmdArgs(
  cmd: string,
): Record<string, string | number | Record<string, unknown>> {
  const out: Record<string, string | number | Record<string, unknown>> = {};
  if (!cmd || typeof cmd !== "string") return out;
  const s = cmd.trim();
  if (!s) return out;

  let m: RegExpExecArray | null;
  ARG_RE.lastIndex = 0;
  const parts: { key: string; start: number; valueStart: number }[] = [];
  while ((m = ARG_RE.exec(s)) !== null) {
    parts.push({
      key: m[1],
      start: m.index,
      valueStart: m.index + m[0].length,
    });
  }

  for (let i = 0; i < parts.length; i++) {
    const { key, valueStart } = parts[i];
    const nextStart = parts[i + 1]?.start ?? s.length;
    let raw = s.slice(valueStart, nextStart).trim();

    if (raw.startsWith("{")) {
      const end = findJsonEnd(s, valueStart);
      if (end !== -1) {
        raw = s.slice(valueStart, end + 1);
        try {
          out[key] = JSON.parse(raw) as Record<string, unknown>;
        } catch {
          out[key] = raw;
        }
      } else {
        out[key] = raw;
      }
      continue;
    }

    const num = Number(raw);
    if (raw !== "" && !Number.isNaN(num) && String(num) === raw) {
      out[key] = num;
    } else {
      out[key] = raw;
    }
  }

  return out;
}

/**
 * 将键值对生成为命令行参数字符串
 * @param args 如 { op_type: 2, from: "winopt_assistant", show_main_transparent: { feature_key: "garbage_clean" } }
 * @returns 如 `--op_type=2  --from=winopt_assistant  --show_main_transparent={"feature_key":"garbage_clean"}`
 */
export function generateCmdArgs(
  args: Record<
    string,
    string | number | Record<string, unknown> | boolean | null | undefined
  >,
): string {
  const parts: string[] = [];
  for (const [k, v] of Object.entries(args)) {
    if (v === undefined || v === null) continue;
    const key = k.replace(/^--?/, "");
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key)) continue;
    let val: string;
    if (typeof v === "object" && v !== null && !Array.isArray(v)) {
      val = JSON.stringify(v);
    } else if (typeof v === "boolean") {
      val = v ? "1" : "0";
    } else {
      val = String(v);
    }
    parts.push(`--${key}=${val}`);
  }
  return parts.join(SEP);
}

/**
 * 根据 feature_key 生成标准功能跳转 cmd（与 cloudData feature_type 格式一致）
 * @param featureKey 如 "garbage_clean"
 * @param overrides 可覆盖默认的 op_type、from，或扩展 show_main_transparent 的额外字段
 */
export function buildFeatureCmd(
  featureKey: string,
  overrides?: Record<string, string | number | Record<string, unknown>>,
): string {
  const st = overrides?.show_main_transparent;
  const showMain =
    typeof st === "object" && st
      ? { feature_key: featureKey, ...st }
      : { feature_key: featureKey };
  const rest = overrides ? { ...overrides } : {};
  delete rest.show_main_transparent;
  const merged: Record<string, string | number | Record<string, unknown>> = {
    op_type: 2,
    from: "winopt_assistant",
    show_main_transparent: showMain,
    ...rest,
  };
  return generateCmdArgs(merged);
}
