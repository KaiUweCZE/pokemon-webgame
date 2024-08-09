import { pokemonBattleData } from "@/data/pokemonBattleData";
import { Pokemon } from "@/types/pokemon";

export const prepareToEvolve = (
  pokemon: Pokemon,
  pokemonEvolutionName: string
) => {
  const baseStats = pokemonBattleData.find(
    (poke) => poke.name === pokemon.name
  );

  const newBaseStats = pokemonBattleData.find(
    (poke) => poke.name === pokemonEvolutionName
  );

  if (!baseStats || !newBaseStats) return null;

  const rate = {
    hp: pokemon.hp / (baseStats.hp * Math.pow(1.05, pokemon.level)),
    damage: pokemon.damage / (baseStats.damage * Math.pow(1.05, pokemon.level)),
    energy: pokemon.energy / (baseStats.energy * Math.pow(1.05, pokemon.level)),
    defense:
      pokemon.defense / (baseStats.defense * Math.pow(1.05, pokemon.level)),
    speed: pokemon.speed / (baseStats.speed * Math.pow(1.05, pokemon.level)),
  };

  console.log("pokemon rate: ", rate);

  const newStats = {
    name: newBaseStats.name,
    level: pokemon.level,
    type: newBaseStats.type,
    hp: parseFloat(
      (rate.hp * newBaseStats.hp * Math.pow(1.05, pokemon.level)).toFixed(2)
    ),
    damage: parseFloat(
      (
        rate.damage *
        newBaseStats.damage *
        Math.pow(1.05, pokemon.level)
      ).toFixed(2)
    ),
    energy: parseFloat(
      (
        rate.energy *
        newBaseStats.energy *
        Math.pow(1.05, pokemon.level)
      ).toFixed(2)
    ),
    defense: parseFloat(
      (
        rate.defense *
        newBaseStats.defense *
        Math.pow(1.05, pokemon.level)
      ).toFixed(2)
    ),
    speed: parseFloat(
      (rate.speed * newBaseStats.speed * Math.pow(1.05, pokemon.level)).toFixed(
        2
      )
    ),
    expToLevel: newBaseStats.expToLevel * pokemon.level,
  };

  return newStats;
};
