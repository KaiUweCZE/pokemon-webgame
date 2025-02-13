import { StaticImageData } from "next/image";
import { PokemonType } from "./pokemon";

export type AttackType =
  | "fire"
  | "water"
  | "grass"
  | "electric"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy"
  | "normal";

export interface Attack {
  id: number;
  name: string;
  type: AttackType;
  damage: number;
  energyCost: number;
  recoveryTime: number;
  description?: string;
  img: StaticImageData | string;
}

export const TYPE_EFFECTIVENESS: Record<
  PokemonType,
  { strong: PokemonType[]; weak: PokemonType[] }
> = {
  normal: {
    strong: [],
    weak: ["rock", "steel"],
  },
  fire: {
    strong: ["grass", "ice", "bug", "steel"],
    weak: ["fire", "water", "rock", "dragon"],
  },
  water: {
    strong: ["fire", "ground", "rock"],
    weak: ["water", "grass", "dragon"],
  },
  electric: {
    strong: ["water", "flying"],
    weak: ["electric", "grass", "dragon", "ground"],
  },
  grass: {
    strong: ["water", "ground", "rock"],
    weak: ["fire", "grass", "poison", "flying", "bug", "dragon", "steel"],
  },
  ice: {
    strong: ["grass", "ground", "flying", "dragon"],
    weak: ["fire", "water", "ice", "steel"],
  },
  fighting: {
    strong: ["normal", "ice", "rock", "dark", "steel"],
    weak: ["poison", "flying", "psychic", "bug", "fairy"],
  },
  poison: {
    strong: ["grass", "fairy"],
    weak: ["poison", "ground", "rock", "ghost", "steel"],
  },
  ground: {
    strong: ["fire", "electric", "poison", "rock", "steel"],
    weak: ["grass", "bug", "flying"],
  },
  flying: {
    strong: ["grass", "fighting", "bug"],
    weak: ["electric", "rock", "steel"],
  },
  psychic: {
    strong: ["fighting", "poison"],
    weak: ["psychic", "steel", "dark"],
  },
  bug: {
    strong: ["grass", "psychic", "dark"],
    weak: ["fire", "fighting", "poison", "flying", "ghost", "steel", "fairy"],
  },
  rock: {
    strong: ["fire", "ice", "flying", "bug"],
    weak: ["fighting", "ground", "steel"],
  },
  ghost: {
    strong: ["psychic", "ghost"],
    weak: ["dark", "normal"],
  },
  dragon: {
    strong: ["dragon"],
    weak: ["steel", "fairy"],
  },
  dark: {
    strong: ["psychic", "ghost"],
    weak: ["fighting", "dark", "fairy"],
  },
  steel: {
    strong: ["ice", "rock", "fairy"],
    weak: ["fire", "water", "electric", "steel"],
  },
  fairy: {
    strong: ["fighting", "dragon", "dark"],
    weak: ["fire", "poison", "steel"],
  },
};
