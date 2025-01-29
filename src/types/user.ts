import { ObjectId } from "./pokemon";

export type Location = "shire" | "bridge";

export interface InventoryItem {
  id: ObjectId;
  name: string;
  quantity: number;
}

export interface User {
  id: ObjectId;
  name: string;
  profileImg: string;
  location: string;
  chapter: number;
  activePokemonIds: ObjectId[];
}
