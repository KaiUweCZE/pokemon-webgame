import { PokemonWithOrder } from "@/contexts/PokemonContext";
import { Pokemon } from "@/types/pokemon";

export function isPokemonWithOrder(obj: any): obj is PokemonWithOrder {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.id === "string" &&
    typeof obj.name === "string" &&
    Array.isArray(obj.type) &&
    typeof obj.level === "number" &&
    Array.isArray(obj.attacks) &&
    Array.isArray(obj.abilities) &&
    typeof obj.speed === "number" &&
    typeof obj.hp === "number" &&
    typeof obj.actualHp === "number" &&
    typeof obj.actualEnergy === "number" &&
    typeof obj.expToLevel === "number" &&
    typeof obj.actualExp === "number" &&
    typeof obj.energy === "number" &&
    typeof obj.damage === "number" &&
    typeof obj.defense === "number" &&
    (obj.evolutionInformed === null ||
      typeof obj.evolutionInformed === "boolean") &&
    (obj.userId === null || typeof obj.userId === "string") &&
    typeof obj.order === "number"
  );
}

export const isPokemonWithOrderArray = (
  pokemons: any
): pokemons is PokemonWithOrder[] => {
  return Array.isArray(pokemons) && pokemons.every(isPokemonWithOrder);
};
