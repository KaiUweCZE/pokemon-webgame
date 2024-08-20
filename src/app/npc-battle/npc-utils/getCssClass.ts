import { NpcBattleState } from "@/types/enums/npcBattleState";

export const getCssClass = (
  baseClass: string,
  battleState: NpcBattleState
): string => {
  const cssClasses = [baseClass];

  switch (battleState) {
    case NpcBattleState.PLAYER_POKEMON_FAINTED:
      cssClasses.push("done");
      break;
    case NpcBattleState.PLAYER_ATTACKING:
      cssClasses.push("attacking");
      break;
    case NpcBattleState.OPPONENT_ATTACKING:
      cssClasses.push("defending");
      break;
    case NpcBattleState.PLAYER_VICTORY:
      cssClasses.push("victory");
      break;
    case NpcBattleState.OPPONENT_VICTORY:
      cssClasses.push("defeat");
      break;
    default:
      cssClasses.push("not-started");
      break;
  }

  return cssClasses.join(" ");
};
