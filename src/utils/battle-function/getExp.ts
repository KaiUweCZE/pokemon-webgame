import { pokemonBattleData } from "@/data/pokemonBattleData";

interface GetExpProps {
  pokemonHp: number;
  pokemonName: string;
  pokemonLevel: number;
}

export const getExp = ({
  pokemonHp,
  pokemonLevel,
  pokemonName,
}: GetExpProps) => {
  const baseExp = pokemonBattleData.find(
    (pokemon) => pokemon.name === pokemonName
  )?.expForKill;
  let exp = 0;
  if (baseExp) {
    exp = baseExp * pokemonLevel * 1.5;
  }
  if (pokemonHp === 0) {
    console.log("get expirience", exp);
    return exp;
  }
  return 0;
};
