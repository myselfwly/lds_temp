import { create } from 'zustand';

type TestState = { count: number };

const useStore = create<TestState>((set) => ({
  count: 0,
}));

type SetType = Parameters<typeof useStore.getState> extends [infer S] 
  ? Parameters<Parameters<typeof create<TestState>>[0]>[0]
  : never;

type SetReplaceType = Parameters<Parameters<typeof create<TestState>>[0]>[1];
