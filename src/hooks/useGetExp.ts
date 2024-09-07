import { PokemonContext } from "@/contexts/PokemonContext";
import { BattleState } from "@/types/enums/battleState";
import { Pokemon } from "@/types/pokemon";
import { PokemonBattle } from "@/types/pokemonBattle";
import { addExp } from "@/utils/addExp";
import { getExp } from "@/utils/battle-function/getExp";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export const useGetExp = (
  enemyPokemon: PokemonBattle | null,
  battleState: BattleState
) => {
  const pokemonContext = useContext(PokemonContext);
  const [expAdded, setExpAdded] = useState(false);
  const [trigger, setTrigger] = useState(0);

  const handleLevelUp = useCallback(
    (
      updatedPokemon: Pokemon,
      currentPokemon: Pokemon,
      setCurrentPokemon: Dispatch<SetStateAction<Pokemon | null>>
    ) => {
      const newLevelStats = {
        actualExp: updatedPokemon.actualExp,
        level: updatedPokemon.level,
        expToLevel: updatedPokemon.expToLevel,
        damage: updatedPokemon.damage,
        defense: updatedPokemon.defense,
        energy: updatedPokemon.energy,
        hp: updatedPokemon.hp,
        speed: updatedPokemon.speed,
      };

      setCurrentPokemon((prevPokemon: Pokemon | null) => {
        if (!prevPokemon) return prevPokemon;
        return updatedPokemon.level > currentPokemon.level
          ? { ...prevPokemon, ...newLevelStats }
          : { ...prevPokemon, actualExp: updatedPokemon.actualExp };
      });

      if (pokemonContext && updatedPokemon.level > currentPokemon.level) {
        console.log("pokemon has new level!!");
        pokemonContext.setNewLevel(true);
        setTimeout(() => pokemonContext.setNewLevel(false), 5000);
      }
    },
    [pokemonContext?.currentPokemon?.actualExp]
  );

  useEffect(() => {
    if (!pokemonContext || !enemyPokemon) return;

    const { currentPokemon, setCurrentPokemon, setExps } = pokemonContext;

    const isEnemyDefeated =
      battleState === BattleState.WILD_POKEMON_FAINTED &&
      !expAdded &&
      trigger > 0;
    // If the enemy Pokemon's HP reaches 0, calculate and add exps
    if (isEnemyDefeated) {
      const newExp = getExp({
        pokemonHp: 0,
        pokemonName: enemyPokemon.name,
        pokemonLevel: enemyPokemon.level,
      });
      setExps(newExp);
      console.log(
        "your pokemon gets: ",
        pokemonContext.exps,
        "exps.",
        battleState,
        enemyPokemon.actualHp
      );

      if (newExp && currentPokemon) {
        setCurrentPokemon((prevPokemon) => {
          if (!prevPokemon) return prevPokemon;
          return { ...prevPokemon, actualExp: prevPokemon.actualExp + newExp };
        });
        addExp({ pokemonId: currentPokemon.id, newExps: newExp })
          .then((updatedPokemon) => {
            if (updatedPokemon) {
              handleLevelUp(updatedPokemon, currentPokemon, setCurrentPokemon);
            }
          })
          .catch((error) => {
            console.error("Error adding exp:", error);
          });
      }
      setExpAdded(true);
    }
  }, [battleState]);

  // Effect to set the trigger when enemy Pokemon's HP changes
  // The 'trigger' state and its related effect solve a specific race condition:
  // How it works:
  // 1. The trigger is incremented when enemyPokemon's HP changes (and is > 0).
  // 2. The main effect will only add exp when trigger > 0, ensuring that
  //    the HP has been updated at least once since the battle started.
  // This approach prevents the exp from being added incorrectly if the
  // battle state updates before the enemy Pokemon's HP is set to 0.
  useEffect(() => {
    if (enemyPokemon && enemyPokemon?.actualHp > 0) {
      console.log("trigger was actived", enemyPokemon?.actualHp);
      setTrigger((prev) => prev + 1);
    }
  }, [battleState]);

  // Reset expAdded when the battle state changes from WILD_POKEMON_FAINTED
  useEffect(() => {
    if (battleState !== BattleState.WILD_POKEMON_FAINTED) {
      setExpAdded(false);
    }
  }, [trigger]);
};
