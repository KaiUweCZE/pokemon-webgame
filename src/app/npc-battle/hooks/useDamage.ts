import { useContext, useEffect, useState } from "react";
import { NpcBattleContext } from "../NpcBattleContext";
import { makeDamage } from "@/utils/battle-function/makeDamage";
import { PokemonContext } from "@/contexts/PokemonContext";

const useDamage = () => {
  const context = useContext(NpcBattleContext);
  const pokemonContext = useContext(PokemonContext);
  const [change, setChange] = useState(0);

  useEffect(() => {
    if (!context || !pokemonContext) return;

    const enemy = context.currentOponentPokemon;
    const userPokemon = pokemonContext.currentPokemon;
    const attack = context.attack;

    if (enemy && attack && userPokemon) {
      let newHp = makeDamage(
        attack.damage,
        enemy.actualHp,
        enemy.type,
        attack.type,
        userPokemon?.damage,
        enemy.defense
      );
      context.setCurrentOponentPokemon({ ...enemy, actualHp: newHp });
      console.log("enemy stat: ", enemy);
    }
  }, [context?.attack, change]);

  return { setChange };
};

export default useDamage;
