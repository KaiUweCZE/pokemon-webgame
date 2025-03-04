import { BattlePokemon, EnemyPokemon, Pokemon } from "@/types/pokemon";
import { battleStore, useBattleStore } from "../battle-store";
import { toBattlePokemon } from "@/utils/toBattlePokemon";
import { useModal } from "@/components/providers/modal-provider";
import { useDay } from "@/hooks/use-day";
import { Button } from "@/components/ui/primitives/button";
import { generateWildPokemon } from "@/utils/pokemon-generator";
import { setBattleStatus } from "./battle-state";
import { locationData } from "@/data/locations/location-data";
import { AreaNumber } from "@/types/location";

export const MAX_AREA_CHANGES = 3;

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

/* hepler utils for actions in area, move to next/prev part, prepare next pokemon etc.*/

export const canChangeArea = (): boolean => {
  return battleStore.state.init.areaChangesCounter < MAX_AREA_CHANGES;
};

export const changeArea = (areaOffset: number): boolean => {
  const state = battleStore.state;
  if (!state.init.location) {
    return false;
  }

  // get array of areas with available pokemons
  const locationAreas = locationData[state.init.location].areas;

  if (!locationAreas || state.init.currentArea === undefined) {
    console.error("Cannot change area: missing locationAreas or currentArea");
    return false;
  }

  const newArea = (state.init.currentArea + areaOffset) as AreaNumber;

  // check validity of new area
  if (newArea < 1 || newArea > 4 || !locationAreas[newArea]) {
    console.log(`Area ${newArea} doesn't exist`);
    return false;
  }

  // generate new pokemon
  const pokemonsInArea = locationAreas[newArea];
  const newEnemyPokemon = generateWildPokemon(pokemonsInArea);

  if (!newEnemyPokemon) {
    console.error("Failed to generate new enemy pokemon");
    return false;
  }

  // set new enemy pokemon and status
  setEnemyPokemon(newEnemyPokemon as EnemyPokemon);
  setBattleStatus("in-progress");

  // update battle state
  battleStore.setState((state) => ({
    ...state,
    init: {
      ...state.init,
      currentArea: newArea,
      areaChangesCounter: state.init.areaChangesCounter + 1,
    },
  }));

  return true;
};

export const prepareNextPartOfDay = () => {
  battleStore.setState((state) => ({
    ...state,
    init: {
      ...state.init,
      areaChangesCounter: 0,
    },
  }));
};
