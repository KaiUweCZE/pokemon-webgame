import { attacksData } from "@/data/attacksData";
import { pokemonBattleData } from "@/data/pokemonBattleData";
import { Attack } from "@/types/attack";

export const generateMoves = (pokemonName: string, pokemonLevel: number) => {
  // get data about enemy pokemon
  const pokemon = pokemonBattleData.find((p) => p.name === pokemonName);

  console.log("pokemon from generateMoves", pokemon);

  // get string array of it's attacks
  const availableMoves = pokemon?.attacks.reduce((acc, attackSet) => {
    if (attackSet.level <= pokemonLevel) {
      return attackSet.attacks;
    }
    return acc;
  }, [] as string[]);
  console.log("available moves: ", availableMoves);

  // get data for each attack
  const moves = attacksData.filter((move) =>
    availableMoves?.includes(move.name)
  );

  console.log("moves: ", moves);

  return moves;
};

export const generateMovesName = (
  pokemonName: string,
  pokemonLevel: number
): string[] => {
  // get data about enemy pokemon
  const pokemon = pokemonBattleData.find((p) => p.name === pokemonName);

  console.log("pokemon from generateMoves", pokemon);

  // get attack's name string[]
  const movesArray = pokemon?.attacks.reduce((acc, attackSet) => {
    if (attackSet.level <= pokemonLevel) {
      return attackSet.attacks;
    }
    return acc;
  }, [] as string[]);

  if (!movesArray) {
    return [];
  }

  return movesArray;
};
