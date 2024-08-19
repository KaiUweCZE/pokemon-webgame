import { attacksData } from "@/data/attacksData";
import { Attack } from "@/types/attack";

export const getAttacksFromNames = (attackNames: string[]): Attack[] => {
  const attacks = attacksData.filter((attack) =>
    attackNames.includes(attack.name)
  );

  return attacks;
};
