import { useCallback, useContext, useEffect, useState } from "react";
import { NpcBattleContext } from "../NpcBattleContext";
import { makeDamage } from "@/utils/battle-function/makeDamage";
import { PokemonContext } from "@/contexts/PokemonContext";
import { NpcBattleState } from "@/types/enums/npcBattleState";
import { changeEnergy } from "@/utils/battle-function/changeEnergy";

const useDamage = () => {
  const context = useContext(NpcBattleContext);
  const pokemonContext = useContext(PokemonContext);
  const [change, setChange] = useState(0);

  const changeEnergyOnServer = useCallback(
    async (pokemonId: string, energyCost: number) => {
      try {
        await changeEnergy(pokemonId, energyCost);
      } catch (error) {
        console.error(`Error occured during energy change.`, error);
      }
    },
    []
  );

  useEffect(() => {
    if (
      !context ||
      !pokemonContext ||
      context.battleState !== NpcBattleState.BATTLE
    )
      return;

    const enemy = context.currentOponentPokemon;
    const userPokemon = pokemonContext.currentPokemon;
    const attack = context.attack;
    const pokemonSix = pokemonContext.pokemonsFromSix;
    const setPokemonSix = pokemonContext.setPokemonsFromSix;

    if (!enemy || !attack || !userPokemon) return;

    const newHp = makeDamage(
      attack.damage,
      enemy.actualHp,
      enemy.type,
      attack.type,
      userPokemon?.damage,
      enemy.defense
    );
    const newEnergy = Math.max(0, userPokemon.actualEnergy - attack.energyCost);

    pokemonContext.setCurrentPokemon({
      ...userPokemon,
      actualEnergy: newEnergy,
    });

    context.setCurrentOponentPokemon({
      ...enemy,
      actualHp: Math.max(0, newHp),
    });

    const newSix = pokemonSix.map((pokemon) =>
      pokemon.id !== userPokemon.id ? pokemon : userPokemon
    );
    setPokemonSix(newSix);

    changeEnergyOnServer(userPokemon.id, attack.energyCost);
    console.log("enemy stat: ", enemy);
  }, [context?.attack, change]);

  return { setChange };
};

export default useDamage;
