import { useCallback, useContext, useEffect, useState } from "react";
import { makeDamage } from "@/utils/battle-function/makeDamage";
import { PokemonContext } from "@/contexts/PokemonContext";
import { BattleState } from "@/types/enums/battleState";
import { changeEnergy } from "@/utils/battle-function/changeEnergy";
import { BattleContext } from "@/contexts/BattleContext";

const useDamage = () => {
  const context = useContext(BattleContext);
  const pokemonContext = useContext(PokemonContext);

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
      context.battleState !== BattleState.BATTLE
    )
      return;

    const enemy = context.enemyPokemon;
    const userPokemon = pokemonContext.currentPokemon;
    const attack = context.attack;
    const pokemonSix = pokemonContext.pokemonsFromSix;
    const setPokemonSix = pokemonContext.setPokemonsFromSix;

    if (!enemy || !attack || !userPokemon) return;
    //context.setChange((change) => change + 1);
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

    //console.log("new energy: ", pokemonContext.currentPokemon?.actualEnergy);

    context.setEnemyPokemon({
      ...enemy,
      actualHp: Math.max(0, newHp),
    });

    //console.log("new HP: ", newHp);

    const newSix = pokemonSix.map((pokemon) =>
      pokemon.id !== userPokemon.id ? pokemon : { ...userPokemon, order: 0 }
    );
    setPokemonSix(newSix);

    changeEnergyOnServer(userPokemon.id, attack.energyCost);
    //console.log("enemy stat: ", enemy);
  }, [context?.attack, context?.change]);

  //return { setChange };
};

export default useDamage;
