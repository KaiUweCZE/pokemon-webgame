import { pokemonsData } from "@/data/pokemons/pokemon-data";
import { PokemonLevelUpInfo } from "@/types/pokemon";

// constant for growing difficulty
const EXP_SCALING_FACTOR = 1.1;

export const calculateExpToNextLevel = (pokemonName: string, currentLevel: number): number => {
  const baseData = pokemonsData.find((p) => p.name === pokemonName);
  if (!baseData) {
    throw new Error(`Pokemon ${pokemonName} not found`);
  }

  // base exp + progress for each level
  const baseExp = baseData.expToLevel;
  return Math.round(baseExp * Math.pow(EXP_SCALING_FACTOR, currentLevel - 1));
};

// Get info about level up for a specific pokemon
export const getPokemonLevelInfo = (pokemonName: string): PokemonLevelUpInfo => {
  const baseData = pokemonsData.find((p) => p.name === pokemonName);
  if (!baseData) {
    throw new Error(`Pokemon ${pokemonName} not found`);
  }

  return {
    baseExpToLevel: baseData.expToLevel,
    expGrowthRate: EXP_SCALING_FACTOR,
    expForKill: baseData.expForKill,
  };
};

// exp for killing a specific pokemon
export const calculateExpGain = (
  winnerLevel: number,
  loserName: string,
  loserLevel: number
): number => {
  const baseData = pokemonsData.find((p) => p.name === loserName);
  if (!baseData) {
    throw new Error(`Pokemon ${loserName} not found`);
  }

  // base exp for killing
  let expGain = baseData.expForKill;

  // bonus based on level difference
  const levelDifference = loserLevel - winnerLevel;
  if (levelDifference > 0) {
    // increase exp if loser has higher level
    expGain *= 1 + levelDifference * 0.1;
  } else if (levelDifference < 0) {
    // decrease exp if loser has lower level
    expGain *= Math.max(0.1, 1 + levelDifference * 0.1);
  }

  return Math.round(expGain);
};
