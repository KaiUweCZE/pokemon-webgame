"use client";
import { Store } from "@tanstack/store";
import { useStore } from "@tanstack/react-store";
import { BATTLE_DEFAULTS } from "./constants";
import { BattleStore } from "./type";

export const battleStore = new Store<BattleStore>(BATTLE_DEFAULTS.INITIAL_STATE);

// Hook
export const useBattleStore = () => {
  const state = useStore(battleStore);

  return {
    ...state,
    battleStore,
    userPokemon: state.pokemons.userPokemon,
    enemyPokemon: state.pokemons.enemyPokemon,
    battle: state.battle,
    battleInit: state.init,
    enemyType: state.battle.enemyType,
    battleStatus: state.battle.status,
    activeMenuSection: state.battle.activeMenuSection,
    isCooldown: state.isCooldown,
  };
};
