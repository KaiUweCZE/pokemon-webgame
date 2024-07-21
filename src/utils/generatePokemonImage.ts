import { pokemonBattleData } from "@/data/pokemonBattleData";
import { pokemonsData } from "@/data/pokemonData";

export const generatePokemonImage = (pokemonName: string) => {
  const pokemonImg = pokemonBattleData.find(
    (pokemon) =>
      pokemon.name.toLocaleLowerCase() === pokemonName.toLocaleLowerCase()
  )?.img;
  return pokemonImg;
};

export const generatePokemonImageBack = (pokemonName: string) => {
  const pokemonImg = pokemonBattleData.find(
    (pokemon) =>
      pokemon.name.toLocaleLowerCase() === pokemonName.toLocaleLowerCase()
  )?.imgBack;
  return pokemonImg;
};

export const generatePokemonIcon = (pokemonName: string) => {
  const pokemonImg = pokemonBattleData.find(
    (pokemon) =>
      pokemon.name.toLocaleLowerCase() === pokemonName.toLocaleLowerCase()
  )?.icon;
  return pokemonImg;
};
