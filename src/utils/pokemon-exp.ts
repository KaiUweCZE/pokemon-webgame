import { pokemonsData } from "@/data/pokemons/pokemon-data";
import { PokemonLevelUpInfo, PokemonName } from "@/types/pokemon";
import { calculateTypeAdvantage } from "./calculate-type-advantage";

const BASE_SCALING = 0.15;

export const calculateNeededKills = (level: number): number => {
  const baseKills = 2;
  const levelScaling = Math.pow(1 + BASE_SCALING, level - 5);
  return Math.max(baseKills, baseKills * levelScaling);
};

export const calculateExpToNextLevel = (pokemonName: PokemonName, currentLevel: number): number => {
  const baseData = pokemonsData.find((p) => (p.name as PokemonName) === pokemonName);
  if (!baseData) {
    throw new Error(`Pokemon ${pokemonName} not found`);
  }

  const neededExp = baseData.expToLevel + currentLevel * 1.25;

  return neededExp;
};

// exp for killing a specific pokemon
export const calculateExpGain = (
  winnerName: PokemonName,
  winnerLevel: number,
  loserName: PokemonName,
  loserLevel: number
): number => {
  const loserData = pokemonsData.find((p) => p.name === loserName);
  const winnerData = pokemonsData.find((p) => p.name === winnerName);
  if (!loserData || !winnerData) {
    throw new Error(`Pokemon ${loserName} not found`);
  }

  let expGain = loserData.expForKill;
  const levelDifference = loserLevel - winnerLevel;
  const typeBonus = calculateTypeAdvantage(winnerData.type, loserData.type);

  // Bonus/penalize for level difference
  if (levelDifference > 0) {
    expGain *= 1 + levelDifference * 0.3 + typeBonus;
  } else if (levelDifference < 0) {
    expGain *= Math.max(0.1, 1 + (levelDifference * 0.1) / typeBonus);
  }

  return expGain;
};

// Get info about level up for a specific pokemon
/*export const getPokemonLevelInfo = (pokemonName: string): PokemonLevelUpInfo => {
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
*/
