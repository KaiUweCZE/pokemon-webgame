import { attacksData } from "@/data/attacksData";
import { pokemonBattleData } from "@/data/pokemonBattleData";

export const generateMoves = (pokemonName: string, pokemonLevel: number) => {
  // get data about enemy pokemon
  const pokemon = pokemonBattleData.find((p) => p.name === pokemonName);

  console.log("pokemon from generateMoves", pokemon);

  // get string array of it's attacks

  const movesArray = pokemon?.attacks?.find(
    (attack) => 10 >= attack.level - pokemonLevel
  )?.attacks;

  // get data for each attack
  const moves = attacksData.filter((move) => movesArray?.includes(move.name));

  return moves;
};
