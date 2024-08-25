"use client";
import { mapData } from "@/app/map/mapData";
import { BattleContext } from "@/contexts/BattleContext";
import { PokemonContext } from "@/contexts/PokemonContext";
import { PokemonBattle } from "@/types/pokemonBattle";
import { randomNumber } from "@/utils/battle-function/randomPokemon";
import { generatePokemon } from "@/utils/generatePokemon";
import { useContext, useEffect, useState } from "react";
import { RoundContext } from "../RoundContext";

const useStartBattle = (location: string) => {
  const [pokemon, setPokemon] = useState<PokemonBattle>();
  const context = useContext(BattleContext);
  const pokemonContext = useContext(PokemonContext);
  const roundContext = useContext(RoundContext);

  useEffect(() => {
    if (!context || !pokemonContext || !roundContext) return;

    const round = roundContext.round;
    const dataLocation = mapData.find((map) => map.name === location);
    const actualRound = dataLocation?.rounds.find((e) => e.id === round);
    context?.setStopBattle(false);
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
  }, [roundContext?.round]);

  useEffect(() => {
    if (pokemonContext && pokemonContext.pokemonsFromSix.length > 0) {
      pokemonContext?.setCurrentPokemon(pokemonContext.pokemonsFromSix[0]);
    }
  }, [location]);

  useEffect(() => {
    context?.setIsCatching({ underway: false, isSucces: false });
    console.log(`is catching is ${context?.isCatching.isSucces}`);
  }, []);
};

export default useStartBattle;
