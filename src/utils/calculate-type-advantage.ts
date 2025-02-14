import { TYPE_EFFECTIVENESS } from "@/types/attack";
import { PokemonType } from "@/types/pokemon";

export const calculateTypeAdvantage = (
  attackerTypes: PokemonType[],
  defenderTypes: PokemonType[]
): number => {
  let totalAdvantage = 0;

  attackerTypes.forEach((attackerType) => {
    defenderTypes.forEach((defenderType) => {
      const relations = TYPE_EFFECTIVENESS[attackerType];

      if (relations.strong.includes(defenderType)) {
        totalAdvantage += 1;
      } else if (relations.weak.includes(defenderType)) {
        totalAdvantage -= 1;
      }
    });
  });
  if (totalAdvantage >= 2) return 3; // Double advantage
  if (totalAdvantage > 0) return 2; // as advantage
  if (totalAdvantage <= -2) return -3; // Double disadvantage
  if (totalAdvantage < 0) return -2; // disadvantage
  return 0; // neutral
};
