import { pokemonsData } from "@/data/pokemonData";

export const generatePokemonTypes = (pokemonName: string) => {
  const pokemonTypes = pokemonsData.find(
    (pokemon) =>
      pokemon.name.toLocaleLowerCase() === pokemonName.toLocaleLowerCase()
  )?.type;

  return pokemonTypes;
};
