import { Attack } from "@/types/attack";
import { battleStore } from "../battle-store";

export const setBattleCooldown = (isOnCooldown: boolean) => {
  battleStore.setState((state) => ({
    ...state,
    isCooldown: isOnCooldown,
  }));
};

export const setUserPokemonAttack = (attack: Attack) => {
  battleStore.setState((state) => ({
    ...state,
    pokemons: {
      ...state.pokemons,
      userPokemonAttack: attack,
    },
  }));
};
