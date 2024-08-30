import { BattleContext } from "@/contexts/BattleContext";
import { PokemonContext } from "@/contexts/PokemonContext";
import { BattleState } from "@/types/enums/battleState";
import { useContext, useEffect } from "react";
import { RoundContext } from "../RoundContext";
import { BattleMenuState } from "@/types/enums/enumBattleMenu";

export const useBattleInit = () => {
  const cotnext = useContext(BattleContext);
  const pokemonContext = useContext(PokemonContext);
  const roundContext = useContext(RoundContext);

  useEffect(() => {
    console.log("change wild pokemon");
    cotnext?.setBattleState(BattleState.WILD_POKEMON_APPEAR);
    pokemonContext?.setExps(0);
  }, [roundContext?.round]);
};
