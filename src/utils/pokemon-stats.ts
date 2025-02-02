import { PokemonCreate } from "@/types/pokemon";

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
    hp: 0, // HP to 0 decimals
    energy: 0, // to 0 decimals
    damage: 1, // Damage to 1 decimal
    defense: 1, // Defense to 1 decimal
    speed: 1, // Speed to 1 decimal
  },
};

// round to specified decimals
const roundTo = (num: number, decimals: number): number => {
  const multiplier = Math.pow(10, decimals);
  return Math.round(num * multiplier) / multiplier;
};

// calculate leveled stat
export const calculateLeveledStat = (
  baseStat: number,
  level: number,
  statType: keyof typeof STAT_GROWTH.MULTIPLIERS
): number => {
  // base growth
  const growthRate = STAT_GROWTH.BASE_GROWTH * STAT_GROWTH.MULTIPLIERS[statType];

  // quadratic growth for higher levels (slightly faster)
  const levelMultiplier = 1 + growthRate * level + 0.001 * Math.pow(level, 1.5);
  return roundTo(baseStat * levelMultiplier, STAT_GROWTH.DECIMALS[statType]);
};

// Apply level to stats
export const applyLevelToStats = (pokemon: PokemonCreate, level: number): PokemonCreate => {
  return {
    ...pokemon,
    level,
    maxHp: calculateLeveledStat(pokemon.maxHp!, level, "hp"),
    maxEnergy: calculateLeveledStat(pokemon.maxEnergy!, level, "energy"),
    damage: calculateLeveledStat(pokemon.damage!, level, "damage"),
    defense: calculateLeveledStat(pokemon.defense!, level, "defense"),
    speed: calculateLeveledStat(pokemon.speed!, level, "speed"),
    //expToNextLevel: calculateLeveledStat(pokemon.expToNextLevel!, level, "expToNextLevel"),
  };
};

export const isPokemonShiny = () => {
  const random = Math.random();
  return random < 0.01;
};
