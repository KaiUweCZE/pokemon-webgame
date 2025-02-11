import { EnemyPokemon, Pokemon } from "@/types/pokemon";
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

export const setEnemyPokemon = (enemyPokemon: EnemyPokemon) => {
  battleStore.setState((state) => ({
    ...state,
    pokemons: {
      ...state.pokemons,
      enemyPokemon,
    },
  }));
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
