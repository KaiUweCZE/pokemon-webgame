import { Attack, TYPE_EFFECTIVENESS } from "@/types/attack";
import { BattlePokemon, EnemyPokemon, PokemonType } from "@/types/pokemon";

interface DamageCalculation {
  baseDamage: number;
  finalDamage: number;
  isCritical: boolean;
  effectiveness: number;
  description: string[];
}

export const calculateDamage = (
  attackingPokemon: BattlePokemon | EnemyPokemon,
  defendingPokemon: BattlePokemon | EnemyPokemon,
  attack: Attack
) => {
  const description: string[] = [];

  const baseDamage = attackingPokemon.damage + attack.damage;
  let multiplier = 1;

  const effectiveness = calculateTypeEffectiveness(attack.type, defendingPokemon.types);

  multiplier *= effectiveness;
  if (effectiveness > 1) description.push("It's super effective!");
  if (effectiveness < 1) description.push("It's not very effective...");

  const isCritical = Math.random() < 0.05;
  if (isCritical) {
    multiplier *= 1.5;
    description.push("Critical hit!");
  }

  const defenseMultiplier = calculateDefenseMultiplier(defendingPokemon.defense);
  multiplier *= defenseMultiplier;

  const finalDamage = Math.max(1, Math.floor(baseDamage * multiplier));

  return {
    baseDamage,
    finalDamage,
    isCritical,
    effectiveness,
    description,
  };
};

export const calculateTypeEffectiveness = (
  attackType: PokemonType,
  defenderTypes: PokemonType[]
): number => {
  let effectiveness = 1;

  defenderTypes.forEach((defenderType) => {
    const typeRelation = TYPE_EFFECTIVENESS[attackType];
    if (!typeRelation) return;

    if (typeRelation.strong.includes(defenderType)) {
      effectiveness *= 2;
    }
    if (typeRelation.weak.includes(defenderType)) {
      effectiveness *= 0.5;
    }
  });

  return effectiveness;
};

export const calculateDefenseMultiplier = (defense: number): number => {
  return 1 / (1 + defense * 0.1);
};
