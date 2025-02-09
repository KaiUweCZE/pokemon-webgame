import { AttackKey } from "@/data/pokemons/attacks-data";
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

export type PokemonAttacks = { learnAt: number; attack: AttackKey }[];

export interface Pokemon {
  id: ObjectId;
  name: string;
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
  isActive: boolean;
  createdAt: Date;
}

export interface BattlePokemon extends Omit<Pokemon, "createdAt" | "userId" | "evolutionInformed"> {
  attackCooldowns?: Record<string, number>;
}

export type EnemyPokemon = Omit<BattlePokemon, "attackCooldowns">;

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
