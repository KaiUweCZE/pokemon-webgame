import { pokemonsData } from "@/data/pokemonData";

export const generatePokemonImage = (pokemonName: string) => {
  const pokemonImg = pokemonsData.find(
    (pokemon) =>
      pokemon.name.toLocaleLowerCase() === pokemonName.toLocaleLowerCase()
  )?.img;
  return pokemonImg;
};

export const generatePokemonImageBack = (pokemonName: string) => {
  const pokemonImg = pokemonsData.find(
    (pokemon) =>
      pokemon.name.toLocaleLowerCase() === pokemonName.toLocaleLowerCase()
  )?.backImg;
  return pokemonImg;
};
