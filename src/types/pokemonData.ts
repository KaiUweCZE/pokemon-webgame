import { StaticImageData } from "next/image";

export interface AttackList {
  level: number;
  attacks: string[];
}

export interface Evolution {
  name: string;
  level: number;
}

export interface PokemonData {
  id: number;
  name: string;
  type: string[];
  img: StaticImageData;
  icon: StaticImageData;
  imgBack: StaticImageData;
  attacks: AttackList[];
  damage: number;
  defense: number;
  speed: number;
  hp: number;
  energy: number;
  expToLevel: number;
  expForKill: number;
  evolutionLevels?: number[];
  evolutionChain?: string[];
  evolution?: {
    level?: number;
    name?: string;
  };
}
