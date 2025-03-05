import { Item, ItemName } from "@/types/item";

export const POKEBALLS = ["pokeball", "great ball"] as const;

export type PokeballType = Extract<ItemName, (typeof POKEBALLS)[number]>;

export function isPokeballType(value: string): value is PokeballType {
  return (POKEBALLS as readonly string[]).includes(value);
}

export const POKEBALL_CATCH_RATES: Record<PokeballType, number> = {
  pokeball: 1,
  "great ball": 1.5,
};

export const calculateCatchRate = (
  hpRemaining: number,
  pokeball: PokeballType = "pokeball"
): number => {
  // hp remaining percentage
  const baseRate = 100 - hpRemaining;

  const ballModifier = POKEBALL_CATCH_RATES[pokeball];

  const catchRate = Math.min(baseRate * ballModifier, 95);

  console.log({
    "catch rate": catchRate,
  });
  return catchRate;
};

export const handleCatchPokemon = (catchRate: number) => {
  const random = Math.random() * 100;

  return random <= catchRate;
};
