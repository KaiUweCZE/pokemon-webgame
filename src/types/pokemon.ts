import { AttackKey } from "@/data/pokemons/attacks-data";
import { pokemonsImg } from "@/images";
import { StaticImageData } from "next/image";
import { PokemonImages } from "./image";

export type ObjectId = string;
export type PokemonName = keyof typeof pokemonsImg;
export interface PokemonImage {
  defaultSrc: StaticImageData | string;
  defaultAlt: string;
  backSrc: StaticImageData | string;
  backAlt: string;
  iconSrc: StaticImageData | string;
  iconAlt: string;
}
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

export type PokemonAttacks = { learnAt: number; attack: AttackKey }[];

export interface Pokemon {
  id: ObjectId;
  name: PokemonName;
  types: PokemonType[];
  shiny: boolean;
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
  statusEffects?: StatusEffect[];
  evolutionInformed: boolean;
  userId: ObjectId | null;
  // it is not necessary to have this field, but it is useful for the UI
  isActive: boolean;
  createdAt: Date;
}

export interface BattlePokemon extends Omit<Pokemon, "createdAt" | "userId" | "evolutionInformed"> {
  attackCooldowns?: Record<string, number>;
  image: PokemonImages;
}

export interface PokemonUpdateData
  extends Omit<Pokemon, "id" | "createdAt" | "userId" | "evolutionInformed"> {}

export type EnemyPokemon = Omit<
  BattlePokemon,
  "attackCooldowns" | "expToNextLevel" | "isActive" | "id" | "currentExp"
>;

export interface PokemonStaticData
  extends Omit<Pokemon, "userId" | "createAt" | "evolutionInformed"> {
  expForKill: number;
  evolutionLevels?: number[];
  evolutionChain?: string[];
  evolution?: { level: number; name: string } | null;
}

export interface PokemonLevelUpInfo {
  baseExpToLevel: number; // base experience needed to level up
  expGrowthRate: number; // experience growth rate
  expForKill: number; // experience obtained for killing a pokemon at a certain level
}

export type PokemonCreate = Pick<Pokemon, "name" | "types"> &
  Partial<
    Pick<
      Pokemon,
      | "level"
      | "attacks"
      | "abilities"
      | "shiny"
      | "maxHp"
      | "maxEnergy"
      | "damage"
      | "defense"
      | "speed"
      | "expToNextLevel"
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
