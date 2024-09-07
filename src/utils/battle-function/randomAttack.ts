import { Attack } from "@/types/attack";

export const randomAttack = (moves: Attack[]): Attack => {
  const randomIndex = Math.floor(Math.random() * moves.length);
  return moves[randomIndex];
};
