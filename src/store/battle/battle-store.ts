"use client";
import { Store } from "@tanstack/store";
import { useStore } from "@tanstack/react-store";
import { BATTLE_DEFAULTS } from "./constants";
import { BattleStore } from "./type";
import useGetExp from "@/hooks/battle/use-get-exp";
import { useEffect } from "react";
import { locationData } from "@/data/locations/location-data";
import { AreaNumber } from "@/types/location";

export const battleStore = new Store<BattleStore>(BATTLE_DEFAULTS.INITIAL_STATE);

export const useBattleState = () => {
  const state = useStore(battleStore);
  const { getExp } = useGetExp();

  useEffect(() => {
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
    battleLocation: state.init.location,
    battle: state.battle,
    battleInit: state.init,
    enemyType: state.battle.enemyType,
    battleStatus: state.battle.status,
    activeMenuSection: state.battle.activeMenuSection,
    isCooldown: state.isCooldown,
    newLevel: state.newLevel,
    gainedExp: state.gainedExp,
    locationAreas: state.init.location && locationData[state.init.location].areas,
    currentArea: state.init.currentArea as AreaNumber,
    areaChangesCounter: state.init.areaChangesCounter,
  };
};
