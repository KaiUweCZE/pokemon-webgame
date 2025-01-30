// utils/get-pokemon-assets.ts
/*import { PokemonImages } from "@/types/image";
import { capitalize } from "./string";

// Načtení všech obrázků pomocí Webpack require.context
const imageRequireContext = require.context("@images/pokemons", true, /\.(webp|png)$/);

// Pomocná funkce pro hledání obrázků
const getImagePath = (name: string, type: "default" | "back" | "icon") => {
  const paths = {
    default: `./${name}.webp`,
    back: `./backside/${name}-back.webp`,
    icon: `./pokemon-icons/${name}-icon.png`,
  };

  try {
    return imageRequireContext(paths[type]).default as string;
  } catch (error) {
    console.warn(`Obrázek nenalezen: ${paths[type]}`);
    return "";
  }
};

export const getPokemonAssets = (name: string): PokemonImages => ({
  default: {
    src: getImagePath(name, "default"),
    alt: `${capitalize(name)}`,
  },
  back: {
    src: getImagePath(name, "back"),
    alt: `${capitalize(name)} back sprite`,
  },
  icon: {
    src: getImagePath(name, "icon"),
    alt: `${capitalize(name)} icon`,
  },
});*/
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
/*
import { ImageAsset, PokemonImages } from "@/types/image";
import { capitalize } from "./string";

export const getPokemonAssets = async (name: string): Promise<PokemonImages> => {
  const defaultImage = (await import(`@/images/pokemons/${name}.webp`)).default;
  const backImage = (await import(`@/images/pokemons/backside/${name}-back.webp`)).default;
  const iconImage = (await import(`@/images/pokemons/pokemon-icons/${name}-icon.png`)).default;

  return {
    default: {
      src: defaultImage.src,
      alt: `${capitalize(name)}`,
    },
    back: {
      src: backImage.src,
      alt: `${capitalize(name)} back sprite`,
    },
    icon: {
      src: iconImage.src,
      alt: `${capitalize(name)} icon`,
    },
  };
};
*/
/*
import { PokemonImages } from "@/types/image";
import { capitalize } from "./string";
import fs from "fs";
import path from "path";

const pokemonsDir = path.join(process.cwd(), "src/images/pokemons");

const getAllPokemonNames = () => {
  return fs
    .readdirSync(pokemonsDir)
    .filter((file) => file.endsWith(".webp"))
    .map((file) => path.basename(file, ".webp"));
};

export const getPokemonAssets = getAllPokemonNames().reduce(
  (acc, name) => ({
    ...acc,
    [name]: {
      default: {
        src: require(`/images/pokemons/${name}.webp`).default,
        alt: `${capitalize(name)}`,
      },
      back: {
        src: require(`/images/pokemons/backside/${name}-back.webp`).default,
        alt: `${capitalize(name)} back sprite`,
      },
      icon: {
        src: require(`/images/pokemons/pokemon-icons/${name}-icon.png`).default,
        alt: `${capitalize(name)} icon`,
      },
    },
  }),
  {} as Record<string, PokemonImages>
);
*/
