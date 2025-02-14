import { pokemonsData } from "@/data/pokemons/pokemon-data";
import { PokemonCreate } from "@/types/pokemon";
import { roundNumber } from "./helper/round-number";

const STAT_GROWTH = {
  // 3% up per level
  BASE_GROWTH: 0.03,

  // Different multipliers for different stats
  MULTIPLIERS: {
    hp: 1.2, // HP + 20%
    energy: 1.1, // Energy + 10% etc.
    damage: 1.0,
    defense: 1.0,
    speed: 0.8,
  },

  // round to specified decimals
  DECIMALS: {
    hp: 1, // HP to 0 decimals
    energy: 1, // to 0 decimals
    damage: 1, // Damage to 1 decimal
    defense: 1, // Defense to 1 decimal
    speed: 1, // Speed to 1 decimal
  },
};

// calculate leveled stat
export const calculateLeveleStat = (
  baseStat: number,
  level: number,
  statType: keyof typeof STAT_GROWTH.MULTIPLIERS
): number => {
  // base growth
  const growthRate = STAT_GROWTH.BASE_GROWTH * STAT_GROWTH.MULTIPLIERS[statType];

  // quadratic growth for higher levels (slightly faster)
  const levelMultiplier = 1 + growthRate * level + 0.001 * Math.pow(level, 1.5);
  return roundNumber(baseStat * levelMultiplier, STAT_GROWTH.DECIMALS[statType]);
};

// Apply level to stats
export const applyLevelToStats = (pokemon: PokemonCreate, level: number): PokemonCreate => {
  return {
    ...pokemon,
    level,
    maxHp: calculateLeveleStat(pokemon.maxHp!, level, "hp"),
    maxEnergy: calculateLeveleStat(pokemon.maxEnergy!, level, "energy"),
    damage: calculateLeveleStat(pokemon.damage!, level, "damage"),
    defense: calculateLeveleStat(pokemon.defense!, level, "defense"),
    speed: calculateLeveleStat(pokemon.speed!, level, "speed"),
    //expToNextLevel: calculateLeveledStat(pokemon.expToNextLevel!, level, "expToNextLevel"),
  };
};

export const isPokemonShiny = () => {
  const random = Math.random();
  return random < 0.01;
};

interface StatChange {
  name: string;
  oldValue: number;
  newValue: number;
  increase: number;
  statType: keyof typeof STAT_GROWTH.MULTIPLIERS;
}

export const calculateNewStats = (
  oldLevel: number,
  newLevel: number,
  baseStats: PokemonCreate
): StatChange[] | null => {
  if (!baseStats) return null;

  const oldStats = applyLevelToStats(baseStats, oldLevel);
  const newStats = applyLevelToStats(baseStats, newLevel);

  const statChanges: StatChange[] = [
    {
      name: "HP",
      oldValue: oldStats.maxHp!,
      newValue: newStats.maxHp!,
      increase: roundNumber(newStats.maxHp! - oldStats.maxHp!, STAT_GROWTH.DECIMALS.hp),
      statType: "hp",
    },
    {
      name: "Energy",
      oldValue: oldStats.maxEnergy!,
      newValue: newStats.maxEnergy!,
      increase: roundNumber(newStats.maxEnergy! - oldStats.maxEnergy!, STAT_GROWTH.DECIMALS.energy),
      statType: "energy",
    },
    {
      name: "Attack",
      oldValue: oldStats.damage!,
      newValue: newStats.damage!,
      increase: roundNumber(newStats.damage! - oldStats.damage!, STAT_GROWTH.DECIMALS.damage),
      statType: "damage",
    },
    {
      name: "Defense",
      oldValue: oldStats.defense!,
      newValue: newStats.defense!,
      increase: roundNumber(newStats.defense! - oldStats.defense!, STAT_GROWTH.DECIMALS.defense),
      statType: "defense",
    },
    {
      name: "Speed",
      oldValue: oldStats.speed!,
      newValue: newStats.speed!,
      increase: roundNumber(newStats.speed! - oldStats.speed!, STAT_GROWTH.DECIMALS.speed),
      statType: "speed",
    },
  ];

  return statChanges.filter(
    (stat) => roundNumber(stat.newValue - stat.oldValue, STAT_GROWTH.DECIMALS[stat.statType]) > 0
  );
};

export const convertToPokemonCreate = (data: (typeof pokemonsData)[0]): PokemonCreate => {
  return {
    name: data.name,
    types: data.type,
    maxHp: data.hp,
    maxEnergy: data.energy,
    damage: data.damage,
    defense: data.defense,
    speed: data.speed,
    expToNextLevel: data.expToLevel,
  };
};
