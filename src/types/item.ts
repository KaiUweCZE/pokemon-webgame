import { StaticImageData } from "next/image";
import { PokemonType } from "./pokemon";

export type ItemCategory = "consumable" | "evolution" | "pokeball" | "key";

export const itemCategories = {
  pokeball: "Balls",
  consumable: "Consumables",
  evolution: "Evolution",
  key: "Key",
} satisfies Record<ItemCategory, string>;

/*export type ItemName =
  | "pokeball"
  | "great ball"
  | "potion"
  | "super potion"
  | "energy drink"
  | "antidote"
  | "paraheal"
  | "coffee"
  | "electric-stone"
  | "fire stone"
  | "grass stone"
  | "ice stone"
  | "normal stone"
  | "coins";*/

export const VALID_ITEMS = [
  "pokeball",
  "great ball",
  "potion",
  "super potion",
  "energy drink",
  "antidote",
  "paraheal",
  "coffee",
  "electric stone",
  "fire stone",
  "grass stone",
  "ice stone",
  "coins",
] as const;

export type ItemName = (typeof VALID_ITEMS)[number];

// Typeguard
export function isValidItemName(item: string): item is ItemName {
  return VALID_ITEMS.includes(item as ItemName);
}

export interface Item<T extends BaseItemMetadata = BaseItemMetadata> {
  name: ItemName;
  description: string;
  category: string;
  stackable: boolean;
  img: {
    src: StaticImageData | string;
    alt: string;
  };
  price: number;
  effect?: string;
  quantity?: number;
  metadata?: ItemMetadata<T>;
}

export interface InventoryItem<T extends BaseItemMetadata = BaseItemMetadata> {
  id: string;
  userId: string;
  name: ItemName;
  quantity: number;
  metadata?: ItemMetadata<T>;
}

export interface PotionMetadata {
  healAmount: number;
  effectDuration?: number;
}

export interface StoneMetadata {
  compatibleTypes: PokemonType[];
  minLevel: number;
}

interface BaseItemMetadata {
  acquiredAt?: Date;
  lastUsed?: Date;
}

interface QuestItemMetadata extends BaseItemMetadata {
  questId: string;
  progress: number;
  isCompleted: boolean;
}

export type ItemMetadata<T extends BaseItemMetadata = BaseItemMetadata> = T;
