import { battleStore } from "../battle-store";

export const setBattleCooldown = (isOnCooldown: boolean) => {
  battleStore.setState((state) => ({
    ...state,
    isCooldown: isOnCooldown,
  }));
};
