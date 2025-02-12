import { BattlePokemon, EnemyPokemon, Pokemon } from "@/types/pokemon";
import { battleStore } from "../battle-store";
import { toBattlePokemon } from "@/utils/toBattlePokemon";

export const setUserPokemon = (pokemon: Pokemon) => {
  battleStore.setState((state) => ({
    ...state,
    pokemons: {
      ...state.pokemons,
      userPokemon: toBattlePokemon(pokemon),
    },
  }));
};

export const setUserPokemonInBattle = (update: Partial<BattlePokemon>) => {
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

export const setEnemyPokemon = (enemyPokemon: Partial<EnemyPokemon>) => {
  battleStore.setState((state) => {
    if (!state.pokemons.enemyPokemon) return state;

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
