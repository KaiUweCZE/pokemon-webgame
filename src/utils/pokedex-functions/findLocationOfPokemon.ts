import { mapData } from "@/app/map/mapData";

export const findLocationOfPokemon = (pokemonId: number) => {
  const locationNames = mapData.filter((location) =>
    location.completePokemonList.includes(pokemonId)
  );
  console.log("location of pokemon: ", locationNames);

  return locationNames;
};
