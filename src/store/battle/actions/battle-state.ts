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
    },
  }));
};

export const resetBattle = () => {
  battleStore.setState((state) => ({
    ...state,
    init: {
      isValid: false,
      location: null,
    },
    battle: {
      ...state.battle,
      status: "not-started",
    },
  }));
};
