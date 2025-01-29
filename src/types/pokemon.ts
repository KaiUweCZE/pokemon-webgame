import { pokemonsImg } from "@/images";

export type ObjectId = string;
export type PokemonName = keyof typeof pokemonsImg;
export type PokemonType =
  | "normal"
  | "fighting"
  | "flying"
  | "poison"
  | "ground"
  | "rock"
  | "bug"
  | "ghost"
  | "steel"
  | "fire"
  | "water"
  | "grass"
  | "electric"
  | "psychic"
  | "ice"
  | "dragon"
  | "dark"
  | "fairy";

export type StatusEffect = "poisoned" | "paralyzed" | "asleep" | "burn" | "dead";

export interface Pokemon {
  id: ObjectId;
  name: string;
  types: PokemonType[];
  level: number;
  attacks: string[];
  abilities: string[];
  currentHp: number;
  maxHp: number;
  currentEnergy: number;
  maxEnergy: number;
  currentExp: number;
  expToNextLevel: number;
  damage: number;
  defense: number;
  speed: number;
  evolutionInformed: boolean;
  userId: ObjectId | null;
  isActive: boolean;
  createdAt: Date;
}

export type PokemonCreate = Pick<Pokemon, "name" | "types"> &
  Partial<
    Pick<
      Pokemon,
      "level" | "attacks" | "abilities" | "maxHp" | "maxEnergy" | "damage" | "defense" | "speed"
    >
  >;

export type PokemonUpdate = Partial<Omit<Pokemon, "id" | "createdAt">> & {
  statusEffects?: StatusEffect[]; // Příklad rozšíření
};

export type PokemonPreview = Pick<
  Pokemon,
  "id" | "name" | "types" | "level" | "currentHp" | "maxHp" | "currentEnergy" | "maxEnergy"
> & {
  status?: StatusEffect[];
};
