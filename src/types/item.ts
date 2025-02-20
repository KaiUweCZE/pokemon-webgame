import { PokemonType } from "./pokemon";

export type ItemCategory = "consumable" | "evolution" | "pokeball" | "key";

export type ItemName =
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
  | "coins";

export interface Item {
  name: ItemName;
  description: string;
  price: number;
  effect?: string;
  maxQuantity?: number;
  stackable: boolean;
  icon: string;
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
  acquiredAt: Date;
  lastUsed?: Date;
}

interface QuestItemMetadata extends BaseItemMetadata {
  questId: string;
  progress: number;
  isCompleted: boolean;
}

export type ItemMetadata<T extends BaseItemMetadata = BaseItemMetadata> = T;

export interface InventoryItem<T extends BaseItemMetadata = BaseItemMetadata> {
  id: string;
  userId: string;
  name: ItemName;
  quantity: number;
  metadata?: ItemMetadata<T>;
}
