"use client";
import { Store } from "@tanstack/store";
import { useStore } from "@tanstack/react-store";
import { BATTLE_DEFAULTS } from "./constants";
import { BattleStore } from "./type";
import useGetExp from "@/hooks/battle/use-get-exp";
import { useEffect } from "react";

export const battleStore = new Store<BattleStore>(BATTLE_DEFAULTS.INITIAL_STATE);

export const useBattleState = () => {
  const state = useStore(battleStore);
  const { getExp } = useGetExp();

  useEffect(() => {
    console.log("Effect is done!!!!");

    if (state.battle.status === "user-victory") {
      getExp();
    }
  }, [state.battle.status]);
};

// Hook
export const useBattleStore = () => {
  const state = useStore(battleStore);

  return {
    ...state,
    battleStore,
    userPokemon: state.pokemons.userPokemon,
    currentAttack: state.pokemons.userPokemonAttack,
    userPokemonSix: state.pokemons.userPokemonSix,
    enemyPokemon: state.pokemons.enemyPokemon,
    enemyAttack: state.pokemons.enemyAttack,
    battle: state.battle,
    battleInit: state.init,
    enemyType: state.battle.enemyType,
    battleStatus: state.battle.status,
    activeMenuSection: state.battle.activeMenuSection,
    isCooldown: state.isCooldown,
    newLevel: state.newLevel,
    gainedExp: state.gainedExp,
  };
};
