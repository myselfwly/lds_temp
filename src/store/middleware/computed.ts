import { StateCreator, StoreMutatorIdentifier } from "zustand";

/**
 * 计算属性配置类型
 * 键是计算属性的名称，值是计算函数
 */
type ComputedConfig<T> = {
  [K in keyof T]?: (state: T) => T[K];
};

/**
 * Computed 中间件
 * 允许定义计算属性，当依赖的状态改变时自动重新计算
 *
 * @example
 * ```typescript
 * const useStore = create(
 *   computed<{
 *     count: number;
 *     doubleCount: number;
 *     increment: () => void;
 *   }>(
 *     {
 *       doubleCount: (state) => state.count * 2,
 *     },
 *     (set, get) => ({
 *       count: 0,
 *       doubleCount: 0, // 初始值，会被计算属性覆盖
 *       increment: () => set((state) => ({ count: state.count + 1 })),
 *     })
 *   )
 * );
 * ```
 */
export function computed<
  T extends object,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  computedConfig: ComputedConfig<T>,
  initializer: StateCreator<T, Mps, Mcs>,
): StateCreator<T, Mps, Mcs> {
  return (set, get, api) => {
    // 循环依赖防护：标记是否正在计算中
    let isComputing = false;
    // 最大递归深度限制（防止意外循环）
    const MAX_RECURSION_DEPTH = 10;
    let recursionDepth = 0;
    // 正在计算的计算属性栈（用于检测循环依赖）
    const computingStack: string[] = [];

    // 创建一个增强的 set 函数，在状态更新后自动重新计算
    const enhancedSet = ((
      partial: Parameters<typeof set>[0],
      replace?: boolean,
    ) => {
      // 如果正在计算中，直接使用原始 set，避免循环
      if (isComputing) {
        return (set as any)(partial, replace);
      }

      // 检查递归深度
      if (recursionDepth >= MAX_RECURSION_DEPTH) {
        console.error(
          `[computed middleware] 达到最大递归深度 ${MAX_RECURSION_DEPTH}，可能存在循环依赖。计算栈:`,
          computingStack,
        );
        return (set as any)(partial, replace);
      }

      // 先执行原始更新
      const result = (set as any)(partial, replace);

      // 标记开始计算
      isComputing = true;
      recursionDepth++;

      try {
        // 获取更新后的完整状态
        const currentState = get();

        // 重新计算所有计算属性
        const newComputedValues: Partial<T> = {};
        let hasChanges = false;

        for (const [computedKey, computeFn] of Object.entries(computedConfig)) {
          if (typeof computeFn === "function") {
            // 检查是否在计算栈中（循环依赖检测）
            if (computingStack.includes(computedKey)) {
              console.error(
                `[computed middleware] 检测到循环依赖：计算属性 "${computedKey}" 在计算栈中。栈:`,
                computingStack,
              );
              continue;
            }

            // 添加到计算栈
            computingStack.push(computedKey);

            try {
              const newValue = computeFn(currentState as T);
              const oldValue = currentState[computedKey as keyof T];

              // 只有当值真正改变时才更新（使用 Object.is 进行严格比较）
              if (!Object.is(newValue, oldValue)) {
                newComputedValues[computedKey as keyof T] = newValue;
                hasChanges = true;
              }
            } catch (error) {
              console.warn(`计算属性 "${computedKey}" 计算失败:`, error);
            } finally {
              // 从计算栈中移除
              const index = computingStack.indexOf(computedKey);
              if (index > -1) {
                computingStack.splice(index, 1);
              }
            }
          }
        }

        // 如果有计算属性值改变，使用原始 set 更新（避免触发新的计算）
        // 注意：这里使用原始 set 而不是 enhancedSet，防止循环
        if (hasChanges) {
          // 在更新计算属性时，临时解除计算标记
          // 这样如果计算属性更新触发了其他逻辑，不会再次计算
          const wasComputing = isComputing;
          isComputing = false;
          try {
            (set as any)(newComputedValues, false);
          } finally {
            isComputing = wasComputing;
          }
        }
      } finally {
        // 恢复计算标记和递归深度
        isComputing = false;
        recursionDepth--;
        // 清空计算栈（防止内存泄漏）
        computingStack.length = 0;
      }

      return result;
    }) as typeof set;

    // 使用增强的 set 函数初始化
    const initialState = initializer(enhancedSet, get, api);

    // 计算所有计算属性的初始值
    const computedValues: Partial<T> = {};
    for (const [key, computeFn] of Object.entries(computedConfig)) {
      if (typeof computeFn === "function") {
        try {
          computedValues[key as keyof T] = computeFn(initialState as T);
        } catch (error) {
          console.warn(`计算属性 "${key}" 初始值计算失败:`, error);
        }
      }
    }

    // 合并初始状态和计算属性值
    return {
      ...initialState,
      ...computedValues,
    } as T;
  };
}
