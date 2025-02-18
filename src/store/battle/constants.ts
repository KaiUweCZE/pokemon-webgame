import { Pokemon } from "@/types/pokemon";

export const BATTLE_DEFAULTS = {
  ANIMATION_DURATION: 1000,
  INITIAL_STATE: {
    battle: {
      status: "not-started" as const,
      activeMenuSection: "main" as const,
      enemyType: "wild" as const,
    },
    pokemons: {
      enemyPokemon: null,
      userPokemon: null,
      userPokemonSix: [] as Pokemon[],
      userPokemonAttack: null,
      enemyAttack: null,
    },
    animations: {
      isUserAttacking: false,
      isEnemyAttacking: false,
      user: {
        img: null,
        duration: 1000,
        isPlaying: false,
      },
      enemy: {
        img: null,
        duration: 1000,
        isPlaying: false,
      },
    },
    init: {
      isValid: false,
      location: null,
    },
    newLevel: false,
    gainedExp: 0,
    isCooldown: false,
  },
};
