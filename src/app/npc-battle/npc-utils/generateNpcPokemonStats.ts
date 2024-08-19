import { pokemonBattleData } from "@/data/pokemonBattleData";
import { PokemonBattle } from "@/types/pokemonBattle";
import { calculateStat } from "@/utils/calculateStat";

interface oponentPokemon {
  //id: number;
  name: string;
  type: string[];
  abilities: string[];
  attacks: string[];
  level: number;
  damageRate: number;
  defenseRate: number;
  hpRate: number;
  speedRate: number;
  energyRate: number;
}

export const generateNpcPokemons = (
  pokemon: oponentPokemon
): PokemonBattle | null => {
  const {
    level,
    defenseRate,
    damageRate,
    hpRate,
    energyRate,
    abilities,
    attacks,
    speedRate,
    name,
  } = pokemon;
  const data = pokemonBattleData.find((p) => p.name === name);

  if (!data) return null;

  const hp = calculateStat(data.hp, level, hpRate);
  const energy = calculateStat(data.energy, level, energyRate);

  const buildedPokemon = {
    name: name,
    type: data.type,
    level: level,
    damage: calculateStat(data.damage, level, damageRate),
    hp: hp,
    actualHp: hp,
    defense: calculateStat(data.defense, level, defenseRate),
    speed: calculateStat(data.speed, level, speedRate),
    energy: energy,
    actualEnergy: energy,
    attacks: attacks,
    abilities: abilities,
  };

  return buildedPokemon;
};
