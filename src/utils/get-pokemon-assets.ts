import { ImageAsset, PokemonImages } from "@/types/image";
import { capitalize } from "./string";

export const getPokemonAssets = (name: string): PokemonImages => {
  return {
    default: {
      src: `/images/pokemons/${name}.webp`,
      alt: `${capitalize(name)}`,
    },
    back: {
      src: `/images/pokemons/backside/${name}-back.webp`,
      alt: `${capitalize(name)} back sprite`,
    },
    icon: {
      src: `/images/pokemons/pokemon-icons/${name}-icon.png`,
      alt: `${capitalize(name)} icon`,
    },
  };
};
