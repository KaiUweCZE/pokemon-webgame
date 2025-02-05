import { type LocationName } from "./location";
import { ObjectId, type Pokemon } from "./pokemon";

export type ItemType = "pokeball" | "potion" | "coffee" | "stone";

export type Sender = "prof. Bloom" | "Haku" | "Jack";

export type MessageType = "evolution" | "new-move" | "quest" | "system" | "battle" | "story";

export type ObjectiveType = "collect" | "defeat" | "explore" | "catch" | "talk";

export interface InventoryItem {
  id: string;
  userId: string;
  itemType: ItemType;
  quantity: number;
  metadata?: Record<string, any>;
}

export interface Quest {
  id: string;
  name: string;
  description: string;
  from: Sender;
  startDay?: number;
  endDay?: number;
  location?: Location;
  rewards: any[];
  completed: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  objectives: Objective[];
  progress: Record<string, any>;
  rewarded: boolean;
}

export interface Objective {
  id: string;
  questId: string;
  type: ObjectiveType;
  target: string;
  specificReq: Record<string, any>;
  requiredAmount: number;
  currentAmount: number;
  completed: boolean;
}

// Hlavní User interface
export interface User {
  id: string;
  name: string;
  email: string | null;
  profileImg: string | null;
  level: number;
  badges: number[];
  pokemons: Pokemon[];
  activePokemonIds: string[];
  completedQuests: string[];
  location: LocationName;
  visitedLocations: Location[];
  chapter: number;
  day: number;
  partOfDay: number;
  inventory: InventoryItem[];
  contacts: Sender[];
  dailyMessage: number;
  messages: Message[];
  quests: Quest[];
  createdAt: Date;
  updatedAt: Date;
}

export type UserUpdate = Partial<Omit<User, "id" | "createdAt" | "updatedAt">>;
export type InventoryUpdate = Partial<Omit<InventoryItem, "id" | "userId">>;

export interface Message {
  id: string;
  from: Sender;
  type: MessageType;
  text: string;
  time: number;
  viewed: boolean;
  createdAt: Date;
  userId: string;
  pokemonId?: string;
}
