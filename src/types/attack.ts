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
  grass: {
    strong: ["water", "ground", "rock"],
    weak: ["fire", "grass", "poison", "flying", "bug", "dragon", "steel"],
  },
  electric: {
    strong: ["water", "flying"],
    weak: ["electric", "grass", "dragon"],
  },
  ice: {
    strong: ["fire", "water", "ground"],
    weak: ["ice", "fighting", "dragon"],
  },
  fighting: {
    strong: ["normal", "ice", "rock", "steel"],
    weak: ["fighting", "poison", "flying", "psychic", "bug", "dragon"],
  },
  poison: {
    strong: ["grass", "fairy"],
    weak: ["poison", "ground", "rock", "ghost"],
  },
  ground: {
    strong: ["electric", "poison", "rock", "steel"],
    weak: ["fire", "ice", "dragon"],
  },
  flying: {
    strong: ["fighting", "bug", "grass"],
    weak: ["electric", "ice", "rock", "steel"],
  },
  psychic: {
    strong: ["fighting", "poison"],
    weak: ["psychic", "bug", "dragon"],
  },
  bug: {
    strong: ["grass", "psychic", "dark"],
    weak: ["fire", "fighting", "poison", "ghost", "dragon"],
  },
  rock: {
    strong: ["fire", "ice", "flying", "bug"],
    weak: ["fighting", "ground", "steel"],
  },
  ghost: {
    strong: ["poison", "psychic"],
    weak: ["ghost", "dark"],
  },
  dragon: {
    strong: ["dragon"],
    weak: ["fire", "water", "ice"],
  },
  dark: {
    strong: ["psychic", "ghost"],
    weak: ["dark", "fairy"],
  },
  fairy: {
    strong: ["fighting", "dragon"],
    weak: ["fire", "water", "steel"],
  },
  steel: {
    strong: ["ice", "rock"],
    weak: ["fire", "water", "electric"],
  },
};
