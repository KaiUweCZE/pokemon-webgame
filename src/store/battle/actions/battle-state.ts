import { LocationName } from "@/types/location";
import { battleStore } from "../battle-store";
import { BattleMenuSection, BattleStatus } from "../type";

export const setBattleStatus = (status: BattleStatus) => {
  battleStore.setState((state) => ({
    ...state,
    battle: {
      ...state.battle,
      status,
    },
  }));
};

export const setMenuSection = (section: BattleMenuSection) => {
  battleStore.setState((state) => ({
    ...state,
    battle: {
      ...state.battle,
      activeMenuSection: section === state.battle.activeMenuSection ? "main" : section,
    },
  }));
};

export const initBattle = (location: LocationName) => {
  battleStore.setState((state) => ({
    ...state,
    init: {
      isValid: true,
      location,
      currentArea: 1,
      areaChangesCounter: 0,
    },
  }));
};

export const resetBattle = () => {
  battleStore.setState((state) => ({
    ...state,
    init: {
      isValid: false,
      location: null,
      currentArea: 1,
      areaChangesCounter: 0,
    },
    battle: {
      ...state.battle,
      status: "not-started",
    },
  }));
};

export const setGainedExp = (exp: number) => {
  battleStore.setState((state) => ({
    ...state,
    gainedExp: exp,
  }));
};

export const setNewLevel = (isNewLevel: boolean) => {
  battleStore.setState((state) => ({
    ...state,
    newLevel: isNewLevel,
  }));
};
