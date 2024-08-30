import { StaticImageData } from "next/image";

export interface PokemonPokedex {
  id: number;
  name: string;
  img: StaticImageData;
  icon: StaticImageData;
  imgBack: StaticImageData;
  type: string[];
  attacks: {
    level: number;
    attacks: string[];
  }[];
  hp: number;
  damage: number;
  defense: number;
  speed: number;
  energy: number;
  evolutionLevels?: number[] | null;
  evolutionChain?: string[] | null;
  evolution?: {
    level?: number;
    name?: string;
  } | null;
}
