import { Attack } from "@/types/attack";

export const randomAttack = (moves: Attack[]): Attack => {
  //if (moves.length === 0) return null;
  console.log("retrieved moves: ", moves);

  const randomIndex = Math.floor(Math.random() * moves.length);
  return moves[randomIndex];
};
