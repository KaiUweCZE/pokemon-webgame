import { BattlePokemon, EnemyPokemon, Pokemon } from "@/types/pokemon";
import { battleStore } from "../battle-store";
import { toBattlePokemon } from "@/utils/toBattlePokemon";

// Firstly we get Pokemon type when we come to the battle from ExploreDialog
// but if we switch pokemon during the battle, we already have the BattlePokemon type
export const setUserPokemon = (pokemon: Pokemon | BattlePokemon) => {
  battleStore.setState((state) => ({
    ...state,
    pokemons: {
      ...state.pokemons,
      // if pokemon is already a BattlePokemon, no need to convert it
      userPokemon: "userId" in pokemon ? toBattlePokemon(pokemon) : pokemon,
    },
  }));
};

export const updateUserPokemonClient = (update: Partial<BattlePokemon>) => {
  battleStore.setState((state) => {
    if (!state.pokemons.userPokemon) return state;

    return {
      ...state,
      pokemons: {
        ...state.pokemons,
        userPokemon: {
          ...state.pokemons.userPokemon,
          ...update,
        },
      },
    };
  });
};

export const updateEnemyPokemon = (update: Partial<EnemyPokemon>) => {
  battleStore.setState((state) => {
    if (!state.pokemons.enemyPokemon) return state;

    return {
      ...state,
      pokemons: {
        ...state.pokemons,
        enemyPokemon: {
          ...state.pokemons.enemyPokemon,
          ...update,
        },
      },
    };
  });
};

export const setEnemyPokemon = (enemyPokemon: EnemyPokemon) => {
  battleStore.setState((state) => {
    return {
      ...state,
      pokemons: {
        ...state.pokemons,
        enemyPokemon: {
          ...state.pokemons.enemyPokemon,
          ...enemyPokemon,
        },
      },
    };
  });
};

export const setUserPokemonSix = (pokemons: Pokemon[]) => {
  battleStore.setState((state) => ({
    ...state,
    pokemons: {
      ...state.pokemons,
      userPokemonSix: pokemons,
    },
  }));
};
