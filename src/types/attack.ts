import { StaticImageData } from "next/image";

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
