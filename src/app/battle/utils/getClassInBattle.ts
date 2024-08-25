import { BattleState } from "@/types/enums/battleState";

export const getClassInBattle = (
  baseClass: string,
  state: BattleState
): string => {
  const cssClasses = [baseClass];

  switch (state) {
    case BattleState.USER_POKEMON_FAINTED:
      cssClasses.push("user-pokemon-done");
      break;
    case BattleState.CATCHING:
      cssClasses.push("catching");
      break;
    case BattleState.CAUGHT:
      cssClasses.push("caught");
      break;
    case BattleState.WILD_POKEMON_FAINTED:
      cssClasses.push("wild-pokemon-fainted");
      break;
    case BattleState.LAST_ROUND_DONE:
      cssClasses.push("last-round-done");
      break;
    case BattleState.USER_SWITCHING_POKEMON:
      cssClasses.push("switching-pokemon");
      break;
    default:
      cssClasses.push("not-started");
      break;
  }

  return cssClasses.join(" ");
};
