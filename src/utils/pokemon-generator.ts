// utils/pokemon-generator.ts
import { PokemonCreate, PokemonType } from "@/types/pokemon";
import { pokemonsData } from "@/data/pokemons/pokemon-data";
import { randomizeValue } from "./randomize-value";
import { applyLevelToStats } from "./pokemon-stats";

interface StaticPokemonData {
  id: number;
  name: string;
  type: string[];
  damage: number;
  defense: number;
  speed: number;
  hp: number;
  energy: number;
  attacks: string[];
}

export const generatePokemon = (pokemonName: string, level: number = 1): PokemonCreate => {
  const baseData = pokemonsData.find((p) => p.name === pokemonName);

  if (!baseData) {
    throw new Error(`Pokemon ${pokemonName} not found in data`);
  }

  const baseStats: PokemonCreate = {
    name: baseData.name,
    types: baseData.type as PokemonType[],
    attacks: baseData.attacks.map((e) => e.attack),
    abilities: [],
    maxHp: randomizeValue(baseData.hp),
    maxEnergy: randomizeValue(baseData.energy),
    damage: randomizeValue(baseData.damage),
    defense: randomizeValue(baseData.defense),
    speed: randomizeValue(baseData.speed),
    expToNextLevel: baseData.expToLevel,
    level: 1,
  };

  return level > 1 ? applyLevelToStats(baseStats, level) : baseStats;
};

/*
export const generateWildPokemon = (level: number, pokemonName: string): PokemonCreate => {
  const basePokemon = generatePokemon(pokemonName);

  // edit stats by level
  const levelMultiplier = level / 1;
  return {
    ...basePokemon,
    level,
    maxHp: Math.round(basePokemon.maxHp! * levelMultiplier),
    maxEnergy: Math.round(basePokemon.maxEnergy! * levelMultiplier),
    damage: Math.round(basePokemon.damage! * levelMultiplier),
    defense: Math.round(basePokemon.defense! * levelMultiplier),
    speed: Math.round(basePokemon.speed! * levelMultiplier),
  };
};
*/
