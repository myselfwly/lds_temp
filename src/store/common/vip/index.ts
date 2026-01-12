import { BridgeModal, TEvent } from "@lds/bridge-modal";
import { vipInstance, VipMiddleware } from "@vip";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { constants } from "~/lib/constantsInstance";
import { EVipStatus, hasVip, TVipInfo } from "~/types/VipInfo";

const cacheMap: {
  isRegisterEvent: boolean;
} = {
  isRegisterEvent: false,
};
const vipUpdateEvent: TEvent = {
  eventName: vipInstance.bridgeUpdate.key,
  callback: async (state) => {
    const productKey = await constants.getProductKey();
    console.log("productKey", productKey);
    vipInstance.bridgeUpdate.handler(productKey);
  },
};
const vipCenterOpenEvent: TEvent = {
  eventName: VipMiddleware.openKey,
  callback: () => {
    VipMiddleware.openPayCenterFromExe();
  },
};
const initStatus: TVipInfo = {
  type: "",
  end_date: "",
  ttl: -1,
  popup: false,
  hasPaid: false,
  have_paid_v2: false,
  have_paid: false,
  device_count: -1,
  lifetime: false,
  isVip: true,
  vipStatus: EVipStatus.kRechargeExpired,
};

const computedVipStats = (cure: TVipInfo) => {
  const ttl = cure?.ttl ?? -1;
  const isActive = ttl > 0;
  const have_paid = cure?.have_paid || cure?.have_paid_v2 || cure?.hasPaid;
  if (!have_paid) {
    cure.vipStatus = isActive ? EVipStatus.kTrial : EVipStatus.kTrialExpired;
  } else if (cure?.lifetime) {
    cure.vipStatus = EVipStatus.kLifetime;
  } else {
    cure.vipStatus = isActive
      ? EVipStatus.kRecharge
      : EVipStatus.kRechargeExpired;
  }
  cure.isVip = hasVip.includes(cure.vipStatus);
  return cure;
};
export const createVipStore = () => {
  const useVipStore = create(immer<TVipInfo>(() => ({ ...initStatus })));
  const init = (registerEvents: BridgeModal["registerEvents"]) => {
    if (!cacheMap.isRegisterEvent) {
      cacheMap.isRegisterEvent = true;
      registerEvents(vipUpdateEvent, vipCenterOpenEvent);
      constants.getProductKey().then((productKey) => {
        console.log("productKey", productKey);
        vipInstance.getVipInfo(productKey);
      });
      vipInstance.onUpdate((_pre, cure) => {
        console.log("cure", cure);
        useVipStore.setState((state) => {
          const newState = { ...initStatus, ...cure } as TVipInfo;
          computedVipStats(newState);
          return newState;
        });
      });
    }
  };

  return {
    useVipStore,
    init,
  };
};
