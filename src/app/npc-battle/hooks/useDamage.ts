import { useCallback, useContext, useEffect, useState } from "react";
import { NpcBattleContext } from "../NpcBattleContext";
import { makeDamage } from "@/utils/battle-function/makeDamage";
import { PokemonContext } from "@/contexts/PokemonContext";
import { BattleState } from "@/types/enums/battleState";
import { changeEnergy } from "@/utils/battle-function/changeEnergy";

const useDamage = () => {
  const context = useContext(NpcBattleContext);
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
      pokemon.id !== userPokemon.id ? pokemon : { ...userPokemon, order: 0 }
    );
    setPokemonSix(newSix);

    changeEnergyOnServer(userPokemon.id, attack.energyCost);
    console.log("enemy stat: ", enemy);
    console.log("new HP", newHp);
  }, [context?.attack, context?.change]);
};

export default useDamage;
