import { BattleContext } from "@/contexts/BattleContext";
import { PokemonContext } from "@/contexts/PokemonContext";
import { BattleState } from "@/types/enums/battleState";
import { BattleMenuState } from "@/types/enums/enumBattleMenu";
import { useContext, useEffect } from "react";
import { RoundContext } from "../RoundContext";

export const useBattleState = () => {
  const context = useContext(BattleContext);
  const pokemonContext = useContext(PokemonContext);
  const roundContext = useContext(RoundContext);

  useEffect(() => {
    if (!context || !pokemonContext) return;

    const { currentPokemon, pokemonsFromSix } = pokemonContext;
    const { enemyPokemon, setBattleState, setMenuOption } = context;

    if (!currentPokemon || !enemyPokemon) return;
    //console.log("battle state manager: ", context.battleState);

    if (
      enemyPokemon.actualHp > 0 &&
      context.battleState === BattleState.WILD_POKEMON_FAINTED
    ) {
      setBattleState(BattleState.WILD_POKEMON_APPEAR);
    }
    if (currentPokemon?.actualHp <= 0) {
      console.log("this one: ", pokemonContext.currentPokemon?.actualHp);

      if (!pokemonsFromSix.some((pokemon) => pokemon.actualHp > 0)) {
        setBattleState(BattleState.OPPONENT_VICTORY);
      } else {
        setBattleState(BattleState.USER_POKEMON_FAINTED);
      }
      return;
    }
    if (enemyPokemon.actualHp <= 0) {
      setBattleState(BattleState.WILD_POKEMON_FAINTED);
      setMenuOption(BattleMenuState.DEFAULT);
    }

    if (roundContext?.round === 3 && enemyPokemon.actualHp <= 0) {
      setBattleState(BattleState.LAST_ROUND_DONE);
    }
  }, [pokemonContext?.currentPokemon, context?.enemyPokemon]);

  return { battleState: context?.battleState };
};
