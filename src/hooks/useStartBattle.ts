"use client";

import { RoundContext } from "@/app/battle/RoundContext";
import { mapData } from "@/app/map/mapData";
import { BattleContext } from "@/contexts/BattleContext";
import { PokemonContext } from "@/contexts/PokemonContext";
import { Pokemon } from "@/types/pokemon";
import { PokemonBattle } from "@/types/pokemonBattle";
import { randomNumber } from "@/utils/battle-function/randomPokemon";
import { generatePokemon } from "@/utils/generatePokemon";
import { useContext, useEffect, useState } from "react";

const useStartBattle = (location: string, round: number) => {
  const [pokemon, setPokemon] = useState<PokemonBattle>();
  const context = useContext(BattleContext);
  const pokemonContext = useContext(PokemonContext);

  useEffect(() => {
    const dataLocation = mapData.find((map) => map.name === location);
    const actualRound = dataLocation?.rounds.find((e) => e.id === round);
    if (actualRound?.pokemons.length) {
      const randomNum = randomNumber(actualRound.pokemons.length);
      const generatedPokemon = generatePokemon(
        actualRound.pokemons[randomNum],
        actualRound?.levelRange
      );
      if (generatedPokemon) {
        setPokemon(generatedPokemon);
        context?.setEnemyPokemon(generatedPokemon);
      }
    }
  }, [round]);

  useEffect(() => {
    if (pokemonContext && pokemonContext.pokemonsFromSix.length > 0) {
      context?.setUserPokemon(pokemonContext.pokemonsFromSix[0]);
    }
  }, [location]);

  useEffect(() => {
    context?.setIsCatching({ underway: false, isSucces: false });
    console.log(`is catching is ${context?.isCatching.isSucces}`);
  }, []);

  console.log("round: ", round);

  return pokemon;
};

export default useStartBattle;
