import { pokemonBattleData } from "@/data/pokemonBattleData";
import { generatePokemonsRate } from "./generatePokemonsRate";

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
  const level = randomLevel(levelRange);
  console.log("data: ", data);
  console.log("level: ", level);

  // generate pokemon's potentional, each ability can be in range 0.5 - 1.5
  const { hpRate, defenseRate, speedRate, dmgRate, energyRate } =
    generatePokemonsRate();

  if (!data) {
    throw new Error(`pokemon not found ${pokemonId}`);
  }

  const pokemon = {
    //...data,
    name: data.name,
    type: data.type,
    level: level,
    damage: parseFloat(
      (data.damage * Math.pow(1.05, level) * dmgRate).toFixed(2)
    ),
    hp: parseFloat((data.hp * Math.pow(1.05, level) * hpRate).toFixed(2)),
    actualHp: parseFloat((data.hp * Math.pow(1.05, level) * hpRate).toFixed(2)),
    defense: parseFloat(
      (data.defense * Math.pow(1.05, level) * defenseRate).toFixed(2)
    ),
    speed: parseFloat(
      (data.speed * Math.pow(1.05, level) * speedRate).toFixed(2)
    ),
    energy: parseFloat(
      (data.energy * Math.pow(1.05, level) * energyRate).toFixed(2)
    ),
    actualEnergy: parseFloat(
      (data.energy * Math.pow(1.05, level) * energyRate).toFixed(2)
    ),
    attacks: ["tackle"],
    abilities: [],
    expToLevel: Math.ceil(data.expToLevel * Math.pow(1.5, level)),
    expForKill: Math.ceil(data.expForKill * Math.pow(1.5, level)),
  };

  return pokemon;
};
