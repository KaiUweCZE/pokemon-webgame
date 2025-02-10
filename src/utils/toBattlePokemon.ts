import { pokemonsImg } from "@/images";
import { PokemonImages } from "@/types/image";
import { BattlePokemon, Pokemon, PokemonImage, PokemonName } from "@/types/pokemon";

export const toBattlePokemon = (pokemon: Pokemon): BattlePokemon => {
  const { createdAt, userId, evolutionInformed, ...battleProperties } = pokemon;

  return {
    ...battleProperties,
    attackCooldowns: pokemon.attacks.reduce(
      (cooldowns, attack) => ({
        ...cooldowns,
        [attack]: 0,
      }),
      {}
    ),
    image: pokemonsImg[pokemon.name as PokemonName] as PokemonImages,
  };
};
