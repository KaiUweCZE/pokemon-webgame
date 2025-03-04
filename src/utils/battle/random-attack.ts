import { ATTACKS } from "@/data/pokemons/attacks-data";
import { Attack } from "@/types/attack";

export const getRandomAttack = (availableAttacks: string[]): Attack | null => {
  // Select random attack name from available attacks
  const randomAttackName = availableAttacks[Math.floor(Math.random() * availableAttacks.length)];

  // Find the attack object by its name
  const attack = Object.values(ATTACKS).find((attack) => attack.name === randomAttackName);

  console.log({
    "attacks array ": availableAttacks,
    "current attack": randomAttackName,
  });
  return attack || null;
};
