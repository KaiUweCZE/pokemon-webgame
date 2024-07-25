import { Attack } from "@/types/attack";

export const randomAttack = (moves: Attack[]): Attack | null => {
  if (moves.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * moves.length);
  return moves[randomIndex];
};
