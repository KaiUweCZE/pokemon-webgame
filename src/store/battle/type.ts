import { type BattlePokemon, type EnemyPokemon, type Pokemon } from "@/types/pokemon";
import { type LocationName } from "@/types/location";
import { type StaticImageData } from "next/image";
import { Attack } from "@/types/attack";

export type BattleMenuSection = "main" | "attacks" | "switch" | "bag" | "run";

// battle states
export type BattleStatus =
  | "not-started"
  | "in-progress"
  | "attacking"
  | "switching"
  | "catching"
  | "pokemon-caught"
  | "paused"
  | "user-victory"
  | "enemy-victory";

export type EnemyType = "wild" | "trainer";

export interface BattleAnimationState {
  img: StaticImageData | string | null;
  duration: number;
  isPlaying: boolean;
}

export interface BattleInitState {
  isValid: boolean;
  location: LocationName | null;
  currentArea: number;
  areaChangesCounter: number;
}

export interface BattleState {
  status: BattleStatus;
  activeMenuSection: BattleMenuSection;
  enemyType: EnemyType;
}

export interface BattlePokemonState {
  enemyPokemon: EnemyPokemon | null;
  userPokemon: BattlePokemon | null;
  userPokemonSix: Pokemon[];
  userPokemonAttack: Attack | null;
  enemyAttack: Attack | null;
}

export interface BattleStore {
  battle: BattleState;
  pokemons: BattlePokemonState;
  animations: {
    user: BattleAnimationState;
    enemy: BattleAnimationState;
    isUserAttacking: boolean;
    isEnemyAttacking: boolean;
  };
  init: BattleInitState;
  newLevel: boolean;
  gainedExp: number;
  isCooldown: boolean;
}
