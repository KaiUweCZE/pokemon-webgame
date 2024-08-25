import { BattleContext } from "@/contexts/BattleContext";
import { PokemonContext } from "@/contexts/PokemonContext";
import { BattleState } from "@/types/enums/battleState";
import { useContext, useEffect } from "react";

export const useBattleInit = () => {
  const cotnext = useContext(BattleContext);
  const pokemonContext = useContext(PokemonContext);

  useEffect(() => {
    console.log("change wild pokemon");
    cotnext?.setBattleState(BattleState.WILD_POKEMON_APPEAR);
    cotnext?.setAttack(null);
    pokemonContext?.setExps(0);
  }, [cotnext?.enemyPokemon]);
};
