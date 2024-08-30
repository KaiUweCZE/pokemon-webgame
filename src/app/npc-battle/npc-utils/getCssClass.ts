import { BattleState } from "@/types/enums/battleState";

export const getCssClass = (
  baseClass: string,
  battleState: BattleState
): string => {
  const cssClasses = [baseClass];

  switch (battleState) {
    case BattleState.USER_POKEMON_FAINTED:
      cssClasses.push("user-pokemon-fainted");
      break;
    case BattleState.BATTLE_START:
      cssClasses.push("start");
      break;
    case BattleState.OPPONENT_SWITCHING_POKEMON:
      cssClasses.push("oponent-switching");
      break;
    case BattleState.USER_SWITCHING_POKEMON:
      cssClasses.push("user-switching");
      break;
    case BattleState.USER_ATTACKING:
      cssClasses.push("attacking");
      break;
    case BattleState.OPPONENT_ATTACKING:
      cssClasses.push("defending");
      break;
    case BattleState.USER_VICTORY:
      cssClasses.push("user-victory");
      break;
    case BattleState.OPPONENT_VICTORY:
      cssClasses.push("defeat");
      break;
    case BattleState.BATTLE:
      break;
    default:
      cssClasses.push("not-started");
      break;
  }

  return cssClasses.join(" ");
};
