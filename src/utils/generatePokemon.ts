import { pokemonBattleData } from "@/data/pokemonBattleData";
import { generatePokemonsRate } from "./generatePokemonsRate";
import { calculateStat } from "./calculateStat";
import {
  generateMoves,
  generateMovesName,
} from "./battle-function/generateMoves";

/**
 * Generates a random number within the specified range.
 * @param {number[]} levelRange - An array with two numbers representing the range [min, max].
 * @returns {number} - A random number within the specified range.
 */
export const randomLevel = (levelRange: number[]) => {
  const [min, max] = levelRange;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generatePokemon = (pokemonId: number, levelRange: number[]) => {
  const data = pokemonBattleData.find((pokemon) => pokemon.id === pokemonId);

  if (!data) {
    throw new Error(`pokemon not found ${pokemonId}`);
  }

  const level = randomLevel(levelRange);
  // generate pokemon's potentional, each ability can be in range 0.5 - 1.5
  const { hpRate, defenseRate, speedRate, dmgRate, energyRate } =
    generatePokemonsRate();

  const hp = calculateStat(data.hp, level, hpRate);
  const energy = calculateStat(data.energy, level, energyRate);

  const pokemon = {
    //...data,
    name: data.name,
    type: data.type,
    level: level,
    damage: calculateStat(data.damage, level, dmgRate),
    hp: hp,
    actualHp: hp,
    defense: calculateStat(data.defense, level, defenseRate),
    speed: calculateStat(data.speed, level, speedRate),
    energy: energy,
    actualEnergy: energy,
    attacks: generateMovesName(data.name, level),
    abilities: [], // will be empty array or random
    expToLevel: data.expToLevel * level,
    expForKill: Math.ceil(data.expForKill * Math.pow(1.5, level)),
  };

  return pokemon;
};
