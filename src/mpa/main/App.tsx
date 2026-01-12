import { FC } from "react";

import { useVipStore } from "./store/vip";
interface AppProps {}
/**
 *
 */
export const App: FC<AppProps> = (props) => {
  const vipStore = useVipStore();
  return <>{JSON.stringify(vipStore, null, 2)}</>;
};
