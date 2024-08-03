import { useContext, useEffect } from "react";
import { NpcBattleContext } from "../NpcBattleContext";
import { PokemonContext } from "@/contexts/PokemonContext";
import { randomAttack } from "@/utils/battle-function/randomAttack";
import { attacksData } from "@/data/attacksData";

const useOponentBattle = () => {
  const context = useContext(NpcBattleContext);
  const pokemonContext = useContext(PokemonContext);

  useEffect(() => {
    if (!context || !pokemonContext) return;
    const oponentPokemon = context.currentOponentPokemon;
    const pokemon = pokemonContext.currentPokemon;

    // get data about attack
    const attacks = attacksData.filter((attack) =>
      oponentPokemon?.attacks.includes(attack.name)
    );

    // randomoize current attack
    randomAttack(attacks);
  });
};

export default useOponentBattle;
