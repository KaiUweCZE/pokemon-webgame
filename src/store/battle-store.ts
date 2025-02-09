"use client";
import { Store } from "@tanstack/store";
import { useStore } from "@tanstack/react-store";
import { BattlePokemon, EnemyPokemon, Pokemon } from "@/types/pokemon";
import { toBattlePokemon } from "@/utils/toBattlePokemon";

// battle menu states
export type BattleMenuSection = "main" | "attacks" | "switch" | "bag" | "run";

// battle states
export type BattleStatus =
  | "not-started"
  | "in-progress"
  | "attacking"
  | "switching"
  | "catching"
  | "paused"
  | "user-victory"
  | "enemy-victory";

export type EnemyType = "wild" | "trainer";

interface BattleStore {
  // Controller of the entire battle state
  battleStatus: BattleStatus;
  // Controller of the active menu section
  activeMenuSection: BattleMenuSection;

  enemyType: EnemyType;
  enemyPokemon: EnemyPokemon | null;
  userPokemon: BattlePokemon | null;
  userPokemonSix: Pokemon[];

  // Controller of the attack animation and cooldown
  isUserAttacking: boolean;
  isEnemyAttacking: boolean;
  isAnimationPlaying: boolean;
}

const battleStore = new Store<BattleStore>({
  battleStatus: "not-started",
  activeMenuSection: "main",
  enemyType: "wild",
  enemyPokemon: null,
  userPokemon: null,
  userPokemonSix: [],

  isUserAttacking: false,
  isEnemyAttacking: false,
  isAnimationPlaying: false,
});

// Actions for switching menu sections
export const setMenuSection = (section: BattleMenuSection) => {
  battleStore.setState((state) => ({
    ...state,
    activeMenuSection: section === state.activeMenuSection ? "main" : section,
  }));
};

export const setUserPokemon = (pokemon: Pokemon) => {
  battleStore.setState((state) => ({
    ...state,
    userPokemon: toBattlePokemon(pokemon),
  }));
};

export const setEnemyPokemon = (enemyPokemon: EnemyPokemon) => {
  battleStore.setState((state) => ({
    ...state,
    enemyPokemon,
  }));
};

export const setUserPokemonSix = (pokemons: Pokemon[]) => {
  battleStore.setState((state) => ({
    ...state,
    userPokemonSix: pokemons,
  }));
};

// Actions for switching battle states
export const setBattleStatus = (status: BattleStatus) => {
  battleStore.setState((state) => ({
    ...state,
    battleStatus: status,
  }));
};

// Action for controlling the attack animation
export const setUserAttacking = (isAttacking: boolean) => {
  battleStore.setState((state) => ({
    ...state,
    isUserAttacking: isAttacking,
  }));
};

export const setEnemyAttacking = (isAttacking: boolean) => {
  battleStore.setState((state) => ({
    ...state,
    isEnemyAttacking: isAttacking,
  }));
};

export const setAnimationPlaying = (isPlaying: boolean) => {
  battleStore.setState((state) => ({
    ...state,
    isAnimationPlaying: isPlaying,
  }));
};

// Hook
export const useBattleStore = () => {
  const state = useStore(battleStore);

  return {
    ...state,
    setMenuSection,
    setBattleStatus,
    setUserAttacking,
    setEnemyAttacking,
    setAnimationPlaying,
    setEnemyPokemon,
    setUserPokemon,
    setUserPokemonSix,
  };
};
